<?php

/**
 * Script uji coba endpoint Referensi SRK PCare
 *
 * Usage:
 *   php scripts/test_srk_rekap.php
 *   php scripts/test_srk_rekap.php "DM"
 *   php scripts/test_srk_rekap.php "" 0 10
 */

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

// Ambil parameter dari command line
$q = $argv[1] ?? '';
$start = isset($argv[2]) ? (int) $argv[2] : 0;
$limit = isset($argv[3]) ? (int) $argv[3] : 25;

echo "=== Test Referensi SRK PCare ===\n";
echo 'Query: '.($q ?: '(kosong)')."\n";
echo "Start: $start\n";
echo "Limit: $limit\n\n";

// Test 1: Cek konfigurasi
echo "1. Cek Konfigurasi PCare...\n";
try {
    $cfg = DB::table('setting_bridging_bpjs')->first();
    $baseUrl = config('bpjs.pcare.base_url');
    $consId = $cfg->cons_id_pcare ?? config('bpjs.pcare.cons_id');
    $userKey = $cfg->userkey_pcare ?? '';

    echo '   Base URL: '.($baseUrl ?: '(kosong)')."\n";
    echo '   Cons ID: '.($consId ?: '(kosong)')."\n";
    echo '   User Key: '.($userKey ? '(terisi)' : '(kosong)')."\n";

    if (empty($baseUrl)) {
        echo "   ❌ ERROR: Base URL tidak dikonfigurasi!\n";
        exit(1);
    }
    if (empty($consId)) {
        echo "   ⚠️  WARNING: Cons ID tidak dikonfigurasi!\n";
    }
    if (empty($userKey)) {
        echo "   ⚠️  WARNING: User Key tidak dikonfigurasi!\n";
    }
    echo "   ✓ Konfigurasi OK\n\n";
} catch (\Throwable $e) {
    echo '   ❌ ERROR: '.$e->getMessage()."\n";
    exit(1);
}

// Test 2: Test endpoint langsung via HTTP
echo "2. Test endpoint via HTTP...\n";
try {
    $baseUrl = config('app.url', 'http://localhost');
    $path = '/pcare/api/srk/rekap/test?q='.urlencode($q)."&start=$start&limit=$limit";
    $url = rtrim($baseUrl, '/').$path;
    echo "   URL: $url\n";

    $response = Http::timeout(30)->get($url);
    $status = $response->status();
    $body = $response->body();

    echo "   Status: $status\n";

    if ($status === 200) {
        $json = json_decode($body, true);
        if (is_array($json)) {
            $meta = $json['metaData'] ?? [];
            $resp = $json['response'] ?? [];
            $list = $resp['list'] ?? (is_array($resp) ? $resp : []);
            $count = $resp['count'] ?? count($list);

            echo "   ✓ Success\n";
            echo '   Meta Code: '.($meta['code'] ?? 'N/A')."\n";
            echo '   Meta Message: '.($meta['message'] ?? 'N/A')."\n";
            echo "   Count: $count\n";
            echo '   List items: '.count($list)."\n";

            if (count($list) > 0) {
                echo "\n   Sample data (first item):\n";
                print_r($list[0]);
            }
        } else {
            echo "   ⚠️  Response bukan JSON valid\n";
            echo '   Body: '.substr($body, 0, 500)."\n";
        }
    } else {
        echo "   ❌ Error Status: $status\n";
        $json = json_decode($body, true);
        if (is_array($json)) {
            $meta = $json['metaData'] ?? [];
            echo '   Meta Code: '.($meta['code'] ?? 'N/A')."\n";
            echo '   Meta Message: '.($meta['message'] ?? 'N/A')."\n";
        } else {
            echo '   Body: '.substr($body, 0, 500)."\n";
        }
    }
} catch (\Throwable $e) {
    echo '   ❌ ERROR: '.$e->getMessage()."\n";
    echo '   Trace: '.$e->getTraceAsString()."\n";
}

echo "\n=== Selesai ===\n";
