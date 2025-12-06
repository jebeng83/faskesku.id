<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPersetujuanPemeriksaanHivPembuatPersetujuanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_pemeriksaan_hiv_pembuat_persetujuan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_pemeriksaan_hiv_pembuat_persetujuan')->insert(array (
          0 => 
          array (
            'no_surat' => 'PPHIV20250715001',
            'photo' => 'pages/upload/PPHIV20250715001.jpeg',
          ),
          1 => 
          array (
            'no_surat' => 'PPHIV20250819001',
            'photo' => 'pages/upload/PPHIV20250819001.jpeg',
          ),
          2 => 
          array (
            'no_surat' => 'PPU20250714002',
            'photo' => 'pages/upload/PPU20250714002.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}