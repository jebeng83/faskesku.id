<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemantauanPewsDewasaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemantauan_pews_dewasa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemantauan_pews_dewasa')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 09:01:55',
            'parameter_laju_respirasi' => '>= 35',
            'skor_laju_respirasi' => '7',
            'parameter_saturasi_oksigen' => '92 - 93',
            'skor_saturasi_oksigen' => '2',
            'parameter_suplemen_oksigen' => 'Tidak',
            'skor_suplemen_oksigen' => '0',
            'parameter_tekanan_darah_sistolik' => '111 - 180',
            'skor_tekanan_darah_sistolik' => '0',
            'parameter_laju_jantung' => '51 - 90',
            'skor_laju_jantung' => '0',
            'parameter_kesadaran' => 'Sadar',
            'skor_kesadaran' => '0',
            'parameter_temperatur' => '36.1 - 38',
            'skor_temperatur' => '0',
            'skor_total' => '9',
            'parameter_total' => 'Lakukan RJP oleh petugas/tim primer, aktivasi code blue henti jantung (...), respon Tim Medis Emergency (TME) segera, maksimal 5 menit, informasikan dan konsultasikan ke DPJP',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}