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

    protected function satusehatCompatOption(string $key, mixed $default = null): mixed
    {
        $val = config('services.satusehat.compat.'.$key);

        return $val !== null ? $val : $default;
    }

    protected function satusehatCompatAssumeTimezone(): string
    {
        $tz = (string) $this->satusehatCompatOption('assume_timezone', 'Asia/Jakarta');

        return $tz !== '' ? $tz : 'Asia/Jakarta';
    }

    protected function satusehatNormalizeDateTimeToUtc(string $value): string
    {
        $value = trim($value);
        if ($value === '') {
            return '';
        }

        $value = preg_replace('/(T\d{2}:\d{2}:\d{2}):\d{2}([+-]\d{2}:\d{2})$/', '$1$2', $value) ?? $value;

        try {
            $dt = \Carbon\Carbon::parse($value, $this->satusehatCompatAssumeTimezone());
        } catch (\Throwable) {
            return '';
        }

        $min = \Carbon\Carbon::parse('2014-06-03 00:00:00', 'UTC');
        $dtUtc = $dt->copy()->setTimezone('UTC');
        if ($dtUtc->lt($min)) {
            $dtUtc = $min;
        }

        $nowUtc = \Carbon\Carbon::now('UTC');
        if ($dtUtc->gt($nowUtc)) {
            $dtUtc = $nowUtc;
        }

        return $dtUtc->toIso8601String();
    }

    protected function satusehatIsEncounterRequest(string $path, ?array $body = null): bool
    {
        $p = ltrim($path, '/');
        if (str_starts_with($p, 'Encounter')) {
            return true;
        }

        return is_array($body) && (($body['resourceType'] ?? '') === 'Encounter');
    }

    protected function satusehatNormalizeEncounterTimestamps(array $body): array
    {
        if (isset($body['period']) && is_array($body['period'])) {
            foreach (['start', 'end'] as $k) {
                if (isset($body['period'][$k]) && is_string($body['period'][$k])) {
                    $v = $this->satusehatNormalizeDateTimeToUtc($body['period'][$k]);
                    if ($v !== '') {
                        $body['period'][$k] = $v;
                    }
                }
            }
        }

        if (isset($body['statusHistory']) && is_array($body['statusHistory'])) {
            foreach ($body['statusHistory'] as $i => $h) {
                if (! is_array($h)) {
                    continue;
                }
                if (! isset($h['period']) || ! is_array($h['period'])) {
                    continue;
                }
                foreach (['start', 'end'] as $k) {
                    if (isset($h['period'][$k]) && is_string($h['period'][$k])) {
                        $v = $this->satusehatNormalizeDateTimeToUtc($h['period'][$k]);
                        if ($v !== '') {
                            $body['statusHistory'][$i]['period'][$k] = $v;
                        }
                    }
                }
            }
        }

        if (isset($body['classHistory']) && is_array($body['classHistory'])) {
            foreach ($body['classHistory'] as $i => $h) {
                if (! is_array($h)) {
                    continue;
                }
                if (! isset($h['period']) || ! is_array($h['period'])) {
                    continue;
                }
                foreach (['start', 'end'] as $k) {
                    if (isset($h['period'][$k]) && is_string($h['period'][$k])) {
                        $v = $this->satusehatNormalizeDateTimeToUtc($h['period'][$k]);
                        if ($v !== '') {
                            $body['classHistory'][$i]['period'][$k] = $v;
                        }
                    }
                }
            }
        }

        return $body;
    }

    protected function satusehatBuildEncounterStatusHistory(array $body): ?array
    {
        $status = strtolower(trim((string) ($body['status'] ?? '')));
        if ($status !== 'finished') {
            return null;
        }

        $period = is_array($body['period'] ?? null) ? $body['period'] : [];
        $start = trim((string) ($period['start'] ?? ''));
        $end = trim((string) ($period['end'] ?? ''));
        if ($start === '' || $end === '') {
            return null;
        }

        return [
            ['status' => 'arrived', 'period' => ['start' => $start, 'end' => $start]],
            ['status' => 'in-progress', 'period' => ['start' => $start, 'end' => $end]],
            ['status' => 'finished', 'period' => ['start' => $end, 'end' => $end]],
        ];
    }

    protected function satusehatPrepareEncounterForSend(string $method, string $path, array $body, array $options, bool $forceStatusHistory = false): array
    {
        $timestampMode = strtolower(trim((string) ($options['compat']['timestamp_mode'] ?? $this->satusehatCompatOption('timestamp_mode', 'utc'))));
        if ($timestampMode === 'utc') {
            $body = $this->satusehatNormalizeEncounterTimestamps($body);
        }

        $mode = strtolower(trim((string) ($options['compat']['encounter_status_history'] ?? $this->satusehatCompatOption('encounter_status_history', 'off'))));
        if ($mode === '') {
            $mode = 'off';
        }

        if ($mode === 'off' || ($mode === 'auto' && ! $forceStatusHistory)) {
            if (isset($body['statusHistory'])) {
                unset($body['statusHistory']);
            }
        } elseif ($mode === 'on' || ($mode === 'auto' && $forceStatusHistory)) {
            if (! isset($body['statusHistory'])) {
                $sh = $this->satusehatBuildEncounterStatusHistory($body);
                if ($sh !== null) {
                    $body['statusHistory'] = $sh;
                }
            }
        }

        return $body;
    }

    protected function satusehatOperationOutcomeIndicatesStatusHistoryNotFound(?array $json, string $rawBody): bool
    {
        $text = '';
        if (is_array($json) && isset($json['issue']) && is_array($json['issue'])) {
            foreach ($json['issue'] as $issue) {
                if (! is_array($issue)) {
                    continue;
                }
                $detailsText = is_array($issue['details'] ?? null) ? (string) ($issue['details']['text'] ?? '') : '';
                $diagnostics = (string) ($issue['diagnostics'] ?? '');
                $expr = is_array($issue['expression'] ?? null) ? implode(' ', array_map('strval', $issue['expression'])) : '';
                $text .= ' '.$detailsText.' '.$diagnostics.' '.$expr;
            }
        }
        $text = strtolower(trim($text.' '.$rawBody));

        return str_contains($text, 'encounter.statushistory') && (str_contains($text, 'element not found') || str_contains($text, '10122'));
    }

    protected function satusehatOperationOutcomeIndicatesStatusHistoryRequired(?array $json, string $rawBody): bool
    {
        $text = '';
        if (is_array($json) && isset($json['issue']) && is_array($json['issue'])) {
            foreach ($json['issue'] as $issue) {
                if (! is_array($issue)) {
                    continue;
                }
                $detailsText = is_array($issue['details'] ?? null) ? (string) ($issue['details']['text'] ?? '') : '';
                $diagnostics = (string) ($issue['diagnostics'] ?? '');
                $expr = is_array($issue['expression'] ?? null) ? implode(' ', array_map('strval', $issue['expression'])) : '';
                $text .= ' '.$detailsText.' '.$diagnostics.' '.$expr;
            }
        }
        $text = strtolower(trim($text.' '.$rawBody));

        if (! str_contains($text, 'encounter.statushistory')) {
            return false;
        }

        return str_contains($text, 'required') || str_contains($text, 'wajib') || str_contains($text, 'must') || str_contains($text, 'missing');
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

            $sendOnce = function (?array $sendBody) use ($req, $method, $url) {
                if (in_array(strtoupper($method), ['POST', 'PUT', 'PATCH'])) {
                    $jsonBody = json_encode($sendBody ?? [], JSON_UNESCAPED_SLASHES | JSON_PRESERVE_ZERO_FRACTION);
                    $resp = $req->withBody($jsonBody, 'application/fhir+json')->send(strtoupper($method), $url);
                } else {
                    $resp = $req->send(strtoupper($method), $url);
                }

                $status = $resp->status();
                $json = null;
                try {
                    $json = $resp->json();
                } catch (\Throwable) {
                }

                return [
                    'resp' => $resp,
                    'status' => $status,
                    'json' => $json,
                    'ok' => $resp->successful(),
                ];
            };

            $bodyToSend = $body;
            $isEncounter = $this->satusehatIsEncounterRequest($path, is_array($body) ? $body : null);
            if ($isEncounter && is_array($bodyToSend) && in_array(strtoupper($method), ['POST', 'PUT', 'PATCH'])) {
                if (! isset($options['compat']) || ! is_array($options['compat'])) {
                    $options['compat'] = [];
                }
                $bodyToSend = $this->satusehatPrepareEncounterForSend($method, $path, $bodyToSend, $options, false);
            }

            $sent1 = $sendOnce(is_array($bodyToSend) ? $bodyToSend : null);
            $resp = $sent1['resp'];
            $status = $sent1['status'];
            $json = $sent1['json'];
            $ok = $sent1['ok'];

            $mode = strtolower(trim((string) ($options['compat']['encounter_status_history'] ?? $this->satusehatCompatOption('encounter_status_history', 'off'))));
            if ($isEncounter && ! $ok && in_array(strtoupper($method), ['POST', 'PUT', 'PATCH']) && $mode === 'auto' && is_array($bodyToSend)) {
                if ($this->satusehatOperationOutcomeIndicatesStatusHistoryRequired(is_array($json) ? $json : null, $resp->body())) {
                    $retryBody = $this->satusehatPrepareEncounterForSend($method, $path, $bodyToSend, $options, true);
                    $sent2 = $sendOnce($retryBody);
                    $resp = $sent2['resp'];
                    $status = $sent2['status'];
                    $json = $sent2['json'];
                    $ok = $sent2['ok'];
                } elseif ($this->satusehatOperationOutcomeIndicatesStatusHistoryNotFound(is_array($json) ? $json : null, $resp->body())) {
                    if (isset($bodyToSend['statusHistory'])) {
                        unset($bodyToSend['statusHistory']);
                    }
                }
            }

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
