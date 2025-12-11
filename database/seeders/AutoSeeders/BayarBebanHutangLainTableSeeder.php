<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarBebanHutangLainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_beban_hutang_lain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_beban_hutang_lain')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2025-07-05',
            'kode_pemberi_hutang' => 'PH002',
            'besar_cicilan' => 1000000.0,
            'keterangan' => 'tes',
            'no_hutang' => 'BHL202507050001',
            'kd_rek' => '111020',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '2121212',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}