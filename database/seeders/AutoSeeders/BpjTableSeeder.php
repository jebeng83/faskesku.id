<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BpjTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bpjs')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bpjs')->insert(array (
          0 => 
          array (
            'stts' => '-',
            'biaya' => 0.0,
          ),
          1 => 
          array (
            'stts' => 'Y',
            'biaya' => 50000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}