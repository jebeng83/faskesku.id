<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanPemeriksaanRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_pemeriksaan_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_pemeriksaan_radiologi')->insert(array (
          0 => 
          array (
            'noorder' => 'PR202504270001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          1 => 
          array (
            'noorder' => 'PR202504270002',
            'kd_jenis_prw' => 'IG.AS-K1',
            'stts_bayar' => 'Belum',
          ),
          2 => 
          array (
            'noorder' => 'PR202505260001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          3 => 
          array (
            'noorder' => 'PR202506030001',
            'kd_jenis_prw' => 'IG.AS- 1',
            'stts_bayar' => 'Belum',
          ),
          4 => 
          array (
            'noorder' => 'PR202506030002',
            'kd_jenis_prw' => 'IG.AS- 1',
            'stts_bayar' => 'Belum',
          ),
          5 => 
          array (
            'noorder' => 'PR202506110001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          6 => 
          array (
            'noorder' => 'PR202506200001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          7 => 
          array (
            'noorder' => 'PR202506200002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          8 => 
          array (
            'noorder' => 'PR202506230001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          9 => 
          array (
            'noorder' => 'PR202506280001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          10 => 
          array (
            'noorder' => 'PR202506300001',
            'kd_jenis_prw' => 'IG.AS- 1',
            'stts_bayar' => 'Belum',
          ),
          11 => 
          array (
            'noorder' => 'PR202507040001',
            'kd_jenis_prw' => 'ICU-01',
            'stts_bayar' => 'Belum',
          ),
          12 => 
          array (
            'noorder' => 'PR202507040002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          13 => 
          array (
            'noorder' => 'PR202507050001',
            'kd_jenis_prw' => 'ICU-01',
            'stts_bayar' => 'Belum',
          ),
          14 => 
          array (
            'noorder' => 'PR202507050002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          15 => 
          array (
            'noorder' => 'PR202507070001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          16 => 
          array (
            'noorder' => 'PR202507070002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          17 => 
          array (
            'noorder' => 'PR202507210001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          18 => 
          array (
            'noorder' => 'PR202507230001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          19 => 
          array (
            'noorder' => 'PR202507230002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          20 => 
          array (
            'noorder' => 'PR202507290001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          21 => 
          array (
            'noorder' => 'PR202508040001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          22 => 
          array (
            'noorder' => 'PR202508040002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          23 => 
          array (
            'noorder' => 'PR202508040003',
            'kd_jenis_prw' => 'IG.AS- 1',
            'stts_bayar' => 'Belum',
          ),
          24 => 
          array (
            'noorder' => 'PR202508040003',
            'kd_jenis_prw' => 'IG.AS.RJ 4',
            'stts_bayar' => 'Belum',
          ),
          25 => 
          array (
            'noorder' => 'PR202508040003',
            'kd_jenis_prw' => 'IG.AS.RJ 5',
            'stts_bayar' => 'Belum',
          ),
          26 => 
          array (
            'noorder' => 'PR202508110001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          27 => 
          array (
            'noorder' => 'PR202508110002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          28 => 
          array (
            'noorder' => 'PR202508190001',
            'kd_jenis_prw' => 'IG.AS- 1',
            'stts_bayar' => 'Belum',
          ),
          29 => 
          array (
            'noorder' => 'PR202508210001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          30 => 
          array (
            'noorder' => 'PR202508250001',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
          31 => 
          array (
            'noorder' => 'PR202508250002',
            'kd_jenis_prw' => 'ICU.CTO-01',
            'stts_bayar' => 'Belum',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}