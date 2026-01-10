<?php

namespace App\Repositories\WhatsApp;

use App\Models\WhatsAppCredential;
use Illuminate\Support\Facades\Cache;

class CredentialRepository
{
    public function getActive(): ?WhatsAppCredential
    {
        return Cache::remember('wa:active_credential', 60, function () {
            $rows = WhatsAppCredential::query()
                ->where('active', true)
                ->orderByDesc('last_rotated_at')
                ->orderByDesc('id')
                ->get();
            foreach ($rows as $r) {
                if ($r->token) {
                    return $r;
                }
            }
            return null;
        });
    }

    public function getByPhoneNumberId(string $pnid): ?WhatsAppCredential
    {
        return WhatsAppCredential::where('phone_number_id', $pnid)->first();
    }

    public function getById(int $id): ?WhatsAppCredential
    {
        return WhatsAppCredential::find($id);
    }

    public function getActiveList(): array
    {
        $rows = Cache::remember('wa:active_list', 60, function () {
            return WhatsAppCredential::query()
                ->where('active', true)
                ->orderByDesc('last_rotated_at')
                ->orderByDesc('id')
                ->get();
        });
        $out = [];
        foreach ($rows as $r) {
            if ($r->token) {
                $out[] = $r;
            }
        }
        return $out;
    }

    public function getActiveSecrets(): array
    {
        $rows = Cache::remember('wa:active_secrets', 60, function () {
            return WhatsAppCredential::query()->where('active', true)->get(['id', 'app_secret_cipher']);
        });
        $out = [];
        foreach ($rows as $r) {
            $s = $r->app_secret;
            if ($s) {
                $out[] = $s;
            }
        }
        return $out;
    }

    public function anyVerifyTokenMatch(string $token): bool
    {
        $rows = Cache::remember('wa:verify_tokens', 60, function () {
            return WhatsAppCredential::query()->whereNotNull('verify_token')->get(['id', 'verify_token', 'active']);
        });
        foreach ($rows as $r) {
            if ((string) $r->verify_token === (string) $token) {
                return true;
            }
        }
        return false;
    }
}
