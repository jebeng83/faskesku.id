<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsJenisCideraTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_jenis_cidera')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_jenis_cidera')->insert(array (
          0 => 
          array (
            'kode_cidera' => 'CK001',
            'jenis_cidera' => 'Terjatuh, terjerembab ke dalam obyek tidak bergerak dan sejenisnya',
          ),
          1 => 
          array (
            'kode_cidera' => 'CK002',
            'jenis_cidera' => 'Kontak dengan benda tajam dan kasar, seperti kontak dengan jarum, pisau, dan benda tajam sejenisnya',
          ),
          2 => 
          array (
            'kode_cidera' => 'CK003',
            'jenis_cidera' => 'Kontak dengan objek lainnya yang belum terklasifikasi, yaitu kontak dengan virus Rubella',
          ),
          3 => 
          array (
            'kode_cidera' => 'CK004',
            'jenis_cidera' => 'Tertusuk jarum',
          ),
          4 => 
          array (
            'kode_cidera' => 'CK005',
            'jenis_cidera' => 'TES JATUH',
          ),
          5 => 
          array (
            'kode_cidera' => 'CK006',
            'jenis_cidera' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}