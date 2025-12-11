<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianUlangNyeriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_ulang_nyeri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_ulang_nyeri')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28 09:50:31',
            'nyeri' => 'Tidak Ada Nyeri',
            'provokes' => 'Proses Penyakit',
            'ket_provokes' => '1',
            'quality' => 'Seperti Tertusuk',
            'ket_quality' => '3',
            'lokasi' => '4',
            'menyebar' => 'Tidak',
            'skala_nyeri' => '0',
            'durasi' => '1',
            'nyeri_hilang' => 'Istirahat',
            'ket_nyeri' => '2',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}