<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TokosethargaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tokosetharga')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tokosetharga')->insert(array (
          0 => 
          array (
            'distributor' => 20.0,
            'grosir' => 30.0,
            'retail' => 40.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}