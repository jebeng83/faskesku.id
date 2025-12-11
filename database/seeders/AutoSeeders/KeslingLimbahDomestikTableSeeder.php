<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeslingLimbahDomestikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kesling_limbah_domestik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kesling_limbah_domestik')->insert(array (
          0 => 
          array (
            'nip' => '12/09/1988/001',
            'tanggal' => '2024-11-26 11:22:35',
            'jumlahlimbah' => 10.0,
            'tanggalangkut' => '2024-11-26 11:22:35',
            'keterangan' => 'tes',
          ),
          1 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-03-26 12:20:01',
            'jumlahlimbah' => 10.0,
            'tanggalangkut' => '2025-03-26 12:20:01',
            'keterangan' => 'tes',
          ),
          2 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-06-30 14:13:10',
            'jumlahlimbah' => 45.0,
            'tanggalangkut' => '2025-06-30 14:13:10',
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}