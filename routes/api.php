<?php

use App\Http\Controllers\API\DokterController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\PatientController as ApiPatientController;
use App\Http\Controllers\API\PenjabController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\ReferenceController;
use App\Http\Controllers\API\RegPeriksaController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WilayahController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\DataBarangController;
use App\Http\Controllers\DepartemenController;
use App\Http\Controllers\Farmasi\SetHargaObatController;
use App\Http\Controllers\GudangBarangController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OpnameController;
use App\Http\Controllers\Pcare\MobileJknController;
use App\Http\Controllers\Pcare\PcareController;
use App\Http\Controllers\Pcare\PcareKunjunganController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\PermintaanLabController;
use App\Http\Controllers\PermintaanRadiologiController;
use App\Http\Controllers\PoliklinikController;
use App\Http\Controllers\RawatJalan\ObatController;
use App\Http\Controllers\RawatJalan\RawatJalanController;
use App\Http\Controllers\RawatJalan\ResepController;
use App\Http\Controllers\SatuSehat\SatuSehatController;
use App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController;
use Illuminate\Support\Facades\Route;

Route::post('/employees', [EmployeeController::class, 'store'])->name('api.employees.store');
Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('api.employees.destroy');

Route::get('/penjab', [PenjabController::class, 'index'])->name('api.penjab.index');
Route::get('/penjab/next-code', [PenjabController::class, 'nextCode'])->name('api.penjab.next-code');
Route::post('/penjab', [PenjabController::class, 'store'])->name('api.penjab.store');

// Pasien describe endpoint
Route::get('/pasien/describe', [ApiPatientController::class, 'describe'])->name('api.pasien.describe');

// Reference lookup endpoints
Route::get('/perusahaan-pasien', [ReferenceController::class, 'perusahaanPasien'])->name('api.perusahaan-pasien.index');
Route::get('/suku-bangsa', [ReferenceController::class, 'sukuBangsa'])->name('api.suku-bangsa.index');
Route::get('/bahasa-pasien', [ReferenceController::class, 'bahasaPasien'])->name('api.bahasa-pasien.index');
Route::get('/cacat-fisik', [ReferenceController::class, 'cacatFisik'])->name('api.cacat-fisik.index');

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
Route::get('/resep/list', [ResepController::class, 'list'])->name('api.resep.list');
Route::get('/resep/stok-info', [ResepController::class, 'getStokInfo'])->name('api.resep.stok-info');
Route::get('/resep/rawat/{no_rawat}', [ResepController::class, 'getByNoRawat'])->where('no_rawat', '.*')->name('api.resep.by-rawat');
// Alternatif akses memakai query string untuk menghindari issue 405/404 saat no_rawat berisi '/'
Route::get('/resep/rawat', [ResepController::class, 'getByNoRawatQuery'])->name('api.resep.by-rawat.q');
Route::get('/resep/pasien/{no_rkm_medis}', [ResepController::class, 'getByNoRkmMedis'])->where('no_rkm_medis', '.*')->name('api.resep.by-pasien');
Route::get('/resep/{no_resep}', [ResepController::class, 'getResep'])->name('api.resep.get');
// Catatan: no_resep tidak mengandung karakter '/'. Jangan gunakan pola '.*' agar tidak bentrok dengan route '/resep/rawat/{no_rawat}'.
Route::delete('/resep/{no_resep}', [ResepController::class, 'destroy'])->name('api.resep.delete');
Route::post('/resep/{no_resep}/penyerahan', [ResepController::class, 'penyerahan'])->where('no_resep', '.*')->name('api.resep.penyerahan');

// API routes untuk diagnosa pasien (Rawat Jalan)
Route::get('/rawat-jalan/diagnosa', [RawatJalanController::class, 'getDiagnosaPasien'])->name('api.rawat-jalan.diagnosa.index');
Route::post('/rawat-jalan/diagnosa', [RawatJalanController::class, 'storeDiagnosaPasien'])->name('api.rawat-jalan.diagnosa.store');

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

// Departemen lookup (untuk mapping SATUSEHAT)
Route::get('/departemen', [DepartemenController::class, 'index'])->name('api.departemen.index');

Route::prefix('pcare')->group(function () {
    Route::get('/ping', [PcareController::class, 'ping'])->name('api.pcare.ping');
    Route::match(['get', 'post', 'put', 'delete'], '/proxy/{endpoint}', [PcareController::class, 'proxy'])
        ->where('endpoint', '.*')
        ->name('api.pcare.proxy');
    Route::get('/dokter', [PcareController::class, 'getDokter'])->name('api.pcare.dokter');
    // Referensi Diagnosa (PCare)
    Route::get('/diagnosa', [PcareController::class, 'getDiagnosa'])->name('api.pcare.diagnosa');
    Route::get('/faskes', [PcareController::class, 'getFaskes'])->name('api.pcare.faskes');
    Route::get('/poli', [PcareController::class, 'getPoli'])->name('api.pcare.poli');
    Route::get('/kesadaran', [PcareController::class, 'getKesadaran'])->name('api.pcare.kesadaran');
    Route::get('/dpho', [PcareController::class, 'getDpho'])->name('api.pcare.dpho');
    Route::get('/tindakan', [PcareController::class, 'getTindakan'])->name('api.pcare.tindakan');
    Route::get('/provider', [PcareController::class, 'getProvider'])->name('api.pcare.provider');
    Route::get('/spesialis', [PcareController::class, 'getSpesialis'])->name('api.pcare.spesialis');
    Route::get('/spesialis/subspesialis', [PcareController::class, 'getSubSpesialis'])->name('api.pcare.subspesialis');
    Route::get('/spesialis/sarana', [PcareController::class, 'getSarana'])->name('api.pcare.sarana');
    Route::get('/spesialis/khusus', [PcareController::class, 'getKhusus'])->name('api.pcare.khusus');
    Route::get('/prognosa', [PcareController::class, 'getPrognosa'])->name('api.pcare.prognosa');
    Route::get('/alergi', [PcareController::class, 'getAlergi'])->name('api.pcare.alergi');
    Route::get('/statuspulang', [PcareController::class, 'getStatusPulang'])->name('api.pcare.statuspulang');
    Route::get('/spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}', [PcareController::class, 'getFaskesRujukanSubSpesialis'])->name('api.pcare.faskes-rujukan.subspesialis');
    Route::get('/peserta/{noka}/{tglPelayanan}', [PcareController::class, 'pesertaByNoKartu'])->name('api.pcare.peserta-nokartu');
    Route::post('/kunjungan', [PcareKunjunganController::class, 'store'])->name('api.pcare.kunjungan.store');
    // Add Data Pendaftaran (PCare)
    Route::post('/pendaftaran', [PcareController::class, 'addPendaftaran'])->name('api.pcare.pendaftaran.store');
    // Get latest pendaftaran by nomor rawat
    Route::get('/pendaftaran/rawat/{no_rawat}', [PcareController::class, 'getPendaftaranByRawat'])
        ->where('no_rawat', '.*')
        ->name('api.pcare.pendaftaran.by-rawat');
    // Preview payload kunjungan by nomor rawat (without sending)
    Route::get('/kunjungan/preview/{no_rawat}', [PcareKunjunganController::class, 'preview'])
        ->where('no_rawat', '.*')
        ->name('api.pcare.kunjungan.preview');
    // Get rujukan subspesialis by nomor rawat
    Route::get('/rujuk-subspesialis/rawat/{no_rawat}', [PcareController::class, 'getRujukanSubspesialisByRawat'])
        ->where('no_rawat', '.*')
        ->name('api.pcare.rujuk-subspesialis.by-rawat');
    // Get kabupaten config
    Route::get('/config/kabupaten', [PcareController::class, 'getKabupatenConfig'])
        ->name('api.pcare.config.kabupaten');
});

// SATUSEHAT FHIR API relay endpoints
Route::prefix('satusehat')->group(function () {
    // Token (debug only, protect this route on production)
    Route::get('/token', [SatuSehatController::class, 'token'])->name('api.satusehat.token');
    // Token debug (menampilkan status & body error, tanpa mengekspos kredensial)
    Route::get('/token-debug', [SatuSehatController::class, 'tokenDebug'])->name('api.satusehat.token-debug');
    // CapabilityStatement
    Route::get('/metadata', [SatuSehatController::class, 'metadata'])->name('api.satusehat.metadata');
    // Get Organization by ID from .env
    Route::get('/organization', [SatuSehatController::class, 'organization'])->name('api.satusehat.organization');
    // List sub-organizations (unit/departemen) di bawah Organization induk
    Route::get('/organization/subunits', [SatuSehatController::class, 'organizationSubunits'])->name('api.satusehat.organization.subunits');
    // Update Organization di SATUSEHAT (PUT Organization/:id)
    Route::put('/organization/{id}', [SatuSehatController::class, 'organizationUpdate'])->name('api.satusehat.organization.update');
    // Location search (FHIR Location with optional filters: identifier, name, organization)
    Route::get('/location', [SatuSehatController::class, 'locationSearch'])->name('api.satusehat.location.search');
    // PATCH Location untuk update sebagian (sesuai katalog SATUSEHAT)
    Route::patch('/location/{id}', [SatuSehatController::class, 'locationPatch'])->name('api.satusehat.location.patch');
    // Coordinates config from .env
    Route::get('/config/coordinates', [SatuSehatController::class, 'coordinates'])->name('api.satusehat.config.coordinates');
    // Practitioner search by NIK
    Route::get('/practitioner', [SatuSehatController::class, 'practitionerSearch'])->name('api.satusehat.practitioner.search');
    // Patient search by NIK
    Route::get('/patient', [SatuSehatController::class, 'patientSearch'])->name('api.satusehat.patient.search');
    Route::prefix('rajal')->group(function () {
        Route::post('/encounter', [SatuSehatRajalController::class, 'createEncounter'])->name('api.satusehat.rajal.encounter.create');
        Route::put('/encounter/by-rawat/{no_rawat}', [SatuSehatRajalController::class, 'updateEncounterByRawat'])->where('no_rawat', '.*')->name('api.satusehat.rajal.encounter.update-by-rawat');
        Route::get('/encounter/id-by-rawat/{no_rawat}', [SatuSehatRajalController::class, 'encounterIdByRawat'])->where('no_rawat', '.*')->name('api.satusehat.rajal.encounter.id-by-rawat');
        Route::get('/encounter/describe', [SatuSehatRajalController::class, 'encounterTableDescribe'])->name('api.satusehat.rajal.encounter.describe');
        Route::get('/diagnosa/describe', [SatuSehatRajalController::class, 'diagnosaPasienDescribe'])->name('api.satusehat.rajal.diagnosa.describe');
        Route::post('/condition', [SatuSehatRajalController::class, 'createCondition'])->name('api.satusehat.rajal.condition.create');
        Route::post('/observation', [SatuSehatRajalController::class, 'createObservation'])->name('api.satusehat.rajal.observation.create');
        Route::post('/procedure', [SatuSehatRajalController::class, 'createProcedure'])->name('api.satusehat.rajal.procedure.create');
        Route::post('/composition', [SatuSehatRajalController::class, 'createComposition'])->name('api.satusehat.rajal.composition.create');
        Route::post('/bundle', [SatuSehatRajalController::class, 'createBundle'])->name('api.satusehat.rajal.bundle.create');
        Route::post('/pipeline/by-rawat/{no_rawat}', [SatuSehatRajalController::class, 'pipelineByRawat'])
            ->where('no_rawat', '.*')
            ->name('api.satusehat.rajal.pipeline.by-rawat');
    });
    // CRUD Mapping Departemen ↔ Organization Subunit
    Route::get('/mapping/departemen', [SatuSehatController::class, 'mappingDepartemenIndex'])->name('api.satusehat.mapping.departemen.index');
    Route::post('/mapping/departemen', [SatuSehatController::class, 'mappingDepartemenStore'])->name('api.satusehat.mapping.departemen.store');
    Route::put('/mapping/departemen/{dep_id}', [SatuSehatController::class, 'mappingDepartemenUpdate'])->name('api.satusehat.mapping.departemen.update');
    Route::delete('/mapping/departemen/{dep_id}', [SatuSehatController::class, 'mappingDepartemenDestroy'])->name('api.satusehat.mapping.departemen.destroy');
    // CRUD Mapping Lokasi Ralan (Poliklinik ↔ SATUSEHAT Location)
    Route::get('/mapping/lokasi', [SatuSehatController::class, 'mappingLokasiIndex'])->name('api.satusehat.mapping.lokasi.index');
    Route::post('/mapping/lokasi', [SatuSehatController::class, 'mappingLokasiStore'])->name('api.satusehat.mapping.lokasi.store');
    Route::put('/mapping/lokasi/{kd_poli}', [SatuSehatController::class, 'mappingLokasiUpdate'])->name('api.satusehat.mapping.lokasi.update');
    Route::delete('/mapping/lokasi/{kd_poli}', [SatuSehatController::class, 'mappingLokasiDestroy'])->name('api.satusehat.mapping.lokasi.destroy');
// CRUD Mapping Lokasi Ranap (Kamar ↔ SATUSEHAT Location)
Route::get('/mapping/lokasi-ranap', [SatuSehatController::class, 'mappingLokasiRanapIndex'])->name('api.satusehat.mapping.lokasi_ranap.index');
Route::post('/mapping/lokasi-ranap', [SatuSehatController::class, 'mappingLokasiRanapStore'])->name('api.satusehat.mapping.lokasi_ranap.store');
Route::put('/mapping/lokasi-ranap/{kd_kamar}', [SatuSehatController::class, 'mappingLokasiRanapUpdate'])->name('api.satusehat.mapping.lokasi_ranap.update');
Route::delete('/mapping/lokasi-ranap/{kd_kamar}', [SatuSehatController::class, 'mappingLokasiRanapDestroy'])->name('api.satusehat.mapping.lokasi_ranap.destroy');
// Referensi Kamar (untuk dropdown/select)
Route::get('/ranap/kamar', [SatuSehatController::class, 'kamarList'])->name('api.satusehat.ranap.kamar');
    // CRUD Mapping Lokasi Farmasi (Bangsal ↔ SATUSEHAT Location)
    Route::get('/mapping/lokasi-farmasi', [SatuSehatController::class, 'mappingLokasiFarmasiIndex'])->name('api.satusehat.mapping.lokasi_farmasi.index');
    Route::post('/mapping/lokasi-farmasi', [SatuSehatController::class, 'mappingLokasiFarmasiStore'])->name('api.satusehat.mapping.lokasi_farmasi.store');
    Route::put('/mapping/lokasi-farmasi/{kd_bangsal}', [SatuSehatController::class, 'mappingLokasiFarmasiUpdate'])->name('api.satusehat.mapping.lokasi_farmasi.update');
    Route::delete('/mapping/lokasi-farmasi/{kd_bangsal}', [SatuSehatController::class, 'mappingLokasiFarmasiDestroy'])->name('api.satusehat.mapping.lokasi_farmasi.destroy');
    // Generic resource relay
    // Batasi hanya ke resource FHIR umum agar tidak bentrok dengan endpoint khusus
    Route::post('/{resource}', [SatuSehatController::class, 'createResource'])
        ->where('resource', '^(?:Patient|Encounter|Observation|Condition|Composition|Procedure|Practitioner|Organization|Location|Bundle)$')
        ->name('api.satusehat.create');
    Route::get('/{resource}/{id}', [SatuSehatController::class, 'getResource'])
        ->where('resource', '^(?:Patient|Encounter|Observation|Condition|Composition|Procedure|Practitioner|Organization|Location|Bundle)$')
        ->name('api.satusehat.get');
});

// Mobile JKN API Routes
Route::prefix('mobilejkn')->group(function () {
    // Debug: lihat konfigurasi yang terpakai (gunakan untuk memastikan .env & DB sudah benar)
    Route::get('/config', [MobileJknController::class, 'config'])->name('api.mobilejkn.config');
    // Referensi Poli (tanggal as query: ?tanggal=YYYY-MM-DD)
    Route::get('/ref/poli', [MobileJknController::class, 'getReferensiPoli'])->name('api.mobilejkn.ref.poli');
    // Referensi Dokter per Poli (query: ?kodepoli=XXX&tanggal=YYYY-MM-DD)
    Route::get('/ref/dokter', [MobileJknController::class, 'getReferensiDokter'])->name('api.mobilejkn.ref.dokter');
    // Tambah Antrean
    Route::post('/antrean/add', [MobileJknController::class, 'addAntrean'])->name('api.mobilejkn.antrean.add');
    // Panggil/Update Status Antrean
    Route::post('/antrean/panggil', [MobileJknController::class, 'panggilAntrean'])->name('api.mobilejkn.antrean.panggil');
    // Batal Antrean
    Route::post('/antrean/batal', [MobileJknController::class, 'batalAntrean'])->name('api.mobilejkn.antrean.batal');
});

// Jadwal API Routes
Route::prefix('jadwal')->group(function () {
    // List jadwal (join dokter & poliklinik)
    Route::get('/', [JadwalController::class, 'list'])->name('api.jadwal.index');
    // Simpan jadwal baru
    Route::post('/', [JadwalController::class, 'store'])->name('api.jadwal.store');
    // Update jadwal
    Route::put('/', [JadwalController::class, 'update'])->name('api.jadwal.update');
    // Hapus jadwal
    Route::delete('/', [JadwalController::class, 'destroy'])->name('api.jadwal.destroy');
    // Hari kerja enum values
    Route::get('/hari', [JadwalController::class, 'getHariKerja'])->name('api.jadwal.hari');
    // Describe tabel jadwal
    Route::get('/describe', [JadwalController::class, 'describe'])->name('api.jadwal.describe');
});

// RS lookup endpoints (v1) - tidak membutuhkan sesi auth, dipakai oleh Typeahead di MasterData/Jadwal
Route::prefix('v1/rs')->group(function () {
    // Cari dokter RS dari tabel lokal 'dokter'
    Route::get('/dokter', [PcareController::class, 'searchDokterRs'])->name('api.v1.rs.dokter');
    // Cari poliklinik RS dari tabel lokal 'poliklinik'
    Route::get('/poliklinik', [PcareController::class, 'searchPoliklinikRs'])->name('api.v1.rs.poliklinik');
});

// Poliklinik lookup (SearchableSelect) - ringan tanpa auth
Route::get('/poliklinik', [PoliklinikController::class, 'apiIndex'])->name('api.poliklinik.index');
