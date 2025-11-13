<?php

return [
    // Konfigurasi BPJS (khusus PCare) dibaca dari .env dan dicache oleh Laravel
    'pcare' => [
        'base_url' => env('BPJS_PCARE_BASE_URL'),
        'kode_ppk' => env('BPJS_PCARE_KODE_PPK'),
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