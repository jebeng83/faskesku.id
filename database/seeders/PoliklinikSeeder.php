<?php

namespace Database\Seeders;

use App\Models\Poliklinik;
use Illuminate\Database\Seeder;

class PoliklinikSeeder extends Seeder
{
    public function run()
    {
        $polikliniks = [
            [
                'kd_poli' => 'P001',
                'nm_poli' => 'Poli Penyakit Dalam',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P002',
                'nm_poli' => 'Poli Kandungan',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P003',
                'nm_poli' => 'Poli Anak',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P004',
                'nm_poli' => 'Poli Jiwa',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P005',
                'nm_poli' => 'Poli Bedah',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P006',
                'nm_poli' => 'Poli Mata',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P007',
                'nm_poli' => 'Poli THT',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P008',
                'nm_poli' => 'Poli Kulit dan Kelamin',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P009',
                'nm_poli' => 'Poli Saraf',
                'status' => '1',
            ],
            [
                'kd_poli' => 'P010',
                'nm_poli' => 'Poli Jantung',
                'status' => '1',
            ],
        ];

        foreach ($polikliniks as $poliklinik) {
            Poliklinik::create($poliklinik);
        }
    }
}
