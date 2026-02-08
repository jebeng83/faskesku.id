<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\AllergyIntoleranceService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessAllergyIntoleranceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $noRawat;
    protected $tglPerawatan;
    protected $jamRawat;

    /**
     * Create a new job instance.
     */
    public function __construct($noRawat, $tglPerawatan = null, $jamRawat = null)
    {
        $this->noRawat = $noRawat;
        $this->tglPerawatan = $tglPerawatan;
        $this->jamRawat = $jamRawat;
    }

    /**
     * Execute the job.
     */
    public function handle(AllergyIntoleranceService $service): void
    {
        Log::info('[SATU SEHAT JOB] Memproses AllergyIntolerance', [
            'no_rawat' => $this->noRawat
        ]);

        try {
            $result = $service->sendAllergyIntolerance(
                $this->noRawat,
                $this->tglPerawatan,
                $this->jamRawat
            );

            if ($result['success']) {
                Log::info('[SATU SEHAT JOB] Selesai memproses AllergyIntolerance', [
                    'no_rawat' => $this->noRawat,
                    'count' => count($result['results'] ?? [])
                ]);
            } else {
                Log::warning('[SATU SEHAT JOB] Gagal memproses AllergyIntolerance', [
                    'no_rawat' => $this->noRawat,
                    'message' => $result['message'] ?? 'Unknown error'
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('[SATU SEHAT JOB] Exception saat AllergyIntolerance', [
                'no_rawat' => $this->noRawat,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $backoff = 30;
}
