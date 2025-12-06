<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisRuangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_ruang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_ruang')->insert(array (
          0 => 
          array (
            'id_ruang' => 'R4',
            'nama_ruang' => 'AULA',
          ),
          1 => 
          array (
            'id_ruang' => '0001',
            'nama_ruang' => 'R. Candra 1',
          ),
          2 => 
          array (
            'id_ruang' => '02',
            'nama_ruang' => 'Rajal',
          ),
          3 => 
          array (
            'id_ruang' => '01',
            'nama_ruang' => 'Ranap',
          ),
          4 => 
          array (
            'id_ruang' => 'RI006',
            'nama_ruang' => 'RUANG RADIOLOGI',
          ),
          5 => 
          array (
            'id_ruang' => 'R3',
            'nama_ruang' => 'RUANG SIMRS',
          ),
          6 => 
          array (
            'id_ruang' => 'RI007',
            'nama_ruang' => 'RUANG WAKIL DIREKTUR',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}