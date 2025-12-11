<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPemesananLogistikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pemesanan_logistik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pemesanan_logistik')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PNM20250130001',
            'photo' => 'pages/upload/PNM20250130001.jpeg',
          ),
          1 => 
          array (
            'no_faktur' => 'PNM20250619002',
            'photo' => 'pages/upload/PNM20250619002.jpeg',
          ),
          2 => 
          array (
            'no_faktur' => 'PNM20250813001',
            'photo' => 'pages/upload/PNM20250813001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}