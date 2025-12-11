<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanEkgTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_ekg')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_ekg')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-06-18 14:07:07',
            'kd_dokter' => 'D0000004',
            'diagnosa_klinis' => '1',
            'kiriman_dari' => '1',
            'irama' => '1',
            'laju_jantung' => '1',
            'gelombangp' => '1',
            'intervalpr' => '1',
            'axis' => '1',
            'kompleksqrs' => '1',
            'segmenst' => 'Normal',
            'gelombangt' => 'Normal',
            'kesimpulan' => '12',
          ),
          1 => 
          array (
            'no_rawat' => '2025/08/11/000002',
            'tanggal' => '2025-08-11 15:04:08',
            'kd_dokter' => 'D0000004',
            'diagnosa_klinis' => 'wqw',
            'kiriman_dari' => 'wqwqw',
            'irama' => 'qwqwqwqw',
            'laju_jantung' => 'qwqwqw',
            'gelombangp' => 'qwqw',
            'intervalpr' => 'qwqwqw',
            'axis' => 'qwqwqw',
            'kompleksqrs' => '',
            'segmenst' => 'Normal',
            'gelombangt' => 'Normal',
            'kesimpulan' => 'wqwqw',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}