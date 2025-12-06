<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenyakitPd3iTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penyakit_pd3i')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penyakit_pd3i')->insert(array (
          0 => 
          array (
            'kd_penyakit' => 'A00',
          ),
          1 => 
          array (
            'kd_penyakit' => 'J01',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}