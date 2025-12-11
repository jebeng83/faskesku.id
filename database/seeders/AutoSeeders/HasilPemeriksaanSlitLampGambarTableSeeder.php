<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanSlitLampGambarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_slit_lamp_gambar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_slit_lamp_gambar')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'photo' => 'pages/upload/polos1.jpg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}