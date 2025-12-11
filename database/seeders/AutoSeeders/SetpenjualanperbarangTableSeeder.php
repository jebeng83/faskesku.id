<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetpenjualanperbarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('setpenjualanperbarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('setpenjualanperbarang')->insert(array (
          0 => 
          array (
            'ralan' => 20.0,
            'kelas1' => 30.0,
            'kelas2' => 40.0,
            'kelas3' => 20.0,
            'utama' => 20.0,
            'vip' => 30.0,
            'vvip' => 10.0,
            'beliluar' => 20.0,
            'jualbebas' => 50.0,
            'karyawan' => 20.0,
            'kode_brng' => 'A000000002',
          ),
          1 => 
          array (
            'ralan' => 20.0,
            'kelas1' => 30.0,
            'kelas2' => 40.0,
            'kelas3' => 20.0,
            'utama' => 20.0,
            'vip' => 30.0,
            'vvip' => 10.0,
            'beliluar' => 20.0,
            'jualbebas' => 50.0,
            'karyawan' => 20.0,
            'kode_brng' => 'A000000005',
          ),
          2 => 
          array (
            'ralan' => 20.0,
            'kelas1' => 30.0,
            'kelas2' => 40.0,
            'kelas3' => 20.0,
            'utama' => 20.0,
            'vip' => 30.0,
            'vvip' => 10.0,
            'beliluar' => 20.0,
            'jualbebas' => 50.0,
            'karyawan' => 20.0,
            'kode_brng' => 'A000000014',
          ),
          3 => 
          array (
            'ralan' => 20.0,
            'kelas1' => 30.0,
            'kelas2' => 40.0,
            'kelas3' => 20.0,
            'utama' => 20.0,
            'vip' => 30.0,
            'vvip' => 10.0,
            'beliluar' => 20.0,
            'jualbebas' => 50.0,
            'karyawan' => 20.0,
            'kode_brng' => 'A000000040',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}