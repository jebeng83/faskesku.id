<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterResepTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_resep')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_resep')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kode_brng' => 'B000000305',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kode_brng' => 'B000000560',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}