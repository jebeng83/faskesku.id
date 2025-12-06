<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ParkirBarcodeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('parkir_barcode')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('parkir_barcode')->insert(array (
          0 => 
          array (
            'kode_barcode' => '1212',
            'nomer_kartu' => 'K0001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}