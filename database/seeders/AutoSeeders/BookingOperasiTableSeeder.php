<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingOperasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_operasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_operasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'kode_paket' => 'M5012',
            'tanggal' => '2025-05-26',
            'jam_mulai' => '09:00:00',
            'jam_selesai' => '10:00:00',
            'status' => 'Selesai',
            'kd_dokter' => 'D0000004',
            'kd_ruang_ok' => 'O1',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kode_paket' => 'M3001',
            'tanggal' => '2025-06-18',
            'jam_mulai' => '00:00:00',
            'jam_selesai' => '00:00:00',
            'status' => 'Proses Operasi',
            'kd_dokter' => 'D0000003',
            'kd_ruang_ok' => 'O1',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/19/000001',
            'kode_paket' => 'M2002',
            'tanggal' => '2025-06-19',
            'jam_mulai' => '08:00:00',
            'jam_selesai' => '09:00:00',
            'status' => 'Selesai',
            'kd_dokter' => 'D0000003',
            'kd_ruang_ok' => 'O1',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kode_paket' => 'M2002',
            'tanggal' => '2025-08-09',
            'jam_mulai' => '00:00:00',
            'jam_selesai' => '00:00:00',
            'status' => 'Menunggu',
            'kd_dokter' => 'D0000005',
            'kd_ruang_ok' => '-',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kode_paket' => 'O4032',
            'tanggal' => '2025-07-29',
            'jam_mulai' => '00:00:00',
            'jam_selesai' => '00:00:00',
            'status' => 'Selesai',
            'kd_dokter' => 'D0000004',
            'kd_ruang_ok' => '-',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'kode_paket' => 'L2002',
            'tanggal' => '2025-07-05',
            'jam_mulai' => '07:00:00',
            'jam_selesai' => '12:00:00',
            'status' => 'Selesai',
            'kd_dokter' => 'D0000004',
            'kd_ruang_ok' => 'O1',
          ),
          6 => 
          array (
            'no_rawat' => '2025/07/08/000001',
            'kode_paket' => 'L1034',
            'tanggal' => '2025-07-29',
            'jam_mulai' => '07:00:00',
            'jam_selesai' => '09:00:00',
            'status' => 'Proses Operasi',
            'kd_dokter' => 'D0000004',
            'kd_ruang_ok' => 'O1',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kode_paket' => 'L3012',
            'tanggal' => '2025-08-19',
            'jam_mulai' => '04:00:00',
            'jam_selesai' => '07:00:00',
            'status' => 'Selesai',
            'kd_dokter' => 'D0000004',
            'kd_ruang_ok' => 'O1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}