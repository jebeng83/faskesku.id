<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;

class EmployeeDummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks temporarily
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $employees = [
            // Existing employees
            [
                'nik' => 'PEG001',
                'nama' => 'Dr. Ahmad Fauzi',
                'jk' => 'Pria',
                'tmp_lahir' => 'Jakarta',
                'tgl_lahir' => '1975-05-15',
                'alamat' => 'Jl. Sudirman No. 123, Jakarta Pusat',
            ],
            [
                'nik' => 'PEG002',
                'nama' => 'Dr. Sari Dewi',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Surabaya',
                'tgl_lahir' => '1980-03-20',
                'alamat' => 'Jl. Thamrin No. 456, Jakarta Pusat',
            ],
            [
                'nik' => 'PEG003',
                'nama' => 'Dr. Budi Santoso',
                'jk' => 'Pria',
                'tmp_lahir' => 'Bandung',
                'tgl_lahir' => '1978-12-10',
                'alamat' => 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
            ],
            [
                'nik' => 'PEG004',
                'nama' => 'Dr. Maya Sari',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Medan',
                'tgl_lahir' => '1982-08-25',
                'alamat' => 'Jl. Kuningan No. 321, Jakarta Selatan',
            ],
            // Additional employees for testing search
            [
                'nik' => 'PEG005',
                'nama' => 'Dr. Andi Wijaya',
                'jk' => 'Pria',
                'tmp_lahir' => 'Makassar',
                'tgl_lahir' => '1977-09-12',
                'alamat' => 'Jl. Diponegoro No. 88, Jakarta Timur',
            ],
            [
                'nik' => 'PEG006',
                'nama' => 'Dr. Lisa Permata',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Padang',
                'tgl_lahir' => '1983-02-14',
                'alamat' => 'Jl. Cikini No. 45, Jakarta Pusat',
            ],
            [
                'nik' => 'PEG007',
                'nama' => 'Dr. Reza Pratama',
                'jk' => 'Pria',
                'tmp_lahir' => 'Palembang',
                'tgl_lahir' => '1979-06-30',
                'alamat' => 'Jl. Kemang No. 67, Jakarta Selatan',
            ],
            [
                'nik' => 'PEG008',
                'nama' => 'Dr. Nina Kartika',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Yogyakarta',
                'tgl_lahir' => '1981-11-22',
                'alamat' => 'Jl. Menteng No. 123, Jakarta Pusat',
            ],
            [
                'nik' => 'PEG009',
                'nama' => 'Dr. Hendra Kusuma',
                'jk' => 'Pria',
                'tmp_lahir' => 'Solo',
                'tgl_lahir' => '1976-04-08',
                'alamat' => 'Jl. Senayan No. 90, Jakarta Selatan',
            ],
            [
                'nik' => 'PEG010',
                'nama' => 'Dr. Putri Maharani',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Denpasar',
                'tgl_lahir' => '1985-07-17',
                'alamat' => 'Jl. Pantai Indah No. 234, Jakarta Utara',
            ],
            [
                'nik' => 'PEG011',
                'nama' => 'Dr. Fajar Nugraha',
                'jk' => 'Pria',
                'tmp_lahir' => 'Semarang',
                'tgl_lahir' => '1978-10-05',
                'alamat' => 'Jl. Kelapa Gading No. 156, Jakarta Utara',
            ],
            [
                'nik' => 'PEG012',
                'nama' => 'Dr. Anisa Rahman',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Batam',
                'tgl_lahir' => '1984-12-03',
                'alamat' => 'Jl. Pondok Indah No. 78, Jakarta Selatan',
            ],
            [
                'nik' => 'PEG013',
                'nama' => 'Dr. Bayu Setiawan',
                'jk' => 'Pria',
                'tmp_lahir' => 'Malang',
                'tgl_lahir' => '1980-01-28',
                'alamat' => 'Jl. Cipete No. 45, Jakarta Selatan',
            ],
            [
                'nik' => 'PEG014',
                'nama' => 'Dr. Citra Melati',
                'jk' => 'Wanita',
                'tmp_lahir' => 'Bogor',
                'tgl_lahir' => '1982-08-16',
                'alamat' => 'Jl. Pejaten No. 89, Jakarta Selatan',
            ],
            [
                'nik' => 'PEG015',
                'nama' => 'Dr. Dedi Kurniawan',
                'jk' => 'Pria',
                'tmp_lahir' => 'Tangerang',
                'tgl_lahir' => '1977-03-11',
                'alamat' => 'Jl. Bintaro No. 123, Jakarta Selatan',
            ]
        ];

        foreach ($employees as $employee) {
            Employee::updateOrCreate(
                ['nik' => $employee['nik']],
                $employee
            );
        }

        // Re-enable foreign key checks
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('Employee dummy seeder completed successfully!');
    }
}
