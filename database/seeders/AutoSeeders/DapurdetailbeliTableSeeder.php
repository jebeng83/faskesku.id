<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurdetailbeliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurdetailbeli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurdetailbeli')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PD20250428001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 683.815499999999929059413261711597442626953125,
            'subtotal' => 6838.15499999999883584678173065185546875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6838.15499999999883584678173065185546875,
          ),
          1 => 
          array (
            'no_faktur' => 'PD20250428001',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'jumlah' => 20.0,
            'harga' => 15180.70409999999901629053056240081787109375,
            'subtotal' => 303614.0819999999948777258396148681640625,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 303614.0819999999948777258396148681640625,
          ),
          2 => 
          array (
            'no_faktur' => 'PD20250804001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 683.815499999999929059413261711597442626953125,
            'subtotal' => 6838.15499999999883584678173065185546875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6838.15499999999883584678173065185546875,
          ),
          3 => 
          array (
            'no_faktur' => 'PD20250819001',
            'kode_brng' => 'D00003',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'harga' => 683.815499999999929059413261711597442626953125,
            'subtotal' => 6838.15499999999883584678173065185546875,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 6838.15499999999883584678173065185546875,
          ),
          4 => 
          array (
            'no_faktur' => 'PD20250819001',
            'kode_brng' => 'D00004',
            'kode_sat' => 'KG',
            'jumlah' => 2.0,
            'harga' => 12000.0,
            'subtotal' => 24000.0,
            'dis' => 0.0,
            'besardis' => 0.0,
            'total' => 24000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}