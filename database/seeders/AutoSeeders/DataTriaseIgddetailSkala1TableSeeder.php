<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DataTriaseIgddetailSkala1TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igddetail_skala1')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igddetail_skala1')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'kode_skala1' => '001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'kode_skala1' => '003',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'kode_skala1' => '005',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'kode_skala1' => '006',
          ),
          4 => 
          array (
            'no_rawat' => '2025/07/21/000001',
            'kode_skala1' => '001',
          ),
          5 => 
          array (
            'no_rawat' => '2025/08/11/000004',
            'kode_skala1' => '001',
          ),
          6 => 
          array (
            'no_rawat' => '2025/08/19/000003',
            'kode_skala1' => '001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}