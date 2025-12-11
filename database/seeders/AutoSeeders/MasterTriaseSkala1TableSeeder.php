<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriaseSkala1TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala1')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala1')->insert(array (
          0 => 
          array (
            'kode_pemeriksaan' => '001',
            'kode_skala1' => '001',
            'pengkajian_skala1' => 'Sumbatan Total',
          ),
          1 => 
          array (
            'kode_pemeriksaan' => '002',
            'kode_skala1' => '002',
            'pengkajian_skala1' => 'Henti Nafas',
          ),
          2 => 
          array (
            'kode_pemeriksaan' => '002',
            'kode_skala1' => '003',
            'pengkajian_skala1' => 'Frekuensi Nafas < 10x/menit',
          ),
          3 => 
          array (
            'kode_pemeriksaan' => '003',
            'kode_skala1' => '004',
            'pengkajian_skala1' => 'Henti Nafas',
          ),
          4 => 
          array (
            'kode_pemeriksaan' => '003',
            'kode_skala1' => '005',
            'pengkajian_skala1' => 'Retraksi berat, sianosis',
          ),
          5 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala1' => '006',
            'pengkajian_skala1' => 'Nadi Karotis Tidak Teraba',
          ),
          6 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala1' => '007',
            'pengkajian_skala1' => 'Nadi Karotis Tidak Teraba',
          ),
          7 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala1' => '008',
            'pengkajian_skala1' => 'Pucat',
          ),
          8 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala1' => '009',
            'pengkajian_skala1' => 'Akral Dingin',
          ),
          9 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala1' => '010',
            'pengkajian_skala1' => 'CRT > 4 detik',
          ),
          10 => 
          array (
            'kode_pemeriksaan' => '006',
            'kode_skala1' => '011',
            'pengkajian_skala1' => 'Tidak Respon (GCS < 8)',
          ),
          11 => 
          array (
            'kode_pemeriksaan' => '007',
            'kode_skala1' => '012',
            'pengkajian_skala1' => 'Nyeri Jantung VAS 10',
          ),
          12 => 
          array (
            'kode_pemeriksaan' => '008',
            'kode_skala1' => '013',
            'pengkajian_skala1' => 'Immediate / Segera',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}