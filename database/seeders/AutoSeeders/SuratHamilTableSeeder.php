<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratHamilTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_hamil')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_hamil')->insert(array (
          0 => 
          array (
            'no_surat' => 'SKH20250630001',
            'no_rawat' => '2025/06/30/000004',
            'tanggalperiksa' => '2025-06-30',
            'hasilperiksa' => 'tidak ditemukan tanda-tanda kehamilan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}