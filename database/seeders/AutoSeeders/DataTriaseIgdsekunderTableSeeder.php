<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DataTriaseIgdsekunderTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igdsekunder')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igdsekunder')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/09/000002',
            'anamnesa_singkat' => '-',
            'catatan' => '-',
            'plan' => 'Zona Hijau',
            'tanggaltriase' => '2025-08-05 11:22:35',
            'nik' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}