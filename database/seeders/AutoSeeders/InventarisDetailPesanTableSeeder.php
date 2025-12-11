<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisDetailPesanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_detail_pesan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_detail_pesan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PAI20250130001',
            'kode_barang' => 'BI00000003',
            'jumlah' => 10.0,
            'harga' => 2000000.0,
            'subtotal' => 20000000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 20000000.0,
          ),
          1 => 
          array (
            'no_faktur' => 'PAI20250603001',
            'kode_barang' => '000001',
            'jumlah' => 10.0,
            'harga' => 2000000.0,
            'subtotal' => 20000000.0,
            'dis' => 10.0,
            'besardis' => 2000000.0,
            'total' => 18000000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}