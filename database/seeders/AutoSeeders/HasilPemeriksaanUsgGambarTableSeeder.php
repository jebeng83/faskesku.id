<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanUsgGambarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_usg_gambar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_usg_gambar')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'photo' => 'pages/upload/polos1.jpg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}