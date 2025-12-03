<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample patient data
        $patients = [
            [
                'no_rkm_medis' => '000001',
                'nm_pasien' => 'Ahmad Wijaya',
                'no_ktp' => '3171011234567890',
                'jk' => 'L',
                'tmp_lahir' => 'Jakarta',
                'tgl_lahir' => '1990-05-15',
                'nm_ibu' => 'Siti Aminah',
                'alamat' => 'Jl. Merdeka No. 123',
                'gol_darah' => 'O',
                'pekerjaan' => 'Karyawan Swasta',
                'stts_nikah' => 'MENIKAH',
                'agama' => 'Islam',
                'tgl_daftar' => now()->toDateString(),
                'no_tlp' => '081234567890',
                'umur' => '33 Th',
                'pnd' => 'S1',
                'keluarga' => 'DIRI SENDIRI',
                'namakeluarga' => 'Ahmad Wijaya',
                'kd_pj' => 'UMUM',
                'no_peserta' => '',
                'pekerjaanpj' => 'Karyawan Swasta',
                'alamatpj' => 'Jl. Merdeka No. 123',
                'kelurahanpj' => 'Menteng',
                'kecamatanpj' => 'Menteng',
                'kabupatenpj' => 'Jakarta Pusat',
                'propinsipj' => 'DKI Jakarta',
                'email' => 'ahmad.wijaya@email.com',
                'kd_kel' => 1,
                'kd_kec' => 1,
                'kd_kab' => 1,
                'perusahaan_pasien' => '00000000',
                'suku_bangsa' => 1,
                'bahasa_pasien' => 1,
                'cacat_fisik' => 0,
                'nip' => '',
                'kd_prop' => 1,
            ],
            [
                'no_rkm_medis' => '000002',
                'nm_pasien' => 'Siti Nurhaliza',
                'no_ktp' => '3171011234567891',
                'jk' => 'P',
                'tmp_lahir' => 'Bandung',
                'tgl_lahir' => '1985-08-20',
                'nm_ibu' => 'Rohani',
                'alamat' => 'Jl. Asia Afrika No. 456',
                'gol_darah' => 'A',
                'pekerjaan' => 'Guru',
                'stts_nikah' => 'MENIKAH',
                'agama' => 'Islam',
                'tgl_daftar' => now()->toDateString(),
                'no_tlp' => '081234567891',
                'umur' => '38 Th',
                'pnd' => 'S1',
                'keluarga' => 'DIRI SENDIRI',
                'namakeluarga' => 'Siti Nurhaliza',
                'kd_pj' => 'UMUM',
                'no_peserta' => '',
                'pekerjaanpj' => 'Guru',
                'alamatpj' => 'Jl. Asia Afrika No. 456',
                'kelurahanpj' => 'Braga',
                'kecamatanpj' => 'Sumur Bandung',
                'kabupatenpj' => 'Bandung',
                'propinsipj' => 'Jawa Barat',
                'email' => 'siti.nurhaliza@email.com',
                'kd_kel' => 1,
                'kd_kec' => 1,
                'kd_kab' => 1,
                'perusahaan_pasien' => '00000000',
                'suku_bangsa' => 1,
                'bahasa_pasien' => 1,
                'cacat_fisik' => 0,
                'nip' => '',
                'kd_prop' => 1,
            ],
            [
                'no_rkm_medis' => '000003',
                'nm_pasien' => 'Budi Santoso',
                'no_ktp' => '3171011234567892',
                'jk' => 'L',
                'tmp_lahir' => 'Surabaya',
                'tgl_lahir' => '1992-12-10',
                'nm_ibu' => 'Mariyam',
                'alamat' => 'Jl. Diponegoro No. 789',
                'gol_darah' => 'B',
                'pekerjaan' => 'Wiraswasta',
                'stts_nikah' => 'BELUM MENIKAH',
                'agama' => 'Islam',
                'tgl_daftar' => now()->toDateString(),
                'no_tlp' => '081234567892',
                'umur' => '31 Th',
                'pnd' => 'SMA',
                'keluarga' => 'DIRI SENDIRI',
                'namakeluarga' => 'Budi Santoso',
                'kd_pj' => 'UMUM',
                'no_peserta' => '',
                'pekerjaanpj' => 'Wiraswasta',
                'alamatpj' => 'Jl. Diponegoro No. 789',
                'kelurahanpj' => 'Genteng',
                'kecamatanpj' => 'Genteng',
                'kabupatenpj' => 'Surabaya',
                'propinsipj' => 'Jawa Timur',
                'email' => 'budi.santoso@email.com',
                'kd_kel' => 1,
                'kd_kec' => 1,
                'kd_kab' => 1,
                'perusahaan_pasien' => '00000000',
                'suku_bangsa' => 1,
                'bahasa_pasien' => 1,
                'cacat_fisik' => 0,
                'nip' => '',
                'kd_prop' => 1,
            ],
        ];

        foreach ($patients as $patientData) {
            Patient::updateOrCreate(
                ['no_rkm_medis' => $patientData['no_rkm_medis']],
                $patientData
            );
        }
    }
}
