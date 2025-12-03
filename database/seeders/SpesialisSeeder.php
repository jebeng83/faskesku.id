<?php

namespace Database\Seeders;

use App\Models\Spesialis;
use Illuminate\Database\Seeder;

class SpesialisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $spesialisList = [
            [
                'kd_sps' => 'SP001',
                'nm_sps' => 'Spesialis Jantung dan Pembuluh Darah',
            ],
            [
                'kd_sps' => 'SP002',
                'nm_sps' => 'Spesialis Anak',
            ],
            [
                'kd_sps' => 'SP003',
                'nm_sps' => 'Spesialis Penyakit Dalam',
            ],
            [
                'kd_sps' => 'SP004',
                'nm_sps' => 'Spesialis Bedah Umum',
            ],
            [
                'kd_sps' => 'SP005',
                'nm_sps' => 'Spesialis Kandungan dan Kebidanan',
            ],
            [
                'kd_sps' => 'SP006',
                'nm_sps' => 'Spesialis Mata',
            ],
            [
                'kd_sps' => 'SP007',
                'nm_sps' => 'Spesialis THT-KL',
            ],
            [
                'kd_sps' => 'SP008',
                'nm_sps' => 'Spesialis Kulit dan Kelamin',
            ],
            [
                'kd_sps' => 'SP009',
                'nm_sps' => 'Spesialis Saraf',
            ],
            [
                'kd_sps' => 'SP010',
                'nm_sps' => 'Spesialis Jiwa',
            ],
            [
                'kd_sps' => 'SP011',
                'nm_sps' => 'Spesialis Anestesiologi',
            ],
            [
                'kd_sps' => 'SP012',
                'nm_sps' => 'Spesialis Radiologi',
            ],
            [
                'kd_sps' => 'SP013',
                'nm_sps' => 'Spesialis Patologi Klinik',
            ],
            [
                'kd_sps' => 'SP014',
                'nm_sps' => 'Spesialis Orthopedi',
            ],
            [
                'kd_sps' => 'SP015',
                'nm_sps' => 'Spesialis Urologi',
            ],
        ];

        foreach ($spesialisList as $spesialis) {
            Spesialis::updateOrCreate(
                ['kd_sps' => $spesialis['kd_sps']],
                $spesialis
            );
        }

        $this->command->info('Spesialis seeder completed successfully!');
    }
}
