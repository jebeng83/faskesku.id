<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RekonsiliasiObatKonfirmasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rekonsiliasi_obat_konfirmasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rekonsiliasi_obat_konfirmasi')->insert(array (
          0 => 
          array (
            'no_rekonsiliasi' => 'RO202508050001',
            'diterima_farmasi' => '2025-08-05 09:04:21',
            'dikonfirmasi_apoteker' => '2025-08-05 09:04:21',
            'nip' => '123124',
            'diserahkan_pasien' => '2025-08-05 09:04:21',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}