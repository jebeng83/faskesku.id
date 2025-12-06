<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanDetailPermintaanLabmbTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_detail_permintaan_labmb')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_detail_permintaan_labmb')->insert(array (
          0 => 
          array (
            'noorder' => 'MB202508050001',
            'kd_jenis_prw' => 'J000108',
            'id_template' => 3262,
            'stts_bayar' => 'Belum',
          ),
          1 => 
          array (
            'noorder' => 'MB202508050002',
            'kd_jenis_prw' => 'J000108',
            'id_template' => 3262,
            'stts_bayar' => 'Belum',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}