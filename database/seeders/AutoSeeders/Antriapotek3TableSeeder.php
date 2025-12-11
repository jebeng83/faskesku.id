<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Antriapotek3TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antriapotek3')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antriapotek3')->insert(array (
          0 => 
          array (
            'no_resep' => '202508250002',
            'status' => '0',
            'no_rawat' => '2025/08/25/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}