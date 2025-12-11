<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingPeriksaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_periksa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_periksa')->insert(array (
          0 => 
          array (
            'no_booking' => 'BP202508200001',
            'tanggal' => '2025-08-20',
            'nama' => 'TES',
            'alamat' => 'KALITIDU',
            'no_telp' => '08123123123',
            'email' => 'tesyahoo.com',
            'kd_poli' => 'U0012',
            'tambahan_pesan' => 'tes',
            'status' => 'Diterima',
            'tanggal_booking' => '2025-08-19 21:07:57',
          ),
          1 => 
          array (
            'no_booking' => 'BP202508260001',
            'tanggal' => '2025-08-26',
            'nama' => 'JAROT KUMBORO',
            'alamat' => 'MALANG KOTA',
            'no_telp' => '0812121212',
            'email' => 'JAROTYAHOO.COM',
            'kd_poli' => 'INT',
            'tambahan_pesan' => '-',
            'status' => 'Diterima',
            'tanggal_booking' => '2025-08-25 09:40:07',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}