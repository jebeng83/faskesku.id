<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratSkbnTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_skbn')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_skbn')->insert(array (
          0 => 
          array (
            'no_surat' => 'SKBN20250604001',
            'no_rawat' => '2025/05/26/000003',
            'tanggalsurat' => '2025-06-04',
            'kategori' => 'UMUM',
            'kd_dokter' => 'D0000004',
            'keperluan' => '-',
            'opiat' => 'NEGATIF',
            'ganja' => 'NEGATIF',
            'amphetamin' => 'NEGATIF',
            'methamphetamin' => 'NEGATIF',
            'benzodiazepin' => 'NEGATIF',
            'cocain' => 'NEGATIF',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}