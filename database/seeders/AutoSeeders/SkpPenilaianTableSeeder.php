<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkpPenilaianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skp_penilaian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skp_penilaian')->insert(array (
          0 => 
          array (
            'nomor_penilaian' => 'SKP202405160001',
            'nik_dinilai' => 'D0000003',
            'nik_penilai' => 'D0000002',
            'tanggal' => '2024-05-16 21:09:46',
            'keterangan' => '-',
            'status' => 'Proses Penilaian',
          ),
          1 => 
          array (
            'nomor_penilaian' => 'SKP202406050001',
            'nik_dinilai' => 'D0000004',
            'nik_penilai' => '08998998',
            'tanggal' => '2024-06-05 17:20:29',
            'keterangan' => '-',
            'status' => 'Proses Penilaian',
          ),
          2 => 
          array (
            'nomor_penilaian' => 'SKP202410110001',
            'nik_dinilai' => 'D0000003',
            'nik_penilai' => '08998998',
            'tanggal' => '2024-10-11 13:17:30',
            'keterangan' => 'TES',
            'status' => 'Proses Penilaian',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}