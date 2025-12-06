<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PnmTnjBulananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pnm_tnj_bulanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pnm_tnj_bulanan')->insert(array (
          0 => 
          array (
            'id' => 112,
            'id_tnj' => 2,
          ),
          1 => 
          array (
            'id' => 112,
            'id_tnj' => 3,
          ),
          2 => 
          array (
            'id' => 112,
            'id_tnj' => 5,
          ),
          3 => 
          array (
            'id' => 115,
            'id_tnj' => 3,
          ),
          4 => 
          array (
            'id' => 115,
            'id_tnj' => 5,
          ),
          5 => 
          array (
            'id' => 118,
            'id_tnj' => 3,
          ),
          6 => 
          array (
            'id' => 118,
            'id_tnj' => 4,
          ),
          7 => 
          array (
            'id' => 118,
            'id_tnj' => 5,
          ),
          8 => 
          array (
            'id' => 128,
            'id_tnj' => 2,
          ),
          9 => 
          array (
            'id' => 128,
            'id_tnj' => 4,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}