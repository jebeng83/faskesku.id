<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KonverSatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('konver_sat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('konver_sat')->insert(array (
          0 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'BOX',
            'nilai_konversi' => 30.0,
            'sat_konversi' => 'AMP5',
          ),
          1 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'BOX',
            'nilai_konversi' => 30.0,
            'sat_konversi' => 'CAP',
          ),
          2 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'BOX',
            'nilai_konversi' => 60.0,
            'sat_konversi' => 'AMP5',
          ),
          3 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'BOX',
            'nilai_konversi' => 100.0,
            'sat_konversi' => 'TAB',
          ),
          4 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'BOX',
            'nilai_konversi' => 200.0,
            'sat_konversi' => 'AMP5',
          ),
          5 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'BOX',
            'nilai_konversi' => 300.0,
            'sat_konversi' => 'AMP5',
          ),
          6 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'CAP',
            'nilai_konversi' => 100.0,
            'sat_konversi' => 'BKS',
          ),
          7 => 
          array (
            'nilai' => 1.0,
            'kode_sat' => 'S02',
            'nilai_konversi' => 10.0,
            'sat_konversi' => 'S01',
          ),
          8 => 
          array (
            'nilai' => 10.0,
            'kode_sat' => '-',
            'nilai_konversi' => 1.0,
            'sat_konversi' => 'S02',
          ),
          9 => 
          array (
            'nilai' => 10.0,
            'kode_sat' => 'AMP5',
            'nilai_konversi' => 1.0,
            'sat_konversi' => 'BOX',
          ),
          10 => 
          array (
            'nilai' => 100.0,
            'kode_sat' => 'TAB',
            'nilai_konversi' => 1.0,
            'sat_konversi' => 'BOX',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}