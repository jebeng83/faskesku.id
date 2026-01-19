<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Jobs\PcareMassSendJob;
use App\Jobs\PcareResendJob;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

/**
 * Controller untuk bridging BPJS PCare.
 * - Membuat header (X-cons-id, X-timestamp, X-signature, X-authorization, user_key)
 * - Proxy request ke endpoint PCare
 * - Contoh endpoint umum (dokter, faskes, peserta, kunjungan)
 */
class PcareController extends Controller
{
    use BpjsTraits;

    /**
     * Uji pembuatan header dan tampilkan konfigurasi dasar.
     */
    public function ping()
    {
        $cfg = $this->pcareConfig();
        $timestamp = $this->generateTimestamp();
        $headers = $this->buildPcareHeaders($timestamp);

        return response()->json([
            'pcare' => [
                'base_url' => $cfg['base_url'],
                'kode_ppk' => $cfg['kode_ppk'],
                'app_code' => $cfg['app_code'],
            ],
            'headers' => $headers,
        ]);
    }

    /**
     * Proxy generic untuk memanggil endpoint PCare.
     * Request method mengikuti method HTTP yang dikirim oleh client.
     * Contoh: GET /api/pcare/proxy/dokter/0/10
     */
    public function proxy(Request $request, string $endpoint)
    {
        $method = strtoupper($request->method());
        $query = $request->query();
        $body = $request->all();
        $start = microtime(true);
        try {
            $result = $this->pcareRequest($method, $endpoint, $query, $body);

            $response = $result['response'];
            $timestamp = $result['timestamp_used'];
            $rawBody = $response->body();
            $processed = $this->maybeDecryptAndDecompress($rawBody, $timestamp);
            $durationMs = (int) round((microtime(true) - $start) * 1000);

            if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
                $ep = trim($endpoint);
                if (preg_match('~^pendaftaran/peserta/([^/]+)/tglDaftar/([^/]+)/noUrut/([^/]+)/kdPoli/([^/]+)~', $ep, $m)) {
                    $noka = (string) $m[1];
                    $tgl = (string) $m[2];
                    $noUrut = (string) $m[3];
                    $kdPoli = (string) $m[4];
                    $y = null;
                    try {
                        $d = \DateTime::createFromFormat('d-m-Y', $tgl);
                        $y = $d ? $d->format('Y-m-d') : null;
                    } catch (\Throwable $e) {
                        $y = null;
                    }
                    $noRawatLog = null;
                    if ($y) {
                        try {
                            $row = \Illuminate\Support\Facades\DB::table('pcare_pendaftaran')
                                ->where('tglDaftar', $y)
                                ->where('noUrut', $noUrut)
                                ->where('kdPoli', $kdPoli)
                                ->select(['no_rawat'])
                                ->first();
                            $noRawatLog = $row?->no_rawat ?: null;
                        } catch (\Throwable $e) {
                        }
                    }
                    if ($noRawatLog) {
                        $maskedCard = substr($noka, 0, 6).str_repeat('*', max(strlen($noka) - 10, 0)).substr($noka, -4);
                        $reqPayload = [
                            'noKartu_masked' => $maskedCard,
                            'tglDaftar' => $tgl,
                            'noUrut' => $noUrut,
                            'kdPoli' => $kdPoli,
                            'query' => $query,
                        ];
                        $meta = is_array($processed) ? ($processed['metaData'] ?? ($processed['metadata'] ?? [])) : [];
                        $metaCode = is_array($meta) ? (int) ($meta['code'] ?? 0) : null;
                        $metaMessage = is_array($meta) ? (string) ($meta['message'] ?? '') : null;
                        $statusLabel = $response->status() >= 200 && $response->status() < 300 ? 'success' : 'failed';
                        try {
                            \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')->insert([
                                'no_rawat' => (string) $noRawatLog,
                                'endpoint' => 'pendaftaran_peserta',
                                'status' => $statusLabel,
                                'http_status' => $response->status(),
                                'meta_code' => $metaCode,
                                'meta_message' => $metaMessage,
                                'duration_ms' => $durationMs,
                                'request_payload' => json_encode($reqPayload),
                                'response_body_raw' => $rawBody,
                                'response_body_json' => is_array($processed) ? json_encode($processed) : null,
                                'triggered_by' => optional(\Illuminate\Support\Facades\Auth::user())->nik ?? (string) optional(\Illuminate\Support\Facades\Auth::user())->id ?? null,
                                'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        } catch (\Throwable $e) {
                        }
                    }
                }
            }

            return response()->json([
                'ok' => $response->successful(),
                'status' => $response->status(),
                'endpoint' => $result['url'],
                'headers_used' => $result['headers_used'],
                'data' => $processed,
                'raw' => $response->json() ?? $rawBody,
            ], $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare proxy error', [
                'endpoint' => $endpoint,
                'method' => $method,
                'query' => $query,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'ok' => false,
                'status' => 503,
                'endpoint' => $endpoint,
                'error' => 'PCare connection error: '.$e->getMessage(),
                'hint' => 'Coba lagi beberapa saat. Jika tetap gagal, periksa konektivitas jaringan, env BPJS_PCARE_FORCE_RESOLVE_LIST, dan sertifikat CA.',
            ], 503);
        }
    }

    /**
     * Contoh: daftar dokter.
     * Endpoint PCare biasanya: GET /dokter/{start}/{limit}
     */
    public function getDokter(Request $request)
    {
        $start = $request->query('start', 0);
        $limit = $request->query('limit', 100);
        try {
            $result = $this->pcareRequest('GET', "dokter/{$start}/{$limit}");

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            // Diagnostik tambahan: log detail jika gagal (>= 400)
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare getDokter error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                    // abaikan jika logging gagal
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getDokter connection error', [
                'start' => $start,
                'limit' => $limit,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare: '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 503);
        }
    }

    /**
     * Contoh: daftar faskes.
     * Endpoint PCare biasanya: GET /faskes/{start}/{limit}
     */
    public function getFaskes(Request $request)
    {
        $start = $request->query('start', 0);
        $limit = $request->query('limit', 100);
        try {
            $result = $this->pcareRequest('GET', "faskes/{$start}/{$limit}");

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            // Diagnostik: log detail jika gagal (>= 400)
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare getFaskes error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                    // abaikan jika logging gagal
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getFaskes connection error', [
                'start' => $start,
                'limit' => $limit,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (faskes): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 503);
        }
    }

    /**
     * Referensi Poli FKTP (PCare REST).
     * Endpoint PCare: GET /poli/fktp/{start}/{limit}
     */
    public function getPoli(Request $request)
    {
        $start = $request->query('start', 0);
        $limit = $request->query('limit', 100);
        // Validasi konfigurasi dasar terlebih dahulu agar tidak 500 ketika base URL kosong
        $cfg = $this->pcareConfig();
        $base = trim((string) ($cfg['base_url'] ?? ''));
        if ($base === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'BPJS_PCARE_BASE_URL belum dikonfigurasi di server ini (.env). Silakan isi nilai base URL PCare (mis. https://apijkn.bpjs-kesehatan.go.id/pcare-rest atau pcare-rest-v3.0).',
                    'code' => 422,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 422);
        }

        try {
            // Per spesifikasi PCare REST, poli FKTP ada pada path 'poli/fktp/{start}/{limit}'
            $result = $this->pcareRequest('GET', "poli/fktp/{$start}/{$limit}");
        } catch (\InvalidArgumentException $e) {
            // Kembalikan pesan yang ramah bila terjadi kesalahan konfigurasi
            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => 422,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 422);
        }

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Kesadaran (PCare REST).
     * Endpoint PCare: GET /kesadaran
     */
    public function getKesadaran(Request $request)
    {
        // Endpoint tidak membutuhkan start/limit; BPJS mengembalikan 4 item standar
        try {
            $result = $this->pcareRequest('GET', 'kesadaran');
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare getKesadaran error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                    // abaikan jika logging gagal
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getKesadaran connection error', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (kesadaran): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 503);
        }
    }

    /**
     * Contoh: peserta berdasarkan nomor kartu (noka) & tanggal pelayanan.
     * Endpoint yang umum: GET /peserta/nokartu/{noka}/tglPelayanan/{tglPelayanan}
     */
    public function pesertaByNoKartu(string $noka, string $tglPelayanan)
    {
        $endpoint = "peserta/nokartu/{$noka}/tglPelayanan/{$tglPelayanan}";
        try {
            $result = $this->pcareRequest('GET', $endpoint);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare pesertaByNoKartu error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare pesertaByNoKartu connection error', [
                'noka' => $noka,
                'tglPelayanan' => $tglPelayanan,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (pesertaByNoKartu): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => null,
            ], 503);
        }
    }

    /**
     * Get Peserta PCare by Nomor Kartu (versi sederhana tanpa tanggal pelayanan).
     * Katalog BPJS: GET /peserta/{noKartu}
     */
    public function getPeserta(string $noka)
    {
        $noka = trim($noka);
        if ($noka === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter nomor kartu (noka) wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'peserta/'.urlencode($noka);
        try {
            $result = $this->pcareRequest('GET', $endpoint);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare getPeserta error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getPeserta connection error', [
                'noka' => $noka,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (peserta): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => null,
            ], 503);
        }
    }

    /**
     * Contoh: pendaftaran/kunjungan (POST ke PCare). Payload mengikuti spesifikasi BPJS PCare.
     */
    public function daftarKunjungan(Request $request)
    {
        $payload = $request->all();
        // Normalisasi KD TACC: Sesuai Ref_TACC BPJS, nilai valid adalah -1, 1, 2, 3, 4
        // UI kadang mengirim 0 (dari konversi -1) atau -1 untuk "Tanpa TACC"
        // API BPJS menerima -1 untuk "Tanpa TACC", bukan 0
        try {
            if (array_key_exists('kdTacc', $payload)) {
                $v = $payload['kdTacc'];
                // Konversi 0, -1, '-1', '', null menjadi -1 (Tanpa TACC)
                if ($v === 0 || $v === -1 || $v === '0' || $v === '-1' || $v === '' || $v === null) {
                    $payload['kdTacc'] = -1;
                    $payload['alasanTacc'] = null;
                }
            }
        } catch (\Throwable $e) {
            // abaikan jika normalisasi gagal
        }
        // Sanitasi rujukan: hapus key rujukLanjut bila null/empty untuk menghindari JValue error di server PCare
        try {
            if (array_key_exists('rujukLanjut', $payload)) {
                $rl = $payload['rujukLanjut'];
                if ($rl === null || $rl === '' || (is_array($rl) && empty($rl))) {
                    unset($payload['rujukLanjut']);
                } elseif (is_array($rl)) {
                    if (array_key_exists('khusus', $rl) && ($rl['khusus'] === null || $rl['khusus'] === '')) {
                        unset($rl['khusus']);
                    }
                    if (array_key_exists('subSpesialis', $rl) && (is_null($rl['subSpesialis']) || (is_array($rl['subSpesialis']) && empty($rl['subSpesialis'])))) {
                        unset($rl['subSpesialis']);
                    }
                    if (! empty($rl['tglEstRujuk']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $rl['tglEstRujuk'])) {
                        $dtR = new \DateTime($rl['tglEstRujuk']);
                        $rl['tglEstRujuk'] = $dtR->format('d-m-Y');
                    }
                    if (empty($rl)) {
                        unset($payload['rujukLanjut']);
                    } else {
                        $payload['rujukLanjut'] = $rl;
                    }
                }
            }
        } catch (\Throwable $e) {
        }

        try {
            $ct = (string) config('bpjs.pcare.kunjungan_content_type', 'text/plain');
            $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $payload, ['Content-Type' => $ct]);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            if ($response->status() >= 400) {
                $meta = is_array($processed) ? ($processed['metaData'] ?? $processed['metadata'] ?? null) : null;
                $msg = is_array($meta) ? (string) ($meta['message'] ?? '') : '';
                if ($msg !== '' && stripos($msg, 'JValue') !== false) {
                    $alt = strtolower($ct) === 'text/plain' ? 'application/json' : 'text/plain';
                    try {
                        $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $payload, ['Content-Type' => $alt]);
                        $response = $result['response'];
                        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
                    } catch (\Throwable $inner) {
                    }
                }
                try {
                    Log::channel('bpjs')->error('PCare daftarKunjungan error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                }
            }
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare daftarKunjungan connection error', [
                'error' => $e->getMessage(),
                'payload_preview' => array_intersect_key($payload, array_flip(['noKartu', 'kdPoli', 'kdDokter', 'kdDiag1'])),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (daftarKunjungan): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => null,
            ], 503);
        }

        // Simpan ke DB lokal jika tersedia no_rawat (sesuai instruksi)
        try {
            $noRawat = trim((string) ($payload['no_rawat'] ?? ''));
            if ($noRawat !== '') {
                $noKunjungan = $this->parseNoKunjunganFromResponse(is_array($processed) ? $processed : []);
                if ($noKunjungan === null) {
                    $rawBody = $response->body();
                    if (is_string($rawBody) && $rawBody !== '') {
                        $noKunjungan = $this->parseNoKunjunganFromString($rawBody);
                    }
                }
                $status = ($response->status() >= 200 && $response->status() < 300) ? 'Terkirim' : 'Gagal';
                $this->savePcareKunjunganUmum($noRawat, $payload, $noKunjungan, $status);
                if (! empty($payload['rujukLanjut']) && is_array($payload['rujukLanjut'])) {
                    $this->savePcareRujukSubspesialis($noRawat, $payload, $noKunjungan);
                }
            }
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('Gagal menyimpan data kunjungan ke tabel lokal', [
                'error' => $e->getMessage(),
                'no_rawat' => $payload['no_rawat'] ?? null,
            ]);
        }

        return response()->json($processed, $response->status());
    }

    /**
     * Kunjungan Sehat (pendaftaran PCare dengan kunjSakit = false).
     * Endpoint PCare: POST /pendaftaran
     *
     * Mengacu pada controller lama (public/PcareController.php) yang
     * menyiapkan payload minimal untuk pendaftaran kunjungan sehat:
     * - kdProviderPeserta (default dari konfigurasi PCare jika tidak dikirim)
     * - tglDaftar (Y-m-d)
     * - noKartu (13 digit)
     * - kdPoli (default '021' jika tidak dikirim)
     * - keluhan (default 'Konsultasi Kesehatan')
     * - kunjSakit = false
     * - opsional tanda vital: sistole, diastole, beratBadan, tinggiBadan, respRate, heartRate
     */
    public function kirimKunjunganSehat(Request $request)
    {
        // Ambil konfigurasi dasar PCare
        $cfg = $this->pcareConfig();

        // Validasi nomor kartu: wajib 13 digit
        $noKartu = preg_replace('/[^0-9]/', '', (string) $request->input('noKartu'));
        if ($noKartu === '' || ! preg_match('/^\d{13}$/', $noKartu)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Nomor kartu harus 13 digit',
                    'code' => 422,
                ],
                'response' => null,
            ], 422);
        }

        // Normalisasi tanggal daftar
        // Catatan: API PCare untuk pendaftaran biasanya mengharapkan format dd-mm-yyyy.
        // Kita terima input bebas (Y-m-d atau dd-mm-yyyy), normalisasi ke Y-m-d dulu,
        // lalu konversi ke dd-mm-yyyy saat dikirim.
        $tglDaftarInput = (string) ($request->input('tglDaftar') ?? now()->format('Y-m-d'));
        $tglDaftarYmd = $this->normalizeDateToYmd($tglDaftarInput) ?? now()->format('Y-m-d');
        try {
            $dt = new \DateTime($tglDaftarYmd);
            $tglDaftarForPcare = $dt->format('d-m-Y');
        } catch (\Throwable $e) {
            // Fallback aman
            $tglDaftarForPcare = now()->format('d-m-Y');
        }

        // Coba mapping kd_poli RS ke KD PCare bila dikirim dari UI
        $kdPoliFromRequest = $request->input('kdPoli', '021');
        $kdPoliRs = $request->input('kd_poli_rs');
        if ($kdPoliRs) {
            try {
                $mapped = \Illuminate\Support\Facades\DB::table('maping_poliklinik_pcare')
                    ->where('kd_poli_rs', $kdPoliRs)
                    ->value('kd_poli_pcare');
                if (! empty($mapped)) {
                    $kdPoliFromRequest = $mapped;
                }
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning('Gagal mapping kd_poli_rs ke KD PCare', [
                    'kd_poli_rs' => $kdPoliRs,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        // Siapkan payload minimal sesuai spesifikasi
        $payload = [
            'kdProviderPeserta' => $request->input('kdProviderPeserta', $cfg['kode_ppk'] ?? env('BPJS_PCARE_KODE_PPK')),
            'tglDaftar' => $tglDaftarForPcare,
            'noKartu' => $noKartu,
            'kdPoli' => $kdPoliFromRequest,
            'keluhan' => $request->input('keluhan', 'Konsultasi Kesehatan'),
            'kunjSakit' => false,
            // Opsional tanda vital
            'sistole' => (string) ($request->input('sistole', '0')),
            'diastole' => (string) ($request->input('diastole', '0')),
            'beratBadan' => (string) ($request->input('beratBadan', '0')),
            'tinggiBadan' => (string) ($request->input('tinggiBadan', '0')),
            'respRate' => (string) ($request->input('respRate', '0')),
            'lingkarPerut' => (string) ($request->input('lingkarPerut', '0')),
            'heartRate' => (string) ($request->input('heartRate', '0')),
            // Field tambahan sesuai kebutuhan minimal user/PCare
            'rujukBalik' => (string) ($request->input('rujukBalik', '0')),
            'kdTkp' => (string) ($request->input('kdTkp', '10')),
        ];

        // Logging diagnostik terperinci (tanpa bocorkan informasi sensitif)
        try {
            $maskedNoKartu = substr($noKartu, 0, 6).str_repeat('*', max(strlen($noKartu) - 10, 0)).substr($noKartu, -4);
            \Illuminate\Support\Facades\Log::channel('bpjs')->info('Kunjungan Sehat - Payload siap dikirim', [
                'kd_poli_rs' => $kdPoliRs,
                'kdPoli_final' => $kdPoliFromRequest,
                'kdProviderPeserta' => $payload['kdProviderPeserta'],
                'tglDaftar_ddmmyyyy' => $tglDaftarForPcare,
                'noKartu_masked' => $maskedNoKartu,
                'kdTkp' => $payload['kdTkp'],
                'kunjSakit' => $payload['kunjSakit'],
            ]);
        } catch (\Throwable $e) {
            // abaikan jika logging gagal
        }

        // Sesuai katalog BPJS PCare, beberapa endpoint membutuhkan Content-Type: text/plain
        try {
            $result = $this->pcareRequest('POST', 'pendaftaran', [], $payload, ['Content-Type' => 'text/plain']);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare kirimKunjunganSehat error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare kirimKunjunganSehat connection error', [
                'error' => $e->getMessage(),
                'payload_preview' => array_intersect_key($payload, array_flip(['noKartu', 'kdPoli', 'kdProviderPeserta', 'tglDaftar'])),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (pendaftaran kunjungan sehat): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => null,
            ], 503);
        }
    }

    /**
     * Ambil nilai noKunjungan dari struktur response PCare (variasi beberapa format).
     */
    protected function parseNoKunjunganFromResponse(array $processed): ?string
    {
        if (isset($processed['response']) && is_array($processed['response'])) {
            $resp = $processed['response'];
            if (($resp['field'] ?? '') === 'noKunjungan' && ! empty($resp['message'])) {
                return (string) $resp['message'];
            }
            if (! empty($resp['noKunjungan'])) {
                return (string) $resp['noKunjungan'];
            }
            if (isset($resp[0]) && is_array($resp[0]) && ! empty($resp[0]['noKunjungan'])) {
                return (string) $resp[0]['noKunjungan'];
            }
            if (isset($resp['data']) && is_array($resp['data'])) {
                $d = $resp['data'];
                if (! empty($d['noKunjungan'])) {
                    return (string) $d['noKunjungan'];
                }
                if (isset($d[0]) && is_array($d[0]) && ! empty($d[0]['noKunjungan'])) {
                    return (string) $d[0]['noKunjungan'];
                }
                if (isset($d['kunjungan']) && is_array($d['kunjungan']) && ! empty($d['kunjungan']['noKunjungan'])) {
                    return (string) $d['kunjungan']['noKunjungan'];
                }
            }
            if (! empty($resp['message'])) {
                $m = (string) $resp['message'];
                if (preg_match('/^[0-9]{10,}Y[0-9]{4,}$/', $m)) {
                    return $m;
                }
                if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $m, $mm)) {
                    return (string) $mm[1];
                }
            }
        }
        if (isset($processed['metaData']) && is_array($processed['metaData'])) {
            $m = (string) ($processed['metaData']['message'] ?? '');
            if ($m !== '') {
                if (preg_match('/^[0-9]{10,}Y[0-9]{4,}$/', $m)) {
                    return $m;
                }
                if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $m, $mm)) {
                    return (string) $mm[1];
                }
            }
        }
        if (isset($processed['metadata']) && is_array($processed['metadata'])) {
            $m = (string) ($processed['metadata']['message'] ?? '');
            if ($m !== '') {
                if (preg_match('/^[0-9]{10,}Y[0-9]{4,}$/', $m)) {
                    return $m;
                }
                if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $m, $mm)) {
                    return (string) $mm[1];
                }
            }
        }
        if (! empty($processed['noKunjungan'])) {
            return (string) $processed['noKunjungan'];
        }
        if (isset($processed['data']) && is_array($processed['data'])) {
            $d = $processed['data'];
            if (! empty($d['noKunjungan'])) {
                return (string) $d['noKunjungan'];
            }
            if (isset($d['response']) && is_array($d['response']) && ! empty($d['response']['noKunjungan'])) {
                return (string) $d['response']['noKunjungan'];
            }
        }

        return null;
    }

    protected function parseNoKunjunganFromString(string $s): ?string
    {
        if ($s === '') {
            return null;
        }
        if (preg_match('/\b([0-9]{10,}Y[0-9]{4,})\b/', $s, $m)) {
            return (string) $m[1];
        }
        $j = null;
        try {
            $j = json_decode($s, true, 512, JSON_THROW_ON_ERROR);
        } catch (\Throwable $e) {
            $j = null;
        }
        if (is_array($j)) {
            return $this->parseNoKunjunganFromResponse($j);
        }

        return null;
    }

    /**
     * Simpan (upsert) data kunjungan umum ke tabel lokal pcare_kunjungan_umum.
     * Hanya akan menyimpan kolom yang memang ada di tabel untuk mencegah error skema.
     */
    protected function savePcareKunjunganUmum(string $noRawat, array $payload, ?string $noKunjungan, string $status): void
    {
        // Jika tabel tidak ada, fallback update status di reg_periksa saja
        if (! Schema::hasTable('pcare_kunjungan_umum')) {
            DB::table('reg_periksa')->where('no_rawat', $noRawat)->update([
                'status_pcare' => strtolower($status) === 'terkirim' ? 'sent' : 'failed',
                'response_pcare' => json_encode(['noKunjungan' => $noKunjungan, 'status' => $status]),
            ]);

            return;
        }

        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
        if (! $reg) {
            Log::warning('Data reg_periksa tidak ditemukan untuk no_rawat: '.$noRawat);

            return;
        }

        $pasien = DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first();
        $poli = $reg->kd_poli ? DB::table('poliklinik')->where('kd_poli', $reg->kd_poli)->first() : null;
        $dokter = $reg->kd_dokter ? DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first() : null;

        // Ambil data pemeriksaan terbaru
        $pemeriksaan = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->orderBy('tgl_perawatan', 'desc')
            ->orderBy('jam_rawat', 'desc')
            ->first();

        // Ambil diagnosa dari database
        $diagnosa1 = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $noRawat)
            ->where('diagnosa_pasien.prioritas', '1')
            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
            ->first();

        $diagnosa2 = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $noRawat)
            ->where('diagnosa_pasien.prioritas', '2')
            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
            ->first();

        $diagnosa3 = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $noRawat)
            ->where('diagnosa_pasien.prioritas', '3')
            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
            ->first();

        // Ambil terapi obat
        $terapiObatData = DB::table('resep_obat')
            ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
            ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
            ->where('resep_obat.no_rawat', $noRawat)
            ->select('databarang.nama_brng', 'resep_dokter.jml', 'resep_dokter.aturan_pakai')
            ->get();

        $terapiObatString = 'Tidak Ada';
        if ($terapiObatData->isNotEmpty()) {
            $terapiObatArray = [];
            foreach ($terapiObatData as $obat) {
                $terapiObatArray[] = $obat->nama_brng.' '.$obat->jml.' ['.$obat->aturan_pakai.']';
            }
            $terapiObatString = implode(', ', $terapiObatArray);
        }

        // Parse tensi menjadi sistole/diastole
        $sistole = null;
        $diastole = null;
        if ($pemeriksaan && ! empty($pemeriksaan->tensi) && strpos($pemeriksaan->tensi, '/') !== false) {
            $tensiParts = explode('/', $pemeriksaan->tensi);
            $sistole = trim($tensiParts[0]) ?: null;
            $diastole = isset($tensiParts[1]) ? trim($tensiParts[1]) : null;
        }
        // Fallback ke payload jika tidak ada di pemeriksaan
        $sistole = $sistole ?? (isset($payload['sistole']) ? (string) $payload['sistole'] : null);
        $diastole = $diastole ?? (isset($payload['diastole']) ? (string) $payload['diastole'] : null);

        // Normalisasi tanggal daftar/pulang
        $tglDaftar = isset($payload['tglDaftar']) ? $this->normalizeDateToYmd((string) $payload['tglDaftar']) : null;
        $tglPulang = isset($payload['tglPulang']) ? $this->normalizeDateToYmd((string) $payload['tglPulang']) : null;

        // Ambil nama referensi dari database atau payload
        // Nama Poli
        $nmPoli = $poli->nm_poli ?? null;
        if (! $nmPoli && isset($payload['nmPoli'])) {
            $nmPoli = $payload['nmPoli'];
        }

        // Nama Dokter
        $nmDokter = $dokter->nm_dokter ?? null;
        if (! $nmDokter && isset($payload['nmDokter'])) {
            $nmDokter = $payload['nmDokter'];
        }

        // Nama Diagnosa
        $nmDiag1 = $diagnosa1->nm_penyakit ?? null;
        $nmDiag2 = $diagnosa2->nm_penyakit ?? null;
        $nmDiag3 = $diagnosa3->nm_penyakit ?? null;

        // Nama Status Pulang
        $nmStatusPulang = null;
        if (isset($payload['kdStatusPulang'])) {
            $statusPulang = DB::table('status_pulang')
                ->where('kd_status_pulang', $payload['kdStatusPulang'])
                ->first();
            $nmStatusPulang = $statusPulang->nm_status_pulang ?? null;
        }
        if (! $nmStatusPulang && isset($payload['nmStatusPulang'])) {
            $nmStatusPulang = $payload['nmStatusPulang'];
        }

        // Nama Kesadaran (Sadar)
        $nmSadar = null;
        if (isset($payload['kdSadar'])) {
            $kesadaran = DB::table('master_kesadaran')
                ->where('kd_kesadaran', $payload['kdSadar'])
                ->first();
            $nmSadar = $kesadaran->nm_kesadaran ?? null;
        }

        // Nama Alergi
        $nmAlergiMakanan = null;
        $nmAlergiUdara = null;
        $nmAlergiObat = null;
        $kdAlergiMakanan = $payload['alergiMakan'] ?? '00';
        $kdAlergiUdara = $payload['alergiUdara'] ?? '00';
        $kdAlergiObat = $payload['alergiObat'] ?? '00';

        if (isset($payload['alergiMakan'])) {
            $alergiMakan = DB::table('master_alergi')
                ->where('kd_alergi', $payload['alergiMakan'])
                ->first();
            $nmAlergiMakanan = $alergiMakan->nm_alergi ?? ($payload['alergiMakan'] === '00' ? 'Tidak Ada' : 'Tidak Ada');
        } else {
            $nmAlergiMakanan = 'Tidak Ada';
        }

        if (isset($payload['alergiUdara'])) {
            $alergiUdara = DB::table('master_alergi')
                ->where('kd_alergi', $payload['alergiUdara'])
                ->first();
            $nmAlergiUdara = $alergiUdara->nm_alergi ?? ($payload['alergiUdara'] === '00' ? 'Tidak Ada' : 'Tidak Ada');
        } else {
            $nmAlergiUdara = 'Tidak Ada';
        }

        if (isset($payload['alergiObat'])) {
            $alergiObat = DB::table('master_alergi')
                ->where('kd_alergi', $payload['alergiObat'])
                ->first();
            $nmAlergiObat = $alergiObat->nm_alergi ?? ($payload['alergiObat'] === '00' ? 'Tidak Ada' : 'Tidak Ada');
        } else {
            $nmAlergiObat = 'Tidak Ada';
        }

        // Nama Prognosa
        $nmPrognosa = null;
        $kdPrognosa = $payload['kdPrognosa'] ?? '01';
        if (isset($payload['kdPrognosa'])) {
            $prognosa = DB::table('master_prognosa')
                ->where('kd_prognosa', $payload['kdPrognosa'])
                ->first();
            $nmPrognosa = $prognosa->nm_prognosa ?? null;
        }
        if (! $nmPrognosa) {
            $nmPrognosa = 'Bonam (Baik)';
        }

        // Lingkar perut harus NOT NULL, beri default value jika kosong
        $lingkarPerut = isset($payload['lingkarPerut']) ? (string) $payload['lingkarPerut'] : ($pemeriksaan->lingkar_perut ?? '');
        if ($lingkarPerut === '') {
            $lingkarPerut = '';
        }

        // Terapi non obat
        $terapiNonObat = $payload['terapiNonObat'] ?? ($pemeriksaan->instruksi ?? 'Edukasi Kesehatan');
        if ($terapiNonObat === '') {
            $terapiNonObat = 'Edukasi Kesehatan';
        }

        // BMHP
        $bmhp = $payload['bmhp'] ?? 'Tidak Ada';
        if ($bmhp === '') {
            $bmhp = 'Tidak Ada';
        }

        // Siapkan data map sesuai struktur tabel pcare_kunjungan_umum
        $data = [
            'no_rawat' => $noRawat,
            'noKunjungan' => $noKunjungan,
            'tglDaftar' => $tglDaftar,
            'no_rkm_medis' => $reg->no_rkm_medis ?? null,
            'nm_pasien' => $pasien->nm_pasien ?? null,
            'noKartu' => $payload['noKartu'] ?? null,
            'kdPoli' => $payload['kdPoli'] ?? null,
            'nmPoli' => $nmPoli,
            'keluhan' => $payload['keluhan'] ?? null,
            'kdSadar' => $payload['kdSadar'] ?? null,
            'nmSadar' => $nmSadar,
            'sistole' => $sistole,
            'diastole' => $diastole,
            'beratBadan' => isset($payload['beratBadan']) ? (string) $payload['beratBadan'] : ($pemeriksaan->berat ?? null),
            'tinggiBadan' => isset($payload['tinggiBadan']) ? (string) $payload['tinggiBadan'] : ($pemeriksaan->tinggi ?? null),
            'respRate' => isset($payload['respRate']) ? (string) $payload['respRate'] : ($pemeriksaan->respirasi ?? null),
            'heartRate' => isset($payload['heartRate']) ? (string) $payload['heartRate'] : ($pemeriksaan->nadi ?? null),
            'lingkarPerut' => $lingkarPerut,
            'terapi' => $payload['terapiObat'] ?? $terapiObatString,
            'kdStatusPulang' => $payload['kdStatusPulang'] ?? null,
            'nmStatusPulang' => $nmStatusPulang,
            'tglPulang' => $tglPulang,
            'kdDokter' => $payload['kdDokter'] ?? null,
            'nmDokter' => $nmDokter,
            'kdDiag1' => $payload['kdDiag1'] ?? ($diagnosa1->kd_penyakit ?? null),
            'nmDiag1' => $nmDiag1,
            'kdDiag2' => $payload['kdDiag2'] ?? ($diagnosa2->kd_penyakit ?? null),
            'nmDiag2' => $nmDiag2,
            'kdDiag3' => $payload['kdDiag3'] ?? ($diagnosa3->kd_penyakit ?? null),
            'nmDiag3' => $nmDiag3,
            'status' => $status,
            'KdAlergiMakanan' => $kdAlergiMakanan,
            'NmAlergiMakanan' => $nmAlergiMakanan,
            'KdAlergiUdara' => $kdAlergiUdara,
            'NmAlergiUdara' => $nmAlergiUdara,
            'KdAlergiObat' => $kdAlergiObat,
            'NmAlergiObat' => $nmAlergiObat,
            'KdPrognosa' => $kdPrognosa,
            'NmPrognosa' => $nmPrognosa,
            'terapi_non_obat' => $terapiNonObat,
            'bmhp' => $bmhp,
        ];

        $this->safeUpsert('pcare_kunjungan_umum', ['no_rawat' => $noRawat], $data);
    }

    /**
     * Simpan (upsert) data rujuk subspesialis ke tabel lokal pcare_rujuk_subspesialis.
     */
    protected function savePcareRujukSubspesialis(string $noRawat, array $payload, ?string $noKunjungan): void
    {
        if (! Schema::hasTable('pcare_rujuk_subspesialis')) {
            return; // abaikan jika tabel tidak tersedia
        }

        try {
            // Ambil data dari database
            $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
            if (! $reg) {
                Log::warning('Data reg_periksa tidak ditemukan untuk no_rawat: '.$noRawat);

                return;
            }

            $pasien = DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first();
            $poli = $reg->kd_poli ? DB::table('poliklinik')->where('kd_poli', $reg->kd_poli)->first() : null;
            $dokter = $reg->kd_dokter ? DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first() : null;

            // Ambil data pemeriksaan terbaru
            $pemeriksaan = DB::table('pemeriksaan_ralan')
                ->where('no_rawat', $noRawat)
                ->orderBy('tgl_perawatan', 'desc')
                ->orderBy('jam_rawat', 'desc')
                ->first();

            // Ambil diagnosa dari database
            $diagnosa1 = DB::table('diagnosa_pasien')
                ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                ->where('diagnosa_pasien.no_rawat', $noRawat)
                ->where('diagnosa_pasien.prioritas', '1')
                ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                ->first();

            $diagnosa2 = DB::table('diagnosa_pasien')
                ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                ->where('diagnosa_pasien.no_rawat', $noRawat)
                ->where('diagnosa_pasien.prioritas', '2')
                ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                ->first();

            $diagnosa3 = DB::table('diagnosa_pasien')
                ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                ->where('diagnosa_pasien.no_rawat', $noRawat)
                ->where('diagnosa_pasien.prioritas', '3')
                ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
                ->first();

            // Ambil terapi obat
            $terapiObatData = DB::table('resep_obat')
                ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
                ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
                ->where('resep_obat.no_rawat', $noRawat)
                ->select('databarang.nama_brng', 'resep_dokter.jml', 'resep_dokter.aturan_pakai')
                ->get();

            $terapiObatString = 'Tidak Ada';
            if ($terapiObatData->isNotEmpty()) {
                $terapiObatArray = [];
                foreach ($terapiObatData as $obat) {
                    $terapiObatArray[] = $obat->nama_brng.' '.$obat->jml.' ['.$obat->aturan_pakai.']';
                }
                $terapiObatString = implode(', ', $terapiObatArray);
            }

            // Parse tensi menjadi sistole/diastole
            $sistole = null;
            $diastole = null;
            if ($pemeriksaan && ! empty($pemeriksaan->tensi) && strpos($pemeriksaan->tensi, '/') !== false) {
                $tensiParts = explode('/', $pemeriksaan->tensi);
                $sistole = trim($tensiParts[0]) ?: null;
                $diastole = isset($tensiParts[1]) ? trim($tensiParts[1]) : null;
            }
            // Fallback ke payload jika tidak ada di pemeriksaan
            $sistole = $sistole ?? (isset($payload['sistole']) ? (string) $payload['sistole'] : null);
            $diastole = $diastole ?? (isset($payload['diastole']) ? (string) $payload['diastole'] : null);

            // Data rujukan
            $rujuk = is_array($payload['rujukLanjut'] ?? null) ? $payload['rujukLanjut'] : [];
            $subSpesialis = is_array($rujuk['subSpesialis'] ?? null) ? $rujuk['subSpesialis'] : [];

            // Normalisasi tanggal
            $tglDaftar = isset($payload['tglDaftar']) ? $this->normalizeDateToYmd((string) $payload['tglDaftar']) : null;
            $tglPulang = isset($payload['tglPulang']) ? $this->normalizeDateToYmd((string) $payload['tglPulang']) : null;
            $tglEstRujuk = isset($rujuk['tglEstRujuk']) ? $this->normalizeDateToYmd((string) $rujuk['tglEstRujuk']) : null;

            // Ambil nama referensi dari database atau payload
            // Nama Poli
            $nmPoli = $poli->nm_poli ?? null;
            if (! $nmPoli && isset($payload['nmPoli'])) {
                $nmPoli = $payload['nmPoli'];
            }

            // Nama Dokter
            $nmDokter = $dokter->nm_dokter ?? null;
            if (! $nmDokter && isset($payload['nmDokter'])) {
                $nmDokter = $payload['nmDokter'];
            }

            // Nama Diagnosa
            $nmDiag1 = $diagnosa1->nm_penyakit ?? null;
            $nmDiag2 = $diagnosa2->nm_penyakit ?? null;
            $nmDiag3 = $diagnosa3->nm_penyakit ?? null;

            // Nama Status Pulang
            $nmStatusPulang = null;
            if (isset($payload['kdStatusPulang'])) {
                $statusPulang = DB::table('status_pulang')
                    ->where('kd_status_pulang', $payload['kdStatusPulang'])
                    ->first();
                $nmStatusPulang = $statusPulang->nm_status_pulang ?? null;
            }
            if (! $nmStatusPulang && isset($payload['nmStatusPulang'])) {
                $nmStatusPulang = $payload['nmStatusPulang'];
            }

            // Nama Kesadaran (Sadar)
            $nmSadar = null;
            if (isset($payload['kdSadar'])) {
                $kesadaran = DB::table('master_kesadaran')
                    ->where('kd_kesadaran', $payload['kdSadar'])
                    ->first();
                $nmSadar = $kesadaran->nm_kesadaran ?? null;
            }

            // Nama TACC
            $nmTACC = null;
            if (isset($payload['kdTacc'])) {
                $kdTacc = (string) $payload['kdTacc'];
                $taccMap = [
                    '-1' => 'Tanpa TACC',
                    '1' => 'Time',
                    '2' => 'Age',
                    '3' => 'Complication',
                    '4' => 'Comorbidity',
                ];
                $nmTACC = $taccMap[$kdTacc] ?? null;
            }

            // Nama SubSpesialis (dari response BPJS atau lookup)
            $kdSubSpesialis = $subSpesialis['kdSubSpesialis1'] ?? $subSpesialis['kdSubSpesialis'] ?? null;
            $nmSubSpesialis = null;

            // Lookup nama subspesialis dari API PCare jika kode tersedia
            if ($kdSubSpesialis) {
                try {
                    // Cari dari spesialis untuk mendapatkan kdSpesialis terlebih dahulu
                    // Kemudian cari subspesialis berdasarkan kdSpesialis
                    $spesialisRes = $this->pcareRequest('GET', 'spesialis', []);
                    $spesialisProcessed = $this->maybeDecryptAndDecompress($spesialisRes['response']->body(), $spesialisRes['timestamp_used']);
                    $spesialisList = is_array($spesialisProcessed) && isset($spesialisProcessed['response']['list'])
                        ? $spesialisProcessed['response']['list']
                        : [];

                    // Cari kdSpesialis yang sesuai
                    foreach ($spesialisList as $sp) {
                        if (isset($sp['kdSpesialis'])) {
                            $subSpRes = $this->pcareRequest('GET', 'spesialis/subspesialis', ['kdSpesialis' => $sp['kdSpesialis']]);
                            $subSpProcessed = $this->maybeDecryptAndDecompress($subSpRes['response']->body(), $subSpRes['timestamp_used']);
                            $subSpList = is_array($subSpProcessed) && isset($subSpProcessed['response']['list'])
                                ? $subSpProcessed['response']['list']
                                : [];

                            foreach ($subSpList as $subSp) {
                                if (isset($subSp['kdSubSpesialis']) && $subSp['kdSubSpesialis'] === $kdSubSpesialis) {
                                    $nmSubSpesialis = $subSp['nmSubSpesialis'] ?? null;
                                    break 2; // Break dari kedua loop
                                }
                            }
                        }
                    }
                } catch (\Throwable $e) {
                    Log::warning('Gagal lookup nmSubSpesialis dari API PCare: '.$e->getMessage());
                }

                // Fallback ke payload jika lookup gagal
                if (! $nmSubSpesialis && isset($payload['nmSubSpesialis'])) {
                    $nmSubSpesialis = $payload['nmSubSpesialis'];
                }
            }

            // Nama Sarana
            $nmSarana = null;
            if (isset($subSpesialis['kdSarana'])) {
                $saranaMap = [
                    '1' => 'Rawat Jalan',
                    '2' => 'Rawat Inap',
                ];
                $nmSarana = $saranaMap[$subSpesialis['kdSarana']] ?? null;
            }

            // Nama PPK (Faskes Rujukan)
            $nmPPK = null;
            if (isset($rujuk['kdppk'])) {
                // Prioritas: gunakan nmPPK dari payload jika tersedia (lebih cepat dan akurat)
                if (isset($payload['nmPPK']) && ! empty(trim($payload['nmPPK']))) {
                    $nmPPK = trim($payload['nmPPK']);
                } else {
                    // Jika tidak ada di payload, lookup dari API PCare provider
                    try {
                        $providerRes = $this->pcareRequest('GET', 'provider', []);
                        $providerProcessed = $this->maybeDecryptAndDecompress($providerRes['response']->body(), $providerRes['timestamp_used']);
                        $providerList = is_array($providerProcessed) && isset($providerProcessed['response']['list'])
                            ? $providerProcessed['response']['list']
                            : [];

                        foreach ($providerList as $provider) {
                            if (isset($provider['kdProvider']) && $provider['kdProvider'] === $rujuk['kdppk']) {
                                $nmPPK = $provider['nmProvider'] ?? null;
                                break;
                            }
                        }
                    } catch (\Throwable $e) {
                        Log::warning('Gagal lookup nmPPK dari API PCare: '.$e->getMessage());
                    }
                }
            }

            // Nama Alergi
            $nmAlergiMakanan = null;
            $nmAlergiUdara = null;
            $nmAlergiObat = null;
            if (isset($payload['alergiMakan'])) {
                $alergiMakan = DB::table('master_alergi')
                    ->where('kd_alergi', $payload['alergiMakan'])
                    ->first();
                $nmAlergiMakanan = $alergiMakan->nm_alergi ?? ($payload['alergiMakan'] === '00' ? 'Tidak Ada' : null);
            }
            if (isset($payload['alergiUdara'])) {
                $alergiUdara = DB::table('master_alergi')
                    ->where('kd_alergi', $payload['alergiUdara'])
                    ->first();
                $nmAlergiUdara = $alergiUdara->nm_alergi ?? ($payload['alergiUdara'] === '00' ? 'Tidak Ada' : null);
            }
            if (isset($payload['alergiObat'])) {
                $alergiObat = DB::table('master_alergi')
                    ->where('kd_alergi', $payload['alergiObat'])
                    ->first();
                $nmAlergiObat = $alergiObat->nm_alergi ?? ($payload['alergiObat'] === '00' ? 'Tidak Ada' : null);
            }

            // Nama Prognosa
            $nmPrognosa = null;
            if (isset($payload['kdPrognosa'])) {
                $prognosa = DB::table('master_prognosa')
                    ->where('kd_prognosa', $payload['kdPrognosa'])
                    ->first();
                $nmPrognosa = $prognosa->nm_prognosa ?? null;
            }

            // Siapkan data untuk insert/update
            $data = [
                'no_rawat' => $noRawat,
                'noKunjungan' => $noKunjungan,
                'tglDaftar' => $tglDaftar,
                'no_rkm_medis' => $reg->no_rkm_medis ?? null,
                'nm_pasien' => $pasien->nm_pasien ?? null,
                'noKartu' => $payload['noKartu'] ?? null,
                'kdPoli' => $payload['kdPoli'] ?? null,
                'nmPoli' => $nmPoli,
                'keluhan' => $payload['keluhan'] ?? null,
                'kdSadar' => $payload['kdSadar'] ?? null,
                'nmSadar' => $nmSadar,
                'sistole' => $sistole,
                'diastole' => $diastole,
                'beratBadan' => isset($payload['beratBadan']) ? (string) $payload['beratBadan'] : ($pemeriksaan->berat ?? null),
                'tinggiBadan' => isset($payload['tinggiBadan']) ? (string) $payload['tinggiBadan'] : ($pemeriksaan->tinggi ?? null),
                'respRate' => isset($payload['respRate']) ? (string) $payload['respRate'] : ($pemeriksaan->respirasi ?? null),
                'heartRate' => isset($payload['heartRate']) ? (string) $payload['heartRate'] : ($pemeriksaan->nadi ?? null),
                'lingkarPerut' => isset($payload['lingkarPerut']) ? (string) $payload['lingkarPerut'] : ($pemeriksaan->lingkar_perut ?? ''),
                'terapi' => $terapiObatString,
                'kdStatusPulang' => $payload['kdStatusPulang'] ?? null,
                'nmStatusPulang' => $nmStatusPulang,
                'tglPulang' => $tglPulang,
                'kdDokter' => $payload['kdDokter'] ?? null,
                'nmDokter' => $nmDokter,
                'kdDiag1' => $payload['kdDiag1'] ?? ($diagnosa1->kd_penyakit ?? null),
                'nmDiag1' => $nmDiag1,
                'kdDiag2' => $payload['kdDiag2'] ?? ($diagnosa2->kd_penyakit ?? null),
                'nmDiag2' => $nmDiag2,
                'kdDiag3' => $payload['kdDiag3'] ?? ($diagnosa3->kd_penyakit ?? null),
                'nmDiag3' => $nmDiag3,
                'tglEstRujuk' => $tglEstRujuk,
                'kdPPK' => $rujuk['kdppk'] ?? null,
                'nmPPK' => $nmPPK ?? '',
                'kdSubSpesialis' => $kdSubSpesialis,
                'nmSubSpesialis' => $nmSubSpesialis,
                'kdSarana' => $subSpesialis['kdSarana'] ?? null,
                'nmSarana' => $nmSarana,
                'kdTACC' => isset($payload['kdTacc']) ? (string) $payload['kdTacc'] : null,
                'nmTACC' => $nmTACC,
                'alasanTACC' => $payload['alasanTacc'] ?? null,
                'KdAlergiMakanan' => $payload['alergiMakan'] ?? '00',
                'NmAlergiMakanan' => $nmAlergiMakanan ?? 'Tidak Ada',
                'KdAlergiUdara' => $payload['alergiUdara'] ?? '00',
                'NmAlergiUdara' => $nmAlergiUdara ?? 'Tidak Ada',
                'KdAlergiObat' => $payload['alergiObat'] ?? '00',
                'NmAlergiObat' => $nmAlergiObat ?? 'Tidak Ada',
                'KdPrognosa' => $payload['kdPrognosa'] ?? '01',
                'NmPrognosa' => $nmPrognosa ?? 'Bonam (Baik)',
                'terapi_non_obat' => $payload['terapiNonObat'] ?? ($pemeriksaan->instruksi ?? 'Edukasi Kesehatan'),
                'bmhp' => $payload['bmhp'] ?? 'Tidak Ada',
            ];

            $this->safeUpsert('pcare_rujuk_subspesialis', ['no_rawat' => $noRawat], $data);
        } catch (\Throwable $e) {
            Log::error('Error saving pcare_rujuk_subspesialis: '.$e->getMessage(), [
                'no_rawat' => $noRawat,
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    /**
     * Normalisasi tanggal dd-mm-YYYY ⇄ YYYY-mm-dd (mengembalikan Y-m-d atau null jika tidak valid).
     */
    protected function normalizeDateToYmd(string $dateStr): ?string
    {
        $dateStr = trim($dateStr);
        if ($dateStr === '') {
            return null;
        }
        // Jika format sudah YYYY-mm-dd
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateStr)) {
            return $dateStr;
        }
        // Jika dd-mm-YYYY atau dd/mm/YYYY → ubah ke YYYY-mm-dd
        if (preg_match('/^(\d{2})[\/-](\d{2})[\/-](\d{4})$/', $dateStr, $m)) {
            return $m[3].'-'.$m[2].'-'.$m[1];
        }
        // Jika YYYY/mm/dd → ubah ke YYYY-mm-dd
        if (preg_match('/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/', $dateStr, $m)) {
            return $m[1].'-'.$m[2].'-'.$m[3];
        }

        return null;
    }

    /**
     * Upsert aman: hanya menyertakan kolom yang tersedia di tabel.
     */
    protected function safeUpsert(string $table, array $keys, array $data): void
    {
        try {
            if (! Schema::hasTable($table)) {
                return;
            }
            $cols = Schema::getColumnListing($table);
            $filtered = [];
            foreach ($data as $k => $v) {
                if (in_array($k, $cols, true)) {
                    $filtered[$k] = $v;
                }
            }
            // Tambahkan updated_at jika ada di tabel
            if (in_array('updated_at', $cols, true)) {
                $filtered['updated_at'] = now();
            }
            DB::table($table)->updateOrInsert($keys, $filtered);
        } catch (\Throwable $e) {
            // Log dan lanjutkan tanpa memblokir alur
            Log::error('safeUpsert error', ['table' => $table, 'error' => $e->getMessage()]);
        }
    }

    /**
     * Ambil data rujukan subspesialis PCare berdasarkan nomor rawat.
     * Sumber tabel: pcare_rujuk_subspesialis dengan join ke reg_periksa dan pasien untuk data lengkap.
     */
    public function getRujukanSubspesialisByRawat(string $noRawat)
    {
        $noRawat = trim($noRawat);
        if ($noRawat === '') {
            return response()->json([
                'success' => false,
                'message' => 'Parameter no_rawat wajib diisi',
            ], 422);
        }

        try {
            if (! Schema::hasTable('pcare_rujuk_subspesialis')) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'message' => 'Tabel pcare_rujuk_subspesialis tidak tersedia',
                ], 404);
            }

            $data = DB::table('pcare_rujuk_subspesialis')
                ->where('pcare_rujuk_subspesialis.no_rawat', $noRawat)
                ->leftJoin('reg_periksa', 'pcare_rujuk_subspesialis.no_rawat', '=', 'reg_periksa.no_rawat')
                ->leftJoin('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->leftJoin('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->select(
                    'pcare_rujuk_subspesialis.*',
                    'reg_periksa.umurdaftar',
                    'reg_periksa.sttsumur',
                    'reg_periksa.hubunganpj',
                    'reg_periksa.tgl_registrasi as tglDaftar',
                    'pasien.tgl_lahir',
                    'pasien.jk',
                    'dokter.nm_dokter'
                )
                ->first();

            if (! $data) {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'message' => 'Data rujukan tidak ditemukan',
                ], 404);
            }

            // Mapping hubungan keluarga ke status BPJS
            $hubunganMap = [
                'Peserta' => '1',
                'Istri' => '2',
                'Anak' => '3',
            ];
            $hubunganpj = $data->hubunganpj ?? '';
            $statusPeserta = '4'; // Default lainnya
            foreach ($hubunganMap as $key => $value) {
                if (stripos($hubunganpj, $key) !== false) {
                    $statusPeserta = $value;
                    break;
                }
            }

            // Format jenis kelamin
            $jenisKelamin = '';
            if ($data->jk === 'L' || $data->jk === 'Laki-laki' || $data->jk === 'LAKI-LAKI') {
                $jenisKelamin = 'L';
            } elseif ($data->jk === 'P' || $data->jk === 'Perempuan' || $data->jk === 'PEREMPUAN') {
                $jenisKelamin = 'P';
            }

            // Tambahkan data tambahan ke response
            $data->statusPeserta = $statusPeserta;
            $data->jenisKelamin = $jenisKelamin;
            $data->umur = $data->umurdaftar ?? null;
            $data->satuanUmur = $data->sttsumur ?? 'Th';

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error getting rujukan subspesialis by rawat: '.$e->getMessage(), [
                'no_rawat' => $noRawat,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengambil data rujukan',
            ], 500);
        }
    }

    public function monitoringSummary(Request $request)
    {
        $startY = $this->normalizeDateToYmd((string) $request->query('start'));
        $endY = $this->normalizeDateToYmd((string) $request->query('end'));

        $hasPcare = Schema::hasTable('pcare_kunjungan_umum');
        $byRaw = [];

        if ($hasPcare) {
            $q1 = DB::table('pcare_kunjungan_umum')->select(['no_rawat', 'tglDaftar', 'status']);
            $rows1 = $q1->limit(2000)->get();
            foreach ($rows1 as $r) {
                $key = (string) $r->no_rawat;
                $byRaw[$key] = [
                    'tgl' => (string) $r->tglDaftar,
                    'status' => (string) $r->status,
                ];
            }
        }

        $q2 = DB::table('reg_periksa')->select(['no_rawat', DB::raw('tgl_registrasi as tglDaftar')]);
        if (Schema::hasColumn('reg_periksa', 'status_pcare')) {
            $q2->addSelect(DB::raw('status_pcare as status'));
        } else {
            $q2->addSelect(DB::raw('"" as status'));
        }
        if ($startY) {
            $q2->whereDate('tgl_registrasi', '>=', $startY);
        }
        if ($endY) {
            $q2->whereDate('tgl_registrasi', '<=', $endY);
        }
        $rows2 = $q2->limit(2000)->get();
        foreach ($rows2 as $r) {
            $key = (string) $r->no_rawat;
            if (! isset($byRaw[$key])) {
                $mapped = $r->status === 'sent' ? 'Terkirim' : ($r->status === 'failed' ? 'Gagal' : (string) $r->status);
                $byRaw[$key] = [
                    'tgl' => (string) $r->tglDaftar,
                    'status' => $mapped,
                ];
            }
        }

        $filtered = [];
        foreach ($byRaw as $k => $v) {
            $ymd = $this->normalizeDateToYmd((string) $v['tgl']);
            if ($startY && $ymd && strcmp($ymd, $startY) < 0) {
                continue;
            }
            if ($endY && $ymd && strcmp($ymd, $endY) > 0) {
                continue;
            }
            $filtered[$k] = $v;
        }

        $success = 0;
        $failed = 0;
        foreach ($filtered as $v) {
            if ($v['status'] === 'Terkirim') {
                $success++;
            } elseif ($v['status'] === 'Gagal') {
                $failed++;
            }
        }

        return response()->json(['success' => $success, 'failed' => $failed]);
    }

    public function pendaftaranSummary(Request $request)
    {
        $startY = $this->normalizeDateToYmd((string) $request->query('start'));
        $endY = $this->normalizeDateToYmd((string) $request->query('end'));
        if (! Schema::hasTable('pcare_pendaftaran')) {
            return response()->json(['success' => 0, 'failed' => 0]);
        }
        $q = DB::table('pcare_pendaftaran');
        if ($startY) {
            $q->whereDate('tglDaftar', '>=', $startY);
        }
        if ($endY) {
            $q->whereDate('tglDaftar', '<=', $endY);
        }
        $rows = $q->select(['status'])->limit(5000)->get();
        $success = 0;
        $failed = 0;
        foreach ($rows as $r) {
            if ((string) ($r->status ?? '') === 'Terkirim') {
                $success++;
            } elseif ((string) ($r->status ?? '') === 'Gagal') {
                $failed++;
            }
        }

        return response()->json(['success' => $success, 'failed' => $failed]);
    }

    public function monitoringAttempts(Request $request)
    {
        $statusFilter = (string) $request->query('status', '');
        $startY = $this->normalizeDateToYmd((string) $request->query('start'));
        $endY = $this->normalizeDateToYmd((string) $request->query('end'));

        $hasPcare = Schema::hasTable('pcare_kunjungan_umum');
        $byRaw = [];

        if ($hasPcare) {
            $q1 = DB::table('pcare_kunjungan_umum as p')
                ->leftJoin('reg_periksa as r', 'r.no_rawat', '=', 'p.no_rawat')
                ->leftJoin('pasien as ps', 'ps.no_rkm_medis', '=', 'r.no_rkm_medis')
                ->leftJoin('dokter as d', 'd.kd_dokter', '=', 'r.kd_dokter')
                ->leftJoin('poliklinik as polr', 'polr.kd_poli', '=', 'r.kd_poli')
                ->leftJoin('poliklinik as polp', 'polp.kd_poli', '=', 'p.kdPoli')
                ->select([
                    'p.no_rawat',
                    'p.tglDaftar',
                    DB::raw('COALESCE(p.kdPoli, r.kd_poli) as kdPoli'),
                    DB::raw('COALESCE(p.nmPoli, polr.nm_poli, polp.nm_poli) as nmPoli'),
                    DB::raw('COALESCE(ps.nm_pasien, p.nm_pasien, "") as nama'),
                    DB::raw('COALESCE(r.no_rkm_medis, ps.no_rkm_medis, p.no_rkm_medis) as no_rkm_medis'),
                    DB::raw('COALESCE(d.nm_dokter, p.nmDokter, "") as dokter'),
                    'p.status',
                    'p.noKunjungan',
                ]);
            $rows1 = $q1->limit(2000)->get();
            foreach ($rows1 as $r) {
                $key = (string) $r->no_rawat;
                $byRaw[$key] = [
                    'no_rawat' => $key,
                    'tglDaftar' => (string) $r->tglDaftar,
                    'kdPoli' => (string) ($r->kdPoli ?? ''),
                    'nmPoli' => (string) ($r->nmPoli ?? ''),
                    'nama' => (string) ($r->nama ?? ''),
                    'no_rkm_medis' => (string) ($r->no_rkm_medis ?? ''),
                    'dokter' => (string) ($r->dokter ?? ''),
                    'status' => (string) ($r->status ?? ''),
                    'noKunjungan' => (string) ($r->noKunjungan ?? ''),
                ];
            }
        }

        $q2 = DB::table('reg_periksa as r')
            ->leftJoin('pasien as ps', 'ps.no_rkm_medis', '=', 'r.no_rkm_medis')
            ->leftJoin('dokter as d', 'd.kd_dokter', '=', 'r.kd_dokter')
            ->leftJoin('poliklinik as pol', 'pol.kd_poli', '=', 'r.kd_poli')
            ->select([
                'r.no_rawat',
                DB::raw('r.tgl_registrasi as tglDaftar'),
                DB::raw('r.kd_poli as kdPoli'),
                DB::raw('pol.nm_poli as nmPoli'),
                DB::raw('ps.nm_pasien as nama'),
                DB::raw('ps.no_rkm_medis as no_rkm_medis'),
                DB::raw('d.nm_dokter as dokter'),
            ]);
        if (Schema::hasColumn('reg_periksa', 'status_pcare')) {
            $q2->addSelect(DB::raw('r.status_pcare as status'));
        } else {
            $q2->addSelect(DB::raw('"" as status'));
        }
        if (Schema::hasColumn('reg_periksa', 'response_pcare')) {
            $q2->addSelect(DB::raw('r.response_pcare as noKunjungan'));
        } else {
            $q2->addSelect(DB::raw('"" as noKunjungan'));
        }
        if ($startY) {
            $q2->whereDate('tgl_registrasi', '>=', $startY);
        }
        if ($endY) {
            $q2->whereDate('tgl_registrasi', '<=', $endY);
        }
        $rows2 = $q2->limit(2000)->get();
        foreach ($rows2 as $r) {
            $key = (string) $r->no_rawat;
            if (! isset($byRaw[$key])) {
                $mapped = $r->status === 'sent' ? 'Terkirim' : ($r->status === 'failed' ? 'Gagal' : (string) $r->status);
                $byRaw[$key] = [
                    'no_rawat' => $key,
                    'tglDaftar' => (string) $r->tglDaftar,
                    'kdPoli' => (string) ($r->kdPoli ?? ''),
                    'nmPoli' => (string) ($r->nmPoli ?? ''),
                    'nama' => (string) ($r->nama ?? ''),
                    'no_rkm_medis' => (string) ($r->no_rkm_medis ?? ''),
                    'dokter' => (string) ($r->dokter ?? ''),
                    'status' => $mapped,
                    'noKunjungan' => (string) ($r->noKunjungan ?? ''),
                ];
            }
        }

        $out = [];
        foreach ($byRaw as $row) {
            if ($statusFilter !== '' && (string) $row['status'] !== $statusFilter) {
                continue;
            }
            $ymd = $this->normalizeDateToYmd((string) $row['tglDaftar']);
            if ($startY && $ymd && strcmp($ymd, $startY) < 0) {
                continue;
            }
            if ($endY && $ymd && strcmp($ymd, $endY) > 0) {
                continue;
            }
            $out[] = $row;
        }

        usort($out, function ($a, $b) {
            $da = $this->normalizeDateToYmd((string) $a['tglDaftar']) ?? '';
            $db = $this->normalizeDateToYmd((string) $b['tglDaftar']) ?? '';

            return strcmp($db, $da);
        });

        if (count($out) > 500) {
            $out = array_slice($out, 0, 500);
        }

        return response()->json(['data' => array_values($out)]);
    }

    public function bpjsLogList(Request $request)
    {
        if (! \Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
            return response()->json(['data' => []]);
        }
        $endpoint = trim((string) $request->query('endpoint', ''));
        $status = trim((string) $request->query('status', ''));
        $q = trim((string) $request->query('q', ''));
        $startY = $this->normalizeDateToYmd((string) $request->query('start'));
        $endY = $this->normalizeDateToYmd((string) $request->query('end'));
        $limit = (int) $request->query('limit', 200);
        if ($limit < 1) {
            $limit = 200;
        }
        if ($limit > 1000) {
            $limit = 1000;
        }

        $qbuilder = \Illuminate\Support\Facades\DB::table('pcare_bpjs_log');
        if ($endpoint !== '') {
            $qbuilder->where('endpoint', $endpoint);
        }
        if ($status !== '') {
            $qbuilder->where('status', $status);
        }
        if ($q !== '') {
            $qbuilder->where('no_rawat', 'like', '%'.$q.'%');
        }
        if ($startY) {
            $qbuilder->whereDate('created_at', '>=', $startY);
        }
        if ($endY) {
            $qbuilder->whereDate('created_at', '<=', $endY);
        }
        $rows = $qbuilder
            ->select(['id', 'no_rawat', 'endpoint', 'status', 'http_status', 'meta_code', 'meta_message', 'duration_ms', 'request_payload', 'response_body_json', 'response_body_raw', 'created_at'])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();

        $out = [];
        foreach ($rows as $r) {
            $req = null;
            $resp = null;
            $rawPrev = '';
            try {
                $req = is_string($r->request_payload) ? json_decode($r->request_payload, true) : $r->request_payload;
            } catch (\Throwable $e) {
                $req = null;
            }
            try {
                $resp = is_string($r->response_body_json) ? json_decode($r->response_body_json, true) : $r->response_body_json;
            } catch (\Throwable $e) {
                $resp = null;
            }
            try {
                $rawPrev = substr((string) ($r->response_body_raw ?? ''), 0, 1200);
            } catch (\Throwable $e) {
                $rawPrev = '';
            }
            $out[] = [
                'id' => (int) $r->id,
                'no_rawat' => (string) ($r->no_rawat ?? ''),
                'endpoint' => (string) ($r->endpoint ?? ''),
                'status' => (string) ($r->status ?? ''),
                'http_status' => (int) ($r->http_status ?? 0),
                'meta_code' => $r->meta_code !== null ? (int) $r->meta_code : null,
                'meta_message' => (string) ($r->meta_message ?? ''),
                'duration_ms' => $r->duration_ms !== null ? (int) $r->duration_ms : null,
                'request_payload' => $req,
                'response_body_json' => $resp,
                'response_preview' => $rawPrev,
                'created_at' => optional($r->created_at)->format('Y-m-d H:i:s'),
            ];
        }

        return response()->json(['data' => $out]);
    }

    public function bpjsLogByRawat(string $noRawat)
    {
        $noRawat = trim($noRawat);
        if ($noRawat === '' || ! \Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
            return response()->json(['data' => []]);
        }
        $rows = \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('created_at')
            ->limit(200)
            ->get();
        $out = [];
        foreach ($rows as $r) {
            $req = null;
            $resp = null;
            $rawPrev = '';
            try {
                $req = is_string($r->request_payload) ? json_decode($r->request_payload, true) : $r->request_payload;
            } catch (\Throwable $e) {
                $req = null;
            }
            try {
                $resp = is_string($r->response_body_json) ? json_decode($r->response_body_json, true) : $r->response_body_json;
            } catch (\Throwable $e) {
                $resp = null;
            }
            try {
                $rawPrev = substr((string) ($r->response_body_raw ?? ''), 0, 1200);
            } catch (\Throwable $e) {
                $rawPrev = '';
            }
            $out[] = [
                'id' => (int) $r->id,
                'no_rawat' => (string) ($r->no_rawat ?? ''),
                'endpoint' => (string) ($r->endpoint ?? ''),
                'status' => (string) ($r->status ?? ''),
                'http_status' => (int) ($r->http_status ?? 0),
                'meta_code' => $r->meta_code !== null ? (int) $r->meta_code : null,
                'meta_message' => (string) ($r->meta_message ?? ''),
                'duration_ms' => $r->duration_ms !== null ? (int) $r->duration_ms : null,
                'request_payload' => $req,
                'response_body_json' => $resp,
                'response_preview' => $rawPrev,
                'created_at' => optional($r->created_at)->format('Y-m-d H:i:s'),
            ];
        }

        return response()->json(['data' => $out]);
    }

    public function pendaftaranList(Request $request)
    {
        try {
            $status = (string) $request->query('status', '');
            $startY = $this->normalizeDateToYmd((string) $request->query('start'));
            $endY = $this->normalizeDateToYmd((string) $request->query('end'));
            if (! Schema::hasTable('pcare_pendaftaran')) {
                return response()->json(['data' => []]);
            }
            $q = DB::table('pcare_pendaftaran as p')->select([
                'p.no_rawat',
                'p.tglDaftar',
                'p.no_rkm_medis',
                'p.nm_pasien',
                'p.kdPoli',
                'p.nmPoli',
                'p.status',
                'p.noUrut',
            ]);
            $hasReg = Schema::hasTable('reg_periksa');
            if ($hasReg) {
                $q = $q->leftJoin('reg_periksa as r', 'r.no_rawat', '=', 'p.no_rawat');
                if (Schema::hasColumn('reg_periksa', 'response_pcare')) {
                    $q->addSelect(DB::raw('r.response_pcare as response_pcare'));
                } else {
                    $q->addSelect(DB::raw('"" as response_pcare'));
                }
            } else {
                $q->addSelect(DB::raw('"" as response_pcare'));
            }
            if ($status !== '') {
                $q->where('p.status', $status);
            }
            if ($startY) {
                $q->whereDate('p.tglDaftar', '>=', $startY);
            }
            if ($endY) {
                $q->whereDate('p.tglDaftar', '<=', $endY);
            }
            $rows = $q->orderByDesc('p.tglDaftar')->orderByDesc('p.noUrut')->limit(1000)->get();
            $out = [];
            foreach ($rows as $r) {
                $nu = (string) ($r->noUrut ?? '');
                if ($nu === '' && isset($r->response_pcare) && is_string($r->response_pcare)) {
                    $decoded = json_decode($r->response_pcare, true);
                    if (is_array($decoded)) {
                        $resp = $decoded['response'] ?? [];
                        if (($resp['field'] ?? '') === 'noUrut') {
                            $nu = (string) (($resp['message'] ?? ($resp['value'] ?? '')));
                        } elseif (isset($resp['noUrut'])) {
                            $nu = (string) $resp['noUrut'];
                        }
                    }
                }
                $out[] = [
                    'no_rawat' => (string) ($r->no_rawat ?? ''),
                    'tglDaftar' => (string) ($r->tglDaftar ?? ''),
                    'no_rkm_medis' => (string) ($r->no_rkm_medis ?? ''),
                    'nm_pasien' => (string) ($r->nm_pasien ?? ''),
                    'kdPoli' => (string) ($r->kdPoli ?? ''),
                    'nmPoli' => (string) ($r->nmPoli ?? ''),
                    'noUrut' => $nu,
                    'dokter' => '',
                    'status' => (string) ($r->status ?? ''),
                ];
            }

            return response()->json(['data' => $out]);
        } catch (\Throwable $e) {
            try {
                \Illuminate\Support\Facades\Log::channel('bpjs')->error('pendaftaranList error', [
                    'error' => $e->getMessage(),
                ]);
            } catch (\Throwable $ie) {
            }

            return response()->json(['data' => []], 200);
        }
    }

    public function monitoringRaw(string $noRawat)
    {
        $noRawat = trim($noRawat);
        if ($noRawat === '') {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }
        if (Schema::hasTable('pcare_kunjungan_umum')) {
            $select = [
                'p.no_rawat',
                'p.tglDaftar',
                'p.kdPoli',
                'p.status',
                'p.noKunjungan',
            ];
            if (Schema::hasColumn('reg_periksa', 'response_pcare')) {
                $select[] = DB::raw('r.response_pcare as raw');
            } else {
                $select[] = DB::raw('"" as raw');
            }
            $row = DB::table('pcare_kunjungan_umum as p')
                ->leftJoin('reg_periksa as r', 'r.no_rawat', '=', 'p.no_rawat')
                ->select($select)
                ->where('p.no_rawat', $noRawat)
                ->first();
            $data = $row ? (array) $row : null;
            $rawCache = Cache::get('pcare_resend_raw_'.$noRawat);
            $rawFile = null;
            try {
                $path = 'pcare_resend/'.$noRawat.'.json';
                if (Storage::disk('local')->exists($path)) {
                    $rawFile = Storage::disk('local')->get($path);
                }
            } catch (\Throwable $e) {
            }
            if ($data) {
                if ((string) ($data['raw'] ?? '') === '' && is_string($rawCache) && $rawCache !== '') {
                    $data['raw'] = $rawCache;
                } elseif ((string) ($data['raw'] ?? '') === '' && is_string($rawFile) && $rawFile !== '') {
                    $data['raw'] = $rawFile;
                }
            } else {
                if (is_string($rawCache) && $rawCache !== '') {
                    $data = ['no_rawat' => $noRawat, 'raw' => $rawCache];
                } elseif (is_string($rawFile) && $rawFile !== '') {
                    $data = ['no_rawat' => $noRawat, 'raw' => $rawFile];
                }
            }
            if ($data) {
                $desc = null;
                $rawStr = is_array($data['raw'] ?? null) ? json_encode($data['raw']) : (string) ($data['raw'] ?? '');
                $rawArr = null;
                try {
                    $rawArr = json_decode($rawStr, true);
                } catch (\Throwable $e) {
                }
                if (is_array($rawArr)) {
                    $meta = $rawArr['metaData'] ?? [];
                    $resp = $rawArr['response'] ?? [];
                    $parts = [];
                    if (isset($meta['code'])) {
                        $parts[] = 'code: '.(string) $meta['code'];
                    }
                    if (isset($meta['message'])) {
                        $parts[] = 'message: '.(string) $meta['message'];
                    }
                    if (isset($resp['noKunjungan'])) {
                        $parts[] = 'noKunjungan: '.(string) $resp['noKunjungan'];
                    }
                    if (isset($resp['noUrut'])) {
                        $parts[] = 'noUrut: '.(string) $resp['noUrut'];
                    }
                    if (isset($resp['field']) || isset($resp['message'])) {
                        $parts[] = 'field: '.(string) ($resp['field'] ?? '').' message: '.(string) ($resp['message'] ?? '');
                    }
                    $desc = implode(' | ', $parts);
                    $data['parsed'] = $rawArr;
                }
                $data['desc'] = $desc;
            }

            return response()->json(['data' => $data]);
        }
        $select2 = [
            'no_rawat',
            DB::raw('tgl_registrasi as tglDaftar'),
            DB::raw('kd_poli as kdPoli'),
        ];
        if (Schema::hasColumn('reg_periksa', 'status_pcare')) {
            $select2[] = DB::raw('status_pcare as status');
        } else {
            $select2[] = DB::raw('"" as status');
        }
        if (Schema::hasColumn('reg_periksa', 'response_pcare')) {
            $select2[] = DB::raw('response_pcare as raw');
        } else {
            $select2[] = DB::raw('"" as raw');
        }
        $row = DB::table('reg_periksa')
            ->where('no_rawat', $noRawat)
            ->select($select2)
            ->first();
        $data = $row ? (array) $row : null;
        $rawCache = Cache::get('pcare_resend_raw_'.$noRawat);
        $rawFile = null;
        try {
            $path = 'pcare_resend/'.$noRawat.'.json';
            if (Storage::disk('local')->exists($path)) {
                $rawFile = Storage::disk('local')->get($path);
            }
        } catch (\Throwable $e) {
        }
        if ($data) {
            if ((string) ($data['raw'] ?? '') === '' && is_string($rawCache) && $rawCache !== '') {
                $data['raw'] = $rawCache;
            } elseif ((string) ($data['raw'] ?? '') === '' && is_string($rawFile) && $rawFile !== '') {
                $data['raw'] = $rawFile;
            }
        } else {
            if (is_string($rawCache) && $rawCache !== '') {
                $data = ['no_rawat' => $noRawat, 'raw' => $rawCache];
            } elseif (is_string($rawFile) && $rawFile !== '') {
                $data = ['no_rawat' => $noRawat, 'raw' => $rawFile];
            }
        }
        if ($data) {
            $desc = null;
            $rawStr = is_array($data['raw'] ?? null) ? json_encode($data['raw']) : (string) ($data['raw'] ?? '');
            $rawArr = null;
            try {
                $rawArr = json_decode($rawStr, true);
            } catch (\Throwable $e) {
            }
            if (is_array($rawArr)) {
                $meta = $rawArr['metaData'] ?? [];
                $resp = $rawArr['response'] ?? [];
                $parts = [];
                if (isset($meta['code'])) {
                    $parts[] = 'code: '.(string) $meta['code'];
                }
                if (isset($meta['message'])) {
                    $parts[] = 'message: '.(string) $meta['message'];
                }
                if (isset($resp['noKunjungan'])) {
                    $parts[] = 'noKunjungan: '.(string) $resp['noKunjungan'];
                }
                if (isset($resp['noUrut'])) {
                    $parts[] = 'noUrut: '.(string) $resp['noUrut'];
                }
                if (isset($resp['field']) || isset($resp['message'])) {
                    $parts[] = 'field: '.(string) ($resp['field'] ?? '').' message: '.(string) ($resp['message'] ?? '');
                }
                $desc = implode(' | ', $parts);
                $data['parsed'] = $rawArr;
            }
            $data['desc'] = $desc;
        }

        return response()->json(['data' => $data]);
    }

    public function resendByNoRawat(Request $request, string $noRawat)
    {
        $noRawat = trim($noRawat);
        if ($noRawat === '') {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }
        PcareResendJob::dispatch($noRawat);

        return response()->json(['queued' => true]);
    }

    public function massSend(Request $request)
    {
        $list = $request->input('no_rawat');
        if (! is_array($list) || empty($list)) {
            if (Schema::hasTable('pcare_kunjungan_umum')) {
                $list = DB::table('pcare_kunjungan_umum')->where('status', 'Gagal')->orderBy('tglDaftar')->limit(100)->pluck('no_rawat')->all();
            } else {
                $list = DB::table('reg_periksa')->where('status_pcare', 'failed')->orderBy('tgl_registrasi')->limit(100)->pluck('no_rawat')->all();
            }
        }
        if (empty($list)) {
            return response()->json(['queued' => false, 'message' => 'Tidak ada data untuk dikirim'], 200);
        }
        PcareMassSendJob::dispatch($list);

        return response()->json(['queued' => true, 'count' => count($list)]);
    }

    /**
     * Ambil config kabupaten/kota BPJS PCare dari config.
     */
    public function getKabupatenConfig()
    {
        try {
            $kabupaten = config('bpjs.pcare.kabupaten', '');

            return response()->json([
                'success' => true,
                'kabupaten' => $kabupaten,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error getting kabupaten config: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'kabupaten' => '',
            ], 500);
        }
    }

    /**
     * Ambil data pendaftaran PCare terakhir berdasarkan nomor rawat.
     * Sumber tabel: pcare_pendaftaran
     */
    public function getPendaftaranByRawat(string $noRawat)
    {
        $noRawat = trim($noRawat);
        if ($noRawat === '') {
            return response()->json([
                'success' => false,
                'message' => 'Parameter no_rawat wajib diisi',
            ], 422);
        }

        try {
            $row = DB::table('pcare_pendaftaran')
                ->where('no_rawat', $noRawat)
                ->orderByDesc('tglDaftar')
                ->orderByDesc('noUrut')
                ->first();

            if (! $row) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'Belum ada data pendaftaran untuk no_rawat ini',
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $row,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Add Data Pendaftaran (BPJS PCare Catalog)
     * Endpoint: POST {Base URL}/{Service Name}/pendaftaran
     * Content-Type: text/plain
     * Payload fields mapped from UI and RS tables.
     */
    public function addPendaftaran(Request $request)
    {
        $noRawat = trim((string) $request->input('no_rawat', ''));
        if ($noRawat === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter no_rawat wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        // Ambil data registrasi & pasien
        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
        if (! $reg) {
            return response()->json([
                'metaData' => [
                    'message' => 'Data reg_periksa tidak ditemukan untuk no_rawat: '.$noRawat,
                    'code' => 404,
                ],
            ], 404);
        }

        // Validasi kd_pj: hanya BPJ dan PBI yang boleh dikirim ke PCare pendaftaran
        try {
            $kdPj = strtoupper(trim((string) ($reg->kd_pj ?? '')));
            if (! in_array($kdPj, ['BPJ', 'PBI'], true)) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->info('Lewati PCare pendaftaran: kd_pj bukan BPJ/PBI', [
                    'no_rawat' => $noRawat,
                    'kd_pj' => $kdPj,
                ]);

                return response()->json([
                    'metaData' => [
                        'message' => 'Lewati: pendaftaran PCare hanya untuk penjamin BPJ atau PBI',
                        'code' => 200,
                    ],
                    'response' => null,
                    'skipped' => true,
                ], 200);
            }
        } catch (\Throwable $e) {
            // Jika terjadi error pada validasi, kembalikan sebagai 500 agar tidak mengirim ke PCare secara tidak sengaja
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal memproses validasi kd_pj: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }
        $pasien = DB::table('pasien')->where('no_rkm_medis', $reg->no_rkm_medis)->first();
        if (! $pasien) {
            return response()->json([
                'metaData' => [
                    'message' => 'Data pasien tidak ditemukan untuk no_rkm_medis: '.$reg->no_rkm_medis,
                    'code' => 404,
                ],
            ], 404);
        }

        // Validasi nomor kartu BPJS (no_peserta)
        $noKartu = trim((string) ($pasien->no_peserta ?? ''));
        if ($noKartu === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Nomor kartu BPJS pasien (no_peserta) tidak tersedia',
                    'code' => 422,
                ],
            ], 422);
        }

        // Mapping kdPoli RS -> kdPoli PCare
        $kdPoliRs = trim((string) ($reg->kd_poli ?? ''));
        $mapPoli = null;
        if ($kdPoliRs !== '') {
            $mapPoli = DB::table('maping_poliklinik_pcare')->where('kd_poli_rs', $kdPoliRs)->first();
        }
        $kdPoli = $mapPoli?->kd_poli_pcare ?: $kdPoliRs ?: '';
        $nmPoli = $mapPoli?->nm_poli_pcare ?: (DB::table('poliklinik')->where('kd_poli', $kdPoliRs)->value('nm_poli') ?: '');

        // Konfigurasi provider
        $cfg = $this->pcareConfig();
        $kdProviderPeserta = trim((string) ($cfg['kode_ppk'] ?? ''));
        if ($kdProviderPeserta === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'BPJS_PCARE_KODE_PPK belum dikonfigurasi (.env/config).',
                    'code' => 422,
                ],
            ], 422);
        }

        // Ambil & parsing data dari request (form CPPT)
        $keluhan = (string) $request->input('keluhan', '');
        $tensi = trim((string) $request->input('tensi', ''));
        $sistole = 0;
        $diastole = 0;
        if ($tensi !== '') {
            $parts = preg_split('/\s*\/\s*/', $tensi);
            if (is_array($parts) && count($parts) >= 2) {
                $sistole = (int) preg_replace('/[^0-9]/', '', $parts[0]);
                $diastole = (int) preg_replace('/[^0-9]/', '', $parts[1]);
            } else {
                // Jika hanya satu angka, asumsikan sistole
                $sistole = (int) preg_replace('/[^0-9]/', '', $tensi);
            }
        }
        $beratBadan = (int) preg_replace('/[^0-9]/', '', (string) $request->input('berat', '0'));
        $tinggiBadan = (int) preg_replace('/[^0-9]/', '', (string) $request->input('tinggi', '0'));
        $respRate = (int) preg_replace('/[^0-9]/', '', (string) $request->input('respirasi', '0'));
        $lingkarPerut = (int) preg_replace('/[^0-9]/', '', (string) $request->input('lingkar_perut', '0'));
        $heartRate = (int) preg_replace('/[^0-9]/', '', (string) $request->input('nadi', '0'));

        // Tanggal daftar: gunakan tgl_perawatan dari form atau tanggal hari ini
        $tglPerawatan = (string) $request->input('tgl_perawatan', date('Y-m-d'));
        // Format ke dd-mm-YYYY sesuai katalog
        try {
            $date = new \DateTime($tglPerawatan);
            $tglDaftarFormatted = $date->format('d-m-Y');
        } catch (\Throwable $e) {
            $tglDaftarFormatted = date('d-m-Y');
        }

        // Payload ke PCare
        $payload = [
            'kdProviderPeserta' => $kdProviderPeserta,
            'tglDaftar' => $tglDaftarFormatted,
            'noKartu' => $noKartu,
            'kdPoli' => $kdPoli,
            'keluhan' => $keluhan !== '' ? $keluhan : null,
            'kunjSakit' => true,
            'sistole' => $sistole,
            'diastole' => $diastole,
            'beratBadan' => $beratBadan,
            'tinggiBadan' => $tinggiBadan,
            'respRate' => $respRate,
            'lingkarPerut' => $lingkarPerut,
            'heartRate' => $heartRate,
            'rujukBalik' => 0,
            'kdTkp' => '10',
        ];

        $start = microtime(true);
        try {
            $result = $this->pcareRequest('POST', 'pendaftaran', [], $payload, ['Content-Type' => 'text/plain']);
        } catch (\Throwable $e) {
            // Simpan ke tabel sebagai Gagal
            $this->savePcarePendaftaran($noRawat, $reg, $pasien, $kdProviderPeserta, $noKartu, $kdPoli, $nmPoli, $keluhan, $sistole, $diastole, $beratBadan, $tinggiBadan, $respRate, $lingkarPerut, $heartRate, '10', '', false, $tglPerawatan);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal mengirim ke BPJS PCare: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
        $durationMs = (int) round((microtime(true) - $start) * 1000);

        // Ekstrak noUrut dari response jika tersedia
        $noUrut = '';
        $statusOk = ($response->status() === 201);
        if (is_array($processed) && isset($processed['response']) && is_array($processed['response'])) {
            $resp = $processed['response'];
            if (($resp['field'] ?? '') === 'noUrut') {
                $noUrut = (string) ($resp['message'] ?? ($resp['value'] ?? ''));
            } elseif (isset($resp['noUrut'])) {
                $noUrut = (string) $resp['noUrut'];
            }
        }

        $this->savePcarePendaftaran($noRawat, $reg, $pasien, $kdProviderPeserta, $noKartu, $kdPoli, $nmPoli, $keluhan, $sistole, $diastole, $beratBadan, $tinggiBadan, $respRate, $lingkarPerut, $heartRate, '10', $noUrut, $statusOk, $tglPerawatan);

        $meta = is_array($processed) ? ($processed['metaData'] ?? ($processed['metadata'] ?? [])) : [];
        $metaCode = is_array($meta) ? (int) ($meta['code'] ?? 0) : null;
        $metaMessage = is_array($meta) ? (string) ($meta['message'] ?? '') : null;
        $statusLabel = $response->status() >= 200 && $response->status() < 300 ? 'success' : 'failed';
        if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log')) {
            $card = (string) $noKartu;
            $maskedCard = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
            $reqPayload = [
                'kdProviderPeserta' => $kdProviderPeserta,
                'tglDaftar' => $tglDaftarFormatted,
                'kdPoli' => $kdPoli,
                'keluhan' => $keluhan !== '' ? $keluhan : null,
                'sistole' => $sistole,
                'diastole' => $diastole,
                'beratBadan' => $beratBadan,
                'tinggiBadan' => $tinggiBadan,
                'respRate' => $respRate,
                'lingkarPerut' => $lingkarPerut,
                'heartRate' => $heartRate,
                'noKartu_masked' => $maskedCard,
            ];
            try {
                \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')->insert([
                    'no_rawat' => $noRawat,
                    'endpoint' => 'pendaftaran',
                    'status' => $statusLabel,
                    'http_status' => $response->status(),
                    'meta_code' => $metaCode,
                    'meta_message' => $metaMessage,
                    'duration_ms' => $durationMs,
                    'request_payload' => json_encode($reqPayload),
                    'response_body_raw' => $response->body(),
                    'response_body_json' => is_array($processed) ? json_encode($processed) : null,
                    'triggered_by' => optional(\Illuminate\Support\Facades\Auth::user())->nik ?? (string) optional(\Illuminate\Support\Facades\Auth::user())->id ?? null,
                    'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } catch (\Throwable $e) {
            }
        }

        return response()->json($processed, $response->status());
    }

    /**
     * Hapus Data Pendaftaran (BPJS PCare Catalog)
     * Endpoint: DELETE {Base URL}/{Service Name}/pendaftaran/peserta/{noKartu}/tglDaftar/{tglDaftar}/noUrut/{noUrut}/kdPoli/{kdPoli}
     * Content-Type: application/json; charset=utf-8
     */
    public function deletePendaftaran(Request $request)
    {
        $noRawat = trim((string) $request->input('no_rawat', ''));
        $noKartu = trim((string) $request->input('noKartu', ''));
        $tglDaftar = trim((string) $request->input('tglDaftar', ''));
        $noUrut = trim((string) $request->input('noUrut', ''));
        $kdPoli = trim((string) $request->input('kdPoli', ''));

        if ($noRawat !== '' && ($noKartu === '' || $tglDaftar === '' || $noUrut === '' || $kdPoli === '')) {
            $row = \Illuminate\Support\Facades\DB::table('pcare_pendaftaran')
                ->where('no_rawat', $noRawat)
                ->orderByDesc('tglDaftar')
                ->orderByDesc('noUrut')
                ->first();
            if (! $row) {
                return response()->json([
                    'metaData' => [
                        'message' => 'Data pendaftaran tidak ditemukan untuk no_rawat: '.$noRawat,
                        'code' => 404,
                    ],
                ], 404);
            }
            $noKartu = $noKartu ?: (string) ($row->noKartu ?? '');
            $noUrut = $noUrut ?: (string) ($row->noUrut ?? '');
            $kdPoli = $kdPoli ?: (string) ($row->kdPoli ?? '');
            $tglDb = (string) ($row->tglDaftar ?? '');
            try {
                $tglDaftar = (new \DateTime($tglDb))->format('d-m-Y');
            } catch (\Throwable $e) {
                $tglDaftar = date('d-m-Y');
            }
        } else {
            if ($tglDaftar !== '') {
                try {
                    $tglDaftar = (new \DateTime($tglDaftar))->format('d-m-Y');
                } catch (\Throwable $e) {
                }
            }
        }

        if ($noKartu === '' || $tglDaftar === '' || $noUrut === '' || $kdPoli === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter noKartu, tglDaftar, noUrut, dan kdPoli wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'pendaftaran/peserta/'.urlencode($noKartu).'/tglDaftar/'.urlencode($tglDaftar).'/noUrut/'.urlencode($noUrut).'/kdPoli/'.urlencode($kdPoli);
        try {
            $result = $this->pcareRequest('DELETE', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare: '.$e->getMessage(),
                    'code' => 503,
                ],
            ], 503);
        }

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        if ($noRawat !== '' && $response->status() >= 200 && $response->status() < 300) {
            try {
                $tglDbUpdate = (new \DateTime(str_replace('/', '-', $tglDaftar)))->format('Y-m-d');
                \Illuminate\Support\Facades\DB::table('pcare_pendaftaran')
                    ->where('no_rawat', $noRawat)
                    ->where('noKartu', $noKartu)
                    ->where('kdPoli', $kdPoli)
                    ->where('tglDaftar', $tglDbUpdate)
                    ->update(['status' => 'Dihapus']);
            } catch (\Throwable $e) {
            }
        }

        return response()->json($processed, $response->status());
    }

    /**
     * Helper: Simpan data pendaftaran ke tabel pcare_pendaftaran.
     */
    protected function savePcarePendaftaran(
        string $noRawat,
        object $reg,
        object $pasien,
        string $kdProviderPeserta,
        string $noKartu,
        string $kdPoli,
        string $nmPoli,
        ?string $keluhan,
        int $sistole,
        int $diastole,
        int $beratBadan,
        int $tinggiBadan,
        int $respRate,
        int $lingkarPerut,
        int $heartRate,
        string $kdTkp,
        string $noUrut,
        bool $success,
        string $tglPerawatan
    ): void {
        // Map enum strings
        $kunjStr = 'Kunjungan Sakit';
        $kdTkpStr = match ($kdTkp) {
            '20' => '20 Rawat Inap',
            '50' => '50 Promotif Preventif',
            default => '10 Rawat Jalan',
        };

        // Parse date to Y-m-d
        try {
            $tgl = new \DateTime($tglPerawatan);
            $tglDb = $tgl->format('Y-m-d');
        } catch (\Throwable $e) {
            $tglDb = date('Y-m-d');
        }

        DB::table('pcare_pendaftaran')->insert([
            'no_rawat' => $noRawat,
            'tglDaftar' => $tglDb,
            'no_rkm_medis' => (string) ($reg->no_rkm_medis ?? ''),
            'nm_pasien' => (string) ($pasien->nm_pasien ?? ''),
            'kdProviderPeserta' => $kdProviderPeserta,
            'noKartu' => $noKartu,
            'kdPoli' => $kdPoli,
            'nmPoli' => $nmPoli,
            'keluhan' => (string) ($keluhan ?? ''),
            'kunjSakit' => $kunjStr,
            'sistole' => (string) $sistole,
            'diastole' => (string) $diastole,
            'beratBadan' => (string) $beratBadan,
            'tinggiBadan' => (string) $tinggiBadan,
            'respRate' => (string) $respRate,
            'lingkar_perut' => (string) $lingkarPerut,
            'heartRate' => (string) $heartRate,
            'rujukBalik' => '0',
            'kdTkp' => $kdTkpStr,
            'noUrut' => $noUrut,
            'status' => $success ? 'Terkirim' : 'Gagal',
        ]);
    }

    /**
     * Referensi Diagnosa.
     * - Legacy (/pcare-rest): GET /diagnosa/{query}/{start}/{limit}
     * - v3 (/pcare-rest-v3.0): GET /diagnosa?keyword={query}&offset={start}&limit={limit}
     * Params via query string: q, start, limit
     */
    public function getDiagnosa(Request $request)
    {
        $q = trim($request->query('q', ''));
        $start = (int) $request->query('start', 0);
        $limit = (int) $request->query('limit', 25);

        // 1. Cari data lokal (Penyakit)
        $localResults = [];
        try {
            if ($q !== '') {
                $localResults = \App\Models\Penyakit::where('kd_penyakit', 'like', "%{$q}%")
                    ->orWhere('nm_penyakit', 'like', "%{$q}%")
                    ->limit($limit)
                    ->get()
                    ->map(function ($item) {
                        return [
                            'kdDiag' => $item->kd_penyakit,
                            'nmDiag' => $item->nm_penyakit,
                            'nonSpesialis' => true,
                            'source' => 'local',
                        ];
                    })
                    ->toArray();
            }
        } catch (\Throwable $e) {
            // Abaikan error database lokal, lanjut ke BPJS
            Log::error('Error searching local penyakit: '.$e->getMessage());
        }

        // 2. Cari data BPJS
        $bpjsResults = [];
        $bpjsStatus = 200;
        $bpjsMessage = 'OK';
        $isBpjsOffline = false;

        try {
            $cfg = $this->pcareConfig();
            $base = rtrim($cfg['base_url'] ?? '', '/');

            // Default keyword untuk empty string
            $keyword = $q === '' ? '-' : $q; // beberapa katalog PCare menggunakan '-' untuk all

            // Deteksi v3 berdasarkan base URL
            $isV3 = str_contains($base, 'pcare-rest-v3.0');

            if ($isV3) {
                // v3 menggunakan query parameter
                $endpoint = 'diagnosa';
                $query = [
                    'keyword' => $keyword,
                    'offset' => $start,
                    'limit' => $limit,
                ];
                $result = $this->pcareRequest('GET', $endpoint, $query);
            } else {
                // legacy menggunakan path segment
                $endpoint = 'diagnosa/'.urlencode($keyword).'/'.$start.'/'.$limit;
                $result = $this->pcareRequest('GET', $endpoint);
            }

            $response = $result['response'];
            $bpjsStatus = $response->status();
            
            if ($bpjsStatus >= 200 && $bpjsStatus < 300) {
                $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
                
                if (! is_array($processed)) {
                    $processed = ['raw' => $processed];
                }

                // Normalisasi struktur list dari BPJS
                if (isset($processed['response']['list']) && is_array($processed['response']['list'])) {
                    $bpjsResults = $processed['response']['list'];
                } elseif (isset($processed['list']) && is_array($processed['list'])) {
                    $bpjsResults = $processed['list'];
                }
            } else {
                $isBpjsOffline = true;
                $bpjsMessage = 'BPJS Error: Status ' . $bpjsStatus;
            }

        } catch (\Throwable $e) {
            $isBpjsOffline = true;
            $bpjsMessage = 'BPJS Connection Error: ' . $e->getMessage();
            // Lanjut untuk mengembalikan data lokal
        }

        // 3. Gabungkan Hasil (Local + BPJS)
        // Tandai source BPJS
        $bpjsResults = array_map(function ($item) {
            $item['source'] = 'bpjs';
            return $item;
        }, $bpjsResults);

        // Gabungkan: Local priority (atau bisa diubah logicnya)
        // Kita merge unik by kdDiag
        $merged = $localResults;
        $existingCodes = array_column($localResults, 'kdDiag');

        foreach ($bpjsResults as $bpjsItem) {
            $kode = $bpjsItem['kdDiag'] ?? $bpjsItem['kode'] ?? '';
            if (!in_array($kode, $existingCodes)) {
                $merged[] = $bpjsItem;
                $existingCodes[] = $kode;
            }
        }

        // Format response agar kompatibel dengan frontend yang mengharapkan { response: { list: [] } } atau flat
        // Kita kembalikan struktur standar PCare wrapper kita tapi dengan data hybrid
        $finalData = [
            'metaData' => [
                'code' => $isBpjsOffline ? 201 : 200, // 201 warning jika BPJS mati? Atau tetap 200
                'message' => $isBpjsOffline ? "Data dari Database Lokal (Koneksi BPJS Bermasalah: $bpjsMessage)" : 'OK',
                'bpjs_offline' => $isBpjsOffline,
            ],
            'response' => [
                'list' => $merged,
                'count' => count($merged)
            ]
        ];

        return response()->json($finalData, 200);
    }

    public function getDpho(Request $request)
    {
        $q = trim($request->query('q', ''));
        $start = (int) $request->query('start', 0);
        $limit = (int) $request->query('limit', 25);

        // Default keyword untuk empty string: '-' (sebagian katalog PCare menggunakan '-')
        $keyword = $q === '' ? '-' : $q;
        $endpoint = 'obat/dpho/'.urlencode($keyword).'/'.$start.'/'.$limit;
        try {
            $result = $this->pcareRequest('GET', $endpoint);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare getDpho error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getDpho connection error', [
                'q' => $q,
                'start' => $start,
                'limit' => $limit,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (dpho): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 503);
        }
    }

    /**
     * Referensi Tindakan (PCare REST).
     * Endpoint PCare: GET /tindakan/kdTkp/{kdTkp}/{start}/{limit}
     * - kdTkp: '10' (RJTP), '20' (RITP), '50' (Promotif)
     * Query params: kdTkp, start, limit
     */
    public function getTindakan(Request $request)
    {
        $kdTkpInput = trim((string) $request->query('kdTkp', '10'));
        $start = (int) $request->query('start', 0);
        $limit = (int) $request->query('limit', 25);

        // Terima input teks dan konversi ke kode jika perlu
        $map = [
            'rjtp' => '10',
            'rawat jalan' => '10',
            'rawat jalan tingkat pertama' => '10',
            'ritp' => '20',
            'rawat inap' => '20',
            'rawat inap tingkat pertama' => '20',
            'promotif' => '50',
        ];
        $lower = strtolower($kdTkpInput);
        $kdTkp = $map[$lower] ?? strtoupper($kdTkpInput);

        if (! in_array($kdTkp, ['10', '20', '50'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter kdTkp harus 10 (RJTP), 20 (RITP), atau 50 (Promotif)',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'tindakan/kdTkp/'.urlencode($kdTkp).'/'.$start.'/'.$limit;
        try {
            $result = $this->pcareRequest('GET', $endpoint);
            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
            if ($response->status() >= 400) {
                try {
                    Log::channel('bpjs')->error('PCare getTindakan error detail', [
                        'http_status' => $response->status(),
                        'processed' => is_array($processed) ? $processed : (string) $processed,
                    ]);
                } catch (\Throwable $e) {
                }
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getTindakan connection error', [
                'kdTkp' => $kdTkp,
                'start' => $start,
                'limit' => $limit,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Gagal terhubung ke BPJS PCare (tindakan): '.$e->getMessage(),
                    'code' => 503,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 503);
        }
    }

    /**
     * Referensi Provider Rayonisasi (PCare REST).
     * Endpoint PCare: GET /provider/{start}/{limit}
     */
    public function getProvider(Request $request)
    {
        $start = (int) $request->query('start', 0);
        $limit = (int) $request->query('limit', 25);
        $endpoint = 'provider/'.$start.'/'.$limit;
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Spesialis (PCare REST).
     * Endpoint PCare: GET /spesialis
     */
    public function getSpesialis(Request $request)
    {
        // Endpoint tidak membutuhkan start/limit
        $result = $this->pcareRequest('GET', 'spesialis');

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Add Data MCU (Medical Check Up).
     * Endpoint BPJS: POST /MCU
     * Content-Type: text/plain
     */
    public function addMcu(Request $request)
    {
        $payload = $request->all();

        // Validasi required fields
        if (empty($payload['noKunjungan'])) {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter noKunjungan wajib diisi',
                    'code' => 422,
                ],
                'response' => null,
            ], 422);
        }

        // Normalisasi data sesuai katalog BPJS
        $mcuPayload = [
            'kdMCU' => isset($payload['kdMCU']) ? (int) $payload['kdMCU'] : 0,
            'noKunjungan' => trim((string) $payload['noKunjungan']),
            'kdProvider' => isset($payload['kdProvider']) ? trim((string) $payload['kdProvider']) : '',
            'tglPelayanan' => isset($payload['tglPelayanan']) ? trim((string) $payload['tglPelayanan']) : '',
            'tekananDarahSistole' => isset($payload['tekananDarahSistole']) ? (int) $payload['tekananDarahSistole'] : 0,
            'tekananDarahDiastole' => isset($payload['tekananDarahDiastole']) ? (int) $payload['tekananDarahDiastole'] : 0,
            'radiologiFoto' => isset($payload['radiologiFoto']) && $payload['radiologiFoto'] !== '' ? trim((string) $payload['radiologiFoto']) : null,
            'darahRutinHemo' => isset($payload['darahRutinHemo']) ? (int) $payload['darahRutinHemo'] : 0,
            'darahRutinLeu' => isset($payload['darahRutinLeu']) ? (int) $payload['darahRutinLeu'] : 0,
            'darahRutinErit' => isset($payload['darahRutinErit']) ? (int) $payload['darahRutinErit'] : 0,
            'darahRutinLaju' => isset($payload['darahRutinLaju']) ? (int) $payload['darahRutinLaju'] : 0,
            'darahRutinHema' => isset($payload['darahRutinHema']) ? (int) $payload['darahRutinHema'] : 0,
            'darahRutinTrom' => isset($payload['darahRutinTrom']) ? (int) $payload['darahRutinTrom'] : 0,
            'lemakDarahHDL' => isset($payload['lemakDarahHDL']) ? (int) $payload['lemakDarahHDL'] : 0,
            'lemakDarahLDL' => isset($payload['lemakDarahLDL']) ? (int) $payload['lemakDarahLDL'] : 0,
            'lemakDarahChol' => isset($payload['lemakDarahChol']) ? (int) $payload['lemakDarahChol'] : 0,
            'lemakDarahTrigli' => isset($payload['lemakDarahTrigli']) ? (int) $payload['lemakDarahTrigli'] : 0,
            'gulaDarahSewaktu' => isset($payload['gulaDarahSewaktu']) ? (int) $payload['gulaDarahSewaktu'] : 0,
            'gulaDarahPuasa' => isset($payload['gulaDarahPuasa']) ? (int) $payload['gulaDarahPuasa'] : 0,
            'gulaDarahPostPrandial' => isset($payload['gulaDarahPostPrandial']) ? (int) $payload['gulaDarahPostPrandial'] : 0,
            'gulaDarahHbA1c' => isset($payload['gulaDarahHbA1c']) ? (int) $payload['gulaDarahHbA1c'] : 0,
            'fungsiHatiSGOT' => isset($payload['fungsiHatiSGOT']) ? (int) $payload['fungsiHatiSGOT'] : 0,
            'fungsiHatiSGPT' => isset($payload['fungsiHatiSGPT']) ? (int) $payload['fungsiHatiSGPT'] : 0,
            'fungsiHatiGamma' => isset($payload['fungsiHatiGamma']) ? (int) $payload['fungsiHatiGamma'] : 0,
            'fungsiHatiProtKual' => isset($payload['fungsiHatiProtKual']) ? (int) $payload['fungsiHatiProtKual'] : 0,
            'fungsiHatiAlbumin' => isset($payload['fungsiHatiAlbumin']) ? (int) $payload['fungsiHatiAlbumin'] : 0,
            'fungsiGinjalCrea' => isset($payload['fungsiGinjalCrea']) ? (int) $payload['fungsiGinjalCrea'] : 0,
            'fungsiGinjalUreum' => isset($payload['fungsiGinjalUreum']) ? (int) $payload['fungsiGinjalUreum'] : 0,
            'fungsiGinjalAsam' => isset($payload['fungsiGinjalAsam']) ? (int) $payload['fungsiGinjalAsam'] : 0,
            'fungsiJantungABI' => isset($payload['fungsiJantungABI']) ? (int) $payload['fungsiJantungABI'] : 0,
            'fungsiJantungEKG' => isset($payload['fungsiJantungEKG']) && $payload['fungsiJantungEKG'] !== '' ? trim((string) $payload['fungsiJantungEKG']) : null,
            'fungsiJantungEcho' => isset($payload['fungsiJantungEcho']) && $payload['fungsiJantungEcho'] !== '' ? trim((string) $payload['fungsiJantungEcho']) : null,
            'funduskopi' => isset($payload['funduskopi']) && $payload['funduskopi'] !== '' ? trim((string) $payload['funduskopi']) : null,
            'pemeriksaanLain' => isset($payload['pemeriksaanLain']) && $payload['pemeriksaanLain'] !== '' ? trim((string) $payload['pemeriksaanLain']) : null,
            'keterangan' => isset($payload['keterangan']) && $payload['keterangan'] !== '' ? trim((string) $payload['keterangan']) : null,
        ];

        try {
            $endpoint = 'MCU';
            $result = $this->pcareRequest('POST', $endpoint, [], $mcuPayload, [
                'Content-Type' => 'text/plain',
            ]);

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            return response()->json($processed, $response->status());
        } catch (\Illuminate\Http\Client\RequestException $e) {
            // Tangani error dari BPJS API
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            // Kembalikan response error dari BPJS dengan status code yang sesuai
            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
                'response' => null,
            ], $response->status());
        } catch (\Throwable $e) {
            Log::error('Error add MCU PCare', [
                'noKunjungan' => $payload['noKunjungan'] ?? null,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Internal server error: '.$e->getMessage(),
                    'code' => 500,
                ],
                'response' => null,
            ], 500);
        }
    }

    /**
     * Get Data MCU (Medical Check Up) berdasarkan Nomor Kunjungan.
     * Endpoint BPJS: GET /MCU/kunjungan/{noKunjungan}
     * Content-Type: application/json; charset=utf-8
     */
    public function getMcu(string $noKunjungan)
    {
        $noKunjungan = trim($noKunjungan);

        if ($noKunjungan === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter noKunjungan wajib diisi',
                    'code' => 422,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 422);
        }

        try {
            $endpoint = 'MCU/kunjungan/'.$noKunjungan;
            $result = $this->pcareRequest('GET', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            return response()->json($processed, $response->status());
        } catch (\Illuminate\Http\Client\RequestException $e) {
            // Tangani error dari BPJS API
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            // Kembalikan response error dari BPJS dengan status code yang sesuai
            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], $response->status());
        } catch (\Throwable $e) {
            Log::error('Error get MCU PCare', [
                'noKunjungan' => $noKunjungan,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Internal server error: '.$e->getMessage(),
                    'code' => 500,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 500);
        }
    }

    /**
     * Get Skrining Riwayat Kesehatan Peserta (PCare REST).
     * Endpoint PCare: GET /skrinning/peserta/{nomor_peserta}/{start}/{limit}
     * Parameter 1: Nomor atau Nama Peserta
     * Parameter 2: Row data awal (start)
     * Parameter 3: Limit jumlah data
     */
    public function getSkriningPeserta(string $nomorPeserta, ?int $start = null, ?int $limit = null)
    {
        $nomorPeserta = trim($nomorPeserta);
        $start = $start ?? 0;
        $limit = $limit ?? 10;

        if ($nomorPeserta === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter nomor peserta wajib diisi',
                    'code' => 422,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 422);
        }

        try {
            // Pastikan nomor peserta di-encode dengan benar untuk URL path
            // Gunakan rawurlencode untuk encode karakter khusus tapi tetap bisa digunakan di path
            $nomorPesertaEncoded = rawurlencode($nomorPeserta);
            $endpoint = 'skrinning/peserta/'.$nomorPesertaEncoded.'/'.$start.'/'.$limit;
            
            Log::channel('bpjs')->info('PCare getSkriningPeserta requesting endpoint', [
                'endpoint' => $endpoint,
                'nomor_peserta' => substr($nomorPeserta, 0, 6).'***',
                'start' => $start,
                'limit' => $limit,
            ]);

            $result = $this->pcareRequest('GET', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            Log::channel('bpjs')->info('PCare getSkriningPeserta response received', [
                'status' => $response->status(),
                'has_data' => isset($processed['response']['list']) && count($processed['response']['list'] ?? []) > 0,
            ]);

            return response()->json($processed, $response->status());
        } catch (\Illuminate\Http\Client\RequestException $e) {
            // Tangani error dari BPJS API
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            Log::channel('bpjs')->error('PCare getSkriningPeserta RequestException', [
                'status' => $response->status(),
                'error' => $e->getMessage(),
                'response' => $processed,
            ]);

            // Kembalikan response error dari BPJS dengan status code yang sesuai
            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], $response->status());
        } catch (\Throwable $e) {
            Log::error('Error get Skrining Peserta PCare', [
                'nomor_peserta' => substr($nomorPeserta, 0, 6).'***',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Internal server error: '.$e->getMessage(),
                    'code' => 500,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 500);
        }
    }

    /**
     * Get Data Prolanis Diabetes Mellitus (PCare REST).
     * Endpoint PCare: GET /skrinning/prolanis/dm/{nomor_peserta}/{start}/{limit}
     * Parameter 1: Nomor atau Nama Peserta
     * Parameter 2: Row data awal (start)
     * Parameter 3: Limit jumlah data
     */
    public function getProlanisDm(string $nomorPeserta, ?int $start = null, ?int $limit = null)
    {
        $nomorPeserta = trim($nomorPeserta);
        // BPJS API tidak menerima start=0, minimal harus 1
        $start = max(1, $start ?? 1);
        $limit = max(1, $limit ?? 10);

        if ($nomorPeserta === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter nomor peserta wajib diisi',
                    'code' => 422,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 422);
        }

        try {
            $nomorPesertaEncoded = rawurlencode($nomorPeserta);
            $endpoint = 'skrinning/prolanis/dm/'.$nomorPesertaEncoded.'/'.$start.'/'.$limit;
            
            Log::channel('bpjs')->info('PCare getProlanisDm requesting endpoint', [
                'endpoint' => $endpoint,
                'nomor_peserta' => substr($nomorPeserta, 0, 6).'***',
                'start' => $start,
                'limit' => $limit,
            ]);

            $result = $this->pcareRequest('GET', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            Log::channel('bpjs')->info('PCare getProlanisDm response received', [
                'status' => $response->status(),
                'has_data' => isset($processed['response']['list']) && count($processed['response']['list'] ?? []) > 0,
            ]);

            return response()->json($processed, $response->status());
        } catch (\Illuminate\Http\Client\RequestException $e) {
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            Log::channel('bpjs')->error('PCare getProlanisDm RequestException', [
                'status' => $response->status(),
                'error' => $e->getMessage(),
                'response' => $processed,
            ]);

            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], $response->status());
        } catch (\Throwable $e) {
            Log::error('Error get Prolanis DM PCare', [
                'nomor_peserta' => substr($nomorPeserta, 0, 6).'***',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Internal server error: '.$e->getMessage(),
                    'code' => 500,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 500);
        }
    }

    /**
     * Get Data Prolanis Hipertensi (PCare REST).
     * Endpoint PCare: GET /skrinning/prolanis/ht/{nomor_peserta}/{start}/{limit}
     * Parameter 1: Nomor atau Nama Peserta
     * Parameter 2: Row data awal (start)
     * Parameter 3: Limit jumlah data
     */
    public function getProlanisHt(string $nomorPeserta, ?int $start = null, ?int $limit = null)
    {
        $nomorPeserta = trim($nomorPeserta);
        // BPJS API tidak menerima start=0, minimal harus 1
        $start = max(1, $start ?? 1);
        $limit = max(1, $limit ?? 10);

        if ($nomorPeserta === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter nomor peserta wajib diisi',
                    'code' => 422,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 422);
        }

        try {
            $nomorPesertaEncoded = rawurlencode($nomorPeserta);
            $endpoint = 'skrinning/prolanis/ht/'.$nomorPesertaEncoded.'/'.$start.'/'.$limit;
            
            Log::channel('bpjs')->info('PCare getProlanisHt requesting endpoint', [
                'endpoint' => $endpoint,
                'nomor_peserta' => substr($nomorPeserta, 0, 6).'***',
                'start' => $start,
                'limit' => $limit,
            ]);

            $result = $this->pcareRequest('GET', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            Log::channel('bpjs')->info('PCare getProlanisHt response received', [
                'status' => $response->status(),
                'has_data' => isset($processed['response']['list']) && count($processed['response']['list'] ?? []) > 0,
            ]);

            return response()->json($processed, $response->status());
        } catch (\Illuminate\Http\Client\RequestException $e) {
            $response = $e->response;
            $processed = $this->maybeDecryptAndDecompress($response->body(), time());

            Log::channel('bpjs')->error('PCare getProlanisHt RequestException', [
                'status' => $response->status(),
                'error' => $e->getMessage(),
                'response' => $processed,
            ]);

            if (is_array($processed)) {
                return response()->json($processed, $response->status());
            }

            return response()->json([
                'metaData' => [
                    'message' => $e->getMessage(),
                    'code' => $response->status(),
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], $response->status());
        } catch (\Throwable $e) {
            Log::error('Error get Prolanis HT PCare', [
                'nomor_peserta' => substr($nomorPeserta, 0, 6).'***',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'metaData' => [
                    'message' => 'Internal server error: '.$e->getMessage(),
                    'code' => 500,
                ],
                'response' => [
                    'count' => 0,
                    'list' => [],
                ],
            ], 500);
        }
    }

    /**
     * Referensi Sub Spesialis (PCare REST).
     * Endpoint PCare: GET /spesialis/{kdSpesialis}/subspesialis
     * Query param: kdSpesialis (required)
     */
    public function getSubSpesialis(Request $request)
    {
        $kd = trim((string) $request->query('kdSpesialis', ''));
        if ($kd === '') {
            return response()->json([
                'metaData' => ['message' => 'Kode Spesialis (kdSpesialis) wajib diisi', 'code' => 422],
            ], 422);
        }

        try {
            $endpoint = 'spesialis/'.urlencode($kd).'/subspesialis';
            $result = $this->pcareRequest('GET', $endpoint);

            $response = $result['response'];
            $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

            // Sanitasi data untuk memastikan UTF-8 valid
            if (is_string($processed)) {
                // Coba decode jika masih binary
                $processed = mb_convert_encoding($processed, 'UTF-8', 'UTF-8');
            } elseif (is_array($processed)) {
                // Recursively sanitize array
                $processed = $this->sanitizeUtf8($processed);
            }

            return response()->json($processed, $response->status());
        } catch (\Throwable $e) {
            Log::error('Error in getSubSpesialis: '.$e->getMessage(), [
                'kdSpesialis' => $kd,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'metaData' => ['message' => 'Terjadi kesalahan saat mengambil data subspesialis', 'code' => 500],
            ], 500);
        }
    }

    /**
     * Sanitize UTF-8 data recursively
     */
    private function sanitizeUtf8($data)
    {
        if (is_string($data)) {
            // Remove invalid UTF-8 characters
            $sanitized = mb_convert_encoding($data, 'UTF-8', 'UTF-8');
            // Remove any remaining invalid characters using regex
            $sanitized = preg_replace('/[\x00-\x1F\x7F-\x9F]/u', '', $sanitized);

            // Ensure valid UTF-8
            return mb_check_encoding($sanitized, 'UTF-8') ? $sanitized : '';
        } elseif (is_array($data)) {
            return array_map([$this, 'sanitizeUtf8'], $data);
        } elseif (is_object($data)) {
            $sanitized = [];
            foreach ((array) $data as $key => $value) {
                $sanitized[$this->sanitizeUtf8($key)] = $this->sanitizeUtf8($value);
            }

            return (object) $sanitized;
        }

        return $data;
    }

    /**
     * Referensi Sarana (PCare REST).
     * Endpoint PCare: GET /spesialis/sarana
     */
    public function getSarana(Request $request)
    {
        // Endpoint tidak membutuhkan start/limit
        $result = $this->pcareRequest('GET', 'spesialis/sarana');

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Khusus (PCare REST).
     * Endpoint PCare: GET /spesialis/khusus
     */
    public function getKhusus(Request $request)
    {
        // Endpoint tidak membutuhkan start/limit
        $result = $this->pcareRequest('GET', 'spesialis/khusus');

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Alergi (PCare REST).
     * Endpoint PCare: GET /alergi/jenis/{kodeJenis}
     * Param: jenis (query string) → '01' (Makanan) | '02' (Udara) | '03' (Obat)
     */
    public function getAlergi(Request $request)
    {
        $jenisInput = trim((string) $request->query('jenis', '01'));
        // Izinkan input teks (makanan/udara/obat) dan konversi ke kode, selain kode langsung
        $map = [
            'makanan' => '01',
            'udara' => '02',
            'obat' => '03',
        ];
        $lower = strtolower($jenisInput);
        $jenis = $map[$lower] ?? strtoupper($jenisInput);

        $allowed = ['01', '02', '03'];
        if (! in_array($jenis, $allowed, true)) {
            return response()->json([
                'metaData' => ['message' => 'Parameter jenis harus salah satu dari 01 (Makanan), 02 (Udara), 03 (Obat)', 'code' => 422],
            ], 422);
        }

        $endpoint = 'alergi/jenis/'.urlencode($jenis);
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Prognosa (PCare REST).
     * Endpoint PCare: GET /prognosa
     */
    public function getPrognosa(Request $request)
    {
        // Endpoint tidak membutuhkan parameter
        $result = $this->pcareRequest('GET', 'prognosa');

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Penyakit SRK (Skrinning Rekap) dari PCare.
     * Sesuai katalog BPJS: GET {Base URL}/{Service Name}/skrinning/rekap
     * Endpoint ini TIDAK menerima parameter apapun dan mengembalikan semua data rekapitulasi.
     *
     * Catatan: Parameter q, start, limit di frontend digunakan untuk filtering/pagination di sisi client
     * setelah data diterima dari BPJS.
     */
    public function getReferensiSrk(Request $request)
    {
        // Validasi konfigurasi dasar terlebih dahulu
        $cfg = $this->pcareConfig();
        $base = rtrim((string) ($cfg['base_url'] ?? ''), '/');
        if ($base === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'BPJS_PCARE_BASE_URL belum dikonfigurasi di server ini (.env). Silakan isi nilai base URL PCare.',
                    'code' => 422,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], 422);
        }

        // Sesuai katalog BPJS, endpoint skrinning/rekap TIDAK menerima parameter
        // Endpoint langsung mengembalikan semua data rekapitulasi
        // Content-Type sesuai katalog: application/json; charset=utf-8
        $endpoint = 'skrinning/rekap';

        try {
            Log::channel('bpjs')->info('PCare getReferensiSrk requesting endpoint', [
                'endpoint' => $endpoint,
                'full_url' => $base.'/'.$endpoint,
                'note' => 'Endpoint tidak menerima parameter sesuai katalog BPJS',
            ]);

            // Gunakan pcareRequest seperti endpoint lain yang sudah bekerja
            // Endpoint skrinning/rekap tidak menerima parameter sesuai katalog BPJS
            // Content-Type sesuai katalog: application/json; charset=utf-8
            $result = $this->pcareRequest('GET', $endpoint, [], null, [
                'Content-Type' => 'application/json; charset=utf-8',
            ]);
            $response = $result['response'];
            $url = $result['url'] ?? $base.'/'.$endpoint;

            // Log response status dan body untuk debugging
            $rawBody = $response->body();
            $statusCode = $response->status();

            Log::channel('bpjs')->info('PCare getReferensiSrk response received', [
                'status' => $statusCode,
                'endpoint' => $endpoint,
                'url' => $url,
                'body_preview' => substr($rawBody, 0, 1000),
                'body_length' => strlen($rawBody),
            ]);

            // Process response
            $processed = $this->maybeDecryptAndDecompress($rawBody, $result['timestamp_used']);
            if (! is_array($processed)) {
                $processed = ['raw' => $processed];
            }

            // Log processed response untuk debugging error 400
            if ($statusCode >= 400) {
                Log::channel('bpjs')->error('PCare getReferensiSrk error response details', [
                    'status' => $statusCode,
                    'endpoint' => $endpoint,
                    'url' => $url,
                    'processed' => $processed,
                    'raw_body' => substr($rawBody, 0, 2000),
                    'headers_sent' => [
                        'X-cons-id' => $result['headers_used']['X-cons-id'] ?? 'N/A',
                        'X-timestamp' => $result['timestamp_used'] ?? 'N/A',
                        'Content-Type' => $result['headers_used']['Content-Type'] ?? 'N/A',
                    ],
                ]);
                if ($statusCode === 412) {
                    return response()->json([
                        'metaData' => [
                            'message' => 'Data SRK tidak tersedia untuk PPK saat ini',
                            'code' => 200,
                        ],
                        'response' => [
                            'list' => [],
                            'count' => 0,
                        ],
                    ], 200);
                }
            }

            // Jika sukses (2xx), return response
            if ($response->status() >= 200 && $response->status() < 300) {
                // Filter di sisi server jika parameter q diberikan (untuk kompatibilitas dengan frontend)
                $q = trim($request->query('q', ''));
                if ($q !== '' && isset($processed['response']['list']) && is_array($processed['response']['list'])) {
                    $filtered = array_filter($processed['response']['list'], function ($item) use ($q) {
                        $namaPenyakit = strtolower($item['nama_penyakit'] ?? '');
                        $qLower = strtolower($q);

                        return strpos($namaPenyakit, $qLower) !== false;
                    });
                    $processed['response']['list'] = array_values($filtered);
                    $processed['response']['count'] = count($filtered);
                }

                // Pagination di sisi server jika start/limit diberikan
                $start = (int) $request->query('start', 0);
                $limit = (int) $request->query('limit', 0);
                if ($limit > 0 && isset($processed['response']['list']) && is_array($processed['response']['list'])) {
                    $list = $processed['response']['list'];
                    $total = count($list);
                    $processed['response']['list'] = array_slice($list, $start, $limit);
                    $processed['response']['count'] = $total;
                }

                return response()->json($processed, $response->status());
            }

            // Jika error, return response error dari BPJS (termasuk pesan dari metaData jika ada)
            $errorMessage = 'Permintaan tidak valid ke BPJS PCare (Referensi SRK)';
            if (is_array($processed) && isset($processed['metaData']['message'])) {
                $errorMessage = $processed['metaData']['message'];
            }
            if ($response->status() === 412) {
                $errorMessage = 'Precondition Failed dari BPJS PCare: periksa kredensial dan header (user_key, signature, authorization)';
            }

            return response()->json([
                'metaData' => [
                    'message' => $errorMessage,
                    'code' => $response->status(),
                ],
                'response' => $processed['response'] ?? ['list' => [], 'count' => 0],
            ], $response->status());

        } catch (\Illuminate\Http\Client\RequestException $e) {
            $responseBody = '';
            $responseStatus = 503;
            if ($e->response) {
                $responseBody = $e->response->body();
                $responseStatus = $e->response->status();
                if ($responseStatus === 412) {
                    return response()->json([
                        'metaData' => [
                            'message' => 'Data SRK tidak tersedia untuk PPK saat ini',
                            'code' => 200,
                        ],
                        'response' => [
                            'list' => [],
                            'count' => 0,
                        ],
                    ], 200);
                }
                try {
                    $processed = $this->maybeDecryptAndDecompress($responseBody, '');
                    if (is_array($processed) && isset($processed['metaData']['message'])) {
                        return response()->json($processed, $responseStatus);
                    }
                } catch (\Throwable $ignore) {
                }
            }

            Log::channel('bpjs')->error('PCare getReferensiSrk RequestException', [
                'endpoint' => $endpoint,
                'base_url' => $base,
                'status' => $responseStatus,
                'error' => $e->getMessage(),
                'response_body' => substr($responseBody, 0, 500),
            ]);

            $errorMsg = 'Gagal terhubung ke BPJS PCare (Referensi SRK): '.$e->getMessage();
            $status = $responseStatus;
        } catch (\Throwable $e) {
            Log::channel('bpjs')->error('PCare getReferensiSrk error', [
                'endpoint' => $endpoint,
                'base_url' => $base,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            $errorMsg = 'Gagal terhubung ke BPJS PCare (Referensi SRK): '.$e->getMessage();
            $status = 503;

            // Deteksi jenis error untuk status code yang lebih tepat
            $errorMsgLower = strtolower($e->getMessage());
            if (stripos($errorMsgLower, 'status code 400') !== false || stripos($errorMsgLower, '400') !== false) {
                $status = 400;
            } elseif (stripos($errorMsgLower, 'status code 401') !== false || stripos($errorMsgLower, '401') !== false) {
                $status = 401;
            } elseif (stripos($errorMsgLower, 'status code 404') !== false || stripos($errorMsgLower, '404') !== false) {
                $status = 404;
            } elseif (stripos($errorMsgLower, 'timeout') !== false || stripos($errorMsgLower, 'connection') !== false) {
                $status = 503;
            }

            return response()->json([
                'metaData' => [
                    'message' => $errorMsg,
                    'code' => $status,
                ],
                'response' => [
                    'list' => [],
                    'count' => 0,
                ],
            ], $status);
        }
    }

    /**
     * Referensi Status Pulang (PCare REST).
     * Endpoint PCare: GET /statuspulang/rawatInap/{true|false}
     * Query param: rawatInap (boolean-like string: "true"/"false" or 1/0)
     */
    public function getStatusPulang(Request $request)
    {
        // Ambil parameter rawatInap; default false
        $raw = strtolower((string) $request->query('rawatInap', 'false'));
        $isInap = in_array($raw, ['true', '1', 'yes', 'y'], true);

        $endpoint = 'statuspulang/rawatInap/'.($isInap ? 'true' : 'false');
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Faskes Rujukan Sub Spesialis (PCare REST).
     * Endpoint PCare: GET /spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}
     * Param tglEstRujuk diizinkan format dd-mm-yyyy; jika menerima yyyy-mm-dd (input HTML date), akan dikonversi.
     */
    public function getFaskesRujukanSubSpesialis(string $kdSubSpesialis, string $kdSarana, string $tglEstRujuk)
    {
        // Konversi tanggal yyyy-mm-dd → dd-mm-yyyy bila diperlukan
        $tgl = $tglEstRujuk;
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $tglEstRujuk)) {
            [$y, $m, $d] = explode('-', $tglEstRujuk);
            $tgl = $d.'-'.$m.'-'.$y;
        }

        $endpoint = 'spesialis/rujuk/subspesialis/'.urlencode($kdSubSpesialis).'/sarana/'.urlencode($kdSarana).'/tglEstRujuk/'.urlencode($tgl);
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Get Peserta PCare by NIK
     * Katalog BPJS: GET peserta/nik/{nik}
     */
    public function pesertaByNik(Request $request, ?string $nik = null)
    {
        $nik = trim($nik ?? (string) $request->query('nik', ''));
        if ($nik === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter nik wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $result = $this->pcareRequest('GET', 'peserta/nik/'.urlencode($nik));

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Club Prolanis (Kelompok) berdasarkan jenis program.
     * Katalog BPJS: GET /kelompok/club/{kdProgram}
     * - kdProgram: '01' (Diabetes Melitus) | '02' (Hipertensi)
     */
    public function getClubProlanis(string $kdProgram)
    {
        // Normalisasi input: terima '01'/'02' atau teks 'diabetes'/'hipertensi'
        $map = [
            'diabetes melitus' => '01',
            'diabetes' => '01',
            'dm' => '01',
            'hipertensi' => '02',
            'ht' => '02',
        ];

        $normalized = strtoupper($kdProgram);
        $lower = strtolower($kdProgram);
        if (isset($map[$lower])) {
            $normalized = $map[$lower];
        }

        if (! in_array($normalized, ['01', '02'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter kdProgram harus 01 (Diabetes Melitus) atau 02 (Hipertensi)',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/club/'.urlencode($normalized);
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Kegiatan Kelompok berdasarkan bulan (format dd-mm-yyyy). Dapat menerima yyyy-mm-dd dan dikonversi.
     * Katalog BPJS: GET /kelompok/kegiatan/{tanggal}
     */
    public function getKegiatanKelompok(string $tanggal)
    {
        $tgl = trim($tanggal);
        if ($tgl === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter tanggal wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        // Jika menerima yyyy-mm-dd (from <input type="date"/>), ubah ke dd-mm-yyyy
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $tgl)) {
            [$y, $m, $d] = explode('-', $tgl);
            $tgl = $d.'-'.$m.'-'.$y;
        }

        // Validasi sederhana pola dd-mm-yyyy
        if (! preg_match('/^\d{2}-\d{2}-\d{4}$/', $tgl)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Format tanggal tidak valid. Gunakan dd-mm-yyyy atau yyyy-mm-dd',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/kegiatan/'.urlencode($tgl);
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Tambah (Add) Kegiatan Kelompok.
     * Katalog BPJS: POST /kelompok/kegiatan
     * Format JSON, Content-Type: text/plain (sesuai katalog PCare)
     */
    public function addKegiatanKelompok(Request $request)
    {
        // Ambil input mentah, lakukan normalisasi seperlunya
        $eduId = $request->input('eduId'); // bisa null untuk penambahan baru
        $clubId = $request->input('clubId');
        $tglPelayanan = trim((string) $request->input('tglPelayanan'));
        $kdKegiatan = (string) $request->input('kdKegiatan');
        // Katalog menamai "kdKelompok" namun contoh daftar berisi kdProgram 01/02
        // Di aplikasi ini field Jenis Kelompok disimpan sebagai kdProgram (01/02)
        // sehingga kita terima baik kdKelompok maupun kdProgram.
        $kdKelompok = (string) ($request->input('kdKelompok') ?? $request->input('kdProgram'));
        $materi = (string) $request->input('materi', '');
        $pembicara = (string) $request->input('pembicara', '');
        $lokasi = (string) $request->input('lokasi', '');
        $keterangan = (string) $request->input('keterangan', '');
        $biaya = $request->input('biaya', 0);

        // Validasi sederhana
        if ($clubId === null || $clubId === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'clubId wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        // Normalisasi tanggal ke dd-mm-yyyy bila user mengirim yyyy-mm-dd
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $tglPelayanan)) {
            [$y, $m, $d] = explode('-', $tglPelayanan);
            $tglPelayanan = $d.'-'.$m.'-'.$y;
        }
        if (! preg_match('/^\d{2}-\d{2}-\d{4}$/', $tglPelayanan)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Format tglPelayanan harus dd-mm-yyyy atau yyyy-mm-dd',
                    'code' => 422,
                ],
            ], 422);
        }

        // Validasi kode kelompok dan kegiatan
        if (! in_array($kdKelompok, ['01', '02'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'kdKelompok harus 01 (Diabetes Melitus) atau 02 (Hipertensi)',
                    'code' => 422,
                ],
            ], 422);
        }
        if (! in_array($kdKegiatan, ['01', '10', '11'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'kdKegiatan tidak valid. Gunakan 01 (Senam), 10 (Penyuluhan), 11 (Penyuluhan dan Senam)',
                    'code' => 422,
                ],
            ], 422);
        }

        $payload = [
            'eduId' => $eduId, // null untuk baru
            'clubId' => is_numeric($clubId) ? (int) $clubId : $clubId,
            'tglPelayanan' => $tglPelayanan,
            'kdKegiatan' => $kdKegiatan,
            'kdKelompok' => $kdKelompok,
            'materi' => $materi,
            'pembicara' => $pembicara,
            'lokasi' => $lokasi,
            'keterangan' => $keterangan,
            'biaya' => (int) $biaya,
        ];

        // Panggil endpoint PCare dengan Content-Type: text/plain (sesuai katalog)
        $result = $this->pcareRequest('POST', 'kelompok/kegiatan', [], $payload, [
            'Content-Type' => 'text/plain',
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Update (Edit) Kegiatan Kelompok.
     * Katalog BPJS: PUT /kelompok/kegiatan
     * Format JSON, Content-Type: text/plain (sesuai katalog PCare)
     */
    public function updateKegiatanKelompok(Request $request)
    {
        // Ambil input dan validasi
        $eduId = trim((string) $request->input('eduId', ''));
        $clubId = $request->input('clubId');
        $tglPelayanan = trim((string) $request->input('tglPelayanan'));
        $kdKegiatan = (string) $request->input('kdKegiatan');
        $kdKelompok = (string) ($request->input('kdKelompok') ?? $request->input('kdProgram'));
        $materi = (string) $request->input('materi', '');
        $pembicara = (string) $request->input('pembicara', '');
        $lokasi = (string) $request->input('lokasi', '');
        $keterangan = (string) $request->input('keterangan', '');
        $biaya = $request->input('biaya', 0);

        if ($eduId === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'eduId wajib diisi untuk update kegiatan',
                    'code' => 422,
                ],
            ], 422);
        }
        if ($clubId === null || $clubId === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'clubId wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        // Normalisasi tanggal ke dd-mm-yyyy bila user mengirim yyyy-mm-dd
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $tglPelayanan)) {
            [$y, $m, $d] = explode('-', $tglPelayanan);
            $tglPelayanan = $d.'-'.$m.'-'.$y;
        }
        if (! preg_match('/^\d{2}-\d{2}-\d{4}$/', $tglPelayanan)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Format tglPelayanan harus dd-mm-yyyy atau yyyy-mm-dd',
                    'code' => 422,
                ],
            ], 422);
        }

        if (! in_array($kdKelompok, ['01', '02'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'kdKelompok harus 01 (Diabetes Melitus) atau 02 (Hipertensi)',
                    'code' => 422,
                ],
            ], 422);
        }
        if (! in_array($kdKegiatan, ['01', '10', '11'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'kdKegiatan tidak valid. Gunakan 01 (Senam), 10 (Penyuluhan), 11 (Penyuluhan dan Senam)',
                    'code' => 422,
                ],
            ], 422);
        }

        $payload = [
            'eduId' => $eduId,
            'clubId' => is_numeric($clubId) ? (int) $clubId : $clubId,
            'tglPelayanan' => $tglPelayanan,
            'kdKegiatan' => $kdKegiatan,
            'kdKelompok' => $kdKelompok,
            'materi' => $materi,
            'pembicara' => $pembicara,
            'lokasi' => $lokasi,
            'keterangan' => $keterangan,
            'biaya' => (int) $biaya,
        ];

        $result = $this->pcareRequest('PUT', 'kelompok/kegiatan', [], $payload, [
            'Content-Type' => 'text/plain',
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Hapus (Delete) Kegiatan Kelompok.
     * Katalog BPJS: DELETE /kelompok/kegiatan/{eduId}
     * Format JSON, Content-Type: application/json; charset=utf-8
     */
    public function deleteKegiatanKelompok(string $eduId)
    {
        $eduId = trim($eduId);
        if ($eduId === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter eduId wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/kegiatan/'.urlencode($eduId);
        $result = $this->pcareRequest('DELETE', $endpoint, [], null, [
            'Content-Type' => 'application/json; charset=utf-8',
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Tambah (Add) Peserta Kegiatan Kelompok.
     * Katalog BPJS: POST /kelompok/peserta
     * Format JSON, Content-Type: text/plain
     * Body minimal: { "eduId": "...", "noKartu": "..." }
     */
    public function addPesertaKegiatan(Request $request)
    {
        $eduId = trim((string) $request->input('eduId', ''));
        $noKartu = trim((string) $request->input('noKartu', ''));

        if ($eduId === '' || $noKartu === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'eduId dan noKartu wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        // Siapkan payload sesuai katalog
        $payload = [
            'eduId' => $eduId,
            'noKartu' => $noKartu,
        ];

        $result = $this->pcareRequest('POST', 'kelompok/peserta', [], $payload, [
            'Content-Type' => 'text/plain',
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Peserta Kegiatan Kelompok berdasarkan eduId.
     * Katalog BPJS: GET /kelompok/peserta/{eduId}
     */
    public function getPesertaKegiatan(string $eduId)
    {
        $eduId = trim($eduId);
        if ($eduId === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter eduId wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/peserta/'.urlencode($eduId);
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Hapus (Delete) Peserta Kegiatan Kelompok
     * Katalog BPJS: DELETE /kelompok/peserta/{eduId}/{noKartu}
     * Format JSON, Content-Type: application/json; charset=utf-8
     */
    public function deletePesertaKegiatan(string $eduId, string $noKartu)
    {
        $eduId = trim($eduId);
        $noKartu = trim($noKartu);
        if ($eduId === '' || $noKartu === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter eduId dan noKartu wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/peserta/'.urlencode($eduId).'/'.urlencode($noKartu);
        $result = $this->pcareRequest('DELETE', $endpoint, [], null, [
            'Content-Type' => 'application/json; charset=utf-8',
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Pencarian poliklinik RS dari tabel lokal 'poliklinik'.
     * Query param: q (opsional) - cari pada kd_poli atau nm_poli
     * Response: { data: [{ kd_poli, nm_poli }] }
     */
    public function searchPoliklinikRs(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $query = DB::table('poliklinik')->select(['kd_poli', 'nm_poli']);
        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                $w->where('kd_poli', 'like', $like)
                    ->orWhere('nm_poli', 'like', $like);
            });
        }
        $rows = $query->orderBy('kd_poli')->limit(100)->get();

        return response()->json(['data' => $rows]);
    }

    /**
     * Pencarian dokter RS dari tabel lokal 'dokter'.
     * Query param: q (opsional) - cari pada kd_dokter atau nm_dokter
     * Response: { data: [{ kd_dokter, nm_dokter }] }
     */
    public function searchDokterRs(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $query = DB::table('dokter')->select(['kd_dokter', 'nm_dokter']);
        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                $w->where('kd_dokter', 'like', $like)
                    ->orWhere('nm_dokter', 'like', $like);
            });
        }
        $rows = $query->orderBy('kd_dokter')->limit(100)->get();

        return response()->json(['data' => $rows]);
    }

    /**
     * Pencarian obat RS dari tabel lokal 'databarang'.
     * Query param: q (opsional) - cari pada kode_brng atau nama_brng
     * Response: { data: [{ kode_brng, nama_brng }] }
     */
    public function searchObatRs(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $query = DB::table('databarang')->select(['kode_brng', 'nama_brng']);
        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                $w->where('kode_brng', 'like', $like)
                    ->orWhere('nama_brng', 'like', $like);
            });
        }
        $rows = $query->orderBy('kode_brng')->limit(100)->get();

        return response()->json(['data' => $rows]);
    }

    /**
     * Ambil daftar mapping poli dari tabel 'maping_poliklinik_pcare'.
     * Response: { data: [{ kd_poli_rs, kd_poli_pcare, nm_poli_pcare }] }
     */
    public function getMappingPoli(Request $request)
    {
        $rows = DB::table('maping_poliklinik_pcare')
            ->select(['kd_poli_rs', 'kd_poli_pcare', 'nm_poli_pcare'])
            ->orderBy('kd_poli_rs')
            ->limit(1000)
            ->get();

        return response()->json(['data' => $rows]);
    }

    /**
     * Simpan mapping poli ke tabel 'maping_poliklinik_pcare'.
     * Body JSON: { kd_poli_rs: char(5), kd_poli_pcare: char(5), nm_poli_pcare: varchar(50) }
     * Tidak melakukan migrasi — tabel sudah ada.
     * Perilaku: upsert berdasarkan kd_poli_rs.
     */
    public function storeMappingPoli(Request $request)
    {
        $kdPoliRs = strtoupper(trim((string) $request->input('kd_poli_rs', '')));
        $kdPoliPcare = strtoupper(trim((string) $request->input('kd_poli_pcare', '')));
        $nmPoliPcare = trim((string) $request->input('nm_poli_pcare', ''));

        if ($kdPoliRs === '' || $kdPoliPcare === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'kd_poli_rs dan kd_poli_pcare wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }
        if (strlen($kdPoliRs) > 5 || strlen($kdPoliPcare) > 5) {
            return response()->json([
                'metaData' => [
                    'message' => 'Panjang kd_poli_rs dan kd_poli_pcare maksimal 5 karakter',
                    'code' => 422,
                ],
            ], 422);
        }
        if (strlen($nmPoliPcare) > 50) {
            return response()->json([
                'metaData' => [
                    'message' => 'Panjang nm_poli_pcare maksimal 50 karakter',
                    'code' => 422,
                ],
            ], 422);
        }

        try {
            DB::table('maping_poliklinik_pcare')->updateOrInsert(
                ['kd_poli_rs' => $kdPoliRs],
                [
                    'kd_poli_pcare' => $kdPoliPcare,
                    'nm_poli_pcare' => $nmPoliPcare,
                ]
            );
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal menyimpan mapping: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        return response()->json([
            'metaData' => [
                'message' => 'Berhasil menyimpan mapping poli',
                'code' => 200,
            ],
        ]);
    }

    /**
     * Hapus mapping poli dari tabel 'maping_poliklinik_pcare'.
     * Body JSON: { kd_poli_rs: char(5), kd_poli_pcare?: char(5) }
     * Jika kd_poli_pcare tidak diisi, akan menghapus berdasarkan kd_poli_rs saja.
     */
    public function deleteMappingPoli(Request $request)
    {
        $kdPoliRs = strtoupper(trim((string) $request->input('kd_poli_rs', '')));
        $kdPoliPcare = strtoupper(trim((string) $request->input('kd_poli_pcare', '')));

        if ($kdPoliRs === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'kd_poli_rs wajib diisi untuk hapus mapping',
                    'code' => 422,
                ],
            ], 422);
        }

        try {
            $query = DB::table('maping_poliklinik_pcare')->where('kd_poli_rs', $kdPoliRs);
            if ($kdPoliPcare !== '') {
                $query->where('kd_poli_pcare', $kdPoliPcare);
            }
            $deleted = $query->delete();
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal menghapus mapping: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        if ($deleted > 0) {
            return response()->json([
                'metaData' => [
                    'message' => 'Berhasil menghapus mapping poli',
                    'code' => 200,
                ],
            ]);
        }

        return response()->json([
            'metaData' => [
                'message' => 'Mapping poli tidak ditemukan',
                'code' => 404,
            ],
        ], 404);
    }

    /**
     * Ambil daftar mapping dokter dari tabel 'maping_dokter_pcare'.
     * Response: { data: [{ kd_dokter, kd_dokter_pcare, nm_dokter_pcare }] }
     */
    public function getMappingDokter(Request $request)
    {
        $rows = DB::table('maping_dokter_pcare')
            ->select(['kd_dokter', 'kd_dokter_pcare', 'nm_dokter_pcare'])
            ->orderBy('kd_dokter')
            ->limit(1000)
            ->get();

        return response()->json(['data' => $rows]);
    }

    /**
     * Simpan mapping dokter ke tabel 'maping_dokter_pcare'.
     * Body JSON: { kd_dokter: varchar(20), kd_dokter_pcare: varchar(20), nm_dokter_pcare: varchar(50) }
     * Tidak melakukan migrasi — tabel sudah ada.
     * Perilaku: upsert berdasarkan kd_dokter.
     */
    public function storeMappingDokter(Request $request)
    {
        $kdDokter = strtoupper(trim((string) $request->input('kd_dokter', '')));
        $kdDokterPcare = strtoupper(trim((string) $request->input('kd_dokter_pcare', '')));
        $nmDokterPcare = trim((string) $request->input('nm_dokter_pcare', ''));

        if ($kdDokter === '' || $kdDokterPcare === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'kd_dokter dan kd_dokter_pcare wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }
        if (strlen($kdDokter) > 20 || strlen($kdDokterPcare) > 20) {
            return response()->json([
                'metaData' => [
                    'message' => 'Panjang kd_dokter dan kd_dokter_pcare maksimal 20 karakter',
                    'code' => 422,
                ],
            ], 422);
        }
        if (strlen($nmDokterPcare) > 50) {
            return response()->json([
                'metaData' => [
                    'message' => 'Panjang nm_dokter_pcare maksimal 50 karakter',
                    'code' => 422,
                ],
            ], 422);
        }

        try {
            DB::table('maping_dokter_pcare')->updateOrInsert(
                ['kd_dokter' => $kdDokter],
                [
                    'kd_dokter_pcare' => $kdDokterPcare,
                    'nm_dokter_pcare' => $nmDokterPcare,
                ]
            );
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal menyimpan mapping: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        return response()->json([
            'metaData' => [
                'message' => 'Berhasil menyimpan mapping dokter',
                'code' => 200,
            ],
        ]);
    }

    /**
     * Hapus mapping dokter dari tabel 'maping_dokter_pcare'.
     * Body JSON: { kd_dokter: varchar(20), kd_dokter_pcare?: varchar(20) }
     * Jika kd_dokter_pcare tidak diisi, akan menghapus berdasarkan kd_dokter saja.
     */
    public function deleteMappingDokter(Request $request)
    {
        $kdDokter = strtoupper(trim((string) $request->input('kd_dokter', '')));
        $kdDokterPcare = strtoupper(trim((string) $request->input('kd_dokter_pcare', '')));

        if ($kdDokter === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'kd_dokter wajib diisi untuk hapus mapping',
                    'code' => 422,
                ],
            ], 422);
        }

        try {
            $query = DB::table('maping_dokter_pcare')->where('kd_dokter', $kdDokter);
            if ($kdDokterPcare !== '') {
                $query->where('kd_dokter_pcare', $kdDokterPcare);
            }
            $deleted = $query->delete();
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal menghapus mapping: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        if ($deleted > 0) {
            return response()->json([
                'metaData' => [
                    'message' => 'Berhasil menghapus mapping dokter',
                    'code' => 200,
                ],
            ]);
        }

        return response()->json([
            'metaData' => [
                'message' => 'Mapping dokter tidak ditemukan',
                'code' => 404,
            ],
        ], 404);
    }

    /**
     * Ambil daftar mapping obat dari tabel 'maping_obat_pcare'.
     * Response: { data: [{ kode_brng, kode_brng_pcare, nama_brng_pcare }] }
     */
    public function getMappingObat(Request $request)
    {
        $rows = DB::table('maping_obat_pcare')
            ->select(['kode_brng', 'kode_brng_pcare', 'nama_brng_pcare'])
            ->orderBy('kode_brng')
            ->limit(1000)
            ->get();

        return response()->json(['data' => $rows]);
    }

    /**
     * Simpan mapping obat ke tabel 'maping_obat_pcare'.
     * Body JSON: { kode_brng: varchar(15), kode_brng_pcare: varchar(15), nama_brng_pcare: varchar(80) }
     * Perilaku: upsert berdasarkan kode_brng.
     */
    public function storeMappingObat(Request $request)
    {
        $kodeBrng = strtoupper(trim((string) $request->input('kode_brng', '')));
        $kodeBrngPcare = strtoupper(trim((string) $request->input('kode_brng_pcare', '')));
        $namaBrngPcare = trim((string) $request->input('nama_brng_pcare', ''));

        if ($kodeBrng === '' || $kodeBrngPcare === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'kode_brng dan kode_brng_pcare wajib diisi',
                    'code' => 422,
                ],
            ], 422);
        }
        if (strlen($kodeBrng) > 15 || strlen($kodeBrngPcare) > 15) {
            return response()->json([
                'metaData' => [
                    'message' => 'Panjang kode_brng dan kode_brng_pcare maksimal 15 karakter',
                    'code' => 422,
                ],
            ], 422);
        }
        if (strlen($namaBrngPcare) > 80) {
            return response()->json([
                'metaData' => [
                    'message' => 'Panjang nama_brng_pcare maksimal 80 karakter',
                    'code' => 422,
                ],
            ], 422);
        }

        try {
            DB::table('maping_obat_pcare')->updateOrInsert(
                ['kode_brng' => $kodeBrng],
                [
                    'kode_brng_pcare' => $kodeBrngPcare,
                    'nama_brng_pcare' => $namaBrngPcare,
                ]
            );
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal menyimpan mapping: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        return response()->json([
            'metaData' => [
                'message' => 'Berhasil menyimpan mapping obat',
                'code' => 200,
            ],
        ]);
    }

    /**
     * Hapus mapping obat dari tabel 'maping_obat_pcare'.
     * Body JSON: { kode_brng: varchar(15), kode_brng_pcare?: varchar(15) }
     * Jika kode_brng_pcare tidak diisi, akan menghapus berdasarkan kode_brng saja.
     */
    public function deleteMappingObat(Request $request)
    {
        $kodeBrng = strtoupper(trim((string) $request->input('kode_brng', '')));
        $kodeBrngPcare = strtoupper(trim((string) $request->input('kode_brng_pcare', '')));

        if ($kodeBrng === '') {
            return response()->json([
                'metaData' => [
                    'message' => 'kode_brng wajib diisi untuk hapus mapping',
                    'code' => 422,
                ],
            ], 422);
        }

        try {
            $query = DB::table('maping_obat_pcare')->where('kode_brng', $kodeBrng);
            if ($kodeBrngPcare !== '') {
                $query->where('kode_brng_pcare', $kodeBrngPcare);
            }
            $deleted = $query->delete();
        } catch (\Throwable $e) {
            return response()->json([
                'metaData' => [
                    'message' => 'Gagal menghapus mapping: '.$e->getMessage(),
                    'code' => 500,
                ],
            ], 500);
        }

        if ($deleted > 0) {
            return response()->json([
                'metaData' => [
                    'message' => 'Berhasil menghapus mapping obat',
                    'code' => 200,
                ],
            ]);
        }

        return response()->json([
            'metaData' => [
                'message' => 'Mapping obat tidak ditemukan',
                'code' => 404,
            ],
        ], 404);
    }
}
