<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\WhatsAppCredential;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class WhatsAppCredentialController extends Controller
{
    public function index()
    {
        $rows = WhatsAppCredential::query()->orderByDesc('active')->orderBy('name')->get();
        $data = $rows->map(function ($r) {
            return [
                'id' => $r->id,
                'name' => $r->name,
                'phone_number_id' => $r->phone_number_id,
                'verify_token' => $r->verify_token,
                'graph_version' => $r->graph_version,
                'graph_base' => $r->graph_base,
                'active' => (bool) $r->active,
                'last_rotated_at' => optional($r->last_rotated_at)->format('Y-m-d H:i:s'),
                'has_token' => $r->token ? true : false,
                'has_app_secret' => $r->app_secret ? true : false,
            ];
        });
        return response()->json(['ok' => true, 'data' => $data]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:100'],
            'phone_number_id' => ['required', 'string', 'max:100', 'unique:whatsapp_credentials,phone_number_id'],
            'token' => ['nullable', 'string'],
            'app_secret' => ['nullable', 'string'],
            'verify_token' => ['nullable', 'string', 'max:150'],
            'graph_version' => ['nullable', 'string', 'max:20'],
            'graph_base' => ['nullable', 'string', 'max:150'],
            'active' => ['nullable', 'boolean'],
        ]);
        $m = new WhatsAppCredential();
        $m->name = $data['name'] ?? null;
        $m->phone_number_id = (string) $data['phone_number_id'];
        $m->verify_token = $data['verify_token'] ?? null;
        $m->graph_version = $data['graph_version'] ?? 'v19.0';
        $m->graph_base = $data['graph_base'] ?? 'https://graph.facebook.com';
        $m->active = (bool) ($data['active'] ?? true);
        if (array_key_exists('token', $data)) {
            $m->token = $data['token'] ?? '';
        }
        if (array_key_exists('app_secret', $data)) {
            $m->app_secret = $data['app_secret'] ?? '';
        }
        $m->save();
        Cache::forget('wa:active_credential');
        Cache::forget('wa:active_secrets');
        Cache::forget('wa:verify_tokens');
        Cache::forget('wa:active_list');
        return response()->json(['ok' => true, 'id' => $m->id]);
    }

    public function show(WhatsAppCredential $credential)
    {
        $r = $credential;
        $data = [
            'id' => $r->id,
            'name' => $r->name,
            'phone_number_id' => $r->phone_number_id,
            'verify_token' => $r->verify_token,
            'graph_version' => $r->graph_version,
            'graph_base' => $r->graph_base,
            'active' => (bool) $r->active,
            'last_rotated_at' => optional($r->last_rotated_at)->format('Y-m-d H:i:s'),
            'has_token' => $r->token ? true : false,
            'has_app_secret' => $r->app_secret ? true : false,
        ];
        return response()->json(['ok' => true, 'data' => $data]);
    }

    public function update(Request $request, WhatsAppCredential $credential)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:100'],
            'phone_number_id' => ['nullable', 'string', 'max:100'],
            'token' => ['nullable', 'string'],
            'app_secret' => ['nullable', 'string'],
            'verify_token' => ['nullable', 'string', 'max:150'],
            'graph_version' => ['nullable', 'string', 'max:20'],
            'graph_base' => ['nullable', 'string', 'max:150'],
            'active' => ['nullable', 'boolean'],
        ]);
        if (array_key_exists('name', $data)) {
            $credential->name = $data['name'] ?? null;
        }
        if (array_key_exists('phone_number_id', $data)) {
            $pnid = (string) ($data['phone_number_id'] ?? '');
            if ($pnid !== '') {
                $exists = WhatsAppCredential::where('phone_number_id', $pnid)->where('id', '!=', $credential->id)->exists();
                if ($exists) {
                    return response()->json(['ok' => false, 'error' => 'phone_number_id already used'], 422);
                }
                $credential->phone_number_id = $pnid;
            }
        }
        if (array_key_exists('verify_token', $data)) {
            $credential->verify_token = $data['verify_token'] ?? null;
        }
        if (array_key_exists('graph_version', $data)) {
            $credential->graph_version = $data['graph_version'] ?? $credential->graph_version;
        }
        if (array_key_exists('graph_base', $data)) {
            $credential->graph_base = $data['graph_base'] ?? $credential->graph_base;
        }
        if (array_key_exists('active', $data)) {
            $credential->active = (bool) ($data['active'] ?? $credential->active);
        }
        if (array_key_exists('token', $data)) {
            $credential->token = $data['token'] ?? '';
        }
        if (array_key_exists('app_secret', $data)) {
            $credential->app_secret = $data['app_secret'] ?? '';
        }
        $credential->save();
        Cache::forget('wa:active_credential');
        Cache::forget('wa:active_secrets');
        Cache::forget('wa:verify_tokens');
        Cache::forget('wa:active_list');
        return response()->json(['ok' => true]);
    }

    public function destroy(WhatsAppCredential $credential)
    {
        $credential->delete();
        Cache::forget('wa:active_credential');
        Cache::forget('wa:active_secrets');
        Cache::forget('wa:verify_tokens');
        Cache::forget('wa:active_list');
        return response()->json(['ok' => true]);
    }
}
