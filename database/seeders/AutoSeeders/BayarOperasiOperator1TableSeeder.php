<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarOperasiOperator1TableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_operasi_operator1')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_operasi_operator1')->insert(array (
          0 => 
          array (
            'no_bayar' => 'JMD20250506001',
            'no_rawat' => '2025/04/25/000001',
            'kode_paket' => 'N3001',
            'tgl_operasi' => '2025-04-28 14:56:32',
            'biayaoperator1' => 1890000.0,
          ),
          1 => 
          array (
            'no_bayar' => 'JMD20250603001',
            'no_rawat' => '2025/05/26/000003',
            'kode_paket' => 'M5012',
            'tgl_operasi' => '2025-05-26 11:50:56',
            'biayaoperator1' => 3710000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}