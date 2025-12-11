<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MetodeRacikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('metode_racik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('metode_racik')->insert(array (
          0 => 
          array (
            'kd_racik' => 'R01',
            'nm_racik' => 'Puyer',
          ),
          1 => 
          array (
            'kd_racik' => 'R02',
            'nm_racik' => 'Sirup',
          ),
          2 => 
          array (
            'kd_racik' => 'R03',
            'nm_racik' => 'Salep',
          ),
          3 => 
          array (
            'kd_racik' => 'R04',
            'nm_racik' => 'KAPSUL',
          ),
          4 => 
          array (
            'kd_racik' => 'R05',
            'nm_racik' => 'sirup',
          ),
          5 => 
          array (
            'kd_racik' => 'R06',
            'nm_racik' => 'INJEKSI',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}