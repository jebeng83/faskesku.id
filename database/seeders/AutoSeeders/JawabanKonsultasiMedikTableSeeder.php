<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JawabanKonsultasiMedikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jawaban_konsultasi_medik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jawaban_konsultasi_medik')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'KM202504280001',
            'tanggal' => '2025-04-28 14:17:02',
            'diagnosa_kerja' => 'qwqw',
            'uraian_jawaban' => 'qwqwqw',
          ),
          1 => 
          array (
            'no_permintaan' => 'KM202505260001',
            'tanggal' => '2025-05-26 11:45:31',
            'diagnosa_kerja' => 'tes',
            'uraian_jawaban' => 'res',
          ),
          2 => 
          array (
            'no_permintaan' => 'KM202505260002',
            'tanggal' => '2025-05-26 15:10:09',
            'diagnosa_kerja' => 'tes',
            'uraian_jawaban' => 'ok',
          ),
          3 => 
          array (
            'no_permintaan' => 'KM202506230001',
            'tanggal' => '2025-06-23 11:29:11',
            'diagnosa_kerja' => 'tes',
            'uraian_jawaban' => 'ok',
          ),
          4 => 
          array (
            'no_permintaan' => 'KM202506280001',
            'tanggal' => '2025-06-28 10:02:16',
            'diagnosa_kerja' => 'tes',
            'uraian_jawaban' => 'tes',
          ),
          5 => 
          array (
            'no_permintaan' => 'KM202506300001',
            'tanggal' => '2025-06-30 11:41:53',
            'diagnosa_kerja' => 'tes',
            'uraian_jawaban' => 'ok',
          ),
          6 => 
          array (
            'no_permintaan' => 'KM202508040001',
            'tanggal' => '2025-08-04 11:08:49',
            'diagnosa_kerja' => '1212',
            'uraian_jawaban' => '21212',
          ),
          7 => 
          array (
            'no_permintaan' => 'KM202508050001',
            'tanggal' => '2025-08-05 14:06:33',
            'diagnosa_kerja' => 'sasas',
            'uraian_jawaban' => 'asas',
          ),
          8 => 
          array (
            'no_permintaan' => 'KM202508130001',
            'tanggal' => '2025-08-13 16:02:13',
            'diagnosa_kerja' => '1212',
            'uraian_jawaban' => '1212',
          ),
          9 => 
          array (
            'no_permintaan' => 'KM202508190001',
            'tanggal' => '2025-08-19 13:29:42',
            'diagnosa_kerja' => 'tes',
            'uraian_jawaban' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}