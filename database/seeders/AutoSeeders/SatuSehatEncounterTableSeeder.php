<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatEncounterTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_encounter')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_encounter')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/11/07/000001',
            'id_encounter' => 'f1881bf5-dbac-401d-bb90-e65f4aa1e3cb',
            'id_encounter_2' => NULL,
          ),
          1 => 
          array (
            'no_rawat' => '2025/11/07/000002',
            'id_encounter' => '6c39dd36-5db8-4840-a4f4-5ac42da2825e',
            'id_encounter_2' => NULL,
          ),
          2 => 
          array (
            'no_rawat' => '2025/11/09/000002',
            'id_encounter' => 'd3ac4044-1456-431d-8434-ed7d702eee58',
            'id_encounter_2' => NULL,
          ),
          3 => 
          array (
            'no_rawat' => '2025/11/09/000003',
            'id_encounter' => '96b13b14-b0bf-4b59-9ed6-375bb536d64a',
            'id_encounter_2' => NULL,
          ),
          4 => 
          array (
            'no_rawat' => '2025/11/13/000001',
            'id_encounter' => '03852351-0152-4462-a04d-f0cefdca67c7',
            'id_encounter_2' => '03852351-0152-4462-a04d-f0cefdca67c7',
          ),
          5 => 
          array (
            'no_rawat' => '2025/11/15/000001',
            'id_encounter' => '04753a50-214a-445f-b4c3-17d0c2a1c42d',
            'id_encounter_2' => '04753a50-214a-445f-b4c3-17d0c2a1c42d',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}