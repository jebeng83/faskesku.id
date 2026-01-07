<?php

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Http\Controllers\Pcare\IcareController;
use Illuminate\Http\Request;

echo "=== TEST ICARE VALIDATE (Dengan userkey_pcare) ===\n\n";

$noBpjs = '0001441910575';
$noRawat = '2026/01/07/000005';

echo "No BPJS: {$noBpjs}\n";
echo "No Rawat: {$noRawat}\n\n";

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
    
    if (isset($data['data']['response']['url'])) {
        echo "✅ SUCCESS! URL Riwayat Pelayanan:\n";
        echo $data['data']['response']['url'] . "\n";
    } elseif (isset($data['data']['metaData'])) {
        echo "MetaData:\n";
        echo json_encode($data['data']['metaData'], JSON_PRETTY_PRINT) . "\n";
    }
    
    echo "\nFull Response:\n";
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
    
} catch (\Throwable $e) {
    echo "\n❌ EXCEPTION: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "\n=== SELESAI ===\n";

