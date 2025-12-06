<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPiutangJasaPerusahaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_piutang_jasa_perusahaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_piutang_jasa_perusahaan')->insert(array (
          0 => 
          array (
            'no_piutang' => 'PJP250522001',
            'kode_kategori' => 'KP001',
            'jml' => 10.0,
            'harga' => 1000000.0,
            'subtotal' => 10000000.0,
            'diskon' => 20.0,
            'besar_diskon' => 2000000.0,
            'total' => 8000000.0,
          ),
          1 => 
          array (
            'no_piutang' => 'PJP250522001',
            'kode_kategori' => 'KP002',
            'jml' => 5.0,
            'harga' => 100000.0,
            'subtotal' => 500000.0,
            'diskon' => 0.0,
            'besar_diskon' => 100000.0,
            'total' => 400000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}