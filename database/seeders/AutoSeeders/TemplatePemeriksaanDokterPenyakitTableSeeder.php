<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterPenyakitTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_penyakit')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_penyakit')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000001',
            'kd_penyakit' => 'A02.0',
            'urut' => 1,
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000002',
            'kd_penyakit' => 'I50.0',
            'urut' => 1,
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000003',
            'kd_penyakit' => 'A15.1',
            'urut' => 1,
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_penyakit' => 'A01',
            'urut' => 1,
          ),
          4 => 
          array (
            'no_template' => 'TPD0000000000000005',
            'kd_penyakit' => 'A01.1',
            'urut' => 1,
          ),
          5 => 
          array (
            'no_template' => 'TPD0000000000000008',
            'kd_penyakit' => 'A00.0',
            'urut' => 1,
          ),
          6 => 
          array (
            'no_template' => 'TPD0000000000000009',
            'kd_penyakit' => 'I50.0',
            'urut' => 1,
          ),
          7 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kd_penyakit' => 'A01.0',
            'urut' => 1,
          ),
          8 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_penyakit' => 'A01.1',
            'urut' => 1,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}