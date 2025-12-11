<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EvaluasiKinerjaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('evaluasi_kinerja')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('evaluasi_kinerja')->insert(array (
          0 => 
          array (
            'kode_evaluasi' => 'I',
            'nama_evaluasi' => 'POSISI V BILA NILAI EKK HASILNYA KURANG',
            'indek' => 1,
          ),
          1 => 
          array (
            'kode_evaluasi' => 'II',
            'nama_evaluasi' => 'POSISI II BILA NILAI EKK HASILNYA  SEDANG',
            'indek' => 3,
          ),
          2 => 
          array (
            'kode_evaluasi' => 'III',
            'nama_evaluasi' => 'POSISI III BILA NILAI EKK HASILNYA CUKUP',
            'indek' => 5,
          ),
          3 => 
          array (
            'kode_evaluasi' => 'IV',
            'nama_evaluasi' => 'POSISI IV BILA NILAI EKK HASILNYA BAIK',
            'indek' => 7,
          ),
          4 => 
          array (
            'kode_evaluasi' => 'V',
            'nama_evaluasi' => 'POSISI V BILA NILAI EKK HASILNYA SANGAT BAIK',
            'indek' => 9,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}