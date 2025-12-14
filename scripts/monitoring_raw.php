<?php
require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$noRawat = $argv[1] ?? 'TEST-RAWAT-001';

$controller = new App\Http\Controllers\Pcare\PcareController();
$response = $controller->monitoringRaw($noRawat);
fwrite(STDOUT, $response->getContent());
fwrite(STDOUT, PHP_EOL);
