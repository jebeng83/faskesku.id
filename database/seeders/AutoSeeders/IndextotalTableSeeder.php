<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IndextotalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('indextotal')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('indextotal')->insert(array (
          0 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
          1 => 
          array (
            'kdindex' => '-',
            'ttl' => 68.0,
          ),
          2 => 
          array (
            'kdindex' => '-',
            'ttl' => 45.0,
          ),
          3 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
          4 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
          5 => 
          array (
            'kdindex' => 'IT',
            'ttl' => 24.0,
          ),
          6 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
          7 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
          8 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
          9 => 
          array (
            'kdindex' => '-',
            'ttl' => 14.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}