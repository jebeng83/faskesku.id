<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MapingPoliBpjTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('maping_poli_bpjs')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('maping_poli_bpjs')->insert(array (
          0 => 
          array (
            'kd_poli_rs' => 'IGDK',
            'kd_poli_bpjs' => 'IGD',
            'nm_poli_bpjs' => 'INSTALASI GAWAT DARURAT',
          ),
          1 => 
          array (
            'kd_poli_rs' => 'INT',
            'kd_poli_bpjs' => 'INT',
            'nm_poli_bpjs' => 'PENYAKIT DALAM',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}