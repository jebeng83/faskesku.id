<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class NotaInapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('nota_inap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('nota_inap')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'no_nota' => '2025/08/26/RI0001',
            'tanggal' => '2025-08-26',
            'jam' => '09:48:49',
            'Uang_Muka' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}