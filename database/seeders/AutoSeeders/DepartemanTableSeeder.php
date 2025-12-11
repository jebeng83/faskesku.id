<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DepartemanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('departemen')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('departemen')->insert(array (
          0 => 
          array (
            'dep_id' => '-',
            'nama' => '-',
          ),
          1 => 
          array (
            'dep_id' => 'IT',
            'nama' => 'Bagian IT/Programer/EDP',
          ),
          2 => 
          array (
            'dep_id' => 'DIR',
            'nama' => 'DIREKSI',
          ),
          3 => 
          array (
            'dep_id' => 'DOK',
            'nama' => 'DOKTER',
          ),
          4 => 
          array (
            'dep_id' => 'IGD',
            'nama' => 'instalasi gawat darurat',
          ),
          5 => 
          array (
            'dep_id' => 'MEN',
            'nama' => 'MENEJEMEN',
          ),
          6 => 
          array (
            'dep_id' => 'PNM',
            'nama' => 'PENUNJANG MEDIS',
          ),
          7 => 
          array (
            'dep_id' => 'RNAP',
            'nama' => 'Rawat Inap',
          ),
          8 => 
          array (
            'dep_id' => 'RJ',
            'nama' => 'RAWAT JALAN',
          ),
          9 => 
          array (
            'dep_id' => 'OK',
            'nama' => 'RUANG OK',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}