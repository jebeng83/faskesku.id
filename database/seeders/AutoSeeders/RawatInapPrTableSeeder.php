<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RawatInapPrTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rawat_inap_pr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rawat_inap_pr')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'J000713',
            'nip' => '123124',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '14:45:50',
            'material' => 15000.0,
            'bhp' => 0.0,
            'tarif_tindakanpr' => 25000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 40000.0,
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'J000892',
            'nip' => '123124',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '14:45:50',
            'material' => 0.0,
            'bhp' => 0.0,
            'tarif_tindakanpr' => 50000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 50000.0,
          ),
          2 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'UM.HT.033',
            'nip' => '123124',
            'tgl_perawatan' => '2025-06-17',
            'jam_rawat' => '13:21:36',
            'material' => 48000.0,
            'bhp' => 0.0,
            'tarif_tindakanpr' => 32000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 80000.0,
          ),
          3 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'UM.PSP.04',
            'nip' => '123124',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '14:45:50',
            'material' => 137500.0,
            'bhp' => 0.0,
            'tarif_tindakanpr' => 38500.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 176000.0,
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'kd_jenis_prw' => 'RI51003',
            'nip' => '123124',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:41:03',
            'material' => 30000.0,
            'bhp' => 0.0,
            'tarif_tindakanpr' => 20000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 50000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}