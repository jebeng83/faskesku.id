<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RekapPresensiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rekap_presensi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rekap_presensi')->insert(array (
          0 => 
          array (
            'id' => 114,
            'shift' => 'Pagi',
            'jam_datang' => '2022-08-05 08:00:00',
            'jam_pulang' => '2022-08-05 15:00:00',
            'status' => 'Tepat Waktu & PSW',
            'keterlambatan' => '',
            'durasi' => '07:00:00',
            'keterangan' => 'tes',
            'photo' => '',
          ),
          1 => 
          array (
            'id' => 114,
            'shift' => 'Pagi',
            'jam_datang' => '2023-03-09 08:00:00',
            'jam_pulang' => '2023-03-09 14:00:00',
            'status' => 'Tepat Waktu & PSW',
            'keterlambatan' => '',
            'durasi' => '06:00:00',
            'keterangan' => '-',
            'photo' => '',
          ),
          2 => 
          array (
            'id' => 115,
            'shift' => 'Pagi',
            'jam_datang' => '2022-06-09 08:00:00',
            'jam_pulang' => '2022-06-09 14:00:00',
            'status' => 'Tepat Waktu',
            'keterlambatan' => '',
            'durasi' => '06:00:00',
            'keterangan' => '',
            'photo' => '',
          ),
          3 => 
          array (
            'id' => 116,
            'shift' => 'Pagi',
            'jam_datang' => '2022-08-02 07:00:00',
            'jam_pulang' => '2022-08-02 12:00:00',
            'status' => 'Tepat Waktu & PSW',
            'keterlambatan' => '',
            'durasi' => '05:00:00',
            'keterangan' => '-',
            'photo' => '',
          ),
          4 => 
          array (
            'id' => 116,
            'shift' => 'Pagi',
            'jam_datang' => '2022-08-03 00:00:00',
            'jam_pulang' => '2022-08-03 00:00:00',
            'status' => 'Tepat Waktu & PSW',
            'keterlambatan' => '',
            'durasi' => '00:00:00',
            'keterangan' => '',
            'photo' => '',
          ),
          5 => 
          array (
            'id' => 116,
            'shift' => 'Pagi',
            'jam_datang' => '2024-09-14 08:00:00',
            'jam_pulang' => '2024-09-14 16:00:00',
            'status' => 'Tepat Waktu',
            'keterlambatan' => '',
            'durasi' => '08:00:00',
            'keterangan' => '',
            'photo' => '',
          ),
          6 => 
          array (
            'id' => 116,
            'shift' => 'Pagi',
            'jam_datang' => '2024-11-12 08:00:00',
            'jam_pulang' => '2024-11-12 14:00:00',
            'status' => 'Tepat Waktu',
            'keterlambatan' => '',
            'durasi' => '06:00:00',
            'keterangan' => 'tes',
            'photo' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}