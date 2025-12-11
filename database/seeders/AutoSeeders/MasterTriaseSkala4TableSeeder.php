<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriaseSkala4TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala4')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala4')->insert(array (
          0 => 
          array (
            'kode_pemeriksaan' => '001',
            'kode_skala4' => '001',
            'pengkajian_skala4' => 'Bebas',
          ),
          1 => 
          array (
            'kode_pemeriksaan' => '002',
            'kode_skala4' => '002',
            'pengkajian_skala4' => 'Frekuensi nafas 21- 23x/menit',
          ),
          2 => 
          array (
            'kode_pemeriksaan' => '003',
            'kode_skala4' => '003',
            'pengkajian_skala4' => 'Tidak ada retraksi',
          ),
          3 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala4' => '004',
            'pengkajian_skala4' => 'Nadi 81-120x/menit',
          ),
          4 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala4' => '005',
            'pengkajian_skala4' => 'Sistolik 120-159 mmHg',
          ),
          5 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala4' => '006',
            'pengkajian_skala4' => 'Akral Hangat',
          ),
          6 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala4' => '007',
            'pengkajian_skala4' => 'Nadi perifer teraba',
          ),
          7 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala4' => '008',
            'pengkajian_skala4' => 'Merah Muda',
          ),
          8 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala4' => '009',
            'pengkajian_skala4' => 'Hangat',
          ),
          9 => 
          array (
            'kode_pemeriksaan' => '006',
            'kode_skala4' => '010',
            'pengkajian_skala4' => 'Sadar Penuh (GCS 15)',
          ),
          10 => 
          array (
            'kode_pemeriksaan' => '007',
            'kode_skala4' => '011',
            'pengkajian_skala4' => 'Nyeri Selain Jantung, VAS 1-6',
          ),
          11 => 
          array (
            'kode_pemeriksaan' => '008',
            'kode_skala4' => '012',
            'pengkajian_skala4' => 'Semi Urgent / Kurang Mendesak',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}