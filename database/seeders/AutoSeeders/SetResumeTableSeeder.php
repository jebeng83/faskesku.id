<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetResumeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_resume')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_resume')->insert(array (
          0 => 
          array (
            'tahun' => '2018',
            'bulan' => 2,
            'pendapatan_resume' => 1000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 500000.0,
          ),
          1 => 
          array (
            'tahun' => '2018',
            'bulan' => 3,
            'pendapatan_resume' => 2000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1000000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1000000.0,
          ),
          2 => 
          array (
            'tahun' => '2018',
            'bulan' => 12,
            'pendapatan_resume' => 2000000.0,
            'persen_rs' => 40.0,
            'bagian_rs' => 800000.0,
            'persen_kry' => 60.0,
            'bagian_kry' => 1200000.0,
          ),
          3 => 
          array (
            'tahun' => '2019',
            'bulan' => 5,
            'pendapatan_resume' => 2000000.0,
            'persen_rs' => 30.0,
            'bagian_rs' => 600000.0,
            'persen_kry' => 70.0,
            'bagian_kry' => 1400000.0,
          ),
          4 => 
          array (
            'tahun' => '2020',
            'bulan' => 10,
            'pendapatan_resume' => 4000000.0,
            'persen_rs' => 30.0,
            'bagian_rs' => 1200000.0,
            'persen_kry' => 70.0,
            'bagian_kry' => 2800000.0,
          ),
          5 => 
          array (
            'tahun' => '2021',
            'bulan' => 5,
            'pendapatan_resume' => 2000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1000000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1000000.0,
          ),
          6 => 
          array (
            'tahun' => '2022',
            'bulan' => 8,
            'pendapatan_resume' => 6000000.0,
            'persen_rs' => 30.0,
            'bagian_rs' => 1800000.0,
            'persen_kry' => 70.0,
            'bagian_kry' => 4200000.0,
          ),
          7 => 
          array (
            'tahun' => '2022',
            'bulan' => 11,
            'pendapatan_resume' => 3000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1500000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1500000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}