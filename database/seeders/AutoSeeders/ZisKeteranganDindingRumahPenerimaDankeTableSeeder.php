<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganDindingRumahPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_dinding_rumah_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_dinding_rumah_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Bilik Bambu / Kayu',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Semi',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Tembok / Beton',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}