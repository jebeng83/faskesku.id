<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: ' . $e->getMessage(),
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

            if (!$pasien) {
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

            if (!$mapPoli) {
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

            if (!$mapDokter) {
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

            $jamMulai = $jadwal?->jam_mulai ?: '08:00';
            $jamSelesai = $jadwal?->jam_selesai ?: '16:00';
            $jamPraktek = $jamMulai . '-' . $jamSelesai;

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
            if (!empty($nomorAntrean)) {
                // Ekstrak angka dari no_reg (contoh: "005" => 5)
                $angkaAntrean = (int) preg_replace('/\D+/', '', $nomorAntrean);
            }

            // Bangun payload sesuai katalog Mobile JKN
            $payload = [
                'nomorkartu' => (string) ($pasien->no_peserta ?? ''),
                'nik' => (string) ($pasien->no_ktp ?? ''),
                'nohp' => (string) ($pasien->no_tlp ?? ''),
                'kodepoli' => (string) ($mapPoli->kd_poli_pcare ?? ''),
                'namapoli' => (string) ($mapPoli->nm_poli_pcare ?? ''),
                'norm' => (string) ($pasien->no_rkm_medis ?? ''),
                'tanggalperiksa' => $tanggalPeriksa,
                'kodedokter' => is_numeric($mapDokter->kd_dokter_pcare ?? '') ? (int) $mapDokter->kd_dokter_pcare : (string) ($mapDokter->kd_dokter_pcare ?? ''),
                'namadokter' => (string) ($mapDokter->nm_dokter_pcare ?? ''),
                'jampraktek' => $jamPraktek,
                'nomorantrean' => $nomorAntrean ?: '',
                'angkaantrean' => $angkaAntrean ?? null,
                'keterangan' => '',
            ];

            // Panggil API Mobile JKN
            $result = $this->mobilejknRequest('POST', 'antrean/add', [], $payload);
            $response = $result['response'];
            $timestamp = $result['timestamp_used'];

            $body = $response->body();
            $parsed = $this->maybeDecryptAndDecompressMobileJkn($body, $timestamp);

            // Kembalikan response yang telah di-parse jika memungkinkan
            if (is_array($parsed)) {
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
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: ' . $e->getMessage(),
                ],
            ], 400);
        } catch (\Throwable $e) {
            Log::error('MobileJKN addAntrean error', [
                'message' => $e->getMessage(),
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
                    'message' => 'Konfigurasi Mobile JKN belum lengkap: ' . $e->getMessage(),
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
}