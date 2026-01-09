<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks temporarily
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $doctors = [
            [
                'kd_dokter' => 'DR001',
                'nm_dokter' => 'Dr. Ahmad Fauzi, Sp.PD',
                'jk' => 'L',
                'tmp_lahir' => 'Jakarta',
                'tgl_lahir' => '1975-05-15',
                'gol_drh' => 'A',
                'agama' => 'ISLAM',
                'almt_tgl' => 'Jl. Sudirman No. 123, Jakarta Pusat',
                'no_telp' => '08123456789',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP003',
                'alumni' => 'Universitas Indonesia',
                'no_ijn_praktek' => 'SIP/123/DKI/2020',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'DR002',
                'nm_dokter' => 'Dr. Sari Dewi, Sp.A',
                'jk' => 'P',
                'tmp_lahir' => 'Surabaya',
                'tgl_lahir' => '1980-03-20',
                'gol_drh' => 'B',
                'agama' => 'ISLAM',
                'almt_tgl' => 'Jl. Thamrin No. 456, Jakarta Pusat',
                'no_telp' => '08234567890',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP002',
                'alumni' => 'Universitas Gadjah Mada',
                'no_ijn_praktek' => 'SIP/456/DKI/2021',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'DR003',
                'nm_dokter' => 'Dr. Budi Santoso, Sp.JP',
                'jk' => 'L',
                'tmp_lahir' => 'Bandung',
                'tgl_lahir' => '1978-12-10',
                'gol_drh' => 'O',
                'agama' => 'KRISTEN',
                'almt_tgl' => 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
                'no_telp' => '08345678901',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP001',
                'alumni' => 'Institut Teknologi Bandung',
                'no_ijn_praktek' => 'SIP/789/DKI/2019',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'DR004',
                'nm_dokter' => 'Dr. Maya Sari, Sp.OG',
                'jk' => 'P',
                'tmp_lahir' => 'Medan',
                'tgl_lahir' => '1982-08-25',
                'gol_drh' => 'AB',
                'agama' => 'ISLAM',
                'almt_tgl' => 'Jl. Kuningan No. 321, Jakarta Selatan',
                'no_telp' => '08456789012',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP005',
                'alumni' => 'Universitas Sumatera Utara',
                'no_ijn_praktek' => 'SIP/321/DKI/2022',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'DR005',
                'nm_dokter' => 'Dr. Rudi Hermawan, Sp.B',
                'jk' => 'L',
                'tmp_lahir' => 'Yogyakarta',
                'tgl_lahir' => '1976-11-30',
                'gol_drh' => 'A',
                'agama' => 'ISLAM',
                'almt_tgl' => 'Jl. Rasuna Said No. 654, Jakarta Selatan',
                'no_telp' => '08567890123',
                'stts_nikah' => 'MENIKAH',
                'kd_sps' => 'SP004',
                'alumni' => 'Universitas Gadjah Mada',
                'no_ijn_praktek' => 'SIP/654/DKI/2020',
                'status' => '1',
            ],
            [
                'kd_dokter' => 'DR006',
                'nm_dokter' => 'Dr. Indira Putri, Sp.M',
                'jk' => 'P',
                'tmp_lahir' => 'Malang',
                'tgl_lahir' => '1984-04-18',
                'gol_drh' => 'B',
                'agama' => 'HINDU',
                'almt_tgl' => 'Jl. HR Rasuna Said No. 987, Jakarta Selatan',
                'no_telp' => '08678901234',
                'stts_nikah' => 'BELUM MENIKAH',
                'kd_sps' => 'M001',
                'alumni' => 'Universitas Brawijaya',
                'no_ijn_praktek' => 'SIP/987/DKI/2023',
                'status' => '1',
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::updateOrCreate(
                ['kd_dokter' => $doctor['kd_dokter']],
                $doctor
            );
        }

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('Doctor seeder completed successfully!');
    }
}
