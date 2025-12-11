<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsdetailpesanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsdetailpesan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsdetailpesan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PNM20241113001',
            'kode_brng' => 'B00007',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 184815.0,
            'subtotal' => 1848150.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1848150.0,
          ),
          1 => 
          array (
            'no_faktur' => 'PNM20250123001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 25984.9890000000013969838619232177734375,
            'subtotal' => 259849.890000000013969838619232177734375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 259849.890000000013969838619232177734375,
          ),
          2 => 
          array (
            'no_faktur' => 'PNM20250123001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 10.0,
            'harga' => 50551.74465300000156275928020477294921875,
            'subtotal' => 505517.4465300000156275928020477294921875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 505517.4465300000156275928020477294921875,
          ),
          3 => 
          array (
            'no_faktur' => 'PNM20250123001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 5.0,
            'harga' => 66186.903185268747620284557342529296875,
            'subtotal' => 330934.515926343738101422786712646484375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 330934.515926343738101422786712646484375,
          ),
          4 => 
          array (
            'no_faktur' => 'PNM20250130001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 30.0,
            'harga' => 24000.0,
            'subtotal' => 720000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 720000.0,
          ),
          5 => 
          array (
            'no_faktur' => 'PNM20250130001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 20.0,
            'harga' => 50000.0,
            'subtotal' => 1000000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1000000.0,
          ),
          6 => 
          array (
            'no_faktur' => 'PNM20250130001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 40.0,
            'harga' => 10000.0,
            'subtotal' => 400000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 400000.0,
          ),
          7 => 
          array (
            'no_faktur' => 'PNM20250619001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 25984.9890000000013969838619232177734375,
            'subtotal' => 259849.890000000013969838619232177734375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 259849.890000000013969838619232177734375,
          ),
          8 => 
          array (
            'no_faktur' => 'PNM20250619001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 5.0,
            'harga' => 50551.74465300000156275928020477294921875,
            'subtotal' => 252758.72326500000781379640102386474609375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 252758.72326500000781379640102386474609375,
          ),
          9 => 
          array (
            'no_faktur' => 'PNM20250619002',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 100.0,
            'harga' => 11100.0,
            'subtotal' => 1110000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1110000.0,
          ),
          10 => 
          array (
            'no_faktur' => 'PNM20250619002',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 6.0,
            'harga' => 27803.45955915000013192184269428253173828125,
            'subtotal' => 166820.75735490000806748867034912109375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 166820.75735490000806748867034912109375,
          ),
          11 => 
          array (
            'no_faktur' => 'PNM20250813001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 7.0,
            'harga' => 28843.33779000000140513293445110321044921875,
            'subtotal' => 201903.364530000020749866962432861328125,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 201903.364530000020749866962432861328125,
          ),
          12 => 
          array (
            'no_faktur' => 'PNM20250813001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 5.0,
            'harga' => 11100.0,
            'subtotal' => 55500.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 55500.0,
          ),
          13 => 
          array (
            'no_faktur' => 'PNM20250813001',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 10.0,
            'harga' => 27803.45955915000013192184269428253173828125,
            'subtotal' => 278034.5955914999940432608127593994140625,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 278034.5955914999940432608127593994140625,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}