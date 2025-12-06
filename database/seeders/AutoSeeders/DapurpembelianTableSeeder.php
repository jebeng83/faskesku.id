<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurpembelianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurpembelian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurpembelian')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PD20250428001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_beli' => '2025-04-28',
            'subtotal' => 310452.23699999996460974216461181640625,
            'potongan' => 0.0,
            'total' => 310452.23699999996460974216461181640625,
            'ppn' => 34150.0,
            'meterai' => 0.0,
            'tagihan' => 344602.23699999996460974216461181640625,
            'kd_rek' => '111010',
          ),
          1 => 
          array (
            'no_faktur' => 'PD20250804001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_beli' => '2025-08-04',
            'subtotal' => 6838.15499999999883584678173065185546875,
            'potongan' => 0.0,
            'total' => 6838.15499999999883584678173065185546875,
            'ppn' => 752.0,
            'meterai' => 0.0,
            'tagihan' => 7590.15499999999883584678173065185546875,
            'kd_rek' => '112080',
          ),
          2 => 
          array (
            'no_faktur' => 'PD20250819001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_beli' => '2025-08-19',
            'subtotal' => 30838.15499999999883584678173065185546875,
            'potongan' => 0.0,
            'total' => 30838.15499999999883584678173065185546875,
            'ppn' => 3392.0,
            'meterai' => 0.0,
            'tagihan' => 34230.15499999999883584678173065185546875,
            'kd_rek' => '112080',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}