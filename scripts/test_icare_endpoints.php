<?php

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

$rowMobilejkn = DB::table('setting_briding_mobilejkn')->first();
$rowBpjs = DB::table('setting_bridging_bpjs')->first();
$consId = $rowMobilejkn?->cons_id_mobilejkn ?? '';
$secretKey = $rowMobilejkn?->secretkey_mobilejkn ?? '';
// User key untuk Icare diambil dari setting_bridging_bpjs.userkey_pcare
$userKey = $rowBpjs?->userkey_pcare ?? '';
$user = $rowMobilejkn?->user_mobilejkn ?? '';
$pass = $rowMobilejkn?->pass_mobilejkn ?? '';
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

$body = ['param' => '0001441910575'];

// Test berbagai variasi base URL dan endpoint
$testUrls = [
    // Format dari dokumentasi: {BASE URL}/{Service Name}/api/pcare/validate
    'https://apijkn.bpjs-kesehatan.go.id/ihs/api/pcare/validate', // Saat ini (salah)
    'https://apijkn.bpjs-kesehatan.go.id/api/pcare/validate', // Tanpa /ihs
    'https://apijkn.bpjs-kesehatan.go.id/ihs/pcare/validate', // Tanpa /api
    'https://apijkn.bpjs-kesehatan.go.id/ihs/ihs/api/pcare/validate', // Dengan service name ihs
    'https://apijkn.bpjs-kesehatan.go.id/antreanfktp/api/pcare/validate', // Menggunakan base_url_mobilejkn
];

echo "=== Testing Various Endpoint Formats ===\n\n";

foreach ($testUrls as $url) {
    echo "Testing: {$url}\n";
    
    try {
        $response = Http::withHeaders($headers)
            ->timeout(30)
            ->post($url, $body);
        
        $status = $response->status();
        $bodyText = $response->body();
        
        echo "  Status: {$status}\n";
        
        if ($status === 200) {
            echo "  ✅ SUCCESS!\n";
            $json = $response->json();
            if ($json && isset($json['response']['url'])) {
                echo "  URL: " . $json['response']['url'] . "\n";
            }
            echo "  Response:\n";
            echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
            echo "\n✅ FOUND CORRECT ENDPOINT!\n";
            break;
        } elseif ($status === 401 || $status === 403) {
            echo "  ⚠️  Auth error (endpoint mungkin benar tapi auth salah)\n";
            echo "  Response preview: " . substr($bodyText, 0, 200) . "\n";
        } elseif (str_contains($bodyText, '<html>')) {
            echo "  ❌ HTML response (endpoint tidak ditemukan)\n";
        } else {
            echo "  Response preview: " . substr($bodyText, 0, 200) . "\n";
        }
    } catch (\Throwable $e) {
        echo "  ❌ Exception: " . $e->getMessage() . "\n";
    }
    
    echo "\n";
}

echo "=== SELESAI ===\n";

