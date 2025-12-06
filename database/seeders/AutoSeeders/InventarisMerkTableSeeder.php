<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisMerkTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_merk')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_merk')->insert(array (
          0 => 
          array (
            'id_merk' => 'CK',
            'nama_merk' => 'CAKRAWALA',
          ),
          1 => 
          array (
            'id_merk' => 'CT',
            'nama_merk' => 'CITOS',
          ),
          2 => 
          array (
            'id_merk' => 'MI00003',
            'nama_merk' => 'LENOVO',
          ),
          3 => 
          array (
            'id_merk' => 'LG',
            'nama_merk' => 'LG',
          ),
          4 => 
          array (
            'id_merk' => '-',
            'nama_merk' => 'Merk',
          ),
          5 => 
          array (
            'id_merk' => 'MSI',
            'nama_merk' => 'MSI',
          ),
          6 => 
          array (
            'id_merk' => 'MI00005',
            'nama_merk' => 'SAMSUNG',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}