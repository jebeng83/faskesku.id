<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BahasaPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bahasa_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bahasa_pasien')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_bahasa' => '-',
          ),
          1 => 
          array (
            'id' => 6,
            'nama_bahasa' => 'BANJAR',
          ),
          2 => 
          array (
            'id' => 5,
            'nama_bahasa' => 'INDONESIA',
          ),
          3 => 
          array (
            'id' => 11,
            'nama_bahasa' => 'JAWA',
          ),
          4 => 
          array (
            'id' => 67,
            'nama_bahasa' => 'Luar Nagari',
          ),
          5 => 
          array (
            'id' => 2,
            'nama_bahasa' => 'MADURA',
          ),
          6 => 
          array (
            'id' => 7,
            'nama_bahasa' => 'MELAYU',
          ),
          7 => 
          array (
            'id' => 3,
            'nama_bahasa' => 'NGAPAK',
          ),
          8 => 
          array (
            'id' => 30,
            'nama_bahasa' => 'PERANCIS',
          ),
          9 => 
          array (
            'id' => 10,
            'nama_bahasa' => 'SASAK',
          ),
          10 => 
          array (
            'id' => 9,
            'nama_bahasa' => 'SUNDA BUHUN',
          ),
          11 => 
          array (
            'id' => 8,
            'nama_bahasa' => 'SUNDA JAWA',
          ),
          12 => 
          array (
            'id' => 4,
            'nama_bahasa' => 'SUROBOYOAN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}