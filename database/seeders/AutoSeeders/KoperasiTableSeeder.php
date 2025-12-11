<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KoperasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('koperasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('koperasi')->insert(array (
          0 => 
          array (
            'stts' => '-',
            'wajib' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}