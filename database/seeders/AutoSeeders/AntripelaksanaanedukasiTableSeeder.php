<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripelaksanaanedukasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripelaksanaanedukasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripelaksanaanedukasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal' => '2025-08-19 13:31:21',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}