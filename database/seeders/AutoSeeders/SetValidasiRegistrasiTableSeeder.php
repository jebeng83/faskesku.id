<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetValidasiRegistrasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_validasi_registrasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_validasi_registrasi')->insert(array (
          0 => 
          array (
            'wajib_closing_kasir' => 'No',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}