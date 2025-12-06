<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratsakitTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('suratsakit')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('suratsakit')->insert(array (
          0 => 
          array (
            'no_surat' => 'SKS20250618001',
            'no_rawat' => '2025/06/18/000001',
            'tanggalawal' => '2025-06-18',
            'tanggalakhir' => '2025-06-18',
            'lamasakit' => '1 (Satu)',
          ),
          1 => 
          array (
            'no_surat' => 'SKS20250623001',
            'no_rawat' => '2025/06/20/000002',
            'tanggalawal' => '2025-06-23',
            'tanggalakhir' => '2025-06-23',
            'lamasakit' => '1 (Satu)',
          ),
          2 => 
          array (
            'no_surat' => 'SKS20250630001',
            'no_rawat' => '2025/06/18/000001',
            'tanggalawal' => '2025-06-30',
            'tanggalakhir' => '2025-06-30',
            'lamasakit' => '1 (Satu)',
          ),
          3 => 
          array (
            'no_surat' => 'SKS20250630002',
            'no_rawat' => '2025/06/30/000004',
            'tanggalawal' => '2025-06-30',
            'tanggalakhir' => '2025-06-30',
            'lamasakit' => '1 (Satu)',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}