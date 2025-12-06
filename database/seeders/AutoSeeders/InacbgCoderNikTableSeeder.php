<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InacbgCoderNikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inacbg_coder_nik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inacbg_coder_nik')->insert(array (
          0 => 
          array (
            'nik' => 'D0000004',
            'no_ik' => '123123123123',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}