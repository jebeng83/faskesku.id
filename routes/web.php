<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RegPeriksaController;

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
    Route::resource('premium-modules', PremiumModuleController::class);
    Route::post('/premium-modules/{premiumModule}/generate-license', [PremiumModuleController::class, 'generateLicense'])->name('premium-modules.generate-license');
    Route::post('/premium-modules/activate', [PremiumModuleController::class, 'activate'])->name('premium-modules.activate');
    Route::post('/premium-modules/{premiumModule}/deactivate', [PremiumModuleController::class, 'deactivate'])->name('premium-modules.deactivate');
    Route::get('/premium-modules/{premiumModule}/status', [PremiumModuleController::class, 'status'])->name('premium-modules.status');
    Route::post('/premium-modules/validate-license', [PremiumModuleController::class, 'validateLicense'])->name('premium-modules.validate-license');
});
