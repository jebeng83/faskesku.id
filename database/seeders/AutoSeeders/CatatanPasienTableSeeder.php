<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_pasien')->insert(array (
          0 => 
          array (
            'no_rkm_medis' => '000003',
            'catatan' => 'pasien error, marah2, keluarga bupati',
          ),
          1 => 
          array (
            'no_rkm_medis' => '000006',
            'catatan' => 'KELUARGA BUPATI/HIV/ERROE',
          ),
          2 => 
          array (
            'no_rkm_medis' => '000009',
            'catatan' => 'alergi telur, keluarga bupati',
          ),
          3 => 
          array (
            'no_rkm_medis' => '000013',
            'catatan' => 'pasien belum bayar, anak pejabat, kalau datang marah2. TES',
          ),
          4 => 
          array (
            'no_rkm_medis' => '000014',
            'catatan' => 'Lab Gawat',
          ),
          5 => 
          array (
            'no_rkm_medis' => '000019',
            'catatan' => 'PASIEN ERROR, KALAU DATANG2 NGAMUK2',
          ),
          6 => 
          array (
            'no_rkm_medis' => '000047',
            'catatan' => 'HIV POSITIF',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}