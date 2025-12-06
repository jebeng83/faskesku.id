<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripersetujuanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuan')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'PM20250819002',
            'no_rawat' => '2025/08/19/000002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}