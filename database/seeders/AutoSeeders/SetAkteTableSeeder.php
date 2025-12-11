<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkteTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akte')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akte')->insert(array (
          0 => 
          array (
            'tahun' => '2018',
            'bulan' => 2,
            'pendapatan_akte' => 10000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 5000000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 5000000.0,
          ),
          1 => 
          array (
            'tahun' => '2018',
            'bulan' => 3,
            'pendapatan_akte' => 3000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1500000.0,
          ),
          2 => 
          array (
            'tahun' => '2018',
            'bulan' => 9,
            'pendapatan_akte' => 5000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 2500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 2500000.0,
          ),
          3 => 
          array (
            'tahun' => '2018',
            'bulan' => 12,
            'pendapatan_akte' => 3000000.0,
            'persen_rs' => 40.0,
            'bagian_rs' => 1200000.0,
            'persen_kry' => 60.0,
            'bagian_kry' => 1800000.0,
          ),
          4 => 
          array (
            'tahun' => '2019',
            'bulan' => 3,
            'pendapatan_akte' => 1000000.0,
            'persen_rs' => 30.0,
            'bagian_rs' => 300000.0,
            'persen_kry' => 70.0,
            'bagian_kry' => 700000.0,
          ),
          5 => 
          array (
            'tahun' => '2019',
            'bulan' => 5,
            'pendapatan_akte' => 5000000.0,
            'persen_rs' => 40.0,
            'bagian_rs' => 2000000.0,
            'persen_kry' => 60.0,
            'bagian_kry' => 3000000.0,
          ),
          6 => 
          array (
            'tahun' => '2019',
            'bulan' => 6,
            'pendapatan_akte' => 5000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 2500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 2500000.0,
          ),
          7 => 
          array (
            'tahun' => '2020',
            'bulan' => 2,
            'pendapatan_akte' => 4000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 2000000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 2000000.0,
          ),
          8 => 
          array (
            'tahun' => '2020',
            'bulan' => 3,
            'pendapatan_akte' => 3000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1500000.0,
          ),
          9 => 
          array (
            'tahun' => '2020',
            'bulan' => 10,
            'pendapatan_akte' => 3000000.0,
            'persen_rs' => 30.0,
            'bagian_rs' => 900000.0,
            'persen_kry' => 70.0,
            'bagian_kry' => 2100000.0,
          ),
          10 => 
          array (
            'tahun' => '2021',
            'bulan' => 5,
            'pendapatan_akte' => 5000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 2500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 2500000.0,
          ),
          11 => 
          array (
            'tahun' => '2022',
            'bulan' => 8,
            'pendapatan_akte' => 3000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1500000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}