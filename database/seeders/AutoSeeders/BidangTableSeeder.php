<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BidangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bidang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bidang')->insert(array (
          0 => 
          array (
            'nama' => '-',
          ),
          1 => 
          array (
            'nama' => 'Crew Operasi',
          ),
          2 => 
          array (
            'nama' => 'Direksi',
          ),
          3 => 
          array (
            'nama' => 'Dokter Umum',
          ),
          4 => 
          array (
            'nama' => 'Farmasi',
          ),
          5 => 
          array (
            'nama' => 'Manajemen',
          ),
          6 => 
          array (
            'nama' => 'MEDIK & KEPERAW',
          ),
          7 => 
          array (
            'nama' => 'Medis',
          ),
          8 => 
          array (
            'nama' => 'Non Medis',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}