<?php
// Preflight checks for adding FK: users.nik -> pegawai.nik
// Adjust DSN/credentials if needed.
ini_set('display_errors', '1');
error_reporting(E_ALL);

function h($v) { return $v === null ? 'NULL' : (string)$v; }

try {
    $dsn = 'mysql:host=127.0.0.1;dbname=fufufafa;charset=utf8mb4';
    $user = 'root';
    $pass = '';
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "== TABLE ENGINE & COLLATION ==\n";
    $tables = $pdo->query("SELECT TABLE_NAME, ENGINE, TABLE_COLLATION FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='fufufafa' AND TABLE_NAME IN ('users','pegawai') ORDER BY TABLE_NAME")
                   ->fetchAll();
    foreach ($tables as $t) {
        echo sprintf("- %s: ENGINE=%s, COLLATION=%s\n", $t['TABLE_NAME'], h($t['ENGINE']), h($t['TABLE_COLLATION']));
    }

    echo "\n== COLUMN DEFINITIONS (nik) ==\n";
    $cols = $pdo->query("SELECT TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLLATION_NAME, CHARACTER_SET_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='fufufafa' AND COLUMN_NAME='nik' AND TABLE_NAME IN ('users','pegawai') ORDER BY TABLE_NAME")
                 ->fetchAll();
    foreach ($cols as $c) {
        echo sprintf("- %s.%s: TYPE=%s, NULLABLE=%s, COLLATION=%s, CHARSET=%s\n", $c['TABLE_NAME'], $c['COLUMN_NAME'], $c['COLUMN_TYPE'], $c['IS_NULLABLE'], h($c['COLLATION_NAME']), h($c['CHARACTER_SET_NAME']));
    }

    echo "\n== INDEX ON pegawai.nik ==\n";
    $idx = $pdo->query("SHOW INDEX FROM pegawai")->fetchAll();
    $found = false;
    foreach ($idx as $i) {
        if (isset($i['Column_name']) && $i['Column_name'] === 'nik') {
            $found = true;
            echo sprintf("- Key_name=%s, Non_unique=%s, Seq_in_index=%s\n", $i['Key_name'], $i['Non_unique'], $i['Seq_in_index']);
        }
    }
    if (!$found) {
        echo "- (no index found on pegawai.nik)\n";
    }

    echo "\n== ORPHAN COUNTS ==\n";
    $orphan = $pdo->query("SELECT COUNT(*) AS cnt FROM users u LEFT JOIN pegawai p ON u.nik = p.nik WHERE u.nik IS NOT NULL AND p.nik IS NULL")
                  ->fetch();
    $nullNik = $pdo->query("SELECT COUNT(*) AS cnt FROM users WHERE nik IS NULL")
                   ->fetch();
    echo sprintf("- users.nik NULL count: %d\n", (int)$nullNik['cnt']);
    echo sprintf("- users.nik orphan count (not in pegawai): %d\n", (int)$orphan['cnt']);

    echo "\n== SAMPLE ORPHANS (up to 10) ==\n";
    $samples = $pdo->query("SELECT u.id, u.nik FROM users u LEFT JOIN pegawai p ON u.nik = p.nik WHERE u.nik IS NOT NULL AND p.nik IS NULL LIMIT 10")
                   ->fetchAll();
    if ($samples) {
        foreach ($samples as $s) {
            echo sprintf("- users.id=%s nik=%s\n", h($s['id']), h($s['nik']));
        }
    } else {
        echo "- (none)\n";
    }

    echo "\n== USERS FOREIGN KEYS ==\n";
    $userFks = $pdo->query("SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='fufufafa' AND TABLE_NAME='users' AND REFERENCED_TABLE_NAME IS NOT NULL")
                    ->fetchAll();
    if ($userFks) {
        foreach ($userFks as $fk) {
            echo sprintf("- %s: %s -> %s(%s)\n", $fk['CONSTRAINT_NAME'], $fk['COLUMN_NAME'], $fk['REFERENCED_TABLE_NAME'], $fk['REFERENCED_COLUMN_NAME']);
        }
    } else {
        echo "- (none)\n";
    }

    echo "\n== FK RULES (users.*) ==\n";
    $rules = $pdo->query("SELECT CONSTRAINT_NAME, UPDATE_RULE, DELETE_RULE FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_SCHEMA='fufufafa' AND CONSTRAINT_NAME IN (SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='fufufafa' AND TABLE_NAME='users' AND REFERENCED_TABLE_NAME IS NOT NULL)")
                ->fetchAll();
    foreach ($rules as $r) {
        echo sprintf("- %s: UPDATE_RULE=%s, DELETE_RULE=%s\n", $r['CONSTRAINT_NAME'], $r['UPDATE_RULE'], $r['DELETE_RULE']);
    }

    echo "\n== SHOW CREATE TABLE users ==\n";
    $createUsers = $pdo->query("SHOW CREATE TABLE users")->fetch();
    echo $createUsers['Create Table']."\n";

    echo "\n== SHOW CREATE TABLE pegawai ==\n";
    $createPegawai = $pdo->query("SHOW CREATE TABLE pegawai")->fetch();
    echo $createPegawai['Create Table']."\n";

    echo "\nPreflight checks completed.\n";
} catch (Throwable $e) {
    fwrite(STDERR, "Error: ".$e->getMessage()."\n");
    exit(1);
}
