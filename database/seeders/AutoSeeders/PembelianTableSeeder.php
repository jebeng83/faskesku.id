<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PembelianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pembelian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pembelian')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PB-20251008-001',
            'kode_suplier' => 'S0009',
            'nip' => '156798',
            'tgl_beli' => '2025-10-08',
            'total1' => 367580.0,
            'potongan' => 0.0,
            'total2' => 367580.0,
            'ppn' => 0.0,
            'tagihan' => 367580.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          1 => 
          array (
            'no_faktur' => 'PB-20251009-001',
            'kode_suplier' => 'S0009',
            'nip' => '123124',
            'tgl_beli' => '2025-10-09',
            'total1' => 119940.0,
            'potongan' => 0.0,
            'total2' => 119940.0,
            'ppn' => 13193.399999999999636202119290828704833984375,
            'tagihan' => 133133.39999999999417923390865325927734375,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          2 => 
          array (
            'no_faktur' => 'PB-20251009-002',
            'kode_suplier' => 'S0009',
            'nip' => '123124',
            'tgl_beli' => '2025-10-09',
            'total1' => 16183.638000000000829459168016910552978515625,
            'potongan' => 0.0,
            'total2' => 16183.638000000000829459168016910552978515625,
            'ppn' => 0.0,
            'tagihan' => 16183.638000000000829459168016910552978515625,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          3 => 
          array (
            'no_faktur' => 'PB-20251009-003',
            'kode_suplier' => 'S0009',
            'nip' => '01010101',
            'tgl_beli' => '2025-10-09',
            'total1' => 149250.0,
            'potongan' => 0.0,
            'total2' => 149250.0,
            'ppn' => 0.0,
            'tagihan' => 149250.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          4 => 
          array (
            'no_faktur' => 'PB-20251009-004',
            'kode_suplier' => 'S0009',
            'nip' => '156798',
            'tgl_beli' => '2025-10-09',
            'total1' => 275000.0,
            'potongan' => 0.0,
            'total2' => 275000.0,
            'ppn' => 0.0,
            'tagihan' => 275000.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          5 => 
          array (
            'no_faktur' => 'PB-20251009-005',
            'kode_suplier' => 'S0009',
            'nip' => '156798',
            'tgl_beli' => '2025-10-09',
            'total1' => 116160.0,
            'potongan' => 0.0,
            'total2' => 116160.0,
            'ppn' => 0.0,
            'tagihan' => 116160.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          6 => 
          array (
            'no_faktur' => 'PB-20251202-001',
            'kode_suplier' => 'S0006',
            'nip' => '-',
            'tgl_beli' => '2025-12-02',
            'total1' => 20000.0,
            'potongan' => 0.0,
            'total2' => 20000.0,
            'ppn' => 0.0,
            'tagihan' => 20000.0,
            'kd_bangsal' => '-',
            'kd_rek' => '111010',
          ),
          7 => 
          array (
            'no_faktur' => 'PB-20251203-001',
            'kode_suplier' => 'S0006',
            'nip' => '-',
            'tgl_beli' => '2025-12-03',
            'total1' => 20000.0,
            'potongan' => 0.0,
            'total2' => 20000.0,
            'ppn' => 2000.0,
            'tagihan' => 22000.0,
            'kd_bangsal' => '-',
            'kd_rek' => '111010',
          ),
          8 => 
          array (
            'no_faktur' => 'PB-20251203-002',
            'kode_suplier' => 'S0001',
            'nip' => '-',
            'tgl_beli' => '2025-12-03',
            'total1' => 100000.0,
            'potongan' => 0.0,
            'total2' => 100000.0,
            'ppn' => 0.0,
            'tagihan' => 100000.0,
            'kd_bangsal' => '-',
            'kd_rek' => '112080',
          ),
          9 => 
          array (
            'no_faktur' => 'PB-20251204-001',
            'kode_suplier' => 'S0007',
            'nip' => '123124',
            'tgl_beli' => '2025-12-04',
            'total1' => 13750.0,
            'potongan' => 0.0,
            'total2' => 13750.0,
            'ppn' => 0.0,
            'tagihan' => 13750.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          10 => 
          array (
            'no_faktur' => 'PB-20251204-002',
            'kode_suplier' => 'S0004',
            'nip' => '01010101',
            'tgl_beli' => '2025-12-04',
            'total1' => 382117.5,
            'potongan' => 0.0,
            'total2' => 382117.5,
            'ppn' => 42032.925000000002910383045673370361328125,
            'tagihan' => 424150.4249999999883584678173065185546875,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          11 => 
          array (
            'no_faktur' => 'PB-20251204-003',
            'kode_suplier' => 'S0001',
            'nip' => '-',
            'tgl_beli' => '2025-12-04',
            'total1' => 20000.0,
            'potongan' => 0.0,
            'total2' => 20000.0,
            'ppn' => 0.0,
            'tagihan' => 20000.0,
            'kd_bangsal' => '-',
            'kd_rek' => '111010',
          ),
          12 => 
          array (
            'no_faktur' => 'PB-20251204-T1',
            'kode_suplier' => 'S0001',
            'nip' => '01010101',
            'tgl_beli' => '2025-12-04',
            'total1' => 150000.0,
            'potongan' => 0.0,
            'total2' => 150000.0,
            'ppn' => 0.0,
            'tagihan' => 150000.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          13 => 
          array (
            'no_faktur' => 'PB-20251204-T2',
            'kode_suplier' => 'S0001',
            'nip' => '01010101',
            'tgl_beli' => '2025-12-04',
            'total1' => 200000.0,
            'potongan' => 0.0,
            'total2' => 200000.0,
            'ppn' => 0.0,
            'tagihan' => 200000.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          14 => 
          array (
            'no_faktur' => 'PB-20251204-T3',
            'kode_suplier' => 'S0001',
            'nip' => '01010101',
            'tgl_beli' => '2025-12-04',
            'total1' => 200000.0,
            'potongan' => 0.0,
            'total2' => 200000.0,
            'ppn' => 0.0,
            'tagihan' => 200000.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          15 => 
          array (
            'no_faktur' => 'PB-20251204-T4',
            'kode_suplier' => 'S0001',
            'nip' => '01010101',
            'tgl_beli' => '2025-12-04',
            'total1' => 200000.0,
            'potongan' => 0.0,
            'total2' => 200000.0,
            'ppn' => 0.0,
            'tagihan' => 200000.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '111010',
          ),
          16 => 
          array (
            'no_faktur' => 'PG20250414001',
            'kode_suplier' => 'S0007',
            'nip' => '123124',
            'tgl_beli' => '2025-04-14',
            'total1' => 146760.0,
            'potongan' => 0.0,
            'total2' => 146760.0,
            'ppn' => 16143.600000000000363797880709171295166015625,
            'tagihan' => 162903.60000000000582076609134674072265625,
            'kd_bangsal' => 'GD',
            'kd_rek' => '111010',
          ),
          17 => 
          array (
            'no_faktur' => 'PG20250428001',
            'kode_suplier' => 'S0007',
            'nip' => '123124',
            'tgl_beli' => '2025-04-28',
            'total1' => 821990.0,
            'potongan' => 0.0,
            'total2' => 821990.0,
            'ppn' => 90418.89999999999417923390865325927734375,
            'tagihan' => 912408.900000000023283064365386962890625,
            'kd_bangsal' => 'AP',
            'kd_rek' => '112080',
          ),
          18 => 
          array (
            'no_faktur' => 'PG20250630001',
            'kode_suplier' => 'S0003',
            'nip' => '123124',
            'tgl_beli' => '2025-06-30',
            'total1' => 81500.0,
            'potongan' => 0.0,
            'total2' => 81500.0,
            'ppn' => 8965.0,
            'tagihan' => 90465.0,
            'kd_bangsal' => 'AP',
            'kd_rek' => '112080',
          ),
          19 => 
          array (
            'no_faktur' => 'TEST-FAKTUR-2025-12-',
            'kode_suplier' => 'S0001',
            'nip' => '-',
            'tgl_beli' => '2025-12-02',
            'total1' => 100000.0,
            'potongan' => 10000.0,
            'total2' => 90000.0,
            'ppn' => 9000.0,
            'tagihan' => 99000.0,
            'kd_bangsal' => '-',
            'kd_rek' => '111010',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}