<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JasaLainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jasa_lain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jasa_lain')->insert(array (
          0 => 
          array (
            'thn' => '2022',
            'bln' => 8,
            'id' => 114,
            'bsr_jasa' => 200000.0,
            'ktg' => 'JASA PANITIA AGUSTUS',
          ),
          1 => 
          array (
            'thn' => '2024',
            'bln' => 11,
            'id' => 115,
            'bsr_jasa' => 100000.0,
            'ktg' => 'kegiatan workhsop',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}