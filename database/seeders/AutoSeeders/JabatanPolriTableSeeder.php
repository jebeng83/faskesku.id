<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JabatanPolriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jabatan_polri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jabatan_polri')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_jabatan' => 'KAPOLSEK',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_jabatan' => 'KAPOLDA',
          ),
          2 => 
          array (
            'id' => 3,
            'nama_jabatan' => 'KAPOLRES',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}