<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPenyerahanResepObatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_penyerahan_resep_obat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_penyerahan_resep_obat')->insert(array (
          0 => 
          array (
            'no_resep' => '202504260001',
            'photo' => 'pages/upload/202504260001.jpeg',
          ),
          1 => 
          array (
            'no_resep' => '202504270002',
            'photo' => 'pages/upload/202504270002.jpeg',
          ),
          2 => 
          array (
            'no_resep' => '202505260001',
            'photo' => 'pages/upload/202505260001.jpeg',
          ),
          3 => 
          array (
            'no_resep' => '202506300001',
            'photo' => 'pages/upload/202506300001.jpeg',
          ),
          4 => 
          array (
            'no_resep' => '202507140001',
            'photo' => 'pages/upload/202507140001.jpeg',
          ),
          5 => 
          array (
            'no_resep' => '202507230002',
            'photo' => 'pages/upload/202507230002.jpeg',
          ),
          6 => 
          array (
            'no_resep' => '202507290001',
            'photo' => 'pages/upload/202507290001.jpeg',
          ),
          7 => 
          array (
            'no_resep' => '202508040002',
            'photo' => 'pages/upload/202508040002.jpeg',
          ),
          8 => 
          array (
            'no_resep' => '202508110001',
            'photo' => 'pages/upload/202508110001.jpeg',
          ),
          9 => 
          array (
            'no_resep' => '202508190001',
            'photo' => 'pages/upload/202508190001.jpeg',
          ),
          10 => 
          array (
            'no_resep' => '202508210001',
            'photo' => 'pages/upload/202508210001.jpeg',
          ),
          11 => 
          array (
            'no_resep' => '202508250002',
            'photo' => 'pages/upload/202508250002.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}