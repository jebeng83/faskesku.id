<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganDapurRumahPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_dapur_rumah_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_dapur_rumah_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Tungku',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Kompor Minyak',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Kompor Gas',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Kompor Listrik',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}