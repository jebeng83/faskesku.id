<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetWarungTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_warung')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_warung')->insert(array (
          0 => 
          array (
            'tahun' => '2019',
            'bulan' => 5,
            'pendapatan_warung' => 2000000.0,
            'persen_rs' => 50.0,
            'bagian_rs' => 1000000.0,
            'persen_kry' => 50.0,
            'bagian_kry' => 1000000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}