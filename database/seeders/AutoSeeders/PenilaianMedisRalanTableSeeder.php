<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianMedisRalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_ralan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_ralan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tanggal' => '2025-05-26 10:26:11',
            'kd_dokter' => 'D0000004',
            'anamnesis' => 'Autoanamnesis',
            'hubungan' => '',
            'keluhan_utama' => '-',
            'rps' => '-',
            'rpd' => '-',
            'rpk' => '-',
            'rpo' => '-',
            'alergi' => '',
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
            'gigi' => 'Normal',
            'tht' => 'Normal',
            'thoraks' => 'Normal',
            'abdomen' => 'Normal',
            'genital' => 'Normal',
            'ekstremitas' => 'Normal',
            'kulit' => 'Normal',
            'ket_fisik' => '',
            'ket_lokalis' => '',
            'penunjang' => '',
            'diagnosis' => '',
            'tata' => 'tes',
            'konsulrujuk' => 'tes',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'tanggal' => '2025-06-25 08:59:56',
            'kd_dokter' => 'D0000003',
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
            'gigi' => 'Normal',
            'tht' => 'Normal',
            'thoraks' => 'Normal',
            'abdomen' => 'Normal',
            'genital' => 'Normal',
            'ekstremitas' => 'Normal',
            'kulit' => 'Normal',
            'ket_fisik' => '',
            'ket_lokalis' => '',
            'penunjang' => '',
            'diagnosis' => '',
            'tata' => '',
            'konsulrujuk' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}