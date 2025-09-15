<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\RawatJalan\RawatJalanController;
use App\Http\Controllers\RawatJalan\ObatController;
use App\Http\Controllers\RawatJalan\ResepController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Patient routes
    Route::resource('patients', PatientController::class);
    
    // Rawat Jalan routes (pastikan rute spesifik didefinisikan sebelum resource agar tidak tertangkap oleh {rawat_jalan})
    Route::get('rawat-jalan/lanjutan', [RawatJalanController::class, 'lanjutan'])->name('rawat-jalan.lanjutan');
    Route::get('rawat-jalan/riwayat', [RawatJalanController::class, 'riwayat'])->name('rawat-jalan.riwayat');
    Route::get('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'pemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan');
    Route::post('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'storePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.store');
    Route::delete('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'deletePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.delete');
    Route::put('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'updatePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.update');
    Route::get('pegawai/search', [RawatJalanController::class, 'searchPegawai'])->name('pegawai.search');
    Route::get('rawat-jalan-statistics', [RawatJalanController::class, 'getStatistics'])->name('rawat-jalan.statistics');
    
    // API routes untuk obat
    Route::get('api/obat', [ObatController::class, 'getObatByPoli'])->name('api.obat.index');
    Route::get('api/obat/{kode_barang}', [ObatController::class, 'getDetailObat'])->name('api.obat.detail');
    Route::post('api/obat/cek-stok', [ObatController::class, 'cekStokObat'])->name('api.obat.cek-stok');
    
    // API routes untuk resep
    Route::post('api/resep', [ResepController::class, 'store'])->name('api.resep.store');
    Route::get('api/resep/{no_resep}', [ResepController::class, 'getResep'])->name('api.resep.get');
    Route::get('api/resep/rawat/{no_rawat}', [ResepController::class, 'getByNoRawat'])->name('api.resep.by-rawat');
    
    Route::resource('rawat-jalan', RawatJalanController::class);
});
