<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterTindakanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_tindakan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter_tindakan')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => 'C001',
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_jenis_prw' => 'C102',
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000005',
            'kd_jenis_prw' => 'RJ00861',
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000008',
            'kd_jenis_prw' => 'C038',
          ),
          4 => 
          array (
            'no_template' => 'TPD0000000000000008',
            'kd_jenis_prw' => 'C039',
          ),
          5 => 
          array (
            'no_template' => 'TPD0000000000000009',
            'kd_jenis_prw' => 'C370',
          ),
          6 => 
          array (
            'no_template' => 'TPD0000000000000009',
            'kd_jenis_prw' => 'C515',
          ),
          7 => 
          array (
            'no_template' => 'TPD0000000000000009',
            'kd_jenis_prw' => 'RJ00002',
          ),
          8 => 
          array (
            'no_template' => 'TPD0000000000000009',
            'kd_jenis_prw' => 'RJ00864',
          ),
          9 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kd_jenis_prw' => 'RJ00861',
          ),
          10 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_jenis_prw' => 'J000812',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}