<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RegPeriksaController;
use App\Http\Controllers\RawatJalan\RawatJalanController;
use App\Http\Controllers\RawatJalan\ObatController;
use App\Http\Controllers\RawatJalan\ResepController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RawatInapController;
use App\Http\Controllers\IGDController;
use App\Http\Controllers\KamarOperasiController;
use App\Http\Controllers\LaboratoriumController;
use App\Http\Controllers\RadiologiController;
use App\Http\Controllers\RehabilitasiMedikController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\SpesialisController;
use App\Http\Controllers\DaftarTarifController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\DataBarangController;
use App\Http\Controllers\TarifTindakanController;
use App\Http\Controllers\KategoriPerawatanController;
use App\Http\Controllers\PermintaanLabController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Note: API routes telah dipindahkan ke routes/api.php

// API routes that don't require authentication
Route::get('/api/lab-tests', [PermintaanLabController::class, 'getLabTests'])->name('api.lab-tests');

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

    // Doctor routes
    Route::resource('doctors', DoctorController::class);

    // Spesialis routes
    Route::resource('spesialis', SpesialisController::class);

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
    Route::prefix('laboratorium')->name('laboratorium.')->group(function () {
        Route::get('/', [LaboratoriumController::class, 'index'])->name('index');
        Route::get('/dashboard', [LaboratoriumController::class, 'dashboard'])->name('dashboard');
        Route::get('/create', [LaboratoriumController::class, 'create'])->name('create');
        Route::post('/', [LaboratoriumController::class, 'store'])->name('store');
        Route::get('/{noRawat}', [LaboratoriumController::class, 'show'])->name('show');
        Route::get('/{noRawat}/edit', [LaboratoriumController::class, 'edit'])->name('edit');
        Route::put('/{noRawat}', [LaboratoriumController::class, 'update'])->name('update');
        Route::delete('/{noRawat}', [LaboratoriumController::class, 'destroy'])->name('destroy');
        Route::put('/{noRawat}/hasil', [LaboratoriumController::class, 'updateHasil'])->name('update-hasil');
    });
    
    // Permintaan Laboratorium routes
    Route::resource('permintaan-lab', PermintaanLabController::class);
    Route::get('/api/reg-periksa', [PermintaanLabController::class, 'getRegPeriksa'])->name('api.reg-periksa');
    Route::resource('radiologi', RadiologiController::class);
    Route::resource('rehabilitasi-medik', RehabilitasiMedikController::class);

    // Farmasi routes
    Route::prefix('farmasi')->name('farmasi.')->group(function () {
        Route::get('/', [DataBarangController::class, 'index'])->name('index');
        Route::get('/dashboard', function () {
            return Inertia::render('farmasi/Dashboard');
        })->name('dashboard');
    });

    // Kategori Perawatan routes
    Route::get('kategori-perawatan/generate-kode', [KategoriPerawatanController::class, 'generateKode'])->name('kategori-perawatan.generate-kode');
    Route::resource('kategori-perawatan', KategoriPerawatanController::class);

    // Daftar Tarif routes
    Route::get('daftar-tarif/generate-kode', [DaftarTarifController::class, 'generateKode'])->name('daftar-tarif.generate-kode');
    Route::resource('daftar-tarif', DaftarTarifController::class);

    // Menu Dashboard page (resources/js/Pages/Menu/menu.jsx)
    Route::get('/menu', function () {
        return Inertia::render('Menu/menu');
    })->name('menu.dashboard');

    // Tarif Tindakan API routes
    Route::prefix('api/tarif-tindakan')->name('api.tarif-tindakan.')->group(function () {
        Route::get('/', [TarifTindakanController::class, 'index'])->name('index');
        Route::get('/dokter', [TarifTindakanController::class, 'getDokter'])->name('get-dokter');
        Route::get('/petugas', [TarifTindakanController::class, 'getPetugas'])->name('get-petugas');
        Route::post('/dokter', [TarifTindakanController::class, 'storeTindakanDokter'])->name('store-dokter');
        Route::post('/perawat', [TarifTindakanController::class, 'storeTindakanPerawat'])->name('store-perawat');
        Route::post('/dokter-perawat', [TarifTindakanController::class, 'storeTindakanDokterPerawat'])->name('store-dokter-perawat');
        Route::get('/riwayat/{noRawat}', [TarifTindakanController::class, 'getRiwayatTindakan'])->name('riwayat')->where('noRawat', '.*');
        Route::delete('/', [TarifTindakanController::class, 'deleteTindakan'])->name('delete');
    });
});

    // Settings routes
    Route::get('/settings/active', [SettingController::class, 'getActiveSetting'])
        ->name('settings.active');

    // Pastikan rute image didefinisikan sebelum resource agar tidak tertangkap oleh show
    Route::get('/settings/{setting}/image/{type}', [SettingController::class, 'getImage'])
        ->name('settings.image');

    Route::resource('settings', SettingController::class)
        ->parameters(['settings' => 'nama_instansi'])
        ->where(['nama_instansi' => '^(?!active$)[^/]+$']);

    Route::post('/settings/{setting}/activate', [SettingController::class, 'activate'])
        ->name('settings.activate');
