<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KamarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kamar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kamar')->insert(array (
          0 => 
          array (
            'kd_kamar' => 'K1.01',
            'kd_bangsal' => 'K1',
            'trf_kamar' => 500000.0,
            'status' => 'DIBOOKING',
            'kelas' => 'Kelas 1',
            'statusdata' => '1',
          ),
          1 => 
          array (
            'kd_kamar' => 'K3.01',
            'kd_bangsal' => 'K3',
            'trf_kamar' => 100000.0,
            'status' => 'DIBOOKING',
            'kelas' => 'Kelas 3',
            'statusdata' => '1',
          ),
          2 => 
          array (
            'kd_kamar' => 'VUP.01',
            'kd_bangsal' => 'VIP',
            'trf_kamar' => 550000.0,
            'status' => 'ISI',
            'kelas' => 'Kelas VVIP',
            'statusdata' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}