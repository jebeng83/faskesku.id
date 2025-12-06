<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganJenisSimpananPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_jenis_simpanan_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_jenis_simpanan_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Tidak Ada',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Emas',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Tabungan',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Simpanan Bank',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}