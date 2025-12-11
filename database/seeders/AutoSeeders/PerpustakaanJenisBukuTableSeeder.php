<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanJenisBukuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_jenis_buku')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_jenis_buku')->insert(array (
          0 => 
          array (
            'id_jenis' => 'JK001',
            'nama_jenis' => 'BUKU',
          ),
          1 => 
          array (
            'id_jenis' => 'JK002',
            'nama_jenis' => 'CD',
          ),
          2 => 
          array (
            'id_jenis' => 'JK003',
            'nama_jenis' => 'VIDEO',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}