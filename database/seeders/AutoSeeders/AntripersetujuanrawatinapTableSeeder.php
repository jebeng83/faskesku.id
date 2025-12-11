<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripersetujuanrawatinapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuanrawatinap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuanrawatinap')->insert(array (
          0 => 
          array (
            'no_persetujuan' => 'PRI20250825001',
            'no_rawat' => '2025/08/25/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}