<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

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

        if (!$generatedOnly) {
            $this->info('Menjalankan migrasi dasar');
            $code = Artisan::call('migrate', $opts());
            $this->line(Artisan::output());
            if ($code !== 0) {
                $this->error('Migrasi dasar gagal');
                return $code;
            }
        }

        if (!$baseOnly) {
            $this->info('Menjalankan migrasi generated dari path: ' . $generatedPath);
            $args = array_merge($opts(), ['--path' => $generatedPath]);
            $code = Artisan::call('migrate', $args);
            $this->line(Artisan::output());
            if ($code !== 0) {
                $this->error('Migrasi generated gagal');
                return $code;
            }
        }

        return $exitCode;
    }
}

