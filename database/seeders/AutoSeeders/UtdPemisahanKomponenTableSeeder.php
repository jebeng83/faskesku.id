<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdPemisahanKomponenTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_pemisahan_komponen')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_pemisahan_komponen')->insert(array (
          0 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'tanggal' => '2024-01-13',
            'dinas' => 'Pagi',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_donor' => '2024/11/UTD0001',
            'tanggal' => '2024-11-19',
            'dinas' => 'Pagi',
            'nip' => '123124',
          ),
          2 => 
          array (
            'no_donor' => '2025/06/UTD0001',
            'tanggal' => '2025-06-19',
            'dinas' => 'Pagi',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}