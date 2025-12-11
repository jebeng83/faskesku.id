<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatMedicationTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_medication')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_medication')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B000000556',
            'id_medication' => '919191919191',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}