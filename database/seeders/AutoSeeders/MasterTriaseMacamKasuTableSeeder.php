<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriaseMacamKasuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_macam_kasus')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_macam_kasus')->insert(array (
          0 => 
          array (
            'kode_kasus' => '001',
            'macam_kasus' => 'Trauma Kecelakaan Lalu Lintas',
          ),
          1 => 
          array (
            'kode_kasus' => '002',
            'macam_kasus' => 'Trauma Kecelakaan Kerja',
          ),
          2 => 
          array (
            'kode_kasus' => '003',
            'macam_kasus' => 'Trauma Kasus Unit Pelayanan Anak & Perempuan',
          ),
          3 => 
          array (
            'kode_kasus' => '004',
            'macam_kasus' => 'Non Trauma',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}