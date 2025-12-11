<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianMedisRalanPsikiatrikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_ralan_psikiatrik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_medis_ralan_psikiatrik')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/07/29/000003',
            'tanggal' => '2025-08-17 15:10:49',
            'kd_dokter' => 'D0000004',
            'anamnesis' => 'Autoanamnesis',
            'hubungan' => '',
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
            'keadaan' => 'Sehat',
            'gcs' => '18',
            'kesadaran' => 'Compos Mentis',
            'td' => '21',
            'nadi' => '22',
            'rr' => '23',
            'suhu' => '24',
            'spo' => '25',
            'bb' => '20',
            'tb' => '19',
            'kepala' => 'Normal',
            'gigi' => 'Normal',
            'tht' => 'Normal',
            'thoraks' => 'Normal',
            'abdomen' => 'Normal',
            'genital' => 'Normal',
            'ekstremitas' => 'Normal',
            'kulit' => 'Normal',
            'ket_fisik' => '26',
            'penunjang' => '27 ok',
            'diagnosis' => '28',
            'tata' => '29',
            'konsulrujuk' => '30',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}