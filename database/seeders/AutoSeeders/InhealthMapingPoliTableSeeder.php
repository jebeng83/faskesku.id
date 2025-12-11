<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InhealthMapingPoliTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inhealth_maping_poli')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inhealth_maping_poli')->insert(array (
          0 => 
          array (
            'kd_poli_rs' => 'ANA',
            'kd_poli_inhealth' => 'ANA',
            'nm_poli_inhealth' => 'POLI ANAK',
          ),
          1 => 
          array (
            'kd_poli_rs' => 'U0005',
            'kd_poli_inhealth' => 'MAT',
            'nm_poli_inhealth' => 'MATA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}