<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KetidakhadiranTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ketidakhadiran')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ketidakhadiran')->insert(array (
          0 => 
          array (
            'tgl' => '2022-05-01',
            'id' => 112,
            'jns' => 'A',
            'ktg' => 'tes',
            'jml' => 4,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}