<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPelaksanaanInformasiEdukasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pelaksanaan_informasi_edukasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_pelaksanaan_informasi_edukasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-05-26 13:53:38',
            'photo' => 'pages/upload/2025042500000120250526135338.jpeg',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-06-18 13:42:40',
            'photo' => 'pages/upload/2025061800000120250618134240.jpeg',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28 09:52:44',
            'photo' => 'pages/upload/2025062800000120250628095244.jpeg',
          ),
          3 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'tanggal' => '2025-08-04 11:12:18',
            'photo' => 'pages/upload/2025080400000120250804111218.jpeg',
          ),
          4 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal' => '2025-08-19 13:31:21',
            'photo' => 'pages/upload/2025081900000220250819133121.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}