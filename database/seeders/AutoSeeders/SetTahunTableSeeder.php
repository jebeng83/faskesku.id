<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetTahunTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_tahun')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_tahun')->insert(array (
          0 => 
          array (
            'tahun' => '2025',
            'bulan' => 5,
            'jmlhr' => 31,
            'jmllbr' => 4,
            'normal' => 27,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}