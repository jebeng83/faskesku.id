<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengajuanBarangDapurTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_barang_dapur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_barang_dapur')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PBD20241117001',
            'nip' => 'D0000003',
            'tanggal' => '2024-11-17',
            'status' => 'Proses Pengajuan',
            'keterangan' => 'tes',
          ),
          1 => 
          array (
            'no_pengajuan' => 'PBD20241122001',
            'nip' => '010101',
            'tanggal' => '2024-11-22',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          2 => 
          array (
            'no_pengajuan' => 'PBD20241126001',
            'nip' => '08998998',
            'tanggal' => '2024-11-26',
            'status' => 'Disetujui',
            'keterangan' => 'TES',
          ),
          3 => 
          array (
            'no_pengajuan' => 'PBD20250211001',
            'nip' => 'D0000004',
            'tanggal' => '2025-02-11',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          4 => 
          array (
            'no_pengajuan' => 'PBD20250804001',
            'nip' => '156798',
            'tanggal' => '2025-08-04',
            'status' => 'Disetujui',
            'keterangan' => 'cito',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}