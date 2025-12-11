<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganAtapRumahPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_atap_rumah_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_atap_rumah_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Terpal',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Asbes',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Seng',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Genteng',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}