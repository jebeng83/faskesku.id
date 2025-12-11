<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RiwayatPersalinanPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('riwayat_persalinan_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('riwayat_persalinan_pasien')->insert(array (
          0 => 
          array (
            'no_rkm_medis' => '000002',
            'tgl_thn' => '2025-01-05',
            'tempat_persalinan' => '1',
            'usia_hamil' => '6',
            'jenis_persalinan' => '2',
            'penolong' => '3',
            'penyulit' => '4',
            'jk' => 'L',
            'bbpb' => '7',
            'keadaan' => '5',
          ),
          1 => 
          array (
            'no_rkm_medis' => '000010',
            'tgl_thn' => '2025-06-19',
            'tempat_persalinan' => '1',
            'usia_hamil' => '-',
            'jenis_persalinan' => '1',
            'penolong' => '1',
            'penyulit' => '1',
            'jk' => 'L',
            'bbpb' => '-',
            'keadaan' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}