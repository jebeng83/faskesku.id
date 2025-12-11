<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingMcuPerusahaanBerhasilRegistrasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_mcu_perusahaan_berhasil_registrasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_mcu_perusahaan_berhasil_registrasi')->insert(array (
          0 => 
          array (
            'no_mcu' => 'MCU0002',
            'no_rawat' => '2025/08/26/000001',
          ),
          1 => 
          array (
            'no_mcu' => 'MCU202505150001',
            'no_rawat' => '2025/05/15/000001',
          ),
          2 => 
          array (
            'no_mcu' => 'MCU202505270001',
            'no_rawat' => '2025/05/27/000001',
          ),
          3 => 
          array (
            'no_mcu' => 'MCU202505270003',
            'no_rawat' => '2025/05/27/000003',
          ),
          4 => 
          array (
            'no_mcu' => 'MCU202505270004',
            'no_rawat' => '2025/05/27/000002',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}