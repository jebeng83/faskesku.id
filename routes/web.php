<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\DataBarangController;
use App\Http\Controllers\SetHargaObatController;
use App\Http\Controllers\RawatJalanController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Route untuk mengambil gambar (harus bisa diakses tanpa auth untuk login page)
Route::get('settings/{setting}/image/{type}', [SettingController::class, 'getImage'])->name('settings.image');

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
        $count = DB::select('SELECT COUNT(*) as count FROM setting')[0]->count;
        return response()->json(['message' => 'Database connection works', 'count' => $count]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});



// Test database tables
Route::get('debug-tables', function() {
    try {
        $tables = DB::select('SHOW TABLES');
        return response()->json(['message' => 'Database connected', 'tables' => $tables]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Test database connection without model
Route::delete('debug-setting/{nama_instansi}', function($nama_instansi) {
    try {
        $result = DB::select('SELECT COUNT(*) as count FROM setting WHERE nama_instansi = ?', [$nama_instansi]);
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
        return redirect()->route('dashboard');
    });
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Patient routes
    Route::resource('patients', PatientController::class);
    
    // Data Barang routes
    Route::resource('data-barang', DataBarangController::class);
    Route::get('data-barang-dropdown', [DataBarangController::class, 'getDropdownData'])->name('data-barang.dropdown')->withoutMiddleware(['auth']);
    Route::get('data-barang-last-code', [DataBarangController::class, 'getLastItemCode'])->name('data-barang.last-code')->withoutMiddleware(['auth']);

    // Farmasi routes
    Route::prefix('farmasi')->name('farmasi.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Farmasi/Dashboard');
        })->name('dashboard');
        
        Route::get('/stok-obat', function () {
            return Inertia::render('Farmasi/StokObat');
        })->name('stok-obat');
        
        Route::get('/resep-obat', function () {
            return Inertia::render('Farmasi/ResepObat');
        })->name('resep-obat');
        
        Route::get('/pembelian-obat', function () {
            return Inertia::render('Farmasi/PembelianObat');
        })->name('pembelian-obat');
        
        Route::get('/penjualan-obat', function () {
            return Inertia::render('Farmasi/PenjualanObat');
        })->name('penjualan-obat');
    });

    // Test route for fufufafa database connection
    Route::get('test-fufufafa', function() {
        try {
            $count = DB::connection('fufufafa')->table('databarang')->count();
            return response()->json([
                'success' => true,
                'message' => 'Fufufafa database connection successful',
                'count' => $count
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    });
    
    // Setting routes
    Route::delete('settings/{nama_instansi}', [SettingController::class, 'destroy'])
        ->where('nama_instansi', '.*')
        ->name('settings.destroy');
    Route::resource('settings', SettingController::class)->except(['destroy']);
    Route::post('settings/{setting}/activate', [SettingController::class, 'activate'])->name('settings.activate');
    
    // Pengaturan Harga Obat
    Route::get('set-harga-obat', [\App\Http\Controllers\SetHargaObatController::class, 'index'])->name('set-harga-obat.index');
    Route::post('set-harga-obat', [\App\Http\Controllers\SetHargaObatController::class, 'update'])->name('set-harga-obat.update');
    
    // API route for getting percentage data
    Route::get('/api/set-harga-obat', [SetHargaObatController::class, 'getPercentageData'])->name('api.set-harga-obat');
    
    // Rawat Jalan routes (pastikan rute spesifik didefinisikan sebelum resource agar tidak tertangkap oleh {rawat_jalan})
    Route::get('rawat-jalan/lanjutan', [RawatJalanController::class, 'lanjutan'])->name('rawat-jalan.lanjutan');
    Route::get('rawat-jalan/riwayat', [RawatJalanController::class, 'riwayat'])->name('rawat-jalan.riwayat');
    Route::get('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'pemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan');
    Route::post('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'storePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.store');
    Route::delete('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'deletePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.delete');
    Route::put('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'updatePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.update');
    Route::get('pegawai/search', [RawatJalanController::class, 'searchPegawai'])->name('pegawai.search');
    Route::get('rawat-jalan-statistics', [RawatJalanController::class, 'getStatistics'])->name('rawat-jalan.statistics');
    Route::resource('rawat-jalan', RawatJalanController::class);
});
