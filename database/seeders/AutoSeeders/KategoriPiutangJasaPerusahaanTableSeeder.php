<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriPiutangJasaPerusahaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_piutang_jasa_perusahaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kategori_piutang_jasa_perusahaan')->insert(array (
          0 => 
          array (
            'kode_kategori' => 'KP001',
            'nama_kategori' => 'BIAYA TENAGA PERAWAT',
          ),
          1 => 
          array (
            'kode_kategori' => 'KP002',
            'nama_kategori' => 'BIAYA LEMBUR PERAWAT',
          ),
          2 => 
          array (
            'kode_kategori' => 'KP003',
            'nama_kategori' => 'BIAYA PENGADAAN ALAT KESEHATAN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}