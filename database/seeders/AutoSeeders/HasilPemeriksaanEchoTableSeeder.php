<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanEchoTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_echo')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_echo')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-06-20 14:08:30',
            'kd_dokter' => 'D0000004',
            'sistolik' => '1',
            'diastolic' => '1',
            'kontraktilitas' => '1',
            'dimensi_ruang' => '1',
            'katup' => '1',
            'analisa_segmental' => '1',
            'erap' => '1',
            'lain_lain' => '1',
            'kesimpulan' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}