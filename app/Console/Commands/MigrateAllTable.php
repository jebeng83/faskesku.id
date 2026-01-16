<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MigrateAllTable extends Command
{
    protected $signature = 'migrate:all-tables
        {--database=}
        {--force}
        {--pretend}
        {--step}
        {--seed}
        {--generated-only}
        {--base-only}
        {--path=database/migrations/generated}';

    protected $description = 'Run base migrations then generated migrations in one command';

    public function handle(): int
    {
        $database = (string) $this->option('database');
        $force = (bool) $this->option('force');
        $pretend = (bool) $this->option('pretend');
        $step = (bool) $this->option('step');
        $seed = (bool) $this->option('seed');
        $generatedOnly = (bool) $this->option('generated-only');
        $baseOnly = (bool) $this->option('base-only');
        $generatedPath = (string) $this->option('path') ?: 'database/migrations/generated';

        $opts = function () use ($database, $force, $pretend, $step, $seed) {
            $o = [];
            if ($database !== '') $o['--database'] = $database;
            if ($force) $o['--force'] = true;
            if ($pretend) $o['--pretend'] = true;
            if ($step) $o['--step'] = true;
            if ($seed) $o['--seed'] = true;
            return $o;
        };

        if ($baseOnly && $generatedOnly) {
            $this->error('Tidak dapat menggunakan --base-only dan --generated-only bersamaan');
            return 1;
        }

        $exitCode = 0;

        // Repair existing tables: mark create-table migrations as done if table already exists
        try {
            Artisan::call('migrate:repair-existing', ['--path' => 'database/migrations']);
        } catch (\Throwable $e) {
            $this->warn('Gagal menjalankan repair-existing untuk base: '.$e->getMessage());
        }

        if (!$generatedOnly) {
            $this->info('Menjalankan migrasi dasar');
            try {
                $code = Artisan::call('migrate', $opts());
                $this->line(Artisan::output());
                if ($code !== 0) {
                    $this->error('Migrasi dasar gagal');
                    return $code;
                }
            } catch (\Throwable $e) {
                $this->error('Migrasi dasar exception: ' . $e->getMessage());
                return 1;
            }
        }

        // Repair existing tables in generated path juga
        try {
            Artisan::call('migrate:repair-existing', ['--path' => $generatedPath]);
        } catch (\Throwable $e) {
            $this->warn('Gagal menjalankan repair-existing untuk generated: '.$e->getMessage());
        }

        if (!$baseOnly) {
            $this->info('Menjalankan migrasi generated dari path: ' . $generatedPath);
            $root = base_path($generatedPath);
            if (!is_dir($root)) {
                $this->error('Path generated tidak ditemukan: ' . $root);
                return 1;
            }
            $files = collect(File::files($root))
                ->sortBy(fn($f) => $f->getFilename())
                ->values();

            foreach ($files as $file) {
                $relPath = $generatedPath . DIRECTORY_SEPARATOR . $file->getFilename();
                $this->line('> Migrasi: ' . $file->getFilename());
                try {
                    $code = Artisan::call('migrate', array_merge($opts(), ['--path' => $relPath]));
                    $this->line(Artisan::output());
                    if ($code !== 0) {
                        $fname = $file->getFilename();
                        if (Str::contains($fname, 'add_foreign_keys_to')) {
                            $this->warn('Lewati kegagalan FK: ' . $fname);
                            continue;
                        }
                        $this->warn('Lewati kegagalan generated: ' . $fname . ' (exit code: ' . $code . ')');
                        continue;
                    }
                } catch (\Throwable $e) {
                    $fname = $file->getFilename();
                    if (Str::contains($fname, 'add_foreign_keys_to')) {
                        $this->warn('Lewati kegagalan FK (exception): ' . $fname . ' (' . $e->getMessage() . ')');
                        continue;
                    }
                    $this->warn('Lewati kegagalan generated (exception): ' . $fname . ' (' . $e->getMessage() . ')');
                    continue;
                }
            }
        }

        return $exitCode;
    }
}
