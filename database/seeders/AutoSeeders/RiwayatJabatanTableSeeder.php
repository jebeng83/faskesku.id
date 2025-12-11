<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RiwayatJabatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('riwayat_jabatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('riwayat_jabatan')->insert(array (
          0 => 
          array (
            'id' => 116,
            'jabatan' => 'tes',
            'tmt_pangkat' => '2024-11-12',
            'tmt_pangkat_yad' => '2024-11-12',
            'pejabat_penetap' => 'tes',
            'nomor_sk' => '099',
            'tgl_sk' => '2024-11-12',
            'dasar_peraturan' => '88',
            'masa_kerja' => 5,
            'bln_kerja' => 1,
            'berkas' => 'pages/riwayatpangkat/berkas/photo_merah_hitam.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}