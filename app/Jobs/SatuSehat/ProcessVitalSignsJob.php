<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\ObservationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessVitalSignsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $noRawat;
    protected $tglPerawatan;
    protected $jamRawat;

    /**
     * Create a new job instance.
     */
    public function __construct($noRawat, $tglPerawatan, $jamRawat)
    {
        $this->noRawat = $noRawat;
        $this->tglPerawatan = $tglPerawatan;
        $this->jamRawat = $jamRawat;
    }

    /**
     * Execute the job.
     */
    public function handle(ObservationService $service): void
    {
        Log::info('[SATU SEHAT JOB] Memproses vital signs', [
            'no_rawat' => $this->noRawat,
            'tgl_perawatan' => $this->tglPerawatan,
            'jam_rawat' => $this->jamRawat
        ]);

        try {
            $result = $service->sendVitalSigns(
                $this->noRawat,
                $this->tglPerawatan,
                $this->jamRawat
            );

            if ($result['success']) {
                Log::info('[SATU SEHAT JOB] Berhasil kirim vital signs', [
                    'no_rawat' => $this->noRawat,
                    'results' => $result['results'] ?? []
                ]);
            } else {
                Log::warning('[SATU SEHAT JOB] Gagal kirim vital signs', [
                    'no_rawat' => $this->noRawat,
                    'message' => $result['message'] ?? 'Unknown error'
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('[SATU SEHAT JOB] Exception saat kirim vital signs', [
                'no_rawat' => $this->noRawat,
                'tgl_perawatan' => $this->tglPerawatan,
                'jam_rawat' => $this->jamRawat,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Re-throw untuk retry mechanism jika menggunakan queue
            // throw $e;
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
