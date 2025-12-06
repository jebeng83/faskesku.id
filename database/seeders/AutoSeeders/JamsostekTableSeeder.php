<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JamsostekTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jamsostek')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jamsostek')->insert(array (
          0 => 
          array (
            'stts' => 'T',
            'biaya' => 0.0,
          ),
          1 => 
          array (
            'stts' => 'Y+',
            'biaya' => 20000.0,
          ),
          2 => 
          array (
            'stts' => 'Y',
            'biaya' => 22540.0,
          ),
          3 => 
          array (
            'stts' => 'Y++',
            'biaya' => 30000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}