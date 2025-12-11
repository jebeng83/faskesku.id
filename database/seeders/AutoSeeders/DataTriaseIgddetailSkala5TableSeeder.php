<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DataTriaseIgddetailSkala5TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igddetail_skala5')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igddetail_skala5')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/09/000002',
            'kode_skala5' => '001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/09/000002',
            'kode_skala5' => '011',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}