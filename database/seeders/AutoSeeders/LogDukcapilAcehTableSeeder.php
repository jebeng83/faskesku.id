<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LogDukcapilAcehTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('log_dukcapil_aceh')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('log_dukcapil_aceh')->insert(array (
          0 => 
          array (
            'no_ktp' => '',
            'tanggal' => '2021-04-22 12:56:52',
            'user' => 'Admin Utama',
          ),
          1 => 
          array (
            'no_ktp' => '',
            'tanggal' => '2021-04-22 12:57:00',
            'user' => 'Admin Utama',
          ),
          2 => 
          array (
            'no_ktp' => '',
            'tanggal' => '2021-04-22 12:57:17',
            'user' => 'Admin Utama',
          ),
          3 => 
          array (
            'no_ktp' => '',
            'tanggal' => '2021-04-22 12:59:43',
            'user' => 'Admin Utama',
          ),
          4 => 
          array (
            'no_ktp' => '',
            'tanggal' => '2021-04-25 12:34:44',
            'user' => 'Admin Utama',
          ),
          5 => 
          array (
            'no_ktp' => '3313161201830001',
            'tanggal' => '2021-04-22 13:02:29',
            'user' => 'Admin Utama',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}