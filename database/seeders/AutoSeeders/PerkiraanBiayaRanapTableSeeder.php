<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerkiraanBiayaRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perkiraan_biaya_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perkiraan_biaya_ranap')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_penyakit' => 'A01.1',
            'tarif' => 2202900.0,
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_penyakit' => 'I50.0',
            'tarif' => 2755200.0,
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kd_penyakit' => 'R02',
            'tarif' => 4486400.0,
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'kd_penyakit' => 'I50.0',
            'tarif' => 2755200.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}