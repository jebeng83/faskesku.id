<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPiutangLainlainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_piutang_lainlain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_piutang_lainlain')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2025-05-21',
            'kode_peminjam' => 'PP001',
            'besar_cicilan' => 100000.0,
            'keterangan' => 'tes',
            'nota_piutang' => 'PLL202505210001',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
          1 => 
          array (
            'tgl_bayar' => '2025-06-08',
            'kode_peminjam' => 'PP001',
            'besar_cicilan' => 200000.0,
            'keterangan' => 'diverifikasi oleh Admin Utama',
            'nota_piutang' => 'PLL202505210001',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
          2 => 
          array (
            'tgl_bayar' => '2025-06-09',
            'kode_peminjam' => 'PP001',
            'besar_cicilan' => 200000.0,
            'keterangan' => '-',
            'nota_piutang' => 'PLL202505210001',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}