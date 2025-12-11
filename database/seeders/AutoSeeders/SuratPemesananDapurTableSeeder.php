<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPemesananDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_pemesanan_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_pemesanan_dapur')->insert(array (
          0 => 
          array (
            'no_pemesanan' => 'SPD20241117001',
            'kode_suplier' => 'S0001',
            'nip' => 'D0000004',
            'tanggal' => '2024-11-17',
            'subtotal' => 115000.0,
            'potongan' => 0.0,
            'total' => 115000.0,
            'ppn' => 12650.0,
            'meterai' => 0.0,
            'tagihan' => 127650.0,
            'status' => 'Sudah Datang',
          ),
          1 => 
          array (
            'no_pemesanan' => 'SPD20241120001',
            'kode_suplier' => 'S0001',
            'nip' => 'D0000003',
            'tanggal' => '2024-11-20',
            'subtotal' => 109000.0,
            'potongan' => 0.0,
            'total' => 109000.0,
            'ppn' => 11990.0,
            'meterai' => 0.0,
            'tagihan' => 120990.0,
            'status' => 'Sudah Datang',
          ),
          2 => 
          array (
            'no_pemesanan' => 'SPD20241122001',
            'kode_suplier' => 'S0001',
            'nip' => 'D0000004',
            'tanggal' => '2024-11-22',
            'subtotal' => 1493000.0,
            'potongan' => 0.0,
            'total' => 1493000.0,
            'ppn' => 164230.0,
            'meterai' => 0.0,
            'tagihan' => 1657230.0,
            'status' => 'Sudah Datang',
          ),
          3 => 
          array (
            'no_pemesanan' => 'SPD20241122002',
            'kode_suplier' => 'S0001',
            'nip' => '010101',
            'tanggal' => '2024-11-22',
            'subtotal' => 1493000.0,
            'potongan' => 0.0,
            'total' => 1493000.0,
            'ppn' => 164230.0,
            'meterai' => 0.0,
            'tagihan' => 1657230.0,
            'status' => 'Sudah Datang',
          ),
          4 => 
          array (
            'no_pemesanan' => 'SPD20241126001',
            'kode_suplier' => 'S0001',
            'nip' => '010101',
            'tanggal' => '2024-11-26',
            'subtotal' => 1041180.0,
            'potongan' => 0.0,
            'total' => 1041180.0,
            'ppn' => 114530.0,
            'meterai' => 0.0,
            'tagihan' => 1155710.0,
            'status' => 'Sudah Datang',
          ),
          5 => 
          array (
            'no_pemesanan' => 'SPD20250211001',
            'kode_suplier' => 'S0001',
            'nip' => 'D0000004',
            'tanggal' => '2025-02-11',
            'subtotal' => 170411.7509999999892897903919219970703125,
            'potongan' => 0.0,
            'total' => 170411.7509999999892897903919219970703125,
            'ppn' => 18745.0,
            'meterai' => 0.0,
            'tagihan' => 189156.7509999999892897903919219970703125,
            'status' => 'Sudah Datang',
          ),
          6 => 
          array (
            'no_pemesanan' => 'SPD20250804001',
            'kode_suplier' => 'S0001',
            'nip' => '156798',
            'tanggal' => '2025-08-04',
            'subtotal' => 904336.89840000006370246410369873046875,
            'potongan' => 0.0,
            'total' => 904336.89840000006370246410369873046875,
            'ppn' => 99477.0,
            'meterai' => 0.0,
            'tagihan' => 1003813.89840000006370246410369873046875,
            'status' => 'Proses Pesan',
          ),
          7 => 
          array (
            'no_pemesanan' => 'SPD20250804002',
            'kode_suplier' => 'S0001',
            'nip' => '156798',
            'tanggal' => '2025-08-04',
            'subtotal' => 158645.1959999999962747097015380859375,
            'potongan' => 0.0,
            'total' => 158645.1959999999962747097015380859375,
            'ppn' => 17451.0,
            'meterai' => 0.0,
            'tagihan' => 176096.1959999999962747097015380859375,
            'status' => 'Sudah Datang',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}