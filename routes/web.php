<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\RawatJalanController;

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
    
    // Rawat Jalan routes
    Route::resource('rawat-jalan', RawatJalanController::class);
    Route::get('rawat-jalan-statistics', [RawatJalanController::class, 'getStatistics'])->name('rawat-jalan.statistics');
});
