<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripernyataanmemilihdpjpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripernyataanmemilihdpjp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripernyataanmemilihdpjp')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'DPJP20250723001',
            'no_rawat' => '2025/07/08/000001',
          ),
          1 => 
          array (
            'no_pernyataan' => 'DPJP20250804001',
            'no_rawat' => '2025/08/04/000001',
          ),
          2 => 
          array (
            'no_pernyataan' => 'DPJP20250819001',
            'no_rawat' => '2025/08/19/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}