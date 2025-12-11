<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetreturbeliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detreturbeli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detreturbeli')->insert(array (
          0 => 
          array (
            'no_retur_beli' => 'RB241218001',
            'no_faktur' => '-',
            'kode_brng' => 'B000000672',
            'kode_sat' => 'CAP',
            'h_beli' => 0.0,
            'jml_beli' => 0.0,
            'h_retur' => 7216.0,
            'jml_retur' => 50.0,
            'total' => 360800.0,
            'no_batch' => '',
            'jml_retur2' => 50.0,
          ),
          1 => 
          array (
            'no_retur_beli' => 'RB241218002',
            'no_faktur' => '-',
            'kode_brng' => 'B000001039',
            'kode_sat' => 'TAB',
            'h_beli' => 0.0,
            'jml_beli' => 0.0,
            'h_retur' => 792.0,
            'jml_retur' => 50.0,
            'total' => 39600.0,
            'no_batch' => '',
            'jml_retur2' => 50.0,
          ),
          2 => 
          array (
            'no_retur_beli' => 'RB250121001',
            'no_faktur' => '',
            'kode_brng' => 'B000000305',
            'kode_sat' => 'TAB',
            'h_beli' => 0.0,
            'jml_beli' => 0.0,
            'h_retur' => 133.0,
            'jml_retur' => 10.0,
            'total' => 1330.0,
            'no_batch' => '',
            'jml_retur2' => 10.0,
          ),
          3 => 
          array (
            'no_retur_beli' => 'RB250121001',
            'no_faktur' => '',
            'kode_brng' => 'B000000560',
            'kode_sat' => 'CAP',
            'h_beli' => 0.0,
            'jml_beli' => 0.0,
            'h_retur' => 9751.0,
            'jml_retur' => 10.0,
            'total' => 97510.0,
            'no_batch' => '',
            'jml_retur2' => 10.0,
          ),
          4 => 
          array (
            'no_retur_beli' => 'RB250630001',
            'no_faktur' => '',
            'kode_brng' => 'B000001254',
            'kode_sat' => 'TAB',
            'h_beli' => 0.0,
            'jml_beli' => 0.0,
            'h_retur' => 10450.0,
            'jml_retur' => 1.0,
            'total' => 10450.0,
            'no_batch' => '',
            'jml_retur2' => 1.0,
          ),
          5 => 
          array (
            'no_retur_beli' => 'RB250630001',
            'no_faktur' => '-',
            'kode_brng' => 'B000000965',
            'kode_sat' => 'TAB',
            'h_beli' => 0.0,
            'jml_beli' => 0.0,
            'h_retur' => 333.0,
            'jml_retur' => 5.0,
            'total' => 1665.0,
            'no_batch' => '',
            'jml_retur2' => 5.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}