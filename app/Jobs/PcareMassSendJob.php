<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class PcareMassSendJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public $tries = 1;

    protected array $list;

    public function __construct(array $list)
    {
        $this->list = $list;
    }

    public function handle(): void
    {
        foreach ($this->list as $noRawat) {
            try {
                PcareResendJob::dispatchSync((string) $noRawat);
            } catch (\Throwable $e) {
                Log::channel('bpjs')->error('MassSend item failed', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
            }
        }
    }
}

