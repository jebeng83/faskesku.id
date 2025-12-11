<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPermintaanDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_dapur')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PD240930001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 4.0,
            'keterangan' => '-',
          ),
          1 => 
          array (
            'no_permintaan' => 'PD250804001',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}