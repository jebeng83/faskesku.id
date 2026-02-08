<?php

namespace App\Jobs\SatuSehat;

use App\Services\SatuSehat\ConditionService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessConditionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $noRawat;
    protected $kdPenyakit;
    protected $statusRawat;

    /**
     * Create a new job instance.
     *
     * @param string $noRawat
     * @param string $kdPenyakit
     * @param string $statusRawat
     */
    public function __construct($noRawat, $kdPenyakit, $statusRawat = 'Ralan')
    {
        $this->noRawat = $noRawat;
        $this->kdPenyakit = $kdPenyakit;
        $this->statusRawat = $statusRawat;
    }

    /**
     * Execute the job.
     */
    public function handle(ConditionService $conditionService): void
    {
        Log::info('[SATU SEHAT JOB] Memulai proses Condition', [
            'no_rawat' => $this->noRawat,
            'kd_penyakit' => $this->kdPenyakit
        ]);

        try {
            $result = $conditionService->createCondition(
                $this->noRawat,
                $this->kdPenyakit,
                $this->statusRawat
            );

            if ($result) {
                Log::info('[SATU SEHAT JOB] Condition berhasil diproses', [
                    'no_rawat' => $this->noRawat,
                    'kd_penyakit' => $this->kdPenyakit,
                    'condition_id' => $result['id'] ?? 'unknown'
                ]);
            } else {
                Log::warning('[SATU SEHAT JOB] Condition tidak bisa diproses (data tidak lengkap)', [
                    'no_rawat' => $this->noRawat,
                    'kd_penyakit' => $this->kdPenyakit
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('[SATU SEHAT JOB] Gagal memproses condition', [
                'no_rawat' => $this->noRawat,
                'kd_penyakit' => $this->kdPenyakit,
                'error' => $e->getMessage()
            ]);
            
            // Opsional: throw exception agar job di-retry
            // throw $e;
        }
    }
}
