<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IndustrifarmasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('industrifarmasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('industrifarmasi')->insert(array (
          0 => 
          array (
            'kode_industri' => '-',
            'nama_industri' => '-',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '-',
          ),
          1 => 
          array (
            'kode_industri' => 'I0001',
            'nama_industri' => 'arasia',
            'alamat' => 'KOTA',
            'kota' => 'SOLO',
            'no_telp' => '085229977208',
          ),
          2 => 
          array (
            'kode_industri' => 'I0003',
            'nama_industri' => 'KIMIA FARMA',
            'alamat' => 'BOGOR AJAAHHH',
            'kota' => 'DEPOK',
            'no_telp' => '085229977209',
          ),
          3 => 
          array (
            'kode_industri' => 'I0004',
            'nama_industri' => 'LAPI',
            'alamat' => 'PURWOKERTO',
            'kota' => 'BANYUMAS',
            'no_telp' => '08251041',
          ),
          4 => 
          array (
            'kode_industri' => 'I0005',
            'nama_industri' => 'SANBE FARMA',
            'alamat' => 'JALAN JAKARTA selatan',
            'kota' => 'JAKATRA',
            'no_telp' => '0865717171',
          ),
          5 => 
          array (
            'kode_industri' => 'I0006',
            'nama_industri' => 'CAPRI FARMA',
            'alamat' => 'JALAN JAKARTA',
            'kota' => 'MAJENANG',
            'no_telp' => '0',
          ),
          6 => 
          array (
            'kode_industri' => 'I0007',
            'nama_industri' => 'GRAHA FARMA',
            'alamat' => 'KARANGANYAR',
            'kota' => 'KARANGANYAR',
            'no_telp' => '000000',
          ),
          7 => 
          array (
            'kode_industri' => 'I0008',
            'nama_industri' => 'pt maju mundur',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
          ),
          8 => 
          array (
            'kode_industri' => 'I0009',
            'nama_industri' => 'KhanzaFarma',
            'alamat' => 'Soloraya',
            'kota' => 'Karanganyar',
            'no_telp' => '085229977222',
          ),
          9 => 
          array (
            'kode_industri' => 'I005',
            'nama_industri' => 'PT.Balikpapan Medika',
            'alamat' => 'Balikpapan',
            'kota' => 'Balikpapan',
            'no_telp' => '-',
          ),
          10 => 
          array (
            'kode_industri' => 'I006',
            'nama_industri' => 'PT.Borneo Medika',
            'alamat' => 'Sangata',
            'kota' => 'Sangata',
            'no_telp' => '-',
          ),
          11 => 
          array (
            'kode_industri' => 'I007',
            'nama_industri' => 'PT. Sanbe Farma',
            'alamat' => 'Jakarta Selatan',
            'kota' => 'DKI Jakarta',
            'no_telp' => '-',
          ),
          12 => 
          array (
            'kode_industri' => 'I008',
            'nama_industri' => 'PT. Kimia Farma',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}