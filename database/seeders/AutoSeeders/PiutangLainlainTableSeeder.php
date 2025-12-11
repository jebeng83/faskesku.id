<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PiutangLainlainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('piutang_lainlain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('piutang_lainlain')->insert(array (
          0 => 
          array (
            'nota_piutang' => 'PLL202505210001',
            'tgl_piutang' => '2025-05-21',
            'nip' => '123124',
            'kode_peminjam' => 'PP001',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
            'keterangan' => 'tes',
            'tgltempo' => '2025-05-21',
            'nominal' => 1000000.0,
            'sisapiutang' => 500000.0,
            'status' => 'Belum Lunas',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}