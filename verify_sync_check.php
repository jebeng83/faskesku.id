<?php

use Illuminate\Support\Facades\DB;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// 1. Get permissions from DB
$dbPermissions = DB::table('permissions')->pluck('name')->toArray();
sort($dbPermissions);

echo "Total Permissions in DB: " . count($dbPermissions) . "\n";

// 2. Extract permissions from Seeder file
$seederContent = file_get_contents(__DIR__ . '/database/seeders/PermissionSeeder.php');

// Extract the content between $permissions = [ and ];
if (preg_match('/\$permissions\s*=\s*\[(.*?)\];/s', $seederContent, $matches)) {
    $arrayContent = $matches[1];
    
    // Remove comments
    $arrayContent = preg_replace('/\/\/.*$/m', '', $arrayContent);
    $arrayContent = preg_replace('/\/\*.*?\*\//s', '', $arrayContent);
    
    // Extract strings
    preg_match_all('/[\'"]([^\'"]+)[\'"]/', $arrayContent, $permMatches);
    $seederPermissions = $permMatches[1];
    $seederPermissions = array_unique($seederPermissions);
    sort($seederPermissions);
    
    echo "Total Permissions in Seeder: " . count($seederPermissions) . "\n";
    
    // 3. Compare
    $missingInSeeder = array_diff($dbPermissions, $seederPermissions);
    $missingInDB = array_diff($seederPermissions, $dbPermissions);
    
    if (empty($missingInSeeder) && empty($missingInDB)) {
        echo "SUCCESS: Seeder and Database are perfectly synchronized!\n";
    } else {
        if (!empty($missingInSeeder)) {
            echo "\n[WARNING] Found " . count($missingInSeeder) . " permissions in DB but MISSING in Seeder:\n";
            foreach ($missingInSeeder as $perm) {
                echo " - '$perm',\n";
            }
        }
        
        if (!empty($missingInDB)) {
            echo "\n[INFO] Found " . count($missingInDB) . " permissions in Seeder but NOT in DB (will be created):\n";
             foreach ($missingInDB as $perm) {
                echo " - $perm\n";
            }
        }
    }

} else {
    echo "ERROR: Could not parse \$permissions array from Seeder file.\n";
}
