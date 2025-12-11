<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MppEvaluasiMasalahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('mpp_evaluasi_masalah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('mpp_evaluasi_masalah')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-05-26 14:28:19',
            'kode_masalah' => '001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-05-26 14:28:19',
            'kode_masalah' => '002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}