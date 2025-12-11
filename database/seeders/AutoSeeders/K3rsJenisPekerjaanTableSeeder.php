<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsJenisPekerjaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_jenis_pekerjaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_jenis_pekerjaan')->insert(array (
          0 => 
          array (
            'kode_pekerjaan' => 'PK001',
            'jenis_pekerjaan' => 'Operator atau penumpang pada peralatan transportasi',
          ),
          1 => 
          array (
            'kode_pekerjaan' => 'PK002',
            'jenis_pekerjaan' => 'Melakukan pengambilan sampel darah pasien',
          ),
          2 => 
          array (
            'kode_pekerjaan' => 'PK003',
            'jenis_pekerjaan' => 'Menginfus pasien',
          ),
          3 => 
          array (
            'kode_pekerjaan' => 'PK004',
            'jenis_pekerjaan' => 'Pencucian alat medis',
          ),
          4 => 
          array (
            'kode_pekerjaan' => 'PK005',
            'jenis_pekerjaan' => 'Pembuangan jarum suntik',
          ),
          5 => 
          array (
            'kode_pekerjaan' => 'PK006',
            'jenis_pekerjaan' => 'Pekerjaan spesifik lainnya yang belum terklasifikasi',
          ),
          6 => 
          array (
            'kode_pekerjaan' => 'PK007',
            'jenis_pekerjaan' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}