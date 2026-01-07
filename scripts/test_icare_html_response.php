<?php

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

$row = DB::table('setting_briding_mobilejkn')->first();
$baseUrl = config('bpjs.icare.base_url', 'https://apijkn.bpjs-kesehatan.go.id/ihs');
$consId = $row?->cons_id_mobilejkn ?? '';
$secretKey = $row?->secretkey_mobilejkn ?? '';
$userKey = $row?->userkey_mobilejkn ?? '';
$user = $row?->user_mobilejkn ?? '';
$pass = $row?->pass_mobilejkn ?? '';
$appCode = config('bpjs.pcare.app_code', '095');

$timestamp = (string) time();
$data = $consId . '&' . $timestamp;
$signature = base64_encode(hash_hmac('sha256', $data, $secretKey, true));
$authorization = base64_encode($user . ':' . $pass . ':' . $appCode);

$headers = [
    'X-cons-id' => $consId,
    'X-timestamp' => $timestamp,
    'X-signature' => $signature,
    'X-authorization' => 'Basic ' . $authorization,
    'user_key' => $userKey,
    'Accept' => 'application/json',
    'Content-Type' => 'application/json',
];

$url = rtrim($baseUrl, '/') . '/api/pcare/validate';
$body = ['param' => '0001441910575'];

echo "URL: {$url}\n\n";

$response = Http::withHeaders($headers)->timeout(30)->post($url, $body);
$html = $response->body();

// Extract text dari HTML
$dom = new DOMDocument();
@$dom->loadHTML($html);
$xpath = new DOMXPath($dom);
$text = $xpath->query('//text()');

echo "=== HTML Response Content ===\n";
foreach ($text as $node) {
    $content = trim($node->textContent);
    if (!empty($content) && strlen($content) > 10) {
        echo $content . "\n";
    }
}

echo "\n=== Full HTML (first 2000 chars) ===\n";
echo substr($html, 0, 2000);

