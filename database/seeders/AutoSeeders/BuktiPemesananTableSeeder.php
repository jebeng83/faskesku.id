<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPemesananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pemesanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pemesanan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PB20241111001',
            'photo' => 'pages/upload/PB20241111001.jpeg',
          ),
          1 => 
          array (
            'no_faktur' => 'PB20241112001',
            'photo' => 'pages/upload/PB20241112001.jpeg',
          ),
          2 => 
          array (
            'no_faktur' => 'PB20241116001',
            'photo' => 'pages/upload/PB20241116001.jpeg',
          ),
          3 => 
          array (
            'no_faktur' => 'PB20241119001',
            'photo' => 'pages/upload/PB20241119001.jpeg',
          ),
          4 => 
          array (
            'no_faktur' => 'PB20241121001',
            'photo' => 'pages/upload/PB20241121001.jpeg',
          ),
          5 => 
          array (
            'no_faktur' => 'PB20241122001',
            'photo' => 'pages/upload/PB20241122001.jpeg',
          ),
          6 => 
          array (
            'no_faktur' => 'PB20241123001',
            'photo' => 'pages/upload/PB20241123001.jpeg',
          ),
          7 => 
          array (
            'no_faktur' => 'PB20241210001',
            'photo' => 'pages/upload/PB20241210001.jpeg',
          ),
          8 => 
          array (
            'no_faktur' => 'PB20241210002',
            'photo' => 'pages/upload/PB20241210002.jpeg',
          ),
          9 => 
          array (
            'no_faktur' => 'PB20250107002',
            'photo' => 'pages/upload/PB20250107002.jpeg',
          ),
          10 => 
          array (
            'no_faktur' => 'PB20250115001',
            'photo' => 'pages/upload/PB20250115001.jpeg',
          ),
          11 => 
          array (
            'no_faktur' => 'PB20250121001',
            'photo' => 'pages/upload/PB20250121001.jpeg',
          ),
          12 => 
          array (
            'no_faktur' => 'PB20250130001',
            'photo' => 'pages/upload/PB20250130001.jpeg',
          ),
          13 => 
          array (
            'no_faktur' => 'PB20250130002',
            'photo' => 'pages/upload/PB20250130002.jpeg',
          ),
          14 => 
          array (
            'no_faktur' => 'PB20250211001',
            'photo' => 'pages/upload/PB20250211001.jpeg',
          ),
          15 => 
          array (
            'no_faktur' => 'PB20250211002',
            'photo' => 'pages/upload/PB20250211002.jpeg',
          ),
          16 => 
          array (
            'no_faktur' => 'PB20250326001',
            'photo' => 'pages/upload/PB20250326001.jpeg',
          ),
          17 => 
          array (
            'no_faktur' => 'PB20250414001',
            'photo' => 'pages/upload/PB20250414001.jpeg',
          ),
          18 => 
          array (
            'no_faktur' => 'PB20250603001',
            'photo' => 'pages/upload/PB20250603001.jpeg',
          ),
          19 => 
          array (
            'no_faktur' => 'PB20250611001',
            'photo' => 'pages/upload/PB20250611001.jpeg',
          ),
          20 => 
          array (
            'no_faktur' => 'PB20250618001',
            'photo' => 'pages/upload/PB20250618001.jpeg',
          ),
          21 => 
          array (
            'no_faktur' => 'PB20250618002',
            'photo' => 'pages/upload/PB20250618002.jpeg',
          ),
          22 => 
          array (
            'no_faktur' => 'PB20250628001',
            'photo' => 'pages/upload/PB20250628001.jpeg',
          ),
          23 => 
          array (
            'no_faktur' => 'PB20250630001',
            'photo' => 'pages/upload/PB20250630001.jpeg',
          ),
          24 => 
          array (
            'no_faktur' => 'PB20250708001',
            'photo' => 'pages/upload/PB20250708001.jpeg',
          ),
          25 => 
          array (
            'no_faktur' => 'PB20250719001',
            'photo' => 'pages/upload/PB20250719001.jpeg',
          ),
          26 => 
          array (
            'no_faktur' => 'PB20250729001',
            'photo' => 'pages/upload/PB20250729001.jpeg',
          ),
          27 => 
          array (
            'no_faktur' => 'PB20250806001',
            'photo' => 'pages/upload/PB20250806001.jpeg',
          ),
          28 => 
          array (
            'no_faktur' => 'PB20250825001',
            'photo' => 'pages/upload/PB20250825001.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}