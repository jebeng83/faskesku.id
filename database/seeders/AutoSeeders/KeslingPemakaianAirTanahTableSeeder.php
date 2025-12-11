<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeslingPemakaianAirTanahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kesling_pemakaian_air_tanah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kesling_pemakaian_air_tanah')->insert(array (
          0 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-06-30 14:10:47',
            'meteran' => 1023.0,
            'jumlahharian' => 36.0,
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}