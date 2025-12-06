<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkdpBpjTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skdp_bpjs')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skdp_bpjs')->insert(array (
          0 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000003',
            'diagnosa' => 'jantung',
            'terapi' => 'q',
            'alasan1' => 'q',
            'alasan2' => 'q',
            'rtl1' => 'q',
            'rtl2' => 'q',
            'tanggal_datang' => '2025-01-23 09:52:01',
            'tanggal_rujukan' => '2025-01-23 09:52:01',
            'no_antrian' => '000001',
            'kd_dokter' => 'D0000004',
            'status' => 'Menunggu',
          ),
          1 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000011',
            'diagnosa' => 'ginjal',
            'terapi' => 'tes',
            'alasan1' => 'lanjutan',
            'alasan2' => 'sas',
            'rtl1' => 'lab creatinin',
            'rtl2' => '',
            'tanggal_datang' => '2025-01-24 13:53:13',
            'tanggal_rujukan' => '2025-01-24 13:53:13',
            'no_antrian' => '000002',
            'kd_dokter' => 'D0000004',
            'status' => 'Menunggu',
          ),
          2 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000019',
            'diagnosa' => 'A01.2 - Paratyphoid fever B',
            'terapi' => 'tes',
            'alasan1' => 'tes',
            'alasan2' => 'tes',
            'rtl1' => 'darah rutin, kimia darah, hiv',
            'rtl2' => 'tes',
            'tanggal_datang' => '2025-01-31 00:00:00',
            'tanggal_rujukan' => '2025-01-31 00:00:00',
            'no_antrian' => '000003',
            'kd_dokter' => 'D0000003',
            'status' => 'Menunggu',
          ),
          3 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000002',
            'diagnosa' => 'A01.2 - Paratyphoid fever B',
            'terapi' => '2121212',
            'alasan1' => '21212',
            'alasan2' => '21212',
            'rtl1' => 'Darah rutin, peritin',
            'rtl2' => '',
            'tanggal_datang' => '2025-02-17 13:18:30',
            'tanggal_rujukan' => '2025-02-10 13:18:30',
            'no_antrian' => '000006',
            'kd_dokter' => 'D0000003',
            'status' => 'Menunggu',
          ),
          4 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000013',
            'diagnosa' => 'jantung',
            'terapi' => '-',
            'alasan1' => '-',
            'alasan2' => '-',
            'rtl1' => 'kimia darah, darah rutin',
            'rtl2' => '-',
            'tanggal_datang' => '2025-02-19 10:35:20',
            'tanggal_rujukan' => '2025-02-12 10:35:20',
            'no_antrian' => '000007',
            'kd_dokter' => 'D0000004',
            'status' => 'Menunggu',
          ),
          5 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000022',
            'diagnosa' => 'A02 - Other salmonella infections',
            'terapi' => '21212',
            'alasan1' => '1212',
            'alasan2' => '1212',
            'rtl1' => '21212',
            'rtl2' => '1212',
            'tanggal_datang' => '2025-04-30 14:29:30',
            'tanggal_rujukan' => '2025-04-30 14:29:30',
            'no_antrian' => '000008',
            'kd_dokter' => 'D0000003',
            'status' => 'Menunggu',
          ),
          6 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000022',
            'diagnosa' => 'jantung',
            'terapi' => '-',
            'alasan1' => '-',
            'alasan2' => '-',
            'rtl1' => '-',
            'rtl2' => '-',
            'tanggal_datang' => '2025-06-30 14:29:30',
            'tanggal_rujukan' => '2025-05-26 14:01:53',
            'no_antrian' => '000009',
            'kd_dokter' => 'D0000004',
            'status' => 'Menunggu',
          ),
          7 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000005',
            'diagnosa' => 'I50.1 - Left ventricular failure',
            'terapi' => '-',
            'alasan1' => '-',
            'alasan2' => '-',
            'rtl1' => '-',
            'rtl2' => '-',
            'tanggal_datang' => '2025-07-06 09:24:01',
            'tanggal_rujukan' => '2025-06-30 09:24:01',
            'no_antrian' => '000010',
            'kd_dokter' => 'D0000004',
            'status' => 'Menunggu',
          ),
          8 => 
          array (
            'tahun' => '2025',
            'no_rkm_medis' => '000051',
            'diagnosa' => 'I50.0 - Congestive heart failure',
            'terapi' => '-',
            'alasan1' => '-',
            'alasan2' => '-',
            'rtl1' => '-',
            'rtl2' => '-',
            'tanggal_datang' => '2025-08-05 09:33:27',
            'tanggal_rujukan' => '2025-07-29 09:33:27',
            'no_antrian' => '000011',
            'kd_dokter' => 'D0000004',
            'status' => 'Menunggu',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}