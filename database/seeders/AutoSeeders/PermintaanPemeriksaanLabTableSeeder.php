<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanPemeriksaanLabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_pemeriksaan_lab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_pemeriksaan_lab')->insert(array (
          0 => 
          array (
            'noorder' => 'PK202504260001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          1 => 
          array (
            'noorder' => 'PK202504270001',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          2 => 
          array (
            'noorder' => 'PK202504270002',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          3 => 
          array (
            'noorder' => 'PK202505260001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          4 => 
          array (
            'noorder' => 'PK202506030001',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          5 => 
          array (
            'noorder' => 'PK202506030002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          6 => 
          array (
            'noorder' => 'PK202506040001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          7 => 
          array (
            'noorder' => 'PK202506110001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          8 => 
          array (
            'noorder' => 'PK202506190001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          9 => 
          array (
            'noorder' => 'PK202506190002',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          10 => 
          array (
            'noorder' => 'PK202506190003',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          11 => 
          array (
            'noorder' => 'PK202506200001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          12 => 
          array (
            'noorder' => 'PK202506200002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          13 => 
          array (
            'noorder' => 'PK202506230001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          14 => 
          array (
            'noorder' => 'PK202506280001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          15 => 
          array (
            'noorder' => 'PK202506280002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          16 => 
          array (
            'noorder' => 'PK202506300001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          17 => 
          array (
            'noorder' => 'PK202507040001',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          18 => 
          array (
            'noorder' => 'PK202507040002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          19 => 
          array (
            'noorder' => 'PK202507050001',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          20 => 
          array (
            'noorder' => 'PK202507050002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          21 => 
          array (
            'noorder' => 'PK202507070001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          22 => 
          array (
            'noorder' => 'PK202507070002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          23 => 
          array (
            'noorder' => 'PK202507080001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          24 => 
          array (
            'noorder' => 'PK202507080002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          25 => 
          array (
            'noorder' => 'PK202507140001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          26 => 
          array (
            'noorder' => 'PK202507210001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          27 => 
          array (
            'noorder' => 'PK202507230001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          28 => 
          array (
            'noorder' => 'PK202507230002',
            'kd_jenis_prw' => '101-K.3',
            'stts_bayar' => 'Belum',
          ),
          29 => 
          array (
            'noorder' => 'PK202507290001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          30 => 
          array (
            'noorder' => 'PK202507290001',
            'kd_jenis_prw' => '435-RJ',
            'stts_bayar' => 'Belum',
          ),
          31 => 
          array (
            'noorder' => 'PK202508040001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          32 => 
          array (
            'noorder' => 'PK202508040002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          33 => 
          array (
            'noorder' => 'PK202508050001',
            'kd_jenis_prw' => 'J000110',
            'stts_bayar' => 'Belum',
          ),
          34 => 
          array (
            'noorder' => 'PK202508110001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          35 => 
          array (
            'noorder' => 'PK202508190001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          36 => 
          array (
            'noorder' => 'PK202508190002',
            'kd_jenis_prw' => 'J000111',
            'stts_bayar' => 'Belum',
          ),
          37 => 
          array (
            'noorder' => 'PK202508210001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          38 => 
          array (
            'noorder' => 'PK202508250001',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
          39 => 
          array (
            'noorder' => 'PK202508250002',
            'kd_jenis_prw' => '102-K.2',
            'stts_bayar' => 'Belum',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}