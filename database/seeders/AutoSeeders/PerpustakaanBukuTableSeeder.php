<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanBukuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_buku')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_buku')->insert(array (
          0 => 
          array (
            'kode_buku' => 'KP00000001',
            'judul_buku' => 'BUKU PANDUAN SIMKES KHANZA',
            'jml_halaman' => '350',
            'kode_penerbit' => 'PK00000001',
            'kode_pengarang' => 'PP001',
            'thn_terbit' => '2020',
            'isbn' => 'tetrrtr',
            'id_kategori' => 'KK001',
            'id_jenis' => 'JK001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}