<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DataHAITableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('data_HAIs')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('data_HAIs')->insert(array (
          0 => 
          array (
            'tanggal' => '2025-06-18',
            'no_rawat' => '2025/06/18/000001',
            'ETT' => 1,
            'CVL' => 0,
            'IVL' => 1,
            'UC' => 0,
            'VAP' => 0,
            'IAD' => 0,
            'PLEB' => 0,
            'ISK' => 0,
            'ILO' => 0,
            'HAP' => 0,
            'Tinea' => 0,
            'Scabies' => 0,
            'DEKU' => 'TIDAK',
            'SPUTUM' => '',
            'DARAH' => '',
            'URINE' => '',
            'ANTIBIOTIK' => '',
            'kd_kamar' => 'VUP.01',
          ),
          1 => 
          array (
            'tanggal' => '2025-06-30',
            'no_rawat' => '2025/06/20/000002',
            'ETT' => 1,
            'CVL' => 0,
            'IVL' => 0,
            'UC' => 0,
            'VAP' => 1,
            'IAD' => 0,
            'PLEB' => 0,
            'ISK' => 0,
            'ILO' => 0,
            'HAP' => 0,
            'Tinea' => 0,
            'Scabies' => 0,
            'DEKU' => 'TIDAK',
            'SPUTUM' => '',
            'DARAH' => '',
            'URINE' => '',
            'ANTIBIOTIK' => '',
            'kd_kamar' => 'VUP.01',
          ),
          2 => 
          array (
            'tanggal' => '2025-08-26',
            'no_rawat' => '2025/08/19/000002',
            'ETT' => 1,
            'CVL' => 0,
            'IVL' => 0,
            'UC' => 0,
            'VAP' => 0,
            'IAD' => 0,
            'PLEB' => 0,
            'ISK' => 0,
            'ILO' => 0,
            'HAP' => 0,
            'Tinea' => 0,
            'Scabies' => 0,
            'DEKU' => 'TIDAK',
            'SPUTUM' => '1',
            'DARAH' => '1',
            'URINE' => '',
            'ANTIBIOTIK' => '',
            'kd_kamar' => 'VUP.01',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}