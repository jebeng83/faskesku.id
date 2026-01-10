<?php

namespace App\Jobs;

use App\Services\WhatsApp\WhatsAppService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class WhatsAppSendJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public $tries = 3;

    public function backoff()
    {
        return [60, 300, 900];
    }

    protected string $to;
    protected string $text;
    protected string $idempotencyKey;
    protected ?int $credentialId = null;
    protected ?string $phoneNumberId = null;

    public function __construct(string $to, string $text, string $idempotencyKey = '', ?int $credentialId = null, ?string $phoneNumberId = null)
    {
        $this->to = $to;
        $this->text = $text;
        $this->idempotencyKey = $idempotencyKey;
        $this->credentialId = $credentialId;
        $this->phoneNumberId = $phoneNumberId;
    }

    public function handle(WhatsAppService $service): void
    {
        $res = $service->sendText($this->to, $this->text, [
            'credential_id' => $this->credentialId,
            'phone_number_id' => $this->phoneNumberId,
        ]);
        $ok = (bool) ($res['ok'] ?? false);
        $status = (int) ($res['status'] ?? 0);

        Log::info('whatsapp.outbound.sent', [
            'to' => $this->to,
            'ok' => $ok,
            'http_status' => $status,
            'idempotency_key' => $this->idempotencyKey,
            'credential_id' => $res['used_credential_id'] ?? null,
            'phone_number_id' => $res['used_phone_number_id'] ?? null,
        ]);

        if (! $ok) {
            throw new \RuntimeException('WhatsApp send failed');
        }
    }
}
