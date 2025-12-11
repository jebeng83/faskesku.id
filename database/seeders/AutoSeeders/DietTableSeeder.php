<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DietTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('diet')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('diet')->insert(array (
          0 => 
          array (
            'kd_diet' => 'D04',
            'nama_diet' => 'bubur',
          ),
          1 => 
          array (
            'kd_diet' => 'D01',
            'nama_diet' => 'DM',
          ),
          2 => 
          array (
            'kd_diet' => 'D02',
            'nama_diet' => 'RG',
          ),
          3 => 
          array (
            'kd_diet' => 'D03',
            'nama_diet' => 'TKTP',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}