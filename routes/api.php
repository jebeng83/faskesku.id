<?php

use App\Http\Controllers\Akutansi\JurnalController;
use App\Http\Controllers\Akutansi\NotaJalanController;
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
use App\Http\Controllers\Farmasi\SetHargaObatController;
use App\Http\Controllers\Farmasi\SisaStokController;
use App\Http\Controllers\Farmasi\SirkulasiObatController;
use App\Http\Controllers\GudangBarangController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\Kepegawaian\DepartemenController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OpnameController;
use App\Http\Controllers\Pcare\MobileJknController;
use App\Http\Controllers\Pcare\PcareController;
use App\Http\Controllers\Pcare\PcareKunjunganController;
use App\Http\Controllers\Farmasi\PembelianController as FarmasiPembelianController;
use App\Http\Controllers\Farmasi\PemesananController as FarmasiPemesananController;
use App\Http\Controllers\PermintaanLabController;
use App\Http\Controllers\PermintaanRadiologiController;
use App\Http\Controllers\PoliklinikController;
use App\Http\Controllers\RawatJalan\ObatController;
use App\Http\Controllers\RawatJalan\RawatJalanController;
use App\Http\Controllers\RawatJalan\ResepController;
use App\Http\Controllers\SatuSehat\PelayananRawatJalan\SatuSehatRajalController;
use App\Http\Controllers\SatuSehat\SatuSehatController;
use App\Http\Controllers\RawatInapController;
use Illuminate\Support\Facades\Route;

// Public endpoints (tidak memerlukan authentication)
// Hanya endpoint referensi yang benar-benar tidak sensitif

// Wilayah routes (public karena digunakan untuk form dropdown) - Tanpa prefix 'public'
Route::get('/wilayah/provinces', [WilayahController::class, 'provinces'])->name('api.public.wilayah.provinces');
Route::get('/wilayah/regencies/{provinceCode}', [WilayahController::class, 'regencies'])->name('api.public.wilayah.regencies');
Route::get('/wilayah/districts/{regencyCode}', [WilayahController::class, 'districts'])->name('api.public.wilayah.districts');
Route::get('/wilayah/villages/{districtCode}', [WilayahController::class, 'villages'])->name('api.public.wilayah.villages');
Route::get('/wilayah/search', [WilayahController::class, 'search'])->name('api.public.wilayah.search');

// Public endpoints for Registration (Pasien Baru) - Tanpa prefix 'public' agar sesuai dengan frontend
Route::get('/wilayah/all-villages', [WilayahController::class, 'allVillages'])->name('api.public.wilayah.all-villages');
Route::get('/pasien/next-no-rm', [ApiPatientController::class, 'nextNoRM'])->name('api.public.pasien.next-no-rm');
Route::get('/penjab', [PenjabController::class, 'index'])->name('api.public.penjab.index');

// Public endpoints for Reference Options
Route::get('/perusahaan-pasien', [ReferenceController::class, 'perusahaanPasien'])->name('api.public.perusahaan-pasien.index');
Route::get('/perusahaan-pasien/next-code', [\App\Http\Controllers\API\PerusahaanPasienController::class, 'nextCode'])->name('api.public.perusahaan-pasien.next-code');
Route::get('/suku-bangsa', [ReferenceController::class, 'sukuBangsa'])->name('api.public.suku-bangsa.index');
Route::get('/bahasa-pasien', [ReferenceController::class, 'bahasaPasien'])->name('api.public.bahasa-pasien.index');
Route::get('/cacat-fisik', [ReferenceController::class, 'cacatFisik'])->name('api.public.cacat-fisik.index');

// Protected API endpoints (memerlukan authentication)
// Menggunakan 'auth:sanctum' untuk Inertia.js SPA authentication
// Sanctum akan otomatis menggunakan session-based auth untuk requests dari stateful domains
// (localhost, 127.0.0.1:8000, dll) dan token-based auth untuk external API
    Route::middleware('auth:sanctum')->group(function () {
    Route::post('/employees', [EmployeeController::class, 'store'])->name('api.employees.store');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('api.employees.destroy');

    Route::get('/penjab/next-code', [PenjabController::class, 'nextCode'])->name('api.penjab.next-code');
    Route::post('/penjab', [PenjabController::class, 'store'])->name('api.penjab.store');

    // Pasien describe endpoint
    Route::get('/pasien/describe', [ApiPatientController::class, 'describe'])->name('api.pasien.describe');

    // Reference lookup endpoints - moved to public
    
    // Wilayah routes (protected version)
    Route::get('/wilayah/provinces', [WilayahController::class, 'provinces'])->name('api.wilayah.provinces');
    Route::get('/wilayah/regencies/{provinceCode}', [WilayahController::class, 'regencies'])->name('api.wilayah.regencies');
    Route::get('/wilayah/districts/{regencyCode}', [WilayahController::class, 'districts'])->name('api.wilayah.districts');
    Route::get('/wilayah/villages/{districtCode}', [WilayahController::class, 'villages'])->name('api.wilayah.villages');
    // all-villages moved to public
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
        // Endpoint aman untuk ambil data berdasarkan no_rawat (mendukung karakter '/')
        Route::get('/by-rawat', [RegPeriksaController::class, 'findByNoRawat'])->name('api.reg-periksa.by-rawat');
        // Endpoint khusus untuk update status_bayar saja (harus didefinisikan sebelum route umum)
        Route::put('/{regPeriksa}/status-bayar', [RegPeriksaController::class, 'updateStatusBayar'])
            ->where('regPeriksa', '.*')
            ->name('api.reg-periksa.update-status-bayar');
        Route::get('/{regPeriksa}', [RegPeriksaController::class, 'show'])
            ->where('regPeriksa', '^(?!by-rawat$).*')
            ->name('api.reg-periksa.show');
        Route::put('/{regPeriksa}', [RegPeriksaController::class, 'update'])
            ->where('regPeriksa', '^(?!.*status-bayar$).*')
            ->name('api.reg-periksa.update');
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
    Route::get('/resep/qrcode', [ResepController::class, 'generateQrCode'])->name('api.resep.qrcode');
    Route::get('/resep/rawat/{no_rawat}', [ResepController::class, 'getByNoRawat'])->where('no_rawat', '.*')->name('api.resep.by-rawat');
    // Alternatif akses memakai query string untuk menghindari issue 405/404 saat no_rawat berisi '/'
    Route::get('/resep/rawat', [ResepController::class, 'getByNoRawatQuery'])->name('api.resep.by-rawat.q');
    Route::get('/resep/pasien/{no_rkm_medis}', [ResepController::class, 'getByNoRkmMedis'])->where('no_rkm_medis', '.*')->name('api.resep.by-pasien');
    Route::get('/resep/{no_resep}', [ResepController::class, 'getResep'])->name('api.resep.get');
    // Catatan: no_resep tidak mengandung karakter '/'. Jangan gunakan pola '.*' agar tidak bentrok dengan route '/resep/rawat/{no_rawat}'.
    Route::delete('/resep/{no_resep}', [ResepController::class, 'destroy'])->name('api.resep.delete');
    Route::post('/resep/{no_resep}/validasi', [ResepController::class, 'validasi'])->where('no_resep', '.*')->name('api.resep.validasi');
    Route::post('/resep/{no_resep}/penyerahan', [ResepController::class, 'penyerahan'])->where('no_resep', '.*')->name('api.resep.penyerahan');

    // API routes untuk diagnosa pasien (Rawat Jalan)
    Route::get('/rawat-jalan/diagnosa', [RawatJalanController::class, 'getDiagnosaPasien'])->name('api.rawat-jalan.diagnosa.index');
    Route::post('/rawat-jalan/diagnosa', [RawatJalanController::class, 'storeDiagnosaPasien'])->name('api.rawat-jalan.diagnosa.store');
    // API routes untuk diagnosa pasien (Rawat Inap)
    Route::get('/rawat-inap/diagnosa', [RawatInapController::class, 'getDiagnosaRanap'])->name('api.rawat-inap.diagnosa.index');
    Route::post('/rawat-inap/diagnosa', [RawatInapController::class, 'storeDiagnosaRanap'])->name('api.rawat-inap.diagnosa.store');
    Route::get('/penyakit', [RawatJalanController::class, 'searchPenyakit'])->name('api.penyakit.index');

    // API routes untuk dokter
    Route::get('/dokter', [DokterController::class, 'index'])->name('api.dokter.index');
    Route::get('/dokter/{kd_dokter}', [DokterController::class, 'show'])->name('api.dokter.show');

    // API routes untuk permintaan laboratorium
    Route::get('/lab-tests', [PermintaanLabController::class, 'getLabTests'])->name('api.lab-tests.index');
    Route::get('/permintaan-lab/templates/{kdJenisPrw}', [PermintaanLabController::class, 'getTemplates'])->name('api.permintaan-lab.templates');
    Route::get('/permintaan-lab/templates', [PermintaanLabController::class, 'getTemplates'])->name('api.permintaan-lab.templates.query');
    Route::post('/permintaan-lab', [PermintaanLabController::class, 'store'])->name('api.permintaan-lab.store');
    Route::post('/permintaan-lab/stage-lab', [PermintaanLabController::class, 'stageJurnalLab'])->name('api.permintaan-lab.stage-lab');
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
        Route::get('/supplier', [FarmasiPembelianController::class, 'getSupplier'])->name('api.pembelian.supplier');
        Route::get('/petugas', [FarmasiPembelianController::class, 'getPetugas'])->name('api.pembelian.petugas');
        Route::get('/lokasi', [FarmasiPembelianController::class, 'getLokasi'])->name('api.pembelian.lokasi');
        Route::get('/akun-bayar', [FarmasiPembelianController::class, 'getAkunBayar'])->name('api.pembelian.akun-bayar');
        Route::get('/generate-no-faktur', [FarmasiPembelianController::class, 'generateNoFaktur'])->name('api.pembelian.generate-no-faktur');
        Route::post('/store', [FarmasiPembelianController::class, 'store'])->name('api.pembelian.store');
    });

    // Farmasi - Pemesanan (PO) API Routes
    Route::prefix('pemesanan')->group(function () {
        Route::get('/generate-no-order', [FarmasiPemesananController::class, 'generateNoOrder'])->name('api.pemesanan.generate-no-order');
        Route::post('/store', [FarmasiPemesananController::class, 'store'])->name('api.pemesanan.store');
    });

    // Farmasi - Hutang Obat (Payables) API Routes
    Route::prefix('farmasi/hutang')->group(function () {
        Route::get('/', [FarmasiPemesananController::class, 'listHutang'])->name('api.farmasi.hutang.index');
        Route::post('/stage', [FarmasiPemesananController::class, 'stagePelunasan'])->name('api.farmasi.hutang.stage');
        Route::patch('/{no_faktur}/mark-paid', [FarmasiPemesananController::class, 'markPaid'])->name('api.farmasi.hutang.mark-paid');
    });

    // Barang search endpoint (used by Pembelian Obat page)
    Route::get('/barang/search', [BarangController::class, 'search'])->name('api.barang.search');

    Route::get('/inventori/sisa-stok', [SisaStokController::class, 'index'])->name('api.inventori.sisa-stok');
    Route::get('/inventori/sirkulasi-barang', [SirkulasiObatController::class, 'index'])->name('api.inventori.sirkulasi-barang');

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

    // API untuk mengambil data apoteker dari sip_pegawai
    Route::get('/sip-pegawai/apoteker', function () {
        $apoteker = \App\Models\Kepegawaian\SipPegawai::where('jnj_jabatan', 'Apt')
            ->where('status', '1')
            ->with('employee')
            ->first();

        if (! $apoteker) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Data apoteker tidak ditemukan',
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'nik' => $apoteker->nik,
                'nama' => $apoteker->employee->nama ?? '',
                'no_sip' => $apoteker->no_sip ?? '',
            ],
        ]);
    })->name('api.sip-pegawai.apoteker');

    // SIP Pegawai yang akan habis dalam 30 hari
    Route::get('/sip-pegawai/expiring', function () {
        $now = now()->startOfDay();
        $limit = now()->addDays(30)->endOfDay();

        $rows = \App\Models\Kepegawaian\SipPegawai::where('status', '1')
            ->whereNotNull('masa_berlaku')
            ->whereBetween('masa_berlaku', [$now, $limit])
            ->with(['employee' => function ($q) {
                $q->select('nik', 'nama', 'jbtn');
            }])
            ->orderBy('masa_berlaku')
            ->get();

        $data = $rows->map(function ($r) use ($now) {
            $days = $r->masa_berlaku ? $now->diffInDays($r->masa_berlaku, false) : null;

            return [
                'nik' => $r->nik,
                'nama' => $r->employee->nama ?? '',
                'jabatan' => $r->employee->jbtn ?? '',
                'masa_berlaku' => optional($r->masa_berlaku)->format('Y-m-d'),
                'days_remaining' => $days,
            ];
        });

        return response()->json([
            'success' => true,
            'count' => $data->count(),
            'data' => $data,
        ]);
    })->name('api.sip-pegawai.expiring');

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

    // Akutansi - Nota Jalan & Jurnal
    // Akutansi: Cek & buat nota_jalan
    Route::get('/akutansi/nota-jalan/exists', [NotaJalanController::class, 'exists'])->name('api.akutansi.nota-jalan.exists');
    Route::post('/akutansi/nota-jalan', [NotaJalanController::class, 'store'])->name('api.akutansi.nota-jalan.store');
    Route::post('/akutansi/nota-jalan/snapshot', [NotaJalanController::class, 'snapshot'])->name('api.akutansi.nota-jalan.snapshot');
    // Route PDF harus sebelum route {no_rawat} yang lebih umum
    Route::get('/akutansi/nota-jalan/{no_rawat}/pdf', [NotaJalanController::class, 'pdf'])->name('api.akutansi.nota-jalan.pdf')->where('no_rawat', '.*');
    Route::get('/akutansi/nota-jalan/{no_rawat}', [NotaJalanController::class, 'show'])->name('api.akutansi.nota-jalan.show')->where('no_rawat', '.*');

    // Akutansi: Jurnal staging & posting
    Route::post('/akutansi/jurnal/stage-from-billing', [JurnalController::class, 'stageFromBilling'])->name('api.akutansi.jurnal.stage-from-billing');
    Route::post('/akutansi/jurnal/post-staging', [JurnalController::class, 'postStaging'])->name('api.akutansi.jurnal.post-staging');
    // Single Posting Point: Posting dari tampjurnal + tampjurnal2 (untuk lab, tindakan ralan, dll)
    Route::post('/akutansi/jurnal/post', [JurnalController::class, 'postFromTemp'])->name('api.akutansi.jurnal.post');

    // API routes untuk Tagihan dan Pembayaran
    Route::prefix('akutansi/tagihan')->group(function () {
        Route::get('/', [\App\Http\Controllers\Akutansi\TagihanSadewaController::class, 'index'])->name('api.akutansi.tagihan.index');
        Route::get('/{no_nota}', [\App\Http\Controllers\Akutansi\TagihanSadewaController::class, 'show'])->name('api.akutansi.tagihan.show');
        Route::post('/', [\App\Http\Controllers\Akutansi\TagihanSadewaController::class, 'store'])->name('api.akutansi.tagihan.store');
        Route::put('/{no_nota}', [\App\Http\Controllers\Akutansi\TagihanSadewaController::class, 'update'])->name('api.akutansi.tagihan.update');
        Route::post('/{no_nota}/payment', [\App\Http\Controllers\Akutansi\TagihanSadewaController::class, 'addPayment'])->name('api.akutansi.tagihan.add-payment');
        Route::delete('/{no_nota}', [\App\Http\Controllers\Akutansi\TagihanSadewaController::class, 'destroy'])->name('api.akutansi.tagihan.destroy');
    });

    Route::prefix('akutansi/bayar-piutang')->group(function () {
        Route::get('/', [\App\Http\Controllers\Akutansi\BayarPiutangController::class, 'index'])->name('api.akutansi.bayar-piutang.index');
        Route::get('/show', [\App\Http\Controllers\Akutansi\BayarPiutangController::class, 'show'])->name('api.akutansi.bayar-piutang.show');
        Route::post('/', [\App\Http\Controllers\Akutansi\BayarPiutangController::class, 'store'])->name('api.akutansi.bayar-piutang.store');
        Route::put('/', [\App\Http\Controllers\Akutansi\BayarPiutangController::class, 'update'])->name('api.akutansi.bayar-piutang.update');
        Route::delete('/', [\App\Http\Controllers\Akutansi\BayarPiutangController::class, 'destroy'])->name('api.akutansi.bayar-piutang.destroy');
        Route::get('/total', [\App\Http\Controllers\Akutansi\BayarPiutangController::class, 'getTotalPiutang'])->name('api.akutansi.bayar-piutang.total');
    });
}); // End of auth middleware group
