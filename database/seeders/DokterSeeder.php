<?php

namespace Database\Seeders;

use App\Models\Dokter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DokterSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $dokters = [
            [
                'kd_dokter' => 'D001',
                'nm_dokter' => 'Dr. Ahmad Wijaya, Sp.PD',
                'jk' => 'L',
                'tmp_lahir' => 'Jakarta',
                'tgl_lahir' => '1980-05-15',
                'gol_drh' => 'O',
                'agama' => 'Islam',
                'almt_tgl' => 'Jl. Sudirman No. 123, Jakarta',
                'no_telp' => '081234567890',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP001',
                'alumni' => 'Universitas Indonesia',
                'no_ijn_praktek' => 'IJN001',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'D002',
                'nm_dokter' => 'Dr. Siti Nurhaliza, Sp.OG',
                'jk' => 'P',
                'tmp_lahir' => 'Bandung',
                'tgl_lahir' => '1985-08-20',
                'gol_drh' => 'A',
                'agama' => 'Islam',
                'almt_tgl' => 'Jl. Diponegoro No. 456, Bandung',
                'no_telp' => '081234567891',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP002',
                'alumni' => 'Universitas Padjadjaran',
                'no_ijn_praktek' => 'IJN002',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'D003',
                'nm_dokter' => 'Dr. Budi Santoso, Sp.A',
                'jk' => 'L',
                'tmp_lahir' => 'Surabaya',
                'tgl_lahir' => '1982-12-10',
                'gol_drh' => 'B',
                'agama' => 'Kristen',
                'almt_tgl' => 'Jl. Thamrin No. 789, Surabaya',
                'no_telp' => '081234567892',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP003',
                'alumni' => 'Universitas Airlangga',
                'no_ijn_praktek' => 'IJN003',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'D004',
                'nm_dokter' => 'Dr. Maria Magdalena, Sp.KJ',
                'jk' => 'P',
                'tmp_lahir' => 'Yogyakarta',
                'tgl_lahir' => '1988-03-25',
                'gol_drh' => 'AB',
                'agama' => 'Katolik',
                'almt_tgl' => 'Jl. Malioboro No. 321, Yogyakarta',
                'no_telp' => '081234567893',
                'stts_nikah' => 'BELUM MENIKAH',
                'kd_sps' => 'SP004',
                'alumni' => 'Universitas Gadjah Mada',
                'no_ijn_praktek' => 'IJN004',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'D005',
                'nm_dokter' => 'Dr. Rizki Pratama, Sp.B',
                'jk' => 'L',
                'tmp_lahir' => 'Medan',
                'tgl_lahir' => '1983-07-12',
                'gol_drh' => 'O',
                'agama' => 'Islam',
                'almt_tgl' => 'Jl. Gatot Subroto No. 654, Medan',
                'no_telp' => '081234567894',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP005',
                'alumni' => 'Universitas Sumatera Utara',
                'no_ijn_praktek' => 'IJN005',
                'status' => '1',
            ],
        ];

        foreach ($dokters as $dokter) {
            Dokter::updateOrCreate(
                ['kd_dokter' => $dokter['kd_dokter']],
                $dokter
            );
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
