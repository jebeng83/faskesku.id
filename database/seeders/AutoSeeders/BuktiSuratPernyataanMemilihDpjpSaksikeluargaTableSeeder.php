<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiSuratPernyataanMemilihDpjpSaksikeluargaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_surat_pernyataan_memilih_dpjp_saksikeluarga')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_surat_pernyataan_memilih_dpjp_saksikeluarga')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'DPJP20250723001',
            'photo' => 'pages/upload/DPJP20250723001SK.jpeg',
          ),
          1 => 
          array (
            'no_pernyataan' => 'DPJP20250728001',
            'photo' => 'pages/upload/DPJP20250728001SK.jpeg',
          ),
          2 => 
          array (
            'no_pernyataan' => 'DPJP20250804001',
            'photo' => 'pages/upload/DPJP20250804001SK.jpeg',
          ),
          3 => 
          array (
            'no_pernyataan' => 'DPJP20250819001',
            'photo' => 'pages/upload/DPJP20250819001SK.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}