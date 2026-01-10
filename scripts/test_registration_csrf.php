<?php

/**
 * Script untuk uji coba registrasi dengan simulasi CSRF token handling
 *
 * Script ini mensimulasikan bagaimana browser menangani CSRF token:
 * 1. Ambil CSRF cookie terlebih dahulu
 * 2. Tunggu cookie ter-set
 * 3. Kirim request dengan token di headers
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
use Illuminate\Support\Facades\Session;

echo "=== Uji Coba Registrasi dengan CSRF Token ===\n\n";

// Data registrasi
$noRM = '000011';
$kdDokter = 'D0000003';
$kdPoli = 'UMU';
$kdPj = 'A09';
$pJawab = 'Pasien Test';
$almtPj = 'Alamat Test';
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

// Simulasi CSRF token handling
echo "2. Mengambil CSRF token...\n";
try {
    // Start session untuk mendapatkan CSRF token
    Session::start();
    $csrfToken = Session::token();

    if (! $csrfToken) {
        echo "❌ Error: Gagal mendapatkan CSRF token dari session\n";
        exit(1);
    }

    echo '   ✅ CSRF token berhasil diambil: '.substr($csrfToken, 0, 20)."...\n\n";
} catch (\Exception $e) {
    echo "❌ Error saat mengambil CSRF token: {$e->getMessage()}\n";
    exit(1);
}

// Buat request dengan CSRF token
echo "3. Membuat request registrasi dengan CSRF token...\n";
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

// Set headers untuk simulasi request dari browser dengan CSRF token
$request->headers->set('Content-Type', 'application/json');
$request->headers->set('Accept', 'application/json');
$request->headers->set('X-Requested-With', 'XMLHttpRequest');
$request->headers->set('X-CSRF-TOKEN', $csrfToken);
$request->headers->set('X-XSRF-TOKEN', $csrfToken);

// Set session token untuk validasi CSRF
$request->setLaravelSession(Session::driver());
$request->session()->put('_token', $csrfToken);

// Merge data ke request agar bisa diakses dengan $request->all()
$request->merge($requestData);

// Panggil controller
echo "4. Memanggil controller...\n";
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
        exit(0);
    } else {
        echo "❌ Registrasi gagal\n";
        if (isset($json['message'])) {
            echo "   Pesan: {$json['message']}\n";
        }
        if (isset($json['errors'])) {
            echo '   Errors: '.json_encode($json['errors'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n";
        }
        exit(1);
    }
} catch (\Exception $e) {
    echo "\n❌ Error: {$e->getMessage()}\n";
    if (isset($e->getTrace()[0])) {
        echo "File: {$e->getFile()}\n";
        echo "Line: {$e->getLine()}\n";
    }
    exit(1);
}
