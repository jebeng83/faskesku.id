<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntriapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antriaps')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antriaps')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'APS20241218001',
            'no_rawat' => '2024/12/17/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}