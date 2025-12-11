<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ParkirJeniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('parkir_jenis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('parkir_jenis')->insert(array (
          0 => 
          array (
            'kd_parkir' => 'P0001',
            'jns_parkir' => 'Parkir Motor Umum',
            'biaya' => 1000.0,
            'jenis' => 'Harian',
          ),
          1 => 
          array (
            'kd_parkir' => 'P0002',
            'jns_parkir' => 'Parkir Mobil Umum',
            'biaya' => 2000.0,
            'jenis' => 'Harian',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}