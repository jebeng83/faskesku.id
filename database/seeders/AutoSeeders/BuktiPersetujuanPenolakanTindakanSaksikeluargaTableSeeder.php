<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPersetujuanPenolakanTindakanSaksikeluargaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_persetujuan_penolakan_tindakan_saksikeluarga')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_persetujuan_penolakan_tindakan_saksikeluarga')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'PM20250428001',
            'photo' => 'pages/upload/PM20250428001SK.jpeg',
          ),
          1 => 
          array (
            'no_pernyataan' => 'PM20250526001',
            'photo' => 'pages/upload/PM20250526001SK.jpeg',
          ),
          2 => 
          array (
            'no_pernyataan' => 'PM20250526002',
            'photo' => 'pages/upload/PM20250526002SK.jpeg',
          ),
          3 => 
          array (
            'no_pernyataan' => 'PM20250630001',
            'photo' => 'pages/upload/PM20250630001SK.jpeg',
          ),
          4 => 
          array (
            'no_pernyataan' => 'PM20250704001',
            'photo' => 'pages/upload/PM20250704001SK.jpeg',
          ),
          5 => 
          array (
            'no_pernyataan' => 'PM20250704002',
            'photo' => 'pages/upload/PM20250704002SK.jpeg',
          ),
          6 => 
          array (
            'no_pernyataan' => 'PM20250707001',
            'photo' => 'pages/upload/PM20250707001SK.jpeg',
          ),
          7 => 
          array (
            'no_pernyataan' => 'PM20250814001',
            'photo' => 'pages/upload/PM20250814001SK.jpeg',
          ),
          8 => 
          array (
            'no_pernyataan' => 'PM20250819001',
            'photo' => 'pages/upload/PM20250819001SK.jpeg',
          ),
          9 => 
          array (
            'no_pernyataan' => 'PM20250819002',
            'photo' => 'pages/upload/PM20250819002SK.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}