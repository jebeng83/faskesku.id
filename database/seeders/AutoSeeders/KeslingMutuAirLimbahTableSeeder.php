<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeslingMutuAirLimbahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kesling_mutu_air_limbah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kesling_mutu_air_limbah')->insert(array (
          0 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-06-30 14:13:29',
            'meteran' => 1200.0,
            'jumlahharian' => 30.0,
            'ph' => 7.0,
            'suhu' => 60.0,
            'tds' => 67.0,
            'ec' => 45.0,
            'salt' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}