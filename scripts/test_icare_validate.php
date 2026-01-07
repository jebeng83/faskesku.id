<?php

/**
 * Script test untuk endpoint Icare validate
 * Data pasien: no bpjs 0001441910575, no rawat 2026/01/07/000005
 */

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Http\Controllers\Pcare\IcareController;
use Illuminate\Http\Request;

echo "=== TEST ICARE VALIDATE ===\n\n";

// Data test
$noBpjs = '0001441910575';
$noRawat = '2026/01/07/000005';

echo "No BPJS: {$noBpjs}\n";
echo "No Rawat: {$noRawat}\n\n";

// Buat request
$request = Request::create('/api/icare/validate', 'POST', [
    'param' => $noBpjs,
    'no_rawat' => $noRawat,
]);

$controller = new IcareController();

try {
    echo "Mengirim request ke Icare...\n";
    $response = $controller->validateIcare($request);
    $data = json_decode($response->getContent(), true);
    
    echo "\n=== RESPONSE ===\n";
    echo "Status Code: " . $response->getStatusCode() . "\n";
    echo "Response:\n";
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
    
    if (isset($data['data']['response']['url'])) {
        echo "\n✅ URL Riwayat Pelayanan: " . $data['data']['response']['url'] . "\n";
    } elseif (isset($data['error'])) {
        echo "\n❌ Error: " . $data['error'] . "\n";
    } elseif (isset($data['data']['metaData'])) {
        echo "\n⚠️  MetaData: " . json_encode($data['data']['metaData'], JSON_PRETTY_PRINT) . "\n";
    }
    
} catch (\Throwable $e) {
    echo "\n❌ EXCEPTION: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
    echo "\nStack Trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\n=== SELESAI ===\n";

