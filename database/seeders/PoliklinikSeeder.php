<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Poliklinik;

class PoliklinikSeeder extends Seeder
{
    public function run()
    {
        $polikliniks = [
            [
                'kd_poli' => 'P001',
                'nm_poli' => 'Poli Penyakit Dalam',
                'lantai' => '1',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P002',
                'nm_poli' => 'Poli Kandungan',
                'lantai' => '2',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P003',
                'nm_poli' => 'Poli Anak',
                'lantai' => '2',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P004',
                'nm_poli' => 'Poli Jiwa',
                'lantai' => '3',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P005',
                'nm_poli' => 'Poli Bedah',
                'lantai' => '1',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P006',
                'nm_poli' => 'Poli Mata',
                'lantai' => '2',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P007',
                'nm_poli' => 'Poli THT',
                'lantai' => '2',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P008',
                'nm_poli' => 'Poli Kulit dan Kelamin',
                'lantai' => '3',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P009',
                'nm_poli' => 'Poli Saraf',
                'lantai' => '3',
                'status' => '1'
            ],
            [
                'kd_poli' => 'P010',
                'nm_poli' => 'Poli Jantung',
                'lantai' => '1',
                'status' => '1'
            ]
        ];

        foreach ($polikliniks as $poliklinik) {
            Poliklinik::create($poliklinik);
        }
    }
}
