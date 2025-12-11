<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkpKategoriPenilaianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skp_kategori_penilaian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skp_kategori_penilaian')->insert(array (
          0 => 
          array (
            'kode_kategori' => 'K0001',
            'nama_kategori' => 'Kegiatan Identifikasi Pasien',
            'sasaran' => '1',
          ),
          1 => 
          array (
            'kode_kategori' => 'K0002',
            'nama_kategori' => 'Identifikasi pasien yang mengalami kesulitan atau keterbatasan dalam komunikasi',
            'sasaran' => '1',
          ),
          2 => 
          array (
            'kode_kategori' => 'K0003',
            'nama_kategori' => 'Kegiatan Identifikasi pasien yang akan mendapatkan prosedur perawatan',
            'sasaran' => '1',
          ),
          3 => 
          array (
            'kode_kategori' => 'K0004',
            'nama_kategori' => 'tes',
            'sasaran' => '2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}