<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Repositories\WhatsApp\CredentialRepository;
use App\Services\WhatsApp\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WhatsAppWebhookController extends Controller
{
    public function verify(Request $request, CredentialRepository $repo)
    {
        $mode = (string) $request->query('hub.mode', '');
        $token = (string) $request->query('hub.verify_token', '');
        $challenge = (string) $request->query('hub.challenge', '');

        $envToken = (string) config('services.whatsapp.verify_token');
        $ok = $mode === 'subscribe' && (($envToken !== '' && $token === $envToken) || $repo->anyVerifyTokenMatch($token));
        if ($ok) {
            return response($challenge, 200);
        }

        return response()->json(['ok' => false], 403);
    }

    public function handle(Request $request, WhatsAppService $service)
    {
        $signature = $request->header('X-Hub-Signature-256');
        $payload = (string) $request->getContent();

        if (! $service->verifySignature($payload, $signature)) {
            return response()->json(['ok' => false], 403);
        }

        Log::info('whatsapp.webhook.inbound', ['size' => strlen($payload)]);
        return response()->json(['ok' => true], 200);
    }
}
