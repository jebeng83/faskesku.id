<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriaseSkala5TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala5')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala5')->insert(array (
          0 => 
          array (
            'kode_pemeriksaan' => '001',
            'kode_skala5' => '001',
            'pengkajian_skala5' => 'Bebas',
          ),
          1 => 
          array (
            'kode_pemeriksaan' => '002',
            'kode_skala5' => '002',
            'pengkajian_skala5' => 'Frekwensi Nafas 12 - 20x/menit',
          ),
          2 => 
          array (
            'kode_pemeriksaan' => '003',
            'kode_skala5' => '003',
            'pengkajian_skala5' => 'Tidak ada retraksi',
          ),
          3 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala5' => '004',
            'pengkajian_skala5' => 'Nadi 60 - 80x/menit',
          ),
          4 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala5' => '005',
            'pengkajian_skala5' => 'Sistolik < 120 mmHg',
          ),
          5 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala5' => '006',
            'pengkajian_skala5' => 'Akral hangat',
          ),
          6 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala5' => '007',
            'pengkajian_skala5' => 'Nadi Perifer teraba',
          ),
          7 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala5' => '008',
            'pengkajian_skala5' => 'Merah Muda',
          ),
          8 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala5' => '009',
            'pengkajian_skala5' => 'Hangat',
          ),
          9 => 
          array (
            'kode_pemeriksaan' => '006',
            'kode_skala5' => '010',
            'pengkajian_skala5' => 'Sadar Penuh (GCS 15)',
          ),
          10 => 
          array (
            'kode_pemeriksaan' => '007',
            'kode_skala5' => '011',
            'pengkajian_skala5' => 'Tidak ada nyeri',
          ),
          11 => 
          array (
            'kode_pemeriksaan' => '008',
            'kode_skala5' => '012',
            'pengkajian_skala5' => 'Non Urgent/ Tidak Mendesak',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}