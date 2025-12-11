<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPengajuanBarangDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengajuan_barang_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_pengajuan_barang_dapur')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PBD20241117001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_pengajuan' => 10000.0,
            'total' => 100000.0,
          ),
          1 => 
          array (
            'no_pengajuan' => 'PBD20241117001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 4.0,
            'h_pengajuan' => 3000.0,
            'total' => 12000.0,
          ),
          2 => 
          array (
            'no_pengajuan' => 'PBD20241122001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 1000.0,
            'h_pengajuan' => 500.0,
            'total' => 500000.0,
          ),
          3 => 
          array (
            'no_pengajuan' => 'PBD20241122001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 1000.0,
            'h_pengajuan' => 11100.0,
            'total' => 11100000.0,
          ),
          4 => 
          array (
            'no_pengajuan' => 'PBD20241122001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 5000.0,
            'h_pengajuan' => 3330.0,
            'total' => 16650000.0,
          ),
          5 => 
          array (
            'no_pengajuan' => 'PBD20241126001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 100.0,
            'h_pengajuan' => 555.0,
            'total' => 55500.0,
          ),
          6 => 
          array (
            'no_pengajuan' => 'PBD20241126001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 100.0,
            'h_pengajuan' => 12321.0,
            'total' => 1232100.0,
          ),
          7 => 
          array (
            'no_pengajuan' => 'PBD20241126001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'h_pengajuan' => 3696.3000000000001818989403545856475830078125,
            'total' => 369630.0,
          ),
          8 => 
          array (
            'no_pengajuan' => 'PBD20250211001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'h_pengajuan' => 616.049999999999954525264911353588104248046875,
            'total' => 6160.5,
          ),
          9 => 
          array (
            'no_pengajuan' => 'PBD20250211001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'h_pengajuan' => 13676.309999999999490682967007160186767578125,
            'total' => 136763.10000000000582076609134674072265625,
          ),
          10 => 
          array (
            'no_pengajuan' => 'PBD20250211001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 10.0,
            'h_pengajuan' => 4102.89300000000002910383045673370361328125,
            'total' => 41028.9300000000002910383045673370361328125,
          ),
          11 => 
          array (
            'no_pengajuan' => 'PBD20250804001',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 50.0,
            'h_pengajuan' => 12000.0,
            'total' => 600000.0,
          ),
          12 => 
          array (
            'no_pengajuan' => 'PBD20250804001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 100.0,
            'h_pengajuan' => 4554.2112299999998867860995233058929443359375,
            'total' => 455421.1229999999632127583026885986328125,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}