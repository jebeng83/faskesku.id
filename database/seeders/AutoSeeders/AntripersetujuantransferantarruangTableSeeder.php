<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripersetujuantransferantarruangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuantransferantarruang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripersetujuantransferantarruang')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal_masuk' => '2025-08-19 13:43:19',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}