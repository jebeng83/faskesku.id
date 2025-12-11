<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianAwalKeperawatanRalanRencanaIgdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_ralan_rencana_igd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_ralan_rencana_igd')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'kode_rencana' => '002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}