<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailBeriDietTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_beri_diet')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_beri_diet')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-05-26',
            'waktu' => 'Pagi',
            'kd_diet' => 'D01',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-05-26',
            'waktu' => 'Pagi',
            'kd_diet' => 'D02',
          ),
          2 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-19',
            'waktu' => 'Pagi2',
            'kd_diet' => 'D01',
          ),
          3 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-19',
            'waktu' => 'Sore',
            'kd_diet' => 'D02',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-06-30',
            'waktu' => 'Pagi',
            'kd_diet' => 'D01',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-06-30',
            'waktu' => 'Siang',
            'kd_diet' => 'D02',
          ),
          6 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-07-29',
            'waktu' => 'Pagi',
            'kd_diet' => 'D01',
          ),
          7 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-07-29',
            'waktu' => 'Sore',
            'kd_diet' => 'D04',
          ),
          8 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-08-04',
            'waktu' => 'Pagi',
            'kd_diet' => 'D04',
          ),
          9 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-08-04',
            'waktu' => 'Pagi2',
            'kd_diet' => 'D03',
          ),
          10 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-18',
            'waktu' => 'Pagi',
            'kd_diet' => 'D03',
          ),
          11 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-18',
            'waktu' => 'Siang',
            'kd_diet' => 'D02',
          ),
          12 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-23',
            'waktu' => 'Sore',
            'kd_diet' => 'D02',
          ),
          13 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-23',
            'waktu' => 'Malam',
            'kd_diet' => 'D02',
          ),
          14 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-06-28',
            'waktu' => 'Pagi2',
            'kd_diet' => 'D02',
          ),
          15 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-30',
            'waktu' => 'Pagi',
            'kd_diet' => 'D03',
          ),
          16 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-30',
            'waktu' => 'Siang',
            'kd_diet' => 'D02',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}