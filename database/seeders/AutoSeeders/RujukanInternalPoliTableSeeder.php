<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RujukanInternalPoliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rujukan_internal_poli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rujukan_internal_poli')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'kd_dokter' => 'D0000003',
            'kd_poli' => 'U0002',
          ),
          1 => 
          array (
            'no_rawat' => '2025/08/13/000001',
            'kd_dokter' => 'D0000003',
            'kd_poli' => 'U0007',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/23/000001',
            'kd_dokter' => 'D0000003',
            'kd_poli' => 'U0012',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}