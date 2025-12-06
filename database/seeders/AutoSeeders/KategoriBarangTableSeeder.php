<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriBarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_barang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kategori_barang')->insert(array (
          0 => 
          array (
            'kode' => '-',
            'nama' => '-',
          ),
          1 => 
          array (
            'kode' => 'K01',
            'nama' => 'Formularioum RS',
          ),
          2 => 
          array (
            'kode' => 'K02',
            'nama' => 'Non Formularium RS',
          ),
          3 => 
          array (
            'kode' => 'K04',
            'nama' => 'GENERIK',
          ),
          4 => 
          array (
            'kode' => 'K05',
            'nama' => 'NON GENERIK',
          ),
          5 => 
          array (
            'kode' => 'K06',
            'nama' => 'Fornas',
          ),
          6 => 
          array (
            'kode' => 'K07',
            'nama' => 'Non Fornas',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}