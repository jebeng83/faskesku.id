<?php
// Quick diagnostic script to list revenue (pendapatan) accounts by prefix groups 41, 42, 43
// Usage: php scripts/query_rekening_pendapatan.php

function connect(): PDO {
    // Read from environment if available, fallback to common defaults
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $db   = getenv('DB_DATABASE') ?: 'fufufafa';
    $user = getenv('DB_USERNAME') ?: 'root';
    $pass = getenv('DB_PASSWORD') ?: '';
    $dsn = "mysql:host={$host};dbname={$db}";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
    ]);
    return $pdo;
}

function main() {
    try {
        $pdo = connect();
    } catch (Throwable $e) {
        fwrite(STDERR, "Koneksi DB gagal: " . $e->getMessage() . "\n");
        exit(1);
    }

    $prefixes = ['41' => 'Pendapatan Rawat Inap', '42' => 'Pendapatan Rawat Jalan', '43' => 'Operasional Lain'];
    $placeholders = implode(' OR ', array_map(fn($p) => "kd_rek LIKE '{$p}%'", array_keys($prefixes)));

    $sql = "SELECT kd_rek, nm_rek, tipe, balance FROM rekening WHERE {$placeholders} ORDER BY kd_rek";
    try {
        $rows = $pdo->query($sql)->fetchAll();
    } catch (Throwable $e) {
        fwrite(STDERR, "Query gagal: " . $e->getMessage() . "\n");
        exit(1);
    }

    if (!$rows) {
        echo "Tidak ditemukan akun pendapatan dengan prefix 41/42/43 di tabel rekening.\n";
        exit(0);
    }

    // Hitung ringkasan per prefix
    $summary = [];
    foreach ($prefixes as $p => $label) {
        $summary[$p] = ['label' => $label, 'count' => 0];
    }
    foreach ($rows as $r) {
        $pref = substr($r['kd_rek'], 0, 2);
        if (isset($summary[$pref])) {
            $summary[$pref]['count']++;
        }
    }

    echo "Ringkasan Akun Pendapatan (prefix):\n";
    foreach ($summary as $p => $info) {
        echo sprintf("  %s (%s): %d akun\n", $p, $info['label'], $info['count']);
    }
    echo "\nDaftar Akun Pendapatan 41/42/43:\n";
    foreach ($rows as $r) {
        printf("- %s | %s | tipe=%s | balance=%s\n", $r['kd_rek'], $r['nm_rek'], $r['tipe'], $r['balance']);
    }

    // Cek apakah default pendapatan di .env ada di master rekening
    // Load default pendapatan from environment or .env file
    $defaultPendapatan = getenv('AKUTANSI_REK_PENDAPATAN_DEFAULT');
    if (!$defaultPendapatan) {
        // Try to read from project .env if exists
        $envPath = __DIR__ . '/../.env';
        if (is_file($envPath)) {
            $envLines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($envLines as $line) {
                if (preg_match('/^AKUTANSI_REK_PENDAPATAN_DEFAULT\s*=\s*(.+)$/', $line, $m)) {
                    $defaultPendapatan = trim($m[1], "\"'\" ");
                    break;
                }
            }
        }
    }
    if ($defaultPendapatan) {
        $stmt = $pdo->prepare('SELECT kd_rek, nm_rek FROM rekening WHERE kd_rek = ? LIMIT 1');
        $stmt->execute([$defaultPendapatan]);
        $found = $stmt->fetch();
        echo "\nValidasi AKUTANSI_REK_PENDAPATAN_DEFAULT={$defaultPendapatan}: ";
        if ($found) {
            echo "OK, ditemukan => {$found['kd_rek']} - {$found['nm_rek']}\n";
        } else {
            echo "TIDAK ditemukan di tabel rekening!\n";
        }
    } else {
        echo "\nAKUTANSI_REK_PENDAPATAN_DEFAULT tidak diset di environment.\n";
    }

    // Info tambahan: cek beberapa kode umum yang sering dipakai
    $codesToCheck = ['410101', '420101', '430101'];
    echo "\nCek kode umum: \n";
    foreach ($codesToCheck as $code) {
        $stmt = $pdo->prepare('SELECT kd_rek, nm_rek FROM rekening WHERE kd_rek = ? LIMIT 1');
        $stmt->execute([$code]);
        $ok = $stmt->fetch();
        if ($ok) {
            echo "  - {$code}: ADA => {$ok['nm_rek']}\n";
        } else {
            echo "  - {$code}: TIDAK ADA\n";
        }
    }
}

main();
