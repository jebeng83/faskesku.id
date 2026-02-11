<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\CompositionService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessCompositionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $noRawat;

    public string $encounterId;

    public string $patientId;

    public string $practitionerId;

    public string $localDateTime;

    public function __construct(string $noRawat, string $encounterId, string $patientId, string $practitionerId = '', string $localDateTime = '')
    {
        $this->noRawat = $noRawat;
        $this->encounterId = $encounterId;
        $this->patientId = $patientId;
        $this->practitionerId = $practitionerId;
        $this->localDateTime = $localDateTime;
    }

    public function handle(CompositionService $service): void
    {
        try {
            $res = $service->sendRajalCompositionAutoFromNoRawat(
                $this->noRawat,
                $this->patientId,
                $this->encounterId,
                $this->practitionerId,
                $this->localDateTime
            );

            if (! ($res['ok'] ?? false)) {
                Log::warning('[SATUSEHAT][CompositionJob] not ok', [
                    'no_rawat' => $this->noRawat,
                    'encounter_id' => $this->encounterId,
                    'code' => $res['code'] ?? null,
                    'message' => $res['message'] ?? null,
                ]);
                return;
            }

            Log::info('[SATUSEHAT][CompositionJob] done', [
                'no_rawat' => $this->noRawat,
                'encounter_id' => $this->encounterId,
                'composition_id' => $res['composition_id'] ?? null,
                'action' => $res['action'] ?? null,
            ]);
        } catch (\Throwable $e) {
            Log::error('[SATUSEHAT][CompositionJob] failed', [
                'no_rawat' => $this->noRawat,
                'encounter_id' => $this->encounterId,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
