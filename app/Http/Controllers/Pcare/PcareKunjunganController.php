<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Controller Kunjungan PCare (Add/Update) berdasarkan Katalog BPJS.
 * Referensi implementasi: public/PcareKunjunganController.php
 *
 * Fitur:
 * - Ambil data kunjungan dari DB (reg_periksa + pasien + poli + dokter)
 * - Bentuk payload sesuai Katalog BPJS PCare untuk endpoint POST /kunjungan
 * - Kirim data ke PCare menggunakan header & signature yang benar (BpjsTraits)
 * - Parsing respon (decrypt/decompress bila perlu) dan update status ke DB
 */
class PcareKunjunganController extends Controller
{
    use BpjsTraits;

    /**
     * Tampilkan halaman daftar/entry kunjungan (opsional jika view tersedia).
     */
    public function index()
    {
        return view('Pcare.kunjungan.index');
    }

    /**
     * Kirim Kunjungan PCare dari payload UI.
     * Endpoint: POST /api/pcare/kunjungan
     * Menerima body JSON sesuai katalog PCare, lalu diteruskan ke BPJS dengan Content-Type: text/plain.
     * Mengembalikan response yang sudah di-decrypt/decompress jika diperlukan.
     */
    public function store(Request $request)
    {
        // Ambil payload mentah dari frontend
        $payload = $request->all();

        // Normalisasi kdTacc: Sesuai Ref_TACC BPJS, nilai valid adalah -1, 1, 2, 3, 4
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

        // Jika tglDaftar dari UI berformat YYYY-MM-DD, konversi ke dd-mm-YYYY sesuai katalog
        try {
            if (! empty($payload['tglDaftar']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $payload['tglDaftar'])) {
                $dt = new \DateTime($payload['tglDaftar']);
                $payload['tglDaftar'] = $dt->format('d-m-Y');
            }
        } catch (\Throwable $e) {
        }

        // Kirim ke PCare
        $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $payload, [
            'Content-Type' => 'text/plain',
        ]);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        // Upsert status ke DB bila tersedia nomor rawat dalam payload
        try {
            $noRawat = trim((string) ($payload['no_rawat'] ?? ''));
            if ($noRawat !== '') {
                $status = ($response->status() === 201) ? 'Terkirim' : 'Gagal';
                // Ambil noKunjungan dari beberapa variasi struktur response
                $noKunjungan = null;
                if (is_array($processed)) {
                    if (isset($processed['response'])) {
                        $r = $processed['response'];
                        if (is_array($r)) {
                            if (isset($r['noKunjungan'])) {
                                $noKunjungan = (string) $r['noKunjungan'];
                            } elseif (isset($r[0]) && is_array($r[0]) && isset($r[0]['noKunjungan'])) {
                                $noKunjungan = (string) $r[0]['noKunjungan'];
                            } elseif (($r['field'] ?? '') === 'noKunjungan' && ! empty($r['message'])) {
                                $noKunjungan = (string) $r['message'];
                            }
                        }
                    } elseif (isset($processed['noKunjungan'])) {
                        $noKunjungan = (string) $processed['noKunjungan'];
                    }
                }

                // Simpan status dan respon mentah ke reg_periksa (penyesuaian kolom bila ada)
                try {
                    DB::table('reg_periksa')
                        ->where('no_rawat', $noRawat)
                        ->update([
                            'status_pcare' => $status,
                            'response_pcare' => is_array($processed) ? json_encode($processed) : (string) $processed,
                            'updated_at' => now(),
                        ]);
                } catch (\Throwable $e) {
                    Log::warning('Gagal update status_pcare di reg_periksa', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
                }
            }
        } catch (\Throwable $e) {
            Log::error('Gagal menyimpan data kunjungan ke DB', ['error' => $e->getMessage()]);
        }

        // Kembalikan hasil sesuai HTTP status asli dari PCare
        if (is_array($processed)) {
            return response()->json($processed, $response->status());
        }

        // Fallback: bila processed bukan array (decrypt gagal atau bukan wrapper JSON)
        return response($processed, $response->status())
            ->header('Content-Type', 'application/json');
    }

    /**
     * Tampilkan data kunjungan dari DB berdasarkan nomor rawat.
     */
    public function show(string $noRawat)
    {
        try {
            $kunjungan = $this->getKunjunganData($noRawat);

            if (! $kunjungan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data kunjungan tidak ditemukan',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $kunjungan,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error getting kunjungan data: '.$e->getMessage(), [
                'noRawat' => $noRawat,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Kirim ulang data kunjungan ke BPJS PCare.
     * Body request menerima 'alasan' (string) untuk pencatatan audit.
     */
    public function kirimUlang(Request $request, string $noRawat)
    {
        try {
            $request->validate([
                'alasan' => 'required|string|max:255',
            ]);

            $kunjungan = $this->getKunjunganData($noRawat);
            if (! $kunjungan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data kunjungan tidak ditemukan',
                ], 404);
            }

            $pcareData = $this->preparePcareKunjunganData($kunjungan);
            $response = $this->sendKunjunganToPcare($pcareData);

            if ($response && $response['success']) {
                $this->updateKunjunganStatus($noRawat, 'sent', $response);

                Log::info('PCare kunjungan kirim ulang berhasil', [
                    'no_rawat' => $noRawat,
                    'noKunjungan' => $response['noKunjungan'] ?? null,
                    'message' => $response['message'] ?? null,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Data kunjungan berhasil dikirim ulang ke BPJS PCare',
                    'noKunjungan' => $response['noKunjungan'] ?? null,
                    'data' => $response,
                ]);
            }

            $errorMessage = $response['message'] ?? 'Gagal mengirim data ke BPJS PCare';

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
                'data' => $response,
            ], 400);
        } catch (\Throwable $e) {
            Log::error('Error kirim ulang kunjungan: '.$e->getMessage(), [
                'noRawat' => $noRawat,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Kirim ulang batch data kunjungan ke BPJS PCare.
     * Parameter: no_rawat[] (array string), alasan (string)
     */
    public function kirimUlangBatch(Request $request)
    {
        try {
            $request->validate([
                'no_rawat' => 'required|array',
                'no_rawat.*' => 'required|string',
                'alasan' => 'required|string|max:255',
            ]);

            $results = [];
            $successCount = 0;
            $failCount = 0;

            foreach ($request->no_rawat as $noRawat) {
                try {
                    $kunjungan = $this->getKunjunganData($noRawat);
                    if (! $kunjungan) {
                        $results[] = [
                            'no_rawat' => $noRawat,
                            'success' => false,
                            'message' => 'Data tidak ditemukan',
                        ];
                        $failCount++;

                        continue;
                    }

                    $pcareData = $this->preparePcareKunjunganData($kunjungan);
                    $response = $this->sendKunjunganToPcare($pcareData);

                    if ($response && $response['success']) {
                        $this->updateKunjunganStatus($noRawat, 'sent', $response);
                        $results[] = [
                            'no_rawat' => $noRawat,
                            'success' => true,
                            'message' => 'Berhasil dikirim',
                            'noKunjungan' => $response['noKunjungan'] ?? null,
                        ];
                        $successCount++;
                    } else {
                        $results[] = [
                            'no_rawat' => $noRawat,
                            'success' => false,
                            'message' => $response['message'] ?? 'Gagal dikirim ke PCare',
                        ];
                        $failCount++;
                    }
                } catch (\Throwable $e) {
                    $results[] = [
                        'no_rawat' => $noRawat,
                        'success' => false,
                        'message' => 'Error: '.$e->getMessage(),
                    ];
                    $failCount++;
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Batch selesai. Berhasil: {$successCount}, Gagal: {$failCount}",
                'summary' => [
                    'total' => count($request->no_rawat),
                    'success' => $successCount,
                    'failed' => $failCount,
                ],
                'results' => $results,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error kirim ulang batch: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Preview payload kunjungan PCare berdasarkan nomor rawat tanpa mengirim ke BPJS.
     * Menggunakan helper preparePcareKunjunganData lalu mengembalikan JSON payload.
     */
    public function preview(string $noRawat)
    {
        try {
            $kunjungan = $this->getKunjunganData($noRawat);
            if (! $kunjungan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data kunjungan tidak ditemukan',
                ], 404);
            }

            $payload = $this->preparePcareKunjunganData($kunjungan);

            return response()->json([
                'success' => true,
                'payload' => $payload,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ambil data kunjungan dari database.
     */
    private function getKunjunganData(string $noRawat)
    {
        try {
            $kunjungan = DB::table('reg_periksa')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
                ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->leftJoin('maping_dokter_pcare', 'dokter.kd_dokter', '=', 'maping_dokter_pcare.kd_dokter')
                ->where('reg_periksa.no_rawat', $noRawat)
                ->select(
                    'reg_periksa.*',
                    'pasien.nm_pasien',
                    'pasien.no_peserta',
                    'pasien.no_ktp',
                    'pasien.tgl_lahir',
                    'pasien.jk',
                    'poliklinik.nm_poli',
                    'dokter.nm_dokter',
                    'maping_dokter_pcare.kd_dokter_pcare'
                )
                ->first();

            return $kunjungan;
        } catch (\Throwable $e) {
            Log::error('Error getting kunjungan from database: '.$e->getMessage());

            return null;
        }
    }

    /**
     * Bentuk data kunjungan sesuai format BPJS PCare (Add Kunjungan Update).
     * Content-Type: text/plain
     */
    private function preparePcareKunjunganData(object $kunjungan): array
    {
        // Ambil data pemeriksaan terbaru
        $pemeriksaanData = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $kunjungan->no_rawat)
            ->orderBy('tgl_perawatan', 'desc')
            ->orderBy('jam_rawat', 'desc')
            ->first();

        // Ambil diagnosa utama
        $diagnosaData = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $kunjungan->no_rawat)
            ->where('diagnosa_pasien.prioritas', '1')
            ->select('diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit')
            ->first();

        // Mapping poli ke KD PCare
        $mappingPoli = DB::table('maping_poliklinik_pcare')
            ->where('kd_poli_rs', $kunjungan->kd_poli)
            ->first();

        $kdPoliPcare = $mappingPoli ? $mappingPoli->kd_poli_pcare : null; // null bila tak ada mapping

        // Parse tensi menjadi sistole/diastole
        $sistole = 120;
        $diastole = 80;
        if ($pemeriksaanData && ! empty($pemeriksaanData->tensi) && strpos($pemeriksaanData->tensi, '/') !== false) {
            $tensiParts = explode('/', $pemeriksaanData->tensi);
            $sistole = (int) trim($tensiParts[0]) ?: 120;
            $diastole = (int) trim($tensiParts[1]) ?: 80;
        }

        // Terapi obat (string digabung)
        $terapiObatData = DB::table('resep_obat')
            ->join('resep_dokter', 'resep_obat.no_resep', '=', 'resep_dokter.no_resep')
            ->join('databarang', 'resep_dokter.kode_brng', '=', 'databarang.kode_brng')
            ->where('resep_obat.no_rawat', $kunjungan->no_rawat)
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

        return [
            // Sesuai contoh katalog: gunakan null untuk field yang tidak ada
            'noKunjungan' => null,
            'noKartu' => (string) ($kunjungan->no_peserta ?? ''),
            'tglDaftar' => date('d-m-Y', strtotime($kunjungan->tgl_registrasi)),
            'kdPoli' => $kdPoliPcare ? (string) $kdPoliPcare : null,
            'keluhan' => (string) ($pemeriksaanData->keluhan ?? 'Tidak Ada'),
            'kdSadar' => '04', // Compos Mentis menurut referensi internal
            'sistole' => (int) $sistole,
            'diastole' => (int) $diastole,
            'beratBadan' => (float) ($pemeriksaanData->berat ?? 50),
            'tinggiBadan' => (float) ($pemeriksaanData->tinggi ?? 170),
            'respRate' => (int) ($pemeriksaanData->respirasi ?? 20),
            'heartRate' => (int) ($pemeriksaanData->nadi ?? 80),
            'lingkarPerut' => (float) ($pemeriksaanData->lingkar_perut ?? 0),
            'kdStatusPulang' => '4', // mengacu contoh katalog (4)
            'tglPulang' => date('d-m-Y'),
            'kdDokter' => (string) ($kunjungan->kd_dokter_pcare ?? ''),
            'kdDiag1' => (string) ($diagnosaData->kd_penyakit ?? 'Z00.0'),
            'kdDiag2' => null,
            'kdDiag3' => null,
            'kdPoliRujukInternal' => null,
            // rujuLanjut dapat diisi dari request bila ada; default null
            'rujukLanjut' => null,
            'kdTacc' => -1, // Sesuai Ref_TACC: -1 = "Tanpa TACC"
            'alasanTacc' => null,
            'anamnesa' => (string) ($pemeriksaanData->keluhan ?? 'Tidak Ada'),
            'alergiMakan' => '00',
            'alergiUdara' => '00',
            'alergiObat' => '00',
            'kdPrognosa' => '01', // sesuai contoh katalog: 01
            'terapiObat' => (string) $terapiObatString,
            'terapiNonObat' => (string) ($pemeriksaanData->instruksi ?? 'Edukasi Kesehatan'),
            'bmhp' => 'Tidak Ada',
            'suhu' => (string) ($pemeriksaanData->suhu_tubuh ?? '36,4'),
        ];
    }

    /**
     * Kirim data kunjungan ke PCare (POST /kunjungan, Content-Type: text/plain) dan proses respon.
     */
    private function sendKunjunganToPcare(array $data): array
    {
        try {
            Log::info('Sending kunjungan to PCare', ['payload_preview' => array_intersect_key($data, array_flip(['noKartu', 'tglDaftar', 'kdPoli', 'kdDokter', 'kdDiag1']))]);

            $result = $this->pcareRequest('POST', 'kunjungan/v1', [], $data, [
                'Content-Type' => 'text/plain',
            ]);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            // Dekripsi/dekompresi bila perlu agar field metaData dan response terurai
            $processed = $this->maybeDecryptAndDecompress($response->body(), $timestamp);

            if (is_array($processed) && isset($processed['metaData'])) {
                $metaData = $processed['metaData'];
                // Sukses (HTTP 201) sesuai katalog
                if (($metaData['code'] ?? null) == '201' && isset($processed['response'])) {
                    $resp = $processed['response'];
                    // Respon kadang array berisi object pertama
                    $noKunjungan = null;
                    if (is_array($resp)) {
                        if (isset($resp[0]) && is_array($resp[0]) && isset($resp[0]['noKunjungan'])) {
                            $noKunjungan = $resp[0]['noKunjungan'];
                        } elseif (isset($resp['noKunjungan'])) {
                            $noKunjungan = $resp['noKunjungan'];
                        }
                    }

                    Log::info('PCare Kunjungan berhasil dikirim', [
                        'noKunjungan' => $noKunjungan,
                        'message' => $metaData['message'] ?? null,
                    ]);

                    return [
                        'success' => true,
                        'noKunjungan' => $noKunjungan,
                        'message' => $metaData['message'] ?? null,
                        'raw' => $processed,
                        'status' => $response->status(),
                    ];
                }

                Log::error('PCare Kunjungan error', [
                    'code' => $metaData['code'] ?? null,
                    'message' => $metaData['message'] ?? null,
                    'raw' => $processed,
                ]);

                return [
                    'success' => false,
                    'code' => $metaData['code'] ?? null,
                    'message' => $metaData['message'] ?? 'Unknown error',
                    'raw' => $processed,
                    'status' => $response->status(),
                ];
            }

            Log::error('PCare response invalid', ['body_excerpt' => substr($response->body() ?? '', 0, 500)]);

            return [
                'success' => false,
                'message' => 'Response invalid atau tidak sesuai format PCare',
                'status' => $response->status(),
            ];
        } catch (\Throwable $e) {
            Log::error('Error sending to PCare: '.$e->getMessage());

            return [
                'success' => false,
                'message' => 'Error: '.$e->getMessage(),
            ];
        }
    }

    /**
     * Update status kunjungan di tabel reg_periksa (sesuaikan skema bila berbeda).
     */
    private function updateKunjunganStatus(string $noRawat, string $status, ?array $response = null): void
    {
        try {
            DB::table('reg_periksa')
                ->where('no_rawat', $noRawat)
                ->update([
                    'status_pcare' => $status,
                    'response_pcare' => json_encode($response),
                    'updated_at' => now(),
                ]);
        } catch (\Throwable $e) {
            Log::error('Error updating kunjungan status: '.$e->getMessage());
        }
    }
}
