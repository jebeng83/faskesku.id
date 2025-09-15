<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RegPeriksaController;
use App\Http\Controllers\RawatJalanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RawatInapController;
use App\Http\Controllers\IGDController;
use App\Http\Controllers\KamarOperasiController;
use App\Http\Controllers\LaboratoriumController;
use App\Http\Controllers\RadiologiController;
use App\Http\Controllers\RehabilitasiMedikController;

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
    Route::post('/patients/{patient}/register-periksa', [PatientController::class, 'registerPeriksa'])->name('patients.register-periksa');
    Route::get('/patients/{patient}/check-poli-status', [PatientController::class, 'checkPatientPoliStatus'])->name('patients.check-poli-status');

    // Employee routes
    Route::resource('employees', EmployeeController::class);

    // Registrasi Periksa routes
    Route::resource('reg-periksa', RegPeriksaController::class);
    Route::post('/reg-periksa/hitung-umur', [RegPeriksaController::class, 'hitungUmur'])->name('reg-periksa.hitung-umur');
    Route::get('/reg-periksa-statistik', [RegPeriksaController::class, 'getStatistik'])->name('reg-periksa.statistik');

    // Permission routes
    Route::get('/permissions', function () {
        return Inertia::render('Permissions/Index');
    })->name('permissions.index');

    // User Management routes
    Route::get('/users', function () {
        return Inertia::render('Users/Index');
    })->name('users.index');

    // Premium Module routes
    // Route::resource('premium-modules', PremiumModuleController::class);
    // Route::post('/premium-modules/{premiumModule}/generate-license', [PremiumModuleController::class, 'generateLicense'])->name('premium-modules.generate-license');
    // Route::post('/premium-modules/activate', [PremiumModuleController::class, 'activate'])->name('premium-modules.activate');
    // Route::post('/premium-modules/{premiumModule}/deactivate', [PremiumModuleController::class, 'deactivate'])->name('premium-modules.deactivate');
    // Route::get('/premium-modules/{premiumModule}/status', [PremiumModuleController::class, 'status'])->name('premium-modules.status');
    // Route::post('/premium-modules/validate-license', [PremiumModuleController::class, 'validateLicense'])->name('premium-modules.validate-license');


    Route::get('rawat-jalan/lanjutan', [RawatJalanController::class, 'lanjutan'])->name('rawat-jalan.lanjutan');
    Route::get('rawat-jalan/riwayat', [RawatJalanController::class, 'riwayat'])->name('rawat-jalan.riwayat');
    Route::get('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'pemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan');
    Route::post('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'storePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.store');
    Route::delete('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'deletePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.delete');
    Route::put('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'updatePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.update');
    Route::get('pegawai/search', [RawatJalanController::class, 'searchPegawai'])->name('pegawai.search');
    Route::get('rawat-jalan-statistics', [RawatJalanController::class, 'getStatistics'])->name('rawat-jalan.statistics');
    Route::resource('rawat-jalan', RawatJalanController::class);

    // Profile
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Menu Management routes
    Route::resource('menus', MenuController::class);
    Route::post('/menus/{menu}/toggle-status', [MenuController::class, 'toggleStatus'])->name('menus.toggle-status');
    Route::post('/menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');

    // Pelayanan Medis routes
    Route::resource('rawat-inap', RawatInapController::class);
    Route::resource('igd', IGDController::class);
    Route::resource('kamar-operasi', KamarOperasiController::class);

    // Penunjang Medis routes
    Route::resource('laboratorium', LaboratoriumController::class);
    Route::resource('radiologi', RadiologiController::class);
    Route::resource('rehabilitasi-medik', RehabilitasiMedikController::class);
});
