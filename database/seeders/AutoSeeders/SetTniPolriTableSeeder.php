<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetTniPolriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_tni_polri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_tni_polri')->insert(array (
          0 => 
          array (
            'tampilkan_tni_polri' => 'No',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}