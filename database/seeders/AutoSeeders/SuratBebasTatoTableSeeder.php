<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratBebasTatoTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_bebas_tato')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_bebas_tato')->insert(array (
          0 => 
          array (
            'no_surat' => 'SBT20250526001',
            'no_rawat' => '2025/05/26/000002',
            'tanggalperiksa' => '2025-05-26',
            'hasilperiksa' => 'Bebas Tato',
            'keperluan' => 'melamar kerja',
          ),
          1 => 
          array (
            'no_surat' => 'SBT20250630001',
            'no_rawat' => '2025/06/30/000001',
            'tanggalperiksa' => '2025-06-30',
            'hasilperiksa' => 'Bebas Tato',
            'keperluan' => 'TES',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}