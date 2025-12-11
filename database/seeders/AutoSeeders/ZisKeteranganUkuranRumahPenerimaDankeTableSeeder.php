<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganUkuranRumahPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_ukuran_rumah_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_ukuran_rumah_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Sangat Kecil (< 30 M2)',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Kecil (30 - 40 M2)',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Sedang (41 - 55 M2)',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Besar (> 56 M2)',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}