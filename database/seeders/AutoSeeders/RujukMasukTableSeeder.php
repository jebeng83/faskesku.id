<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RujukMasukTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rujuk_masuk')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rujuk_masuk')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/09/000001',
            'perujuk' => 'puskesmas balaraja',
            'alamat' => '-',
            'no_rujuk' => '-',
            'jm_perujuk' => 0.0,
            'dokter_perujuk' => '-',
            'kd_penyakit' => 'A01.2',
            'kategori_rujuk' => '-',
            'keterangan' => '-',
            'no_balasan' => 'BR/2025/06/19/0001',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'perujuk' => 'puskesmas candi',
            'alamat' => '-',
            'no_rujuk' => '-',
            'jm_perujuk' => 0.0,
            'dokter_perujuk' => '-',
            'kd_penyakit' => 'A01.4',
            'kategori_rujuk' => '-',
            'keterangan' => '-',
            'no_balasan' => 'BR/2025/06/19/0001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}