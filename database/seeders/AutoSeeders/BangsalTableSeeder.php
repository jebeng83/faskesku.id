<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BangsalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bangsal')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bangsal')->insert(array (
          0 => 
          array (
            'kd_bangsal' => '-',
            'nm_bangsal' => '-',
            'status' => '1',
          ),
          1 => 
          array (
            'kd_bangsal' => 'AP',
            'nm_bangsal' => 'Apotek',
            'status' => '1',
          ),
          2 => 
          array (
            'kd_bangsal' => 'B0014',
            'nm_bangsal' => 'LABORAT',
            'status' => '1',
          ),
          3 => 
          array (
            'kd_bangsal' => 'GD',
            'nm_bangsal' => 'GUDANG',
            'status' => '1',
          ),
          4 => 
          array (
            'kd_bangsal' => 'HCU',
            'nm_bangsal' => 'HCU',
            'status' => '1',
          ),
          5 => 
          array (
            'kd_bangsal' => 'ICU',
            'nm_bangsal' => 'Kamar ICU',
            'status' => '1',
          ),
          6 => 
          array (
            'kd_bangsal' => 'IGD',
            'nm_bangsal' => 'IGD',
            'status' => '1',
          ),
          7 => 
          array (
            'kd_bangsal' => 'K1',
            'nm_bangsal' => 'Kamar Kelas I',
            'status' => '1',
          ),
          8 => 
          array (
            'kd_bangsal' => 'K2',
            'nm_bangsal' => 'Kamar Kelas II',
            'status' => '1',
          ),
          9 => 
          array (
            'kd_bangsal' => 'K3',
            'nm_bangsal' => 'Kamar Kelas III',
            'status' => '1',
          ),
          10 => 
          array (
            'kd_bangsal' => 'KO',
            'nm_bangsal' => 'Kamar Operasi',
            'status' => '1',
          ),
          11 => 
          array (
            'kd_bangsal' => 'NICU',
            'nm_bangsal' => 'Kamar NICU',
            'status' => '1',
          ),
          12 => 
          array (
            'kd_bangsal' => 'VIP',
            'nm_bangsal' => 'Kamar Kelas VIP',
            'status' => '1',
          ),
          13 => 
          array (
            'kd_bangsal' => 'VVIP',
            'nm_bangsal' => 'Kamar Kelas VVIP',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}