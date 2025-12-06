<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatMappingRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_radiologi')->insert(array (
          0 => 
          array (
            'kd_jenis_prw' => 'ICU-01',
            'code' => 'LP7630-9',
            'system' => 'http://loinc.org ',
            'display' => 'Thorax',
            'sampel_code' => '51185008',
            'sampel_system' => 'http://snomed.info/sct',
            'sampel_display' => 'Thorax, chest, or thoracic structure',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}