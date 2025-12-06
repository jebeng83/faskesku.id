<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterMasalahMppTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_mpp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_masalah_mpp')->insert(array (
          0 => 
          array (
            'kode_masalah' => '001',
            'nama_masalah' => 'TES 1',
          ),
          1 => 
          array (
            'kode_masalah' => '002',
            'nama_masalah' => 'TES 2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}