<?php

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Setup database connection
$capsule = new Capsule;
$capsule->addConnection([
    'driver' => $_ENV['DB_CONNECTION'] ?? 'mysql',
    'host' => $_ENV['DB_HOST'] ?? '127.0.0.1',
    'port' => $_ENV['DB_PORT'] ?? '3306',
    'database' => $_ENV['DB_DATABASE'] ?? 'faskesku',
    'username' => $_ENV['DB_USERNAME'] ?? 'root',
    'password' => $_ENV['DB_PASSWORD'] ?? '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

try {
    echo "=== UPDATE SETTING NAME SCRIPT ===\n";
    
    // Check current settings
    $currentSettings = Capsule::table('setting')->get();
    echo "Current settings in database:\n";
    foreach ($currentSettings as $setting) {
        echo "- {$setting->nama_instansi} (aktifkan: {$setting->aktifkan})\n";
    }
    
    $oldName = 'KLINIK PANASEA MEDIKA2';
    $newName = 'KLINIK DIGIMEDIKA 2';
    
    // Check if old setting exists
    $oldSetting = Capsule::table('setting')->where('nama_instansi', $oldName)->first();
    
    if (!$oldSetting) {
        echo "Error: Setting dengan nama '{$oldName}' tidak ditemukan!\n";
        exit(1);
    }
    
    echo "\nFound setting: {$oldSetting->nama_instansi}\n";
    echo "Email: {$oldSetting->email}\n";
    echo "Kontak: {$oldSetting->kontak}\n";
    echo "Aktifkan: {$oldSetting->aktifkan}\n";
    
    // Check if new name already exists
    $existingNew = Capsule::table('setting')->where('nama_instansi', $newName)->first();
    if ($existingNew) {
        echo "Warning: Setting dengan nama '{$newName}' sudah ada!\n";
        echo "Apakah Anda ingin menghapus yang lama dan menggunakan yang baru? (y/n): ";
        $handle = fopen("php://stdin", "r");
        $line = fgets($handle);
        if (trim($line) !== 'y') {
            echo "Operasi dibatalkan.\n";
            exit(0);
        }
        fclose($handle);
    }
    
    // Start transaction
    Capsule::beginTransaction();
    
    try {
        // Create new record with new name
        $settingData = (array) $oldSetting;
        unset($settingData['nama_instansi']); // Remove old primary key
        $settingData['nama_instansi'] = $newName; // Set new primary key
        
        // Insert new record
        Capsule::table('setting')->insert($settingData);
        echo "✓ Created new setting record: {$newName}\n";
        
        // Delete old record
        Capsule::table('setting')->where('nama_instansi', $oldName)->delete();
        echo "✓ Deleted old setting record: {$oldName}\n";
        
        // Commit transaction
        Capsule::commit();
        
        echo "\n=== SUCCESS ===\n";
        echo "Setting name berhasil diubah dari '{$oldName}' menjadi '{$newName}'\n";
        
        // Show updated settings
        $updatedSettings = Capsule::table('setting')->get();
        echo "\nUpdated settings in database:\n";
        foreach ($updatedSettings as $setting) {
            echo "- {$setting->nama_instansi} (aktifkan: {$setting->aktifkan})\n";
        }
        
    } catch (Exception $e) {
        Capsule::rollback();
        throw $e;
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}