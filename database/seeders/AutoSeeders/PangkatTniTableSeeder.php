<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PangkatTniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pangkat_tni')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pangkat_tni')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_pangkat' => 'KOPRAL',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_pangkat' => 'KOMANDAN',
          ),
          2 => 
          array (
            'id' => 3,
            'nama_pangkat' => 'JENDRAL',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}