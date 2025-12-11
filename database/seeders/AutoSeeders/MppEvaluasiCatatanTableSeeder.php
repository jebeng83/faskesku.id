<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MppEvaluasiCatatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('mpp_evaluasi_catatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('mpp_evaluasi_catatan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tgl_implementasi' => '2025-08-06 09:47:36',
            'masalah' => '-',
            'tinjut' => '1',
            'evaluasi' => '1',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}