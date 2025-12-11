<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanResepPulangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_resep_pulang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_resep_pulang')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'RP202508190001',
            'tgl_permintaan' => '2025-08-19',
            'jam' => '13:34:39',
            'no_rawat' => '2025/08/19/000002',
            'kd_dokter' => 'D0000004',
            'status' => 'Sudah',
            'tgl_validasi' => '2025-08-19',
            'jam_validasi' => '13:34:50',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}