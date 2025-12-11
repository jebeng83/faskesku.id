<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TokojenisbarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tokojenisbarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tokojenisbarang')->insert(array (
          0 => 
          array (
            'kd_jenis' => 'J01',
            'nm_jenis' => 'FOOD',
          ),
          1 => 
          array (
            'kd_jenis' => 'J02',
            'nm_jenis' => 'SUPLEMEN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}