<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratSifatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_sifat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_sifat')->insert(array (
          0 => 
          array (
            'kd' => 'SF001',
            'sifat' => 'KEDINASAN',
          ),
          1 => 
          array (
            'kd' => 'SF002',
            'sifat' => 'RESMI',
          ),
          2 => 
          array (
            'kd' => 'SF003',
            'sifat' => 'NON RESMI',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}