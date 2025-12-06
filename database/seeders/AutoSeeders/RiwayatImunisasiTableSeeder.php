<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RiwayatImunisasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('riwayat_imunisasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('riwayat_imunisasi')->insert(array (
          0 => 
          array (
            'no_rkm_medis' => '000022',
            'kode_imunisasi' => '03',
            'no_imunisasi' => 1,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}