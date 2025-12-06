<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SisaDietPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('sisa_diet_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('sisa_diet_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-05-26',
            'waktu' => 'Pagi',
            'karbohidrat' => 0,
            'hewani' => 30,
            'nabati' => 0,
            'sayur' => 0,
            'buah' => 20,
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-19',
            'waktu' => 'Pagi2',
            'karbohidrat' => 0,
            'hewani' => 20,
            'nabati' => 0,
            'sayur' => 0,
            'buah' => 0,
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-06-30',
            'waktu' => 'Siang',
            'karbohidrat' => 0,
            'hewani' => 0,
            'nabati' => 0,
            'sayur' => 0,
            'buah' => 30,
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-07-29',
            'waktu' => 'Pagi',
            'karbohidrat' => 0,
            'hewani' => 0,
            'nabati' => 0,
            'sayur' => 0,
            'buah' => 0,
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-08-04',
            'waktu' => 'Pagi',
            'karbohidrat' => 0,
            'hewani' => 30,
            'nabati' => 0,
            'sayur' => 0,
            'buah' => 0,
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-18',
            'waktu' => 'Pagi',
            'karbohidrat' => 0,
            'hewani' => 0,
            'nabati' => 0,
            'sayur' => 0,
            'buah' => 0,
          ),
          6 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'kd_kamar' => 'K3.01',
            'tanggal' => '2025-06-28',
            'waktu' => 'Pagi2',
            'karbohidrat' => 0,
            'hewani' => 0,
            'nabati' => 20,
            'sayur' => 0,
            'buah' => 0,
          ),
          7 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'kd_kamar' => 'VUP.01',
            'tanggal' => '2025-06-30',
            'waktu' => 'Siang',
            'karbohidrat' => 0,
            'hewani' => 0,
            'nabati' => 0,
            'sayur' => 20,
            'buah' => 0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}