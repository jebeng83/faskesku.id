<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPersetujuanUmumPembuatPernyataanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_umum_pembuat_pernyataan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_persetujuan_umum_pembuat_pernyataan')->insert(array (
          0 => 
          array (
            'no_surat' => 'PSU20250427002',
            'photo' => 'pages/upload/PSU20250427002.jpeg',
          ),
          1 => 
          array (
            'no_surat' => 'PSU20250526001',
            'photo' => 'pages/upload/PSU20250526001.jpeg',
          ),
          2 => 
          array (
            'no_surat' => 'PSU20250804001',
            'photo' => 'pages/upload/PSU20250804001.jpeg',
          ),
          3 => 
          array (
            'no_surat' => 'PSU20250826001',
            'photo' => 'pages/upload/PSU20250826001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}