<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RawatjalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rawatjalan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rawatjalan')->insert(array (
          0 => 
          array (
            'tgl' => '2022-08-01 00:00:00',
            'id' => 112,
            'tnd' => 10,
            'jm' => 200000.0,
            'nm_pasien' => '-',
            'kamar' => '-',
            'diagnosa' => '-',
            'jmlh' => 2,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}