<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\BpjsTraits;

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
}