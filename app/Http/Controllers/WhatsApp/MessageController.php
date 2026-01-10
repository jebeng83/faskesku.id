<?php

namespace App\Http\Controllers\WhatsApp;

use App\Http\Controllers\Controller;
use App\Jobs\WhatsAppSendJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'to' => ['required', 'string'],
            'text' => ['required', 'string'],
            'idempotency_key' => ['nullable', 'string'],
            'credential_id' => ['nullable', 'integer'],
            'phone_number_id' => ['nullable', 'string'],
        ]);

        $to = (string) $data['to'];
        $text = (string) $data['text'];
        $key = (string) ($data['idempotency_key'] ?? '');

        if ($key !== '') {
            $cacheKey = 'wa:idempotency:' . $key;
            if (! Cache::add($cacheKey, 1, now()->addDay())) {
                return response()->json([
                    'ok' => false,
                    'status' => 'duplicate',
                ], 409);
            }
        }

        $credentialId = isset($data['credential_id']) ? (int) $data['credential_id'] : null;
        $phoneNumberId = isset($data['phone_number_id']) ? (string) $data['phone_number_id'] : null;
        dispatch(new WhatsAppSendJob($to, $text, $key, $credentialId, $phoneNumberId));

        Log::info('whatsapp.outbound.queued', [
            'to' => $to,
            'length' => strlen($text),
            'idempotency_key' => $key,
            'credential_id' => $credentialId,
            'phone_number_id' => $phoneNumberId,
        ]);

        return response()->json([
            'ok' => true,
            'status' => 'queued',
        ], 202);
    }
}
