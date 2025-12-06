<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GolonganPolriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('golongan_polri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('golongan_polri')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_golongan' => 'Anggota POLRI',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_golongan' => 'PNS POLRI',
          ),
          2 => 
          array (
            'id' => 3,
            'nama_golongan' => 'Keluarga Anggota Polri',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}