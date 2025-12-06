<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FollowUpDbdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('follow_up_dbd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('follow_up_dbd')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:47:40',
            'hemoglobin' => '1',
            'hematokrit' => '2',
            'leokosit' => '3',
            'trombosit' => '4',
            'terapi_cairan' => '5',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}