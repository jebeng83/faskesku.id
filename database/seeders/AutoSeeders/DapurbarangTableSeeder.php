<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurbarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurbarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'D00001',
            'nama_brng' => 'INDOMIE',
            'kode_sat' => 'BKS',
            'jenis' => 'Kering',
            'stok' => 624.0,
            'harga' => 4554.2112299999998867860995233058929443359375,
            'status' => '1',
          ),
          1 => 
          array (
            'kode_brng' => 'D00002',
            'nama_brng' => 'DAGING AYAM',
            'kode_sat' => 'PTG',
            'jenis' => 'Kering',
            'stok' => 321.0,
            'harga' => 16850.58155099999930826015770435333251953125,
            'status' => '1',
          ),
          2 => 
          array (
            'kode_brng' => 'D00003',
            'nama_brng' => 'BAKSO SONICE',
            'kode_sat' => 'PCS',
            'jenis' => 'Kering',
            'stok' => 529.0,
            'harga' => 683.815499999999929059413261711597442626953125,
            'status' => '1',
          ),
          3 => 
          array (
            'kode_brng' => 'D00004',
            'nama_brng' => 'BERAS',
            'kode_sat' => 'KG',
            'jenis' => 'Kering',
            'stok' => 55.0,
            'harga' => 12000.0,
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}