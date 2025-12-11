<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestHasilLab extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:hasil-lab {no_rawat} {kd_jenis_prw?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test query hasil laboratorium berdasarkan no_rawat dan kd_jenis_prw';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $noRawat = $this->argument('no_rawat');
        $kdJenisPrw = $this->argument('kd_jenis_prw');

        $this->info('=== Test Hasil Laboratorium ===');
        $this->info("No. Rawat: {$noRawat}");
        if ($kdJenisPrw) {
            $this->info("Kd. Jenis Prw: {$kdJenisPrw}");
        }
        $this->newLine();

        // Query 1: Cek semua data di detail_periksa_lab
        $this->info('1. Semua data di detail_periksa_lab:');
        $allData = DB::table('detail_periksa_lab')
            ->where('no_rawat', $noRawat)
            ->when($kdJenisPrw, function ($query) use ($kdJenisPrw) {
                return $query->where('kd_jenis_prw', $kdJenisPrw);
            })
            ->whereNotNull('nilai')
            ->where('nilai', '!=', '')
            ->orderBy('tgl_periksa', 'desc')
            ->orderBy('jam', 'desc')
            ->get();

        $this->table(
            ['ID', 'No Rawat', 'Kd Jenis Prw', 'ID Template', 'Tgl Periksa', 'Jam', 'Nilai'],
            $allData->map(function ($item) {
                return [
                    $item->id,
                    $item->no_rawat,
                    $item->kd_jenis_prw,
                    $item->id_template,
                    $item->tgl_periksa,
                    $item->jam,
                    substr($item->nilai ?? '', 0, 30),
                ];
            })
        );
        $this->info('Total: '.$allData->count());
        $this->newLine();

        // Query 2: Cek duplikasi berdasarkan id_template
        $this->info('2. Cek duplikasi berdasarkan id_template:');
        $duplikasi = DB::table('detail_periksa_lab')
            ->where('no_rawat', $noRawat)
            ->when($kdJenisPrw, function ($query) use ($kdJenisPrw) {
                return $query->where('kd_jenis_prw', $kdJenisPrw);
            })
            ->whereNotNull('nilai')
            ->where('nilai', '!=', '')
            ->select('id_template', DB::raw('COUNT(*) as jumlah'))
            ->groupBy('id_template')
            ->having('jumlah', '>', 1)
            ->get();

        if ($duplikasi->isEmpty()) {
            $this->info('✓ Tidak ada duplikasi berdasarkan id_template');
        } else {
            $this->warn('⚠ Ditemukan duplikasi:');
            $this->table(
                ['ID Template', 'Jumlah'],
                $duplikasi->map(function ($item) {
                    return [$item->id_template, $item->jumlah];
                })
            );
        }
        $this->newLine();

        // Query 3: Query dengan join template (seperti di controller)
        $this->info('3. Query dengan join template_laboratorium:');
        $queryWithJoin = DB::table('detail_periksa_lab')
            ->join('template_laboratorium', 'detail_periksa_lab.id_template', '=', 'template_laboratorium.id_template')
            ->where('detail_periksa_lab.no_rawat', $noRawat)
            ->when($kdJenisPrw, function ($query) use ($kdJenisPrw) {
                return $query->where('detail_periksa_lab.kd_jenis_prw', $kdJenisPrw);
            })
            ->whereNotNull('detail_periksa_lab.nilai')
            ->where('detail_periksa_lab.nilai', '!=', '')
            ->select(
                'detail_periksa_lab.id',
                'detail_periksa_lab.id_template',
                'detail_periksa_lab.nilai',
                'detail_periksa_lab.tgl_periksa',
                'detail_periksa_lab.jam',
                'template_laboratorium.Pemeriksaan as pemeriksaan'
            )
            ->orderBy('detail_periksa_lab.tgl_periksa', 'desc')
            ->orderBy('detail_periksa_lab.jam', 'desc')
            ->get();

        $this->table(
            ['ID', 'ID Template', 'Pemeriksaan', 'Tgl Periksa', 'Jam', 'Nilai'],
            $queryWithJoin->map(function ($item) {
                return [
                    $item->id,
                    $item->id_template,
                    substr($item->pemeriksaan ?? '', 0, 30),
                    $item->tgl_periksa,
                    $item->jam,
                    substr($item->nilai ?? '', 0, 20),
                ];
            })
        );
        $this->info('Total sebelum unique: '.$queryWithJoin->count());
        $this->newLine();

        // Query 4: Query dengan unique berdasarkan id_template
        $this->info('4. Query setelah unique berdasarkan id_template:');
        $uniqueResults = $queryWithJoin->unique('id_template')->values();
        $this->table(
            ['ID', 'ID Template', 'Pemeriksaan', 'Tgl Periksa', 'Jam', 'Nilai'],
            $uniqueResults->map(function ($item) {
                return [
                    $item->id,
                    $item->id_template,
                    substr($item->pemeriksaan ?? '', 0, 30),
                    $item->tgl_periksa,
                    $item->jam,
                    substr($item->nilai ?? '', 0, 20),
                ];
            })
        );
        $this->info('Total setelah unique: '.$uniqueResults->count());
        $this->newLine();

        // Query 5: Query dengan subquery MAX(id) untuk setiap id_template
        $this->info('5. Query dengan subquery MAX(id) untuk setiap id_template:');
        $subqueryResults = DB::table('detail_periksa_lab')
            ->join('template_laboratorium', 'detail_periksa_lab.id_template', '=', 'template_laboratorium.id_template')
            ->where('detail_periksa_lab.no_rawat', $noRawat)
            ->when($kdJenisPrw, function ($query) use ($kdJenisPrw) {
                return $query->where('detail_periksa_lab.kd_jenis_prw', $kdJenisPrw);
            })
            ->whereNotNull('detail_periksa_lab.nilai')
            ->where('detail_periksa_lab.nilai', '!=', '')
            ->whereIn(DB::raw('detail_periksa_lab.id'), function ($subquery) use ($noRawat, $kdJenisPrw) {
                $subquery->select(DB::raw('MAX(id)'))
                    ->from('detail_periksa_lab')
                    ->where('no_rawat', $noRawat)
                    ->when($kdJenisPrw, function ($q) use ($kdJenisPrw) {
                        return $q->where('kd_jenis_prw', $kdJenisPrw);
                    })
                    ->whereNotNull('nilai')
                    ->where('nilai', '!=', '')
                    ->groupBy('id_template', 'tgl_periksa', 'jam');
            })
            ->select(
                'detail_periksa_lab.id',
                'detail_periksa_lab.id_template',
                'detail_periksa_lab.nilai',
                'detail_periksa_lab.tgl_periksa',
                'detail_periksa_lab.jam',
                'template_laboratorium.Pemeriksaan as pemeriksaan'
            )
            ->orderBy('detail_periksa_lab.tgl_periksa', 'desc')
            ->orderBy('detail_periksa_lab.jam', 'desc')
            ->distinct()
            ->get();

        $this->table(
            ['ID', 'ID Template', 'Pemeriksaan', 'Tgl Periksa', 'Jam', 'Nilai'],
            $subqueryResults->map(function ($item) {
                return [
                    $item->id,
                    $item->id_template,
                    substr($item->pemeriksaan ?? '', 0, 30),
                    $item->tgl_periksa,
                    $item->jam,
                    substr($item->nilai ?? '', 0, 20),
                ];
            })
        );
        $this->info('Total dengan subquery: '.$subqueryResults->count());
        $this->newLine();

        return Command::SUCCESS;
    }
}
