<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkpDetailPenilaianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skp_detail_penilaian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skp_detail_penilaian')->insert(array (
          0 => 
          array (
            'nomor_penilaian' => 'SKP202405160001',
            'kode_kriteria' => 'KP00000001',
            'skala_penilaian' => 'Ya',
          ),
          1 => 
          array (
            'nomor_penilaian' => 'SKP202406050001',
            'kode_kriteria' => 'KP00000001',
            'skala_penilaian' => 'Tidak',
          ),
          2 => 
          array (
            'nomor_penilaian' => 'SKP202410110001',
            'kode_kriteria' => 'KP00000001',
            'skala_penilaian' => 'Ya',
          ),
          3 => 
          array (
            'nomor_penilaian' => 'SKP202406050001',
            'kode_kriteria' => 'KP00000002',
            'skala_penilaian' => 'Tidak',
          ),
          4 => 
          array (
            'nomor_penilaian' => 'SKP202410110001',
            'kode_kriteria' => 'KP00000002',
            'skala_penilaian' => 'Ya',
          ),
          5 => 
          array (
            'nomor_penilaian' => 'SKP202405160001',
            'kode_kriteria' => 'KP00000003',
            'skala_penilaian' => 'Tidak',
          ),
          6 => 
          array (
            'nomor_penilaian' => 'SKP202406050001',
            'kode_kriteria' => 'KP00000003',
            'skala_penilaian' => 'Ya',
          ),
          7 => 
          array (
            'nomor_penilaian' => 'SKP202406050001',
            'kode_kriteria' => 'KP00000004',
            'skala_penilaian' => 'Tidak',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}