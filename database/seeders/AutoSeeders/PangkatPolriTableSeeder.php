<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PangkatPolriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pangkat_polri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pangkat_polri')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_pangkat' => 'Bintang 1',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_pangkat' => 'Bintang 2',
          ),
          2 => 
          array (
            'id' => 3,
            'nama_pangkat' => 'Bintang 3',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}