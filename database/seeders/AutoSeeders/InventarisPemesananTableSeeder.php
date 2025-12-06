<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisPemesananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_pemesanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_pemesanan')->insert(array (
          0 => 
          array (
            'no_faktur' => 'PAI20250130001',
            'no_order' => '121',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2025-01-30',
            'tgl_faktur' => '2025-01-30',
            'tgl_tempo' => '2025-01-30',
            'total1' => 20000000.0,
            'potongan' => 0.0,
            'total2' => 20000000.0,
            'ppn' => 2200000.0,
            'meterai' => 0.0,
            'tagihan' => 22200000.0,
            'status' => 'Sudah Dibayar',
            'kd_rek_aset' => '123104',
          ),
          1 => 
          array (
            'no_faktur' => 'PAI20250603001',
            'no_order' => '121212',
            'kode_suplier' => 'S0001',
            'nip' => '123124',
            'tgl_pesan' => '2025-06-03',
            'tgl_faktur' => '2025-06-03',
            'tgl_tempo' => '2025-06-03',
            'total1' => 20000000.0,
            'potongan' => 2000000.0,
            'total2' => 18000000.0,
            'ppn' => 1980000.0,
            'meterai' => 0.0,
            'tagihan' => 19980000.0,
            'status' => 'Sudah Dibayar',
            'kd_rek_aset' => '123104',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}