<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BayarRawatJlDrprTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bayar_rawat_jl_drpr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bayar_rawat_jl_drpr')->insert(array (
          0 => 
          array (
            'no_bayar' => 'JMD20250428001',
            'no_rawat' => '2025/04/28/000002',
            'kd_jenis_prw' => 'J000815',
            'tgl_perawatan' => '2025-04-28',
            'jam_rawat' => '09:22:42',
            'tarif_tindakandr' => 110000.0,
          ),
          1 => 
          array (
            'no_bayar' => 'JMD20250428001',
            'no_rawat' => '2025/05/15/000001',
            'kd_jenis_prw' => 'D005',
            'tgl_perawatan' => '2025-04-28',
            'jam_rawat' => '09:43:35',
            'tarif_tindakandr' => 110000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}