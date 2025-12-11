<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanRuangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_ruang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_ruang')->insert(array (
          0 => 
          array (
            'kd_ruang' => 'RP001',
            'nm_ruang' => 'RUANG PERPUSTAKAAN',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}