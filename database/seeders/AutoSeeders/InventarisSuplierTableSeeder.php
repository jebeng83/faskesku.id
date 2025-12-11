<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisSuplierTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_suplier')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_suplier')->insert(array (
          0 => 
          array (
            'kode_suplier' => 'S0001',
            'nama_suplier' => 'tes inventaris',
            'alamat' => 'tes',
            'kota' => '-',
            'no_telp' => '0',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}