<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratRuangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_ruang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_ruang')->insert(array (
          0 => 
          array (
            'kd' => 'SG001',
            'ruang' => 'IBU DIREKTUR',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}