<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Penjab;
use App\Models\Poliklinik;

class JenisPerawatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil data penjab dan poliklinik pertama sebagai default
        $penjab = Penjab::first();
        $poliklinik = Poliklinik::first();

        // Jika tidak ada data penjab atau poliklinik, skip seeding
        if (!$penjab || !$poliklinik) {
            $this->command->warn('Tidak ada data Penjab atau Poliklinik. Jalankan seeder tersebut terlebih dahulu.');
            return;
        }

        $jenisPerawatan = [
            // Data Rawat Jalan (RJ)
            [
                'kd_jenis_prw' => 'RJ001',
                'nm_perawatan' => 'Pendaftaran Pasien Baru',
                'kd_kategori' => 'RJ',
                'material' => 0,
                'bhp' => 5000,
                'tarif_tindakandr' => 0,
                'tarif_tindakanpr' => 10000,
                'kso' => 0,
                'menejemen' => 5000,
                'total_byrdr' => 10000,
                'total_byrpr' => 20000,
                'total_byrdrpr' => 20000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'RJ002',
                'nm_perawatan' => 'Konsultasi Dokter Umum',
                'kd_kategori' => 'RJ',
                'material' => 0,
                'bhp' => 10000,
                'tarif_tindakandr' => 75000,
                'tarif_tindakanpr' => 25000,
                'kso' => 0,
                'menejemen' => 15000,
                'total_byrdr' => 100000,
                'total_byrpr' => 50000,
                'total_byrdrpr' => 125000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'RJ003',
                'nm_perawatan' => 'Konsultasi Dokter Spesialis',
                'kd_kategori' => 'RJ',
                'material' => 0,
                'bhp' => 15000,
                'tarif_tindakandr' => 200000,
                'tarif_tindakanpr' => 50000,
                'kso' => 0,
                'menejemen' => 25000,
                'total_byrdr' => 240000,
                'total_byrpr' => 90000,
                'total_byrdrpr' => 290000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'RJ004',
                'nm_perawatan' => 'Pemeriksaan Kesehatan Umum',
                'kd_kategori' => 'RJ',
                'material' => 0,
                'bhp' => 20000,
                'tarif_tindakandr' => 100000,
                'tarif_tindakanpr' => 30000,
                'kso' => 0,
                'menejemen' => 20000,
                'total_byrdr' => 140000,
                'total_byrpr' => 70000,
                'total_byrdrpr' => 170000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            // Data Rawat Inap (RI)
            [
                'kd_jenis_prw' => 'RI001',
                'nm_perawatan' => 'Rawat Inap Kelas III',
                'kd_kategori' => 'RI',
                'material' => 0,
                'bhp' => 50000,
                'tarif_tindakandr' => 150000,
                'tarif_tindakanpr' => 100000,
                'kso' => 0,
                'menejemen' => 50000,
                'total_byrdr' => 250000,
                'total_byrpr' => 200000,
                'total_byrdrpr' => 350000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'RI002',
                'nm_perawatan' => 'Rawat Inap Kelas II',
                'kd_kategori' => 'RI',
                'material' => 0,
                'bhp' => 75000,
                'tarif_tindakandr' => 200000,
                'tarif_tindakanpr' => 125000,
                'kso' => 0,
                'menejemen' => 75000,
                'total_byrdr' => 350000,
                'total_byrpr' => 275000,
                'total_byrdrpr' => 475000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'RI003',
                'nm_perawatan' => 'Rawat Inap Kelas I',
                'kd_kategori' => 'RI',
                'material' => 0,
                'bhp' => 100000,
                'tarif_tindakandr' => 300000,
                'tarif_tindakanpr' => 150000,
                'kso' => 0,
                'menejemen' => 100000,
                'total_byrdr' => 500000,
                'total_byrpr' => 350000,
                'total_byrdrpr' => 650000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            // Data Operasi (OP)
            [
                'kd_jenis_prw' => 'OP001',
                'nm_perawatan' => 'Operasi Kecil',
                'kd_kategori' => 'OP',
                'material' => 200000,
                'bhp' => 150000,
                'tarif_tindakandr' => 1000000,
                'tarif_tindakanpr' => 300000,
                'kso' => 100000,
                'menejemen' => 200000,
                'total_byrdr' => 1650000,
                'total_byrpr' => 950000,
                'total_byrdrpr' => 1950000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'OP002',
                'nm_perawatan' => 'Operasi Sedang',
                'kd_kategori' => 'OP',
                'material' => 500000,
                'bhp' => 300000,
                'tarif_tindakandr' => 2500000,
                'tarif_tindakanpr' => 750000,
                'kso' => 250000,
                'menejemen' => 500000,
                'total_byrdr' => 3750000,
                'total_byrpr' => 2300000,
                'total_byrdrpr' => 4800000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            // Data Kamar (KMR)
            [
                'kd_jenis_prw' => 'KMR001',
                'nm_perawatan' => 'Sewa Kamar VIP',
                'kd_kategori' => 'KMR',
                'material' => 0,
                'bhp' => 50000,
                'tarif_tindakandr' => 0,
                'tarif_tindakanpr' => 100000,
                'kso' => 0,
                'menejemen' => 200000,
                'total_byrdr' => 350000,
                'total_byrpr' => 350000,
                'total_byrdrpr' => 350000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'KMR002',
                'nm_perawatan' => 'Sewa Kamar Kelas I',
                'kd_kategori' => 'KMR',
                'material' => 0,
                'bhp' => 30000,
                'tarif_tindakandr' => 0,
                'tarif_tindakanpr' => 75000,
                'kso' => 0,
                'menejemen' => 150000,
                'total_byrdr' => 255000,
                'total_byrpr' => 255000,
                'total_byrdrpr' => 255000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            // Data yang sudah ada sebelumnya
            [
                'kd_jenis_prw' => 'KONSUL001',
                'nm_perawatan' => 'Konsultasi Dokter Umum',
                'kd_kategori' => 'KONSUL',
                'material' => 0,
                'bhp' => 5000,
                'tarif_tindakandr' => 50000,
                'tarif_tindakanpr' => 25000,
                'kso' => 0,
                'menejemen' => 10000,
                'total_byrdr' => 65000,
                'total_byrpr' => 40000,
                'total_byrdrpr' => 90000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'KONSUL002',
                'nm_perawatan' => 'Konsultasi Dokter Spesialis',
                'kd_kategori' => 'KONSUL',
                'material' => 0,
                'bhp' => 10000,
                'tarif_tindakandr' => 150000,
                'tarif_tindakanpr' => 50000,
                'kso' => 0,
                'menejemen' => 25000,
                'total_byrdr' => 185000,
                'total_byrpr' => 85000,
                'total_byrdrpr' => 235000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'LAB001',
                'nm_perawatan' => 'Pemeriksaan Darah Lengkap',
                'kd_kategori' => 'LAB',
                'material' => 15000,
                'bhp' => 10000,
                'tarif_tindakandr' => 0,
                'tarif_tindakanpr' => 30000,
                'kso' => 5000,
                'menejemen' => 10000,
                'total_byrdr' => 40000,
                'total_byrpr' => 70000,
                'total_byrdrpr' => 70000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'RAD001',
                'nm_perawatan' => 'Foto Rontgen Thorax',
                'kd_kategori' => 'RAD',
                'material' => 25000,
                'bhp' => 15000,
                'tarif_tindakandr' => 75000,
                'tarif_tindakanpr' => 40000,
                'kso' => 0,
                'menejemen' => 15000,
                'total_byrdr' => 130000,
                'total_byrpr' => 95000,
                'total_byrdrpr' => 155000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'TIND001',
                'nm_perawatan' => 'Perawatan Luka Kecil',
                'kd_kategori' => 'TIND',
                'material' => 20000,
                'bhp' => 15000,
                'tarif_tindakandr' => 50000,
                'tarif_tindakanpr' => 35000,
                'kso' => 0,
                'menejemen' => 10000,
                'total_byrdr' => 95000,
                'total_byrpr' => 80000,
                'total_byrdrpr' => 130000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'TIND002',
                'nm_perawatan' => 'Jahit Luka',
                'kd_kategori' => 'TIND',
                'material' => 30000,
                'bhp' => 25000,
                'tarif_tindakandr' => 100000,
                'tarif_tindakanpr' => 50000,
                'kso' => 0,
                'menejemen' => 15000,
                'total_byrdr' => 170000,
                'total_byrpr' => 120000,
                'total_byrdrpr' => 220000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'OBAT001',
                'nm_perawatan' => 'Pemberian Obat Injeksi',
                'kd_kategori' => 'OBAT',
                'material' => 50000,
                'bhp' => 10000,
                'tarif_tindakandr' => 25000,
                'tarif_tindakanpr' => 20000,
                'kso' => 0,
                'menejemen' => 5000,
                'total_byrdr' => 90000,
                'total_byrpr' => 85000,
                'total_byrdrpr' => 110000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'FISIO001',
                'nm_perawatan' => 'Fisioterapi Dasar',
                'kd_kategori' => 'FISIO',
                'material' => 0,
                'bhp' => 20000,
                'tarif_tindakandr' => 0,
                'tarif_tindakanpr' => 75000,
                'kso' => 0,
                'menejemen' => 15000,
                'total_byrdr' => 35000,
                'total_byrpr' => 110000,
                'total_byrdrpr' => 110000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'GIGI001',
                'nm_perawatan' => 'Pemeriksaan Gigi',
                'kd_kategori' => 'GIGI',
                'material' => 10000,
                'bhp' => 15000,
                'tarif_tindakandr' => 75000,
                'tarif_tindakanpr' => 25000,
                'kso' => 0,
                'menejemen' => 10000,
                'total_byrdr' => 110000,
                'total_byrpr' => 60000,
                'total_byrdrpr' => 135000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ],
            [
                'kd_jenis_prw' => 'GIGI002',
                'nm_perawatan' => 'Cabut Gigi',
                'kd_kategori' => 'GIGI',
                'material' => 25000,
                'bhp' => 30000,
                'tarif_tindakandr' => 150000,
                'tarif_tindakanpr' => 50000,
                'kso' => 0,
                'menejemen' => 20000,
                'total_byrdr' => 225000,
                'total_byrpr' => 125000,
                'total_byrdrpr' => 275000,
                'kd_pj' => $penjab->kd_pj,
                'kd_poli' => $poliklinik->kd_poli,
                'status' => '1'
            ]
        ];

        foreach ($jenisPerawatan as $data) {
            DB::table('jns_perawatan')->updateOrCreate(
                ['kd_jenis_prw' => $data['kd_jenis_prw']],
                $data
            );
        }

        $this->command->info('Data jenis perawatan berhasil di-seed!');
    }
}