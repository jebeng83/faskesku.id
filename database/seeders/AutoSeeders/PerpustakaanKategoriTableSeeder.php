<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanKategoriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_kategori')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_kategori')->insert(array (
          0 => 
          array (
            'id_kategori' => 'KK001',
            'nama_kategori' => 'BUKU NOVEL',
          ),
          1 => 
          array (
            'id_kategori' => 'KK002',
            'nama_kategori' => 'BUKU KOMIK',
          ),
          2 => 
          array (
            'id_kategori' => 'KK003',
            'nama_kategori' => 'BUKU KEDOKTERAN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}