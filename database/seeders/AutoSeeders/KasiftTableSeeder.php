<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KasiftTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kasift')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kasift')->insert(array (
          0 => 
          array (
            'id' => 112,
            'jmlks' => 6,
            'bsr' => 100000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}