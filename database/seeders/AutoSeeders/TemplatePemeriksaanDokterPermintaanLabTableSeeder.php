<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterPermintaanLabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_permintaan_lab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_permintaan_lab')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kd_jenis_prw' => '102-K.2',
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}