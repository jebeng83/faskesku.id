<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BerkasPegawaiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('berkas_pegawai')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('berkas_pegawai')->insert(array (
          0 => 
          array (
            'nik' => 'D0000004',
            'tgl_uploud' => '2024-11-12',
            'kode_berkas' => 'MBP0001',
            'berkas' => 'pages/berkaspegawai/berkas/ijazahS21.jpg',
          ),
          1 => 
          array (
            'nik' => 'D0000002',
            'tgl_uploud' => '2025-06-30',
            'kode_berkas' => 'MBP0002',
            'berkas' => 'pages/berkaspegawai/berkas/ijazah2.jpg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}