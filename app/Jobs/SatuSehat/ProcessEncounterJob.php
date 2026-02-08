<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\EncounterService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessEncounterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $noRawat;

    /**
     * Create a new job instance.
     *
     * @param string $noRawat
     */
    public function __construct($noRawat)
    {
        $this->noRawat = $noRawat;
    }

    /**
     * Execute the job.
     */
    public function handle(EncounterService $encounterService): void
    {
        Log::info('[SATU SEHAT JOB] Memulai proses Encounter untuk no_rawat: ' . $this->noRawat);

        try {
            // Parameter kedua 'true' artinya langsung kirim ke Satu Sehat
            $result = $encounterService->createEncounter($this->noRawat, true);
            
            Log::info('[SATU SEHAT JOB] Encounter berhasil diproses', [
                'no_rawat' => $this->noRawat,
                'encounter_id' => $result['id'] ?? 'unknown'
            ]);
        } catch (\Throwable $e) {
            Log::error('[SATU SEHAT JOB] Gagal memproses encounter', [
                'no_rawat' => $this->noRawat,
                'error' => $e->getMessage()
            ]);
            
            // Opsional: throw exception agar job di-retry jika konfigurasi queue mendukung retry
            // throw $e; 
        }
    }
}
