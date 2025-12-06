<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MapingPoliklinikPcareTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('maping_poliklinik_pcare')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('maping_poliklinik_pcare')->insert(array (
          0 => 
          array (
            'kd_poli_rs' => 'U0001',
            'kd_poli_pcare' => '003',
            'nm_poli_pcare' => 'POLI KIA',
          ),
          1 => 
          array (
            'kd_poli_rs' => 'U0009',
            'kd_poli_pcare' => '001',
            'nm_poli_pcare' => 'POLI UMUM',
          ),
          2 => 
          array (
            'kd_poli_rs' => 'U0010',
            'kd_poli_pcare' => '002',
            'nm_poli_pcare' => 'POLI GIGI & MULUT',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}