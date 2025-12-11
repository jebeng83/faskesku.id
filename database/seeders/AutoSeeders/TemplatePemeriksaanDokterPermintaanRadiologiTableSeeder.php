<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterPermintaanRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_permintaan_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_permintaan_radiologi')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000001',
            'kd_jenis_prw' => 'IG.AS- 1',
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => 'IG.AS- 1',
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000005',
            'kd_jenis_prw' => 'IG.AS- 1',
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000006',
            'kd_jenis_prw' => 'ICU.CTO-01',
          ),
          4 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kd_jenis_prw' => 'ICU.CTO-01',
          ),
          5 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => 'ICU.CTO-01',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}