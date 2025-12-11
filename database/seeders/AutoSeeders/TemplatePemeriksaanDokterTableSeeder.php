<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplatePemeriksaanDokterTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_pemeriksaan_dokter')->insert(array (
          0 => 
          array (
            'no_template' => 'TPD0000000000000001',
            'kd_dokter' => 'D0000004',
            'keluhan' => '1',
            'pemeriksaan' => '2 ',
            'penilaian' => '3 ',
            'rencana' => '4',
            'instruksi' => '5',
            'evaluasi' => '6',
          ),
          1 => 
          array (
            'no_template' => 'TPD0000000000000002',
            'kd_dokter' => 'D0000003',
            'keluhan' => 'wrrw',
            'pemeriksaan' => 'yry',
            'penilaian' => 'tes',
            'rencana' => '',
            'instruksi' => '',
            'evaluasi' => '',
          ),
          2 => 
          array (
            'no_template' => 'TPD0000000000000003',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'SASASASAS',
            'pemeriksaan' => 'SASAS',
            'penilaian' => 'TBC',
            'rencana' => 'SASAS',
            'instruksi' => 'ASASAS',
            'evaluasi' => 'ASAS',
          ),
          3 => 
          array (
            'no_template' => 'TPD0000000000000004',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'PAKET MCU 15 ORANG',
            'pemeriksaan' => '1212',
            'penilaian' => '1212',
            'rencana' => '121212',
            'instruksi' => '',
            'evaluasi' => '',
          ),
          4 => 
          array (
            'no_template' => 'TPD0000000000000005',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'tes',
            'pemeriksaan' => 'tes',
            'penilaian' => 'typhoid',
            'rencana' => 'tes',
            'instruksi' => '',
            'evaluasi' => '',
          ),
          5 => 
          array (
            'no_template' => 'TPD0000000000000006',
            'kd_dokter' => 'D0000004',
            'keluhan' => '',
            'pemeriksaan' => '',
            'penilaian' => 'PAKET MCU',
            'rencana' => '',
            'instruksi' => '',
            'evaluasi' => '',
          ),
          6 => 
          array (
            'no_template' => 'TPD0000000000000007',
            'kd_dokter' => 'D0000004',
            'keluhan' => '-',
            'pemeriksaan' => '-',
            'penilaian' => 'PAKET SC',
            'rencana' => '-',
            'instruksi' => '',
            'evaluasi' => '',
          ),
          7 => 
          array (
            'no_template' => 'TPD0000000000000008',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'pasien mengeluh menggigil',
            'pemeriksaan' => 'mata merah, akral dingin',
            'penilaian' => 'thyphoid',
            'rencana' => '',
            'instruksi' => 'cek lab',
            'evaluasi' => '',
          ),
          8 => 
          array (
            'no_template' => 'TPD0000000000000009',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'qwqwqw',
            'pemeriksaan' => 'wqwqw',
            'penilaian' => 'PENYAKIT JANTUNG',
            'rencana' => 'qwqwqw',
            'instruksi' => 'wqwqw',
            'evaluasi' => 'qwqw',
          ),
          9 => 
          array (
            'no_template' => 'TPD0000000000000010',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'MUAL, MUNTAH, NYERI DADA',
            'pemeriksaan' => '',
            'penilaian' => 'TYPOID FEVER',
            'rencana' => '',
            'instruksi' => '',
            'evaluasi' => '',
          ),
          10 => 
          array (
            'no_template' => 'TPD0000000000000011',
            'kd_dokter' => 'D0000004',
            'keluhan' => 'NYERI DADA SEBELAH KIRI',
            'pemeriksaan' => 'SUHU : 37',
            'penilaian' => 'TYPHOID',
            'rencana' => 'LAB, RADIOLOGI',
            'instruksi' => '',
            'evaluasi' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}