<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatasuplierTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('datasuplier')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('datasuplier')->insert(array (
          0 => 
          array (
            'kode_suplier' => 'S0001',
            'nama_suplier' => 'PENTA SUMBAWA',
            'alamat' => 'JL MAJU MUNDUR',
            'kota' => 'SUMBAWA',
            'no_telp' => '0',
            'nama_bank' => 'BRI',
            'rekening' => '0101010101',
          ),
          1 => 
          array (
            'kode_suplier' => 'S0003',
            'nama_suplier' => 'RS ZAPA',
            'alamat' => '-',
            'kota' => 'WAY KANAN',
            'no_telp' => '0',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
          2 => 
          array (
            'kode_suplier' => 'S0004',
            'nama_suplier' => 'APOTEK YAKIN',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
          3 => 
          array (
            'kode_suplier' => 'S0005',
            'nama_suplier' => 'MBS',
            'alamat' => 'Jakarta',
            'kota' => 'Jakarta',
            'no_telp' => '0',
            'nama_bank' => 'BRI',
            'rekening' => '12121',
          ),
          4 => 
          array (
            'kode_suplier' => 'S0006',
            'nama_suplier' => 'AAM',
            'alamat' => 'JALAN MUHAMADIYAH',
            'kota' => 'PURWOKERTO',
            'no_telp' => '08524421',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
          5 => 
          array (
            'kode_suplier' => 'S0007',
            'nama_suplier' => 'ENSEVAL',
            'alamat' => 'JALAN GARUDA',
            'kota' => 'MAJENANG',
            'no_telp' => '0',
            'nama_bank' => 'BRI',
            'rekening' => '0101010101012012012',
          ),
          6 => 
          array (
            'kode_suplier' => 'S0008',
            'nama_suplier' => 'VENDOR BARU',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
          7 => 
          array (
            'kode_suplier' => 'S0009',
            'nama_suplier' => 'Khanza',
            'alamat' => 'PURWOKERTO',
            'kota' => 'DEPOK',
            'no_telp' => '085229977208',
            'nama_bank' => 'BTN',
            'rekening' => '0101013121',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}