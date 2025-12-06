<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetInsentifTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_insentif')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_insentif')->insert(array (
          0 => 
          array (
            'tahun' => '2021',
            'bulan' => 8,
            'pendapatan' => 3000000000.0,
            'persen' => 10.0,
            'total_insentif' => 300000000.0,
          ),
          1 => 
          array (
            'tahun' => '2022',
            'bulan' => 1,
            'pendapatan' => 1000000000.0,
            'persen' => 40.0,
            'total_insentif' => 400000000.0,
          ),
          2 => 
          array (
            'tahun' => '2022',
            'bulan' => 3,
            'pendapatan' => 300000000.0,
            'persen' => 20.0,
            'total_insentif' => 60000000.0,
          ),
          3 => 
          array (
            'tahun' => '2022',
            'bulan' => 5,
            'pendapatan' => 7000000000.0,
            'persen' => 5.0,
            'total_insentif' => 350000000.0,
          ),
          4 => 
          array (
            'tahun' => '2022',
            'bulan' => 8,
            'pendapatan' => 7000000000.0,
            'persen' => 5.0,
            'total_insentif' => 350000000.0,
          ),
          5 => 
          array (
            'tahun' => '2022',
            'bulan' => 11,
            'pendapatan' => 6000000000.0,
            'persen' => 5.0,
            'total_insentif' => 300000000.0,
          ),
          6 => 
          array (
            'tahun' => '2022',
            'bulan' => 12,
            'pendapatan' => 600000000.0,
            'persen' => 100.0,
            'total_insentif' => 600000000.0,
          ),
          7 => 
          array (
            'tahun' => '2023',
            'bulan' => 1,
            'pendapatan' => 125000000.0,
            'persen' => 100.0,
            'total_insentif' => 125000000.0,
          ),
          8 => 
          array (
            'tahun' => '2024',
            'bulan' => 9,
            'pendapatan' => 3000000000.0,
            'persen' => 4.0,
            'total_insentif' => 120000000.0,
          ),
          9 => 
          array (
            'tahun' => '2024',
            'bulan' => 10,
            'pendapatan' => 5000000000.0,
            'persen' => 20.0,
            'total_insentif' => 1000000000.0,
          ),
          10 => 
          array (
            'tahun' => '2024',
            'bulan' => 11,
            'pendapatan' => 1000000000.0,
            'persen' => 5.0,
            'total_insentif' => 50000000.0,
          ),
          11 => 
          array (
            'tahun' => '2025',
            'bulan' => 5,
            'pendapatan' => 200000000.0,
            'persen' => 100.0,
            'total_insentif' => 200000000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}