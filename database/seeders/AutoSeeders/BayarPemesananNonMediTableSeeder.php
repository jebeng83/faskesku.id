<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPemesananNonMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_pemesanan_non_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_pemesanan_non_medis')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2025-01-30',
            'no_faktur' => 'PNM20250123001',
            'nip' => '123124',
            'besar_bayar' => 1216894.8524563438259065151214599609375,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => 'tututt',
          ),
          1 => 
          array (
            'tgl_bayar' => '2025-01-30',
            'no_faktur' => 'PNM20250130001',
            'nip' => '123124',
            'besar_bayar' => 2353200.0,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => 'tututt',
          ),
          2 => 
          array (
            'tgl_bayar' => '2025-08-13',
            'no_faktur' => 'PNM20250813001',
            'nip' => '123124',
            'besar_bayar' => 594335.96012150007300078868865966796875,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}