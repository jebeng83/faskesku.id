<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterSekolahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_sekolah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_sekolah')->insert(array (
          0 => 
          array (
            'kd_sekolah' => '001',
            'nm_sekolah' => 'SMP Maju Mundur Karanganyar',
          ),
          1 => 
          array (
            'kd_sekolah' => '002',
            'nm_sekolah' => 'SMA Maju Mundru Karanganyar',
          ),
          2 => 
          array (
            'kd_sekolah' => '003',
            'nm_sekolah' => 'SMK Maju Mundur Karanganyar',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}