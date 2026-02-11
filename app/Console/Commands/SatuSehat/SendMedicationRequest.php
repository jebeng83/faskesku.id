<?php

namespace App\Console\Commands\SatuSehat;

use App\Jobs\SatuSehat\ProcessMedicationRequestJob;
use App\Services\SatuSehat\MedicationRequestService;
use Illuminate\Console\Command;

class SendMedicationRequest extends Command
{
    protected $signature = 'satusehat:send-medicationrequest
                            {no_resep : Nomor resep (resep_obat.no_resep)}
                            {--dispatch : Dispatch job ke queue (default: jalankan langsung)}
                            {--queue= : Nama queue saat dispatch}';

    protected $description = 'Kirim MedicationRequest SATUSEHAT untuk 1 resep';

    public function handle(MedicationRequestService $service)
    {
        $noResep = trim((string) $this->argument('no_resep'));
        if ($noResep === '') {
            $this->error('no_resep wajib diisi');
            return 2;
        }

        if ((bool) $this->option('dispatch')) {
            $job = ProcessMedicationRequestJob::dispatch($noResep);
            $queue = trim((string) $this->option('queue'));
            if ($queue !== '' && method_exists($job, 'onQueue')) {
                $job->onQueue($queue);
            }

            $this->info('Job ProcessMedicationRequestJob di-dispatch');
            $this->line('no_resep: '.$noResep);
            if ($queue !== '') {
                $this->line('queue: '.$queue);
            }
            return 0;
        }

        $res = $service->sendMedicationRequestsForResep($noResep);

        $this->line(json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        return (bool) ($res['ok'] ?? false) ? 0 : 1;
    }
}

