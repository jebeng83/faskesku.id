<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntripoliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antripoli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antripoli')->insert(array (
          0 => 
          array (
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'status' => '0',
            'no_rawat' => '2025/08/25/000001',
          ),
          1 => 
          array (
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'INT',
            'status' => '0',
            'no_rawat' => '2024/11/16/000001',
          ),
          2 => 
          array (
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0053',
            'status' => '1',
            'no_rawat' => '2025/03/16/000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}