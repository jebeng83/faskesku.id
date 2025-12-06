<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntrilayanankedokteranfisikrehabilitasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antrilayanankedokteranfisikrehabilitasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antrilayanankedokteranfisikrehabilitasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/11/000002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}