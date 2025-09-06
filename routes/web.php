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

// API route untuk mengambil setting aktif (tanpa auth untuk AppLayout)
Route::get('/api/active-setting', [SettingController::class, 'getActiveSetting'])->name('api.active-setting');

// Working API routes for settings
// UTF-8 encoding issue has been resolved
// Binary data (logo, wallpaper) is now properly excluded from JSON responses





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
            return Inertia::render('farmasi/PembelianObat');
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
    
    // API routes for pembelian dropdown data
    Route::get('/api/pembelian/akun-bayar', [\App\Http\Controllers\PembelianController::class, 'getAkunBayar'])->name('api.pembelian.akun-bayar')->withoutMiddleware(['auth']);
    Route::get('/api/pembelian/supplier', [\App\Http\Controllers\PembelianController::class, 'getSupplier'])->name('api.pembelian.supplier')->withoutMiddleware(['auth']);
    Route::get('/api/pembelian/petugas', [\App\Http\Controllers\PembelianController::class, 'getPetugas'])->name('api.pembelian.petugas')->withoutMiddleware(['auth']);
    Route::get('/api/pembelian/lokasi', [\App\Http\Controllers\PembelianController::class, 'getLokasi'])->name('api.pembelian.lokasi')->withoutMiddleware(['auth']);
    Route::get('/api/pembelian/generate-no-faktur', [\App\Http\Controllers\PembelianController::class, 'generateNoFaktur'])->name('api.pembelian.generate-no-faktur')->withoutMiddleware(['auth']);
    Route::post('/api/pembelian/store', [\App\Http\Controllers\PembelianController::class, 'store'])->name('api.pembelian.store')->withoutMiddleware(['auth']);
    
    // API routes untuk pencarian barang
    Route::get('/api/barang/search', [App\Http\Controllers\BarangController::class, 'search']);
    
    // API route untuk update harga databarang dari pembelian
    Route::put('/api/databarang/update-harga/{kode_brng}', [DataBarangController::class, 'updateHarga'])->name('api.databarang.update-harga')->withoutMiddleware(['auth', 'csrf']);
    
    // API route untuk update harga jual berdasarkan harga beli terbaru
    Route::put('/api/databarang/update-harga-jual/{kode_brng}', [DataBarangController::class, 'updateHargaJual'])->name('api.databarang.update-harga-jual')->withoutMiddleware(['auth', 'csrf']);
});
