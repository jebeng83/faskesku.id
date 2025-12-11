<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TampjurnalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tampjurnal')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tampjurnal')->insert(array (
          0 => 
          array (
            'kd_rek' => '140-01',
            'nm_rek' => 'PEMBELIAN',
            'debet' => 200000.0,
            'kredit' => 0.0,
          ),
          1 => 
          array (
            'kd_rek' => '111010',
            'nm_rek' => 'AKUN BAYAR',
            'debet' => 0.0,
            'kredit' => 200000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}