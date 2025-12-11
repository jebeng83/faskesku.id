<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuanTniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satuan_tni')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satuan_tni')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_satuan' => 'Kesdam Jaya',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_satuan' => 'Siliwangi',
          ),
          2 => 
          array (
            'id' => 4,
            'nama_satuan' => 'Diponegoro',
          ),
          3 => 
          array (
            'id' => 5,
            'nama_satuan' => 'Brawijaya',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}