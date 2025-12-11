<?php

/**
 * Test Script untuk Model RegPeriksa
 *
 * Script ini menunjukkan cara menggunakan model RegPeriksa
 * dan fitur perhitungan umur otomatis
 */

require_once 'vendor/autoload.php';

use App\Models\RegPeriksa;

// Simulasi data untuk testing
echo "=== Test Model RegPeriksa ===\n\n";

// 1. Test perhitungan umur
echo "1. Test Perhitungan Umur:\n";
echo "----------------------------\n";

$regPeriksa = new RegPeriksa;

// Test case 1: Umur dalam tahun
$umur1 = $regPeriksa->hitungUmur('1990-01-15', '2024-01-15');
echo "Tanggal lahir: 1990-01-15, Tanggal registrasi: 2024-01-15\n";
echo "Hasil: {$umur1['umur']} {$umur1['satuan']} ({$umur1['umur_display']})\n\n";

// Test case 2: Umur dalam bulan
$umur2 = $regPeriksa->hitungUmur('2023-06-15', '2024-01-15');
echo "Tanggal lahir: 2023-06-15, Tanggal registrasi: 2024-01-15\n";
echo "Hasil: {$umur2['umur']} {$umur2['satuan']} ({$umur2['umur_display']})\n\n";

// Test case 3: Umur dalam hari
$umur3 = $regPeriksa->hitungUmur('2024-01-10', '2024-01-15');
echo "Tanggal lahir: 2024-01-10, Tanggal registrasi: 2024-01-15\n";
echo "Hasil: {$umur3['umur']} {$umur3['satuan']} ({$umur3['umur_display']})\n\n";

// 2. Test enum values
echo "2. Test Enum Values:\n";
echo "--------------------\n";

$statusOptions = [
    'stts' => ['Belum', 'Sudah', 'Batal', 'Berkas Diterima', 'Dirujuk', 'Meninggal', 'Dirawat', 'Pulang Paksa'],
    'stts_daftar' => ['-', 'Lama', 'Baru'],
    'status_lanjut' => ['Ralan', 'Ranap'],
    'sttsumur' => ['Th', 'Bl', 'Hr'],
    'status_bayar' => ['Sudah Bayar', 'Belum Bayar'],
    'status_poli' => ['Lama', 'Baru'],
];

foreach ($statusOptions as $field => $options) {
    echo "{$field}: ".implode(', ', $options)."\n";
}

echo "\n";

// 3. Test data structure
echo "3. Test Data Structure:\n";
echo "------------------------\n";

$sampleData = [
    'no_reg' => 'REG001',
    'no_rawat' => 'RAWAT001',
    'tgl_registrasi' => '2024-01-15',
    'jam_reg' => '08:00:00',
    'kd_dokter' => 'D001',
    'no_rkm_medis' => 'P001',
    'kd_poli' => 'P001',
    'p_jawab' => 'John Doe',
    'almt_pj' => 'Jl. Merdeka No. 123',
    'hubunganpj' => 'Diri Sendiri',
    'biaya_reg' => 50000,
    'stts' => 'Belum',
    'stts_daftar' => 'Baru',
    'status_lanjut' => 'Ralan',
    'kd_pj' => 'PJ1',
    'umurdaftar' => 34,
    'sttsumur' => 'Th',
    'status_bayar' => 'Belum Bayar',
    'status_poli' => 'Baru',
];

echo "Sample data structure:\n";
foreach ($sampleData as $key => $value) {
    echo "  {$key}: {$value}\n";
}

echo "\n";

// 4. Test accessor methods
echo "4. Test Accessor Methods:\n";
echo "--------------------------\n";

// Simulasi object dengan data
$regPeriksa = new RegPeriksa($sampleData);

// Test umur display
echo 'Umur display: '.$regPeriksa->umur_display."\n";
echo 'Umur singkat: '.$regPeriksa->umur_singkat."\n";

// Test status display
echo 'Status display: '.$regPeriksa->status_display."\n";
echo 'Status daftar display: '.$regPeriksa->status_daftar_display."\n";
echo 'Status lanjut display: '.$regPeriksa->status_lanjut_display."\n";
echo 'Status bayar display: '.$regPeriksa->status_bayar_display."\n";
echo 'Status poli display: '.$regPeriksa->status_poli_display."\n";

echo "\n";

// 5. Test query scopes (simulasi)
echo "5. Test Query Scopes:\n";
echo "----------------------\n";

echo "Available scopes:\n";
echo "  - byStatus(status)\n";
echo "  - byStatusDaftar(status_daftar)\n";
echo "  - byStatusLanjut(status_lanjut)\n";
echo "  - byDokter(kd_dokter)\n";
echo "  - byPoli(kd_poli)\n";
echo "  - byStatusBayar(status_bayar)\n";
echo "  - byTanggalRegistrasi(tanggal)\n";
echo "  - byRangeTanggal(tanggal_awal, tanggal_akhir)\n";

echo "\n";

// 6. Test API endpoints
echo "6. Test API Endpoints:\n";
echo "-----------------------\n";

echo "Web Routes:\n";
echo "  GET    /reg-periksa              - Index\n";
echo "  GET    /reg-periksa/create       - Create form\n";
echo "  POST   /reg-periksa              - Store\n";
echo "  GET    /reg-periksa/{id}         - Show\n";
echo "  GET    /reg-periksa/{id}/edit    - Edit form\n";
echo "  PUT    /reg-periksa/{id}         - Update\n";
echo "  DELETE /reg-periksa/{id}         - Destroy\n";
echo "  POST   /reg-periksa/hitung-umur  - Hitung umur\n";
echo "  GET    /reg-periksa-statistik    - Statistik\n";

echo "\nAPI Routes:\n";
echo "  GET    /api/reg-periksa          - List dengan filter\n";
echo "  POST   /api/reg-periksa          - Create\n";
echo "  GET    /api/reg-periksa/{id}     - Show\n";
echo "  PUT    /api/reg-periksa/{id}     - Update\n";
echo "  DELETE /api/reg-periksa/{id}     - Destroy\n";
echo "  POST   /api/reg-periksa/hitung-umur - Hitung umur\n";
echo "  GET    /api/reg-periksa/statistik - Statistik\n";
echo "  GET    /api/reg-periksa/filter-data - Data filter\n";

echo "\n";

// 7. Test validation rules
echo "7. Test Validation Rules:\n";
echo "--------------------------\n";

$validationRules = [
    'no_reg' => 'required|string|max:8|unique:reg_periksa,no_reg',
    'no_rawat' => 'required|string|max:17|unique:reg_periksa,no_rawat',
    'tgl_registrasi' => 'required|date',
    'jam_reg' => 'required|date_format:H:i',
    'kd_dokter' => 'required|string|exists:dokter,kd_dokter',
    'no_rkm_medis' => 'required|string|exists:patients,no_rkm_medis',
    'kd_poli' => 'required|string|exists:poliklinik,kd_poli',
    'p_jawab' => 'required|string|max:100',
    'almt_pj' => 'required|string|max:200',
    'hubunganpj' => 'required|string|max:20',
    'biaya_reg' => 'required|numeric|min:0',
    'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
    'stts_daftar' => 'required|in:-,Lama,Baru',
    'status_lanjut' => 'required|in:Ralan,Ranap',
    'kd_pj' => 'required|string|max:3',
    'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
    'status_poli' => 'required|in:Lama,Baru',
];

foreach ($validationRules as $field => $rules) {
    echo "  {$field}: {$rules}\n";
}

echo "\n=== Test Selesai ===\n";
