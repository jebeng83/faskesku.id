<?php

return [
    // Konfigurasi BPJS (khusus PCare) dibaca dari .env dan dicache oleh Laravel
    'pcare' => [
        // Beri default base URL agar tidak null ketika env belum terbaca
        'base_url' => env('BPJS_PCARE_BASE_URL', 'https://apijkn.bpjs-kesehatan.go.id/pcare-rest'),
        // Defaultkan ke kode PPK yang diinginkan bila env tidak terbaca
        'kode_ppk' => env('BPJS_PCARE_KODE_PPK', '11251616'),
        'app_code' => env('BPJS_PCARE_APP_CODE', '095'),
        'kabupaten' => env('BPJS_PCARE_KABUPATEN', ''),
        // Fallback env untuk kredensial (umumnya diambil dari DB table setting_bridging_bpjs)
        'cons_id' => env('BPJS_PCARE_CONS_ID'),
        'cons_pwd' => env('BPJS_PCARE_CONS_PWD'),
        'user_key' => env('BPJS_PCARE_USER_KEY'),
        'user' => env('BPJS_PCARE_USER'),
        'pass' => env('BPJS_PCARE_PASS'),
        'kunjungan_content_type' => env('BPJS_PCARE_KUNJUNGAN_CT', 'text/plain'),
    ],

    // Opsi HTTP untuk koneksi BPJS (dipakai oleh trait BpjsTraits)
    'http' => [
        'connect_timeout' => env('BPJS_HTTP_CONNECT_TIMEOUT', 10),
        'timeout' => env('BPJS_HTTP_TIMEOUT', 30),
        'disable_ssl_verify' => env('BPJS_HTTP_DISABLE_SSL_VERIFY', false),
        'retry_times' => env('BPJS_HTTP_RETRY_TIMES', 2),
        'retry_sleep' => env('BPJS_HTTP_RETRY_SLEEP', 500),
        // Fallback DNS resolve (opsional)
        'force_resolve' => env('BPJS_PCARE_FORCE_RESOLVE'),
        'force_resolve_list' => env('BPJS_PCARE_FORCE_RESOLVE_LIST'),
    ],

    // Opsi khusus Mobile JKN (opsional)
    'mobilejkn' => [
        'force_resolve' => env('BPJS_MOBILEJKN_FORCE_RESOLVE'),
    ],
];
