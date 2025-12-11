<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetpenjualanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('setpenjualan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('setpenjualan')->insert(array (
          0 => 
          array (
            'ralan' => 10.0,
            'kelas1' => 20.0,
            'kelas2' => 20.0,
            'kelas3' => 20.0,
            'utama' => 30.0,
            'vip' => 30.0,
            'vvip' => 30.0,
            'beliluar' => 50.0,
            'jualbebas' => 50.0,
            'karyawan' => 50.0,
            'kdjns' => 'J001',
          ),
          1 => 
          array (
            'ralan' => 20.0,
            'kelas1' => 20.0,
            'kelas2' => 20.0,
            'kelas3' => 20.0,
            'utama' => 20.0,
            'vip' => 20.0,
            'vvip' => 20.0,
            'beliluar' => 30.0,
            'jualbebas' => 30.0,
            'karyawan' => 30.0,
            'kdjns' => 'J002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}