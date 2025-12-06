<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProsedurPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('prosedur_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('prosedur_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'kode' => '00.03',
            'status' => 'Ralan',
            'prioritas' => 1,
          ),
          1 => 
          array (
            'no_rawat' => '2025/05/26/000002',
            'kode' => '00.03',
            'status' => 'Ralan',
            'prioritas' => 1,
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/03/000003',
            'kode' => '00.02',
            'status' => 'Ralan',
            'prioritas' => 1,
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'kode' => '00.02',
            'status' => 'Ralan',
            'prioritas' => 1,
          ),
          4 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode' => '00.02',
            'status' => 'Ralan',
            'prioritas' => 1,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}