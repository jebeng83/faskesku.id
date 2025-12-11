<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IndekrefTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('indekref')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('indekref')->insert(array (
          0 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
          1 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 68.0,
          ),
          2 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 45.0,
          ),
          3 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
          4 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
          5 => 
          array (
            'kdindex' => 'IT',
            'n' => 0.0,
            'ttl' => 24.0,
          ),
          6 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
          7 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
          8 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
          9 => 
          array (
            'kdindex' => '-',
            'n' => 0.0,
            'ttl' => 14.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}