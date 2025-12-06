<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetEmbalaseTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_embalase')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_embalase')->insert(array (
          0 => 
          array (
            'embalase_per_obat' => 500.0,
            'tuslah_per_obat' => 500.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}