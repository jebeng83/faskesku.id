<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPermintaanResepPulangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_resep_pulang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_resep_pulang')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'RP202508190001',
            'kode_brng' => 'B000000556',
            'jml' => 10.0,
            'dosis' => '2 x 1',
          ),
          1 => 
          array (
            'no_permintaan' => 'RP202508190001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'dosis' => '3 x 1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}