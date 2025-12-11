<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JgmlmTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jgmlm')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jgmlm')->insert(array (
          0 => 
          array (
            'tgl' => '2022-05-01',
            'id' => 112,
            'jml' => 4,
          ),
          1 => 
          array (
            'tgl' => '2022-05-01',
            'id' => 114,
            'jml' => 10,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}