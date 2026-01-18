<?php

/**
 * Script untuk uji coba registrasi pasien via terminal
 *
 * Penggunaan:
 *   php scripts/test_registration_000019.php
 *
 * Data yang digunakan:
 * - No RM: 000019 (RIZKI AMALIA)
 * - Dokter: dr. Ratna Candrasari (D0000003)
 * - Poli: UMUM (UMU)
 * - Cara Bayar: UMUM (A09)
 *
 * Catatan:
 * Script ini menggunakan Laravel's internal request handling,
 * sehingga tidak memerlukan CSRF token seperti request HTTP biasa.
 */

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Http\Controllers\RegistrationController;
use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Penjab;
use App\Models\Poliklinik;
use Illuminate\Http\Request;

echo "=== Uji Coba Registrasi Pasien ===\n\n";

// Data registrasi
$noRM = '000002';
$kdDokter = 'D0000002';
$kdPoli = 'IGDK';
$kdPj = 'A09';
$pJawab = 'John Test';
$almtPj = 'Alamat Pasien';
$hubunganPj = 'DIRI SENDIRI';

// Validasi data
echo "1. Memvalidasi data...\n";
$patient = Patient::where('no_rkm_medis', $noRM)->first();
if (! $patient) {
    echo "❌ Error: Pasien dengan No RM {$noRM} tidak ditemukan\n";
    exit(1);
}
echo "   ✅ Pasien ditemukan: {$patient->nm_pasien}\n";

$dokter = Dokter::where('kd_dokter', $kdDokter)->first();
if (! $dokter) {
    echo "❌ Error: Dokter dengan kode {$kdDokter} tidak ditemukan\n";
    exit(1);
}
echo "   ✅ Dokter ditemukan: {$dokter->nm_dokter}\n";

$poli = Poliklinik::where('kd_poli', $kdPoli)->first();
if (! $poli) {
    echo "❌ Error: Poliklinik dengan kode {$kdPoli} tidak ditemukan\n";
    exit(1);
}
echo "   ✅ Poliklinik ditemukan: {$poli->nm_poli}\n";

$penjab = Penjab::where('kd_pj', $kdPj)->first();
if (! $penjab) {
    echo "❌ Error: Penanggung Jawab dengan kode {$kdPj} tidak ditemukan\n";
    exit(1);
}
echo "   ✅ Penanggung Jawab ditemukan: {$penjab->png_jawab}\n\n";

// Buat request
echo "2. Membuat request registrasi...\n";
$requestData = [
    'kd_dokter' => $kdDokter,
    'kd_poli' => $kdPoli,
    'kd_pj' => $kdPj,
    'p_jawab' => $pJawab,
    'almt_pj' => $almtPj,
    'hubunganpj' => $hubunganPj,
];

$request = Request::create(
    "/registration/{$noRM}/register",
    'POST',
    $requestData
);

// Set headers untuk simulasi request dari browser
$request->headers->set('Content-Type', 'application/json');
$request->headers->set('Accept', 'application/json');
$request->headers->set('X-Requested-With', 'XMLHttpRequest');

// Merge data ke request agar bisa diakses dengan $request->all()
$request->merge($requestData);

// Panggil controller
echo "3. Memanggil controller...\n";
try {
    $controller = new RegistrationController;
    $response = $controller->registerPatient($request, $noRM);

    // Dapatkan response content
    $content = $response->getContent();
    $statusCode = $response->getStatusCode();

    echo "\n=== Response ===\n";
    echo "Status Code: {$statusCode}\n";
    echo "Response Body:\n";

    $json = json_decode($content, true);
    if ($json) {
        echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n";
    } else {
        echo $content."\n";
    }

    echo "\n";
    if ($statusCode === 200 && isset($json['success']) && $json['success']) {
        echo "✅ Registrasi berhasil!\n";
        if (isset($json['data']['no_rawat'])) {
            echo "   No. Rawat: {$json['data']['no_rawat']}\n";
        }
    } else {
        echo "❌ Registrasi gagal\n";
        if (isset($json['message'])) {
            echo "   Pesan: {$json['message']}\n";
        }
    }
} catch (\Exception $e) {
    echo "\n❌ Error: {$e->getMessage()}\n";
    echo "Trace:\n{$e->getTraceAsString()}\n";
    exit(1);
}
