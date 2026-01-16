<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class MigrateOrderedFromSchema extends Command
{
    protected $signature = 'migrate:order
        {--database= : Nama koneksi database}
        {--force : Paksa eksekusi pada production}
        {--dry-run : Tampilkan rencana tanpa mengeksekusi}
        {--generated-path=database/migrations/generated : Direktori migrasi generated}
        {--base-path=database/migrations : Direktori migrasi dasar}';

    protected $description = 'Bangun urutan migrasi cerdas dari schema_dump.txt dan jalankan create→FK sesuai dependensi';

    public function handle(): int
    {
        $connection = $this->option('database') ?: config('database.default');
        $force = (bool) $this->option('force');
        $dryRun = (bool) $this->option('dry-run');
        $generatedPath = (string) $this->option('generated-path') ?: 'database/migrations/generated';
        $basePath = (string) $this->option('base-path') ?: 'database/migrations';

        $schemaPath = base_path('schema_dump.txt');
        if (! file_exists($schemaPath)) {
            $this->error('schema_dump.txt tidak ditemukan');
            return self::FAILURE;
        }
        $dump = (string) file_get_contents($schemaPath);

        $tables = [];
        $deps = [];
        $lines = preg_split('/\r?\n/', $dump);
        $current = null;
        foreach ($lines as $line) {
            if (preg_match('/^Table:\s+(\S+)/', $line, $m)) {
                $current = $m[1];
                $tables[$current] = true;
                $deps[$current] = $deps[$current] ?? [];
                continue;
            }
            if ($current && preg_match('/^\s*->\s+\S+\s+references\s+(\S+)\(/', $line, $m)) {
                $ref = $m[1];
                if ($ref !== $current) {
                    $deps[$current] = array_values(array_unique(array_merge($deps[$current] ?? [], [$ref])));
                }
                continue;
            }
            if (trim($line) === '') {
                $current = null;
            }
        }

        $order = $this->toposort($tables, $deps);
        if (empty($order)) {
            $this->error('Gagal membangun urutan migrasi dari schema_dump.txt');
            return self::FAILURE;
        }

        $this->info('Urutan tabel (create-phase): '.implode(', ', array_slice($order, 0, 20)).' ...');

        $baseRoot = base_path($basePath);
        $genRoot = base_path($generatedPath);
        $baseFiles = is_dir($baseRoot) ? collect(File::files($baseRoot)) : collect([]);
        $genFiles = is_dir($genRoot) ? collect(File::files($genRoot)) : collect([]);

        $createIndex = [];
        foreach ($baseFiles as $f) {
            $name = $f->getFilename();
            $content = File::get($f->getRealPath());
            if (preg_match("/Schema::create\(\s*'([^']+)'/", $content, $m)) {
                $createIndex[$m[1]] = $basePath.DIRECTORY_SEPARATOR.$name;
            }
        }
        foreach ($genFiles as $f) {
            $name = $f->getFilename();
            $content = File::get($f->getRealPath());
            if (preg_match("/Schema::create\(\s*'([^']+)'/", $content, $m)) {
                $createIndex[$m[1]] = $generatedPath.DIRECTORY_SEPARATOR.$name;
            }
        }

        $fkIndex = [];
        foreach ($genFiles as $f) {
            $name = $f->getFilename();
            if (preg_match('/add_foreign_keys_to_(.+)_table/', $name, $m)) {
                $fkIndex[$m[1]] = $generatedPath.DIRECTORY_SEPARATOR.$name;
            }
        }

        try {
            Artisan::call('migrate:repair-existing', ['--path' => $basePath]);
            Artisan::call('migrate:repair-existing', ['--path' => $generatedPath]);
        } catch (\Throwable $e) {
        }

        $opts = function () use ($connection, $force) {
            $o = [];
            if ($connection) $o['--database'] = $connection;
            if ($force) $o['--force'] = true;
            return $o;
        };

        foreach ($order as $t) {
            $path = $createIndex[$t] ?? null;
            if (! $path) {
                continue;
            }
            if ($dryRun) {
                $this->line('[PLAN] migrate --path='.$path);
                continue;
            }
            try {
                $code = Artisan::call('migrate', array_merge($opts(), ['--path' => $path]));
                $this->line(Artisan::output());
            } catch (\Throwable $e) {
                $this->warn('Lewati create: '.$path.' ('.$e->getMessage().')');
                continue;
            }
        }

        foreach ($order as $t) {
            $path = $fkIndex[$t] ?? null;
            if (! $path) {
                continue;
            }
            if ($dryRun) {
                $this->line('[PLAN] migrate --path='.$path);
                continue;
            }
            try {
                $code = Artisan::call('migrate', array_merge($opts(), ['--path' => $path]));
                $this->line(Artisan::output());
                if ($code !== 0) {
                    $this->warn('Lewati FK: '.$path.' (exit '.$code.')');
                }
            } catch (\Throwable $e) {
                $this->warn('Lewati FK: '.$path.' ('.$e->getMessage().')');
                continue;
            }
        }

        $this->info('Migrasi berurutan selesai.');
        return self::SUCCESS;
    }

    private function toposort(array $tables, array $deps): array
    {
        $inDegree = [];
        foreach ($tables as $t => $_) {
            $inDegree[$t] = 0;
        }
        foreach ($deps as $t => $ds) {
            foreach ($ds as $d) {
                if (! array_key_exists($d, $inDegree)) {
                    $inDegree[$d] = 0;
                }
                $inDegree[$t] = ($inDegree[$t] ?? 0) + 1;
            }
        }
        $queue = [];
        foreach ($inDegree as $t => $deg) {
            if ($deg === 0) $queue[] = $t;
        }
        $sorted = [];
        while (! empty($queue)) {
            $n = array_shift($queue);
            $sorted[] = $n;
            foreach ($deps[$n] ?? [] as $m) {
                $inDegree[$m] = ($inDegree[$m] ?? 0) - 1;
                if ($inDegree[$m] === 0) $queue[] = $m;
            }
        }
        // Fallback: append remaining
        foreach ($tables as $t => $_) {
            if (! in_array($t, $sorted, true)) $sorted[] = $t;
        }
        return $sorted;
    }
}

