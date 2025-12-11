<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeanggotaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('keanggotaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('keanggotaan')->insert(array (
          0 => 
          array (
            'id' => 114,
            'koperasi' => '-',
            'jamsostek' => 'Y',
            'bpjs' => 'Y',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}