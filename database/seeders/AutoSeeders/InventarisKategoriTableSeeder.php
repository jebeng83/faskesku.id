<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisKategoriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_kategori')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_kategori')->insert(array (
          0 => 
          array (
            'id_kategori' => 'EL',
            'nama_kategori' => 'Elektronik',
          ),
          1 => 
          array (
            'id_kategori' => '-',
            'nama_kategori' => 'Kategori',
          ),
          2 => 
          array (
            'id_kategori' => 'KI003',
            'nama_kategori' => 'NON ELEKTRONIK',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}