<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPengeluaranObatBhpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengeluaran_obat_bhp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengeluaran_obat_bhp')->insert(array (
          0 => 
          array (
            'no_keluar' => 'SKM20250618001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'no_batch' => '',
            'jumlah' => 10.0,
            'harga_beli' => 1138.0,
            'total' => 11380.0,
            'no_faktur' => '',
          ),
          1 => 
          array (
            'no_keluar' => 'SKM20250618001',
            'kode_brng' => 'B000001207',
            'kode_sat' => 'TAB',
            'no_batch' => '',
            'jumlah' => 10.0,
            'harga_beli' => 2078.0,
            'total' => 20780.0,
            'no_faktur' => '',
          ),
          2 => 
          array (
            'no_keluar' => 'SKM20250628001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 17600.0,
            'total' => 17600.0,
            'no_faktur' => '',
          ),
          3 => 
          array (
            'no_keluar' => 'SKM20250630001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 3.0,
            'harga_beli' => 17600.0,
            'total' => 52800.0,
            'no_faktur' => '',
          ),
          4 => 
          array (
            'no_keluar' => 'SKM20250630002',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 2.0,
            'harga_beli' => 2000.0,
            'total' => 4000.0,
            'no_faktur' => '',
          ),
          5 => 
          array (
            'no_keluar' => 'SKM20250630002',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 2.0,
            'harga_beli' => 2904.0,
            'total' => 5808.0,
            'no_faktur' => '',
          ),
          6 => 
          array (
            'no_keluar' => 'SKM20250630002',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 2.0,
            'harga_beli' => 3177.0,
            'total' => 6354.0,
            'no_faktur' => '',
          ),
          7 => 
          array (
            'no_keluar' => 'SKM20250719001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'no_batch' => '',
            'jumlah' => 20.0,
            'harga_beli' => 1138.0,
            'total' => 22760.0,
            'no_faktur' => '',
          ),
          8 => 
          array (
            'no_keluar' => 'SKM20250719001',
            'kode_brng' => 'B000000557',
            'kode_sat' => 'TAB',
            'no_batch' => '',
            'jumlah' => 20.0,
            'harga_beli' => 926.0,
            'total' => 18520.0,
            'no_faktur' => '',
          ),
          9 => 
          array (
            'no_keluar' => 'SKM20250805001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 6050.0,
            'total' => 6050.0,
            'no_faktur' => '',
          ),
          10 => 
          array (
            'no_keluar' => 'SKM20250805001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 2000.0,
            'total' => 2000.0,
            'no_faktur' => '',
          ),
          11 => 
          array (
            'no_keluar' => 'SKM20250805001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 2904.0,
            'total' => 2904.0,
            'no_faktur' => '',
          ),
          12 => 
          array (
            'no_keluar' => 'SKM20250805001',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 3177.0,
            'total' => 3177.0,
            'no_faktur' => '',
          ),
          13 => 
          array (
            'no_keluar' => 'SKM20250805001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 5366.0,
            'total' => 5366.0,
            'no_faktur' => '',
          ),
          14 => 
          array (
            'no_keluar' => 'SKM20250805002',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 63800.0,
            'total' => 63800.0,
            'no_faktur' => '',
          ),
          15 => 
          array (
            'no_keluar' => 'SKM20250825001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'no_batch' => '',
            'jumlah' => 1.0,
            'harga_beli' => 63800.0,
            'total' => 63800.0,
            'no_faktur' => '',
          ),
          16 => 
          array (
            'no_keluar' => 'SKM20250825001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'no_batch' => '',
            'jumlah' => 2.0,
            'harga_beli' => 17600.0,
            'total' => 35200.0,
            'no_faktur' => '',
          ),
          17 => 
          array (
            'no_keluar' => 'SKM20250825001',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'no_batch' => '',
            'jumlah' => 2.0,
            'harga_beli' => 400.0,
            'total' => 800.0,
            'no_faktur' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}