<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SeedAllTablesSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        $dir = base_path('database/seeders/AutoSeeders');
        if (is_dir($dir)) {
            $files = collect(File::files($dir))
                ->filter(fn ($f) => Str::endsWith($f->getFilename(), 'TableSeeder.php'))
                ->filter(function ($f) {
                    try { return $f->getSize() <= 2 * 1024 * 1024; } catch (\Throwable $e) { return true; }
                })
                ->map(fn ($f) => $f->getFilename())
                ->values();
            foreach ($files as $filename) {
                $class = 'Database\\Seeders\\AutoSeeders\\'.Str::replaceLast('.php', '', $filename);
                $path = $dir.DIRECTORY_SEPARATOR.$filename;
                $content = '';
                try { $content = File::get($path); } catch (\Throwable $e) { $content = ''; }

                // Deteksi seeder yang melakukan truncate dan identifikasi tabel target
                $table = null;
                $doesTruncate = false;
                if ($content !== '') {
                    if (preg_match("/DB::table\(['\"]([a-zA-Z0-9_]+)['\"]\)\s*->\s*truncate\(\)/", $content, $m)) {
                        $table = $m[1] ?? null;
                        $doesTruncate = true;
                    }
                }

                // Jika seeder akan truncate dan tabel sudah berisi data, lewati untuk menjaga data existing
                if ($doesTruncate && $table && Schema::hasTable($table)) {
                    try {
                        $count = (int) (DB::table($table)->limit(1)->count());
                        if ($count > 0) {
                            if (method_exists($this, 'command') && $this->command) {
                                $this->command->warn("Lewati seeder yang berpotensi menghapus data: {$class} (tabel {$table} memiliki {$count} baris)");
                            }
                            continue;
                        }
                    } catch (\Throwable $e) {
                        // Jika pengecekan gagal, tetap panggil seeder agar tidak macet, tapi log
                        if (method_exists($this, 'command') && $this->command) {
                            $this->command->warn("Gagal cek isi tabel {$table} untuk {$class}: ".$e->getMessage());
                        }
                    }
                }

                try {
                    $this->call([$class]);
                } catch (\Throwable $e) {
                    if (method_exists($this, 'command') && $this->command) {
                        $this->command->warn('Lewati seeder gagal: '.$class.' ('.$e->getMessage().')');
                    }
                    continue;
                }
            }
        }
        Schema::enableForeignKeyConstraints();
    }
}
