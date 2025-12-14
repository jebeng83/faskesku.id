<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanOctTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_oct')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_oct')->insert([
            0 => [
                'no_rawat' => '2025/04/25/000001',
                'tanggal' => '2025-06-11 06:33:59',
                'kd_dokter' => 'D0000003',
                'diagnosa_klinis' => '2',
                'kiriman_dari' => '1',
                'hasil_pemeriksaan' => '3 tes',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
