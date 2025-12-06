<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurpemesananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurpemesanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurpemesanan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PD20241114001',
            'no_order' => '1212',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-14',
            'tgl_faktur' => '2024-11-14',
            'tgl_tempo' => '2024-11-14',
            'total1' => 23000.0,
            'potongan' => 0.0,
            'total2' => 23000.0,
            'ppn' => 2530.0,
            'meterai' => 0.0,
            'tagihan' => 25530.0,
            'status' => 'Sudah Dibayar',
          ),
          1 => 
          array (
            'no_faktur' => 'PD20241115001',
            'no_order' => '1',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-15',
            'tgl_faktur' => '2024-11-15',
            'tgl_tempo' => '2024-11-15',
            'total1' => 36000.0,
            'potongan' => 0.0,
            'total2' => 36000.0,
            'ppn' => 3960.0,
            'meterai' => 0.0,
            'tagihan' => 39960.0,
            'status' => 'Titip Faktur',
          ),
          2 => 
          array (
            'no_faktur' => 'PD20241115002',
            'no_order' => '1',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-15',
            'tgl_faktur' => '2024-11-15',
            'tgl_tempo' => '2024-11-15',
            'total1' => 36000.0,
            'potongan' => 0.0,
            'total2' => 36000.0,
            'ppn' => 3960.0,
            'meterai' => 0.0,
            'tagihan' => 39960.0,
            'status' => 'Titip Faktur',
          ),
          3 => 
          array (
            'no_faktur' => 'PD20241120001',
            'no_order' => 'SPD20241120001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-20',
            'tgl_faktur' => '2024-11-20',
            'tgl_tempo' => '2024-11-20',
            'total1' => 109000.0,
            'potongan' => 0.0,
            'total2' => 109000.0,
            'ppn' => 11990.0,
            'meterai' => 0.0,
            'tagihan' => 120990.0,
            'status' => 'Titip Faktur',
          ),
          4 => 
          array (
            'no_faktur' => 'PD20241122001',
            'no_order' => 'SPD20241122001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-22',
            'tgl_faktur' => '2024-11-22',
            'tgl_tempo' => '2024-11-22',
            'total1' => 1493000.0,
            'potongan' => 0.0,
            'total2' => 1493000.0,
            'ppn' => 164230.0,
            'meterai' => 0.0,
            'tagihan' => 1657230.0,
            'status' => 'Sudah Dibayar',
          ),
          5 => 
          array (
            'no_faktur' => 'PD20241122002',
            'no_order' => 'SPD20241122002',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-22',
            'tgl_faktur' => '2024-11-22',
            'tgl_tempo' => '2024-11-22',
            'total1' => 1459700.0,
            'potongan' => 0.0,
            'total2' => 1459700.0,
            'ppn' => 160567.0,
            'meterai' => 0.0,
            'tagihan' => 1620267.0,
            'status' => 'Titip Faktur',
          ),
          6 => 
          array (
            'no_faktur' => 'PD20241126001',
            'no_order' => 'SPD20241126001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2024-11-26',
            'tgl_faktur' => '2024-11-26',
            'tgl_tempo' => '2024-11-26',
            'total1' => 986346.0,
            'potongan' => 0.0,
            'total2' => 986346.0,
            'ppn' => 108498.0,
            'meterai' => 0.0,
            'tagihan' => 1094844.0,
            'status' => 'Belum Dibayar',
          ),
          7 => 
          array (
            'no_faktur' => 'PD20250211001',
            'no_order' => 'SPD20250211001',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2025-02-11',
            'tgl_faktur' => '2025-02-11',
            'tgl_tempo' => '2025-02-11',
            'total1' => 143059.1309999999939464032649993896484375,
            'potongan' => 0.0,
            'total2' => 143059.1309999999939464032649993896484375,
            'ppn' => 15737.0,
            'meterai' => 0.0,
            'tagihan' => 158796.1309999999939464032649993896484375,
            'status' => 'Sudah Dibayar',
          ),
          8 => 
          array (
            'no_faktur' => 'PD20250708001',
            'no_order' => '-',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2025-07-08',
            'tgl_faktur' => '2025-07-08',
            'tgl_tempo' => '2025-07-08',
            'total1' => 66000.0,
            'potongan' => 0.0,
            'total2' => 66000.0,
            'ppn' => 7260.0,
            'meterai' => 0.0,
            'tagihan' => 73260.0,
            'status' => 'Belum Dibayar',
          ),
          9 => 
          array (
            'no_faktur' => 'PD20250804001',
            'no_order' => 'SPD20250804002',
            'kode_suplier' => 'S0001',
            'nip' => '12/09/1988/001',
            'tgl_pesan' => '2025-08-04',
            'tgl_faktur' => '2025-08-04',
            'tgl_tempo' => '2025-08-04',
            'total1' => 128283.7877999999909661710262298583984375,
            'potongan' => 0.0,
            'total2' => 128283.7877999999909661710262298583984375,
            'ppn' => 14111.0,
            'meterai' => 0.0,
            'tagihan' => 142394.7877999999909661710262298583984375,
            'status' => 'Sudah Dibayar',
          ),
          10 => 
          array (
            'no_faktur' => 'PD20250804002',
            'no_order' => 'tet',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2025-08-04',
            'tgl_faktur' => '2025-08-04',
            'tgl_tempo' => '2025-08-04',
            'total1' => 768505.815509999985806643962860107421875,
            'potongan' => 0.0,
            'total2' => 768505.815509999985806643962860107421875,
            'ppn' => 84536.0,
            'meterai' => 0.0,
            'tagihan' => 853041.815509999985806643962860107421875,
            'status' => 'Belum Dibayar',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}