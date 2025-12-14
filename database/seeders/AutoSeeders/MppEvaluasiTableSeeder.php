<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MppEvaluasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('mpp_evaluasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('mpp_evaluasi')->insert([
            0 => [
                'no_rawat' => '2025/04/25/000001',
                'tanggal' => '2025-05-26 14:28:19',
                'kd_dokter' => 'D0000003',
                'kd_konsulan' => 'D0000004',
                'diagnosis' => 'tes',
                'kelompok' => '-',
                'assesmen' => '-',
                'identifikasi' => '-',
                'rencana' => '-',
                'nip' => '123124',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
