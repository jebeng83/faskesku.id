<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TindakanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tindakan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tindakan')->insert(array (
          0 => 
          array (
            'tgl' => '2022-05-01 00:00:00',
            'id' => 112,
            'tnd' => 4,
            'jm' => 50000.0,
            'nm_pasien' => '-',
            'kamar' => '-',
            'diagnosa' => '-',
            'jmlh' => 5,
          ),
          1 => 
          array (
            'tgl' => '2022-08-01 00:00:00',
            'id' => 112,
            'tnd' => 10,
            'jm' => 1000000.0,
            'nm_pasien' => 'Paijo',
            'kamar' => '',
            'diagnosa' => '-',
            'jmlh' => 10,
          ),
          2 => 
          array (
            'tgl' => '2022-08-01 00:00:00',
            'id' => 116,
            'tnd' => 9,
            'jm' => 1000000.0,
            'nm_pasien' => '-',
            'kamar' => '-',
            'diagnosa' => '-',
            'jmlh' => 10,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}