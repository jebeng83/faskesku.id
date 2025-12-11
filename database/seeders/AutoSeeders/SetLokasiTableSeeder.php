<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetLokasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_lokasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_lokasi')->insert(array (
          0 => 
          array (
            'kd_bangsal' => 'AP',
            'asal_stok' => 'Gunakan Stok Utama Obat',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}