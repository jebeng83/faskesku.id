<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripemulanganTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripemulangan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripemulangan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}