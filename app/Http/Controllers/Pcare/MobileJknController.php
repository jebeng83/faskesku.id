<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use App\Traits\BpjsTraits;
use Illuminate\Http\Request;
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