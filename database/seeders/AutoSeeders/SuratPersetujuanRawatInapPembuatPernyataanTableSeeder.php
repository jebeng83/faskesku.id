<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPersetujuanRawatInapPembuatPernyataanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_rawat_inap_pembuat_pernyataan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_rawat_inap_pembuat_pernyataan')->insert(array (
          0 => 
          array (
            'no_surat' => 'PRI20250526001',
            'photo' => 'pages/upload/PRI20250526001.jpeg',
          ),
          1 => 
          array (
            'no_surat' => 'PRI20250618001',
            'photo' => 'pages/upload/PRI20250618001.jpeg',
          ),
          2 => 
          array (
            'no_surat' => 'PRI20250628001',
            'photo' => 'pages/upload/PRI20250628001.jpeg',
          ),
          3 => 
          array (
            'no_surat' => 'PRI20250630001',
            'photo' => 'pages/upload/PRI20250630001.jpeg',
          ),
          4 => 
          array (
            'no_surat' => 'PRI20250707001',
            'photo' => 'pages/upload/PRI20250707001.jpeg',
          ),
          5 => 
          array (
            'no_surat' => 'PRI20250729001',
            'photo' => 'pages/upload/PRI20250729001.jpeg',
          ),
          6 => 
          array (
            'no_surat' => 'PRI20250819001',
            'photo' => 'pages/upload/PRI20250819001.jpeg',
          ),
          7 => 
          array (
            'no_surat' => 'PRI20250825001',
            'photo' => 'pages/upload/PRI20250825001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}