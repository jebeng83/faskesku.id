<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AntriloketcetakTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('antriloketcetak')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('antriloketcetak')->insert(array (
          0 => 
          array (
            'tanggal' => '2024-11-25',
            'jam' => '08:42:45',
            'nomor' => '001',
          ),
          1 => 
          array (
            'tanggal' => '2025-01-07',
            'jam' => '10:02:03',
            'nomor' => '001',
          ),
          2 => 
          array (
            'tanggal' => '2025-06-30',
            'jam' => '08:44:42',
            'nomor' => '001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}