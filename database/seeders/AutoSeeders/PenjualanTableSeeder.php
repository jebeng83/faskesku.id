<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenjualanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penjualan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penjualan')->insert(array (
          0 => 
          array (
            'nota_jual' => 'PJ20250414001',
            'tgl_jual' => '2025-04-14',
            'nip' => '123124',
            'no_rkm_medis' => '-',
            'nm_pasien' => 'PAIJO',
            'keterangan' => '-',
            'jns_jual' => 'Jual Bebas',
            'ongkir' => 0.0,
            'ppn' => 1222.09999999999990905052982270717620849609375,
            'status' => 'Sudah Dibayar',
            'kd_bangsal' => 'AP',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
          1 => 
          array (
            'nota_jual' => 'PJ20250428001',
            'tgl_jual' => '2025-04-28',
            'nip' => '123124',
            'no_rkm_medis' => '-',
            'nm_pasien' => 'VENDOR X',
            'keterangan' => '-',
            'jns_jual' => 'Jual Bebas',
            'ongkir' => 0.0,
            'ppn' => 1503.700000000000045474735088646411895751953125,
            'status' => 'Sudah Dibayar',
            'kd_bangsal' => 'AP',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
          2 => 
          array (
            'nota_jual' => 'PJ20250603001',
            'tgl_jual' => '2025-06-03',
            'nip' => '123124',
            'no_rkm_medis' => '000013',
            'nm_pasien' => 'PARAMITA RAMADANI',
            'keterangan' => 'TES',
            'jns_jual' => 'Jual Bebas',
            'ongkir' => 0.0,
            'ppn' => 175743.7000000000116415321826934814453125,
            'status' => 'Sudah Dibayar',
            'kd_bangsal' => 'AP',
            'kd_rek' => '112080',
            'nama_bayar' => 'Bank BCA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}