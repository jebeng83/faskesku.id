<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapursuplierTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapursuplier')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapursuplier')->insert(array (
          0 => 
          array (
            'kode_suplier' => 'S0001',
            'nama_suplier' => 'SUPLIER DAPUR',
            'alamat' => 'JL. MAJU MUNDUR',
            'kota' => 'YOGAKARTA',
            'no_telp' => '0',
            'nama_bank' => 'BNAK BRI',
            'rekening' => '01010101010101',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}