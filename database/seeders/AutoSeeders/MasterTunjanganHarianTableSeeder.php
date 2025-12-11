<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTunjanganHarianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_tunjangan_harian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_tunjangan_harian')->insert(array (
          0 => 
          array (
            'id' => 1,
            'nama' => 'Tunjangan Makan',
            'tnj' => 20000.0,
          ),
          1 => 
          array (
            'id' => 2,
            'nama' => 'BENSIN KARYAWAN',
            'tnj' => 5000.0,
          ),
          2 => 
          array (
            'id' => 3,
            'nama' => 'TUNJANGAN TRANSPORTASI',
            'tnj' => 20000.0,
          ),
          3 => 
          array (
            'id' => 4,
            'nama' => 'UANG DUDUK DOKTER JAGA UMUM',
            'tnj' => 50000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}