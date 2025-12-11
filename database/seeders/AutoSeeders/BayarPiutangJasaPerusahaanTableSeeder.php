<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPiutangJasaPerusahaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_piutang_jasa_perusahaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_piutang_jasa_perusahaan')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2025-05-25',
            'kode_perusahaan' => 'I0002',
            'besar_cicilan' => 3000000.0,
            'keterangan' => 'diverifikasi oleh Admin Utama',
            'no_piutang' => 'PJP250522001',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}