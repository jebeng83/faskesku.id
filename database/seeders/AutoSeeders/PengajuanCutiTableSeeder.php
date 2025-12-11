<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengajuanCutiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_cuti')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengajuan_cuti')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'PC20241112001',
            'tanggal' => '2024-11-12',
            'tanggal_awal' => '2024-11-25',
            'tanggal_akhir' => '2024-11-30',
            'nik' => '123124',
            'urgensi' => 'Tahunan',
            'alamat' => 'buntok',
            'jumlah' => 5,
            'kepentingan' => 'menikah',
            'nik_pj' => '010101',
            'status' => 'Disetujui',
          ),
          1 => 
          array (
            'no_pengajuan' => 'PC20241219001',
            'tanggal' => '2024-12-19',
            'tanggal_awal' => '2024-12-19',
            'tanggal_akhir' => '2024-12-19',
            'nik' => '123124',
            'urgensi' => 'Tahunan',
            'alamat' => 'tes',
            'jumlah' => 3,
            'kepentingan' => 'tes',
            'nik_pj' => '010101',
            'status' => 'Disetujui',
          ),
          2 => 
          array (
            'no_pengajuan' => 'PC20250326001',
            'tanggal' => '2025-03-26',
            'tanggal_awal' => '2025-04-28',
            'tanggal_akhir' => '2025-04-30',
            'nik' => 'D0000004',
            'urgensi' => 'Alasan Penting',
            'alamat' => '2',
            'jumlah' => 2,
            'kepentingan' => '2',
            'nik_pj' => 'D0000002',
            'status' => 'Disetujui',
          ),
          3 => 
          array (
            'no_pengajuan' => 'PC20250603001',
            'tanggal' => '2025-06-03',
            'tanggal_awal' => '2025-06-10',
            'tanggal_akhir' => '2025-06-12',
            'nik' => 'D0000004',
            'urgensi' => 'Tahunan',
            'alamat' => 'tes',
            'jumlah' => 2,
            'kepentingan' => 'tes',
            'nik_pj' => 'D0000004',
            'status' => 'Disetujui',
          ),
          4 => 
          array (
            'no_pengajuan' => 'PC20250630001',
            'tanggal' => '2025-06-30',
            'tanggal_awal' => '2025-07-03',
            'tanggal_akhir' => '2025-07-06',
            'nik' => '123124',
            'urgensi' => 'Tahunan',
            'alamat' => 'tes',
            'jumlah' => 3,
            'kepentingan' => '-',
            'nik_pj' => 'D0000004',
            'status' => 'Disetujui',
          ),
          5 => 
          array (
            'no_pengajuan' => 'PC20250825001',
            'tanggal' => '2025-08-25',
            'tanggal_awal' => '2025-09-02',
            'tanggal_akhir' => '2025-09-05',
            'nik' => '12/09/1988/001',
            'urgensi' => 'Alasan Penting',
            'alamat' => '-',
            'jumlah' => 3,
            'kepentingan' => 'MENIKAH',
            'nik_pj' => '08998998',
            'status' => 'Disetujui',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}