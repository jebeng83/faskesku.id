<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\PenjabController;
use App\Http\Controllers\API\WilayahController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RegPeriksaController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RawatJalan\ObatController;
use App\Http\Controllers\RawatJalan\ResepController;
use App\Http\Controllers\API\DokterController;
use App\Http\Controllers\PermintaanLabController;
use App\Http\Controllers\PermintaanRadiologiController;
use App\Http\Controllers\OpnameController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\DataBarangController;
use App\Http\Controllers\GudangBarangController;
use App\Http\Controllers\Farmasi\SetHargaObatController;
use App\Http\Controllers\Pcare\PcareController;

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

// Rawat Jalan API Routes
// API routes untuk obat
Route::get('/obat', [ObatController::class, 'getObatByPoli'])->name('api.obat.index');
Route::get('/obat/{kode_barang}', [ObatController::class, 'getDetailObat'])->name('api.obat.detail');
Route::post('/obat/cek-stok', [ObatController::class, 'cekStokObat'])->name('api.obat.cek-stok');

// API routes untuk resep
Route::post('/resep', [ResepController::class, 'store'])->name('api.resep.store');
Route::get('/resep/stok-info', [ResepController::class, 'getStokInfo'])->name('api.resep.stok-info');
Route::get('/resep/rawat/{no_rawat}', [ResepController::class, 'getByNoRawat'])->where('no_rawat', '.*')->name('api.resep.by-rawat');
Route::get('/resep/pasien/{no_rkm_medis}', [ResepController::class, 'getByNoRkmMedis'])->where('no_rkm_medis', '.*')->name('api.resep.by-pasien');
Route::get('/resep/{no_resep}', [ResepController::class, 'getResep'])->name('api.resep.get');
Route::delete('/resep/{no_resep}', [ResepController::class, 'destroy'])->where('no_resep', '.*')->name('api.resep.delete');

// API routes untuk dokter
Route::get('/dokter', [DokterController::class, 'index'])->name('api.dokter.index');
Route::get('/dokter/{kd_dokter}', [DokterController::class, 'show'])->name('api.dokter.show');

// API routes untuk permintaan laboratorium
Route::get('/lab-tests', [PermintaanLabController::class, 'getLabTests'])->name('api.lab-tests.index');
Route::post('/permintaan-lab', [PermintaanLabController::class, 'store'])->name('api.permintaan-lab.store');
Route::get('/permintaan-lab/rawat/{no_rawat}', [PermintaanLabController::class, 'getByNoRawat'])->where('no_rawat', '.*')->name('api.permintaan-lab.by-rawat');
Route::get('/permintaan-lab/riwayat/{no_rawat}', [PermintaanLabController::class, 'getRiwayat'])->where('no_rawat', '.*')->name('api.permintaan-lab.riwayat');
Route::delete('/permintaan-lab/{noorder}', [PermintaanLabController::class, 'destroy'])->name('api.permintaan-lab.destroy');

// API routes untuk permintaan radiologi
Route::get('/radiologi-tests', [PermintaanRadiologiController::class, 'getJenisPerawatan'])->name('api.radiologi-tests.index');
Route::post('/permintaan-radiologi', [PermintaanRadiologiController::class, 'store'])->name('api.permintaan-radiologi.store');
Route::get('/permintaan-radiologi/rawat/{no_rawat}', [PermintaanRadiologiController::class, 'getByNoRawat'])->where('no_rawat', '.*')->name('api.permintaan-radiologi.by-rawat');
Route::get('/permintaan-radiologi/riwayat/{no_rawat}', [PermintaanRadiologiController::class, 'getRiwayat'])->where('no_rawat', '.*')->name('api.permintaan-radiologi.riwayat');
Route::delete('/permintaan-radiologi/{noorder}', [PermintaanRadiologiController::class, 'destroy'])->name('api.permintaan-radiologi.destroy');

// Farmasi - Stok Opname API Routes
Route::prefix('opname')->group(function () {
    Route::get('/lokasi', [OpnameController::class, 'getLokasi'])->name('api.opname.lokasi');
    Route::get('/data-barang', [OpnameController::class, 'getDataBarang'])->name('api.opname.data-barang');
    Route::post('/store', [OpnameController::class, 'store'])->name('api.opname.store');
    // Listing & pencarian data opname (untuk halaman Data Opname)
    Route::get('/list', [OpnameController::class, 'getOpnameData'])->name('api.opname.list');
    Route::get('/search', [OpnameController::class, 'searchOpnameData'])->name('api.opname.search');
    Route::delete('/delete', [OpnameController::class, 'destroy'])->name('api.opname.delete');
});

// Farmasi - Pembelian Obat API Routes
Route::prefix('pembelian')->group(function () {
    Route::get('/supplier', [PembelianController::class, 'getSupplier'])->name('api.pembelian.supplier');
    Route::get('/petugas', [PembelianController::class, 'getPetugas'])->name('api.pembelian.petugas');
    Route::get('/lokasi', [PembelianController::class, 'getLokasi'])->name('api.pembelian.lokasi');
    Route::get('/akun-bayar', [PembelianController::class, 'getAkunBayar'])->name('api.pembelian.akun-bayar');
    Route::get('/generate-no-faktur', [PembelianController::class, 'generateNoFaktur'])->name('api.pembelian.generate-no-faktur');
    Route::post('/store', [PembelianController::class, 'store'])->name('api.pembelian.store');
});

// Barang search endpoint (used by Pembelian Obat page)
Route::get('/barang/search', [BarangController::class, 'search'])->name('api.barang.search');

// DataBarang price update endpoints (used by Pembelian Obat page)
Route::put('/databarang/update-harga/{kode_brng}', [DataBarangController::class, 'updateHarga'])
    ->where('kode_brng', '.*')
    ->name('api.databarang.update-harga');
Route::put('/databarang/update-harga-jual/{kode_brng}', [DataBarangController::class, 'updateHargaJual'])
    ->where('kode_brng', '.*')
    ->name('api.databarang.update-harga-jual');

// Set Harga Obat percentages (for calculating harga jual from pembelian)
Route::get('/set-harga-obat', [SetHargaObatController::class, 'getPercentageData'])->name('api.set-harga-obat');

// Gudang Barang stock update
Route::post('/gudangbarang/update-stok', [GudangBarangController::class, 'updateStok'])->name('api.gudangbarang.update-stok');

Route::prefix('pcare')->group(function () {
    Route::get('/ping', [PcareController::class, 'ping'])->name('api.pcare.ping');
    Route::match(['get','post','put','delete'], '/proxy/{endpoint}', [PcareController::class, 'proxy'])
        ->where('endpoint','.*')
        ->name('api.pcare.proxy');
    Route::get('/dokter', [PcareController::class, 'getDokter'])->name('api.pcare.dokter');
    Route::get('/faskes', [PcareController::class, 'getFaskes'])->name('api.pcare.faskes');
    Route::get('/poli', [PcareController::class, 'getPoli'])->name('api.pcare.poli');
    Route::get('/kesadaran', [PcareController::class, 'getKesadaran'])->name('api.pcare.kesadaran');
    Route::get('/dpho', [PcareController::class, 'getDpho'])->name('api.pcare.dpho');
    Route::get('/provider', [PcareController::class, 'getProvider'])->name('api.pcare.provider');
    Route::get('/spesialis', [PcareController::class, 'getSpesialis'])->name('api.pcare.spesialis');
    Route::get('/peserta/{noka}/{tglPelayanan}', [PcareController::class, 'pesertaByNoKartu'])->name('api.pcare.peserta-nokartu');
    Route::post('/kunjungan', [PcareController::class, 'daftarKunjungan'])->name('api.pcare.kunjungan.store');
});
