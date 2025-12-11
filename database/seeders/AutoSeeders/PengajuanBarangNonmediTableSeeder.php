<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengajuanBarangNonmediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_barang_nonmedis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_barang_nonmedis')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PBNM20250123001',
            'nip' => '08998998',
            'tanggal' => '2025-01-23',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          1 => 
          array (
            'no_pengajuan' => 'PBNM20250130001',
            'nip' => '08998998',
            'tanggal' => '2025-01-30',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          2 => 
          array (
            'no_pengajuan' => 'PBNM20250619001',
            'nip' => 'D0000004',
            'tanggal' => '2025-06-19',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          3 => 
          array (
            'no_pengajuan' => 'PBNM20250813001',
            'nip' => '123124',
            'tanggal' => '2025-08-13',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}