<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratButaWarnaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_buta_warna')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_buta_warna')->insert(array (
          0 => 
          array (
            'no_surat' => 'SBW20250609001',
            'no_rawat' => '2025/06/09/000001',
            'tanggalperiksa' => '2025-06-09',
            'hasilperiksa' => 'Tidak Buta Warna',
          ),
          1 => 
          array (
            'no_surat' => 'SBW20250630001',
            'no_rawat' => '2025/06/30/000001',
            'tanggalperiksa' => '2025-06-30',
            'hasilperiksa' => 'Tidak Buta Warna',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}