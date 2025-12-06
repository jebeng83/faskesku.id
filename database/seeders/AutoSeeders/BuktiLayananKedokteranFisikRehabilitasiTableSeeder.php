<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiLayananKedokteranFisikRehabilitasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_layanan_kedokteran_fisik_rehabilitasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_layanan_kedokteran_fisik_rehabilitasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/23/000001',
            'photo' => 'pages/upload/20250623000001.jpeg',
          ),
          1 => 
          array (
            'no_rawat' => '2025/07/04/000001',
            'photo' => 'pages/upload/20250704000001.jpeg',
          ),
          2 => 
          array (
            'no_rawat' => '2025/07/07/000001',
            'photo' => 'pages/upload/20250707000001.jpeg',
          ),
          3 => 
          array (
            'no_rawat' => '2025/08/11/000002',
            'photo' => 'pages/upload/20250811000002.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}