<?php

/**
 * Script untuk test registrasi pasien via Laravel internal HTTP (simulasi request dari frontend)
 * Usage: php scripts/test_registration_internal.php
 */

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Penjab;
use App\Models\Poliklinik;

echo "=== TEST REGISTRASI PASIEN VIA INTERNAL HTTP ===\n\n";

// 1. Ambil data sample
echo "1. Mengambil data sample...\n";
$patient = Patient::where('no_rkm_medis', '000011')->first();
if (! $patient) {
    echo "ERROR: Pasien 000011 tidak ditemukan!\n";
    exit(1);
}

$dokter = Dokter::where('kd_dokter', 'D0000002')->first();
if (! $dokter) {
    echo "ERROR: Dokter D0000002 tidak ditemukan!\n";
    exit(1);
}

$poli = Poliklinik::where('kd_poli', 'IGDK')->first();
if (! $poli) {
    echo "ERROR: Poli IGDK tidak ditemukan!\n";
    exit(1);
}

$penjab = Penjab::where('kd_pj', 'A04')->first();
if (! $penjab) {
    echo "ERROR: Penjab A04 tidak ditemukan!\n";
    exit(1);
}

echo "   ✓ Pasien: {$patient->no_rkm_medis} - {$patient->nm_pasien}\n";
echo "   ✓ Dokter: {$dokter->kd_dokter} - {$dokter->nm_dokter}\n";
echo "   ✓ Poli: {$poli->kd_poli} - {$poli->nm_poli}\n";
echo "   ✓ Penjab: {$penjab->kd_pj} - {$penjab->png_jawab}\n\n";

// 2. Login untuk mendapatkan session dan CSRF token
echo "2. Login untuk mendapatkan session...\n";
$user = \App\Models\User::first();
if (! $user) {
    echo "ERROR: Tidak ada user di database!\n";
    exit(1);
}

auth()->login($user);
$session = session();
$csrfToken = $session->token();

echo "   ✓ Authenticated as: {$user->name}\n";
echo "   ✓ CSRF Token: {$csrfToken}\n\n";

// 3. Buat request data
$pJawab = $patient->namakeluarga ?? $patient->nm_pasien ?? 'Pasien';
$almtPj = $patient->alamat ?? $patient->alamatpj ?? 'Jl. Alamat Pasien';

if (empty(trim($pJawab)) || $pJawab === '-') {
    $pJawab = $patient->nm_pasien ?? 'Pasien';
}
if (empty(trim($almtPj)) || $almtPj === '-') {
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

echo "3. Data request:\n";
echo json_encode($requestData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n\n";

// 4. Buat HTTP request menggunakan Laravel's internal HTTP testing
echo "4. Mengirim HTTP POST request (internal)...\n";
$url = "/registration/{$patient->no_rkm_medis}/register";
echo "   URL: {$url}\n";
echo "   Method: POST\n\n";

try {
    // Buat request langsung ke kernel
    $request = \Illuminate\Http\Request::create($url, 'POST', $requestData);
    $request->headers->set('Accept', 'application/json');
    $request->headers->set('X-Requested-With', 'XMLHttpRequest');
    $request->headers->set('X-CSRF-TOKEN', $csrfToken);
    $request->headers->set('X-XSRF-TOKEN', $csrfToken);

    // Set session menggunakan session store yang benar
    $sessionStore = $session->driver();
    $request->setLaravelSession($sessionStore);

    // Process request melalui kernel
    $kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);
    $response = $kernel->handle($request);

    $statusCode = $response->getStatusCode();
    $body = $response->getContent();

    echo "   Status Code: {$statusCode}\n";
    echo "   Response:\n";

    // Cek apakah response adalah JSON atau HTML
    $contentType = $response->headers->get('Content-Type');
    echo "   Content-Type: {$contentType}\n";

    if (str_contains($contentType, 'application/json')) {
        $responseData = json_decode($body, true);
        echo json_encode($responseData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n\n";

        if ($statusCode === 200 && isset($responseData['success']) && $responseData['success']) {
            echo "✓ REGISTRASI BERHASIL!\n";
            echo "   No. Rawat: {$responseData['data']['no_rawat']}\n";
            echo "   No. Reg: {$responseData['data']['no_reg']}\n";
        } else {
            echo "✗ REGISTRASI GAGAL!\n";
            echo '   Message: '.($responseData['message'] ?? 'Unknown error')."\n";
        }
    } else {
        // Response adalah HTML
        echo "   ⚠️ Response adalah HTML, bukan JSON!\n";
        echo "   Preview (500 chars):\n";
        echo substr($body, 0, 500)."\n\n";
        echo "✗ ERROR: Server mengembalikan HTML bukan JSON!\n";
        echo "   Kemungkinan route tidak ditemukan atau redirect terjadi.\n";
    }

    $kernel->terminate($request, $response);

} catch (\Exception $e) {
    echo "✗ EXCEPTION: {$e->getMessage()}\n";
    echo "   File: {$e->getFile()}:{$e->getLine()}\n";
    echo "   Trace:\n{$e->getTraceAsString()}\n";
    exit(1);
}

echo "\n=== SELESAI ===\n";
echo "Cek log di storage/logs/laravel.log untuk detail debug\n";
