<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BerkasDigitalPerawatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('berkas_digital_perawatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('berkas_digital_perawatan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'kode' => '008',
            'lokasi_file' => 'pages/upload/WhatsApp_Image_2025-05-02_at_10.23.03.jpeg',
          ),
          1 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'kode' => '007',
            'lokasi_file' => 'pages/upload/photo_merah_hitam.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}