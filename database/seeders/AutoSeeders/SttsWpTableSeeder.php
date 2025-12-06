<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SttsWpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('stts_wp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('stts_wp')->insert(array (
          0 => 
          array (
            'stts' => '-',
            'ktg' => '-',
          ),
          1 => 
          array (
            'stts' => 'K/0',
            'ktg' => 'WP Kawin',
          ),
          2 => 
          array (
            'stts' => 'K/1',
            'ktg' => 'Tambahan WP Kawin dg. 1 anak',
          ),
          3 => 
          array (
            'stts' => 'K/2',
            'ktg' => 'Tambahan WP Kawin dg. 2 anak',
          ),
          4 => 
          array (
            'stts' => 'K/3',
            'ktg' => 'Tambahan WP Kawin dg. 3 anak',
          ),
          5 => 
          array (
            'stts' => 'mum',
            'ktg' => 'mum',
          ),
          6 => 
          array (
            'stts' => 'TK/0',
            'ktg' => 'WP Tidak Kawin',
          ),
          7 => 
          array (
            'stts' => 'TK/1',
            'ktg' => 'WP Tidak  Kawin dg. 1 Tanggungan',
          ),
          8 => 
          array (
            'stts' => 'TK/2',
            'ktg' => 'WP Tidak  Kawin dg. 2 Tanggungan',
          ),
          9 => 
          array (
            'stts' => 'TK/3',
            'ktg' => 'WP Tidak  Kawin dg. 3 Tanggungan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}