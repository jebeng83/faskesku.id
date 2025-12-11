<?php

// Quick PHP cURL test to BPJS PCare poli endpoint using CURLOPT_RESOLVE
// This helps diagnose whether PHP cURL on this machine can reach the host when forced to specific IPs.

function buildHeaders(string $consId, string $secretKey, string $user, string $pass, string $appCode, int $timestamp): array
{
    $sigData = $consId.'&'.$timestamp;
    $raw = hash_hmac('sha256', $sigData, $secretKey, true);
    $signature = base64_encode($raw);
    $authorization = base64_encode($user.':'.$pass.':'.$appCode);

    return [
        'X-cons-id: '.$consId,
        'X-timestamp: '.$timestamp,
        'X-signature: '.$signature,
        'X-authorization: Basic '.$authorization,
        'user_key: 403bf17ddf158790afcfe1e8dd682a67',
        'Accept: application/json',
        'Content-Type: application/json',
    ];
}

$consId = '7925';
$secretKey = '2eF2C8E837';
$user = '11251616';
$pass = 'Pcare156#';
$appCode = '095';
$timestamp = time();
$headers = buildHeaders($consId, $secretKey, $user, $pass, $appCode, $timestamp);

$url = 'https://apijkn.bpjs-kesehatan.go.id/pcare-rest/dokter/0/25';
$ips = [
    '36.67.140.135',
    '160.25.178.69',
    '160.25.179.69',
    '118.97.79.198',
];

foreach ($ips as $ip) {
    echo "Testing IP: {$ip}\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    if (defined('CURL_IPRESOLVE_V4')) {
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
    }
    if (defined('CURL_HTTP_VERSION_1_1')) {
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    }
    if (defined('CURLOPT_NOSIGNAL')) {
        curl_setopt($ch, CURLOPT_NOSIGNAL, true);
    }
    if (defined('CURL_SSLVERSION_TLSv1_2')) {
        curl_setopt($ch, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
    }
    // Enable SSL verification to mirror production behavior
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    // Force DNS resolve
    curl_setopt($ch, CURLOPT_RESOLVE, ["apijkn.bpjs-kesehatan.go.id:443:{$ip}"]); // host:port:IP
    $body = curl_exec($ch);
    $err = curl_error($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);
    echo 'HTTP Code: '.($info['http_code'] ?? 0)."\n";
    if ($err) {
        echo "cURL error: {$err}\n";
    } else {
        echo substr($body, 0, 200)."\n";
    }
    echo "-----\n";
}
