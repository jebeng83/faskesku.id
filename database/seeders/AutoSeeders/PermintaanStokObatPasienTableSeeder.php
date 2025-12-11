<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanStokObatPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_stok_obat_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_stok_obat_pasien')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'SP202506180001',
            'tgl_permintaan' => '2025-06-18',
            'jam' => '13:56:01',
            'no_rawat' => '2025/06/18/000001',
            'kd_dokter' => 'D0000004',
            'status' => 'Sudah',
            'tgl_validasi' => '2025-06-18',
            'jam_validasi' => '13:56:24',
          ),
          1 => 
          array (
            'no_permintaan' => 'SP202506230001',
            'tgl_permintaan' => '2025-06-23',
            'jam' => '13:52:06',
            'no_rawat' => '2025/06/20/000002',
            'kd_dokter' => 'D0000004',
            'status' => 'Sudah',
            'tgl_validasi' => '2025-06-23',
            'jam_validasi' => '13:52:31',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}