<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurDetailTitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapur_detail_titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapur_detail_titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TD20241115001',
            'no_faktur' => 'PD20241115001',
          ),
          1 => 
          array (
            'no_tagihan' => 'TD20241115001',
            'no_faktur' => 'PD20241115002',
          ),
          2 => 
          array (
            'no_tagihan' => 'TD20241122001',
            'no_faktur' => 'PD20241120001',
          ),
          3 => 
          array (
            'no_tagihan' => 'TD20241122001',
            'no_faktur' => 'PD20241122002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}