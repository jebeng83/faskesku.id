<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GambarRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('gambar_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('gambar_radiologi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_periksa' => '2025-06-11',
            'jam' => '19:20:31',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'tgl_periksa' => '2025-04-27',
            'jam' => '08:48:08',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          2 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tgl_periksa' => '2025-05-26',
            'jam' => '10:51:25',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tgl_periksa' => '2025-08-05',
            'jam' => '13:38:16',
            'lokasi_gambar' => 'pages/upload/polos1_Thorak.jpg',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'tgl_periksa' => '2025-06-25',
            'jam' => '09:02:18',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tgl_periksa' => '2025-06-30',
            'jam' => '09:56:57',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          6 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'tgl_periksa' => '2025-07-29',
            'jam' => '09:45:48',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'tgl_periksa' => '2025-08-04',
            'jam' => '10:31:51',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tgl_periksa' => '2025-08-19',
            'jam' => '11:11:22',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'tgl_periksa' => '2025-08-21',
            'jam' => '14:55:50',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
          10 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'tgl_periksa' => '2025-08-25',
            'jam' => '14:10:21',
            'lokasi_gambar' => 'pages/upload/polos1.jpg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}