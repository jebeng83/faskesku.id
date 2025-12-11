<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HarianKurangiBulananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('harian_kurangi_bulanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('harian_kurangi_bulanan')->insert(array (
          0 => 
          array (
            'harian' => 2,
            'bulanan' => 40,
          ),
          1 => 
          array (
            'harian' => 4,
            'bulanan' => 40,
          ),
          2 => 
          array (
            'harian' => 6,
            'bulanan' => 3,
          ),
          3 => 
          array (
            'harian' => 7,
            'bulanan' => 4,
          ),
          4 => 
          array (
            'harian' => 2,
            'bulanan' => 1,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}