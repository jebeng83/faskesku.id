<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\MedicationDispenseService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMedicationDispenseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $noResep;

    public string $noRawat;

    public string $tglPerawatan;

    public string $jam;

    public function __construct(string $noResep, string $noRawat, string $tglPerawatan, string $jam)
    {
        $this->noResep = $noResep;
        $this->noRawat = $noRawat;
        $this->tglPerawatan = $tglPerawatan;
        $this->jam = $jam;
    }

    public function handle(MedicationDispenseService $service): void
    {
        try {
            $res = $service->sendMedicationDispensesForPenyerahan($this->noResep, $this->noRawat, $this->tglPerawatan, $this->jam);
            if (! ($res['ok'] ?? false)) {
                Log::warning('[SATUSEHAT][MedicationDispenseJob] not ok', [
                    'no_resep' => $this->noResep,
                    'no_rawat' => $this->noRawat,
                    'tgl_perawatan' => $this->tglPerawatan,
                    'jam' => $this->jam,
                    'code' => $res['code'] ?? null,
                    'message' => $res['message'] ?? null,
                ]);
                return;
            }

            Log::info('[SATUSEHAT][MedicationDispenseJob] done', [
                'no_resep' => $this->noResep,
                'no_rawat' => $this->noRawat,
                'tgl_perawatan' => $this->tglPerawatan,
                'jam' => $this->jam,
                'count' => is_array($res['results'] ?? null) ? count($res['results']) : null,
            ]);
        } catch (\Throwable $e) {
            Log::error('[SATUSEHAT][MedicationDispenseJob] failed', [
                'no_resep' => $this->noResep,
                'no_rawat' => $this->noRawat,
                'tgl_perawatan' => $this->tglPerawatan,
                'jam' => $this->jam,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
