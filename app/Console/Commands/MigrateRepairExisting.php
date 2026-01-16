<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class MigrateRepairExisting extends Command
{
    protected $signature = 'migrate:repair-existing {--path=database/migrations} {--dry-run}';

    protected $description = 'Menandai migration create-table sebagai selesai jika tabel sudah ada agar migrate tidak gagal';

    public function handle(): int
    {
        $path = base_path((string) $this->option('path'));
        $dryRun = (bool) $this->option('dry-run');

        if (! is_dir($path)) {
            $this->error('Path migrations tidak ditemukan: '.$path);
            return 1;
        }

        if (! Schema::hasTable('migrations')) {
            Schema::create('migrations', function ($table) {
                $table->bigIncrements('id');
                $table->string('migration');
                $table->integer('batch');
            });
            $this->info('Tabel migrations dibuat karena belum ada.');
        }

        $files = collect(File::files($path))->sortBy(fn ($f) => $f->getFilename())->values();
        $marked = 0;
        $skipped = 0;

        foreach ($files as $file) {
            $name = pathinfo($file->getFilename(), PATHINFO_FILENAME);
            $content = File::get($file->getRealPath());

            // Cari pola Schema::create('nama_tabel',
            if (! preg_match("/Schema::create\(\s*'([^']+)'\s*,/", $content, $m)) {
                $skipped++;
                continue;
            }

            $table = (string) ($m[1] ?? '');
            if ($table === '') {
                $skipped++;
                continue;
            }

            $exists = Schema::hasTable($table);
            $already = DB::table('migrations')->where('migration', $name)->exists();

            $expectedColumns = [];
            if ($exists) {
                if (preg_match("/Schema::create\(\s*'".$table."'\s*,[\s\S]*?function\s*\(.*?\)\s*\{([\s\S]*?)\}\s*\)/", $content, $m2)) {
                    $block = (string) ($m2[1] ?? '');
                    if ($block !== '') {
                        if (preg_match_all("/\$table->\s*\w+\(\s*'([^']+)'/", $block, $cols)) {
                            $expectedColumns = array_unique(array_map('strval', $cols[1] ?? []));
                        }
                    }
                }
            }

            $structureOk = true;
            if ($exists && ! empty($expectedColumns)) {
                foreach ($expectedColumns as $col) {
                    if (! Schema::hasColumn($table, $col)) {
                        $structureOk = false;
                        break;
                    }
                }
            }

            if ($exists && $structureOk && ! $already) {
                $batch = (int) (DB::table('migrations')->max('batch') ?? 0);
                $batch = max($batch, 1);
                if (! $dryRun) {
                    DB::table('migrations')->insert([
                        'migration' => $name,
                        'batch' => $batch,
                    ]);
                }
                $marked++;
                $this->line("✔ Tandai sebagai selesai: {$name} (tabel sudah ada: {$table})");
            } else {
                $skipped++;
            }
        }

        $this->info("Repair selesai. Ditandai: {$marked}, dilewati: {$skipped}.");
        return 0;
    }
}
