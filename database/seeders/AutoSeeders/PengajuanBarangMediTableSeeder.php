<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengajuanBarangMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_barang_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_barang_medis')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PBM20241116001',
            'nip' => 'D0000003',
            'tanggal' => '2024-11-16',
            'status' => 'Disetujui',
            'keterangan' => 'qwqw',
          ),
          1 => 
          array (
            'no_pengajuan' => 'PBM20241119001',
            'nip' => '010101',
            'tanggal' => '2024-11-19',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          2 => 
          array (
            'no_pengajuan' => 'PBM20241121001',
            'nip' => '08998998',
            'tanggal' => '2024-11-21',
            'status' => 'Disetujui',
            'keterangan' => 'tes',
          ),
          3 => 
          array (
            'no_pengajuan' => 'PBM20241122001',
            'nip' => '010101',
            'tanggal' => '2024-11-22',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          4 => 
          array (
            'no_pengajuan' => 'PBM20241210001',
            'nip' => '08998998',
            'tanggal' => '2024-12-10',
            'status' => 'Disetujui',
            'keterangan' => 'untuk bulan januari',
          ),
          5 => 
          array (
            'no_pengajuan' => 'PBM20250107001',
            'nip' => '123124',
            'tanggal' => '2025-01-07',
            'status' => 'Disetujui',
            'keterangan' => 'cito',
          ),
          6 => 
          array (
            'no_pengajuan' => 'PBM20250115001',
            'nip' => '123124',
            'tanggal' => '2025-01-15',
            'status' => 'Disetujui',
            'keterangan' => 'CITO',
          ),
          7 => 
          array (
            'no_pengajuan' => 'PBM20250121001',
            'nip' => '010101',
            'tanggal' => '2025-01-21',
            'status' => 'Disetujui',
            'keterangan' => 'citoo',
          ),
          8 => 
          array (
            'no_pengajuan' => 'PBM20250130001',
            'nip' => '08998998',
            'tanggal' => '2025-01-30',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          9 => 
          array (
            'no_pengajuan' => 'PBM20250130002',
            'nip' => '08998998',
            'tanggal' => '2025-01-30',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          10 => 
          array (
            'no_pengajuan' => 'PBM20250211001',
            'nip' => 'D0000003',
            'tanggal' => '2025-02-11',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          11 => 
          array (
            'no_pengajuan' => 'PBM20250211002',
            'nip' => '123124',
            'tanggal' => '2025-02-11',
            'status' => 'Disetujui',
            'keterangan' => 'cito',
          ),
          12 => 
          array (
            'no_pengajuan' => 'PBM20250414001',
            'nip' => '123124',
            'tanggal' => '2025-04-14',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          13 => 
          array (
            'no_pengajuan' => 'PBM20250603001',
            'nip' => '08998998',
            'tanggal' => '2025-06-03',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          14 => 
          array (
            'no_pengajuan' => 'PBM20250611001',
            'nip' => 'D0000004',
            'tanggal' => '2025-06-11',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          15 => 
          array (
            'no_pengajuan' => 'PBM20250618001',
            'nip' => '12/09/1988/001',
            'tanggal' => '2025-06-18',
            'status' => 'Disetujui',
            'keterangan' => 'cito',
          ),
          16 => 
          array (
            'no_pengajuan' => 'PBM20250630001',
            'nip' => '123124',
            'tanggal' => '2025-06-30',
            'status' => 'Disetujui',
            'keterangan' => 'CITO',
          ),
          17 => 
          array (
            'no_pengajuan' => 'PBM20250708001',
            'nip' => '08998998',
            'tanggal' => '2025-07-08',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          18 => 
          array (
            'no_pengajuan' => 'PBM20250719001',
            'nip' => 'D0000004',
            'tanggal' => '2025-07-19',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          19 => 
          array (
            'no_pengajuan' => 'PBM20250724001',
            'nip' => '08998998',
            'tanggal' => '2025-07-24',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          20 => 
          array (
            'no_pengajuan' => 'PBM20250805001',
            'nip' => '156798',
            'tanggal' => '2025-08-05',
            'status' => 'Disetujui',
            'keterangan' => 'cito',
          ),
          21 => 
          array (
            'no_pengajuan' => 'PBM20250805002',
            'nip' => '156798',
            'tanggal' => '2025-08-05',
            'status' => 'Ditolak',
            'keterangan' => 'cito',
          ),
          22 => 
          array (
            'no_pengajuan' => 'PBM20250812001',
            'nip' => 'D0000004',
            'tanggal' => '2025-08-12',
            'status' => 'Disetujui',
            'keterangan' => '-',
          ),
          23 => 
          array (
            'no_pengajuan' => 'PBM20250825001',
            'nip' => '156798',
            'tanggal' => '2025-08-25',
            'status' => 'Disetujui',
            'keterangan' => 'CITO',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}