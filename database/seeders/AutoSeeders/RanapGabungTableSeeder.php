<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RanapGabungTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ranap_gabung')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ranap_gabung')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'no_rawat2' => '2025/06/30/000001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/07/08/000001',
            'no_rawat2' => '2025/07/08/000002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}