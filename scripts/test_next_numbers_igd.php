<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Http\Controllers\API\RegPeriksaController;
use Illuminate\Http\Request;

echo "=== Uji Coba Next Numbers (IGDK) ===\n\n";

$tanggal = date('Y-m-d');
$requestData = [
    'kd_poli' => 'IGDK',
    'tanggal' => $tanggal,
];

$request = Request::create(
    '/api/reg-periksa/next-numbers',
    'GET',
    $requestData
);

$request->headers->set('Accept', 'application/json');
$request->headers->set('X-Requested-With', 'XMLHttpRequest');

try {
    $controller = new RegPeriksaController;
    $response = $controller->nextNumbers($request);
    $statusCode = $response->getStatusCode();
    $content = $response->getContent();

    echo "Status Code: {$statusCode}\n";
    echo "Response Body:\n";
    $json = json_decode($content, true);
    if ($json) {
        echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)."\n";
    } else {
        echo $content."\n";
    }
} catch (\Throwable $e) {
    echo "\n❌ Error: {$e->getMessage()}\n";
    echo "Trace:\n{$e->getTraceAsString()}\n";
    exit(1);
}
