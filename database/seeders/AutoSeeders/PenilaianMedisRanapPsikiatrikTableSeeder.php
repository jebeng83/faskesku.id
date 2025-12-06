<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianMedisRanapPsikiatrikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_ranap_psikiatrik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_ranap_psikiatrik')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-08-18 08:44:30',
            'kd_dokter' => 'D0000004',
            'anamnesis' => 'Autoanamnesis',
            'hubungan' => 'x',
            'keluhan_utama' => '1',
            'rps' => '2',
            'rpd' => '4',
            'rpk' => '3',
            'rpo' => '5',
            'alergi' => '6',
            'penampilan' => '7',
            'pembicaraan' => '9',
            'psikomotor' => '11',
            'sikap' => '13',
            'mood' => '15',
            'fungsi_kognitif' => '17',
            'gangguan_persepsi' => '8',
            'proses_pikir' => '10',
            'pengendalian_impuls' => '12',
            'tilikan' => '14',
            'rta' => '16',
            'skala_penilaian_khusus' => '18',
            'keadaan' => 'Sehat',
            'gcs' => '19',
            'kesadaran' => 'Compos Mentis',
            'td' => '22',
            'nadi' => '23',
            'rr' => '24',
            'suhu' => '25',
            'spo' => '26',
            'bb' => '21',
            'tb' => '20',
            'kepala' => 'Normal',
            'gigi' => 'Normal',
            'tht' => 'Normal',
            'thoraks' => 'Normal',
            'abdomen' => 'Normal',
            'genital' => 'Normal',
            'ekstremitas' => 'Normal',
            'kulit' => 'Normal',
            'ket_fisik' => '27',
            'penunjang' => '28',
            'diagnosis' => '29',
            'tata' => '30 8',
            'konsulrujuk' => '31',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}