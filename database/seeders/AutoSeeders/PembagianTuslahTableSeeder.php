<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PembagianTuslahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pembagian_tuslah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pembagian_tuslah')->insert(array (
          0 => 
          array (
            'id' => 111,
            'persen' => 5.0,
          ),
          1 => 
          array (
            'id' => 128,
            'persen' => 10.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}