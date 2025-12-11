<?php

// Simple CLI script to fetch patient info (no_peserta and NIK) by No. RM
// Usage: php scripts/get_patient_info.php 000057

use App\Models\Patient;
use Illuminate\Contracts\Console\Kernel;

// Ensure we're running inside project root
chdir(__DIR__.'/..');

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';

/** @var Kernel $kernel */
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

$noRm = $argv[1] ?? null;
if (! $noRm) {
    fwrite(STDERR, "Usage: php scripts/get_patient_info.php <no_rkm_medis>\n");
    exit(1);
}

try {
    /** @var Patient|null $patient */
    $patient = Patient::query()
        ->where('no_rkm_medis', $noRm)
        ->first();

    if (! $patient) {
        echo json_encode([
            'success' => false,
            'message' => 'Patient not found',
            'no_rkm_medis' => $noRm,
        ], JSON_PRETTY_PRINT)."\n";
        exit(0);
    }

    echo json_encode([
        'success' => true,
        'data' => [
            'no_rkm_medis' => $patient->no_rkm_medis,
            'nm_pasien' => $patient->nm_pasien,
            'no_ktp' => $patient->no_ktp,
            'no_peserta' => $patient->no_peserta,
        ],
    ], JSON_PRETTY_PRINT)."\n";
} catch (Throwable $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
    ], JSON_PRETTY_PRINT)."\n";
    exit(1);
}
