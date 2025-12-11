<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingMcuPerusahaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_mcu_perusahaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_mcu_perusahaan')->insert(array (
          0 => 
          array (
            'tanggal_booking' => '2025-08-25',
            'jam_booking' => '09:55:43',
            'no_rkm_medis' => '000055',
            'tanggal_mcu' => '2025-08-26',
            'no_mcu' => 'MCU0002',
            'status' => 'Menunggu Hasil',
            'kode_perusahaan' => 'I0002',
          ),
          1 => 
          array (
            'tanggal_booking' => '2025-05-14',
            'jam_booking' => '11:28:50',
            'no_rkm_medis' => '000019',
            'tanggal_mcu' => '2025-05-15',
            'no_mcu' => 'MCU202505150001',
            'status' => 'Selesai',
            'kode_perusahaan' => 'I0002',
          ),
          2 => 
          array (
            'tanggal_booking' => '2025-05-26',
            'jam_booking' => '14:18:47',
            'no_rkm_medis' => '000005',
            'tanggal_mcu' => '2025-05-27',
            'no_mcu' => 'MCU202505270001',
            'status' => 'Menunggu Hasil',
            'kode_perusahaan' => 'I0002',
          ),
          3 => 
          array (
            'tanggal_booking' => '2025-05-26',
            'jam_booking' => '14:18:47',
            'no_rkm_medis' => '000006',
            'tanggal_mcu' => '2025-05-27',
            'no_mcu' => 'MCU202505270002',
            'status' => 'Terdaftar',
            'kode_perusahaan' => 'I0002',
          ),
          4 => 
          array (
            'tanggal_booking' => '2025-05-26',
            'jam_booking' => '14:18:47',
            'no_rkm_medis' => '000019',
            'tanggal_mcu' => '2025-05-27',
            'no_mcu' => 'MCU202505270003',
            'status' => 'Menunggu Hasil',
            'kode_perusahaan' => 'I0002',
          ),
          5 => 
          array (
            'tanggal_booking' => '2025-05-26',
            'jam_booking' => '14:18:47',
            'no_rkm_medis' => '000022',
            'tanggal_mcu' => '2025-05-27',
            'no_mcu' => 'MCU202505270004',
            'status' => 'Menunggu Hasil',
            'kode_perusahaan' => 'I0002',
          ),
          6 => 
          array (
            'tanggal_booking' => '2025-05-26',
            'jam_booking' => '14:18:47',
            'no_rkm_medis' => '000023',
            'tanggal_mcu' => '2025-05-27',
            'no_mcu' => 'MCU202505270005',
            'status' => 'Terdaftar',
            'kode_perusahaan' => 'I0002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}