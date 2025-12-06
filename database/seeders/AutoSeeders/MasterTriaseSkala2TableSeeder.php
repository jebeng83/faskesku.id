<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriaseSkala2TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala2')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_skala2')->insert(array (
          0 => 
          array (
            'kode_pemeriksaan' => '001',
            'kode_skala2' => '001',
            'pengkajian_skala2' => 'Sumbatan Parsial',
          ),
          1 => 
          array (
            'kode_pemeriksaan' => '002',
            'kode_skala2' => '002',
            'pengkajian_skala2' => 'Ada Nafas',
          ),
          2 => 
          array (
            'kode_pemeriksaan' => '003',
            'kode_skala2' => '003',
            'pengkajian_skala2' => 'Retraksi sedang',
          ),
          3 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala2' => '004',
            'pengkajian_skala2' => 'Nadi perifer tidak teraba',
          ),
          4 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala2' => '005',
            'pengkajian_skala2' => 'CRT > 2 detik',
          ),
          5 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala2' => '006',
            'pengkajian_skala2' => 'Akral Dingin',
          ),
          6 => 
          array (
            'kode_pemeriksaan' => '004',
            'kode_skala2' => '007',
            'pengkajian_skala2' => 'Pucat',
          ),
          7 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala2' => '008',
            'pengkajian_skala2' => 'Nadi perifer tidak teraba',
          ),
          8 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala2' => '009',
            'pengkajian_skala2' => 'Pucat',
          ),
          9 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala2' => '010',
            'pengkajian_skala2' => 'Akral Dingin',
          ),
          10 => 
          array (
            'kode_pemeriksaan' => '005',
            'kode_skala2' => '011',
            'pengkajian_skala2' => 'CRT 2 - 4 detik',
          ),
          11 => 
          array (
            'kode_pemeriksaan' => '006',
            'kode_skala2' => '012',
            'pengkajian_skala2' => 'Respon terhadap nyeri (GCS 9 - 12)',
          ),
          12 => 
          array (
            'kode_pemeriksaan' => '007',
            'kode_skala2' => '013',
            'pengkajian_skala2' => 'Nyeri jantung VAS 7-9',
          ),
          13 => 
          array (
            'kode_pemeriksaan' => '008',
            'kode_skala2' => '014',
            'pengkajian_skala2' => 'Emergent/ Gawat Darurat',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}