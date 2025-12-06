<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SpesialiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('spesialis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('spesialis')->insert(array (
          0 => 
          array (
            'kd_sps' => '-',
            'nm_sps' => '-',
          ),
          1 => 
          array (
            'kd_sps' => 'S0004',
            'nm_sps' => 'Radiologi',
          ),
          2 => 
          array (
            'kd_sps' => 'S0006',
            'nm_sps' => 'Bedah',
          ),
          3 => 
          array (
            'kd_sps' => 'S0007',
            'nm_sps' => 'Syaraf',
          ),
          4 => 
          array (
            'kd_sps' => 'S0008',
            'nm_sps' => 'Anastesi',
          ),
          5 => 
          array (
            'kd_sps' => 'S0009',
            'nm_sps' => 'THT',
          ),
          6 => 
          array (
            'kd_sps' => 'S0010',
            'nm_sps' => 'Mata',
          ),
          7 => 
          array (
            'kd_sps' => 'S0011',
            'nm_sps' => 'Anak',
          ),
          8 => 
          array (
            'kd_sps' => 'S0012',
            'nm_sps' => 'Obsgyn',
          ),
          9 => 
          array (
            'kd_sps' => 'S0013',
            'nm_sps' => 'Dalam',
          ),
          10 => 
          array (
            'kd_sps' => 'S0015',
            'nm_sps' => 'Gigi dan Mulut',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}