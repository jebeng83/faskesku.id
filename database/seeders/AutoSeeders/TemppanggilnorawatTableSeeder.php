<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemppanggilnorawatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('temppanggilnorawat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('temppanggilnorawat')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/25/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}