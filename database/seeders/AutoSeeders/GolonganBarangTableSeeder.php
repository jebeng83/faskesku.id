<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GolonganBarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('golongan_barang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('golongan_barang')->insert(array (
          0 => 
          array (
            'kode' => '-',
            'nama' => '-',
          ),
          1 => 
          array (
            'kode' => 'G01',
            'nama' => 'Psikotropika',
          ),
          2 => 
          array (
            'kode' => 'G03',
            'nama' => 'Non Psiko',
          ),
          3 => 
          array (
            'kode' => 'G04',
            'nama' => 'OBAT BEBAS',
          ),
          4 => 
          array (
            'kode' => 'G05',
            'nama' => 'PARETO',
          ),
          5 => 
          array (
            'kode' => 'G06',
            'nama' => 'Prekusor',
          ),
          6 => 
          array (
            'kode' => 'G07',
            'nama' => 'NARKOTIKA',
          ),
          7 => 
          array (
            'kode' => 'G08',
            'nama' => 'BHP',
          ),
          8 => 
          array (
            'kode' => 'G09',
            'nama' => 'B 3',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}