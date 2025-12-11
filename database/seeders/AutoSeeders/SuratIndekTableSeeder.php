<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratIndekTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_indeks')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_indeks')->insert(array (
          0 => 
          array (
            'kd' => 'SI001',
            'indeks' => 'A',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}