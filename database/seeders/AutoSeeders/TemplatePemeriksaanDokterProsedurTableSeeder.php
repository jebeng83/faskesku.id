<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterProsedurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_prosedur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_prosedur')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000001',
            'kode' => '00.55',
            'urut' => 1,
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000001',
            'kode' => '00.77',
            'urut' => 2,
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kode' => '00.02',
            'urut' => 1,
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000008',
            'kode' => '00.03',
            'urut' => 1,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}