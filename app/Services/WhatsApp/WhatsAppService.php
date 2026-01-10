<?php

namespace App\Services\WhatsApp;

use App\Repositories\WhatsApp\CredentialRepository;
use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    protected CredentialRepository $repo;

    public function __construct(CredentialRepository $repo)
    {
        $this->repo = $repo;
    }

    public function sendText(string $to, string $text, array $opts = []): array
    {
        $target = null;
        if (array_key_exists('credential_id', $opts) && $opts['credential_id']) {
            $target = $this->repo->getById((int) $opts['credential_id']);
        } elseif (array_key_exists('phone_number_id', $opts) && $opts['phone_number_id']) {
            $target = $this->repo->getByPhoneNumberId((string) $opts['phone_number_id']);
        } else {
            $target = $this->repo->getActive();
        }

        $candidates = [];
        if ($target && $target->token) {
            $candidates[] = $target;
        }
        foreach ($this->repo->getActiveList() as $c) {
            if (!$target || $c->id !== $target->id) {
                $candidates[] = $c;
            }
        }

        $envToken = (string) config('services.whatsapp.token');
        $envPhoneId = (string) config('services.whatsapp.phone_number_id');
        $envVersion = (string) config('services.whatsapp.graph_version', 'v19.0');
        $envBase = rtrim((string) config('services.whatsapp.graph_base', 'https://graph.facebook.com'), '/');

        if ($envToken !== '' && $envPhoneId !== '') {
            $candidates[] = null;
        }

        foreach ($candidates as $cred) {
            $token = $cred ? $cred->token : $envToken;
            $phoneId = $cred ? $cred->phone_number_id : $envPhoneId;
            $version = $cred ? $cred->graph_version : $envVersion;
            $base = $cred ? $cred->graph_base : $envBase;

            if ($token === '' || $phoneId === '') {
                continue;
            }

            $url = rtrim($base, '/').'/'.trim($version, '/').'/'.trim($phoneId, '/').'/messages';

            try {
                $response = Http::withToken($token)->post($url, [
                    'messaging_product' => 'whatsapp',
                    'to' => $to,
                    'type' => 'text',
                    'text' => ['body' => $text],
                ]);
            } catch (\Throwable $e) {
                $response = null;
            }

            if ($response && $response->successful()) {
                return [
                    'ok' => true,
                    'status' => $response->status(),
                    'json' => $response->json(),
                    'used_credential_id' => $cred ? $cred->id : null,
                    'used_phone_number_id' => $cred ? $cred->phone_number_id : $envPhoneId,
                ];
            }
        }

        return [
            'ok' => false,
            'status' => isset($response) && $response ? $response->status() : 0,
            'error' => 'WhatsApp send failed',
            'used_credential_id' => $target ? $target->id : null,
            'used_phone_number_id' => $target ? $target->phone_number_id : $envPhoneId,
        ];
    }

    public function verifySignature(string $payload, ?string $signature): bool
    {
        if (! $signature) {
            return false;
        }

        $candidates = $this->repo->getActiveSecrets();
        $envSecret = (string) config('services.whatsapp.app_secret');
        if ($envSecret !== '') {
            $candidates[] = $envSecret;
        }

        foreach ($candidates as $secret) {
            $expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);
            if (hash_equals($expected, $signature)) {
                return true;
            }
        }

        return false;
    }
}
