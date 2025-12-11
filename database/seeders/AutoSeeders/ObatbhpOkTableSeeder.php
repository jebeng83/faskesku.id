<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ObatbhpOkTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('obatbhp_ok')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('obatbhp_ok')->insert(array (
          0 => 
          array (
            'kd_obat' => 'OK00000001',
            'nm_obat' => 'KASA 200 CM',
            'kode_sat' => 'CM',
            'hargasatuan' => 200000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}