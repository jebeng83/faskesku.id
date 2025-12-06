<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AsuransiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('asuransi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('asuransi')->insert(array (
          0 => 
          array (
            'stts' => 'df',
            'biaya' => 0.0,
          ),
          1 => 
          array (
            'stts' => 'T',
            'biaya' => 0.0,
          ),
          2 => 
          array (
            'stts' => 'TY',
            'biaya' => 16160.0,
          ),
          3 => 
          array (
            'stts' => 'Y+',
            'biaya' => 20000.0,
          ),
          4 => 
          array (
            'stts' => 'Y++',
            'biaya' => 30000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}