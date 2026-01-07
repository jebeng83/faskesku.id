<?php

/**
 * Script diagnostik detail untuk endpoint Icare validate
 */

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

echo "=== DIAGNOSTIK ICARE VALIDATE ===\n\n";

// Ambil konfigurasi
$row = DB::table('setting_briding_mobilejkn')->first();
$baseUrl = config('bpjs.icare.base_url', 'https://apijkn.bpjs-kesehatan.go.id/ihs');
$consId = $row?->cons_id_mobilejkn ?? '';
$secretKey = $row?->secretkey_mobilejkn ?? '';
$userKey = $row?->userkey_mobilejkn ?? '';
$user = $row?->user_mobilejkn ?? '';
$pass = $row?->pass_mobilejkn ?? '';
$appCode = config('bpjs.pcare.app_code', '095');

echo "Konfigurasi:\n";
echo "- Base URL: {$baseUrl}\n";
echo "- Cons ID: {$consId}\n";
echo "- Has Secret Key: " . (!empty($secretKey) ? 'Yes' : 'No') . "\n";
echo "- Has User Key: " . (!empty($userKey) ? 'Yes' : 'No') . "\n";
echo "- User: {$user}\n";
echo "- Has Pass: " . (!empty($pass) ? 'Yes' : 'No') . "\n";
echo "- App Code: {$appCode}\n\n";

// Generate headers
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

echo "Headers yang akan dikirim:\n";
foreach ($headers as $key => $value) {
    if (in_array($key, ['X-signature', 'X-authorization', 'user_key'])) {
        echo "- {$key}: " . substr($value, 0, 20) . "...\n";
    } else {
        echo "- {$key}: {$value}\n";
    }
}
echo "\n";

// Test beberapa variasi endpoint
$endpoints = [
    'api/pcare/validate',
    'pcare/validate',
    'ihs/api/pcare/validate',
];

$noBpjs = '0001441910575';
$body = [
    'param' => $noBpjs,
];

echo "Body Request:\n";
echo json_encode($body, JSON_PRETTY_PRINT) . "\n\n";

foreach ($endpoints as $endpoint) {
    $url = rtrim($baseUrl, '/') . '/' . ltrim($endpoint, '/');
    echo "=== Testing: {$endpoint} ===\n";
    echo "Full URL: {$url}\n";
    
    try {
        $response = Http::withHeaders($headers)
            ->timeout(30)
            ->post($url, $body);
        
        $status = $response->status();
        $bodyText = $response->body();
        
        echo "Status: {$status}\n";
        
        if ($status === 200) {
            echo "✅ SUCCESS!\n";
            $json = $response->json();
            echo "Response:\n";
            echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
            break;
        } else {
            echo "❌ Failed\n";
            echo "Response body (first 500 chars):\n";
            echo substr($bodyText, 0, 500) . "\n";
        }
    } catch (\Throwable $e) {
        echo "❌ Exception: " . $e->getMessage() . "\n";
    }
    
    echo "\n";
}

echo "=== SELESAI ===\n";

