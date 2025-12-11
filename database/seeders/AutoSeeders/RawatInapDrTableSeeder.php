<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RawatInapDrTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rawat_inap_dr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rawat_inap_dr')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'BU.ODC.9',
            'kd_dokter' => 'D0000005',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '14:45:01',
            'material' => 0.0,
            'bhp' => 0.0,
            'tarif_tindakandr' => 1780962.5,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 1780962.5,
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_jenis_prw' => 'BU.VIP.8',
            'kd_dokter' => 'D0000005',
            'tgl_perawatan' => '2025-06-03',
            'jam_rawat' => '14:45:01',
            'material' => 0.0,
            'bhp' => 0.0,
            'tarif_tindakandr' => 5750000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 5750000.0,
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kd_jenis_prw' => 'OG.III.77',
            'kd_dokter' => 'D0000004',
            'tgl_perawatan' => '2025-06-30',
            'jam_rawat' => '15:12:39',
            'material' => 0.0,
            'bhp' => 0.0,
            'tarif_tindakandr' => 1878500.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 1878500.0,
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'kd_jenis_prw' => 'J000624',
            'kd_dokter' => 'D0000004',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '10:01:14',
            'material' => 30000.0,
            'bhp' => 0.0,
            'tarif_tindakandr' => 160000.0,
            'kso' => 0.0,
            'menejemen' => 0.0,
            'biaya_rawat' => 190000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}