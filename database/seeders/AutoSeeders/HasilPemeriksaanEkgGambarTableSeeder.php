<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanEkgGambarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_ekg_gambar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_ekg_gambar')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'photo' => 'pages/upload/polos1_Thorak.jpg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}