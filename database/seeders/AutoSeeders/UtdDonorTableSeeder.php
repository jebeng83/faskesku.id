<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdDonorTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_donor')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_donor')->insert(array (
          0 => 
          array (
            'no_donor' => '2024/01/UTD0001',
            'no_pendonor' => 'UTD000001',
            'tanggal' => '2024-01-13',
            'dinas' => 'Pagi',
            'tensi' => '120/90',
            'no_bag' => 123,
            'jenis_bag' => 'SB',
            'jenis_donor' => 'DB',
            'tempat_aftap' => 'Dalam Gedung',
            'petugas_aftap' => '12/09/1988/001',
            'hbsag' => 'Negatif',
            'hcv' => 'Negatif',
            'hiv' => 'Negatif',
            'spilis' => 'Negatif',
            'malaria' => 'Negatif',
            'petugas_u_saring' => '123124',
            'status' => 'Cekal',
          ),
          1 => 
          array (
            'no_donor' => '2024/11/UTD0001',
            'no_pendonor' => 'UTD000001',
            'tanggal' => '2024-11-19',
            'dinas' => 'Pagi',
            'tensi' => '1212',
            'no_bag' => 123,
            'jenis_bag' => 'SB',
            'jenis_donor' => 'DB',
            'tempat_aftap' => 'Dalam Gedung',
            'petugas_aftap' => '123124',
            'hbsag' => 'Positif',
            'hcv' => 'Negatif',
            'hiv' => 'Positif',
            'spilis' => 'Positif',
            'malaria' => 'Positif',
            'petugas_u_saring' => '12/09/1988/001',
            'status' => 'Aman',
          ),
          2 => 
          array (
            'no_donor' => '2025/06/UTD0001',
            'no_pendonor' => 'UTD000001',
            'tanggal' => '2025-06-19',
            'dinas' => 'Pagi',
            'tensi' => '127/90',
            'no_bag' => 45,
            'jenis_bag' => 'SB',
            'jenis_donor' => 'DB',
            'tempat_aftap' => 'Dalam Gedung',
            'petugas_aftap' => '123124',
            'hbsag' => 'Negatif',
            'hcv' => 'Negatif',
            'hiv' => 'Negatif',
            'spilis' => 'Negatif',
            'malaria' => 'Negatif',
            'petugas_u_saring' => '156798',
            'status' => 'Aman',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}