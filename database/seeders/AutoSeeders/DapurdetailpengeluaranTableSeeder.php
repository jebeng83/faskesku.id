<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurdetailpengeluaranTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurdetailpengeluaran')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurdetailpengeluaran')->insert(array (
          0 => 
          array (
            'no_keluar' => 'SKD241119001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 10.0,
            'harga' => 10000.0,
            'total' => 100000.0,
          ),
          1 => 
          array (
            'no_keluar' => 'SKD241119001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 3.0,
            'harga' => 3000.0,
            'total' => 9000.0,
          ),
          2 => 
          array (
            'no_keluar' => 'SKD241122001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'harga' => 555.0,
            'total' => 2775.0,
          ),
          3 => 
          array (
            'no_keluar' => 'SKD241122001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 5.0,
            'harga' => 12321.0,
            'total' => 61605.0,
          ),
          4 => 
          array (
            'no_keluar' => 'SKD241122001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 5.0,
            'harga' => 3696.3000000000001818989403545856475830078125,
            'total' => 18481.5,
          ),
          5 => 
          array (
            'no_keluar' => 'SKD250708001',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 1.5,
            'harga' => 12000.0,
            'total' => 18000.0,
          ),
          6 => 
          array (
            'no_keluar' => 'SKD250804001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 3.0,
            'harga' => 4554.2112299999998867860995233058929443359375,
            'total' => 13662.63368999999875086359679698944091796875,
          ),
          7 => 
          array (
            'no_keluar' => 'SKD250804002',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 1.0,
            'harga' => 16850.58155099999930826015770435333251953125,
            'total' => 16850.58155099999930826015770435333251953125,
          ),
          8 => 
          array (
            'no_keluar' => 'SKD250804002',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 50.0,
            'harga' => 4554.2112299999998867860995233058929443359375,
            'total' => 227710.56149999998160637915134429931640625,
          ),
          9 => 
          array (
            'no_keluar' => 'SKD250819001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 4.0,
            'harga' => 683.815499999999929059413261711597442626953125,
            'total' => 2735.2619999999997162376530468463897705078125,
          ),
          10 => 
          array (
            'no_keluar' => 'SKD250819001',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 1.0,
            'harga' => 12000.0,
            'total' => 12000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}