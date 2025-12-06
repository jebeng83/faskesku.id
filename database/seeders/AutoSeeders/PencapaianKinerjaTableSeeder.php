<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PencapaianKinerjaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pencapaian_kinerja')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pencapaian_kinerja')->insert(array (
          0 => 
          array (
            'kode_pencapaian' => 'I',
            'nama_pencapaian' => 'POSISI I BILA HASIL KERJA 70% DARI TARGET',
            'indek' => 1,
          ),
          1 => 
          array (
            'kode_pencapaian' => 'II',
            'nama_pencapaian' => 'POSISI II BILA HASIL KERJA 90% -  100% DARI TARGET',
            'indek' => 3,
          ),
          2 => 
          array (
            'kode_pencapaian' => 'III',
            'nama_pencapaian' => 'POSISI III BILA HASIL KERJA > 100% DARI TARGET',
            'indek' => 5,
          ),
          3 => 
          array (
            'kode_pencapaian' => 'IV',
            'nama_pencapaian' => 'POSISI IV BILA HASIL KERJA > 100% DARI TARGET',
            'indek' => 7,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}