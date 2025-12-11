<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripersetujuanumumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuanumum')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuanumum')->insert(array (
          0 => 
          array (
            'no_surat' => 'PSU20250826001',
            'no_rawat' => '2025/08/26/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}