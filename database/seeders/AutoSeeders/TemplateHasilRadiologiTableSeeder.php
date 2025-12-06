<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemplateHasilRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('template_hasil_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('template_hasil_radiologi')->insert(array (
          0 => 
          array (
            'no_template' => 'R0001',
            'nama_pemeriksaan' => 'tes template',
            'template_hasil_radiologi' => 'tes 1
        
        tes 2
        
        tes 3',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}