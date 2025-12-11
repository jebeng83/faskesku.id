<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemeliharaanGedungTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemeliharaan_gedung')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemeliharaan_gedung')->insert(array (
          0 => 
          array (
            'no_pemeliharaan' => 'PG20211211001',
            'tanggal' => '2021-12-11',
            'uraian_kegiatan' => 'tes aja',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 100000.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
            'tindak_lanjut' => 'tes',
          ),
          1 => 
          array (
            'no_pemeliharaan' => 'PG20211211002',
            'tanggal' => '2021-12-11',
            'uraian_kegiatan' => '12121',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
            'tindak_lanjut' => 'asasa',
          ),
          2 => 
          array (
            'no_pemeliharaan' => 'PG20211227001',
            'tanggal' => '2021-12-27',
            'uraian_kegiatan' => 'PERBAIKAN BOCOR DI AREA POLI',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Pihak ke III',
            'biaya' => 100000.0,
            'jenis_pemeliharaan' => 'Emergency Maintenance',
            'tindak_lanjut' => 'CEK DAN PERBAIKAN',
          ),
          3 => 
          array (
            'no_pemeliharaan' => 'PG20250619001',
            'tanggal' => '2025-06-19',
            'uraian_kegiatan' => 'GANTTI PUNTU KAMAR MANDI EDELWEIS',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
            'tindak_lanjut' => '-',
          ),
          4 => 
          array (
            'no_pemeliharaan' => 'PG20250630001',
            'tanggal' => '2025-06-30',
            'uraian_kegiatan' => 'TES',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 100000.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
            'tindak_lanjut' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}