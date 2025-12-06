<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeslingLimbahB3medisCairTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kesling_limbah_b3medis_cair')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kesling_limbah_b3medis_cair')->insert(array (
          0 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-06-30 14:12:49',
            'jmllimbah' => 900.0,
            'tujuan_penyerahan' => 'II',
            'bukti_dokumen' => 'LLKLK',
            'sisa_di_tps' => 0.0,
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}