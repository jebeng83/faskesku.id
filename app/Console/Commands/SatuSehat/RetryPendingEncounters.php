<?php

namespace App\Console\Commands\SatuSehat;

use App\Jobs\SatuSehat\ProcessEncounterJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RetryPendingEncounters extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'satusehat:retry-encounters 
                            {--limit=50 : Maximum number of encounters to retry}
                            {--days=7 : Only retry encounters from the last N days}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Retry sending pending Encounters to SATU SEHAT';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $limit = (int) $this->option('limit');
        $days = (int) $this->option('days');

        $this->info("🔄 Mencari Encounter yang belum terkirim ke SATU SEHAT...");

        // Cari registrasi yang belum punya encounter di SATU SEHAT
        // Join dengan satusehat_encounter, ambil yang belum ada atau satusehat_id nya null
        $pendingEncounters = DB::table('reg_periksa as rp')
            ->leftJoin('satusehat_encounter as se', 'rp.no_rawat', '=', 'se.no_rawat')
            ->whereNull('se.satusehat_id')
            ->where('rp.tgl_registrasi', '>=', now()->subDays($days))
            ->limit($limit)
            ->select('rp.no_rawat', 'rp.tgl_registrasi')
            ->get();

        if ($pendingEncounters->isEmpty()) {
            $this->info("✅ Tidak ada Encounter yang perlu di-retry.");
            return 0;
        }

        $this->info("📋 Ditemukan {$pendingEncounters->count()} Encounter yang akan di-retry.");

        $bar = $this->output->createProgressBar($pendingEncounters->count());
        $bar->start();

        foreach ($pendingEncounters as $record) {
            ProcessEncounterJob::dispatch($record->no_rawat);
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("✅ Selesai! {$pendingEncounters->count()} job telah di-dispatch.");

        return 0;
    }
}
