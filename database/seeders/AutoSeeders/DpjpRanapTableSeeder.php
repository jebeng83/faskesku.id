<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DpjpRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dpjp_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dpjp_ranap')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_dokter' => 'D0000005',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'kd_dokter' => 'D0000004',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_dokter' => 'D0000002',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_dokter' => 'D0000004',
          ),
          4 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'kd_dokter' => 'D0000004',
          ),
          5 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kd_dokter' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}