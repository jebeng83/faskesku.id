<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterDetailPermintaanLabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_detail_permintaan_lab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_detail_permintaan_lab')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 665,
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 666,
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 667,
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 668,
          ),
          4 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 669,
          ),
          5 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 670,
          ),
          6 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 671,
          ),
          7 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 672,
          ),
          8 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 673,
          ),
          9 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 674,
          ),
          10 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 675,
          ),
          11 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2198,
          ),
          12 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2199,
          ),
          13 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2200,
          ),
          14 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2201,
          ),
          15 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2202,
          ),
          16 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 665,
          ),
          17 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 665,
          ),
          18 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 671,
          ),
          19 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 672,
          ),
          20 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 674,
          ),
          21 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 675,
          ),
          22 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2198,
          ),
          23 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => '102-K.2',
            'id_template' => 2201,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}