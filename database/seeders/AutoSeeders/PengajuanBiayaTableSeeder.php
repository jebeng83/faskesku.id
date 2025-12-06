<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengajuanBiayaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_biaya')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_biaya')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PK20250428001',
            'tanggal' => '2025-04-28',
            'nik' => '08998998',
            'urgensi' => 'Cito',
            'uraian_latar_belakang' => 'BELI LCD PROYEKTOR',
            'tujuan_pengajuan' => 'UNTUK RUANG PERTEMUAN',
            'target_sasaran' => '-',
            'lokasi_kegiatan' => '-',
            'jumlah' => 10.0,
            'harga' => 2000000.0,
            'total' => 20000000.0,
            'keterangan' => '-',
            'nik_pj' => '123124',
            'status' => 'Disetujui',
          ),
          1 => 
          array (
            'no_pengajuan' => 'PK20250603001',
            'tanggal' => '2025-06-03',
            'nik' => '123124',
            'urgensi' => 'Cito',
            'uraian_latar_belakang' => 'WORKSHOP BHD',
            'tujuan_pengajuan' => 'MENINGKATKAN KAPASITAS PEGAWAI',
            'target_sasaran' => '-',
            'lokasi_kegiatan' => 'YOGYAKARTA',
            'jumlah' => 3.0,
            'harga' => 3000000.0,
            'total' => 9000000.0,
            'keterangan' => '-',
            'nik_pj' => '156798',
            'status' => 'Divalidasi',
          ),
          2 => 
          array (
            'no_pengajuan' => 'PK20250813001',
            'tanggal' => '2025-08-13',
            'nik' => '08998998',
            'urgensi' => 'Cito',
            'uraian_latar_belakang' => 'beli komputer',
            'tujuan_pengajuan' => 'barang pada rusak',
            'target_sasaran' => 'igd, poli, dll',
            'lokasi_kegiatan' => '-',
            'jumlah' => 10.0,
            'harga' => 6000000.0,
            'total' => 60000000.0,
            'keterangan' => '-',
            'nik_pj' => '123124',
            'status' => 'Disetujui',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}