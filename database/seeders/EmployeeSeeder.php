<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $jabatan = [
            'Dokter Umum',
            'Dokter Spesialis',
            'Perawat',
            'Bidan',
            'Apoteker',
            'Radiografer',
            'Analis Lab',
            'Fisioterapis',
            'Nutritionist',
            'Admin',
            'Resepsionis',
            'Kasir',
            'IT Support',
            'Cleaning Service',
            'Security',
            'Driver',
            'Maintenance'
        ];

        $departemen = [
            'Poliklinik Umum',
            'Poliklinik Gigi',
            'Poliklinik Mata',
            'Poliklinik THT',
            'Poliklinik Kulit',
            'Poliklinik Jiwa',
            'UGD',
            'Rawat Inap',
            'Farmasi',
            'Laboratorium',
            'Radiologi',
            'Fisioterapi',
            'Administrasi',
            'Keuangan',
            'IT',
            'Umum'
        ];

        $universitas = [
            'Universitas Indonesia',
            'Universitas Gadjah Mada',
            'Institut Teknologi Bandung',
            'Universitas Airlangga',
            'Universitas Padjadjaran',
            'Universitas Diponegoro',
            'Universitas Brawijaya',
            'Universitas Sebelas Maret',
            'Universitas Hasanuddin',
            'Universitas Andalas',
            'Universitas Sumatera Utara',
            'Universitas Sriwijaya'
        ];

        $pendidikan = ['SMA', 'D3', 'D4', 'S1', 'S2', 'S3'];
        $bank = ['BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB Niaga', 'Danamon', 'Permata', 'BTN'];

        for ($i = 1; $i <= 50; $i++) {
            $tanggalLahir = $faker->dateTimeBetween('-60 years', '-20 years');
            $tanggalMasuk = $faker->dateTimeBetween('-10 years', 'now');
            $selectedJabatan = $faker->randomElement($jabatan);
            $selectedDepartemen = $faker->randomElement($departemen);
            $jenisKelamin = $faker->randomElement(['L', 'P']);
            $namaLengkap = $jenisKelamin === 'L' ? $faker->name('male') : $faker->name('female');

            Employee::create([
                'nip' => str_pad($i, 6, '0', STR_PAD_LEFT),
                'nama_lengkap' => $namaLengkap,
                'nama_panggilan' => $faker->firstName,
                'jenis_kelamin' => $jenisKelamin,
                'tempat_lahir' => $faker->city,
                'tanggal_lahir' => $tanggalLahir->format('Y-m-d'),
                'alamat' => $faker->address,
                'no_telepon' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'jabatan' => $selectedJabatan,
                'departemen' => $selectedDepartemen,
                'status_karyawan' => $faker->randomElement(['TETAP', 'KONTRAK', 'MAGANG', 'HONORER']),
                'tanggal_masuk' => $tanggalMasuk->format('Y-m-d'),
                'tanggal_keluar' => $faker->optional(0.1)->dateTimeBetween($tanggalMasuk, 'now')?->format('Y-m-d'),
                'status_aktif' => $faker->randomElement(['AKTIF', 'NONAKTIF', 'CUTI', 'RESIGN']),
                'pendidikan_terakhir' => $faker->randomElement($pendidikan),
                'universitas' => $faker->randomElement($universitas),
                'no_rekening' => $faker->numerify('##########'),
                'bank' => $faker->randomElement($bank),
                'nama_rekening' => $namaLengkap,
                'foto' => null,
                'catatan' => $faker->optional(0.3)->sentence,
            ]);
        }
    }
}
