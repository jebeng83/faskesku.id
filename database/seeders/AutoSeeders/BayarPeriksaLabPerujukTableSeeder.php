<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarPeriksaLabPerujukTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_periksa_lab_perujuk')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_periksa_lab_perujuk')->insert(array (
          0 => 
          array (
            'no_bayar' => 'JMD20250506001',
            'no_rawat' => '2025/04/26/000001',
            'kd_jenis_prw' => '102-K.2',
            'tgl_periksa' => '2025-04-26',
            'jam' => '09:31:42',
            'tarif_perujuk' => 4250.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}