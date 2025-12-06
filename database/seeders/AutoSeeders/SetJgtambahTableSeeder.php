<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetJgtambahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_jgtambah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_jgtambah')->insert(array (
          0 => 
          array (
            'tnj' => 100000.0,
            'pendidikan' => 'S1 DIREKTUR UTAMA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}