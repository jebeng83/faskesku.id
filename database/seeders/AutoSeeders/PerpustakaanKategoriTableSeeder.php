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
        DB::table('perpustakaan_kategori')->insert([
            0 => [
                'id_kategori' => 'KK001',
                'nama_kategori' => 'BUKU NOVEL',
            ],
            1 => [
                'id_kategori' => 'KK002',
                'nama_kategori' => 'BUKU KOMIK',
            ],
            2 => [
                'id_kategori' => 'KK003',
                'nama_kategori' => 'BUKU KEDOKTERAN',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
