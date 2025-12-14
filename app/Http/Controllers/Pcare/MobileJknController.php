<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

/**
 * Controller untuk integrasi BPJS Mobile JKN.
 * Saat ini menyediakan endpoint sederhana untuk melihat konfigurasi yang digunakan.
 */
class MobileJknController extends Controller
{
    use BpjsTraits;

    /**
     * Mengembalikan konfigurasi Mobile JKN (debug/testing).
     */
    public function config()
    {
        return response()->json($this->mobilejknConfig());
    }

    /**
     * Referensi Poli (Mobile JKN)
     * Endpoint katalog: {BASE}/{Service}/ref/poli/tanggal/{tanggal}
     * Method: GET
     * Response: encrypted, we will attempt to decrypt on server side for convenience.
     */
    public function getReferensiPoli(Request $request)
    {
        $tanggal = $request->query('tanggal');
        if (empty($tanggal)) {
            $tanggal = date('Y-m-d');
        }

        $endpoint = "ref/poli/tanggal/{$tanggal}";

        try {
            $result = $this->mobilejknRequest('GET', $endpoint);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            $body = $response->body();

            // Attempt decrypt+decompress (if needed)
            $parsed = $this->maybeDecryptAndDecompressMobileJkn($body, $timestamp);

            // Return parsed JSON with original status code
            if (is_array($parsed)) {
                return response()->json($parsed, $response->status());
            }

            // Fallback: return raw body
            return response($body, $response->status())->header('Content-Type', 'application/json');
        } catch (\InvalidArgumentException $e) {
            // Misconfiguration (e.g., missing BASE URL) -> return 400 with clear message
            Log::warning('MobileJKN configuration error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: '.$e->getMessage(),
                ],
            ], 400);
        } catch (\Throwable $e) {
            Log::error('MobileJKN getReferensiPoli error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Terjadi kesalahan saat mengambil referensi poli Mobile JKN',
                ],
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Tambah Antrean (Mobile JKN)
     * Endpoint katalog: {BASE}/{Service}/antrean/add
     * Method: POST
     * Body: sesuai spesifikasi Mobile JKN
     * Catatan: payload akan dibangun otomatis dari data lokal (pasien, mapping poli/dokter, jadwal)
     */
    public function addAntrean(Request $request)
    {
        try {
            // Validasi input minimal
            $request->validate([
                'no_rkm_medis' => 'required|string',
                'kd_poli' => 'required|string',
                'kd_dokter' => 'required|string',
            ]);

            $noRkmMedis = (string) $request->input('no_rkm_medis');
            $kdPoli = (string) $request->input('kd_poli');
            $kdDokter = (string) $request->input('kd_dokter');
            $tanggalPeriksa = (string) ($request->input('tanggalperiksa') ?: date('Y-m-d'));
            $noReg = (string) ($request->input('no_reg') ?: '');

            // Ambil data pasien
            $pasien = DB::table('pasien')
                ->select(['no_peserta', 'no_ktp', 'no_tlp', 'no_rkm_medis'])
                ->where('no_rkm_medis', $noRkmMedis)
                ->first();

            if (! $pasien) {
                return response()->json([
                    'metadata' => [
                        'code' => 404,
                        'message' => 'Data pasien tidak ditemukan',
                    ],
                ], 404);
            }

            // Ambil mapping poli
            $mapPoli = DB::table('maping_poliklinik_pcare')
                ->select(['kd_poli_rs', 'kd_poli_pcare', 'nm_poli_pcare'])
                ->where('kd_poli_rs', $kdPoli)
                ->first();

            if (! $mapPoli) {
                return response()->json([
                    'metadata' => [
                        'code' => 400,
                        'message' => 'Mapping poli ke PCare tidak ditemukan. Mohon set di menu Mapping Poli PCare.',
                    ],
                ], 400);
            }

            // Ambil mapping dokter
            $mapDokter = DB::table('maping_dokter_pcare')
                ->select(['kd_dokter', 'kd_dokter_pcare', 'nm_dokter_pcare'])
                ->where('kd_dokter', $kdDokter)
                ->first();

            if (! $mapDokter) {
                return response()->json([
                    'metadata' => [
                        'code' => 400,
                        'message' => 'Mapping dokter ke PCare tidak ditemukan. Mohon set di menu Mapping Dokter PCare.',
                    ],
                ], 400);
            }

            // Ambil jam praktek dari tabel jadwal (fallback jika tidak ada)
            $jadwal = DB::table('jadwal')
                ->select(['jam_mulai', 'jam_selesai'])
                ->where('kd_dokter', $kdDokter)
                ->where('kd_poli', $kdPoli)
                // Optional: filter by hari jika tersedia pada tabel (tidak diasumsikan di sini)
                ->orderBy('jam_mulai')
                ->first();

            // Normalisasi format jam ke HH:mm (tanpa detik) sesuai spesifikasi Mobile JKN
            $rawJamMulai = $jadwal?->jam_mulai ?: '08:00';
            $rawJamSelesai = $jadwal?->jam_selesai ?: '16:00';
            $formatJam = function ($time) {
                // Terima input seperti '07:30', '07:30:00', bahkan '7:30'
                if (! is_string($time)) {
                    return '08:00';
                }
                // Ambil hanya HH:mm di depan
                // 1) Jika ada detik, buang (07:30:00 => 07:30)
                $time = substr($time, 0, 5);
                // 2) Pastikan ada leading zero untuk jam satu digit (7:30 => 07:30)
                if (preg_match('/^\d:\d{2}$/', $time)) {
                    $time = '0'.$time;
                }
                // Validasi sederhana HH:mm
                if (! preg_match('/^\d{2}:\d{2}$/', $time)) {
                    return '08:00';
                }

                return $time;
            };

            $jamMulai = $formatJam($rawJamMulai);
            $jamSelesai = $formatJam($rawJamSelesai);
            $jamPraktek = $jamMulai.'-'.$jamSelesai;

            // Nomor antrean dan angka antrean: gunakan no_reg bila tersedia; jika tidak, coba ambil dari reg_periksa hari ini
            $nomorAntrean = $noReg;
            $angkaAntrean = null;
            if (empty($nomorAntrean)) {
                $nomorAntrean = (string) (DB::table('reg_periksa')
                    ->where('tgl_registrasi', $tanggalPeriksa)
                    ->where('kd_dokter', $kdDokter)
                    ->where('kd_poli', $kdPoli)
                    ->max('no_reg') ?: '');
            }
            if (! empty($nomorAntrean)) {
                // Ekstrak angka dari no_reg (contoh: "005" => 5)
                $angkaAntrean = (int) preg_replace('/\D+/', '', $nomorAntrean);
            }

            // Sanitasi nama agar tidak ada newline/tabs atau spasi berlebih yang bisa menyebabkan mismatch di sisi BPJS
            $sanitizeName = function ($name) {
                $name = (string) $name;
                // Ganti semua whitespace berlebih menjadi satu spasi
                $name = preg_replace('/\s+/u', ' ', $name);
                $name = trim($name);
                // Hilangkan spasi di sekitar koma: " ," atau ", " -> ","
                $name = preg_replace('/\s*,\s*/', ',', $name);

                return $name;
            };
            $namaDokterPcare = $sanitizeName($mapDokter->nm_dokter_pcare ?? '');
            $namaPoliPcare = $sanitizeName($mapPoli->nm_poli_pcare ?? '');

            // Bangun payload sesuai katalog Mobile JKN
            $payload = [
                'nomorkartu' => (string) ($pasien->no_peserta ?? ''),
                'nik' => (string) ($pasien->no_ktp ?? ''),
                'nohp' => (string) ($pasien->no_tlp ?? ''),
                'kodepoli' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'namapoli' => $namaPoliPcare,
                'norm' => (string) ($pasien->no_rkm_medis ?? ''),
                'tanggalperiksa' => $tanggalPeriksa,
                'kodedokter' => is_numeric($mapDokter->kd_dokter_pcare ?? '') ? (int) $mapDokter->kd_dokter_pcare : (string) ($mapDokter->kd_dokter_pcare ?? ''),
                'namadokter' => $namaDokterPcare,
                'jampraktek' => $jamPraktek,
                'nomorantrean' => $nomorAntrean ?: '',
                'angkaantrean' => $angkaAntrean ?? null,
                'keterangan' => '',
            ];

            // Logging terstruktur sebelum request
            Log::info('MobileJKN addAntrean request', [
                'no_rkm_medis' => $noRkmMedis,
                'kd_poli_rs' => $kdPoli,
                'kd_poli_pcare' => $mapPoli->kd_poli_pcare ?? null,
                'kd_dokter_rs' => $kdDokter,
                'kd_dokter_pcare' => $mapDokter->kd_dokter_pcare ?? null,
                'tanggalperiksa' => $tanggalPeriksa,
                'jampraktek' => $jamPraktek,
                'nomorantrean' => $nomorAntrean,
                'angkaantrean' => $angkaAntrean,
            ]);

            // Panggil API Mobile JKN
            $start = microtime(true);
            $result = $this->mobilejknRequest('POST', 'antrean/add', [], $payload);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            $body = $response->body();
            $parsed = $this->maybeDecryptAndDecompressMobileJkn($body, $timestamp);
            $durationMs = (int) round((microtime(true) - $start) * 1000);

            // Tentukan no_rawat untuk keperluan logging berdasarkan data registrasi hari ini
            $reg = DB::table('reg_periksa')
                ->where('no_rkm_medis', $noRkmMedis)
                ->where('kd_poli', $kdPoli)
                ->where('tgl_registrasi', $tanggalPeriksa)
                ->orderByDesc('jam_reg')
                ->first();
            $noRawat = $reg?->no_rawat ?? null;

            // Siapkan payload ringkas untuk audit, mask nomor kartu
            $maskedCard = '';
            try {
                $card = (string) ($pasien->no_peserta ?? '');
                $maskedCard = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
            } catch (\Throwable $e) {
                $maskedCard = '';
            }
            $requestLog = [
                'no_rkm_medis' => $noRkmMedis,
                'kd_poli_rs' => $kdPoli,
                'kd_poli_pcare' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'kd_dokter_rs' => $kdDokter,
                'kd_dokter_pcare' => (string) ($mapDokter->kd_dokter_pcare ?? ''),
                'tanggalperiksa' => $tanggalPeriksa,
                'jampraktek' => $jamPraktek,
                'nomorantrean' => $nomorAntrean ?: '',
                'angkaantrean' => $angkaAntrean ?? null,
                'noKartu_masked' => $maskedCard,
            ];

            // Kembalikan response yang telah di-parse jika memungkinkan
            if (is_array($parsed)) {
                // Normalisasi metadata.code terhadap HTTP status agar frontend konsisten
                $meta = $parsed['metadata'] ?? $parsed['metaData'] ?? null;
                if (is_array($meta)) {
                    $code = (int) ($meta['code'] ?? 200);
                    $httpStatus = $code === 200 ? 200 : 400;
                    Log::info('MobileJKN addAntrean response (normalized)', [
                        'metadata' => $meta,
                        'http_status' => $httpStatus,
                    ]);

                    // Simpan log ke tabel pcare_bpjs_log bila tersedia
                    if (Schema::hasTable('pcare_bpjs_log') && $noRawat) {
                        $statusLabel = $httpStatus >= 200 && $httpStatus < 300 ? 'success' : 'failed';
                        try {
                            DB::table('pcare_bpjs_log')->insert([
                                'no_rawat' => $noRawat,
                                'endpoint' => 'Ambil Antrian',
                                'status' => $statusLabel,
                                'http_status' => $httpStatus,
                                'meta_code' => (int) ($meta['code'] ?? 0),
                                'meta_message' => (string) ($meta['message'] ?? ''),
                                'duration_ms' => $durationMs,
                                'request_payload' => json_encode($requestLog),
                                'response_body_raw' => $body,
                                'response_body_json' => is_array($parsed) ? json_encode($parsed) : null,
                                'triggered_by' => optional($request->user())->nik ?? (string) optional($request->user())->id ?? null,
                                'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        } catch (\Throwable $e) {
                            Log::channel('bpjs')->error('Gagal insert pcare_bpjs_log (antrean_add)', [
                                'no_rawat' => $noRawat,
                                'error' => $e->getMessage(),
                            ]);
                        }
                    }

                    return response()->json($parsed, $httpStatus);
                }
                // Jika tidak ada metadata, gunakan status asli
                Log::info('MobileJKN addAntrean response (no metadata)', [
                    'status' => $response->status(),
                ]);

                // Simpan log ke tabel pcare_bpjs_log bila tersedia
                if (Schema::hasTable('pcare_bpjs_log') && $noRawat) {
                    $statusLabel = $response->status() >= 200 && $response->status() < 300 ? 'success' : 'failed';
                    try {
                        DB::table('pcare_bpjs_log')->insert([
                            'no_rawat' => $noRawat,
                            'endpoint' => 'Ambil Antrian',
                            'status' => $statusLabel,
                            'http_status' => $response->status(),
                            'meta_code' => null,
                            'meta_message' => '',
                            'duration_ms' => $durationMs,
                            'request_payload' => json_encode($requestLog),
                            'response_body_raw' => $body,
                            'response_body_json' => is_array($parsed) ? json_encode($parsed) : null,
                            'triggered_by' => optional($request->user())->nik ?? (string) optional($request->user())->id ?? null,
                            'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    } catch (\Throwable $e) {
                        Log::channel('bpjs')->error('Gagal insert pcare_bpjs_log (antrean_add, no metadata)', [
                            'no_rawat' => $noRawat,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }

                return response()->json($parsed, $response->status());
            }

            return response($body, $response->status())->header('Content-Type', 'application/json');
        } catch (\InvalidArgumentException $e) {
            Log::warning('MobileJKN configuration error (addAntrean)', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: '.$e->getMessage(),
                ],
            ], 400);
        } catch (\Throwable $e) {
            Log::error('MobileJKN addAntrean error', [
                'message' => $e->getMessage(),
                'no_rkm_medis' => $request->input('no_rkm_medis'),
                'kd_poli' => $request->input('kd_poli'),
                'kd_dokter' => $request->input('kd_dokter'),
                'tanggalperiksa' => $request->input('tanggalperiksa') ?: date('Y-m-d'),
                'no_reg' => $request->input('no_reg') ?: null,
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Terjadi kesalahan saat menambah antrean Mobile JKN',
                ],
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Referensi Dokter per Poli (Mobile JKN)
     * Endpoint katalog: {BASE}/{Service}/ref/dokter/kodepoli/{kodepoli}/tanggal/{tanggal}
     * Method: GET
     * Response: encrypted, we will attempt to decrypt on server side for convenience.
     */
    public function getReferensiDokter(Request $request)
    {
        $kodepoli = $request->query('kodepoli');
        $tanggal = $request->query('tanggal');
        if (empty($tanggal)) {
            $tanggal = date('Y-m-d');
        }

        if (empty($kodepoli)) {
            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Parameter kodepoli wajib diisi',
                ],
            ], 400);
        }

        $endpoint = "ref/dokter/kodepoli/{$kodepoli}/tanggal/{$tanggal}";

        try {
            $result = $this->mobilejknRequest('GET', $endpoint);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            $body = $response->body();

            // Attempt decrypt+decompress (if needed)
            $parsed = $this->maybeDecryptAndDecompressMobileJkn($body, $timestamp);

            // Return parsed JSON with original status code
            if (is_array($parsed)) {
                return response()->json($parsed, $response->status());
            }

            // Fallback: return raw body
            return response($body, $response->status())->header('Content-Type', 'application/json');
        } catch (\InvalidArgumentException $e) {
            // Misconfiguration (e.g., missing BASE URL) -> return 400 with clear message
            Log::warning('MobileJKN configuration error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: '.$e->getMessage(),
                ],
            ], 400);
        } catch (\Throwable $e) {
            Log::error('MobileJKN getReferensiDokter error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Terjadi kesalahan saat mengambil referensi dokter Mobile JKN',
                ],
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update Status / Panggil Antrean (Mobile JKN)
     * Endpoint katalog: {BASE}/{Service}/antrean/panggil
     * Method: POST
     * Body (JSON): {
     *   tanggalperiksa: YYYY-MM-DD,
     *   kodepoli: string (kode poli PCare),
     *   nomorkartu: string (no peserta BPJS),
     *   status: 1|2 (1=Hadir, 2=Tidak Hadir),
     *   waktu: int (timestamp in milliseconds)
     * }
     * Catatan: kodepoli dan nomorkartu akan dipetakan otomatis dari data lokal.
     */
    public function panggilAntrean(Request $request)
    {
        try {
            // Validasi input minimal
            $request->validate([
                'no_rkm_medis' => 'required|string',
                'kd_poli' => 'required|string',
                'status' => 'required|integer|in:1,2',
                'tanggalperiksa' => 'nullable|date',
            ]);

            $noRkmMedis = (string) $request->input('no_rkm_medis');
            $kdPoli = (string) $request->input('kd_poli');
            $status = (int) $request->input('status'); // 1 = Hadir, 2 = Tidak Hadir
            $tanggalPeriksa = (string) ($request->input('tanggalperiksa') ?: date('Y-m-d'));

            // Early log: record incoming request even if it fails early (patient/mapping not found)
            \Illuminate\Support\Facades\Log::channel('bpjs')->info('MobileJKN panggilAntrean request received', [
                'no_rkm_medis' => $noRkmMedis,
                'kd_poli_rs' => $kdPoli,
                'tanggalperiksa' => $tanggalPeriksa,
                'status' => $status,
            ]);

            // Ambil data pasien (nomor kartu BPJS)
            $pasien = \Illuminate\Support\Facades\DB::table('pasien')
                ->select(['no_peserta', 'no_rkm_medis'])
                ->where('no_rkm_medis', $noRkmMedis)
                ->first();

            if (! $pasien) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN panggilAntrean early exit: pasien tidak ditemukan', [
                    'no_rkm_medis' => $noRkmMedis,
                ]);

                return response()->json([
                    'metadata' => [
                        'code' => 404,
                        'message' => 'Data pasien tidak ditemukan',
                    ],
                ], 404);
            }

            if (empty($pasien->no_peserta)) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN panggilAntrean early exit: no_peserta kosong', [
                    'no_rkm_medis' => $noRkmMedis,
                ]);

                return response()->json([
                    'metadata' => [
                        'code' => 400,
                        'message' => 'Nomor kartu BPJS (no_peserta) pasien tidak tersedia',
                    ],
                ], 400);
            }

            // Ambil mapping poli ke PCare
            $mapPoli = \Illuminate\Support\Facades\DB::table('maping_poliklinik_pcare')
                ->select(['kd_poli_rs', 'kd_poli_pcare'])
                ->where('kd_poli_rs', $kdPoli)
                ->first();

            if (! $mapPoli) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN panggilAntrean early exit: mapping poli tidak ditemukan', [
                    'kd_poli_rs' => $kdPoli,
                ]);

                return response()->json([
                    'metadata' => [
                        'code' => 400,
                        'message' => 'Mapping poli ke PCare tidak ditemukan. Mohon set di menu Mapping Poli PCare.',
                    ],
                ], 400);
            }

            // Waktu dalam timestamp miliseconds
            $waktuMs = (int) round(microtime(true) * 1000);

            $payload = [
                'tanggalperiksa' => $tanggalPeriksa,
                'kodepoli' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'nomorkartu' => (string) ($pasien->no_peserta ?? ''),
                'status' => $status,
                'waktu' => $waktuMs,
            ];

            // Logging terstruktur sebelum request
            \Illuminate\Support\Facades\Log::channel('bpjs')->info('MobileJKN panggilAntrean request', [
                'no_rkm_medis' => $noRkmMedis,
                'kd_poli_rs' => $kdPoli,
                'kd_poli_pcare' => $mapPoli->kd_poli_pcare ?? null,
                'tanggalperiksa' => $tanggalPeriksa,
                'status' => $status,
                'waktu_ms' => $waktuMs,
            ]);

            // Debug payload yang akan dikirim ke Mobile JKN
            \Illuminate\Support\Facades\Log::channel('bpjs')->debug('MobileJKN panggilAntrean payload', $payload);

            // Debug sebelum mengirim request
            \Illuminate\Support\Facades\Log::channel('bpjs')->debug('MobileJKN panggilAntrean send', [
                'endpoint' => 'antrean/panggil',
                'method' => 'POST',
            ]);

            $start = microtime(true);
            $result = $this->mobilejknRequest('POST', 'antrean/panggil', [], $payload);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            $body = $response->body();
            $parsed = $this->maybeDecryptAndDecompressMobileJkn($body, $timestamp);

            $reg = DB::table('reg_periksa')
                ->where('no_rkm_medis', $noRkmMedis)
                ->where('kd_poli', $kdPoli)
                ->where('tgl_registrasi', $tanggalPeriksa)
                ->orderByDesc('jam_reg')
                ->first();
            $noRawat = $reg?->no_rawat ?? null;
            $durationMs = (int) round((microtime(true) - $start) * 1000);
            $maskedCard = '';
            try {
                $card = (string) ($pasien->no_peserta ?? '');
                $maskedCard = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
            } catch (\Throwable $e) {
                $maskedCard = '';
            }
            $requestLog = [
                'tanggalperiksa' => $tanggalPeriksa,
                'kodepoli' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'status' => $status,
                'waktu' => $waktuMs,
                'nomorkartu_masked' => $maskedCard,
            ];
            $meta = is_array($parsed) ? ($parsed['metadata'] ?? ($parsed['metaData'] ?? [])) : [];
            $metaCode = is_array($meta) ? (int) ($meta['code'] ?? 0) : null;
            $metaMessage = is_array($meta) ? (string) ($meta['message'] ?? '') : null;
            $httpStatusNorm = is_array($meta) ? ($metaCode === 200 ? 200 : 400) : $response->status();
            $statusLabel = $httpStatusNorm >= 200 && $httpStatusNorm < 300 ? 'success' : 'failed';

            if (Schema::hasTable('pcare_bpjs_log') && $noRawat) {
                try {
                    DB::table('pcare_bpjs_log')->insert([
                        'no_rawat' => $noRawat,
                        'endpoint' => 'Panggil Antrian',
                        'status' => $statusLabel,
                        'http_status' => $httpStatusNorm,
                        'meta_code' => $metaCode,
                        'meta_message' => $metaMessage,
                        'duration_ms' => $durationMs,
                        'request_payload' => json_encode($requestLog),
                        'response_body_raw' => $body,
                        'response_body_json' => is_array($parsed) ? json_encode($parsed) : null,
                        'triggered_by' => optional($request->user())->nik ?? (string) optional($request->user())->id ?? null,
                        'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                } catch (\Throwable $e) {
                    Log::channel('bpjs')->error('Gagal insert pcare_bpjs_log (antrean_panggil)', [
                        'no_rawat' => $noRawat,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            if (is_array($parsed)) {
                $meta = $parsed['metadata'] ?? $parsed['metaData'] ?? null;
                if (is_array($meta)) {
                    $code = (int) ($meta['code'] ?? 200);
                    $httpStatus = $code === 200 ? 200 : 400;
                    \Illuminate\Support\Facades\Log::channel('bpjs')->info('MobileJKN panggilAntrean response (normalized)', [
                        'metadata' => $meta,
                        'http_status' => $httpStatus,
                    ]);

                    return response()->json($parsed, $httpStatus);
                }

                return response()->json($parsed, $response->status());
            }

            return response($body, $response->status())->header('Content-Type', 'application/json');
        } catch (\InvalidArgumentException $e) {
            \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN configuration error (panggilAntrean)', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: '.$e->getMessage(),
                ],
            ], 400);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::channel('bpjs')->error('MobileJKN panggilAntrean error', [
                'message' => $e->getMessage(),
                'no_rkm_medis' => $request->input('no_rkm_medis'),
                'kd_poli' => $request->input('kd_poli'),
                'status' => $request->input('status'),
                'tanggalperiksa' => $request->input('tanggalperiksa') ?: date('Y-m-d'),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Terjadi kesalahan saat memanggil antrean Mobile JKN',
                ],
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Batal Antrean (Mobile JKN)
     * Endpoint katalog: {BASE}/{Service}/antrean/batal
     * Method: POST
     * Body (JSON): {
     *   tanggalperiksa: YYYY-MM-DD,
     *   kodepoli: string (kode poli PCare),
     *   nomorkartu: string (no peserta BPJS),
     *   alasan: string
     * }
     * Catatan: kodepoli dan nomorkartu akan dipetakan otomatis dari data lokal.
     */
    public function batalAntrean(Request $request)
    {
        try {
            // Validasi input minimal dari frontend (gunakan data lokal untuk melengkapi)
            $request->validate([
                'no_rkm_medis' => 'required|string',
                'kd_poli' => 'required|string',
                'tanggalperiksa' => 'nullable|date',
                'alasan' => 'nullable|string',
            ]);

            $noRkmMedis = (string) $request->input('no_rkm_medis');
            $kdPoli = (string) $request->input('kd_poli');
            $tanggalPeriksa = (string) ($request->input('tanggalperiksa') ?: date('Y-m-d'));
            $alasan = (string) ($request->input('alasan') ?: 'Dibatalkan oleh petugas via aplikasi');

            // Early log: record incoming request even if it fails early
            \Illuminate\Support\Facades\Log::channel('bpjs')->info('MobileJKN batalAntrean request received', [
                'no_rkm_medis' => $noRkmMedis,
                'kd_poli_rs' => $kdPoli,
                'tanggalperiksa' => $tanggalPeriksa,
                'alasan' => $alasan,
            ]);

            // Ambil data pasien (nomor kartu BPJS)
            $pasien = \Illuminate\Support\Facades\DB::table('pasien')
                ->select(['no_peserta', 'no_rkm_medis'])
                ->where('no_rkm_medis', $noRkmMedis)
                ->first();

            if (! $pasien) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN batalAntrean early exit: pasien tidak ditemukan', [
                    'no_rkm_medis' => $noRkmMedis,
                ]);

                return response()->json([
                    'metadata' => [
                        'code' => 404,
                        'message' => 'Data pasien tidak ditemukan',
                    ],
                ], 404);
            }

            if (empty($pasien->no_peserta)) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN batalAntrean early exit: no_peserta kosong', [
                    'no_rkm_medis' => $noRkmMedis,
                ]);

                return response()->json([
                    'metadata' => [
                        'code' => 400,
                        'message' => 'Nomor kartu BPJS (no_peserta) pasien tidak tersedia',
                    ],
                ], 400);
            }

            // Ambil mapping poli ke PCare
            $mapPoli = \Illuminate\Support\Facades\DB::table('maping_poliklinik_pcare')
                ->select(['kd_poli_rs', 'kd_poli_pcare'])
                ->where('kd_poli_rs', $kdPoli)
                ->first();

            if (! $mapPoli) {
                \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN batalAntrean early exit: mapping poli tidak ditemukan', [
                    'kd_poli_rs' => $kdPoli,
                ]);

                return response()->json([
                    'metadata' => [
                        'code' => 400,
                        'message' => 'Mapping poli ke PCare tidak ditemukan. Mohon set di menu Mapping Poli PCare.',
                    ],
                ], 400);
            }

            $payload = [
                'tanggalperiksa' => $tanggalPeriksa,
                'kodepoli' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'nomorkartu' => (string) ($pasien->no_peserta ?? ''),
                'alasan' => $alasan,
            ];

            // Debug payload yang akan dikirim
            \Illuminate\Support\Facades\Log::channel('bpjs')->debug('MobileJKN batalAntrean payload', $payload);
            \Illuminate\Support\Facades\Log::channel('bpjs')->debug('MobileJKN batalAntrean send', [
                'endpoint' => 'antrean/batal',
                'method' => 'POST',
            ]);

            $start = microtime(true);
            $result = $this->mobilejknRequest('POST', 'antrean/batal', [], $payload);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            $body = $response->body();
            $parsed = $this->maybeDecryptAndDecompressMobileJkn($body, $timestamp);
            $durationMs = (int) round((microtime(true) - $start) * 1000);

            // Tentukan no_rawat untuk keperluan logging berdasarkan data registrasi hari ini
            $reg = \Illuminate\Support\Facades\DB::table('reg_periksa')
                ->where('no_rkm_medis', $noRkmMedis)
                ->where('kd_poli', $kdPoli)
                ->where('tgl_registrasi', $tanggalPeriksa)
                ->orderByDesc('jam_reg')
                ->first();
            $noRawat = $reg?->no_rawat ?? null;

            // Siapkan payload ringkas untuk audit, mask nomor kartu
            $maskedCard = '';
            try {
                $card = (string) ($pasien->no_peserta ?? '');
                $maskedCard = substr($card, 0, 6).str_repeat('*', max(strlen($card) - 10, 0)).substr($card, -4);
            } catch (\Throwable $e) {
                $maskedCard = '';
            }
            $requestLog = [
                'no_rkm_medis' => $noRkmMedis,
                'kd_poli_rs' => $kdPoli,
                'kd_poli_pcare' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'tanggalperiksa' => $tanggalPeriksa,
                'alasan' => $alasan,
                'noKartu_masked' => $maskedCard,
            ];

            if (is_array($parsed)) {
                $meta = $parsed['metadata'] ?? $parsed['metaData'] ?? null;
                if (is_array($meta)) {
                    $code = (int) ($meta['code'] ?? 200);
                    $httpStatus = $code === 200 ? 200 : 400;
                    \Illuminate\Support\Facades\Log::channel('bpjs')->info('MobileJKN batalAntrean response (normalized)', [
                        'metadata' => $meta,
                        'http_status' => $httpStatus,
                    ]);

                    // Simpan log ke tabel pcare_bpjs_log bila tersedia
                    if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log') && $noRawat) {
                        $statusLabel = $httpStatus >= 200 && $httpStatus < 300 ? 'success' : 'failed';
                        try {
                            \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')->insert([
                                'no_rawat' => $noRawat,
                                'endpoint' => 'Batal',
                                'status' => $statusLabel,
                                'http_status' => $httpStatus,
                                'meta_code' => (int) ($meta['code'] ?? 0),
                                'meta_message' => (string) ($meta['message'] ?? ''),
                                'duration_ms' => $durationMs,
                                'request_payload' => json_encode($requestLog),
                                'response_body_raw' => $body,
                                'response_body_json' => is_array($parsed) ? json_encode($parsed) : null,
                                'triggered_by' => optional($request->user())->nik ?? (string) optional($request->user())->id ?? null,
                                'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        } catch (\Throwable $e) {
                            \Illuminate\Support\Facades\Log::channel('bpjs')->error('Gagal insert pcare_bpjs_log (antrean_batal)', [
                                'no_rawat' => $noRawat,
                                'error' => $e->getMessage(),
                            ]);
                        }
                    }

                    return response()->json($parsed, $httpStatus);
                }
                // Simpan log ke tabel pcare_bpjs_log bila tersedia (tanpa metadata)
                if (\Illuminate\Support\Facades\Schema::hasTable('pcare_bpjs_log') && $noRawat) {
                    $statusLabel = $response->status() >= 200 && $response->status() < 300 ? 'success' : 'failed';
                    try {
                        \Illuminate\Support\Facades\DB::table('pcare_bpjs_log')->insert([
                            'no_rawat' => $noRawat,
                            'endpoint' => 'Batal',
                            'status' => $statusLabel,
                            'http_status' => $response->status(),
                            'meta_code' => null,
                            'meta_message' => '',
                            'duration_ms' => $durationMs,
                            'request_payload' => json_encode($requestLog),
                            'response_body_raw' => $body,
                            'response_body_json' => is_array($parsed) ? json_encode($parsed) : null,
                            'triggered_by' => optional($request->user())->nik ?? (string) optional($request->user())->id ?? null,
                            'correlation_id' => $request->header('X-BPJS-LOG-ID') ?: null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    } catch (\Throwable $e) {
                        \Illuminate\Support\Facades\Log::channel('bpjs')->error('Gagal insert pcare_bpjs_log (antrean_batal, no metadata)', [
                            'no_rawat' => $noRawat,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }

                return response()->json($parsed, $response->status());
            }

            return response($body, $response->status())->header('Content-Type', 'application/json');
        } catch (\InvalidArgumentException $e) {
            \Illuminate\Support\Facades\Log::channel('bpjs')->warning('MobileJKN configuration error (batalAntrean)', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 400,
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: '.$e->getMessage(),
                ],
            ], 400);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::channel('bpjs')->error('MobileJKN batalAntrean error', [
                'message' => $e->getMessage(),
                'no_rkm_medis' => $request->input('no_rkm_medis'),
                'kd_poli' => $request->input('kd_poli'),
                'tanggalperiksa' => $request->input('tanggalperiksa') ?: date('Y-m-d'),
                'alasan' => $request->input('alasan') ?: null,
            ]);

            return response()->json([
                'metadata' => [
                    'code' => 500,
                    'message' => 'Terjadi kesalahan saat membatalkan antrean Mobile JKN',
                ],
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
