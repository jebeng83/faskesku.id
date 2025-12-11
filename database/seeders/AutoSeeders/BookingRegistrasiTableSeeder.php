<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingRegistrasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_registrasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_registrasi')->insert(array (
          0 => 
          array (
            'tanggal_booking' => '2024-11-25',
            'jam_booking' => '08:51:20',
            'no_rkm_medis' => '000002',
            'tanggal_periksa' => '2024-11-26',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2024-11-26 00:00:00',
            'status' => 'Terdaftar',
          ),
          1 => 
          array (
            'tanggal_booking' => '2025-02-10',
            'jam_booking' => '13:18:30',
            'no_rkm_medis' => '000002',
            'tanggal_periksa' => '2025-02-17',
            'kd_dokter' => 'D0000003',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => '-',
            'limit_reg' => 0,
            'waktu_kunjungan' => '2025-02-17 13:18:30',
            'status' => 'Belum',
          ),
          2 => 
          array (
            'tanggal_booking' => '2025-01-23',
            'jam_booking' => '09:52:01',
            'no_rkm_medis' => '000003',
            'tanggal_periksa' => '2025-01-23',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 0,
            'waktu_kunjungan' => '2025-01-23 09:52:01',
            'status' => 'Belum',
          ),
          3 => 
          array (
            'tanggal_booking' => '2025-02-06',
            'jam_booking' => '15:09:07',
            'no_rkm_medis' => '000010',
            'tanggal_periksa' => '2025-02-06',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => '-',
            'limit_reg' => 0,
            'waktu_kunjungan' => '2025-02-06 15:09:07',
            'status' => 'Belum',
          ),
          4 => 
          array (
            'tanggal_booking' => '2025-01-07',
            'jam_booking' => '08:41:14',
            'no_rkm_medis' => '000011',
            'tanggal_periksa' => '2025-01-08',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => '-',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-01-08 00:00:00',
            'status' => 'Terdaftar',
          ),
          5 => 
          array (
            'tanggal_booking' => '2025-01-24',
            'jam_booking' => '13:53:13',
            'no_rkm_medis' => '000011',
            'tanggal_periksa' => '2025-01-24',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 0,
            'waktu_kunjungan' => '2025-01-24 13:53:13',
            'status' => 'Terdaftar',
          ),
          6 => 
          array (
            'tanggal_booking' => '2025-02-12',
            'jam_booking' => '10:35:20',
            'no_rkm_medis' => '000013',
            'tanggal_periksa' => '2025-02-19',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => '-',
            'limit_reg' => 0,
            'waktu_kunjungan' => '2025-02-19 10:35:20',
            'status' => 'Belum',
          ),
          7 => 
          array (
            'tanggal_booking' => '2025-01-31',
            'jam_booking' => '14:11:44',
            'no_rkm_medis' => '000019',
            'tanggal_periksa' => '2025-01-31',
            'kd_dokter' => 'D0000003',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 0,
            'waktu_kunjungan' => '2025-01-31 14:11:44',
            'status' => 'Belum',
          ),
          8 => 
          array (
            'tanggal_booking' => '2025-04-27',
            'jam_booking' => '08:14:22',
            'no_rkm_medis' => '000022',
            'tanggal_periksa' => '2025-04-28',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-04-28 00:00:00',
            'status' => 'Terdaftar',
          ),
          9 => 
          array (
            'tanggal_booking' => '2025-05-26',
            'jam_booking' => '09:45:50',
            'no_rkm_medis' => '000022',
            'tanggal_periksa' => '2025-05-27',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'BPJ',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-05-27 00:00:00',
            'status' => 'Belum',
          ),
          10 => 
          array (
            'tanggal_booking' => '2025-06-04',
            'jam_booking' => '20:40:02',
            'no_rkm_medis' => '000022',
            'tanggal_periksa' => '2025-06-06',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-06-06 00:00:00',
            'status' => 'Belum',
          ),
          11 => 
          array (
            'tanggal_booking' => '2025-08-19',
            'jam_booking' => '09:47:45',
            'no_rkm_medis' => '000022',
            'tanggal_periksa' => '2025-08-20',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-08-20 00:00:00',
            'status' => 'Belum',
          ),
          12 => 
          array (
            'tanggal_booking' => '2025-08-25',
            'jam_booking' => '09:46:44',
            'no_rkm_medis' => '000022',
            'tanggal_periksa' => '2025-08-26',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-08-26 00:00:00',
            'status' => 'Belum',
          ),
          13 => 
          array (
            'tanggal_booking' => '2025-03-15',
            'jam_booking' => '09:14:27',
            'no_rkm_medis' => '000048',
            'tanggal_periksa' => '2025-03-18',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0003',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-03-18 00:00:00',
            'status' => 'Belum',
          ),
          14 => 
          array (
            'tanggal_booking' => '2025-08-19',
            'jam_booking' => '21:07:57',
            'no_rkm_medis' => '000053',
            'tanggal_periksa' => '2025-08-20',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'U0012',
            'no_reg' => '001',
            'kd_pj' => '-',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-08-20 21:07:57',
            'status' => 'Belum',
          ),
          15 => 
          array (
            'tanggal_booking' => '2025-08-25',
            'jam_booking' => '09:40:07',
            'no_rkm_medis' => '000054',
            'tanggal_periksa' => '2025-08-26',
            'kd_dokter' => 'D0000004',
            'kd_poli' => 'INT',
            'no_reg' => '001',
            'kd_pj' => 'A09',
            'limit_reg' => 1,
            'waktu_kunjungan' => '2025-08-26 09:40:07',
            'status' => 'Belum',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}