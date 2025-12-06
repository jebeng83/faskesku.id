<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengumumanEpasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengumuman_epasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengumuman_epasien')->insert(array (
          0 => 
          array (
            'nik' => '12/09/1988/001',
            'tanggal' => '2021-10-05 09:52:53',
            'pengumuman' => 'promo 50%',
          ),
          1 => 
          array (
            'nik' => '12/09/1988/001',
            'tanggal' => '2021-10-09 09:43:56',
            'pengumuman' => 'dr Aisyah datang terlambat jam 11.30',
          ),
          2 => 
          array (
            'nik' => '12/09/1988/001',
            'tanggal' => '2022-08-04 09:17:10',
            'pengumuman' => 'Mohon maaf, dokter qotrunnada libur hari ini',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}