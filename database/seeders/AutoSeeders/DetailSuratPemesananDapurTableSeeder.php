<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailSuratPemesananDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_surat_pemesanan_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_surat_pemesanan_dapur')->insert(array (
          0 => 
          array (
            'no_pemesanan' => 'SPD20241117001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_pesan' => 10000.0,
            'subtotal' => 100000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 100000.0,
          ),
          1 => 
          array (
            'no_pemesanan' => 'SPD20241117001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 5.0,
            'h_pesan' => 3000.0,
            'subtotal' => 15000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 15000.0,
          ),
          2 => 
          array (
            'no_pemesanan' => 'SPD20241120001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_pesan' => 10000.0,
            'subtotal' => 100000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 100000.0,
          ),
          3 => 
          array (
            'no_pemesanan' => 'SPD20241120001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 3.0,
            'h_pesan' => 3000.0,
            'subtotal' => 9000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 9000.0,
          ),
          4 => 
          array (
            'no_pemesanan' => 'SPD20241122001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pesan' => 500.0,
            'subtotal' => 50000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 50000.0,
          ),
          5 => 
          array (
            'no_pemesanan' => 'SPD20241122001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 100.0,
            'h_pesan' => 11100.0,
            'subtotal' => 1110000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1110000.0,
          ),
          6 => 
          array (
            'no_pemesanan' => 'SPD20241122001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'h_pesan' => 3330.0,
            'subtotal' => 333000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 333000.0,
          ),
          7 => 
          array (
            'no_pemesanan' => 'SPD20241122002',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pesan' => 500.0,
            'subtotal' => 50000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 50000.0,
          ),
          8 => 
          array (
            'no_pemesanan' => 'SPD20241122002',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 100.0,
            'h_pesan' => 11100.0,
            'subtotal' => 1110000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 1110000.0,
          ),
          9 => 
          array (
            'no_pemesanan' => 'SPD20241122002',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'h_pesan' => 3330.0,
            'subtotal' => 333000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 333000.0,
          ),
          10 => 
          array (
            'no_pemesanan' => 'SPD20241126001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pesan' => 555.0,
            'subtotal' => 55500.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 55500.0,
          ),
          11 => 
          array (
            'no_pemesanan' => 'SPD20241126001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 50.0,
            'h_pesan' => 12321.0,
            'subtotal' => 616050.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 616050.0,
          ),
          12 => 
          array (
            'no_pemesanan' => 'SPD20241126001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'h_pesan' => 3696.3000000000001818989403545856475830078125,
            'subtotal' => 369630.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 369630.0,
          ),
          13 => 
          array (
            'no_pemesanan' => 'SPD20250211001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 7.0,
            'h_pesan' => 4102.89300000000002910383045673370361328125,
            'subtotal' => 28720.25100000000020372681319713592529296875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 28720.25100000000020372681319713592529296875,
          ),
          14 => 
          array (
            'no_pemesanan' => 'SPD20250211001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_pesan' => 13676.309999999999490682967007160186767578125,
            'subtotal' => 136763.10000000000582076609134674072265625,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 136763.10000000000582076609134674072265625,
          ),
          15 => 
          array (
            'no_pemesanan' => 'SPD20250211001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 8.0,
            'h_pesan' => 616.049999999999954525264911353588104248046875,
            'subtotal' => 4928.399999999999636202119290828704833984375,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 4928.399999999999636202119290828704833984375,
          ),
          16 => 
          array (
            'no_pemesanan' => 'SPD20250804001',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 45.0,
            'h_pesan' => 12000.0,
            'subtotal' => 540000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 540000.0,
          ),
          17 => 
          array (
            'no_pemesanan' => 'SPD20250804001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 80.0,
            'h_pesan' => 4554.2112299999998867860995233058929443359375,
            'subtotal' => 364336.8984000000054948031902313232421875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 364336.8984000000054948031902313232421875,
          ),
          18 => 
          array (
            'no_pemesanan' => 'SPD20250804002',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pesan' => 683.815499999999929059413261711597442626953125,
            'subtotal' => 6838.15499999999883584678173065185546875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6838.15499999999883584678173065185546875,
          ),
          19 => 
          array (
            'no_pemesanan' => 'SPD20250804002',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_pesan' => 15180.70409999999901629053056240081787109375,
            'subtotal' => 151807.04099999999743886291980743408203125,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 151807.04099999999743886291980743408203125,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}