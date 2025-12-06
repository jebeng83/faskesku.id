<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterKesimpulanAnjuranMcuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_kesimpulan_anjuran_mcu')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_kesimpulan_anjuran_mcu')->insert(array (
          0 => 
          array (
            'kesimpulan' => '1',
            'anjuran' => '2',
          ),
          1 => 
          array (
            'kesimpulan' => 'tes',
            'anjuran' => 'lanjut',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}