<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsDampakCideraTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_dampak_cidera')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_dampak_cidera')->insert(array (
          0 => 
          array (
            'kode_dampak' => 'DK001',
            'dampak_cidera' => '1-3 hari tidak masuk kerja',
          ),
          1 => 
          array (
            'kode_dampak' => 'DK002',
            'dampak_cidera' => '4-7 hari tidak masuk kerja',
          ),
          2 => 
          array (
            'kode_dampak' => 'DK003',
            'dampak_cidera' => '8-14 hari tidak masuk kerja',
          ),
          3 => 
          array (
            'kode_dampak' => 'DK004',
            'dampak_cidera' => '15-21 hari tidak masuk kerja',
          ),
          4 => 
          array (
            'kode_dampak' => 'DK005',
            'dampak_cidera' => 'Dampak lainnya selain yang terklasifikasi, yaitu jam kerja yang hilang namun tidak sampai 1 hari',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}