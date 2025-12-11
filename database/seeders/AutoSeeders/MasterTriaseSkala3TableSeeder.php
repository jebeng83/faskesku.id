<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriaseSkala3TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala3')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala3')->insert(array (
          0 => 
          array (
            'kode_pemeriksaan' => '001',
            'kode_skala3' => '001',
            'pengkajian_skala3' => 'Bebas',
          ),
          1 => 
          array (
            'kode_pemeriksaan' => '002',
            'kode_skala3' => '002',
            'pengkajian_skala3' => 'Frekuensi nafas 24- 40x/menit',
          ),
          2 => 
          array (
            'kode_pemeriksaan' => '003',
            'kode_skala3' => '003',
            'pengkajian_skala3' => 'Retraksi ringan',
          ),
          3 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala3' => '004',
            'pengkajian_skala3' => 'Nadi 121-150x/menit',
          ),
          4 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala3' => '005',
            'pengkajian_skala3' => 'Sistolik 160-200mmHg',
          ),
          5 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala3' => '006',
            'pengkajian_skala3' => 'Akral hangat',
          ),
          6 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala3' => '007',
            'pengkajian_skala3' => 'Nadi perifer teraba',
          ),
          7 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala3' => '008',
            'pengkajian_skala3' => 'Pucat',
          ),
          8 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala3' => '009',
            'pengkajian_skala3' => 'Hangat',
          ),
          9 => 
          array (
            'kode_pemeriksaan' => '006',
            'kode_skala3' => '010',
            'pengkajian_skala3' => 'Respon terhadap verbal (GCS 13 - 14)',
          ),
          10 => 
          array (
            'kode_pemeriksaan' => '007',
            'kode_skala3' => '011',
            'pengkajian_skala3' => 'Nyeri Jantung VAS 1-6',
          ),
          11 => 
          array (
            'kode_pemeriksaan' => '007',
            'kode_skala3' => '012',
            'pengkajian_skala3' => 'Nyeri Selain Jantung, VAS 7 - 10',
          ),
          12 => 
          array (
            'kode_pemeriksaan' => '008',
            'kode_skala3' => '013',
            'pengkajian_skala3' => 'Urgent/ Mendesak',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}