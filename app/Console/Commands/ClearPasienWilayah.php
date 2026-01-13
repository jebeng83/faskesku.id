<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ClearPasienWilayah extends Command
{
    protected $signature = 'db:clear-pasien-wilayah {--dry-run}';

    protected $description = 'Kosongkan pasien dan wilayah beserta turunan (FK)';

    public function handle(): int
    {
        $parents = ['reg_periksa', 'pasien', 'kelurahan', 'kecamatan', 'kabupaten', 'propinsi'];
        $dryRun = (bool) $this->option('dry-run');

        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');

            $tables = collect($parents)
                ->flatMap(function (string $parent) {
                    return DB::table(DB::raw('information_schema.KEY_COLUMN_USAGE'))
                        ->select('TABLE_NAME')
                        ->whereRaw('REFERENCED_TABLE_SCHEMA = DATABASE()')
                        ->where('REFERENCED_TABLE_NAME', $parent)
                        ->pluck('TABLE_NAME')
                        ->all();
                })
                ->unique()
                ->values();

            if ($tables->isEmpty()) {
                $this->line('Tidak ada tabel turunan ditemukan.');
            } else {
                foreach ($tables as $t) {
                    if ($dryRun) {
                        $this->line("TRUNCATE TABLE `{$t}`");
                    } else {
                        DB::statement("TRUNCATE TABLE `{$t}`");
                        $this->line("Kosongkan: {$t}");
                    }
                }
            }

            foreach ($parents as $p) {
                if ($dryRun) {
                    $this->line("TRUNCATE TABLE `{$p}`");
                } else {
                    DB::statement("TRUNCATE TABLE `{$p}`");
                    $this->line("Kosongkan: {$p}");
                }
            }

            if (! $dryRun) {
                $rows = DB::select(
                    "SELECT 'reg_periksa' AS table_name, COUNT(*) AS cnt FROM reg_periksa
                     UNION ALL SELECT 'pasien', COUNT(*) FROM pasien
                     UNION ALL SELECT 'kelurahan', COUNT(*) FROM kelurahan
                     UNION ALL SELECT 'kecamatan', COUNT(*) FROM kecamatan
                     UNION ALL SELECT 'kabupaten', COUNT(*) FROM kabupaten
                     UNION ALL SELECT 'propinsi', COUNT(*) FROM propinsi"
                );
                $this->table(
                    ['Tabel', 'Jumlah'],
                    collect($rows)->map(function ($r) {
                        return [(string) ($r->table_name ?? ''), (string) ($r->cnt ?? '')];
                    })->all()
                );
            }

            DB::statement('SET FOREIGN_KEY_CHECKS=1');

            return Command::SUCCESS;
        } catch (\Throwable $e) {
            $this->error($e->getMessage());
            try {
                DB::statement('SET FOREIGN_KEY_CHECKS=1');
            } catch (\Throwable $ignored) {
            }
            return Command::FAILURE;
        }
    }
}

