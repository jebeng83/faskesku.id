<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\PenjabController;
use App\Http\Controllers\API\WilayahController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RegPeriksaController;
use App\Http\Controllers\API\UserController;

Route::post('/employees', [EmployeeController::class, 'store'])->name('api.employees.store');
Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('api.employees.destroy');

Route::get('/penjab', [PenjabController::class, 'index'])->name('api.penjab.index');
Route::post('/penjab', [PenjabController::class, 'store'])->name('api.penjab.store');

// Wilayah proxy routes
Route::get('/wilayah/provinces', [WilayahController::class, 'provinces'])->name('api.wilayah.provinces');
Route::get('/wilayah/regencies/{provinceCode}', [WilayahController::class, 'regencies'])->name('api.wilayah.regencies');
Route::get('/wilayah/districts/{regencyCode}', [WilayahController::class, 'districts'])->name('api.wilayah.districts');
Route::get('/wilayah/villages/{districtCode}', [WilayahController::class, 'villages'])->name('api.wilayah.villages');

// Permission Management Routes
Route::prefix('permissions')->group(function () {
    // Roles
    Route::get('/roles', [PermissionController::class, 'getRoles'])->name('api.permissions.roles.index');
    Route::post('/roles', [PermissionController::class, 'createRole'])->name('api.permissions.roles.store');
    Route::get('/roles/{role}', [PermissionController::class, 'getRole'])->name('api.permissions.roles.show');
    Route::put('/roles/{role}', [PermissionController::class, 'updateRole'])->name('api.permissions.roles.update');
    Route::delete('/roles/{role}', [PermissionController::class, 'deleteRole'])->name('api.permissions.roles.destroy');

    // Permissions
    Route::get('/', [PermissionController::class, 'getPermissions'])->name('api.permissions.index');
    Route::post('/', [PermissionController::class, 'createPermission'])->name('api.permissions.store');
    Route::get('/{permission}', [PermissionController::class, 'getPermission'])->name('api.permissions.show');
    Route::put('/{permission}', [PermissionController::class, 'updatePermission'])->name('api.permissions.update');
    Route::delete('/{permission}', [PermissionController::class, 'deletePermission'])->name('api.permissions.destroy');
});

// Registrasi Periksa Routes
Route::prefix('reg-periksa')->group(function () {
    Route::get('/', [RegPeriksaController::class, 'index'])->name('api.reg-periksa.index');
    Route::post('/', [RegPeriksaController::class, 'store'])->name('api.reg-periksa.store');
    Route::get('/{regPeriksa}', [RegPeriksaController::class, 'show'])->name('api.reg-periksa.show');
    Route::put('/{regPeriksa}', [RegPeriksaController::class, 'update'])->name('api.reg-periksa.update');
    Route::delete('/{regPeriksa}', [RegPeriksaController::class, 'destroy'])->name('api.reg-periksa.destroy');
    Route::post('/hitung-umur', [RegPeriksaController::class, 'hitungUmur'])->name('api.reg-periksa.hitung-umur');
    Route::get('/statistik', [RegPeriksaController::class, 'getStatistik'])->name('api.reg-periksa.statistik');
    Route::get('/filter-data', [RegPeriksaController::class, 'getFilterData'])->name('api.reg-periksa.filter-data');
});

// User Management Routes
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('api.users.index');
    Route::post('/', [UserController::class, 'store'])->name('api.users.store');
    Route::get('/roles', [UserController::class, 'getRoles'])->name('api.users.roles');
    Route::get('/permissions', [UserController::class, 'getPermissions'])->name('api.users.permissions');
    Route::get('/employees', [UserController::class, 'getEmployees'])->name('api.users.employees');
    Route::get('/check-by-nik/{nik}', [UserController::class, 'checkUserByNik'])->name('api.users.check-by-nik');
    Route::get('/{user}', [UserController::class, 'show'])->name('api.users.show');
    Route::put('/{user}', [UserController::class, 'update'])->name('api.users.update');
    Route::delete('/{user}', [UserController::class, 'destroy'])->name('api.users.destroy');
    Route::put('/{user}/password', [UserController::class, 'updatePassword'])->name('api.users.password');
});
