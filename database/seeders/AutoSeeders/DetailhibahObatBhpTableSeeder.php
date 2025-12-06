<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailhibahObatBhpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detailhibah_obat_bhp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detailhibah_obat_bhp')->insert(array (
          0 => 
          array (
            'no_hibah' => 'HO20250630001',
            'kode_brng' => 'A000000116',
            'kode_sat' => 'PCS',
            'jumlah' => 30.0,
            'h_hibah' => 78000.0,
            'subtotalhibah' => 2340000.0,
            'h_diakui' => 78000.0,
            'subtotaldiakui' => 2340000.0,
            'no_batch' => '',
            'jumlah2' => 30.0,
            'kadaluarsa' => '0000-00-00',
          ),
          1 => 
          array (
            'no_hibah' => 'HO20250630001',
            'kode_brng' => 'B000001902',
            'kode_sat' => 'CC',
            'jumlah' => 30.0,
            'h_hibah' => 18000.0,
            'subtotalhibah' => 540000.0,
            'h_diakui' => 18000.0,
            'subtotaldiakui' => 540000.0,
            'no_batch' => '',
            'jumlah2' => 30.0,
            'kadaluarsa' => '0000-00-00',
          ),
          2 => 
          array (
            'no_hibah' => 'HO20250719001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'jumlah' => 20.0,
            'h_hibah' => 1139.121311999999988984200172126293182373046875,
            'subtotalhibah' => 22782.4262400000006891787052154541015625,
            'h_diakui' => 1139.121311999999988984200172126293182373046875,
            'subtotaldiakui' => 22782.4262400000006891787052154541015625,
            'no_batch' => '',
            'jumlah2' => 20.0,
            'kadaluarsa' => '0000-00-00',
          ),
          3 => 
          array (
            'no_hibah' => 'HO20250719001',
            'kode_brng' => 'B000000557',
            'kode_sat' => 'TAB',
            'jumlah' => 20.0,
            'h_hibah' => 926.0,
            'subtotalhibah' => 18520.0,
            'h_diakui' => 926.0,
            'subtotaldiakui' => 18520.0,
            'no_batch' => '',
            'jumlah2' => 20.0,
            'kadaluarsa' => '0000-00-00',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}