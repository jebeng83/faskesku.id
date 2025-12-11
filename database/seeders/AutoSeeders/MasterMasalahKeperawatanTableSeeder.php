<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'Nyeri',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'Pola Tidur',
          ),
          2 => 
          array (
            'kode_masalah' => '003',
            'nama_masalah' => 'Mobilitas/ Aktivitas',
          ),
          3 => 
          array (
            'kode_masalah' => '004',
            'nama_masalah' => 'Integritas Kulit',
          ),
          4 => 
          array (
            'kode_masalah' => '005',
            'nama_masalah' => 'Infeksi',
          ),
          5 => 
          array (
            'kode_masalah' => '006',
            'nama_masalah' => 'Risiko Injury/ cedera',
          ),
          6 => 
          array (
            'kode_masalah' => '007',
            'nama_masalah' => 'Nutrisi',
          ),
          7 => 
          array (
            'kode_masalah' => '008',
            'nama_masalah' => 'Eliminasi',
          ),
          8 => 
          array (
            'kode_masalah' => '009',
            'nama_masalah' => 'Pengetahuan / komunikasi',
          ),
          9 => 
          array (
            'kode_masalah' => '010',
            'nama_masalah' => 'Keseimbangan cairan dan Elektrolit',
          ),
          10 => 
          array (
            'kode_masalah' => '011',
            'nama_masalah' => 'Jalan napas/ pertukaran gas',
          ),
          11 => 
          array (
            'kode_masalah' => '012',
            'nama_masalah' => 'Perawatan Luka',
          ),
          12 => 
          array (
            'kode_masalah' => '013',
            'nama_masalah' => 'Konflik Peran',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}