<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurDetailReturbeliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapur_detail_returbeli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapur_detail_returbeli')->insert(array (
          0 => 
          array (
            'no_retur_beli' => 'TRB20241118001',
            'no_faktur' => '',
            'kode_brng' => 'D00002',
            'kode_sat' => 'PTG',
            'h_beli' => 10000.0,
            'h_retur' => 10000.0,
            'jml_retur' => 10.0,
            'total' => 100000.0,
          ),
          1 => 
          array (
            'no_retur_beli' => 'TRB20241118001',
            'no_faktur' => '',
            'kode_brng' => 'D00001',
            'kode_sat' => 'BKS',
            'h_beli' => 3000.0,
            'h_retur' => 3000.0,
            'jml_retur' => 4.0,
            'total' => 12000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}