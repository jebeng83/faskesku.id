<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Trait: SatuSehatTraits
 *
 * Tujuan:
 * - Mengelola otentikasi OAuth2 Client Credentials ke SATUSEHAT Platform
 * - Menyediakan helper request generic ke FHIR R4 API SATUSEHAT
 *
 * Referensi:
 * - HL7 FHIR: https://www.hl7.org/fhir/
 * - SATUSEHAT FHIR: https://satusehat.kemkes.go.id/platform/docs/id/fhir/
 * - Kode Akses API Production: https://satusehat.kemkes.go.id/platform/docs/id/api-code/access-production/
 */
trait SatuSehatTraits
{
    /**
     * Mendapatkan base URL Auth SATUSEHAT dari .env (tanpa trailing slash)
     */
    protected function satusehatAuthBase(): string
    {
        return rtrim(config('services.satusehat.auth') ?? '', '/');
    }

    /**
     * Mendapatkan base URL FHIR SATUSEHAT dari .env (tanpa trailing slash)
     */
    protected function satusehatFhirBase(): string
    {
        return rtrim(config('services.satusehat.fhir') ?? '', '/');
    }

    protected function satusehatEnv(): string
    {
        return strtoupper((string) (config('services.satusehat.env') ?? 'DEV'));
    }

    protected function satusehatClientId(): string
    {
        return (string) (config('services.satusehat.client_id') ?? '');
    }

    protected function satusehatClientSecret(): string
    {
        return (string) (config('services.satusehat.client_secret') ?? '');
    }

    /**
     * Mendapatkan Organization ID dari .env/config (bisa berupa UUID atau kode numeric).
     */
    protected function satusehatOrganizationId(): string
    {
        return (string) (config('services.satusehat.organization_id') ?? '');
    }

    /**
     * Menghasilkan reference FHIR untuk Organization jika tersedia.
     * Contoh: "Organization/5990777e-..." atau numeric jika sistem lokal memetakannya.
     */
    protected function satusehatOrganizationReference(): ?string
    {
        $orgId = $this->satusehatOrganizationId();

        return ! empty($orgId) ? ('Organization/'.$orgId) : null;
    }

    /**
     * Ambil token OAuth2 client_credentials dan cache berdasarkan environment.
     * Token disimpan dengan TTL = expires_in - 60 detik untuk buffer.
     */
    protected function satusehatToken(): ?string
    {
        $cacheKey = 'satusehat.token.'.$this->satusehatEnv();
        $cached = Cache::get($cacheKey);
        if (! empty($cached)) {
            return $cached;
        }

        $authBase = $this->satusehatAuthBase();
        if (empty($authBase)) {
            Log::error('[SATUSEHAT] SATUSEHAT_AUTH kosong di .env');

            return null;
        }
        // Coba berbagai endpoint token agar kompatibel
        $candidateUrls = [];
        
        // PRIORITAS 1: Sesuai dokumentasi terbaru (/accesstoken)
        $candidateUrls[] = rtrim($authBase, '/').'/accesstoken';
        
        // PRIORITAS 2: Fallback umum (/token)
        $candidateUrls[] = rtrim($authBase, '/').'/token';
        
        // PRIORITAS 3: Fix common path issues (v1/v2 mismatch)
        if (str_contains($authBase, '/v1')) {
             // Jika config v1, coba v2/token (kadang dipakai di dev)
             $candidateUrls[] = str_replace('/v1', '/v2', rtrim($authBase, '/')) . '/token';
        } elseif (str_contains($authBase, '/v2')) {
             // Jika config v2, coba v1/accesstoken (standar prod)
             $candidateUrls[] = str_replace('/v2', '/v1', rtrim($authBase, '/')) . '/accesstoken';
        }
        // Hilangkan duplikasi
        $candidateUrls = array_values(array_unique($candidateUrls));

        $clientId = $this->satusehatClientId();
        $clientSecret = $this->satusehatClientSecret();
        if (empty($clientId) || empty($clientSecret)) {
            Log::error('[SATUSEHAT] SATUSEHAT_CLIENT_ID atau SATUSEHAT_CLIENT_SECRET belum diisi.');

            return null;
        }

        try {
            $lastError = null;
            foreach ($candidateUrls as $tokenUrl) {
                // Sesuai Playbook SATUSEHAT: grant_type dikirim sebagai query param,
                // sedangkan client_id & client_secret di body form-encoded.
                $urlWithQuery = $tokenUrl.'?grant_type=client_credentials';
                $resp = Http::asForm()
                    ->timeout(5) // Timeout 5s
                    ->connectTimeout(3) // Connect timeout 3s
                    ->acceptJson()
                    ->post($urlWithQuery, [
                    'client_id' => $clientId,
                    'client_secret' => $clientSecret,
                ]);

                if ($resp->failed()) {
                    $lastError = [
                        'url' => $tokenUrl,
                        'status' => $resp->status(),
                        'body' => $resp->body(),
                    ];

                    continue; // coba endpoint berikutnya
                }

                $json = $resp->json();
                $accessToken = $json['access_token'] ?? null;
                $expiresIn = $json['expires_in'] ?? 0; // detik

                if (! $accessToken) {
                    $lastError = [
                        'url' => $tokenUrl,
                        'status' => $resp->status(),
                        'body' => $resp->body(),
                    ];

                    continue;
                }

                // TTL dinamis berdasarkan expires_in jika tersedia
                $ttlSeconds = is_numeric($expiresIn) && $expiresIn > 60 ? ($expiresIn - 60) : 1200; // default 20 menit
                Cache::put($cacheKey, $accessToken, $ttlSeconds);

                return $accessToken;
            }

            // Jika semua kandidat gagal
            if ($lastError) {
                Log::error('[SATUSEHAT] Gagal ambil token dari semua kandidat', $lastError);
            } else {
                Log::error('[SATUSEHAT] Gagal ambil token: tidak ada respons yang valid');
            }

            return null;
        } catch (\Throwable $e) {
            Log::error('[SATUSEHAT] Exception ambil token', [
                'message' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Header standar untuk SATUSEHAT FHIR API.
     */
    protected function satusehatHeaders(array $extra = []): array
    {
        return array_merge([
            'Accept' => 'application/fhir+json',
            'Content-Type' => 'application/fhir+json',
        ], $extra);
    }

    /**
     * Header khusus untuk PATCH request (JSON Patch format).
     */
    protected function satusehatPatchHeaders(array $extra = []): array
    {
        return array_merge([
            'Accept' => 'application/fhir+json',
            'Content-Type' => 'application/json-patch+json',
        ], $extra);
    }

    /**
     * Request generic ke FHIR API.
     *
     * @param  string  $method  HTTP method (GET|POST|PUT|PATCH|DELETE)
     * @param  string  $path  Relative path (mis. 'Patient', 'Patient/{id}', 'Encounter')
     * @param  array|null  $body  JSON body untuk POST/PUT/PATCH
     * @param  array  $options  Opsi tambahan: headers, query
     * @return array [ ok, status, json, body, error ]
     */
    protected function satusehatRequest(string $method, string $path, ?array $body = null, array $options = []): array
    {
        $fhirBase = $this->satusehatFhirBase();
        if (empty($fhirBase)) {
            return [
                'ok' => false,
                'status' => 0,
                'error' => 'SATUSEHAT_FHIR kosong di .env',
            ];
        }

        $token = $this->satusehatToken();
        if (! $token) {
            return [
                'ok' => false,
                'status' => 401,
                'error' => 'Tidak bisa mendapatkan token SATUSEHAT',
            ];
        }

        $url = $fhirBase.'/'.ltrim($path, '/');

        $headers = $this->satusehatHeaders($options['headers'] ?? []);
        $query = $options['query'] ?? [];
        $preferRepresentation = $options['prefer_representation'] ?? false;
        if ($preferRepresentation) {
            $headers['Prefer'] = 'return=representation';
        }

        try {
            $req = Http::withToken($token)
                ->withHeaders($headers)
                ->timeout(5) // Timeout 5 detik
                ->connectTimeout(3);
            
            if (! empty($query)) {
                $req = $req->withOptions(['query' => $query]);
            }

            // Kirim request
            if (in_array(strtoupper($method), ['POST', 'PUT', 'PATCH'])) {
                // Pastikan nilai numeric tetap sebagai number saat JSON encoding
                // Gunakan json_encode manual dengan flag untuk memastikan tipe number tetap number
                // JSON_PRESERVE_ZERO_FRACTION memastikan float tetap sebagai number, bukan string
                // CRITICAL: Laravel HTTP client dengan ['json' => $body] mungkin mengubah float menjadi string
                // Gunakan json_encode manual untuk kontrol penuh atas encoding
                $jsonBody = json_encode($body ?? [], JSON_UNESCAPED_SLASHES | JSON_PRESERVE_ZERO_FRACTION);
                // withBody() akan set Content-Type otomatis, tapi kita sudah set di headers
                $resp = $req->withBody($jsonBody, 'application/fhir+json')->send(strtoupper($method), $url);
            } else {
                $resp = $req->send(strtoupper($method), $url);
            }

            $status = $resp->status();
            $json = null;
            try {
                $json = $resp->json();
            } catch (\Throwable $e) {
                // Biarkan kosong jika bukan JSON
            }

            $ok = $resp->successful();

            // Auto-Logging ke satusehat_resources
            if ($ok && in_array(strtoupper($method), ['POST', 'PUT', 'PATCH']) && isset($json['resourceType'])) {
                try {
                    $resourceType = $json['resourceType'];
                    $satusehatId = $json['id'] ?? null;
                    $localId = 'UNKNOWN';
                    
                    // 1. Cek explicit local_id dari options
                    if (!empty($options['local_id'])) {
                        $localId = $options['local_id'];
                    } 
                    // 2. Cek ekstrak local_id dari identifier request body
                    elseif (!empty($body['identifier']) && is_array($body['identifier'])) {
                         foreach ($body['identifier'] as $id) {
                             if (isset($id['value'])) {
                                 $localId = $id['value'];
                                 break; 
                             }
                         }
                    } 
                    // 3. Atau dari response
                    elseif (!empty($json['identifier']) && is_array($json['identifier'])) {
                         foreach ($json['identifier'] as $id) {
                             if (isset($id['value'])) {
                                 $localId = $id['value'];
                                 break; 
                             }
                         }
                    }

                    // Insert ke tabel log
                    \Illuminate\Support\Facades\DB::table('satusehat_resources')->insert([
                        'resource_type' => $resourceType,
                        'local_id' => substr($localId, 0, 100),
                        'satusehat_id' => $satusehatId,
                        'fhir_payload' => json_encode($json),
                        'status' => 'sent',
                        'sent_at' => now(),
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                } catch (\Throwable $logEx) {
                    // Silent fail for logging
                    Log::warning('[SATUSEHAT] Gagal auto-log resource', ['error' => $logEx->getMessage()]);
                }
            }

            if (! $ok) {
                Log::warning('[SATUSEHAT] Request gagal', [
                    'method' => $method,
                    'url' => $url,
                    'status' => $status,
                    'body' => $resp->body(),
                ]);
            }

            return [
                'ok' => $ok,
                'status' => $status,
                'json' => $json,
                'body' => $resp->body(),
                'error' => $ok ? null : ($json['issue'][0]['diagnostics'] ?? $resp->body()),
            ];
        } catch (\Throwable $e) {
            Log::error('[SATUSEHAT] Exception saat request', [
                'method' => $method,
                'url' => $url,
                'message' => $e->getMessage(),
            ]);

            return [
                'ok' => false,
                'status' => 0,
                'error' => $e->getMessage(),
            ];
        }
    }
}
