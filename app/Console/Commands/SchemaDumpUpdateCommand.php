<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SchemaDumpUpdateCommand extends Command
{
    protected $signature = 'schema:dump:update {--database=} {--tables=}';

    protected $description = 'Perbarui schema_dump.txt berdasarkan skema database aktif';

    public function handle(): int
    {
        $connection = $this->option('database') ?: config('database.default');
        try {
            $db = DB::connection($connection);
        } catch (\Throwable $e) {
            $this->error('Koneksi database gagal: '.$e->getMessage());
            return self::FAILURE;
        }

        try {
            $tablesRaw = $db->select('SHOW TABLES');
        } catch (\Throwable $e) {
            $this->error('Gagal membaca daftar tabel: '.$e->getMessage());
            return self::FAILURE;
        }

        if (empty($tablesRaw)) {
            $this->error('Tidak ada tabel yang ditemukan.');
            return self::FAILURE;
        }

        $firstRow = (array) $tablesRaw[0];
        $colName = array_key_first($firstRow);
        $allTables = array_map(function ($row) use ($colName) {
            $arr = (array) $row;
            return (string) ($arr[$colName] ?? '');
        }, $tablesRaw);

        $filter = trim((string) $this->option('tables'));
        $tables = $allTables;
        if ($filter !== '') {
            $patterns = array_map('trim', explode(',', $filter));
            $tables = array_values(array_filter($allTables, function ($t) use ($patterns) {
                foreach ($patterns as $p) {
                    if ($p === $t) {
                        return true;
                    }
                    if (str_contains($p, '*')) {
                        $regex = '/^'.str_replace(['*','?'], ['.*','.?'], preg_quote($p, '/')).'$/';
                        if (preg_match($regex, $t)) {
                            return true;
                        }
                    }
                }
                return false;
            }));
        }

        $lines = [];
        $lines[] = 'Found '.count($tables).' tables:';
        $lines[] = '';

        foreach ($tables as $table) {
            if ($table === '') {
                continue;
            }

            $lines[] = 'Table: '.$table;
            try {
                $columns = $db->select('SHOW COLUMNS FROM `'.$table.'`');
            } catch (\Throwable $e) {
                $columns = [];
            }

            foreach ($columns as $c) {
                $field = isset($c->Field) ? (string) $c->Field : '-';
                $type = isset($c->Type) ? (string) $c->Type : '-';
                $key = isset($c->Key) ? (string) $c->Key : '';
                $suffix = '';
                if ($key === 'PRI') {
                    $suffix = ' [PRI]';
                } elseif ($key === 'UNI') {
                    $suffix = ' [UNI]';
                } elseif ($key === 'MUL') {
                    $suffix = ' [MUL]';
                }
                $lines[] = '  - '.$field.' ('.$type.')'.$suffix;
            }

            try {
                $fks = $db->select(
                    'SELECT COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME '
                    .'FROM information_schema.KEY_COLUMN_USAGE '
                    .'WHERE TABLE_SCHEMA = database() AND TABLE_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL',
                    [$table]
                );
            } catch (\Throwable $e) {
                $fks = [];
            }

            if (! empty($fks)) {
                $lines[] = '  Foreign Keys:';
                foreach ($fks as $fk) {
                    $col = isset($fk->COLUMN_NAME) ? (string) $fk->COLUMN_NAME : '-';
                    $rTable = isset($fk->REFERENCED_TABLE_NAME) ? (string) $fk->REFERENCED_TABLE_NAME : '-';
                    $rCol = isset($fk->REFERENCED_COLUMN_NAME) ? (string) $fk->REFERENCED_COLUMN_NAME : '-';
                    $lines[] = '    -> '.$col.' references '.$rTable.'('.$rCol.')';
                }
            }

            $lines[] = '';
        }

        $path = base_path('schema_dump.txt');
        try {
            file_put_contents($path, implode(PHP_EOL, $lines));
        } catch (\Throwable $e) {
            $this->error('Gagal menulis file: '.$e->getMessage());
            return self::FAILURE;
        }

        $this->info('Schema dump diperbarui: '.$path);
        return self::SUCCESS;
    }
}

