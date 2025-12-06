<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GolonganTniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('golongan_tni')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('golongan_tni')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama_golongan' => 'TNI AU',
          ),
          1 => 
          array (
            'id' => 2,
            'nama_golongan' => 'TNI AL',
          ),
          2 => 
          array (
            'id' => 3,
            'nama_golongan' => 'TNI AD',
          ),
          3 => 
          array (
            'id' => 4,
            'nama_golongan' => 'Purnawirawan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}