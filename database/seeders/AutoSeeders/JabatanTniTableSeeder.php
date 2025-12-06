<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JabatanTniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jabatan_tni')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jabatan_tni')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_jabatan' => 'DANRIM',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_jabatan' => 'DANRIM2',
          ),
          2 => 
          array (
            'id' => 4,
            'nama_jabatan' => 'DANRIM3',
          ),
          3 => 
          array (
            'id' => 5,
            'nama_jabatan' => 'Perwira',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}