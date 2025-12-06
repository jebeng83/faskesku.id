<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanDendaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_denda')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_denda')->insert(array (
          0 => 
          array (
            'kode_denda' => 'JD001',
            'jenis_denda' => 'HILANG',
            'besar_denda' => 100.0,
          ),
          1 => 
          array (
            'kode_denda' => 'JD002',
            'jenis_denda' => 'RUSAK',
            'besar_denda' => 50.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}