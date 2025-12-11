<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PropinsiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('propinsi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('propinsi')->insert(array (
          0 => 
          array (
            'kd_prop' => 1,
            'nm_prop' => '-',
          ),
          1 => 
          array (
            'kd_prop' => 286,
            'nm_prop' => '-NTB',
          ),
          2 => 
          array (
            'kd_prop' => 2,
            'nm_prop' => '1',
          ),
          3 => 
          array (
            'kd_prop' => 536,
            'nm_prop' => 'ACEH',
          ),
          4 => 
          array (
            'kd_prop' => 601,
            'nm_prop' => 'BANTEN',
          ),
          5 => 
          array (
            'kd_prop' => 496,
            'nm_prop' => 'BENGKULU',
          ),
          6 => 
          array (
            'kd_prop' => 540,
            'nm_prop' => 'BENGKULU 2121212',
          ),
          7 => 
          array (
            'kd_prop' => 469,
            'nm_prop' => 'DI YOGYAKARTA',
          ),
          8 => 
          array (
            'kd_prop' => 385,
            'nm_prop' => 'DKI JAKARTA',
          ),
          9 => 
          array (
            'kd_prop' => 66,
            'nm_prop' => 'JATENG',
          ),
          10 => 
          array (
            'kd_prop' => 321,
            'nm_prop' => 'JAWA BARAT',
          ),
          11 => 
          array (
            'kd_prop' => 3,
            'nm_prop' => 'JAWA TENGAH',
          ),
          12 => 
          array (
            'kd_prop' => 207,
            'nm_prop' => 'JAWA TENGAHJL ANGGUR NO.36 RT',
          ),
          13 => 
          array (
            'kd_prop' => 267,
            'nm_prop' => 'JAWA TIMUR',
          ),
          14 => 
          array (
            'kd_prop' => 610,
            'nm_prop' => 'KALIMANTAN TENGAH',
          ),
          15 => 
          array (
            'kd_prop' => 597,
            'nm_prop' => 'KALIMANTAN TIMUR',
          ),
          16 => 
          array (
            'kd_prop' => 476,
            'nm_prop' => 'KEPULAUAN RIAU',
          ),
          17 => 
          array (
            'kd_prop' => 320,
            'nm_prop' => 'KURANJI',
          ),
          18 => 
          array (
            'kd_prop' => 359,
            'nm_prop' => 'LAMPUNG',
          ),
          19 => 
          array (
            'kd_prop' => 300,
            'nm_prop' => 'MADURA',
          ),
          20 => 
          array (
            'kd_prop' => 312,
            'nm_prop' => 'MALUKU',
          ),
          21 => 
          array (
            'kd_prop' => 268,
            'nm_prop' => 'NTB',
          ),
          22 => 
          array (
            'kd_prop' => 313,
            'nm_prop' => 'NUSA TENGGARA BARAT',
          ),
          23 => 
          array (
            'kd_prop' => 315,
            'nm_prop' => 'NUSA TENGGARA BARATT',
          ),
          24 => 
          array (
            'kd_prop' => 316,
            'nm_prop' => 'NUSA TENGGARA BARRATT',
          ),
          25 => 
          array (
            'kd_prop' => 292,
            'nm_prop' => 'PRAYA',
          ),
          26 => 
          array (
            'kd_prop' => 497,
            'nm_prop' => 'PROPINSI',
          ),
          27 => 
          array (
            'kd_prop' => 533,
            'nm_prop' => 'SDSDSDSD',
          ),
          28 => 
          array (
            'kd_prop' => 13,
            'nm_prop' => 'SUL-SEL',
          ),
          29 => 
          array (
            'kd_prop' => 48,
            'nm_prop' => 'SUL-SELBELOPA',
          ),
          30 => 
          array (
            'kd_prop' => 264,
            'nm_prop' => 'SUL-SELBELOPAJ',
          ),
          31 => 
          array (
            'kd_prop' => 43,
            'nm_prop' => 'SULSEL',
          ),
          32 => 
          array (
            'kd_prop' => 556,
            'nm_prop' => 'SUMATERA BARAT',
          ),
          33 => 
          array (
            'kd_prop' => 355,
            'nm_prop' => 'SUMATERA SELATAN',
          ),
          34 => 
          array (
            'kd_prop' => 317,
            'nm_prop' => 'YOGYAKARTA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}