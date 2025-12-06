<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenguranganBiayaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengurangan_biaya')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengurangan_biaya')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'nama_pengurangan' => 'TES POTONGAN',
            'besar_pengurangan' => 30000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}