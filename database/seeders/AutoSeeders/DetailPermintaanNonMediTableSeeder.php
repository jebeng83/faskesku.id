<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPermintaanNonMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_non_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_non_medis')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PN240904001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          1 => 
          array (
            'no_permintaan' => 'PN240904001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          2 => 
          array (
            'no_permintaan' => 'PN240904002',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          3 => 
          array (
            'no_permintaan' => 'PN240904002',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 4.0,
            'keterangan' => '',
          ),
          4 => 
          array (
            'no_permintaan' => 'PN240930001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          5 => 
          array (
            'no_permintaan' => 'PN240930001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          6 => 
          array (
            'no_permintaan' => 'PN241011001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          7 => 
          array (
            'no_permintaan' => 'PN241011001',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          8 => 
          array (
            'no_permintaan' => 'PN241011002',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          9 => 
          array (
            'no_permintaan' => 'PN241011002',
            'kode_brng' => 'B00004',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          10 => 
          array (
            'no_permintaan' => 'PN241030001',
            'kode_brng' => 'B00007',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          11 => 
          array (
            'no_permintaan' => 'PN250619001',
            'kode_brng' => 'B00006',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          12 => 
          array (
            'no_permintaan' => 'PN250619001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          13 => 
          array (
            'no_permintaan' => 'PN250630001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          14 => 
          array (
            'no_permintaan' => 'PN250630001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          15 => 
          array (
            'no_permintaan' => 'PN250813001',
            'kode_brng' => 'B00008',
            'kode_sat' => '-',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          16 => 
          array (
            'no_permintaan' => 'PN250813001',
            'kode_brng' => 'B00005',
            'kode_sat' => 'Item',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}