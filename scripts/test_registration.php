<?php

/**
 * Script untuk test registrasi pasien via terminal
 * Usage: php scripts/test_registration.php
 */

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Penjab;
use App\Models\Poliklinik;

echo "=== TEST REGISTRASI PASIEN ===\n\n";

// 1. Ambil data sample
echo "1. Mengambil data sample...\n";

// Cari pasien yang valid (bukan "-" atau kosong)
$patient = Patient::whereNotNull('no_rkm_medis')
    ->where('no_rkm_medis', '!=', '')
    ->where('no_rkm_medis', '!=', '-')
    ->whereNotNull('nm_pasien')
    ->where('nm_pasien', '!=', '')
    ->where('nm_pasien', '!=', '-')
    ->whereIn('no_rkm_medis', ['000011', '000019']) // Gunakan pasien yang sudah diketahui ada
    ->first();

// Jika tidak ada, cari yang lain
if (! $patient) {
    $patient = Patient::whereNotNull('no_rkm_medis')
        ->where('no_rkm_medis', '!=', '')
        ->where('no_rkm_medis', '!=', '-')
        ->whereNotNull('nm_pasien')
        ->where('nm_pasien', '!=', '')
        ->where('nm_pasien', '!=', '-')
        ->first();
}

if (! $patient) {
    echo "ERROR: Tidak ada data pasien yang valid di database!\n";
    exit(1);
}

// Cari dokter yang valid
$dokter = Dokter::whereNotNull('kd_dokter')
    ->where('kd_dokter', '!=', '')
    ->where('kd_dokter', '!=', '-')
    ->whereNotNull('nm_dokter')
    ->where('nm_dokter', '!=', '')
    ->where('nm_dokter', '!=', '-')
    ->where('kd_dokter', 'D0000002') // Gunakan dokter yang sudah diketahui ada
    ->first();

if (! $dokter) {
    $dokter = Dokter::whereNotNull('kd_dokter')
        ->where('kd_dokter', '!=', '')
        ->where('kd_dokter', '!=', '-')
        ->whereNotNull('nm_dokter')
        ->where('nm_dokter', '!=', '')
        ->where('nm_dokter', '!=', '-')
        ->first();
}

if (! $dokter) {
    echo "ERROR: Tidak ada data dokter yang valid di database!\n";
    exit(1);
}

// Cari poliklinik yang valid
$poli = Poliklinik::whereNotNull('kd_poli')
    ->where('kd_poli', '!=', '')
    ->where('kd_poli', '!=', '-')
    ->whereNotNull('nm_poli')
    ->where('nm_poli', '!=', '')
    ->where('nm_poli', '!=', '-')
    ->where('kd_poli', 'IGDK') // Gunakan poli yang sudah diketahui ada
    ->first();

if (! $poli) {
    $poli = Poliklinik::whereNotNull('kd_poli')
        ->where('kd_poli', '!=', '')
        ->where('kd_poli', '!=', '-')
        ->whereNotNull('nm_poli')
        ->where('nm_poli', '!=', '')
        ->where('nm_poli', '!=', '-')
        ->first();
}

if (! $poli) {
    echo "ERROR: Tidak ada data poliklinik yang valid di database!\n";
    exit(1);
}

// Cari penjab yang valid
$penjab = Penjab::whereNotNull('kd_pj')
    ->where('kd_pj', '!=', '')
    ->where('kd_pj', '!=', '-')
    ->whereNotNull('png_jawab')
    ->where('png_jawab', '!=', '')
    ->where('png_jawab', '!=', '-')
    ->where('kd_pj', 'A04') // Gunakan penjab yang sudah diketahui ada
    ->first();

if (! $penjab) {
    $penjab = Penjab::whereNotNull('kd_pj')
        ->where('kd_pj', '!=', '')
        ->where('kd_pj', '!=', '-')
        ->whereNotNull('png_jawab')
        ->where('png_jawab', '!=', '')
        ->where('png_jawab', '!=', '-')
        ->first();
}

if (! $penjab) {
    echo "ERROR: Tidak ada data penjab yang valid di database!\n";
    exit(1);
}

echo "   ✓ Pasien: {$patient->no_rkm_medis} - {$patient->nm_pasien}\n";
echo "   ✓ Dokter: {$dokter->kd_dokter} - {$dokter->nm_dokter}\n";
echo "   ✓ Poli: {$poli->kd_poli} - {$poli->nm_poli}\n";
echo "   ✓ Penjab: {$penjab->kd_pj} - {$penjab->png_jawab}\n\n";

// 2. Buat request data
$pJawab = $patient->namakeluarga ?? $patient->nm_pasien ?? 'Pasien';
$almtPj = $patient->alamat ?? $patient->alamatpj ?? 'Jl. Alamat Pasien';

// Pastikan tidak kosong
if (empty(trim($pJawab))) {
    $pJawab = 'Pasien';
}
if (empty(trim($almtPj))) {
    $almtPj = 'Jl. Alamat Pasien';
}

$requestData = [
    'kd_dokter' => $dokter->kd_dokter,
    'kd_poli' => $poli->kd_poli,
    'kd_pj' => $penjab->kd_pj,
    'p_jawab' => $pJawab,
    'almt_pj' => $almtPj,
    'hubunganpj' => 'DIRI SENDIRI',
    'tgl_registrasi' => date('Y-m-d'),
    'jam_reg' => date('H:i'),
];

echo "2. Data request:\n";
echo json_encode($requestData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n\n";

// 3. Panggil langsung controller (bypass HTTP layer)
echo "3. Memanggil controller langsung...\n";

try {
    // Buat user dummy untuk auth jika diperlukan
    $user = \App\Models\User::first();
    if ($user) {
        auth()->login($user);
        echo "   ✓ Authenticated as: {$user->name}\n";
    }

    // Panggil controller langsung
    $controller = new \App\Http\Controllers\RegistrationController;
    $request = new \Illuminate\Http\Request;
    $request->merge($requestData);
    $request->headers->set('Accept', 'application/json');
    $request->headers->set('X-Requested-With', 'XMLHttpRequest');

    // Pastikan parameter patient adalah no_rkm_medis (string), bukan object
    $patientParam = $patient->no_rkm_medis;
    echo "   ✓ Patient parameter: {$patientParam}\n";

    $response = $controller->registerPatient($request, $patientParam);

    $statusCode = $response->getStatusCode();
    $content = $response->getContent();

    echo "   Status Code: {$statusCode}\n";
    echo "   Response:\n";
    echo json_encode(json_decode($content), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n\n";

    if ($statusCode === 200) {
        $responseData = json_decode($content, true);
        if (isset($responseData['success']) && $responseData['success']) {
            echo "✓ REGISTRASI BERHASIL!\n";
            echo "   No. Rawat: {$responseData['data']['no_rawat']}\n";
            echo "   No. Reg: {$responseData['data']['no_reg']}\n";
        } else {
            echo "✗ REGISTRASI GAGAL!\n";
            echo '   Message: '.($responseData['message'] ?? 'Unknown error')."\n";
        }
    } else {
        echo "✗ HTTP ERROR: {$statusCode}\n";
    }

} catch (\Exception $e) {
    echo "✗ EXCEPTION: {$e->getMessage()}\n";
    echo "   File: {$e->getFile()}:{$e->getLine()}\n";
    echo "   Trace:\n{$e->getTraceAsString()}\n";
    exit(1);
}

echo "\n=== SELESAI ===\n";
echo "Cek log di storage/logs/laravel.log untuk detail debug\n";
