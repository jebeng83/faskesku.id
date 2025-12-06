<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPersetujuanPemeriksaanHivTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_pemeriksaan_hiv')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_pemeriksaan_hiv')->insert(array (
          0 => 
          array (
            'no_surat' => 'PPHIV20250715001',
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-07-15',
            'nik' => 'D0000004',
          ),
          1 => 
          array (
            'no_surat' => 'PPHIV20250819001',
            'no_rawat' => '2025/08/19/000002',
            'tanggal' => '2025-08-19',
            'nik' => '123124',
          ),
          2 => 
          array (
            'no_surat' => 'PPU20250714001',
            'no_rawat' => '2025/05/26/000003',
            'tanggal' => '2025-07-14',
            'nik' => 'D0000004',
          ),
          3 => 
          array (
            'no_surat' => 'PPU20250714002',
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-07-14',
            'nik' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}