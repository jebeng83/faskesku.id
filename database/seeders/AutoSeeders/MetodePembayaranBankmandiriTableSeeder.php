<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MetodePembayaranBankmandiriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('metode_pembayaran_bankmandiri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('metode_pembayaran_bankmandiri')->insert(array (
          0 => 
          array (
            'kode_metode' => 'BAU',
            'nama_metode' => 'BI Fast',
            'biaya_transaksi' => 2500.0,
          ),
          1 => 
          array (
            'kode_metode' => 'IBU',
            'nama_metode' => 'Transfer Sesama Mandiri',
            'biaya_transaksi' => 0.0,
          ),
          2 => 
          array (
            'kode_metode' => 'INU',
            'nama_metode' => 'International Transfer',
            'biaya_transaksi' => 0.0,
          ),
          3 => 
          array (
            'kode_metode' => 'LBU',
            'nama_metode' => 'LLG/SKN',
            'biaya_transaksi' => 6500.0,
          ),
          4 => 
          array (
            'kode_metode' => 'OBU',
            'nama_metode' => 'Online Transfer',
            'biaya_transaksi' => 0.0,
          ),
          5 => 
          array (
            'kode_metode' => 'RBU',
            'nama_metode' => 'RTGS',
            'biaya_transaksi' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}