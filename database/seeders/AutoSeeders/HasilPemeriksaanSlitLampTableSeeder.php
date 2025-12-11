<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanSlitLampTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_slit_lamp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_slit_lamp')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-06-10 14:52:34',
            'kd_dokter' => 'D0000004',
            'diagnosa_klinis' => '2',
            'kiriman_dari' => '1',
            'hasil_pemeriksaan' => '3',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}