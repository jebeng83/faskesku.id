<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterBerkasDigitalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_berkas_digital')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_berkas_digital')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'nama' => 'Berkas SEP',
          ),
          1 => 
          array (
            'kode' => '002',
            'nama' => 'KTP',
          ),
          2 => 
          array (
            'kode' => '003',
            'nama' => 'KARTU KELUARGA',
          ),
          3 => 
          array (
            'kode' => '004',
            'nama' => 'KARTU PASIEN',
          ),
          4 => 
          array (
            'kode' => '005',
            'nama' => 'BERKAS DIGITAL',
          ),
          5 => 
          array (
            'kode' => '006',
            'nama' => 'BUKTI VISUM',
          ),
          6 => 
          array (
            'kode' => '007',
            'nama' => 'GAMBAR EKG',
          ),
          7 => 
          array (
            'kode' => '008',
            'nama' => 'GAMBAR USG',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}