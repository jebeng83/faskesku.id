<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsLokasiKejadianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_lokasi_kejadian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_lokasi_kejadian')->insert(array (
          0 => 
          array (
            'kode_lokasi' => 'LK001',
            'lokasi_kejadian' => 'Di tempat kerja biasa',
          ),
          1 => 
          array (
            'kode_lokasi' => 'LK002',
            'lokasi_kejadian' => 'Di jalan saat melaksanakan pekerjaan/tugas',
          ),
          2 => 
          array (
            'kode_lokasi' => 'LK003',
            'lokasi_kejadian' => 'Di jalan dari rumah ke tempat kerja',
          ),
          3 => 
          array (
            'kode_lokasi' => 'LK004',
            'lokasi_kejadian' => 'Di jalan dari tempat kerja ke rumah',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}