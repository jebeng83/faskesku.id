<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class MigrateSmart extends Command
{
    protected $signature = 'migrate:smart
        {--database= : Nama koneksi database Laravel}
        {--force : Paksa eksekusi pada production}
        {--seed : Jalankan seeder setelah migrasi}
        {--generated-path=database/migrations/generated : Direktori migrasi generated}';

    protected $description = 'Jalankan migrasi cerdas: DB kosong → impor lengkap; DB existing → sinkronisasi & tambah tabel baru';

    public function handle(): int
    {
        $connection = $this->option('database') ?: config('database.default');
        $force = (bool) $this->option('force');
        $seed = (bool) $this->option('seed');
        $generatedPath = (string) $this->option('generated-path') ?: 'database/migrations/generated';

        try {
            $db = DB::connection($connection);
        } catch (\Throwable $e) {
            $this->error('Gagal membuka koneksi database: '.$e->getMessage());
            return self::FAILURE;
        }

        try {
            $tablesRaw = $db->select('SHOW TABLES');
        } catch (\Throwable $e) {
            $this->error('Gagal membaca daftar tabel: '.$e->getMessage());
            return self::FAILURE;
        }

        $firstRow = isset($tablesRaw[0]) ? (array) $tablesRaw[0] : [];
        $colName = $firstRow ? array_key_first($firstRow) : null;
        $tables = $colName
            ? array_map(function ($row) use ($colName) { $arr = (array) $row; return (string) ($arr[$colName] ?? ''); }, $tablesRaw)
            : [];
        $nonSystemTables = array_values(array_filter($tables, fn ($t) => $t !== '' && $t !== 'migrations'));
        $isEmpty = count($nonSystemTables) === 0;

        if ($isEmpty) {
            $this->info('Database kosong: menjalankan impor lengkap (base + generated).');
            try {
                $code = Artisan::call('migrate:all-tables', array_filter([
                    '--database' => $connection,
                    '--force' => $force,
                    '--seed' => $seed,
                    '--path' => $generatedPath,
                ]));
                $this->line(Artisan::output());
                if ($code !== 0) {
                    $this->error('Migrasi semua tabel gagal dengan kode: '.$code);
                    return $code;
                }
            } catch (\Throwable $e) {
                $this->error('Migrasi semua tabel exception: '.$e->getMessage());
                return self::FAILURE;
            }
            if ($seed) {
                try {
                    $this->info('Menjalankan seeder...');
                    Artisan::call('db:seed', array_filter(['--database' => $connection, '--force' => $force]));
                    $this->line(Artisan::output());
                } catch (\Throwable $e) {
                    $this->warn('Seeder gagal: '.$e->getMessage());
                }
            }
            $this->info('Impor lengkap selesai.');
            return self::SUCCESS;
        }

        $this->info('Database sudah memiliki tabel: menjalankan sinkronisasi dan impor tabel baru.');
        try {
            $code = Artisan::call('migrate:all-tables', array_filter([
                '--database' => $connection,
                '--force' => $force,
                '--path' => $generatedPath,
            ]));
            $this->line(Artisan::output());
            if ($code !== 0) {
                $this->warn('Sinkronisasi selesai dengan beberapa peringatan (kode: '.$code.').');
            }
        } catch (\Throwable $e) {
            $this->error('Sinkronisasi exception: '.$e->getMessage());
            return self::FAILURE;
        }

        if ($seed) {
            try {
                $this->info('Menjalankan seeder...');
                Artisan::call('db:seed', array_filter(['--database' => $connection, '--force' => $force]));
                $this->line(Artisan::output());
            } catch (\Throwable $e) {
                $this->warn('Seeder gagal: '.$e->getMessage());
            }
        }

        $this->info('Sinkronisasi selesai. Tabel baru diimpor, struktur lama disejajarkan oleh alter migrations.');
        return self::SUCCESS;
    }
}

