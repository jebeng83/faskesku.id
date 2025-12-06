<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsjenisbarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsjenisbarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrsjenisbarang')->insert(array (
          0 => 
          array (
            'kd_jenis' => 'J01',
            'nm_jenis' => 'IPSRS',
          ),
          1 => 
          array (
            'kd_jenis' => 'J02',
            'nm_jenis' => 'GIZI BASAH',
          ),
          2 => 
          array (
            'kd_jenis' => 'J03',
            'nm_jenis' => 'GIZI KERING',
          ),
          3 => 
          array (
            'kd_jenis' => 'J04',
            'nm_jenis' => 'LOUNDRY',
          ),
          4 => 
          array (
            'kd_jenis' => 'J05',
            'nm_jenis' => 'RADIOLOGY',
          ),
          5 => 
          array (
            'kd_jenis' => 'J06',
            'nm_jenis' => 'ATK',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}