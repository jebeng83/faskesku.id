<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DescribePcarePendaftaran extends Command
{
    protected $signature = 'pcare:describe-pendaftaran {--json : Output as JSON} {--sample=10 : Jumlah baris contoh yang ditampilkan}';

    protected $description = 'Cek keberadaan, tampilkan struktur kolom & index, serta contoh data untuk tabel pcare_pendaftaran';

    public function handle(): int
    {
        if (! Schema::hasTable('pcare_pendaftaran')) {
            $this->error('Tabel `pcare_pendaftaran` tidak ditemukan. Jalankan migrasi atau cek koneksi database.');

            return self::FAILURE;
        }

        // Describe columns
        try {
            $columns = DB::select('SHOW COLUMNS FROM `pcare_pendaftaran`');
        } catch (\Throwable $e) {
            $this->error('Gagal DESCRIBE kolom: '.$e->getMessage());

            return self::FAILURE;
        }

        // Describe indexes
        try {
            $indexes = DB::select('SHOW INDEX FROM `pcare_pendaftaran`');
        } catch (\Throwable $e) {
            $indexes = [];
        }

        // Row count
        $count = 0;
        try {
            $count = DB::table('pcare_pendaftaran')->count();
        } catch (\Throwable $e) {
            // ignore
        }

        // Sample rows
        $sampleLimit = max(0, (int) $this->option('sample'));
        $rows = [];
        if ($sampleLimit > 0) {
            try {
                $rows = DB::table('pcare_pendaftaran')
                    ->orderByDesc('tglDaftar')
                    ->orderByDesc('noUrut')
                    ->limit($sampleLimit)
                    ->get();
            } catch (\Throwable $e) {
                // ignore
            }
        }

        if ($this->option('json')) {
            $out = [
                'exists' => true,
                'count' => $count,
                'columns' => $columns,
                'indexes' => $indexes,
                'sample' => $rows,
            ];
            $this->line(json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            return self::SUCCESS;
        }

        $this->info('Tabel: pcare_pendaftaran');
        $this->line('Total rows: '.$count);

        $this->newLine();
        $this->info('DESCRIBE Columns');
        $this->table(
            ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'],
            array_map(function ($c) {
                return [
                    $c->Field ?? '-',
                    $c->Type ?? '-',
                    $c->Null ?? '-',
                    $c->Key ?? '-',
                    is_null($c->Default) ? 'NULL' : (string) $c->Default,
                    $c->Extra ?? '-',
                ];
            }, $columns)
        );

        if (! empty($indexes)) {
            $this->newLine();
            $this->info('Indexes');
            $this->table(
                ['Key_name', 'Column_name', 'Non_unique', 'Seq_in_index', 'Index_type'],
                array_map(function ($i) {
                    return [
                        $i->Key_name ?? '-',
                        $i->Column_name ?? '-',
                        isset($i->Non_unique) ? (string) $i->Non_unique : '-',
                        isset($i->Seq_in_index) ? (string) $i->Seq_in_index : '-',
                        $i->Index_type ?? '-',
                    ];
                }, $indexes)
            );
        }

        if (! empty($rows)) {
            $this->newLine();
            $this->info('Sample Rows ('.$sampleLimit.')');
            $rowsArr = is_array($rows) ? $rows : (method_exists($rows, 'all') ? $rows->all() : []);
            $this->table(
                ['tglDaftar', 'noUrut', 'no_rawat', 'no_rkm_medis', 'nm_pasien', 'kdPoli', 'nmPoli', 'status'],
                array_map(function ($r) {
                    return [
                        (string) ($r->tglDaftar ?? ''),
                        (string) ($r->noUrut ?? ''),
                        (string) ($r->no_rawat ?? ''),
                        (string) ($r->no_rkm_medis ?? ''),
                        (string) ($r->nm_pasien ?? ''),
                        (string) ($r->kdPoli ?? ''),
                        (string) ($r->nmPoli ?? ''),
                        (string) ($r->status ?? ''),
                    ];
                }, $rowsArr)
            );
        }

        return self::SUCCESS;
    }
}
