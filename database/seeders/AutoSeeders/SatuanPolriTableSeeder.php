<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuanPolriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satuan_polri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satuan_polri')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_satuan' => '101',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_satuan' => '102',
          ),
          2 => 
          array (
            'id' => 3,
            'nama_satuan' => '103',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}