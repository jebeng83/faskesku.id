<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriPengeluaranHarianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_pengeluaran_harian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kategori_pengeluaran_harian')->insert(array (
          0 => 
          array (
            'kode_kategori' => '1',
            'nama_kategori' => 'Bayar Listrik',
            'kd_rek' => '530107',
            'kd_rek2' => '111020',
          ),
          1 => 
          array (
            'kode_kategori' => '2',
            'nama_kategori' => 'BAYAR BIAYA TRANSAKSI MANDIRI',
            'kd_rek' => '530114',
            'kd_rek2' => '112010',
          ),
          2 => 
          array (
            'kode_kategori' => '3',
            'nama_kategori' => 'BAYAR LISTRIK VIA MANDIRI',
            'kd_rek' => '530107',
            'kd_rek2' => '112010',
          ),
          3 => 
          array (
            'kode_kategori' => '4',
            'nama_kategori' => 'BAYAR LISTRIK VIA BCA',
            'kd_rek' => '530107',
            'kd_rek2' => '112020',
          ),
          4 => 
          array (
            'kode_kategori' => '5',
            'nama_kategori' => 'BELI SOLAR CASH',
            'kd_rek' => '530108',
            'kd_rek2' => '111010',
          ),
          5 => 
          array (
            'kode_kategori' => '6',
            'nama_kategori' => 'WORKSHOP',
            'kd_rek' => '530115',
            'kd_rek2' => '111010',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}