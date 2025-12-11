<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PasienMatiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pasien_mati')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pasien_mati')->insert(array (
          0 => 
          array (
            'tanggal' => '2024-11-23',
            'jam' => '00:00:00',
            'no_rkm_medis' => '000009',
            'keterangan' => 'tes',
            'temp_meninggal' => '-',
            'icd1' => 'i50',
            'icd2' => 'tes',
            'icd3' => 'tes',
            'icd4' => '-',
            'kd_dokter' => 'D0000004',
          ),
          1 => 
          array (
            'tanggal' => '2023-05-29',
            'jam' => '00:00:00',
            'no_rkm_medis' => '000014',
            'keterangan' => '1',
            'temp_meninggal' => '-',
            'icd1' => '999',
            'icd2' => '1',
            'icd3' => '1',
            'icd4' => '1',
            'kd_dokter' => 'D0000004',
          ),
          2 => 
          array (
            'tanggal' => '2025-08-05',
            'jam' => '00:00:00',
            'no_rkm_medis' => '000023',
            'keterangan' => '-',
            'temp_meninggal' => '-',
            'icd1' => 'wqwqw',
            'icd2' => 'wqw',
            'icd3' => 'wqwqw',
            'icd4' => 'wqwqw',
            'kd_dokter' => 'D0000003',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}