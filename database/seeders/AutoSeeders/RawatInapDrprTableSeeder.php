<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RawatInapDrprTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rawat_inap_drpr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rawat_inap_drpr')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'UM.HT.034',
            'kd_dokter' => 'D0000004',
            'nip' => '-',
            'tgl_perawatan' => '2025-04-28',
            'jam_rawat' => '14:07:21',
            'material' => 48000.0,
            'bhp' => 0.0,
            'tarif_tindakandr' => 0.0,
            'tarif_tindakanpr' => 32000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 80000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}