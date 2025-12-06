<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkriningRawatJalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skrining_rawat_jalan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skrining_rawat_jalan')->insert(array (
          0 => 
          array (
            'tanggal' => '2025-08-11',
            'jam' => '12:48:31',
            'no_rkm_medis' => '000011',
            'geriatri' => 'Tidak',
            'kesadaran' => 'Sadar penuh',
            'pernapasan' => 'Nafas normal',
            'nyeri_dada' => 'Tidak ada',
            'skala_nyeri' => 'Tidak sakit',
            'batuk' => 'Ya < 2 minggu',
            'risiko_jatuh' => 'Tidak',
            'keputusan' => 'Sesuai antrian',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}