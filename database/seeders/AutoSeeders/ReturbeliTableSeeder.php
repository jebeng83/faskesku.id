<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ReturbeliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('returbeli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('returbeli')->insert(array (
          0 => 
          array (
            'no_retur_beli' => 'RB241218001',
            'tgl_retur' => '2024-12-18',
            'nip' => '123124',
            'kode_suplier' => 'S0003',
            'kd_bangsal' => 'AP',
          ),
          1 => 
          array (
            'no_retur_beli' => 'RB241218002',
            'tgl_retur' => '2024-12-18',
            'nip' => '12/09/1988/001',
            'kode_suplier' => 'S0003',
            'kd_bangsal' => 'AP',
          ),
          2 => 
          array (
            'no_retur_beli' => 'RB250121001',
            'tgl_retur' => '2025-01-21',
            'nip' => '123124',
            'kode_suplier' => 'S0004',
            'kd_bangsal' => 'AP',
          ),
          3 => 
          array (
            'no_retur_beli' => 'RB250630001',
            'tgl_retur' => '2025-06-30',
            'nip' => '123124',
            'kode_suplier' => 'S0007',
            'kd_bangsal' => 'AP',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}