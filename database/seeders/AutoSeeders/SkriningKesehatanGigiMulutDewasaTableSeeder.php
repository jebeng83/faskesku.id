<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkriningKesehatanGigiMulutDewasaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skrining_kesehatan_gigi_mulut_dewasa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skrining_kesehatan_gigi_mulut_dewasa')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000002',
            'tanggal' => '2025-04-27 08:31:29',
            'kontrol_gigi' => 'Tidak',
            'gigi_bungsu_tumbuh' => 'Tidak',
            'gigi_hilang' => 'Tidak',
            'gigi_berlubang' => 'Tidak',
            'hasil_skrining' => 'Perlu Dirujuk ke Poli Gigi',
            'keterangan' => '-',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}