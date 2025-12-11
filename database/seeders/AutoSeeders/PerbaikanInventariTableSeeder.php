<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerbaikanInventariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perbaikan_inventaris')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perbaikan_inventaris')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PPI20240813001',
            'tanggal' => '2024-08-13',
            'uraian_kegiatan' => 'GANTI LAMPU',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 300000.0,
            'keterangan' => 'GANTI LAMPU LCD',
            'status' => 'Bisa Diperbaiki',
          ),
          1 => 
          array (
            'no_permintaan' => 'PPI20240826001',
            'tanggal' => '2024-08-26',
            'uraian_kegiatan' => 'PENGELASAN',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => 'TES',
            'status' => 'Bisa Diperbaiki',
          ),
          2 => 
          array (
            'no_permintaan' => 'PPI20240914001',
            'tanggal' => '2024-09-14',
            'uraian_kegiatan' => 'tes',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '-',
            'status' => 'Bisa Diperbaiki',
          ),
          3 => 
          array (
            'no_permintaan' => 'PPI20240930001',
            'tanggal' => '2024-09-30',
            'uraian_kegiatan' => 'PENGELASAN',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '-',
            'status' => 'Bisa Diperbaiki',
          ),
          4 => 
          array (
            'no_permintaan' => 'PPI20241011001',
            'tanggal' => '2024-10-11',
            'uraian_kegiatan' => 'ganti bolam',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 200000.0,
            'keterangan' => 'ganti lampu',
            'status' => 'Bisa Diperbaiki',
          ),
          5 => 
          array (
            'no_permintaan' => 'PPI20241112001',
            'tanggal' => '2024-11-12',
            'uraian_kegiatan' => 'ganti lampu lcd',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '-',
            'status' => 'Bisa Diperbaiki',
          ),
          6 => 
          array (
            'no_permintaan' => 'PPI20241115001',
            'tanggal' => '2024-11-15',
            'uraian_kegiatan' => 'qwqw',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 1212.0,
            'keterangan' => '12',
            'status' => 'Bisa Diperbaiki',
          ),
          7 => 
          array (
            'no_permintaan' => 'PPI20241121001',
            'tanggal' => '2024-11-21',
            'uraian_kegiatan' => 'fhfh',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 9.0,
            'keterangan' => '8',
            'status' => 'Bisa Diperbaiki',
          ),
          8 => 
          array (
            'no_permintaan' => 'PPI20241125001',
            'tanggal' => '2024-11-25',
            'uraian_kegiatan' => 'TES',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => 'TES',
            'status' => 'Bisa Diperbaiki',
          ),
          9 => 
          array (
            'no_permintaan' => 'PPI20241126001',
            'tanggal' => '2024-11-26',
            'uraian_kegiatan' => 'ganti lamu',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => 'tes',
            'status' => 'Bisa Diperbaiki',
          ),
          10 => 
          array (
            'no_permintaan' => 'PPI20250619001',
            'tanggal' => '2025-06-19',
            'uraian_kegiatan' => 'DIGANTI RODA KAKI BARU',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '-',
            'status' => 'Bisa Diperbaiki',
          ),
          11 => 
          array (
            'no_permintaan' => 'PPI20250630001',
            'tanggal' => '2025-06-30',
            'uraian_kegiatan' => 'PEMASANGAN RODA BARU',
            'nip' => '123124',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '-',
            'status' => 'Bisa Diperbaiki',
          ),
          12 => 
          array (
            'no_permintaan' => 'PPI20250729001',
            'tanggal' => '2025-07-29',
            'uraian_kegiatan' => 'DIBAWA KE TOKO KOMPUTER',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Pihak ke III',
            'biaya' => 200000.0,
            'keterangan' => 'SERVICE MONITOR',
            'status' => 'Bisa Diperbaiki',
          ),
          13 => 
          array (
            'no_permintaan' => 'PPI20250805001',
            'tanggal' => '2025-08-05',
            'uraian_kegiatan' => '121212',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '212',
            'status' => 'Bisa Diperbaiki',
          ),
          14 => 
          array (
            'no_permintaan' => 'PPI20250825001',
            'tanggal' => '2025-08-25',
            'uraian_kegiatan' => '-',
            'nip' => '12/09/1988/001',
            'pelaksana' => 'Teknisi Rumah Sakit',
            'biaya' => 0.0,
            'keterangan' => '-',
            'status' => 'Bisa Diperbaiki',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}