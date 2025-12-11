<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CacatFisikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('cacat_fisik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('cacat_fisik')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_cacat' => '-',
          ),
          1 => 
          array (
            'id' => 3,
            'nama_cacat' => 'Bisu',
          ),
          2 => 
          array (
            'id' => 2,
            'nama_cacat' => 'Buta',
          ),
          3 => 
          array (
            'id' => 8,
            'nama_cacat' => 'Lumpuh',
          ),
          4 => 
          array (
            'id' => 63,
            'nama_cacat' => 'Pendek',
          ),
          5 => 
          array (
            'id' => 5,
            'nama_cacat' => 'TIDAK ADA',
          ),
          6 => 
          array (
            'id' => 4,
            'nama_cacat' => 'Tidak Punya Tangan Kanan',
          ),
          7 => 
          array (
            'id' => 64,
            'nama_cacat' => 'Tidak Punya Titit',
          ),
          8 => 
          array (
            'id' => 58,
            'nama_cacat' => 'Tuli',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}