<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrspembelianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrspembelian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrspembelian')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PI20250428001',
            'kode_suplier' => 'S0002',
            'nip' => '123124',
            'tgl_beli' => '2025-04-28',
            'subtotal' => 666000.0,
            'potongan' => 0.0,
            'total' => 666000.0,
            'ppn' => 73260.0,
            'meterai' => 0.0,
            'tagihan' => 739260.0,
            'kd_rek' => '111010',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}