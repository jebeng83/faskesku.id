<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanPerbaikanInventariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_perbaikan_inventaris')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_perbaikan_inventaris')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PPI20240813001',
            'no_inventaris' => 'SAM/ELE/KAN/0004',
            'nik' => 'D0000004',
            'tanggal' => '2024-08-13 15:05:39',
            'deskripsi_kerusakan' => 'RUSAK',
          ),
          1 => 
          array (
            'no_permintaan' => 'PPI20240826001',
            'no_inventaris' => 'INV/2023/12/14/001',
            'nik' => 'D0000004',
            'tanggal' => '2024-08-26 09:28:45',
            'deskripsi_kerusakan' => 'KAKI PATAH',
          ),
          2 => 
          array (
            'no_permintaan' => 'PPI20240914001',
            'no_inventaris' => 'SAM/ELE/KAN/0005',
            'nik' => 'D0000004',
            'tanggal' => '2024-09-14 14:26:12',
            'deskripsi_kerusakan' => 'tes',
          ),
          3 => 
          array (
            'no_permintaan' => 'PPI20240930001',
            'no_inventaris' => 'INV/2023/12/14/003',
            'nik' => '08998998',
            'tanggal' => '2024-09-30 10:19:40',
            'deskripsi_kerusakan' => 'KAKI KURSI PATAH',
          ),
          4 => 
          array (
            'no_permintaan' => 'PPI20241011001',
            'no_inventaris' => 'SAM/ELE/KAN/0003',
            'nik' => 'D0000004',
            'tanggal' => '2024-10-11 13:28:33',
            'deskripsi_kerusakan' => 'bolam putus',
          ),
          5 => 
          array (
            'no_permintaan' => 'PPI20241112001',
            'no_inventaris' => 'SAM/ELE/KAN/0004',
            'nik' => '08998998',
            'tanggal' => '2024-11-12 09:45:26',
            'deskripsi_kerusakan' => 'lampu mati',
          ),
          6 => 
          array (
            'no_permintaan' => 'PPI20241115001',
            'no_inventaris' => 'MED/09/06/2022/01',
            'nik' => 'D0000004',
            'tanggal' => '2024-11-15 15:32:33',
            'deskripsi_kerusakan' => 'asasasas',
          ),
          7 => 
          array (
            'no_permintaan' => 'PPI20241121001',
            'no_inventaris' => 'I000000023/2023',
            'nik' => '123124',
            'tanggal' => '2024-11-21 10:36:27',
            'deskripsi_kerusakan' => 'tes',
          ),
          8 => 
          array (
            'no_permintaan' => 'PPI20241125001',
            'no_inventaris' => 'MED/09/06/2022/01',
            'nik' => '08998998',
            'tanggal' => '2024-11-25 09:30:23',
            'deskripsi_kerusakan' => 'KAKI PATAH',
          ),
          9 => 
          array (
            'no_permintaan' => 'PPI20241126001',
            'no_inventaris' => 'SAM/ELE/KAN/0001',
            'nik' => '08998998',
            'tanggal' => '2024-11-26 15:31:32',
            'deskripsi_kerusakan' => 'lampu mati',
          ),
          10 => 
          array (
            'no_permintaan' => 'PPI20250619001',
            'no_inventaris' => 'MED/11/10/0002',
            'nik' => '156798',
            'tanggal' => '2025-06-19 12:50:07',
            'deskripsi_kerusakan' => 'RODA KAKI PATAH',
          ),
          11 => 
          array (
            'no_permintaan' => 'PPI20250630001',
            'no_inventaris' => 'MED/11/10/0001',
            'nik' => 'D0000004',
            'tanggal' => '2025-06-30 14:03:06',
            'deskripsi_kerusakan' => 'RODA PATAH',
          ),
          12 => 
          array (
            'no_permintaan' => 'PPI20250729001',
            'no_inventaris' => 'KANTOR/07/0001',
            'nik' => 'D0000004',
            'tanggal' => '2025-07-29 11:11:17',
            'deskripsi_kerusakan' => 'KACA PECAH',
          ),
          13 => 
          array (
            'no_permintaan' => 'PPI20250804001',
            'no_inventaris' => 'INV/2023/12/14/001',
            'nik' => '08998998',
            'tanggal' => '2025-08-04 15:23:14',
            'deskripsi_kerusakan' => '-',
          ),
          14 => 
          array (
            'no_permintaan' => 'PPI20250805001',
            'no_inventaris' => 'MED/03/08/2022/01',
            'nik' => 'D0000004',
            'tanggal' => '2025-08-05 15:01:43',
            'deskripsi_kerusakan' => '-',
          ),
          15 => 
          array (
            'no_permintaan' => 'PPI20250813001',
            'no_inventaris' => 'SAM/ELE/KAN/0004',
            'nik' => '123124',
            'tanggal' => '2025-08-13 18:15:35',
            'deskripsi_kerusakan' => '-',
          ),
          16 => 
          array (
            'no_permintaan' => 'PPI20250825001',
            'no_inventaris' => 'KANTOR/07/0001',
            'nik' => 'D0000005',
            'tanggal' => '2025-08-25 10:35:26',
            'deskripsi_kerusakan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}