<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdCekalDarahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_cekal_darah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_cekal_darah')->insert(array (
          0 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'tanggal' => '2024-11-19',
            'dinas' => 'Pagi',
            'petugas_pemusnahan' => '123124',
            'keterangan' => 'THALASEMIA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}