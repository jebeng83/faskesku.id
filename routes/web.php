<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SettingController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Working API routes for settings
// UTF-8 encoding issue has been resolved
// Binary data (logo, wallpaper) is now properly excluded from JSON responses

// Temporary test route without auth
Route::delete('test-settings/{nama_instansi}', [SettingController::class, 'destroy'])
    ->where('nama_instansi', '.*')
    ->name('test.settings.destroy');

// Simple test route for debugging
Route::delete('debug-delete/{id}', function($id) {
    return response()->json(['message' => 'Delete works', 'id' => $id]);
});

// Simple setting test without parameter
Route::get('setting-simple', function() {
    try {
        $count = \DB::select('SELECT COUNT(*) as count FROM setting')[0]->count;
        return response()->json(['message' => 'Database connection works', 'count' => $count]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});



// Test database tables
Route::get('debug-tables', function() {
    try {
        $tables = \DB::select('SHOW TABLES');
        return response()->json(['message' => 'Database connected', 'tables' => $tables]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Test database connection without model
Route::delete('debug-setting/{nama_instansi}', function($nama_instansi) {
    try {
        $result = \DB::select('SELECT COUNT(*) as count FROM setting WHERE nama_instansi = ?', [$nama_instansi]);
        return response()->json(['message' => 'Database query works', 'nama_instansi' => $nama_instansi, 'count' => $result[0]->count]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});



// Simple test route
Route::any('simple-test', function() {
    return response()->json(['message' => 'Test route works', 'method' => request()->method()]);
});

// Very simple route without parameter
Route::get('test-simple', function() {
    return response()->json(['message' => 'Very simple route works']);
});

// Test UTF-8 encoding fix
Route::get('/test-utf8-fix', function () {
    try {
        $setting = \App\Models\Setting::create([
            'nama_instansi' => 'Test Hospital Recovery',
            'alamat_instansi' => 'Jl. Recovery dengan karakter spesial: àáâãäåæçèéêë',
            'aktifkan' => 'Yes'
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Setting berhasil dibuat setelah recovery',
            'data' => $setting->makeHidden(['wallpaper', 'logo'])->toArray()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
});

// Simple route with parameter
Route::get('test-param/{param}', function($param) {
    return response()->json(['message' => 'Route with param works', 'param' => $param]);
});

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Patient routes
    Route::resource('patients', PatientController::class);
    
    // Setting routes
    Route::delete('settings/{nama_instansi}', [SettingController::class, 'destroy'])
        ->where('nama_instansi', '.*')
        ->name('settings.destroy');
    Route::resource('settings', SettingController::class)->except(['destroy']);
    Route::post('settings/{setting}/activate', [SettingController::class, 'activate'])->name('settings.activate');
    Route::get('settings/{setting}/image/{type}', [SettingController::class, 'getImage'])->name('settings.image');
});
