<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsbarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsbarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B00001',
            'nama_brng' => 'TES1',
            'kode_sat' => 'AMP',
            'jenis' => 'J01',
            'stok' => 85.0,
            'harga' => 12210.0,
            'status' => '1',
          ),
          1 => 
          array (
            'kode_brng' => 'B00002',
            'nama_brng' => 'TES2',
            'kode_sat' => 'AMP',
            'jenis' => 'J01',
            'stok' => 38.0,
            'harga' => 11100.0,
            'status' => '1',
          ),
          2 => 
          array (
            'kode_brng' => 'B00003',
            'nama_brng' => 'TEPUNG TERIGU',
            'kode_sat' => 'BKS',
            'jenis' => 'J03',
            'stok' => 280.0,
            'harga' => 13553.100000000000363797880709171295166015625,
            'status' => '1',
          ),
          3 => 
          array (
            'kode_brng' => 'B00004',
            'nama_brng' => 'VIXAL',
            'kode_sat' => 'BTL',
            'jenis' => 'J04',
            'stok' => 606.0,
            'harga' => 30861.840110656499746255576610565185546875,
            'status' => '1',
          ),
          4 => 
          array (
            'kode_brng' => 'B00005',
            'nama_brng' => 'TISU PASEO',
            'kode_sat' => 'Item',
            'jenis' => 'J01',
            'stok' => 939.0,
            'harga' => 12321.0,
            'status' => '1',
          ),
          5 => 
          array (
            'kode_brng' => 'B00006',
            'nama_brng' => 'LAMPU OSRAM 5 WATT',
            'kode_sat' => 'PCS',
            'jenis' => 'J01',
            'stok' => 156.0,
            'harga' => 32016.10494690000268747098743915557861328125,
            'status' => '1',
          ),
          6 => 
          array (
            'kode_brng' => 'B00007',
            'nama_brng' => 'FILM RADIOLOGI',
            'kode_sat' => 'PCS',
            'jenis' => 'J05',
            'stok' => 100.0,
            'harga' => 184815.0,
            'status' => '1',
          ),
          7 => 
          array (
            'kode_brng' => 'B00008',
            'nama_brng' => 'SAPU LANTAI',
            'kode_sat' => '-',
            'jenis' => 'J01',
            'stok' => 103.0,
            'harga' => 56112.436564830000861547887325286865234375,
            'status' => '1',
          ),
          8 => 
          array (
            'kode_brng' => 'B00009',
            'nama_brng' => 'MAP RADILOGI',
            'kode_sat' => '-',
            'jenis' => 'J05',
            'stok' => 0.0,
            'harga' => 10000.0,
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}