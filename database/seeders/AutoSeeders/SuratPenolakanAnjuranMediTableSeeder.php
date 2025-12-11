<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratPenolakanAnjuranMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_penolakan_anjuran_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_penolakan_anjuran_medis')->insert(array (
          0 => 
          array (
            'no_surat' => 'PAM20250729001',
            'no_rawat' => '2025/07/29/000001',
            'tanggal' => '2025-07-29 14:24:39',
            'hubungan' => 'Suami',
            'nama_pj' => '-',
            'umur_pj' => '-',
            'no_ktppj' => '-',
            'jkpj' => 'L',
            'no_telp' => '-',
            'kode_penolakan' => '003',
            'alasan_penolakan' => '-',
            'informasi_risiko_penolakan' => '-',
            'nik' => 'D0000003',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}