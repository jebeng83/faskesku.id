<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurreturbeliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurreturbeli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurreturbeli')->insert(array (
          0 => 
          array (
            'no_retur_beli' => 'TRB20241118001',
            'tgl_retur' => '2024-11-18',
            'nip' => '123124',
            'kode_suplier' => 'S0001',
            'catatan' => '1',
            'total' => 112000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}