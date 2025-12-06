<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsdetailpengeluaranTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsdetailpengeluaran')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsdetailpengeluaran')->insert(array (
          0 => 
          array (
            'no_keluar' => 'SKNM241118001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 25984.9890000000013969838619232177734375,
            'total' => 259849.890000000013969838619232177734375,
          ),
          1 => 
          array (
            'no_keluar' => 'SKNM241118001',
            'kode_brng' => 'B00002',
            'kode_sat' => 'AMP',
            'jumlah' => 10.0,
            'harga' => 11100.0,
            'total' => 111000.0,
          ),
          2 => 
          array (
            'no_keluar' => 'SKNM250618001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 3.0,
            'harga' => 55500.0,
            'total' => 166500.0,
          ),
          3 => 
          array (
            'no_keluar' => 'SKNM250618001',
            'kode_brng' => 'B00003',
            'kode_sat' => 'BKS',
            'jumlah' => 3.0,
            'harga' => 13553.100000000000363797880709171295166015625,
            'total' => 40659.300000000002910383045673370361328125,
          ),
          4 => 
          array (
            'no_keluar' => 'SKNM250619001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'harga' => 26640.0,
            'total' => 26640.0,
          ),
          5 => 
          array (
            'no_keluar' => 'SKNM250619001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'harga' => 55500.0,
            'total' => 55500.0,
          ),
          6 => 
          array (
            'no_keluar' => 'SKNM250630001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'harga' => 56112.436564830000861547887325286865234375,
            'total' => 56112.436564830000861547887325286865234375,
          ),
          7 => 
          array (
            'no_keluar' => 'SKNM250630001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 1.0,
            'harga' => 11100.0,
            'total' => 11100.0,
          ),
          8 => 
          array (
            'no_keluar' => 'SKNM250805001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 2.0,
            'harga' => 11100.0,
            'total' => 22200.0,
          ),
          9 => 
          array (
            'no_keluar' => 'SKNM250805001',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'harga' => 27803.45955915000013192184269428253173828125,
            'total' => 27803.45955915000013192184269428253173828125,
          ),
          10 => 
          array (
            'no_keluar' => 'SKNM250813001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 1.0,
            'harga' => 11100.0,
            'total' => 11100.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}