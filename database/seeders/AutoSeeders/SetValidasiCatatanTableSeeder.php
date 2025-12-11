<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetValidasiCatatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_validasi_catatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_validasi_catatan')->insert(array (
          0 => 
          array (
            'tampilkan_catatan' => 'Yes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}