<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=fufufafa;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $fks = $pdo->query("SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='fufufafa' AND TABLE_NAME='users' AND REFERENCED_TABLE_NAME IS NOT NULL")
                ->fetchAll();
    echo "USERS FKs:\n";
    foreach ($fks as $fk) {
        echo sprintf("- %s: %s -> %s(%s)\n", $fk['CONSTRAINT_NAME'], $fk['COLUMN_NAME'], $fk['REFERENCED_TABLE_NAME'], $fk['REFERENCED_COLUMN_NAME']);
    }
    $rules = $pdo->query("SELECT CONSTRAINT_NAME, UPDATE_RULE, DELETE_RULE FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_SCHEMA='fufufafa' AND CONSTRAINT_NAME IN (SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='fufufafa' AND TABLE_NAME='users' AND REFERENCED_TABLE_NAME IS NOT NULL)")
                ->fetchAll();
    echo "Rules:\n";
    foreach ($rules as $r) {
        echo sprintf("- %s: UPDATE=%s, DELETE=%s\n", $r['CONSTRAINT_NAME'], $r['UPDATE_RULE'], $r['DELETE_RULE']);
    }
} catch (Throwable $e) {
    fwrite(STDERR, "Error: ".$e->getMessage()."\n");
    exit(1);
}

