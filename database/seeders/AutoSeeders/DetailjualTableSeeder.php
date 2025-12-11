<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailjualTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detailjual')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detailjual')->insert(array (
          0 => 
          array (
            'nota_jual' => 'PJ20250414001',
            'kode_brng' => 'B000000557',
            'kode_sat' => 'TAB',
            'h_jual' => 1111.0,
            'h_beli' => 926.0,
            'jumlah' => 10.0,
            'subtotal' => 11110.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'tambahan' => 0.0,
            'embalase' => 0.0,
            'tuslah' => 0.0,
            'aturan_pakai' => '',
            'total' => 11110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'nota_jual' => 'PJ20250428001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'h_jual' => 1367.0,
            'h_beli' => 1138.0,
            'jumlah' => 10.0,
            'subtotal' => 13670.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'tambahan' => 0.0,
            'embalase' => 0.0,
            'tuslah' => 0.0,
            'aturan_pakai' => '',
            'total' => 13670.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          2 => 
          array (
            'nota_jual' => 'PJ20250603001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'h_jual' => 1367.0,
            'h_beli' => 1138.0,
            'jumlah' => 10.0,
            'subtotal' => 13670.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'tambahan' => 0.0,
            'embalase' => 0.0,
            'tuslah' => 0.0,
            'aturan_pakai' => '',
            'total' => 13670.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'nota_jual' => 'PJ20250603001',
            'kode_brng' => 'A000000001',
            'kode_sat' => 'GLN',
            'h_jual' => 158400.0,
            'h_beli' => 132000.0,
            'jumlah' => 10.0,
            'subtotal' => 1584000.0,
            'dis' => 0.0,
            'bsr_dis' => 0.0,
            'tambahan' => 0.0,
            'embalase' => 0.0,
            'tuslah' => 0.0,
            'aturan_pakai' => '',
            'total' => 1584000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}