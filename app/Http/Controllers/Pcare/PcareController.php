<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\BpjsTraits;
use Illuminate\Support\Facades\DB;

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

        $result = $this->pcareRequest($method, $endpoint, $query, $body);

        $response = $result['response'];
        $timestamp = $result['timestamp_used'];
        $rawBody = $response->body();
        $processed = $this->maybeDecryptAndDecompress($rawBody, $timestamp);

        return response()->json([
            'ok' => $response->successful(),
            'status' => $response->status(),
            'endpoint' => $result['url'],
            'headers_used' => $result['headers_used'],
            'data' => $processed,
            'raw' => $response->json() ?? $rawBody,
        ], $response->status());
    }

    /**
     * Contoh: daftar dokter.
     * Endpoint PCare biasanya: GET /dokter/{start}/{limit}
     */
    public function getDokter(Request $request)
    {
        $start = $request->query('start', 0);
        $limit = $request->query('limit', 100);
        $result = $this->pcareRequest('GET', "dokter/{$start}/{$limit}");

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Contoh: daftar faskes.
     * Endpoint PCare biasanya: GET /faskes/{start}/{limit}
     */
    public function getFaskes(Request $request)
    {
        $start = $request->query('start', 0);
        $limit = $request->query('limit', 100);
        $result = $this->pcareRequest('GET', "faskes/{$start}/{$limit}");

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Poli FKTP (PCare REST).
     * Endpoint PCare: GET /poli/fktp/{start}/{limit}
     */
    public function getPoli(Request $request)
    {
        $start = $request->query('start', 0);
        $limit = $request->query('limit', 100);
        // Per spesifikasi PCare REST, poli FKTP ada pada path 'poli/fktp/{start}/{limit}'
        $result = $this->pcareRequest('GET', "poli/fktp/{$start}/{$limit}");

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
        $result = $this->pcareRequest('GET', 'kesadaran');

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Contoh: peserta berdasarkan nomor kartu (noka) & tanggal pelayanan.
     * Endpoint yang umum: GET /peserta/nokartu/{noka}/tglPelayanan/{tglPelayanan}
     */
    public function pesertaByNoKartu(string $noka, string $tglPelayanan)
    {
        $endpoint = "peserta/nokartu/{$noka}/tglPelayanan/{$tglPelayanan}";
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
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

        $endpoint = 'peserta/' . urlencode($noka);
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Contoh: pendaftaran/kunjungan (POST ke PCare). Payload mengikuti spesifikasi BPJS PCare.
     */
    public function daftarKunjungan(Request $request)
    {
        $payload = $request->all();
        $result = $this->pcareRequest('POST', 'kunjungan', [], $payload);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
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
            $endpoint = 'diagnosa/' . urlencode($keyword) . '/' . $start . '/' . $limit;
            $result = $this->pcareRequest('GET', $endpoint);
        }

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        if (!is_array($processed)) {
            $processed = ['raw' => $processed];
        }

        return response()->json($processed, $response->status());
    }

    public function getDpho(Request $request)
    {
        $q = trim($request->query('q', ''));
        $start = (int) $request->query('start', 0);
        $limit = (int) $request->query('limit', 25);

        // Default keyword untuk empty string: '-' (sebagian katalog PCare menggunakan '-')
        $keyword = $q === '' ? '-' : $q;
        $endpoint = 'obat/dpho/' . urlencode($keyword) . '/' . $start . '/' . $limit;
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
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

        if (!in_array($kdTkp, ['10', '20', '50'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter kdTkp harus 10 (RJTP), 20 (RITP), atau 50 (Promotif)',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'tindakan/kdTkp/' . urlencode($kdTkp) . '/' . $start . '/' . $limit;
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
    }

    /**
     * Referensi Provider Rayonisasi (PCare REST).
     * Endpoint PCare: GET /provider/{start}/{limit}
     */
    public function getProvider(Request $request)
    {
        $start = (int) $request->query('start', 0);
        $limit = (int) $request->query('limit', 25);
        $endpoint = 'provider/' . $start . '/' . $limit;
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

        $endpoint = 'spesialis/' . urlencode($kd) . '/subspesialis';
        $result = $this->pcareRequest('GET', $endpoint);

        $response = $result['response'];
        $processed = $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);

        return response()->json($processed, $response->status());
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
        if (!in_array($jenis, $allowed, true)) {
            return response()->json([
                'metaData' => ['message' => 'Parameter jenis harus salah satu dari 01 (Makanan), 02 (Udara), 03 (Obat)', 'code' => 422],
            ], 422);
        }

        $endpoint = 'alergi/jenis/' . urlencode($jenis);
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
     * Referensi Status Pulang (PCare REST).
     * Endpoint PCare: GET /statuspulang/rawatInap/{true|false}
     * Query param: rawatInap (boolean-like string: "true"/"false" or 1/0)
     */
    public function getStatusPulang(Request $request)
    {
        // Ambil parameter rawatInap; default false
        $raw = strtolower((string) $request->query('rawatInap', 'false'));
        $isInap = in_array($raw, ['true', '1', 'yes', 'y'], true);

        $endpoint = 'statuspulang/rawatInap/' . ($isInap ? 'true' : 'false');
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
            $tgl = $d . '-' . $m . '-' . $y;
        }

        $endpoint = 'spesialis/rujuk/subspesialis/' . urlencode($kdSubSpesialis) . '/sarana/' . urlencode($kdSarana) . '/tglEstRujuk/' . urlencode($tgl);
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

        $result = $this->pcareRequest('GET', 'peserta/nik/' . urlencode($nik));

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

        if (!in_array($normalized, ['01', '02'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Parameter kdProgram harus 01 (Diabetes Melitus) atau 02 (Hipertensi)',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/club/' . urlencode($normalized);
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
            $tgl = $d . '-' . $m . '-' . $y;
        }

        // Validasi sederhana pola dd-mm-yyyy
        if (!preg_match('/^\d{2}-\d{2}-\d{4}$/', $tgl)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Format tanggal tidak valid. Gunakan dd-mm-yyyy atau yyyy-mm-dd',
                    'code' => 422,
                ],
            ], 422);
        }

        $endpoint = 'kelompok/kegiatan/' . urlencode($tgl);
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
            $tglPelayanan = $d . '-' . $m . '-' . $y;
        }
        if (!preg_match('/^\d{2}-\d{2}-\d{4}$/', $tglPelayanan)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Format tglPelayanan harus dd-mm-yyyy atau yyyy-mm-dd',
                    'code' => 422,
                ],
            ], 422);
        }

        // Validasi kode kelompok dan kegiatan
        if (!in_array($kdKelompok, ['01', '02'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'kdKelompok harus 01 (Diabetes Melitus) atau 02 (Hipertensi)',
                    'code' => 422,
                ],
            ], 422);
        }
        if (!in_array($kdKegiatan, ['01', '10', '11'], true)) {
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
            $tglPelayanan = $d . '-' . $m . '-' . $y;
        }
        if (!preg_match('/^\d{2}-\d{2}-\d{4}$/', $tglPelayanan)) {
            return response()->json([
                'metaData' => [
                    'message' => 'Format tglPelayanan harus dd-mm-yyyy atau yyyy-mm-dd',
                    'code' => 422,
                ],
            ], 422);
        }

        if (!in_array($kdKelompok, ['01', '02'], true)) {
            return response()->json([
                'metaData' => [
                    'message' => 'kdKelompok harus 01 (Diabetes Melitus) atau 02 (Hipertensi)',
                    'code' => 422,
                ],
            ], 422);
        }
        if (!in_array($kdKegiatan, ['01', '10', '11'], true)) {
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

        $endpoint = 'kelompok/kegiatan/' . urlencode($eduId);
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

        $endpoint = 'kelompok/peserta/' . urlencode($eduId);
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

        $endpoint = 'kelompok/peserta/' . urlencode($eduId) . '/' . urlencode($noKartu);
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
            $like = '%' . $q . '%';
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
            $like = '%' . $q . '%';
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
            $like = '%' . $q . '%';
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
                    'message' => 'Gagal menyimpan mapping: ' . $e->getMessage(),
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
                    'message' => 'Gagal menghapus mapping: ' . $e->getMessage(),
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
                    'message' => 'Gagal menyimpan mapping: ' . $e->getMessage(),
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
                    'message' => 'Gagal menghapus mapping: ' . $e->getMessage(),
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
                    'message' => 'Gagal menyimpan mapping: ' . $e->getMessage(),
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
                    'message' => 'Gagal menghapus mapping: ' . $e->getMessage(),
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
