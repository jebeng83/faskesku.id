<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianAwalKeperawatanIgdMasalahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_igd_masalah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_igd_masalah')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'kode_masalah' => '001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}