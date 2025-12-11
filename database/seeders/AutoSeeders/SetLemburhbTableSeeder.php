<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetLemburhbTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_lemburhb')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_lemburhb')->insert(array (
          0 => 
          array (
            'tnj' => 20000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}