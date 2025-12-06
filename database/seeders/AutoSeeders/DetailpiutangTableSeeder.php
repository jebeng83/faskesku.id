<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailpiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detailpiutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detailpiutang')->insert(array (
          0 => 
          array (
            'nota_piutang' => 'PD250513001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'h_jual' => 1367.02121200000010503572411835193634033203125,
            'h_beli' => 1138.0,
            'jumlah' => 4.0,
            'subtotal' => 5468.0,
            'dis' => 5.0,
            'bsr_dis' => 273.0,
            'total' => 5195.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '',
          ),
          1 => 
          array (
            'nota_piutang' => 'PD250513001',
            'kode_brng' => 'B000000575',
            'kode_sat' => 'CAP',
            'h_jual' => 4835.0,
            'h_beli' => 3223.0,
            'jumlah' => 10.0,
            'subtotal' => 48350.0,
            'dis' => 7.0,
            'bsr_dis' => 3385.0,
            'total' => 44965.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '',
          ),
          2 => 
          array (
            'nota_piutang' => '2025/05/26/000001',
            'kode_brng' => 'B000000159',
            'kode_sat' => 'TAB',
            'h_jual' => 13187.0,
            'h_beli' => 10989.0,
            'jumlah' => 10.0,
            'subtotal' => 131870.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'total' => 131870.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '',
          ),
          3 => 
          array (
            'nota_piutang' => '2025/05/26/000001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'h_jual' => 1367.02121200000010503572411835193634033203125,
            'h_beli' => 1138.0,
            'jumlah' => 10.0,
            'subtotal' => 13670.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'total' => 13670.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '',
          ),
          4 => 
          array (
            'nota_piutang' => 'PD250603001',
            'kode_brng' => 'B000000305',
            'kode_sat' => 'TAB',
            'h_jual' => 160.0,
            'h_beli' => 133.0,
            'jumlah' => 10.0,
            'subtotal' => 1600.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'total' => 1600.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '',
          ),
          5 => 
          array (
            'nota_piutang' => 'PD250603001',
            'kode_brng' => 'B000000395',
            'kode_sat' => 'TAB',
            'h_jual' => 11880.0,
            'h_beli' => 9900.0,
            'jumlah' => 10.0,
            'subtotal' => 118800.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'total' => 118800.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '',
          ),
          6 => 
          array (
            'nota_piutang' => '2025/07/07/000001',
            'kode_brng' => 'B000000003',
            'kode_sat' => '-',
            'h_jual' => 68640.0,
            'h_beli' => 40040.0,
            'jumlah' => 2.0,
            'subtotal' => 137280.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'total' => 137280.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '2x1 wq w qw q wq w q wq w qw q w qw q wq w qw qw',
          ),
          7 => 
          array (
            'nota_piutang' => '2025/07/07/000001',
            'kode_brng' => 'B000000557',
            'kode_sat' => 'TAB',
            'h_jual' => 1111.0,
            'h_beli' => 926.0,
            'jumlah' => 10.0,
            'subtotal' => 11110.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'total' => 11110.0,
            'no_batch' => '',
            'no_faktur' => '',
            'aturan_pakai' => '2x1 wq w qw q wq w q wq w qw q w qw q wq w qw qw',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}