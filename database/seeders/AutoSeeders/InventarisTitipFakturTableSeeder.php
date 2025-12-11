<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisTitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TI20240607001',
            'tanggal' => '2024-06-07',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}