<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RuangOkTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ruang_ok')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ruang_ok')->insert(array (
          0 => 
          array (
            'kd_ruang_ok' => '-',
            'nm_ruang_ok' => '-',
          ),
          1 => 
          array (
            'kd_ruang_ok' => 'O1',
            'nm_ruang_ok' => 'Ruang Operasi 1',
          ),
          2 => 
          array (
            'kd_ruang_ok' => 'O2',
            'nm_ruang_ok' => 'Ruang Operasi 2',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}