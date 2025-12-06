<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsopnameTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsopname')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsopname')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B00005',
            'h_beli' => 20000.0,
            'tanggal' => '2022-06-09',
            'stok' => 0,
            'real' => 50,
            'selisih' => 0,
            'nomihilang' => 0.0,
            'lebih' => 50,
            'nomilebih' => 1000000.0,
            'keterangan' => 'STOK AWAL',
          ),
          1 => 
          array (
            'kode_brng' => 'B00006',
            'h_beli' => 15000.0,
            'tanggal' => '2022-06-18',
            'stok' => 0,
            'real' => 10,
            'selisih' => 0,
            'nomihilang' => 0.0,
            'lebih' => 10,
            'nomilebih' => 150000.0,
            'keterangan' => '-',
          ),
          2 => 
          array (
            'kode_brng' => 'B00006',
            'h_beli' => 25984.9890000000013969838619232177734375,
            'tanggal' => '2025-01-07',
            'stok' => 150,
            'real' => 100,
            'selisih' => 50,
            'nomihilang' => 1299249.450000000186264514923095703125,
            'lebih' => 0,
            'nomilebih' => 0.0,
            'keterangan' => 'tes',
          ),
          3 => 
          array (
            'kode_brng' => 'B00007',
            'h_beli' => 184815.0,
            'tanggal' => '2025-06-19',
            'stok' => 237,
            'real' => 100,
            'selisih' => 137,
            'nomihilang' => 25319655.0,
            'lebih' => 0,
            'nomilebih' => 0.0,
            'keterangan' => 'TES',
          ),
          4 => 
          array (
            'kode_brng' => 'B00008',
            'h_beli' => 33300.0,
            'tanggal' => '2024-03-28',
            'stok' => 19,
            'real' => 0,
            'selisih' => 18,
            'nomihilang' => 599400.0,
            'lebih' => 0,
            'nomilebih' => 0.0,
            'keterangan' => 'tes',
          ),
          5 => 
          array (
            'kode_brng' => 'B00008',
            'h_beli' => 55500.0,
            'tanggal' => '2025-06-19',
            'stok' => 57,
            'real' => 100,
            'selisih' => 0,
            'nomihilang' => 0.0,
            'lebih' => 43,
            'nomilebih' => 2386500.0,
            'keterangan' => 'TES',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}