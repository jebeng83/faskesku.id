<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EmergencyIndexTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('emergency_index')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('emergency_index')->insert(array (
          0 => 
          array (
            'kode_emergency' => '-',
            'nama_emergency' => '-',
            'indek' => 0,
          ),
          1 => 
          array (
            'kode_emergency' => 'I',
            'nama_emergency' => 'GRADE II',
            'indek' => 1,
          ),
          2 => 
          array (
            'kode_emergency' => 'II',
            'nama_emergency' => 'GRADE II',
            'indek' => 3,
          ),
          3 => 
          array (
            'kode_emergency' => 'III',
            'nama_emergency' => 'GRADE III (IGD, IKO, VK, HCU, PERINATOLOGI)',
            'indek' => 9,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}