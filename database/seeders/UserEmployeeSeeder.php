<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample employees first
        $employees = [
            [
                'nik' => 'EMP001',
                'nama' => 'John Doe',
                'jk' => 'Pria',
                'jbtn' => 'Administrator',
                'jnj_jabatan' => 'PLSN',
                'kode_kelompok' => 'AP',
                'kode_resiko' => 'I',
                'kode_emergency' => 'I',
                'departemen' => 'IT',
                'bidang' => 'Non Medis',
                'stts_wp' => 'K/0',
                'stts_kerja' => 'T',
                'npwp' => '123456789012345',
                'pendidikan' => 'D3 IT',
                'gapok' => '5000000',
                'tmp_lahir' => 'Jakarta',
                'tgl_lahir' => '1990-01-15',
                'alamat' => 'Jl. Sudirman No. 123',
                'kota' => 'Jakarta',
                'mulai_kerja' => '2020-01-01',
                'indexins' => 'IT',
                'bpd' => 'BPD',
                'rekening' => '1234567890',
                'stts_aktif' => 'AKTIF',
                'wajibmasuk' => '0',
                'pengurang' => '0',
                'indek' => '0',
                'mulai_kontrak' => '2020-01-01',
                'cuti_diambil' => '0',
                'dankes' => '0',
                'photo' => '',
                'no_ktp' => '1234567890123456',
            ],
            [
                'nik' => 'EMP002',
                'nama' => 'Jane Smith',
                'jk' => 'Wanita',
                'jbtn' => 'Dokter',
                'jnj_jabatan' => 'PJBP',
                'kode_kelompok' => 'SKP',
                'kode_resiko' => 'IV',
                'kode_emergency' => 'III',
                'departemen' => 'RJ',
                'bidang' => 'Medis',
                'stts_wp' => 'TK/0',
                'stts_kerja' => 'T',
                'npwp' => '123456789012346',
                'pendidikan' => 'S1 KEDOKTERAN',
                'gapok' => '8000000',
                'tmp_lahir' => 'Bandung',
                'tgl_lahir' => '1985-03-20',
                'alamat' => 'Jl. Asia Afrika No. 456',
                'kota' => 'Bandung',
                'mulai_kerja' => '2018-06-01',
                'indexins' => 'RJ',
                'bpd' => 'BPD',
                'rekening' => '1234567891',
                'stts_aktif' => 'AKTIF',
                'wajibmasuk' => '0',
                'pengurang' => '0',
                'indek' => '0',
                'mulai_kontrak' => '2018-06-01',
                'cuti_diambil' => '0',
                'dankes' => '0',
                'photo' => '',
                'no_ktp' => '1234567890123457',
            ],
        ];

        foreach ($employees as $employeeData) {
            Employee::firstOrCreate(
                ['nik' => $employeeData['nik']],
                $employeeData
            );
        }

        // Create or update users with NIK
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@faskesku.id',
                'password' => Hash::make('password'),
                'nik' => 'EMP001',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@faskesku.id',
                'password' => Hash::make('password'),
                'nik' => 'EMP002',
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@faskesku.id',
                'password' => Hash::make('password'),
                'nik' => null, // Admin without employee record
            ],
        ];

        foreach ($users as $userData) {
            $base = isset($userData['email']) ? Str::lower(Str::before($userData['email'], '@')) : Str::slug($userData['name'], '');
            $base = $base !== '' ? $base : Str::slug($userData['name'], '');
            $candidate = $base;
            $i = 1;
            while (User::where('username', $candidate)->exists()) {
                $candidate = $base.$i;
                $i++;
            }
            $userData['username'] = $candidate;

            User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }

        // Assign roles to users
        $adminUser = User::where('email', 'admin@faskesku.id')->first();
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }

        $johnUser = User::where('email', 'john.doe@faskesku.id')->first();
        if ($johnUser) {
            $johnUser->assignRole('admin');
        }

        $janeUser = User::where('email', 'jane.smith@faskesku.id')->first();
        if ($janeUser) {
            $janeUser->assignRole('dokter');
        }
    }
}
