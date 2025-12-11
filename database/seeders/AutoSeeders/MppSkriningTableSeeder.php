<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MppSkriningTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('mpp_skrining')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('mpp_skrining')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-05-26',
            'param1' => 'Ya',
            'param2' => 'Tidak',
            'param3' => 'Tidak',
            'param4' => 'Tidak',
            'param5' => 'Tidak',
            'param6' => 'Tidak',
            'param7' => 'Tidak',
            'param8' => 'Tidak',
            'param9' => 'Tidak',
            'param10' => 'Tidak',
            'param11' => 'Tidak',
            'param12' => 'Tidak',
            'param13' => 'Tidak',
            'param14' => 'Tidak',
            'param15' => 'Tidak',
            'param16' => 'Tidak',
            'nip' => 'D0000004',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-08-06',
            'param1' => 'Ya',
            'param2' => 'Tidak',
            'param3' => 'Tidak',
            'param4' => 'Tidak',
            'param5' => 'Tidak',
            'param6' => 'Tidak',
            'param7' => 'Tidak',
            'param8' => 'Tidak',
            'param9' => 'Tidak',
            'param10' => 'Tidak',
            'param11' => 'Tidak',
            'param12' => 'Tidak',
            'param13' => 'Tidak',
            'param14' => 'Tidak',
            'param15' => 'Tidak',
            'param16' => 'Tidak',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}