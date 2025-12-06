<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisGambarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_gambar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_gambar')->insert(array (
          0 => 
          array (
            'no_inventaris' => 'I000000023/2023',
            'photo' => 'pages/upload/gasss.jpg',
          ),
          1 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/02',
            'photo' => 'pages/upload/iklan.jpg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}