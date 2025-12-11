<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunMandiriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_mandiri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_mandiri')->insert(array (
          0 => 
          array (
            'kd_rek' => '112010',
            'kd_rek_biaya' => '530114',
            'username' => '$oÓúÁÕª ëÞ7°Õ¸',
            'password' => 'ßºÏŒÒF+g5]U',
            'client_id' => 'ñ¬6þ!ò(_ET7—\'‡‡',
            'client_secret' => '†­TRhòßEo!OP—WÝË',
            'kode_rs' => '1212',
            'kode_mcm' => 'BRWH001',
            'no_rekening' => '12121313131313',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}