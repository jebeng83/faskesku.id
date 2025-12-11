<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResepLuarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resep_luar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resep_luar')->insert(array (
          0 => 
          array (
            'no_resep' => 'RL20250705001',
            'tgl_perawatan' => '2025-07-05',
            'jam' => '10:01:22',
            'no_rawat' => '2025/07/03/000001',
            'kd_dokter' => 'D0000003',
            'tgl_peresepan' => '2025-07-05',
            'jam_peresepan' => '10:01:22',
          ),
          1 => 
          array (
            'no_resep' => 'RL20250804001',
            'tgl_perawatan' => '2025-08-04',
            'jam' => '11:32:15',
            'no_rawat' => '2025/08/04/000001',
            'kd_dokter' => 'D0000004',
            'tgl_peresepan' => '2025-08-04',
            'jam_peresepan' => '11:32:15',
          ),
          2 => 
          array (
            'no_resep' => 'RL20250826001',
            'tgl_perawatan' => '2025-08-26',
            'jam' => '10:48:47',
            'no_rawat' => '2025/08/26/000001',
            'kd_dokter' => 'D0000004',
            'tgl_peresepan' => '2025-08-26',
            'jam_peresepan' => '10:48:47',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}