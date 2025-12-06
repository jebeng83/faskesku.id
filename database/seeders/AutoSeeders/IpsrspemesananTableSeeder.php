<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrspemesananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrspemesanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrspemesanan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PNM20241113001',
            'no_order' => '-',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-13',
            'tgl_faktur' => '2024-11-13',
            'tgl_tempo' => '2024-11-13',
            'total1' => 1848150.0,
            'potongan' => 0.0,
            'total2' => 1848150.0,
            'ppn' => 203297.0,
            'meterai' => 0.0,
            'tagihan' => 2051447.0,
            'status' => 'Belum Dibayar',
          ),
          1 => 
          array (
            'no_faktur' => 'PNM20250123001',
            'no_order' => 'SPM20250123001',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tgl_pesan' => '2025-01-23',
            'tgl_faktur' => '2025-01-23',
            'tgl_tempo' => '2025-01-23',
            'total1' => 1096301.8524563438259065151214599609375,
            'potongan' => 0.0,
            'total2' => 1096301.8524563438259065151214599609375,
            'ppn' => 120593.0,
            'meterai' => 0.0,
            'tagihan' => 1216894.8524563438259065151214599609375,
            'status' => 'Sudah Dibayar',
          ),
          2 => 
          array (
            'no_faktur' => 'PNM20250130001',
            'no_order' => 'SPM20250130001',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tgl_pesan' => '2025-01-30',
            'tgl_faktur' => '2025-01-30',
            'tgl_tempo' => '2025-01-30',
            'total1' => 2120000.0,
            'potongan' => 0.0,
            'total2' => 2120000.0,
            'ppn' => 233200.0,
            'meterai' => 0.0,
            'tagihan' => 2353200.0,
            'status' => 'Sudah Dibayar',
          ),
          3 => 
          array (
            'no_faktur' => 'PNM20250619001',
            'no_order' => 'SPM20250123002',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tgl_pesan' => '2025-06-19',
            'tgl_faktur' => '2025-06-19',
            'tgl_tempo' => '2025-06-19',
            'total1' => 512608.61326500005088746547698974609375,
            'potongan' => 0.0,
            'total2' => 512608.61326500005088746547698974609375,
            'ppn' => 56387.0,
            'meterai' => 0.0,
            'tagihan' => 568995.61326500005088746547698974609375,
            'status' => 'Belum Dibayar',
          ),
          4 => 
          array (
            'no_faktur' => 'PNM20250619002',
            'no_order' => '-',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tgl_pesan' => '2025-06-19',
            'tgl_faktur' => '2025-06-19',
            'tgl_tempo' => '2025-06-19',
            'total1' => 1276820.75735490000806748867034912109375,
            'potongan' => 0.0,
            'total2' => 1276820.75735490000806748867034912109375,
            'ppn' => 140450.0,
            'meterai' => 0.0,
            'tagihan' => 1417270.75735490000806748867034912109375,
            'status' => 'Belum Dibayar',
          ),
          5 => 
          array (
            'no_faktur' => 'PNM20250813001',
            'no_order' => 'SPM20250813001',
            'kode_suplier' => 'S0002',
            'nip' => '12/09/1988/001',
            'tgl_pesan' => '2025-08-13',
            'tgl_faktur' => '2025-08-13',
            'tgl_tempo' => '2025-08-13',
            'total1' => 535437.96012150007300078868865966796875,
            'potongan' => 0.0,
            'total2' => 535437.96012150007300078868865966796875,
            'ppn' => 58898.0,
            'meterai' => 0.0,
            'tagihan' => 594335.96012150007300078868865966796875,
            'status' => 'Sudah Dibayar',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}