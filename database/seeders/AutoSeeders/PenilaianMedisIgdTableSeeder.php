<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianMedisIgdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_igd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_igd')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-07-07 09:37:07',
            'kd_dokter' => 'D0000004',
            'anamnesis' => 'Autoanamnesis',
            'hubungan' => '',
            'keluhan_utama' => '1',
            'rps' => '1',
            'rpd' => '1',
            'rpk' => '1',
            'rpo' => '1',
            'alergi' => '1',
            'keadaan' => 'Sehat',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'td' => '',
            'nadi' => '',
            'rr' => '',
            'suhu' => '',
            'spo' => '',
            'bb' => '',
            'tb' => '',
            'kepala' => 'Normal',
            'mata' => 'Normal',
            'gigi' => 'Normal',
            'leher' => 'Normal',
            'thoraks' => 'Normal',
            'abdomen' => 'Normal',
            'genital' => 'Normal',
            'ekstremitas' => 'Normal',
            'ket_fisik' => '1',
            'ket_lokalis' => '1',
            'ekg' => '1',
            'rad' => '1',
            'lab' => '1',
            'diagnosis' => '1',
            'tata' => '1',
          ),
          1 => 
          array (
            'no_rawat' => '2025/08/19/000003',
            'tanggal' => '2025-08-19 13:12:38',
            'kd_dokter' => 'D0000004',
            'anamnesis' => 'Autoanamnesis',
            'hubungan' => '',
            'keluhan_utama' => '-',
            'rps' => '-',
            'rpd' => '-',
            'rpk' => '-',
            'rpo' => '-',
            'alergi' => '-',
            'keadaan' => 'Sehat',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'td' => '',
            'nadi' => '',
            'rr' => '',
            'suhu' => '',
            'spo' => '',
            'bb' => '',
            'tb' => '',
            'kepala' => 'Normal',
            'mata' => 'Normal',
            'gigi' => 'Normal',
            'leher' => 'Normal',
            'thoraks' => 'Normal',
            'abdomen' => 'Normal',
            'genital' => 'Normal',
            'ekstremitas' => 'Normal',
            'ket_fisik' => '',
            'ket_lokalis' => '',
            'ekg' => '',
            'rad' => '',
            'lab' => '',
            'diagnosis' => '',
            'tata' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}