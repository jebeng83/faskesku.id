<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IndexinTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('indexins')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('indexins')->insert(array (
          0 => 
          array (
            'dep_id' => '-',
            'persen' => 1.0,
          ),
          1 => 
          array (
            'dep_id' => 'IGD',
            'persen' => 10.0,
          ),
          2 => 
          array (
            'dep_id' => 'OK',
            'persen' => 10.0,
          ),
          3 => 
          array (
            'dep_id' => 'RJ',
            'persen' => 20.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}