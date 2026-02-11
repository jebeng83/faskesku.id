<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\MedicationRequestService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMedicationRequestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $noResep;

    public function __construct(string $noResep)
    {
        $this->noResep = $noResep;
    }

    public function handle(MedicationRequestService $service): void
    {
        try {
            $res = $service->sendMedicationRequestsForResep($this->noResep);
            if (! ($res['ok'] ?? false)) {
                Log::warning('[SATUSEHAT][MedicationRequestJob] not ok', [
                    'no_resep' => $this->noResep,
                    'code' => $res['code'] ?? null,
                    'message' => $res['message'] ?? null,
                ]);
                return;
            }

            Log::info('[SATUSEHAT][MedicationRequestJob] done', [
                'no_resep' => $this->noResep,
                'count' => is_array($res['results'] ?? null) ? count($res['results']) : null,
            ]);
        } catch (\Throwable $e) {
            Log::error('[SATUSEHAT][MedicationRequestJob] failed', [
                'no_resep' => $this->noResep,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
