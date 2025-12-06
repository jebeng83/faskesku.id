<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanAnakTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_anak')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_anak')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'Nyeri Bayi',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'Pola tidur',
          ),
          2 => 
          array (
            'kode_masalah' => '003',
            'nama_masalah' => 'Integritas Kulit',
          ),
          3 => 
          array (
            'kode_masalah' => '004',
            'nama_masalah' => 'Infeksi',
          ),
          4 => 
          array (
            'kode_masalah' => '005',
            'nama_masalah' => 'Nutrisi',
          ),
          5 => 
          array (
            'kode_masalah' => '006',
            'nama_masalah' => 'Eliminasi',
          ),
          6 => 
          array (
            'kode_masalah' => '007',
            'nama_masalah' => 'Suhu tubuh',
          ),
          7 => 
          array (
            'kode_masalah' => '008',
            'nama_masalah' => 'Pengetahuan/ Komunikasi',
          ),
          8 => 
          array (
            'kode_masalah' => '009',
            'nama_masalah' => 'Keseimbangan cairan dan Elektrolit',
          ),
          9 => 
          array (
            'kode_masalah' => '010',
            'nama_masalah' => 'Perfusi Jaringan',
          ),
          10 => 
          array (
            'kode_masalah' => '011',
            'nama_masalah' => 'Jalan napas/pertukaran gas',
          ),
          11 => 
          array (
            'kode_masalah' => '012',
            'nama_masalah' => 'Mobilitas/Aktivitas',
          ),
          12 => 
          array (
            'kode_masalah' => '013',
            'nama_masalah' => 'Risiko Injury/cedera',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}