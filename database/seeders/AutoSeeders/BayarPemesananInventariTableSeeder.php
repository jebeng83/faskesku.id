<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPemesananInventariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_pemesanan_inventaris')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_pemesanan_inventaris')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2025-02-24',
            'no_faktur' => 'PAI20250130001',
            'nip' => '123124',
            'besar_bayar' => 22200000.0,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '12121',
          ),
          1 => 
          array (
            'tgl_bayar' => '2025-06-03',
            'no_faktur' => 'PAI20250603001',
            'nip' => '123124',
            'besar_bayar' => 19980000.0,
            'keterangan' => '21212',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '1212',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}