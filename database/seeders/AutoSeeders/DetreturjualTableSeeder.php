<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetreturjualTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detreturjual')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detreturjual')->insert(array (
          0 => 
          array (
            'no_retur_jual' => '2024/11/14/00000201',
            'nota_jual' => '',
            'kode_brng' => 'B00001000',
            'kode_sat' => 'CAP',
            'jml_jual' => 0.0,
            'h_jual' => 0.0,
            'jml_retur' => 2.0,
            'h_retur' => 5550.0,
            'subtotal' => 11100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'no_retur_jual' => '2024/12/17/00000101',
            'nota_jual' => '',
            'kode_brng' => 'B000000571',
            'kode_sat' => 'TAB',
            'jml_jual' => 0.0,
            'h_jual' => 0.0,
            'jml_retur' => 2.0,
            'h_retur' => 3330.0,
            'subtotal' => 6660.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          2 => 
          array (
            'no_retur_jual' => '2024/12/17/00000101',
            'nota_jual' => '',
            'kode_brng' => 'B000000790',
            'kode_sat' => 'SYR',
            'jml_jual' => 0.0,
            'h_jual' => 0.0,
            'jml_retur' => 2.0,
            'h_retur' => 4991.0,
            'subtotal' => 9982.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'no_retur_jual' => '2025/06/28/00000101',
            'nota_jual' => '',
            'kode_brng' => 'B000000789',
            'kode_sat' => 'SYR',
            'jml_jual' => 0.0,
            'h_jual' => 0.0,
            'jml_retur' => 1.0,
            'h_retur' => 15400.0,
            'subtotal' => 15400.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          4 => 
          array (
            'no_retur_jual' => '2025/06/18/00000101',
            'nota_jual' => '',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'jml_jual' => 0.0,
            'h_jual' => 0.0,
            'jml_retur' => 2.0,
            'h_retur' => 1139.121311999999988984200172126293182373046875,
            'subtotal' => 2278.24262399999997796840034425258636474609375,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          5 => 
          array (
            'no_retur_jual' => '2025/06/18/00000101',
            'nota_jual' => '',
            'kode_brng' => 'B000001207',
            'kode_sat' => 'TAB',
            'jml_jual' => 0.0,
            'h_jual' => 0.0,
            'jml_retur' => 2.0,
            'h_retur' => 2750.0,
            'subtotal' => 5500.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}