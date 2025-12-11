<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganPenghasilanPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_penghasilan_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_penghasilan_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'PERHARI',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'PERMINGGU',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'PERBULAN',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'KADANG-KADANG',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}