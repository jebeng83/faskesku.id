<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResepLuarObatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resep_luar_obat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resep_luar_obat')->insert(array (
          0 => 
          array (
            'no_resep' => 'RL20250705001',
            'kode_brng' => 'B000001294',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          1 => 
          array (
            'no_resep' => 'RL20250804001',
            'kode_brng' => 'B000000560',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          2 => 
          array (
            'no_resep' => 'RL20250826001',
            'kode_brng' => '2018001',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          3 => 
          array (
            'no_resep' => 'RL20250826001',
            'kode_brng' => 'B000001207',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}