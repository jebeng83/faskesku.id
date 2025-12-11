<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TokobarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tokobarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tokobarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'BT000001',
            'nama_brng' => 'Beras Merah Holistic',
            'kode_sat' => 'BAL',
            'jenis' => 'J01',
            'stok' => 25.0,
            'dasar' => 70000.0,
            'h_beli' => 100000.0,
            'distributor' => 120000.0,
            'grosir' => 130000.0,
            'retail' => 140000.0,
            'status' => '1',
          ),
          1 => 
          array (
            'kode_brng' => 'BT000002',
            'nama_brng' => 'MADU HOLISTIC',
            'kode_sat' => 'BTL',
            'jenis' => 'J02',
            'stok' => 32.0,
            'dasar' => 90000.0,
            'h_beli' => 90000.0,
            'distributor' => 120000.0,
            'grosir' => 120000.0,
            'retail' => 120000.0,
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}