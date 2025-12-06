<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemeriksaanRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemeriksaan_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemeriksaan_ranap')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_perawatan' => '2025-05-26',
            'jam_rawat' => '13:58:12',
            'suhu_tubuh' => '',
            'tensi' => '',
            'nadi' => '',
            'respirasi' => '',
            'tinggi' => '',
            'berat' => '',
            'spo2' => '',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'keluhan' => 'tes',
            'pemeriksaan' => 'tes',
            'alergi' => '',
            'penilaian' => '',
            'rtl' => '',
            'instruksi' => '',
            'evaluasi' => '',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tgl_perawatan' => '2025-08-12',
            'jam_rawat' => '20:30:45',
            'suhu_tubuh' => '',
            'tensi' => '',
            'nadi' => '',
            'respirasi' => '',
            'tinggi' => '',
            'berat' => '',
            'spo2' => '',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'keluhan' => '',
            'pemeriksaan' => '',
            'alergi' => '',
            'penilaian' => '',
            'rtl' => '',
            'instruksi' => 'instruksi',
            'evaluasi' => '',
            'nip' => 'D0000004',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tgl_perawatan' => '2025-08-14',
            'jam_rawat' => '15:39:22',
            'suhu_tubuh' => '3',
            'tensi' => '',
            'nadi' => '',
            'respirasi' => '',
            'tinggi' => '',
            'berat' => '',
            'spo2' => '',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'keluhan' => 'tes',
            'pemeriksaan' => '2',
            'alergi' => '',
            'penilaian' => '4',
            'rtl' => '5',
            'instruksi' => '6',
            'evaluasi' => '7',
            'nip' => 'D0000003',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tgl_perawatan' => '2025-08-14',
            'jam_rawat' => '15:43:07',
            'suhu_tubuh' => '',
            'tensi' => '',
            'nadi' => '',
            'respirasi' => '',
            'tinggi' => '',
            'berat' => '',
            'spo2' => '',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'keluhan' => 'sasas',
            'pemeriksaan' => 'sasas',
            'alergi' => 'asas',
            'penilaian' => 'sasas',
            'rtl' => 'sasas',
            'instruksi' => 'sasa',
            'evaluasi' => 'asas',
            'nip' => '123124',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:40:38',
            'suhu_tubuh' => '',
            'tensi' => '',
            'nadi' => '',
            'respirasi' => '',
            'tinggi' => '',
            'berat' => '',
            'spo2' => '',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'keluhan' => '1',
            'pemeriksaan' => '1',
            'alergi' => '1',
            'penilaian' => '1',
            'rtl' => '1',
            'instruksi' => '',
            'evaluasi' => '',
            'nip' => '123124',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tgl_perawatan' => '2025-07-05',
            'jam_rawat' => '09:35:14',
            'suhu_tubuh' => '',
            'tensi' => '',
            'nadi' => '',
            'respirasi' => '',
            'tinggi' => '',
            'berat' => '',
            'spo2' => '',
            'gcs' => '',
            'kesadaran' => 'Compos Mentis',
            'keluhan' => 'asas',
            'pemeriksaan' => 'sasas',
            'alergi' => '',
            'penilaian' => '',
            'rtl' => '',
            'instruksi' => '',
            'evaluasi' => '',
            'nip' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}