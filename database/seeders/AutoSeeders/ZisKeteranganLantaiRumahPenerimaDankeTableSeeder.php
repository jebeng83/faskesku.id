<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganLantaiRumahPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_lantai_rumah_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_lantai_rumah_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Tanah',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Semen',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Tegel',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Keramik',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}