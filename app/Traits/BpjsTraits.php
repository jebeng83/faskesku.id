<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

/**
 * Utilities for BPJS PCare bridging: header generation, HTTP request helper,
 * and optional decrypt + decompress helpers per official catalog.
 */
trait BpjsTraits
{
    /**
     * Load PCare configuration from env/config.
     */
    protected function pcareConfig(): array
    {
        // Ambil satu baris konfigurasi dari tabel setting_bridging_bpjs
        $row = DB::table('setting_bridging_bpjs')->first();
    
        return [
            'base_url' => env('BPJS_PCARE_BASE_URL'),
            'cons_id' => $row?->cons_id_pcare ?? env('BPJS_PCARE_CONS_ID'),
            'cons_pwd' => $row?->secretkey_pcare ?? env('BPJS_PCARE_CONS_PWD'),
            'user_key' => $row?->userkey_pcare ?? env('BPJS_PCARE_USER_KEY'),
            'user' => $row?->user_pcare ?? env('BPJS_PCARE_USER'),
            'pass' => $row?->pass_pcare ?? env('BPJS_PCARE_PASS'),
            'kode_ppk' => env('BPJS_PCARE_KODE_PPK'),
            'app_code' => env('BPJS_PCARE_APP_CODE', '095'),
        ];
    }

    /**
     * Generate unix-based timestamp (UTC) in seconds (as string).
     */
    protected function generateTimestamp(): string
    {
        return (string) time();
    }

    /**
     * Generate base64(HMAC-SHA256(consId & timestamp, secretKey)).
     */
    protected function generateSignature(string $consId, string $secretKey, string $timestamp): string
    {
        $data = $consId . '&' . $timestamp;
        $raw = hash_hmac('sha256', $data, $secretKey, true);
        return base64_encode($raw);
    }

    /**
     * Generate Base64(username:password:kdAplikasi).
     */
    protected function generateAuthorization(string $user, string $pass, string $appCode): string
    {
        $plain = $user . ':' . $pass . ':' . $appCode;
        return base64_encode($plain);
    }

    /**
     * Build HTTP headers required by BPJS PCare.
     */
    protected function buildPcareHeaders(?string $overrideTimestamp = null): array
    {
        $cfg = $this->pcareConfig();
        $timestamp = $overrideTimestamp ?: $this->generateTimestamp();
        $signature = $this->generateSignature($cfg['cons_id'], $cfg['cons_pwd'], $timestamp);
        $authorization = $this->generateAuthorization($cfg['user'], $cfg['pass'], $cfg['app_code']);

        return [
            'X-cons-id' => $cfg['cons_id'],
            'X-timestamp' => $timestamp,
            'X-signature' => $signature,
            // PCare expects "Basic <base64(username:password:kdAplikasi)>"
            'X-authorization' => 'Basic ' . $authorization,
            'user_key' => $cfg['user_key'],
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
    }

    /**
     * Generic HTTP request to PCare REST API.
     */
    protected function pcareRequest(
        string $method,
        string $endpoint,
        array $query = [],
        array|string|null $body = null,
        array $extraHeaders = [],
        ?string $overrideTimestamp = null
    ): array {
        $cfg = $this->pcareConfig();
        $headers = array_merge($this->buildPcareHeaders($overrideTimestamp), $extraHeaders);
        $url = rtrim($cfg['base_url'], '/') . '/' . ltrim($endpoint, '/');

        $request = Http::withHeaders($headers);

        if (!empty($query)) {
            $request = $request->withOptions(['query' => $query]);
        }

        switch (strtoupper($method)) {
            case 'GET':
                $response = $request->get($url);
                break;
            case 'POST':
                $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                $response = $request->post($url, $payload);
                break;
            case 'PUT':
                $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                $response = $request->put($url, $payload);
                break;
            case 'DELETE':
                $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                $response = $request->delete($url, $payload);
                break;
            default:
                throw new \InvalidArgumentException("Unsupported HTTP method: {$method}");
        }

        return [
            'response' => $response,
            'headers_used' => $headers,
            'timestamp_used' => $headers['X-timestamp'],
            'url' => $url,
        ];
    }

    /**
     * AES-256-CBC decrypt helper used by BPJS catalogs (PCare/VClaim) if response encrypted.
     */
    protected function stringDecrypt(string $key, string $encrypted): string
    {
        $encryptMethod = 'AES-256-CBC';
        $keyHash = hex2bin(hash('sha256', $key));
        $iv = substr(hex2bin(hash('sha256', $key)), 0, 16);
        return openssl_decrypt(base64_decode($encrypted), $encryptMethod, $keyHash, OPENSSL_RAW_DATA, $iv) ?: '';
    }

    /**
     * LZ-String decompress helper; requires nullpunkt/lz-string-php if installed.
     */
    protected function decompressLzString(string $string): string
    {
        // Use dynamic call to avoid static reference when library isn't installed.
        if (class_exists('LZCompressor\\LZString')) {
            try {
                return \call_user_func(['LZCompressor\\LZString', 'decompressFromEncodedURIComponent'], $string);
            } catch (\Throwable $e) {
                return $string;
            }
        }
        return $string; // fallback when library is not installed
    }

    /**
     * Try decrypt + decompress PCare response body if needed, then JSON-decode.
     * If wrapper JSON contains 'response' string, decode it and replace with parsed array/string.
     */
    protected function maybeDecryptAndDecompress(string $body, string $timestamp): array|string
    {
        // Attempt to parse JSON wrapper first
        $wrapper = json_decode($body, true);
        if (is_array($wrapper) && array_key_exists('response', $wrapper) && is_string($wrapper['response'])) {
            $cfg = $this->pcareConfig();
            $key = $cfg['cons_id'] . $cfg['cons_pwd'] . $timestamp;
            $decrypted = $this->stringDecrypt($key, $wrapper['response']);
            // Try LZString decompress (some catalogs compress after decrypt)
            $decompressed = $this->decompressLzString($decrypted ?: $wrapper['response']);
            $decodedResponse = json_decode($decompressed, true);

            // Replace 'response' with decoded array/string for UI convenience
            $wrapper['response'] = $decodedResponse ?? $decompressed;
            return $wrapper;
        }

        // Fallback: try decrypting the whole body (legacy behavior)
        $cfg = $this->pcareConfig();
        $key = $cfg['cons_id'] . $cfg['cons_pwd'] . $timestamp;
        $decrypted = $this->stringDecrypt($key, $body);
        $result = $this->decompressLzString($decrypted ?: $body);
        $decoded = json_decode($result, true);
        return $decoded ?? $result;
    }
}