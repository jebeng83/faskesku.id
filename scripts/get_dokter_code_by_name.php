<?php

// Simple CLI to fetch kd_dokter by partial name and show mapping to PCare
// Usage: php scripts/get_dokter_code_by_name.php "RATNA"

declare(strict_types=1);

use Illuminate\Support\Facades\DB;

require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$q = $argv[1] ?? '';
if ($q === '') {
    fwrite(STDERR, "Usage: php scripts/get_dokter_code_by_name.php <partial_name>\n");
    exit(1);
}

$like = '%'.$q.'%';
$rows = DB::table('dokter')
    ->select(['kd_dokter', 'nm_dokter'])
    ->where(function ($w) use ($like) {
        $w->where('kd_dokter', 'like', $like)
            ->orWhere('nm_dokter', 'like', $like);
    })
    ->orderBy('kd_dokter')
    ->limit(50)
    ->get();

if ($rows->isEmpty()) {
    echo "No dokter matched for query: {$q}\n";
    exit(0);
}

echo "Found dokter(s):\n";
foreach ($rows as $row) {
    $map = DB::table('maping_dokter_pcare')
        ->select(['kd_dokter_pcare', 'nm_dokter_pcare'])
        ->where('kd_dokter', $row->kd_dokter)
        ->first();

    $kdPcare = $map->kd_dokter_pcare ?? null;
    $nmPcareRaw = $map->nm_dokter_pcare ?? null;
    // Sanitize supaya keluaran tidak terpotong atau mengandung newline
    $nmPcareSanitized = $nmPcareRaw !== null
        ? preg_replace(['/\s+/u', '/\s*,\s*/'], [' ', ','], trim($nmPcareRaw))
        : null;

    // Tampilkan dalam format yang mudah di-copy untuk pengujian (kutip nama agar terlihat lengkap)
    printf(
        "- RS: %s | %s || PCare: %s | \"%s\"\n",
        $row->kd_dokter,
        $row->nm_dokter,
        $kdPcare ?? '-',
        $nmPcareSanitized ?? '-'
    );
}
