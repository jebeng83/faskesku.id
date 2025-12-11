<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TokosuplierTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tokosuplier')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tokosuplier')->insert(array (
          0 => 
          array (
            'kode_suplier' => 'S0001',
            'nama_suplier' => 'Tes Toko',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}