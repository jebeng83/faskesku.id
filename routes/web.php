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
use App\Http\Controllers\Farmasi\IndustriFarmasiController;
use App\Http\Controllers\Farmasi\DataSuplierController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\SpesialisController;
use App\Http\Controllers\DaftarTarifController;
use App\Http\Controllers\RegistrationController;
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

    // Registration routes
    Route::get('/registration', [RegistrationController::class, 'index'])->name('registration.index')->middleware('menu.permission');
    Route::get('/registration/search-patients', [RegistrationController::class, 'searchPatients'])->name('registration.search-patients');
    Route::post('/registration/{patient}/register', [RegistrationController::class, 'registerPatient'])->name('registration.register-patient');
    Route::get('/registration/{patient}/check-poli-status', [RegistrationController::class, 'checkPatientPoliStatus'])->name('registration.check-poli-status');
    Route::get('/registration/get-registrations', [RegistrationController::class, 'getRegistrations'])->name('registration.get-registrations');
    Route::post('/registration/cancel', [RegistrationController::class, 'cancelRegistration'])->name('registration.cancel');

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
    
    // Surat Sehat dan Surat Sakit routes
    Route::get('rawat-jalan/surat-sehat/{no_rawat}', [RawatJalanController::class, 'suratSehat'])
        ->where('no_rawat', '.*')
        ->name('rawat-jalan.surat-sehat');
    Route::post('rawat-jalan/surat-sehat', [RawatJalanController::class, 'storeSuratSehat'])->name('rawat-jalan.surat-sehat.store');
    Route::get('rawat-jalan/surat-sakit/{no_rawat}', [RawatJalanController::class, 'suratSakit'])
        ->where('no_rawat', '.*')
        ->name('rawat-jalan.surat-sakit');
    Route::post('rawat-jalan/surat-sakit', [RawatJalanController::class, 'storeSuratSakit'])->name('rawat-jalan.surat-sakit.store');

    // API routes untuk obat
    Route::get('api/obat', [ObatController::class, 'getObatByPoli'])->name('api.obat.index');
    Route::get('api/obat/{kode_barang}', [ObatController::class, 'getDetailObat'])->name('api.obat.detail');
    Route::post('api/obat/cek-stok', [ObatController::class, 'cekStokObat'])->name('api.obat.cek-stok');

    // API routes untuk resep
    Route::post('api/resep', [ResepController::class, 'store'])->name('api.resep.store');
    Route::get('api/resep/{no_resep}', [ResepController::class, 'getResep'])->name('api.resep.get');
    Route::get('api/resep/rawat/{no_rawat}', [ResepController::class, 'getByNoRawat'])->name('api.resep.by-rawat');

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

    // Kategori Perawatan routes
    Route::get('kategori-perawatan/generate-kode', [KategoriPerawatanController::class, 'generateKode'])->name('kategori-perawatan.generate-kode');
    Route::resource('kategori-perawatan', KategoriPerawatanController::class);

    // Daftar Tarif routes
    Route::get('daftar-tarif/generate-kode', [DaftarTarifController::class, 'generateKode'])->name('daftar-tarif.generate-kode');
    Route::post('daftar-tarif/store-rawat-inap', [DaftarTarifController::class, 'storeRawatInap'])->name('daftar-tarif.store-rawat-inap');
    // Update templates laboratorium for a specific jenis perawatan
    Route::put('daftar-tarif/laboratorium/{kd_jenis_prw}/templates', [DaftarTarifController::class, 'updateLaboratoriumTemplates'])->name('daftar-tarif.laboratorium.update-templates');
    Route::patch('daftar-tarif/{id}/update-status', [DaftarTarifController::class, 'updateStatus'])->name('daftar-tarif.update-status');
    Route::resource('daftar-tarif', DaftarTarifController::class);

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

    // Farmasi routes
    Route::prefix('farmasi')->name('farmasi.')->group(function () {
        // Landing page for Farmasi module
        Route::get('/', function () {
            return Inertia::render('farmasi/Index');
        })->name('index');

        // Dashboard & Analitik page
        Route::get('/dashboard', function () {
            return Inertia::render('farmasi/Dashboard');
        })->name('dashboard');

        Route::get('/pembelian-obat', function () {
            return Inertia::render('farmasi/PembelianObat');
        })->name('pembelian-obat');

        Route::get('/penjualan-obat', function () {
            return Inertia::render('farmasi/PenjualanObat');
        })->name('penjualan-obat');

        Route::get('/resep-obat', function () {
            return Inertia::render('farmasi/ResepObat');
        })->name('resep-obat');

        Route::get('/riwayat-transaksi-gudang', function () {
            return Inertia::render('farmasi/RiwayatTransaksiGudang');
        })->name('riwayat-transaksi-gudang');

        Route::get('/stok-obat', function () {
            return Inertia::render('farmasi/StokObat');
        })->name('stok-obat');

        Route::get('/stok-opname', function () {
            return Inertia::render('farmasi/StokOpname');
        })->name('stok-opname');
        
        // Data Obat (DataBarang) CRUD routes with auto-code via props.nextCode
Route::get('/data-obat', [\App\Http\Controllers\Farmasi\DataBarangController::class, 'index'])->name('data-obat');
Route::post('/data-obat', [\App\Http\Controllers\Farmasi\DataBarangController::class, 'store'])->name('data-obat.store');
Route::put('/data-obat/{kode_brng}', [\App\Http\Controllers\Farmasi\DataBarangController::class, 'update'])->name('data-obat.update');
Route::patch('/data-obat/{kode_brng}', [\App\Http\Controllers\Farmasi\DataBarangController::class, 'update']);
Route::delete('/data-obat/{kode_brng}', [\App\Http\Controllers\Farmasi\DataBarangController::class, 'destroy'])->name('data-obat.destroy');

// Bulk update semua harga jual databarang berdasarkan konfigurasi Set Harga Obat
Route::put('/data-obat/update-harga-semua', [\App\Http\Controllers\Farmasi\DataBarangController::class, 'updateHargaSemua'])->name('data-obat.update-harga-semua');

        // Simpan pengaturan harga per barang
        Route::post('/set-penjualan-barang', [\App\Http\Controllers\Farmasi\SetHargaObatController::class, 'storePenjualanPerBarang'])->name('set-penjualan-barang.store');
        // Ambil pengaturan harga per barang yang tersimpan (JSON)
        Route::get('/set-penjualan-barang/{kode_brng}', [\App\Http\Controllers\Farmasi\SetHargaObatController::class, 'showPenjualanPerBarang'])->name('set-penjualan-barang.show');
        // Hapus pengaturan harga per barang
        Route::delete('/set-penjualan-barang/{kode_brng}', [\App\Http\Controllers\Farmasi\SetHargaObatController::class, 'destroyPenjualanPerBarang'])->name('set-penjualan-barang.destroy');

        // Ambil pengaturan harga umum (JSON)
        Route::get('/set-penjualan-umum', [\App\Http\Controllers\Farmasi\SetHargaObatController::class, 'showPenjualanUmum'])->name('set-penjualan-umum.show');
        // Update pengaturan harga umum (POST sudah ada di bawah - alias global)
        
        // Kategori Obat CRUD routes (no migrations/seeding required)
        Route::get('/kategori-obat', [\App\Http\Controllers\Farmasi\KategoriBarangController::class, 'index'])->name('kategori-obat.index');
        Route::post('/kategori-obat', [\App\Http\Controllers\Farmasi\KategoriBarangController::class, 'store'])->name('kategori-obat.store');
        Route::put('/kategori-obat/{kode}', [\App\Http\Controllers\Farmasi\KategoriBarangController::class, 'update'])->name('kategori-obat.update');
        Route::patch('/kategori-obat/{kode}', [\App\Http\Controllers\Farmasi\KategoriBarangController::class, 'update']);
        Route::delete('/kategori-obat/{kode}', [\App\Http\Controllers\Farmasi\KategoriBarangController::class, 'destroy'])->name('kategori-obat.destroy');

        // Golongan Obat CRUD routes (no migrations/seeding required)
        Route::get('/set-penjualan/{kdjns}', [\App\Http\Controllers\Farmasi\SetHargaObatController::class, 'showPenjualanPerJenis'])->name('set-penjualan.show');
        // Endpoint JSON untuk konfigurasi set_harga_obat (single-row table)
        Route::get('/set-harga-obat/json', [\App\Http\Controllers\Farmasi\SetHargaObatController::class, 'getPercentageData'])->name('set-harga-obat.json');

        Route::get('/golongan-obat', [\App\Http\Controllers\Farmasi\GolonganBarangController::class, 'index'])->name('golongan-obat.index');
        Route::post('/golongan-obat', [\App\Http\Controllers\Farmasi\GolonganBarangController::class, 'store'])->name('golongan-obat.store');
        Route::put('/golongan-obat/{kode}', [\App\Http\Controllers\Farmasi\GolonganBarangController::class, 'update'])->name('golongan-obat.update');
        Route::patch('/golongan-obat/{kode}', [\App\Http\Controllers\Farmasi\GolonganBarangController::class, 'update']);
        Route::delete('/golongan-obat/{kode}', [\App\Http\Controllers\Farmasi\GolonganBarangController::class, 'destroy'])->name('golongan-obat.destroy');

        // Industri Farmasi CRUD routes (no migrations/seeding required)
        Route::get('/industri-farmasi', [IndustriFarmasiController::class, 'index'])->name('industri-farmasi.index');
        Route::post('/industri-farmasi', [IndustriFarmasiController::class, 'store'])->name('industri-farmasi.store');
        Route::put('/industri-farmasi/{kode_industri}', [IndustriFarmasiController::class, 'update'])->name('industri-farmasi.update');
        Route::patch('/industri-farmasi/{kode_industri}', [IndustriFarmasiController::class, 'update']);
        Route::delete('/industri-farmasi/{kode_industri}', [IndustriFarmasiController::class, 'destroy'])->name('industri-farmasi.destroy');

        // Data Suplier CRUD routes (no migrations/seeding required)
        Route::get('/datasuplier', [DataSuplierController::class, 'index'])->name('datasuplier.index');
        Route::post('/datasuplier', [DataSuplierController::class, 'store'])->name('datasuplier.store');
        Route::put('/datasuplier/{kode_suplier}', [DataSuplierController::class, 'update'])->name('datasuplier.update');
        Route::patch('/datasuplier/{kode_suplier}', [DataSuplierController::class, 'update']);
        Route::delete('/datasuplier/{kode_suplier}', [DataSuplierController::class, 'destroy'])->name('datasuplier.destroy');

        // Backward-compatible alias for old menu path
        Route::get('/supplier', function () {
            return redirect()->route('farmasi.datasuplier.index');
        })->name('supplier.index');

        // Satuan Barang CRUD routes (no migrations/seeding required)
        Route::get('/satuan-barang', [\App\Http\Controllers\Farmasi\SatuanBarangController::class, 'index'])->name('satuan-barang.index');
        Route::post('/satuan-barang', [\App\Http\Controllers\Farmasi\SatuanBarangController::class, 'store'])->name('satuan-barang.store');
        Route::put('/satuan-barang/{kode_sat}', [\App\Http\Controllers\Farmasi\SatuanBarangController::class, 'update'])->name('satuan-barang.update');
        Route::patch('/satuan-barang/{kode_sat}', [\App\Http\Controllers\Farmasi\SatuanBarangController::class, 'update']);
        Route::delete('/satuan-barang/{kode_sat}', [\App\Http\Controllers\Farmasi\SatuanBarangController::class, 'destroy'])->name('satuan-barang.destroy');

        // Metode Racik CRUD routes (no migrations/seeding required)
        Route::get('/metode-racik', [\App\Http\Controllers\Farmasi\MetodeRacikController::class, 'index'])->name('metode-racik.index');
        Route::post('/metode-racik', [\App\Http\Controllers\Farmasi\MetodeRacikController::class, 'store'])->name('metode-racik.store');
        Route::put('/metode-racik/{kd_racik}', [\App\Http\Controllers\Farmasi\MetodeRacikController::class, 'update'])->name('metode-racik.update');
        Route::patch('/metode-racik/{kd_racik}', [\App\Http\Controllers\Farmasi\MetodeRacikController::class, 'update']);
        Route::delete('/metode-racik/{kd_racik}', [\App\Http\Controllers\Farmasi\MetodeRacikController::class, 'destroy'])->name('metode-racik.destroy');

        // Konversi Satuan CRUD routes (no migrations/seeding required)
        Route::get('/konversi-satuan', [\App\Http\Controllers\Farmasi\KonversiSatuanController::class, 'index'])->name('konversi-satuan.index');
        Route::post('/konversi-satuan', [\App\Http\Controllers\Farmasi\KonversiSatuanController::class, 'store'])->name('konversi-satuan.store');
        Route::put('/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}', [\App\Http\Controllers\Farmasi\KonversiSatuanController::class, 'update'])->name('konversi-satuan.update');
        Route::patch('/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}', [\App\Http\Controllers\Farmasi\KonversiSatuanController::class, 'update']);
        Route::delete('/konversi-satuan/{kode_sat}/{sat_konversi}/{nilai}/{nilai_konversi}', [\App\Http\Controllers\Farmasi\KonversiSatuanController::class, 'destroy'])->name('konversi-satuan.destroy');

        // Jenis Obat CRUD routes (no migrations/seeding required)
        Route::get('/jenis-obat', [\App\Http\Controllers\Farmasi\JenisObatController::class, 'index'])->name('jenis-obat.index');
        Route::post('/jenis-obat', [\App\Http\Controllers\Farmasi\JenisObatController::class, 'store'])->name('jenis-obat.store');
        Route::put('/jenis-obat/{kdjns}', [\App\Http\Controllers\Farmasi\JenisObatController::class, 'update'])->name('jenis-obat.update');
        Route::patch('/jenis-obat/{kdjns}', [\App\Http\Controllers\Farmasi\JenisObatController::class, 'update']);
        Route::delete('/jenis-obat/{kdjns}', [\App\Http\Controllers\Farmasi\JenisObatController::class, 'destroy'])->name('jenis-obat.destroy');
    });

    Route::middleware(['auth'])->group(function () {
        Route::get('/penjab', [\App\Http\Controllers\PenjabController::class, 'index'])->name('penjab.index');
        Route::post('/penjab', [\App\Http\Controllers\PenjabController::class, 'store'])->name('penjab.store');
        Route::put('/penjab/{kd_pj}', [\App\Http\Controllers\PenjabController::class, 'update'])->name('penjab.update');
        Route::patch('/penjab/{kd_pj}/toggle-status', [\App\Http\Controllers\PenjabController::class, 'toggleStatus'])->name('penjab.toggle-status');
    });
});
// Routes for Set Harga Obat (Farmasi)
use App\Http\Controllers\Farmasi\SetHargaObatController;

// Pengaturan Harga Obat
Route::get('/farmasi/set-harga-obat', [SetHargaObatController::class, 'index'])
    ->name('farmasi.set-harga-obat');
Route::post('/farmasi/set-harga-obat', [SetHargaObatController::class, 'update'])
    ->name('set-harga-obat.update');

// Pengaturan Harga Umum (setpenjualanumum)
Route::post('/farmasi/set-penjualan-umum', [SetHargaObatController::class, 'updatePenjualanUmum'])
    ->name('set-penjualan-umum.update');

// Pengaturan Harga Per Jenis (setpenjualan)
Route::post('/farmasi/set-penjualan', [SetHargaObatController::class, 'storePenjualanPerJenis'])
    ->name('set-penjualan.store');
// Hapus pengaturan harga per jenis
Route::delete('/farmasi/set-penjualan/{kdjns}', [SetHargaObatController::class, 'destroyPenjualanPerJenis'])
    ->name('set-penjualan.destroy');
