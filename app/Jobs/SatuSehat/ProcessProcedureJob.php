<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\ProcedureService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessProcedureJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $noRawat;

    public string $statusRawat;

    public function __construct(string $noRawat, string $statusRawat = 'Ralan')
    {
        $this->noRawat = $noRawat;
        $this->statusRawat = $statusRawat;
    }

    public function handle(ProcedureService $procedureService): void
    {
        try {
            $res = $procedureService->sendProceduresForEncounter($this->noRawat, $this->statusRawat);
            if (! ($res['ok'] ?? false)) {
                Log::warning('[SATUSEHAT][ProcedureJob] not ok', [
                    'no_rawat' => $this->noRawat,
                    'status' => $this->statusRawat,
                    'code' => $res['code'] ?? null,
                    'message' => $res['message'] ?? null,
                ]);
                return;
            }

            Log::info('[SATUSEHAT][ProcedureJob] done', [
                'no_rawat' => $this->noRawat,
                'status' => $this->statusRawat,
                'count' => is_array($res['results'] ?? null) ? count($res['results']) : null,
            ]);
        } catch (\Throwable $e) {
            Log::error('[SATUSEHAT][ProcedureJob] failed', [
                'no_rawat' => $this->noRawat,
                'status' => $this->statusRawat,
                'error' => $e->getMessage(),
            ]);
        }
    }
}

