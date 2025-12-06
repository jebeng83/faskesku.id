<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkpKriteriaPenilaianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skp_kriteria_penilaian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skp_kriteria_penilaian')->insert(array (
          0 => 
          array (
            'kode_kriteria' => 'KP00000001',
            'nama_kriteria' => 'Perawat menyapa pasien dan menyebutkan nama dan unit kerja perawat',
            'kode_kategori' => 'K0001',
          ),
          1 => 
          array (
            'kode_kriteria' => 'KP00000002',
            'nama_kriteria' => 'Meminta pasien untuk menyebutkan  nama pasien dan tanggal lahir',
            'kode_kategori' => 'K0001',
          ),
          2 => 
          array (
            'kode_kriteria' => 'KP00000003',
            'nama_kriteria' => 'Tes',
            'kode_kategori' => 'K0002',
          ),
          3 => 
          array (
            'kode_kriteria' => 'KP00000004',
            'nama_kriteria' => 'tes lagi',
            'kode_kategori' => 'K0004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}