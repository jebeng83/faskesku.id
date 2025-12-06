<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengaduanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengaduan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengaduan')->insert(array (
          0 => 
          array (
            'id' => '20241125000001',
            'tanggal' => '2024-11-25 02:49:57',
            'no_rkm_medis' => '000002',
            'pesan' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}