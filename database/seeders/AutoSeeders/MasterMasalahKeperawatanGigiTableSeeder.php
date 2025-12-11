<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahKeperawatanGigiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_gigi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_keperawatan_gigi')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'Resiko Infeksi',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'Nyeri',
          ),
          2 => 
          array (
            'kode_masalah' => '003',
            'nama_masalah' => 'Gangguan rasa nyaman/gatal',
          ),
          3 => 
          array (
            'kode_masalah' => '004',
            'nama_masalah' => 'Infeksi',
          ),
          4 => 
          array (
            'kode_masalah' => '005',
            'nama_masalah' => 'Resiko terjadi perdarahan',
          ),
          5 => 
          array (
            'kode_masalah' => '006',
            'nama_masalah' => 'Gangguan body image',
          ),
          6 => 
          array (
            'kode_masalah' => '007',
            'nama_masalah' => 'Gangguan komunikasi',
          ),
          7 => 
          array (
            'kode_masalah' => '008',
            'nama_masalah' => 'Marah/cemas/takut',
          ),
          8 => 
          array (
            'kode_masalah' => '009',
            'nama_masalah' => 'Lubang gigi yang tidak dirawat',
          ),
          9 => 
          array (
            'kode_masalah' => '010',
            'nama_masalah' => 'Kurang pengetahuan tentang kesehatan gigi dan mulut',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}