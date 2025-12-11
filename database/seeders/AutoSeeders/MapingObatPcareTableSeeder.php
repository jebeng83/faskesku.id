<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MapingObatPcareTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('maping_obat_pcare')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('maping_obat_pcare')->insert(array (
          0 => 
          array (
            'kode_brng' => '2018001',
            'kode_brng_pcare' => '130103592',
            'nama_brng_pcare' => 'Zyfort 3 ml Nove amp',
          ),
          1 => 
          array (
            'kode_brng' => 'B000000134',
            'kode_brng_pcare' => '130102089',
            'nama_brng_pcare' => 'Vitamin - B Complex komb Mari tab',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}