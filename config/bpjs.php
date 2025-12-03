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
    ],
];
