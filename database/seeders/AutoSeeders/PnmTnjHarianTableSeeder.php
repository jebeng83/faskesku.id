<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PnmTnjHarianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pnm_tnj_harian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pnm_tnj_harian')->insert(array (
          0 => 
          array (
            'id' => 112,
            'id_tnj' => 1,
          ),
          1 => 
          array (
            'id' => 112,
            'id_tnj' => 2,
          ),
          2 => 
          array (
            'id' => 112,
            'id_tnj' => 3,
          ),
          3 => 
          array (
            'id' => 116,
            'id_tnj' => 4,
          ),
          4 => 
          array (
            'id' => 128,
            'id_tnj' => 2,
          ),
          5 => 
          array (
            'id' => 128,
            'id_tnj' => 3,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}