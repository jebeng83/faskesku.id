<?php

namespace App\Console\Commands\SatuSehat;

use App\Jobs\SatuSehat\ProcessMedicationDispenseJob;
use App\Services\SatuSehat\MedicationDispenseService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SendMedicationDispense extends Command
{
    protected $signature = 'satusehat:send-medicationdispense
                            {no_resep : Nomor resep (resep_obat.no_resep)}
                            {--tgl= : Override tgl_perawatan (YYYY-MM-DD). Default: tgl_penyerahan resep}
                            {--jam= : Override jam (HH:MM:SS). Default: jam_penyerahan resep}
                            {--dispatch : Dispatch job ke queue (default: jalankan langsung)}
                            {--queue= : Nama queue saat dispatch}';

    protected $description = 'Kirim MedicationDispense SATUSEHAT untuk penyerahan 1 resep (berdasarkan timestamp penyerahan)';

    public function handle(MedicationDispenseService $service)
    {
        $noResep = trim((string) $this->argument('no_resep'));
        if ($noResep === '') {
            $this->error('no_resep wajib diisi');
            return 2;
        }

        $resep = DB::table('resep_obat')
            ->where('no_resep', $noResep)
            ->first(['no_resep', 'no_rawat', 'tgl_penyerahan', 'jam_penyerahan']);

        if (! $resep) {
            $this->error('Resep tidak ditemukan: '.$noResep);
            return 1;
        }

        $noRawat = trim((string) ($resep->no_rawat ?? ''));
        if ($noRawat === '') {
            $this->error('no_rawat kosong pada resep: '.$noResep);
            return 1;
        }

        $tgl = trim((string) $this->option('tgl'));
        $jam = trim((string) $this->option('jam'));

        if ($tgl === '' || $jam === '') {
            $tglFromResep = trim((string) ($resep->tgl_penyerahan ?? ''));
            $jamFromResep = trim((string) ($resep->jam_penyerahan ?? ''));
            if ($tgl === '') {
                $tgl = $tglFromResep;
            }
            if ($jam === '') {
                $jam = $jamFromResep;
            }
        }

        if ($tgl === '' || $jam === '' || $tgl === '0000-00-00' || $jam === '00:00:00') {
            $latest = DB::table('detail_pemberian_obat')
                ->where('no_rawat', $noRawat)
                ->orderByDesc('tgl_perawatan')
                ->orderByDesc('jam')
                ->first(['tgl_perawatan', 'jam']);

            $tgl = trim((string) ($latest->tgl_perawatan ?? $tgl));
            $jam = trim((string) ($latest->jam ?? $jam));
        }

        if ($tgl === '' || $jam === '' || $tgl === '0000-00-00' || $jam === '00:00:00') {
            $this->error('Timestamp penyerahan tidak valid. Pastikan penyerahan sudah diproses.');
            $this->line('no_resep: '.$noResep);
            $this->line('no_rawat: '.$noRawat);
            $this->line('tgl: '.($tgl !== '' ? $tgl : '-'));
            $this->line('jam: '.($jam !== '' ? $jam : '-'));
            return 1;
        }

        if ((bool) $this->option('dispatch')) {
            $job = ProcessMedicationDispenseJob::dispatch($noResep, $noRawat, $tgl, $jam);
            $queue = trim((string) $this->option('queue'));
            if ($queue !== '' && method_exists($job, 'onQueue')) {
                $job->onQueue($queue);
            }

            $this->info('Job ProcessMedicationDispenseJob di-dispatch');
            $this->line('no_resep: '.$noResep);
            $this->line('no_rawat: '.$noRawat);
            $this->line('tgl_perawatan: '.$tgl);
            $this->line('jam: '.$jam);
            if ($queue !== '') {
                $this->line('queue: '.$queue);
            }
            return 0;
        }

        $res = $service->sendMedicationDispensesForPenyerahan($noResep, $noRawat, $tgl, $jam);
        $this->line(json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        return (bool) ($res['ok'] ?? false) ? 0 : 1;
    }
}

