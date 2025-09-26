<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\PenjabController;
use App\Http\Controllers\API\WilayahController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RegPeriksaController;
use App\Http\Controllers\API\GenerateNoRawatController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\MenuController;

Route::post('/employees', [EmployeeController::class, 'store'])->name('api.employees.store');
Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('api.employees.destroy');

Route::get('/penjab', [PenjabController::class, 'index'])->name('api.penjab.index');
Route::post('/penjab', [PenjabController::class, 'store'])->name('api.penjab.store');

// Wilayah routes
Route::get('/wilayah/provinces', [WilayahController::class, 'provinces'])->name('api.wilayah.provinces');
Route::get('/wilayah/regencies/{provinceCode}', [WilayahController::class, 'regencies'])->name('api.wilayah.regencies');
Route::get('/wilayah/districts/{regencyCode}', [WilayahController::class, 'districts'])->name('api.wilayah.districts');
Route::get('/wilayah/villages/{districtCode}', [WilayahController::class, 'villages'])->name('api.wilayah.villages');
Route::get('/wilayah/all-villages', [WilayahController::class, 'allVillages'])->name('api.wilayah.all-villages');
Route::get('/wilayah/search', [WilayahController::class, 'search'])->name('api.wilayah.search');
Route::get('/wilayah/{code}', [WilayahController::class, 'show'])->name('api.wilayah.show');

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

// Generate No Rawat Routes (dengan database lock untuk multi-komputer)
Route::prefix('generate-no-rawat')->group(function () {
    Route::post('/', [GenerateNoRawatController::class, 'generateNoRawat'])->name('api.generate-no-rawat');
    Route::post('/reserve', [GenerateNoRawatController::class, 'reserveNoRawat'])->name('api.reserve-no-rawat');
    Route::post('/release', [GenerateNoRawatController::class, 'releaseNoRawat'])->name('api.release-no-rawat');
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

// Menu Management API Routes
Route::prefix('menus')->middleware('auth')->group(function () {
    Route::get('/hierarchy', [MenuController::class, 'getMenuHierarchy'])->name('api.menus.hierarchy');
    Route::get('/icons', [MenuController::class, 'getIcons'])->name('api.menus.icons');
});
