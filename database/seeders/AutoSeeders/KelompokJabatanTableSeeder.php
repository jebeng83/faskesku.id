<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KelompokJabatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kelompok_jabatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kelompok_jabatan')->insert(array (
          0 => 
          array (
            'kode_kelompok' => '-',
            'nama_kelompok' => '-',
            'indek' => 0,
          ),
          1 => 
          array (
            'kode_kelompok' => 'AP',
            'nama_kelompok' => 'ANGGOTA POKJA',
            'indek' => 3,
          ),
          2 => 
          array (
            'kode_kelompok' => 'KP',
            'nama_kelompok' => 'KETUA TIM /PANITIA',
            'indek' => 5,
          ),
          3 => 
          array (
            'kode_kelompok' => 'KTA',
            'nama_kelompok' => 'KETUA TIM AKREDITASI',
            'indek' => 9,
          ),
          4 => 
          array (
            'kode_kelompok' => 'SDB',
            'nama_kelompok' => 'SEKRETARIS DAN BENDAHARA',
            'indek' => 3,
          ),
          5 => 
          array (
            'kode_kelompok' => 'SKP',
            'nama_kelompok' => 'SEKRETARIS/KETUA POKJA',
            'indek' => 5,
          ),
          6 => 
          array (
            'kode_kelompok' => 'WKT',
            'nama_kelompok' => 'WAKIL KETUA TIM',
            'indek' => 7,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}