<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingPeriksaDiterimaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_periksa_diterima')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_periksa_diterima')->insert(array (
          0 => 
          array (
            'no_booking' => 'BP202508200001',
            'no_rkm_medis' => '000053',
          ),
          1 => 
          array (
            'no_booking' => 'BP202508260001',
            'no_rkm_medis' => '000054',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}