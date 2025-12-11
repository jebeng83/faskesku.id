<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_piutang')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2025-06-30',
            'no_rkm_medis' => '000006',
            'besar_cicilan' => 104369.0,
            'catatan' => 'diverifikasi oleh Admin Utama',
            'no_rawat' => '2025/06/03/000001',
            'kd_rek' => '112080',
            'kd_rek_kontra' => '117003',
            'diskon_piutang' => 0.0,
            'kd_rek_diskon_piutang' => '540103',
            'tidak_terbayar' => 99807.0,
            'kd_rek_tidak_terbayar' => '570102',
          ),
          1 => 
          array (
            'tgl_bayar' => '2025-06-30',
            'no_rkm_medis' => '000022',
            'besar_cicilan' => 581036.0,
            'catatan' => 'diverifikasi oleh Admin Utama',
            'no_rawat' => '2025/05/26/000001',
            'kd_rek' => '112080',
            'kd_rek_kontra' => '117003',
            'diskon_piutang' => 0.0,
            'kd_rek_diskon_piutang' => '540103',
            'tidak_terbayar' => 555637.0,
            'kd_rek_tidak_terbayar' => '570102',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}