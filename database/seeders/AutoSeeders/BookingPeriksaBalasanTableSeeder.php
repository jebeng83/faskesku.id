<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingPeriksaBalasanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_periksa_balasan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_periksa_balasan')->insert(array (
          0 => 
          array (
            'no_booking' => 'BP202508200001',
            'balasan' => '1212121213121212',
          ),
          1 => 
          array (
            'no_booking' => 'BP202508260001',
            'balasan' => 'SILAHKAN DATANG TEPAT WAKTU',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}