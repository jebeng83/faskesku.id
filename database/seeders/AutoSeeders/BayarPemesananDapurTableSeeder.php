<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPemesananDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_pemesanan_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_pemesanan_dapur')->insert(array (
          0 => 
          array (
            'tgl_bayar' => '2024-11-15',
            'no_faktur' => 'PD20241114001',
            'nip' => '123124',
            'besar_bayar' => 25530.0,
            'keterangan' => '21212',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '122121',
          ),
          1 => 
          array (
            'tgl_bayar' => '2024-11-22',
            'no_faktur' => 'PD20241122001',
            'nip' => '123124',
            'besar_bayar' => 1657230.0,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '010101',
          ),
          2 => 
          array (
            'tgl_bayar' => '2025-02-11',
            'no_faktur' => 'PD20250211001',
            'nip' => '12/09/1988/001',
            'besar_bayar' => 158796.1309999999939464032649993896484375,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => '090',
          ),
          3 => 
          array (
            'tgl_bayar' => '2025-08-04',
            'no_faktur' => 'PD20250804001',
            'nip' => '12/09/1988/001',
            'besar_bayar' => 142394.7877999999909661710262298583984375,
            'keterangan' => '-',
            'nama_bayar' => 'BAYAR CASH',
            'no_bukti' => 'rwrw',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}