<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurdetailpesanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurdetailpesan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurdetailpesan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PD20241114001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 2.0,
            'harga' => 10000.0,
            'subtotal' => 20000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 20000.0,
          ),
          1 => 
          array (
            'no_faktur' => 'PD20241114001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 1.0,
            'harga' => 3000.0,
            'subtotal' => 3000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 3000.0,
          ),
          2 => 
          array (
            'no_faktur' => 'PD20241115001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 3.0,
            'harga' => 10000.0,
            'subtotal' => 30000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 30000.0,
          ),
          3 => 
          array (
            'no_faktur' => 'PD20241115001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 2.0,
            'harga' => 3000.0,
            'subtotal' => 6000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6000.0,
          ),
          4 => 
          array (
            'no_faktur' => 'PD20241115002',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 3.0,
            'harga' => 10000.0,
            'subtotal' => 30000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 30000.0,
          ),
          5 => 
          array (
            'no_faktur' => 'PD20241115002',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 2.0,
            'harga' => 3000.0,
            'subtotal' => 6000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6000.0,
          ),
          6 => 
          array (
            'no_faktur' => 'PD20241120001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'harga' => 10000.0,
            'subtotal' => 100000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 100000.0,
          ),
          7 => 
          array (
            'no_faktur' => 'PD20241120001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 3.0,
            'harga' => 3000.0,
            'subtotal' => 9000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 9000.0,
          ),
          8 => 
          array (
            'no_faktur' => 'PD20241122001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'harga' => 500.0,
            'subtotal' => 50000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 50000.0,
          ),
          9 => 
          array (
            'no_faktur' => 'PD20241122001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 100.0,
            'harga' => 11100.0,
            'subtotal' => 1110000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1110000.0,
          ),
          10 => 
          array (
            'no_faktur' => 'PD20241122001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'harga' => 3330.0,
            'subtotal' => 333000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 333000.0,
          ),
          11 => 
          array (
            'no_faktur' => 'PD20241122002',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'harga' => 500.0,
            'subtotal' => 50000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 50000.0,
          ),
          12 => 
          array (
            'no_faktur' => 'PD20241122002',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 100.0,
            'harga' => 11100.0,
            'subtotal' => 1110000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1110000.0,
          ),
          13 => 
          array (
            'no_faktur' => 'PD20241122002',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 90.0,
            'harga' => 3330.0,
            'subtotal' => 299700.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 299700.0,
          ),
          14 => 
          array (
            'no_faktur' => 'PD20241126001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 90.0,
            'harga' => 555.0,
            'subtotal' => 49950.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 49950.0,
          ),
          15 => 
          array (
            'no_faktur' => 'PD20241126001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 46.0,
            'harga' => 12321.0,
            'subtotal' => 566766.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 566766.0,
          ),
          16 => 
          array (
            'no_faktur' => 'PD20241126001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'harga' => 3696.3000000000001818989403545856475830078125,
            'subtotal' => 369630.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 369630.0,
          ),
          17 => 
          array (
            'no_faktur' => 'PD20250211001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 8.0,
            'harga' => 616.049999999999954525264911353588104248046875,
            'subtotal' => 4928.399999999999636202119290828704833984375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 4928.399999999999636202119290828704833984375,
          ),
          18 => 
          array (
            'no_faktur' => 'PD20250211001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 8.0,
            'harga' => 13676.309999999999490682967007160186767578125,
            'subtotal' => 109410.479999999995925463736057281494140625,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 109410.479999999995925463736057281494140625,
          ),
          19 => 
          array (
            'no_faktur' => 'PD20250211001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 7.0,
            'harga' => 4102.89300000000002910383045673370361328125,
            'subtotal' => 28720.25100000000020372681319713592529296875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 28720.25100000000020372681319713592529296875,
          ),
          20 => 
          array (
            'no_faktur' => 'PD20250708001',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 5.5,
            'harga' => 12000.0,
            'subtotal' => 66000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 66000.0,
          ),
          21 => 
          array (
            'no_faktur' => 'PD20250804001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 683.815499999999929059413261711597442626953125,
            'subtotal' => 6838.15499999999883584678173065185546875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6838.15499999999883584678173065185546875,
          ),
          22 => 
          array (
            'no_faktur' => 'PD20250804001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 8.0,
            'harga' => 15180.70409999999901629053056240081787109375,
            'subtotal' => 121445.63279999999213032424449920654296875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 121445.63279999999213032424449920654296875,
          ),
          23 => 
          array (
            'no_faktur' => 'PD20250804002',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 50.0,
            'harga' => 12000.0,
            'subtotal' => 600000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 600000.0,
          ),
          24 => 
          array (
            'no_faktur' => 'PD20250804002',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'harga' => 16850.58155099999930826015770435333251953125,
            'subtotal' => 168505.815509999985806643962860107421875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 168505.815509999985806643962860107421875,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}