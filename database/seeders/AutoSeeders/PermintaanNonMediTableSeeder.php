<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanNonMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_non_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_non_medis')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PN240904001',
            'ruang' => 'tes',
            'nip' => '010101',
            'tanggal' => '2024-09-04',
            'status' => 'Disetujui',
          ),
          1 => 
          array (
            'no_permintaan' => 'PN240904002',
            'ruang' => 'RUANGAN IGD',
            'nip' => 'D0000004',
            'tanggal' => '2024-09-04',
            'status' => 'Disetujui',
          ),
          2 => 
          array (
            'no_permintaan' => 'PN240930001',
            'ruang' => 'IGD',
            'nip' => '010101',
            'tanggal' => '2024-09-30',
            'status' => 'Disetujui',
          ),
          3 => 
          array (
            'no_permintaan' => 'PN241011001',
            'ruang' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2024-10-11',
            'status' => 'Disetujui',
          ),
          4 => 
          array (
            'no_permintaan' => 'PN241011002',
            'ruang' => 'igd',
            'nip' => 'D0000003',
            'tanggal' => '2024-10-11',
            'status' => 'Disetujui',
          ),
          5 => 
          array (
            'no_permintaan' => 'PN241030001',
            'ruang' => '-',
            'nip' => 'D0000004',
            'tanggal' => '2024-10-30',
            'status' => 'Disetujui',
          ),
          6 => 
          array (
            'no_permintaan' => 'PN250619001',
            'ruang' => 'RUANG TERATAI',
            'nip' => 'D0000004',
            'tanggal' => '2025-06-19',
            'status' => 'Disetujui',
          ),
          7 => 
          array (
            'no_permintaan' => 'PN250630001',
            'ruang' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2025-06-30',
            'status' => 'Disetujui',
          ),
          8 => 
          array (
            'no_permintaan' => 'PN250813001',
            'ruang' => 'RUANGAN IGD',
            'nip' => 'D0000004',
            'tanggal' => '2025-08-13',
            'status' => 'Disetujui',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}