<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPemesananNonMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_pemesanan_non_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_pemesanan_non_medis')->insert(array (
          0 => 
          array (
            'no_pemesanan' => 'SPM20250123001',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tanggal' => '2025-01-23',
            'subtotal' => 1427236.36838268744759261608123779296875,
            'potongan' => 0.0,
            'total' => 1427236.36838268744759261608123779296875,
            'ppn' => 156996.0,
            'meterai' => 0.0,
            'tagihan' => 1584232.36838268744759261608123779296875,
            'status' => 'Sudah Datang',
          ),
          1 => 
          array (
            'no_pemesanan' => 'SPM20250123002',
            'kode_suplier' => 'S0002',
            'nip' => '08998998',
            'tanggal' => '2025-01-23',
            'subtotal' => 512608.61326500005088746547698974609375,
            'potongan' => 0.0,
            'total' => 512608.61326500005088746547698974609375,
            'ppn' => 56387.0,
            'meterai' => 0.0,
            'tagihan' => 568995.61326500005088746547698974609375,
            'status' => 'Sudah Datang',
          ),
          2 => 
          array (
            'no_pemesanan' => 'SPM20250130001',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tanggal' => '2025-01-30',
            'subtotal' => 2220000.0,
            'potongan' => 0.0,
            'total' => 2220000.0,
            'ppn' => 244200.0,
            'meterai' => 0.0,
            'tagihan' => 2464200.0,
            'status' => 'Sudah Datang',
          ),
          3 => 
          array (
            'no_pemesanan' => 'SPM20250813001',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tanggal' => '2025-08-13',
            'subtotal' => 621967.973491500015370547771453857421875,
            'potongan' => 0.0,
            'total' => 621967.973491500015370547771453857421875,
            'ppn' => 68416.0,
            'meterai' => 0.0,
            'tagihan' => 690383.973491500015370547771453857421875,
            'status' => 'Sudah Datang',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}