<?php

// Verify FK behavior in dev: ON DELETE RESTRICT, ON UPDATE CASCADE
ini_set('display_errors', '1');
error_reporting(E_ALL);

try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=fufufafa;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "Selecting sample user-pegawai pair...\n";
    $pair = $pdo->query('SELECT u.id AS user_id, u.nik AS user_nik FROM users u JOIN pegawai p ON u.nik = p.nik WHERE u.nik IS NOT NULL LIMIT 1')
        ->fetch();
    if (! $pair) {
        echo "No sample pair found (ensure users.nik references pegawai.nik in some rows).\n";
        exit(0);
    }
    $userId = $pair['user_id'];
    $origNik = $pair['user_nik'];
    echo "Found users.id={$userId} with nik={$origNik}\n";

    // Test DELETE RESTRICT
    echo "\nTesting DELETE RESTRICT on pegawai.nik={$origNik}...\n";
    try {
        $stmt = $pdo->prepare('DELETE FROM pegawai WHERE nik = :nik');
        $stmt->execute(['nik' => $origNik]);
        echo "Unexpected: DELETE succeeded (RESTRICT should prevent this).\n";
    } catch (Throwable $e) {
        echo 'Expected failure: '.$e->getMessage()."\n";
    }

    // Test UPDATE CASCADE
    echo "\nTesting UPDATE CASCADE on pegawai.nik...\n";
    $newNik = 'TEST'.random_int(100000, 999999);
    echo "Updating pegawai.nik {$origNik} -> {$newNik}\n";
    $stmt = $pdo->prepare('UPDATE pegawai SET nik = :newNik WHERE nik = :origNik');
    $stmt->execute(['newNik' => $newNik, 'origNik' => $origNik]);

    $afterUser = $pdo->prepare('SELECT nik FROM users WHERE id = :id');
    $afterUser->execute(['id' => $userId]);
    $userNikAfter = $afterUser->fetchColumn();
    echo "users.nik after update: {$userNikAfter}\n";
    if ($userNikAfter !== $newNik) {
        echo "Unexpected: users.nik did not cascade to new value.\n";
    } else {
        echo "OK: users.nik cascaded correctly.\n";
    }

    // Revert change
    echo "Reverting pegawai.nik {$newNik} -> {$origNik}\n";
    $stmt = $pdo->prepare('UPDATE pegawai SET nik = :origNik WHERE nik = :newNik');
    $stmt->execute(['origNik' => $origNik, 'newNik' => $newNik]);

    $afterUser->execute(['id' => $userId]);
    $userNikRevert = $afterUser->fetchColumn();
    echo "users.nik after revert: {$userNikRevert}\n";
    if ($userNikRevert === $origNik) {
        echo "OK: users.nik reverted correctly.\n";
    } else {
        echo "Unexpected: users.nik did not revert.\n";
    }

    echo "\nVerification completed.\n";
} catch (Throwable $e) {
    fwrite(STDERR, 'Error: '.$e->getMessage()."\n");
    exit(1);
}
