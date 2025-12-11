<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTunjanganBulananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_tunjangan_bulanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_tunjangan_bulanan')->insert(array (
          0 => 
          array (
            'id' => 2,
            'nama' => 'Tunjangan Profesi',
            'tnj' => 1000000.0,
          ),
          1 => 
          array (
            'id' => 3,
            'nama' => 'TUNJANGAN ANAK',
            'tnj' => 200000.0,
          ),
          2 => 
          array (
            'id' => 4,
            'nama' => 'TUNJANGAN PRESTASI KERJA',
            'tnj' => 300000.0,
          ),
          3 => 
          array (
            'id' => 5,
            'nama' => 'TUNJANGAN  JALAN-JALAN',
            'tnj' => 200000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}