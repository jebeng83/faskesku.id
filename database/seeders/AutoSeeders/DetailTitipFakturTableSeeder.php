<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailTitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TH20241210001',
            'no_faktur' => 'PB20241111001',
          ),
          1 => 
          array (
            'no_tagihan' => 'TH20241210001',
            'no_faktur' => 'PB20241119002',
          ),
          2 => 
          array (
            'no_tagihan' => 'TH20241210001',
            'no_faktur' => 'PB20241126001',
          ),
          3 => 
          array (
            'no_tagihan' => 'TH20250107001',
            'no_faktur' => 'PB20241210003',
          ),
          4 => 
          array (
            'no_tagihan' => 'TH20250107001',
            'no_faktur' => 'PB20241218003',
          ),
          5 => 
          array (
            'no_tagihan' => 'TH20250107001',
            'no_faktur' => 'PB20250107002',
          ),
          6 => 
          array (
            'no_tagihan' => 'TH20250121001',
            'no_faktur' => 'PB20241210004',
          ),
          7 => 
          array (
            'no_tagihan' => 'TH20250121001',
            'no_faktur' => 'PB20250115002',
          ),
          8 => 
          array (
            'no_tagihan' => 'TH20250121001',
            'no_faktur' => 'PB20250121001',
          ),
          9 => 
          array (
            'no_tagihan' => 'TH20250130001',
            'no_faktur' => 'PB20241210002',
          ),
          10 => 
          array (
            'no_tagihan' => 'TH20250130001',
            'no_faktur' => 'PB20250130001',
          ),
          11 => 
          array (
            'no_tagihan' => 'TH20250211003',
            'no_faktur' => 'PB20250211001',
          ),
          12 => 
          array (
            'no_tagihan' => 'TH20250211003',
            'no_faktur' => 'PB20250211002',
          ),
          13 => 
          array (
            'no_tagihan' => 'TH20250414001',
            'no_faktur' => 'PB20250414001',
          ),
          14 => 
          array (
            'no_tagihan' => 'TH20250414001',
            'no_faktur' => 'PB20250414002',
          ),
          15 => 
          array (
            'no_tagihan' => 'TH20250603001',
            'no_faktur' => 'PB20250603001',
          ),
          16 => 
          array (
            'no_tagihan' => 'TH20250603001',
            'no_faktur' => 'PB20250603002',
          ),
          17 => 
          array (
            'no_tagihan' => 'TH20250620001',
            'no_faktur' => 'PB20250603003',
          ),
          18 => 
          array (
            'no_tagihan' => 'TH20250620001',
            'no_faktur' => 'PB20250618002',
          ),
          19 => 
          array (
            'no_tagihan' => 'TH20250708001',
            'no_faktur' => 'PB20250628001',
          ),
          20 => 
          array (
            'no_tagihan' => 'TH20250708001',
            'no_faktur' => 'PB20250630001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}