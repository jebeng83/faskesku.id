<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisJeniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_jenis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_jenis')->insert(array (
          0 => 
          array (
            'id_jenis' => 'AK',
            'nama_jenis' => 'Alat Kantor',
          ),
          1 => 
          array (
            'id_jenis' => 'JI001',
            'nama_jenis' => 'ALAT MEDIS',
          ),
          2 => 
          array (
            'id_jenis' => '-',
            'nama_jenis' => 'Jenis',
          ),
          3 => 
          array (
            'id_jenis' => 'JI006',
            'nama_jenis' => 'LINEN',
          ),
          4 => 
          array (
            'id_jenis' => 'JI004',
            'nama_jenis' => 'MEDIS',
          ),
          5 => 
          array (
            'id_jenis' => 'JI005',
            'nama_jenis' => 'NON MEDIS',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}