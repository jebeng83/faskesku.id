<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JadwalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jadwal')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jadwal')->insert(array (
          0 => 
          array (
            'kd_dokter' => 'D0000002',
            'hari_kerja' => 'KAMIS',
            'jam_mulai' => '07:30:00',
            'jam_selesai' => '12:00:00',
            'kd_poli' => 'U0009',
            'kuota' => 20,
          ),
          1 => 
          array (
            'kd_dokter' => 'D0000002',
            'hari_kerja' => 'JUMAT',
            'jam_mulai' => '07:30:00',
            'jam_selesai' => '11:00:00',
            'kd_poli' => 'U0009',
            'kuota' => 20,
          ),
          2 => 
          array (
            'kd_dokter' => 'D0000003',
            'hari_kerja' => 'SELASA',
            'jam_mulai' => '07:30:00',
            'jam_selesai' => '12:00:00',
            'kd_poli' => 'U0009',
            'kuota' => 50,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}