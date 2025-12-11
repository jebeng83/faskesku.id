<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_dapur')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PD240930001',
            'ruang' => '-',
            'nip' => 'D0000004',
            'tanggal' => '2024-09-30',
            'status' => 'Disetujui',
          ),
          1 => 
          array (
            'no_permintaan' => 'PD250804001',
            'ruang' => 'IGD',
            'nip' => 'D0000003',
            'tanggal' => '2025-08-04',
            'status' => 'Disetujui',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}