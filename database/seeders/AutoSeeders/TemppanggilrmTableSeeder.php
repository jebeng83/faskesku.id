<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemppanggilrmTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('temppanggilrm')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('temppanggilrm')->insert(array (
          0 => 
          array (
            'no_rkm_medis' => '000001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}