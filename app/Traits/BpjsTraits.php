<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
        // Fallback tambahan: beberapa instalasi menyimpan kode_ppk pada tabel 'setting'
        $setting = DB::table('setting')->first();

        return [
            // Gunakan config() agar nilai dari .env tetap tersedia saat config di-cache
            'base_url' => config('bpjs.pcare.base_url'),
            'cons_id' => $row?->cons_id_pcare ?? config('bpjs.pcare.cons_id'),
            'cons_pwd' => $row?->secretkey_pcare ?? config('bpjs.pcare.cons_pwd'),
            // Wajib ambil dari DB sesuai instruksi: setting_bridging_bpjs.userkey_pcare
            // Tanpa fallback ke env untuk mencegah ketidaksesuaian konfigurasi saat runtime
            'user_key' => (string) ($row?->userkey_pcare ?? ''),
            'user' => $row?->user_pcare ?? config('bpjs.pcare.user'),
            'pass' => $row?->pass_pcare ?? config('bpjs.pcare.pass'),
            // kode_ppk diutamakan dari config; jika null, fallback ke tabel 'setting'
            'kode_ppk' => config('bpjs.pcare.kode_ppk') ?: ($setting->kode_ppk ?? null),
            'app_code' => config('bpjs.pcare.app_code'),
        ];
    }

    /**
     * Load Mobile JKN configuration from database table and env.
     * Sumber data:
     * - Tabel: setting_briding_mobilejkn
     * - Env: BPJS_MOBILEJKN_BASE_URL, BPJS_PCARE_KODE_PPK, BPJS_PCARE_APP_CODE
     */
    protected function mobilejknConfig(): array
    {
        // Ambil satu baris konfigurasi dari tabel setting_briding_mobilejkn
        $row = DB::table('setting_briding_mobilejkn')->first();

        return [
            // Base URLs dari DB (tanpa fallback env sesuai instruksi)
            'base_url' => (string) ($row?->base_url_mobilejkn ?? ''),
            'base_url_v1' => (string) ($row?->base_url_v1 ?? ''),
            'base_url_v2' => (string) ($row?->base_url_v2 ?? ''),
            // Kredensial utama Mobile JKN dari DB
            'cons_id' => $row?->cons_id_mobilejkn ?? '',
            'cons_pwd' => $row?->secretkey_mobilejkn ?? '',
            'user_key' => $row?->userkey_mobilejkn ?? '',
            'user' => $row?->user_mobilejkn ?? '',
            'pass' => $row?->pass_mobilejkn ?? '',
            // Kredensial Antrol (opsional) dari DB
            'username_antrol' => $row?->username_antrol ?? '',
            'password_antrol' => $row?->password_antrol ?? '',
            // Gunakan config yang dicache agar aman untuk Octane
            'kode_ppk' => config('bpjs.pcare.kode_ppk'),
            'app_code' => config('bpjs.pcare.app_code'),
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
        $data = $consId.'&'.$timestamp;
        $raw = hash_hmac('sha256', $data, $secretKey, true);

        return base64_encode($raw);
    }

    /**
     * Generate Base64(username:password:kdAplikasi).
     */
    protected function generateAuthorization(string $user, string $pass, string $appCode): string
    {
        $plain = $user.':'.$pass.':'.$appCode;

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
            // PCare REST mensyaratkan header X-authorization dengan prefix "Basic "
            // dan nilai Base64(username:password:kdAplikasi)
            'X-authorization' => 'Basic '.$authorization,
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
        $start = microtime(true);
        $logId = uniqid('pcare_', true);
        $cfg = $this->pcareConfig();
        $headers = array_merge($this->buildPcareHeaders($overrideTimestamp), $extraHeaders);
        // Pastikan base_url bertipe string untuk mencegah TypeError ketika env tidak di-set
        $baseUrl = rtrim((string) ($cfg['base_url'] ?? ''), '/');
        if ($baseUrl === '') {
            throw new \InvalidArgumentException('Base URL PCare belum dikonfigurasi. Set BPJS_PCARE_BASE_URL di .env untuk server ini.');
        }
        $url = $baseUrl.'/'.ltrim($endpoint, '/');

        // Sanitasi header sebelum logging (hindari kredensial sensitif)
        $sanitizedHeaders = [
            'X-cons-id' => (string) ($headers['X-cons-id'] ?? ''),
            'X-timestamp' => (string) ($headers['X-timestamp'] ?? ''),
            // signature, authorization, user_key sengaja tidak dicatat
            'Accept' => (string) ($headers['Accept'] ?? ''),
            'Content-Type' => (string) ($headers['Content-Type'] ?? ''),
        ];

        // Preview body untuk membantu debugging tanpa membebani log
        $bodyPreview = null;
        if (is_array($body)) {
            $bodyPreview = json_encode($body);
            $bodyPreview = $bodyPreview !== false ? substr($bodyPreview, 0, 1000) : null;
        } elseif (is_string($body)) {
            $bodyPreview = substr($body, 0, 1000);
        }

        Log::channel('bpjs')->debug('PCare request', [
            'id' => $logId,
            'method' => strtoupper($method),
            'url' => $url,
            'endpoint' => $endpoint,
            'query' => $query,
            'headers' => $sanitizedHeaders,
            'body_preview' => $bodyPreview,
        ]);

        // Build HTTP client dengan opsi koneksi yang lebih tahan gangguan
        // Tambahkan timeout dan opsi DNS fallback via CURLOPT_RESOLVE (bila di-set di .env)
        $baseHttpOptions = [];
        // Query params
        if (! empty($query)) {
            $baseHttpOptions['query'] = $query;
        }
        // Timeouts (gunakan config agar aman saat config:cache)
        $connectTimeout = (int) config('bpjs.http.connect_timeout', 10);
        $timeout = (int) config('bpjs.http.timeout', 30);
        $baseHttpOptions['connect_timeout'] = $connectTimeout;
        $baseHttpOptions['timeout'] = $timeout;
        // Prefer IPv4 untuk menghindari masalah koneksi IPv6 di jaringan lokal
        $baseCurlOptions = [];
        if (defined('CURL_IPRESOLVE_V4')) {
            $baseCurlOptions[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
        }
        // Paksa HTTP/1.1 untuk kestabilan handshake di beberapa lingkungan
        if (defined('CURL_HTTP_VERSION_1_1')) {
            $baseCurlOptions[CURLOPT_HTTP_VERSION] = CURL_HTTP_VERSION_1_1;
        }
        // Hindari masalah sinyal pada timeout di lingkungan tertentu (macOS/Linux)
        if (defined('CURLOPT_NOSIGNAL')) {
            $baseCurlOptions[CURLOPT_NOSIGNAL] = true;
        }
        // Paksa TLS v1.2 sesuai rekomendasi BPJS
        if (defined('CURL_SSLVERSION_TLSv1_2')) {
            $baseCurlOptions[CURLOPT_SSLVERSION] = CURL_SSLVERSION_TLSv1_2;
        }
        // Opsi untuk mematikan verifikasi SSL saat troubleshooting (JANGAN aktifkan di produksi)
        $disableSslVerify = filter_var(config('bpjs.http.disable_ssl_verify', false), FILTER_VALIDATE_BOOLEAN);
        if ($disableSslVerify) {
            $baseCurlOptions[CURLOPT_SSL_VERIFYPEER] = false;
            $baseCurlOptions[CURLOPT_SSL_VERIFYHOST] = 0;
            Log::channel('bpjs')->warning('PCare SSL verification DISABLED via env BPJS_HTTP_DISABLE_SSL_VERIFY');
        }
        // Fallback DNS: list multi-IP untuk auto-switch
        $resolveListEnv = (string) config('bpjs.http.force_resolve_list', '');
        $resolveList = array_values(array_filter(array_map('trim', explode(',', $resolveListEnv)), function ($v) {
            return $v !== '';
        }));
        // Fallback single resolve untuk kompatibilitas
        $forceResolve = config('bpjs.http.force_resolve');
        if (empty($resolveList) && ! empty($forceResolve)) {
            $resolveList = [$forceResolve];
        }

        // Retry sederhana untuk mengatasi kegagalan koneksi sementara (per attempt)
        $retryTimes = (int) config('bpjs.http.retry_times', 2);
        $retrySleep = (int) config('bpjs.http.retry_sleep', 500);

        $response = null;
        $attempt = 0;
        $lastException = null;
        $attemptResolveUsed = null;

        // Jika ada daftar IP fallback, coba satu per satu hingga sukses
        $attemptsPool = ! empty($resolveList) ? $resolveList : [null];
        foreach ($attemptsPool as $resolveEntry) {
            $attempt++;
            $httpOptions = $baseHttpOptions;
            $curlOptions = $baseCurlOptions;
            if (! empty($resolveEntry)) {
                $curlOptions[CURLOPT_RESOLVE] = [$resolveEntry];
                Log::channel('bpjs')->warning('PCare attempt using CURLOPT_RESOLVE', [
                    'attempt' => $attempt,
                    'resolve' => $resolveEntry,
                ]);
                $attemptResolveUsed = $resolveEntry;
            } else {
                $attemptResolveUsed = null;
            }
            if (! empty($curlOptions)) {
                $httpOptions['curl'] = $curlOptions;
            }

            $request = Http::withHeaders($headers)->withOptions($httpOptions);
            if ($retryTimes > 0) {
                $request = $request->retry($retryTimes, $retrySleep);
            }

            try {
                switch (strtoupper($method)) {
                    case 'GET':
                        $response = $request->get($url);
                        break;
                    case 'POST':
                        if (isset($headers['Content-Type']) && strtolower($headers['Content-Type']) === 'text/plain') {
                            $json = is_string($body) ? $body : json_encode(is_array($body) ? $body : []);
                            $response = $request->withBody($json, 'text/plain')->post($url);
                        } else {
                            $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                            $response = $request->post($url, $payload);
                        }
                        break;
                    case 'PUT':
                        if (isset($headers['Content-Type']) && strtolower($headers['Content-Type']) === 'text/plain') {
                            $json = is_string($body) ? $body : json_encode(is_array($body) ? $body : []);
                            $response = $request->withBody($json, 'text/plain')->put($url);
                        } else {
                            $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                            $response = $request->put($url, $payload);
                        }
                        break;
                    case 'DELETE':
                        $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                        $response = $request->delete($url, $payload);
                        break;
                    default:
                        throw new \InvalidArgumentException("Unsupported HTTP method: {$method}");
                }

                // Jika berhasil (tidak melempar ConnectionException), hentikan loop
                if ($response) {
                    break;
                }
            } catch (\Throwable $e) {
                $lastException = $e;
                Log::channel('bpjs')->error('PCare attempt failed', [
                    'attempt' => $attempt,
                    'resolve' => $attemptResolveUsed,
                    'error' => $e->getMessage(),
                ]);
                // Lanjut ke IP berikutnya jika ada
                $response = null;

                continue;
            }
        }

        // Jika semua percobaan gagal, lempar exception terakhir
        if (! $response && $lastException) {
            throw $lastException;
        }

        // Pada titik ini, $response harus sudah di-set dari percobaan di atas.
        // Jangan jalankan kembali request agar tidak mengulang error yang sama.

        $durationMs = (int) round((microtime(true) - $start) * 1000);
        $rawBody = $response->body();
        Log::channel('bpjs')->debug('PCare response', [
            'id' => $logId,
            'status' => $response->status(),
            'successful' => $response->successful(),
            'duration_ms' => $durationMs,
            'url' => $url,
            'timestamp_used' => $headers['X-timestamp'] ?? null,
            'body_excerpt' => substr($rawBody ?? '', 0, 1000),
        ]);

        return [
            'response' => $response,
            'headers_used' => $headers,
            'timestamp_used' => $headers['X-timestamp'],
            'url' => $url,
        ];
    }

    /**
     * Build HTTP headers required by BPJS Mobile JKN.
     * Mobile JKN typically uses the same signature scheme but without X-authorization.
     */
    protected function buildMobileJknHeaders(?string $overrideTimestamp = null): array
    {
        $cfg = $this->mobilejknConfig();
        $missing = [];
        foreach (['cons_id', 'cons_pwd', 'user_key'] as $key) {
            if (empty($cfg[$key])) {
                $missing[] = $key;
            }
        }
        if (! empty($missing)) {
            throw new \InvalidArgumentException('Missing MobileJKN config: '.implode(', ', $missing));
        }
        $timestamp = $overrideTimestamp ?: $this->generateTimestamp();
        $signature = $this->generateSignature($cfg['cons_id'], $cfg['cons_pwd'], $timestamp);

        return [
            'X-cons-id' => $cfg['cons_id'],
            'X-timestamp' => $timestamp,
            'X-signature' => $signature,
            'user_key' => $cfg['user_key'],
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
    }

    /**
     * Generic HTTP request to Mobile JKN REST API.
     */
    protected function mobilejknRequest(
        string $method,
        string $endpoint,
        array $query = [],
        array|string|null $body = null,
        array $extraHeaders = [],
        ?string $overrideTimestamp = null
    ): array {
        $start = microtime(true);
        $logId = uniqid('mobilejkn_', true);
        $cfg = $this->mobilejknConfig();
        if (empty($cfg['base_url'])) {
            throw new \InvalidArgumentException('Base URL Mobile JKN belum dikonfigurasi di database (kolom base_url_mobilejkn).');
        }
        $headers = array_merge($this->buildMobileJknHeaders($overrideTimestamp), $extraHeaders);
        $url = rtrim($cfg['base_url'], '/').'/'.ltrim($endpoint, '/');

        $sanitizedHeaders = [
            'X-cons-id' => (string) ($headers['X-cons-id'] ?? ''),
            'X-timestamp' => (string) ($headers['X-timestamp'] ?? ''),
            'Accept' => (string) ($headers['Accept'] ?? ''),
            'Content-Type' => (string) ($headers['Content-Type'] ?? ''),
        ];

        $bodyPreview = null;
        if (is_array($body)) {
            $bodyPreview = json_encode($body);
            $bodyPreview = $bodyPreview !== false ? substr($bodyPreview, 0, 1000) : null;
        } elseif (is_string($body)) {
            $bodyPreview = substr($body, 0, 1000);
        }

        Log::channel('bpjs')->debug('MobileJKN request', [
            'id' => $logId,
            'method' => strtoupper($method),
            'url' => $url,
            'endpoint' => $endpoint,
            'query' => $query,
            'headers' => $sanitizedHeaders,
            'body_preview' => $bodyPreview,
        ]);

        // Build HTTP client with optional timeouts and DNS fallback
        $httpOptions = [];
        // Query params
        if (! empty($query)) {
            $httpOptions['query'] = $query;
        }
        // Timeouts (gunakan config agar aman saat config:cache)
        $connectTimeout = (int) config('bpjs.http.connect_timeout', 10);
        $timeout = (int) config('bpjs.http.timeout', 30);
        $httpOptions['connect_timeout'] = $connectTimeout;
        $httpOptions['timeout'] = $timeout;
        // Optional forced DNS resolve to mitigate local DNS issues
        $forceResolve = config('bpjs.mobilejkn.force_resolve');
        if (! empty($forceResolve)) {
            // Example value: apijkn.bpjs-kesehatan.go.id:443:118.97.79.198
            $httpOptions['curl'] = [CURLOPT_RESOLVE => [$forceResolve]];
            Log::channel('bpjs')->warning('MobileJKN using CURLOPT_RESOLVE fallback', [
                'resolve' => $forceResolve,
            ]);
        }
        $request = Http::withHeaders($headers)->withOptions($httpOptions);

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

        $durationMs = (int) round((microtime(true) - $start) * 1000);
        $rawBody = $response->body();
        Log::channel('bpjs')->debug('MobileJKN response', [
            'id' => $logId,
            'status' => $response->status(),
            'successful' => $response->successful(),
            'duration_ms' => $durationMs,
            'url' => $url,
            'timestamp_used' => $headers['X-timestamp'] ?? null,
            'body_excerpt' => substr($rawBody ?? '', 0, 1000),
        ]);

        return [
            'response' => $response,
            'headers_used' => $headers,
            'timestamp_used' => $headers['X-timestamp'],
            'url' => $url,
        ];
    }

    protected function icareConfig(): array
    {
        $rowMobilejkn = DB::table('setting_briding_mobilejkn')->first();
        $rowBpjs = DB::table('setting_bridging_bpjs')->first();

        return [
            'base_url' => config('bpjs.icare.base_url'),
            'cons_id' => $rowMobilejkn?->cons_id_mobilejkn ?? config('bpjs.pcare.cons_id'),
            'cons_pwd' => $rowMobilejkn?->secretkey_mobilejkn ?? config('bpjs.pcare.cons_pwd'),
            // User key untuk Icare diambil dari setting_bridging_bpjs.userkey_pcare sesuai instruksi
            'user_key' => (string) ($rowBpjs?->userkey_pcare ?? config('bpjs.pcare.user_key')),
            'user' => $rowMobilejkn?->user_mobilejkn ?? config('bpjs.pcare.user'),
            'pass' => $rowMobilejkn?->pass_mobilejkn ?? config('bpjs.pcare.pass'),
            'app_code' => config('bpjs.pcare.app_code'),
        ];
    }

    protected function buildIcareHeaders(?string $overrideTimestamp = null): array
    {
        $cfg = $this->icareConfig();
        $timestamp = $overrideTimestamp ?: $this->generateTimestamp();
        $signature = $this->generateSignature($cfg['cons_id'], $cfg['cons_pwd'], $timestamp);
        $authorization = $this->generateAuthorization($cfg['user'], $cfg['pass'], $cfg['app_code']);

        return [
            'X-cons-id' => $cfg['cons_id'],
            'X-timestamp' => $timestamp,
            'X-signature' => $signature,
            'X-authorization' => 'Basic '.$authorization,
            'user_key' => $cfg['user_key'],
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ];
    }

    protected function icareRequest(
        string $method,
        string $endpoint,
        array $query = [],
        array|string|null $body = null,
        array $extraHeaders = [],
        ?string $overrideTimestamp = null
    ): array {
        $start = microtime(true);
        $logId = uniqid('icare_', true);
        $cfg = $this->icareConfig();
        $headers = array_merge($this->buildIcareHeaders($overrideTimestamp), $extraHeaders);
        if (strtoupper($method) === 'POST' && (str_ends_with($endpoint, 'validate') || str_contains($endpoint, 'validate'))) {
            $headers['Content-Type'] = 'application/json';
        }
        $baseUrl = rtrim((string) ($cfg['base_url'] ?? ''), '/');
        if ($baseUrl === '') {
            throw new \InvalidArgumentException('Base URL Icare belum dikonfigurasi. Set BPJS_ICARE_BASE_URL di .env untuk server ini.');
        }
        $candidateBaseUrls = [$baseUrl];

        $sanitizedHeaders = [
            'X-cons-id' => (string) ($headers['X-cons-id'] ?? ''),
            'X-timestamp' => (string) ($headers['X-timestamp'] ?? ''),
            'Accept' => (string) ($headers['Accept'] ?? ''),
            'Content-Type' => (string) ($headers['Content-Type'] ?? ''),
        ];

        $bodyPreview = null;
        if (is_array($body)) {
            $bodyPreview = json_encode($body);
            $bodyPreview = $bodyPreview !== false ? substr($bodyPreview, 0, 1000) : null;
        } elseif (is_string($body)) {
            $bodyPreview = substr($body, 0, 1000);
        }

        $baseHttpOptions = [];
        if (! empty($query)) {
            $baseHttpOptions['query'] = $query;
        }
        $connectTimeout = (int) config('bpjs.http.connect_timeout', 10);
        $timeout = (int) config('bpjs.http.timeout', 30);
        $baseHttpOptions['connect_timeout'] = $connectTimeout;
        $baseHttpOptions['timeout'] = $timeout;
        $baseCurlOptions = [];
        if (defined('CURL_IPRESOLVE_V4')) {
            $baseCurlOptions[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
        }
        if (defined('CURL_HTTP_VERSION_1_1')) {
            $baseCurlOptions[CURLOPT_HTTP_VERSION] = CURL_HTTP_VERSION_1_1;
        }
        if (defined('CURLOPT_NOSIGNAL')) {
            $baseCurlOptions[CURLOPT_NOSIGNAL] = true;
        }
        if (defined('CURL_SSLVERSION_TLSv1_2')) {
            $baseCurlOptions[CURLOPT_SSLVERSION] = CURL_SSLVERSION_TLSv1_2;
        }
        $disableSslVerify = filter_var(config('bpjs.http.disable_ssl_verify', false), FILTER_VALIDATE_BOOLEAN);
        if ($disableSslVerify) {
            $baseCurlOptions[CURLOPT_SSL_VERIFYPEER] = false;
            $baseCurlOptions[CURLOPT_SSL_VERIFYHOST] = 0;
            Log::channel('bpjs')->warning('Icare SSL verification DISABLED via env BPJS_HTTP_DISABLE_SSL_VERIFY');
        }
        $resolveList = [];
        $forceResolve = null;

        $retryTimes = (int) config('bpjs.http.retry_times', 2);
        $retrySleep = (int) config('bpjs.http.retry_sleep', 500);

        $response = null;
        $attempt = 0;
        $lastException = null;
        $attemptResolveUsed = null;
        $finalUrl = null;

        $attemptsPool = [null];
        foreach ($candidateBaseUrls as $candidate) {
            $url = rtrim($candidate, '/').'/'.ltrim($endpoint, '/');
            foreach ($attemptsPool as $resolveEntry) {
                $attempt++;
                $httpOptions = $baseHttpOptions;
                $curlOptions = $baseCurlOptions;
                $attemptResolveUsed = null;
                if (! empty($curlOptions)) {
                    $httpOptions['curl'] = $curlOptions;
                }

                Log::channel('bpjs')->debug('Icare request', [
                    'id' => $logId,
                    'method' => strtoupper($method),
                    'url' => $url,
                    'endpoint' => $endpoint,
                    'query' => $query,
                    'headers' => $sanitizedHeaders,
                    'body_preview' => $bodyPreview,
                ]);

                $request = Http::withHeaders($headers)->withOptions($httpOptions);
                if ($retryTimes > 0) {
                    $request = $request->retry($retryTimes, $retrySleep);
                }

                try {
                    switch (strtoupper($method)) {
                        case 'GET':
                            $response = $request->get($url);
                            break;
                        case 'POST':
                            if (isset($headers['Content-Type']) && strtolower($headers['Content-Type']) === 'text/plain') {
                                $json = is_string($body) ? $body : json_encode(is_array($body) ? $body : []);
                                $response = $request->withBody($json, 'text/plain')->post($url);
                            } else {
                                $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                                $response = $request->post($url, $payload);
                            }
                            break;
                        case 'PUT':
                            if (isset($headers['Content-Type']) && strtolower($headers['Content-Type']) === 'text/plain') {
                                $json = is_string($body) ? $body : json_encode(is_array($body) ? $body : []);
                                $response = $request->withBody($json, 'text/plain')->put($url);
                            } else {
                                $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                                $response = $request->put($url, $payload);
                            }
                            break;
                        case 'DELETE':
                            $payload = is_array($body) ? $body : (is_string($body) ? json_decode($body, true) : []);
                            $response = $request->delete($url, $payload);
                            break;
                        default:
                            throw new \InvalidArgumentException("Unsupported HTTP method: {$method}");
                    }

                    if ($response) {
                        $finalUrl = $url;
                        if ($response->status() === 503) {
                            $response = null;

                            continue;
                        }
                        break;
                    }
                } catch (\Throwable $e) {
                    $lastException = $e;
                    Log::channel('bpjs')->error('Icare attempt failed', [
                        'attempt' => $attempt,
                        'resolve' => $attemptResolveUsed,
                        'error' => $e->getMessage(),
                    ]);
                    $response = null;

                    continue;
                }
            }
            if ($response) {
                break;
            }
        }

        if (! $response && $lastException) {
            throw $lastException;
        }

        $durationMs = (int) round((microtime(true) - $start) * 1000);
        $rawBody = $response->body();
        Log::channel('bpjs')->debug('Icare response', [
            'id' => $logId,
            'status' => $response->status(),
            'successful' => $response->successful(),
            'duration_ms' => $durationMs,
            'url' => $finalUrl,
            'timestamp_used' => $headers['X-timestamp'] ?? null,
            'body_excerpt' => substr($rawBody ?? '', 0, 1000),
        ]);

        return [
            'response' => $response,
            'headers_used' => $headers,
            'timestamp_used' => $headers['X-timestamp'],
            'url' => $finalUrl,
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
            $key = $cfg['cons_id'].$cfg['cons_pwd'].$timestamp;
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
        $key = $cfg['cons_id'].$cfg['cons_pwd'].$timestamp;
        $decrypted = $this->stringDecrypt($key, $body);
        $result = $this->decompressLzString($decrypted ?: $body);
        $decoded = json_decode($result, true);

        return $decoded ?? $result;
    }

    protected function maybeDecryptAndDecompressIcare(string $body, string $timestamp): array|string
    {
        $wrapper = json_decode($body, true);
        if (is_array($wrapper) && array_key_exists('response', $wrapper) && is_string($wrapper['response'])) {
            $cfg = $this->icareConfig();
            $key = $cfg['cons_id'].$cfg['cons_pwd'].$timestamp;
            $decrypted = $this->stringDecrypt($key, $wrapper['response']);
            $decompressed = $this->decompressLzString($decrypted ?: $wrapper['response']);
            $decodedResponse = json_decode($decompressed, true);
            $wrapper['response'] = $decodedResponse ?? $decompressed;

            return $wrapper;
        }

        $cfg = $this->icareConfig();
        $key = $cfg['cons_id'].$cfg['cons_pwd'].$timestamp;
        $decrypted = $this->stringDecrypt($key, $body);
        $result = $this->decompressLzString($decrypted ?: $body);
        $decoded = json_decode($result, true);

        return $decoded ?? $result;
    }

    /**
     * Try decrypt + decompress Mobile JKN response body if needed, then JSON-decode.
     */
    protected function maybeDecryptAndDecompressMobileJkn(string $body, string $timestamp): array|string
    {
        $wrapper = json_decode($body, true);
        if (is_array($wrapper) && array_key_exists('response', $wrapper) && is_string($wrapper['response'])) {
            $cfg = $this->mobilejknConfig();
            $key = $cfg['cons_id'].$cfg['cons_pwd'].$timestamp;
            $decrypted = $this->stringDecrypt($key, $wrapper['response']);
            $decompressed = $this->decompressLzString($decrypted ?: $wrapper['response']);
            $decodedResponse = json_decode($decompressed, true);
            $wrapper['response'] = $decodedResponse ?? $decompressed;

            return $wrapper;
        }

        $cfg = $this->mobilejknConfig();
        $key = $cfg['cons_id'].$cfg['cons_pwd'].$timestamp;
        $decrypted = $this->stringDecrypt($key, $body);
        $result = $this->decompressLzString($decrypted ?: $body);
        $decoded = json_decode($result, true);

        return $decoded ?? $result;
    }
}
