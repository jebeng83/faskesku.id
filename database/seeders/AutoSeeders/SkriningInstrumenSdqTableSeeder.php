<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkriningInstrumenSdqTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skrining_instrumen_sdq')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skrining_instrumen_sdq')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'tanggal' => '2025-08-25 13:05:15',
            'nip' => '12/09/1988/001',
            'pernyataansdq1' => 'Selalu Benar',
            'nilai_sdq1' => 2,
            'pernyataansdq2' => 'Selalu Benar',
            'nilai_sdq2' => 2,
            'pernyataansdq3' => 'Selalu Benar',
            'nilai_sdq3' => 2,
            'pernyataansdq4' => 'Tidak Benar',
            'nilai_sdq4' => 2,
            'pernyataansdq5' => 'Selalu Benar',
            'nilai_sdq5' => 2,
            'pernyataansdq6' => 'Tidak Benar',
            'nilai_sdq6' => 0,
            'pernyataansdq7' => 'Tidak Benar',
            'nilai_sdq7' => 0,
            'pernyataansdq8' => 'Tidak Benar',
            'nilai_sdq8' => 0,
            'pernyataansdq9' => 'Tidak Benar',
            'nilai_sdq9' => 2,
            'pernyataansdq10' => 'Tidak Benar',
            'nilai_sdq10' => 0,
            'pernyataansdq11' => 'Tidak Benar',
            'nilai_sdq11' => 0,
            'pernyataansdq12' => 'Tidak Benar',
            'nilai_sdq12' => 0,
            'pernyataansdq13' => 'Tidak Benar',
            'nilai_sdq13' => 0,
            'pernyataansdq14' => 'Tidak Benar',
            'nilai_sdq14' => 0,
            'pernyataansdq15' => 'Tidak Benar',
            'nilai_sdq15' => 0,
            'pernyataansdq16' => 'Tidak Benar',
            'nilai_sdq16' => 0,
            'pernyataansdq17' => 'Tidak Benar',
            'nilai_sdq17' => 2,
            'pernyataansdq18' => 'Tidak Benar',
            'nilai_sdq18' => 0,
            'pernyataansdq19' => 'Tidak Benar',
            'nilai_sdq19' => 0,
            'pernyataansdq20' => 'Tidak Benar',
            'nilai_sdq20' => 2,
            'pernyataansdq21' => 'Tidak Benar',
            'nilai_sdq21' => 0,
            'pernyataansdq22' => 'Tidak Benar',
            'nilai_sdq22' => 0,
            'pernyataansdq23' => 'Selalu Benar',
            'nilai_sdq23' => 2,
            'pernyataansdq24' => 'Selalu Benar',
            'nilai_sdq24' => 2,
            'pernyataansdq25' => 'Tidak Benar',
            'nilai_sdq25' => 0,
            'nilai_total_sdq' => 20,
            'gejala_emosional' => 'Ambang/Boderline',
            'nilai_gejala_emosional' => 4,
            'masalah_perilaku' => 'Ambang/Boderline',
            'nilai_masalah_perilaku' => 2,
            'hiperaktivitas' => 'Ambang/Boderline',
            'nilai_hiperaktivitas' => 2,
            'teman_sebaya' => 'Ambang/Boderline',
            'nilai_teman_sebaya' => 2,
            'kekuatan' => 'Normal',
            'nilai_kekuatan' => 10,
            'kesulitan' => 'Ambang/Boderline',
            'nilai_kesulitan' => 10,
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}