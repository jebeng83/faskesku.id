<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetTuslahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_tuslah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_tuslah')->insert(array (
          0 => 
          array (
            'tahun' => '2018',
            'bulan' => 2,
            'pendapatan_tuslah' => 10000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 5000000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 5000000.0,
          ),
          1 => 
          array (
            'tahun' => '2018',
            'bulan' => 3,
            'pendapatan_tuslah' => 5000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 2500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 2500000.0,
          ),
          2 => 
          array (
            'tahun' => '2018',
            'bulan' => 12,
            'pendapatan_tuslah' => 2000000.0,
            'persen_rs' => 40.0,
            'bagian_rs' => 800000.0,
            'persen_kry' => 60.0,
            'bagian_kry' => 1200000.0,
          ),
          3 => 
          array (
            'tahun' => '2019',
            'bulan' => 5,
            'pendapatan_tuslah' => 2000000.0,
            'persen_rs' => 30.0,
            'bagian_rs' => 600000.0,
            'persen_kry' => 70.0,
            'bagian_kry' => 1400000.0,
          ),
          4 => 
          array (
            'tahun' => '2022',
            'bulan' => 8,
            'pendapatan_tuslah' => 1000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 500000.0,
          ),
          5 => 
          array (
            'tahun' => '2023',
            'bulan' => 1,
            'pendapatan_tuslah' => 15000000.0,
            'persen_rs' => 95.0,
            'bagian_rs' => 14250000.0,
            'persen_kry' => 5.0,
            'bagian_kry' => 750000.0,
          ),
          6 => 
          array (
            'tahun' => '2024',
            'bulan' => 11,
            'pendapatan_tuslah' => 2535000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1267500.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1267500.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}