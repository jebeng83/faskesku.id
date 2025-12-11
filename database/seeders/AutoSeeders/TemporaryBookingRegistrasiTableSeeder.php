<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TemporaryBookingRegistrasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('temporary_booking_registrasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('temporary_booking_registrasi')->insert(array (
          0 => 
          array (
            'no' => 36,
            'temp1' => '2025',
            'temp2' => '000022',
            'temp3' => 'RUDI SANTOSO',
            'temp4' => 'A02 - Other salmonella infections',
            'temp5' => '21212',
            'temp6' => '1212',
            'temp7' => '1212',
            'temp8' => '21212',
            'temp9' => '1212',
            'temp10' => '30-04-2025 14:29:30',
            'temp11' => '30-04-2025 14:29:30',
            'temp12' => '000008',
            'temp13' => '',
            'temp14' => 'D0000003',
            'temp15' => 'dr. Qotrunnada',
            'temp16' => '',
            'temp17' => '',
            'temp18' => 'Menunggu',
            'temp19' => '',
            'temp20' => '',
            'temp21' => '',
            'temp22' => '',
            'temp23' => '',
            'temp24' => '',
            'temp25' => '',
            'temp26' => '',
            'temp27' => '',
            'temp28' => '',
            'temp29' => '',
            'temp30' => '',
            'temp31' => '',
            'temp32' => '',
            'temp33' => '',
            'temp34' => '',
            'temp35' => '',
            'temp36' => '',
            'temp37' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}