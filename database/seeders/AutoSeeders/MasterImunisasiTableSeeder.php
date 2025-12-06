<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterImunisasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_imunisasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_imunisasi')->insert(array (
          0 => 
          array (
            'kode_imunisasi' => '01',
            'nama_imunisasi' => 'BCG',
          ),
          1 => 
          array (
            'kode_imunisasi' => '02',
            'nama_imunisasi' => 'Hepatitis',
          ),
          2 => 
          array (
            'kode_imunisasi' => '03',
            'nama_imunisasi' => 'DPT',
          ),
          3 => 
          array (
            'kode_imunisasi' => '04',
            'nama_imunisasi' => 'Polio',
          ),
          4 => 
          array (
            'kode_imunisasi' => '05',
            'nama_imunisasi' => 'Campak',
          ),
          5 => 
          array (
            'kode_imunisasi' => '06',
            'nama_imunisasi' => 'HIB',
          ),
          6 => 
          array (
            'kode_imunisasi' => '07',
            'nama_imunisasi' => 'IPD',
          ),
          7 => 
          array (
            'kode_imunisasi' => '08',
            'nama_imunisasi' => 'Influenza',
          ),
          8 => 
          array (
            'kode_imunisasi' => '09',
            'nama_imunisasi' => 'Cacar Air',
          ),
          9 => 
          array (
            'kode_imunisasi' => '10',
            'nama_imunisasi' => 'MMR',
          ),
          10 => 
          array (
            'kode_imunisasi' => '11',
            'nama_imunisasi' => 'Thypoid',
          ),
          11 => 
          array (
            'kode_imunisasi' => '12',
            'nama_imunisasi' => 'Hepatitis A',
          ),
          12 => 
          array (
            'kode_imunisasi' => '13',
            'nama_imunisasi' => 'HPV',
          ),
          13 => 
          array (
            'kode_imunisasi' => '14',
            'nama_imunisasi' => 'Rotavirus',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}