<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPersetujuanPenolakanTindakanPenerimainformasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_persetujuan_penolakan_tindakan_penerimainformasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_persetujuan_penolakan_tindakan_penerimainformasi')->insert(array (
          0 => 
          array (
            'no_pernyataan' => 'PM20250426001',
            'photo' => 'pages/upload/PM20250426001PP.jpeg',
          ),
          1 => 
          array (
            'no_pernyataan' => 'PM20250428001',
            'photo' => 'pages/upload/PM20250428001PP.jpeg',
          ),
          2 => 
          array (
            'no_pernyataan' => 'PM20250522001',
            'photo' => 'pages/upload/PM20250522001PP.jpeg',
          ),
          3 => 
          array (
            'no_pernyataan' => 'PM20250526001',
            'photo' => 'pages/upload/PM20250526001PP.jpeg',
          ),
          4 => 
          array (
            'no_pernyataan' => 'PM20250526002',
            'photo' => 'pages/upload/PM20250526002PP.jpeg',
          ),
          5 => 
          array (
            'no_pernyataan' => 'PM20250623001',
            'photo' => 'pages/upload/PM20250623001PP.jpeg',
          ),
          6 => 
          array (
            'no_pernyataan' => 'PM20250628001',
            'photo' => 'pages/upload/PM20250628001PP.jpeg',
          ),
          7 => 
          array (
            'no_pernyataan' => 'PM20250630001',
            'photo' => 'pages/upload/PM20250630001PP.jpeg',
          ),
          8 => 
          array (
            'no_pernyataan' => 'PM20250704001',
            'photo' => 'pages/upload/PM20250704001PP.jpeg',
          ),
          9 => 
          array (
            'no_pernyataan' => 'PM20250704002',
            'photo' => 'pages/upload/PM20250704002PP.jpeg',
          ),
          10 => 
          array (
            'no_pernyataan' => 'PM20250707001',
            'photo' => 'pages/upload/PM20250707001PP.jpeg',
          ),
          11 => 
          array (
            'no_pernyataan' => 'PM20250814001',
            'photo' => 'pages/upload/PM20250814001PP.jpeg',
          ),
          12 => 
          array (
            'no_pernyataan' => 'PM20250819001',
            'photo' => 'pages/upload/PM20250819001PP.jpeg',
          ),
          13 => 
          array (
            'no_pernyataan' => 'PM20250819002',
            'photo' => 'pages/upload/PM20250819002PP.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}