<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripernyataanumumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripernyataanumum')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripernyataanumum')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'PPU20250326001',
            'no_rawat' => '2025/03/26/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}