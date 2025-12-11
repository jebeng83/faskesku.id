<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BuktiPersetujuanTransferPasienAntarRuangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bukti_persetujuan_transfer_pasien_antar_ruang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bukti_persetujuan_transfer_pasien_antar_ruang')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal_masuk' => '2025-08-19 13:43:19',
            'photo' => 'pages/upload/2025081900000220250819134319.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}