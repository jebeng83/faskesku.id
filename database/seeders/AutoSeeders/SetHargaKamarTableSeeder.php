<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetHargaKamarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_harga_kamar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_harga_kamar')->insert(array (
          0 => 
          array (
            'kd_kamar' => 'VUP.01',
            'kd_pj' => 'A19',
            'tarif' => 700000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}