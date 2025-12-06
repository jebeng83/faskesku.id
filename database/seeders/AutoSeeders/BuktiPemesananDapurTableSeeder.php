<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPemesananDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pemesanan_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pemesanan_dapur')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PD20241114001',
            'photo' => 'pages/upload/PD20241114001.jpeg',
          ),
          1 => 
          array (
            'no_faktur' => 'PD20241122001',
            'photo' => '',
          ),
          2 => 
          array (
            'no_faktur' => 'PD20250211001',
            'photo' => 'pages/upload/PD20250211001.jpeg',
          ),
          3 => 
          array (
            'no_faktur' => 'PD20250804001',
            'photo' => 'pages/upload/PD20250804001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}