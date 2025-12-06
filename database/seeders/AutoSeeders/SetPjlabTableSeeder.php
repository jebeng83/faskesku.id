<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetPjlabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_pjlab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_pjlab')->insert(array (
          0 => 
          array (
            'kd_dokterlab' => 'D0000002',
            'kd_dokterrad' => 'D0000004',
            'kd_dokterhemodialisa' => 'D0000003',
            'kd_dokterutd' => 'D0000002',
            'kd_dokterlabpa' => 'D0000004',
            'kd_dokterlabmb' => 'D0000003',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}