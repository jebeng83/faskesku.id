<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemeliharaanInventariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemeliharaan_inventaris')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemeliharaan_inventaris')->insert(array (
          0 => 
          array (
            'no_inventaris' => 'MED/03/08/2022/01',
            'tanggal' => '2024-06-05',
            'uraian_kegiatan' => 'tes',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          1 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/01',
            'tanggal' => '2024-11-26',
            'uraian_kegiatan' => 'tes',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          2 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/02',
            'tanggal' => '2022-06-09',
            'uraian_kegiatan' => '-',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 100000.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          3 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/03',
            'tanggal' => '2025-08-05',
            'uraian_kegiatan' => 'qwqw',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          4 => 
          array (
            'no_inventaris' => 'MED/11/10/0001',
            'tanggal' => '2023-11-10',
            'uraian_kegiatan' => 'KALIBRASI RUTIN',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          5 => 
          array (
            'no_inventaris' => 'MED/11/10/0003',
            'tanggal' => '2024-09-30',
            'uraian_kegiatan' => 'PEMERIKSAAN KAKI-KAKI/KALIBRASI',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          6 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0001',
            'tanggal' => '2025-06-19',
            'uraian_kegiatan' => 'PEMBERSIHAN SARINGAN UDARA',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          7 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0004',
            'tanggal' => '2025-06-30',
            'uraian_kegiatan' => 'PEMBERSIHAN FILTER LCD',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
          8 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0005',
            'tanggal' => '2024-10-11',
            'uraian_kegiatan' => 'kalibrasi, penggantian filter',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'jenis_pemeliharaan' => 'Running Maintenance',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}