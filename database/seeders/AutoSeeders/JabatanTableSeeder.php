<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JabatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jabatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jabatan')->insert(array (
          0 => 
          array (
            'kd_jbtn' => 'J001',
            'nm_jbtn' => '-',
          ),
          1 => 
          array (
            'kd_jbtn' => 'J002',
            'nm_jbtn' => 'analis kesehatan',
          ),
          2 => 
          array (
            'kd_jbtn' => 'APT',
            'nm_jbtn' => 'APOTEKER',
          ),
          3 => 
          array (
            'kd_jbtn' => 'J008',
            'nm_jbtn' => 'BIDAN',
          ),
          4 => 
          array (
            'kd_jbtn' => 'J014',
            'nm_jbtn' => 'FISIOTERAPI',
          ),
          5 => 
          array (
            'kd_jbtn' => 'J005',
            'nm_jbtn' => 'IT',
          ),
          6 => 
          array (
            'kd_jbtn' => 'J006',
            'nm_jbtn' => 'Keuangan',
          ),
          7 => 
          array (
            'kd_jbtn' => 'J007',
            'nm_jbtn' => 'pengadaan jangum',
          ),
          8 => 
          array (
            'kd_jbtn' => 'J003',
            'nm_jbtn' => 'Perawat Kesehatan',
          ),
          9 => 
          array (
            'kd_jbtn' => 'J004',
            'nm_jbtn' => 'Perayu Pasien Wanita',
          ),
          10 => 
          array (
            'kd_jbtn' => 'J012',
            'nm_jbtn' => 'SARPRAS',
          ),
          11 => 
          array (
            'kd_jbtn' => 'J009',
            'nm_jbtn' => 'TENAGA TEKNIS KEFARMASIAN',
          ),
          12 => 
          array (
            'kd_jbtn' => 'J011',
            'nm_jbtn' => 'THERAPIS',
          ),
          13 => 
          array (
            'kd_jbtn' => 'J010',
            'nm_jbtn' => 'TTK',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}