<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratLemariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_lemari')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_lemari')->insert(array (
          0 => 
          array (
            'kd' => 'SA001',
            'lemari' => 'ALMARI 1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}