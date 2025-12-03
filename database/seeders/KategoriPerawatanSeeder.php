<?php

namespace Database\Seeders;

use App\Models\KategoriPerawatan;
use Illuminate\Database\Seeder;

class KategoriPerawatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoris = [
            [
                'kd_kategori' => 'KT001',
                'nm_kategori' => 'Pemeriksaan Umum',
            ],
            [
                'kd_kategori' => 'KT002',
                'nm_kategori' => 'Pemeriksaan Khusus',
            ],
            [
                'kd_kategori' => 'KT003',
                'nm_kategori' => 'Tindakan Medis',
            ],
            [
                'kd_kategori' => 'KT004',
                'nm_kategori' => 'Laboratorium',
            ],
            [
                'kd_kategori' => 'KT005',
                'nm_kategori' => 'Radiologi',
            ],
            [
                'kd_kategori' => 'KT006',
                'nm_kategori' => 'Rehabilitasi Medik',
            ],
            [
                'kd_kategori' => 'KT007',
                'nm_kategori' => 'Operasi',
            ],
            [
                'kd_kategori' => 'KT008',
                'nm_kategori' => 'Rawat Inap',
            ],
        ];

        foreach ($kategoris as $kategori) {
            KategoriPerawatan::create($kategori);
        }
    }
}
