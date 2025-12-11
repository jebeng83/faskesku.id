<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsDetailTitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrs_detail_titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrs_detail_titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TN20250130001',
            'no_faktur' => 'PNM20250123001',
          ),
          1 => 
          array (
            'no_tagihan' => 'TN20250130001',
            'no_faktur' => 'PNM20250130001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}