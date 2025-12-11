<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_medis')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PM20240608001',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2024-06-08',
            'status' => 'Tidak Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          1 => 
          array (
            'no_permintaan' => 'PM20240610001',
            'kd_bangsal' => 'IGD',
            'nip' => '010101',
            'tanggal' => '2024-06-10',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          2 => 
          array (
            'no_permintaan' => 'PM20240611001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000003',
            'tanggal' => '2024-06-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          3 => 
          array (
            'no_permintaan' => 'PM20240729001',
            'kd_bangsal' => 'AP',
            'nip' => '010101',
            'tanggal' => '2024-07-29',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          4 => 
          array (
            'no_permintaan' => 'PM20240813001',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2024-08-13',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          5 => 
          array (
            'no_permintaan' => 'PM20240813002',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2024-08-13',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          6 => 
          array (
            'no_permintaan' => 'PM20240813003',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2024-08-13',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          7 => 
          array (
            'no_permintaan' => 'PM20240911001',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2024-09-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          8 => 
          array (
            'no_permintaan' => 'PM20240915001',
            'kd_bangsal' => 'B0014',
            'nip' => '08998998',
            'tanggal' => '2024-09-15',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          9 => 
          array (
            'no_permintaan' => 'PM20240930001',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2024-09-30',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          10 => 
          array (
            'no_permintaan' => 'PM20241011001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2024-10-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          11 => 
          array (
            'no_permintaan' => 'PM20241030001',
            'kd_bangsal' => 'B0014',
            'nip' => '010101',
            'tanggal' => '2024-10-30',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          12 => 
          array (
            'no_permintaan' => 'PM20241030002',
            'kd_bangsal' => 'GD',
            'nip' => 'D0000004',
            'tanggal' => '2024-10-30',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          13 => 
          array (
            'no_permintaan' => 'PM20241031001',
            'kd_bangsal' => 'K1',
            'nip' => '123124',
            'tanggal' => '2024-10-31',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          14 => 
          array (
            'no_permintaan' => 'PM20241103001',
            'kd_bangsal' => 'IGD',
            'nip' => '010101',
            'tanggal' => '2024-11-03',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          15 => 
          array (
            'no_permintaan' => 'PM20241111001',
            'kd_bangsal' => 'B0014',
            'nip' => '123124',
            'tanggal' => '2024-11-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          16 => 
          array (
            'no_permintaan' => 'PM20241111002',
            'kd_bangsal' => 'B0014',
            'nip' => '010101',
            'tanggal' => '2024-11-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          17 => 
          array (
            'no_permintaan' => 'PM20241121001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2024-11-21',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          18 => 
          array (
            'no_permintaan' => 'PM20241126001',
            'kd_bangsal' => 'B0014',
            'nip' => '08998998',
            'tanggal' => '2024-11-26',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          19 => 
          array (
            'no_permintaan' => 'PM20250107001',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2025-01-07',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          20 => 
          array (
            'no_permintaan' => 'PM20250107002',
            'kd_bangsal' => 'IGD',
            'nip' => '08998998',
            'tanggal' => '2025-01-07',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          21 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2025-01-21',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          22 => 
          array (
            'no_permintaan' => 'PM20250124001',
            'kd_bangsal' => 'AP',
            'nip' => '010101',
            'tanggal' => '2025-01-24',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          23 => 
          array (
            'no_permintaan' => 'PM20250211001',
            'kd_bangsal' => 'K1',
            'nip' => 'D0000003',
            'tanggal' => '2025-02-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          24 => 
          array (
            'no_permintaan' => 'PM20250326001',
            'kd_bangsal' => 'AP',
            'nip' => 'D0000003',
            'tanggal' => '2025-03-26',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          25 => 
          array (
            'no_permintaan' => 'PM20250326002',
            'kd_bangsal' => 'K1',
            'nip' => 'D0000003',
            'tanggal' => '2025-03-26',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          26 => 
          array (
            'no_permintaan' => 'PM20250414002',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2025-04-14',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          27 => 
          array (
            'no_permintaan' => 'PM20250428001',
            'kd_bangsal' => 'AP',
            'nip' => 'D0000004',
            'tanggal' => '2025-04-28',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'IGD',
          ),
          28 => 
          array (
            'no_permintaan' => 'PM20250618001',
            'kd_bangsal' => 'AP',
            'nip' => 'D0000003',
            'tanggal' => '2025-06-18',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          29 => 
          array (
            'no_permintaan' => 'PM20250628001',
            'kd_bangsal' => 'K1',
            'nip' => '08998998',
            'tanggal' => '2025-06-28',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          30 => 
          array (
            'no_permintaan' => 'PM20250630001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2025-06-30',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          31 => 
          array (
            'no_permintaan' => 'PM20250719001',
            'kd_bangsal' => 'B0014',
            'nip' => '08998998',
            'tanggal' => '2025-07-19',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          32 => 
          array (
            'no_permintaan' => 'PM20250729001',
            'kd_bangsal' => 'IGD',
            'nip' => '123124',
            'tanggal' => '2025-07-29',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          33 => 
          array (
            'no_permintaan' => 'PM20250805001',
            'kd_bangsal' => 'AP',
            'nip' => 'D0000003',
            'tanggal' => '2025-08-05',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          34 => 
          array (
            'no_permintaan' => 'PM20250811001',
            'kd_bangsal' => 'B0014',
            'nip' => '08998998',
            'tanggal' => '2025-08-11',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          35 => 
          array (
            'no_permintaan' => 'PM20250811002',
            'kd_bangsal' => 'B0014',
            'nip' => '123124',
            'tanggal' => '2025-08-11',
            'status' => 'Disetujui',
            'kd_bangsaltujuan' => 'AP',
          ),
          36 => 
          array (
            'no_permintaan' => 'PM20250813001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000004',
            'tanggal' => '2025-08-13',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
          37 => 
          array (
            'no_permintaan' => 'PM20250825001',
            'kd_bangsal' => 'IGD',
            'nip' => 'D0000003',
            'tanggal' => '2025-08-25',
            'status' => 'Tidak Disetujui',
            'kd_bangsaltujuan' => 'GD',
          ),
          38 => 
          array (
            'no_permintaan' => 'PM20250825002',
            'kd_bangsal' => 'AP',
            'nip' => '156798',
            'tanggal' => '2025-08-25',
            'status' => 'Baru',
            'kd_bangsaltujuan' => 'GD',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}