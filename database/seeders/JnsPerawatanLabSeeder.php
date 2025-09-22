<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JnsPerawatanLab;

class JnsPerawatanLabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jenisPerawatan = [
            [
                'kd_jenis_prw' => 'LAB001',
                'nm_perawatan' => 'Hematologi Lengkap',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 25000,
                'tarif_tindakandr' => 15000,
                'tarif_tindakanpr' => 10000,
                'kso' => 0,
                'menejemen' => 5000,
                'total_byrdr' => 45000,
                'total_byrpr' => 40000,
                'total_byrdrpr' => 55000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB001',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB002',
                'nm_perawatan' => 'Kimia Darah Lengkap',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 35000,
                'tarif_tindakandr' => 20000,
                'tarif_tindakanpr' => 15000,
                'kso' => 0,
                'menejemen' => 8000,
                'total_byrdr' => 63000,
                'total_byrpr' => 58000,
                'total_byrdrpr' => 78000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB002',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB003',
                'nm_perawatan' => 'Gula Darah Sewaktu',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 15000,
                'tarif_tindakandr' => 10000,
                'tarif_tindakanpr' => 8000,
                'kso' => 0,
                'menejemen' => 3000,
                'total_byrdr' => 28000,
                'total_byrpr' => 26000,
                'total_byrdrpr' => 36000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB003',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB004',
                'nm_perawatan' => 'Gula Darah Puasa',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 15000,
                'tarif_tindakandr' => 10000,
                'tarif_tindakanpr' => 8000,
                'kso' => 0,
                'menejemen' => 3000,
                'total_byrdr' => 28000,
                'total_byrpr' => 26000,
                'total_byrdrpr' => 36000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB004',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB005',
                'nm_perawatan' => 'Kolesterol Total',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 20000,
                'tarif_tindakandr' => 12000,
                'tarif_tindakanpr' => 10000,
                'kso' => 0,
                'menejemen' => 4000,
                'total_byrdr' => 36000,
                'total_byrpr' => 34000,
                'total_byrdrpr' => 46000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB005',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB006',
                'nm_perawatan' => 'Fungsi Ginjal (Ureum, Kreatinin)',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 30000,
                'tarif_tindakandr' => 18000,
                'tarif_tindakanpr' => 15000,
                'kso' => 0,
                'menejemen' => 6000,
                'total_byrdr' => 54000,
                'total_byrpr' => 51000,
                'total_byrdrpr' => 69000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB006',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB007',
                'nm_perawatan' => 'Fungsi Hati (SGOT, SGPT)',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 28000,
                'tarif_tindakandr' => 16000,
                'tarif_tindakanpr' => 12000,
                'kso' => 0,
                'menejemen' => 5000,
                'total_byrdr' => 49000,
                'total_byrpr' => 45000,
                'total_byrdrpr' => 61000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB007',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB008',
                'nm_perawatan' => 'Urinalisis Lengkap',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 18000,
                'tarif_tindakandr' => 12000,
                'tarif_tindakanpr' => 10000,
                'kso' => 0,
                'menejemen' => 4000,
                'total_byrdr' => 34000,
                'total_byrpr' => 32000,
                'total_byrdrpr' => 44000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB008',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB009',
                'nm_perawatan' => 'Asam Urat',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 16000,
                'tarif_tindakandr' => 10000,
                'tarif_tindakanpr' => 8000,
                'kso' => 0,
                'menejemen' => 3000,
                'total_byrdr' => 29000,
                'total_byrpr' => 27000,
                'total_byrdrpr' => 37000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB009',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB010',
                'nm_perawatan' => 'HbA1c (Gula Darah 3 Bulan)',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 45000,
                'tarif_tindakandr' => 25000,
                'tarif_tindakanpr' => 20000,
                'kso' => 0,
                'menejemen' => 10000,
                'total_byrdr' => 80000,
                'total_byrpr' => 75000,
                'total_byrdrpr' => 100000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB010',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB011',
                'nm_perawatan' => 'Trigliserida',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 22000,
                'tarif_tindakandr' => 14000,
                'tarif_tindakanpr' => 12000,
                'kso' => 0,
                'menejemen' => 4000,
                'total_byrdr' => 40000,
                'total_byrpr' => 38000,
                'total_byrdrpr' => 52000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB011',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB012',
                'nm_perawatan' => 'HDL Kolesterol',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 24000,
                'tarif_tindakandr' => 15000,
                'tarif_tindakanpr' => 12000,
                'kso' => 0,
                'menejemen' => 5000,
                'total_byrdr' => 44000,
                'total_byrpr' => 41000,
                'total_byrdrpr' => 56000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB012',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB013',
                'nm_perawatan' => 'LDL Kolesterol',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 26000,
                'tarif_tindakandr' => 16000,
                'tarif_tindakanpr' => 14000,
                'kso' => 0,
                'menejemen' => 5000,
                'total_byrdr' => 47000,
                'total_byrpr' => 45000,
                'total_byrdrpr' => 61000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB013',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB014',
                'nm_perawatan' => 'Widal Test',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 32000,
                'tarif_tindakandr' => 18000,
                'tarif_tindakanpr' => 15000,
                'kso' => 0,
                'menejemen' => 6000,
                'total_byrdr' => 56000,
                'total_byrpr' => 53000,
                'total_byrdrpr' => 71000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB014',
                'status' => 'Aktif'
            ],
            [
                'kd_jenis_prw' => 'LAB015',
                'nm_perawatan' => 'Hepatitis B Surface Antigen',
                'bagian_rs' => 'Laboratorium',
                'bhp' => 55000,
                'tarif_tindakandr' => 30000,
                'tarif_tindakanpr' => 25000,
                'kso' => 0,
                'menejemen' => 12000,
                'total_byrdr' => 97000,
                'total_byrpr' => 92000,
                'total_byrdrpr' => 122000,
                'kd_pj' => 'BPJ',
                'kd_pcare' => 'LAB015',
                'status' => 'Aktif'
            ]
        ];

        foreach ($jenisPerawatan as $jenis) {
            JnsPerawatanLab::create($jenis);
        }

        $this->command->info('Jenis perawatan laboratorium berhasil dibuat!');
    }
}