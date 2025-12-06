<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratBalaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_balas')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_balas')->insert(array (
          0 => 
          array (
            'kd' => 'SB001',
            'balas' => 'SUDAH DIBALAS',
          ),
          1 => 
          array (
            'kd' => 'SB002',
            'balas' => 'BELUM DIBALAS',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}