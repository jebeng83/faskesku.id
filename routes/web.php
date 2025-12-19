<?php

use App\Http\Controllers\Akutansi\AkunBayarController;
use App\Http\Controllers\Akutansi\AkunPiutangController;
use App\Http\Controllers\Akutansi\AkutansiController;
use App\Http\Controllers\Akutansi\BillingController;
use App\Http\Controllers\Akutansi\BukuBesarController;
use App\Http\Controllers\Akutansi\CashFlowController;
use App\Http\Controllers\Akutansi\JurnalController;
use App\Http\Controllers\Akutansi\RekeningController;
use App\Http\Controllers\Akutansi\SetAkunController;
use App\Http\Controllers\Akutansi\SetoranBankController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DaftarTarifController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\Farmasi\DataSuplierController;
use App\Http\Controllers\Farmasi\IndustriFarmasiController;
use App\Http\Controllers\Farmasi\SetHargaObatController;
use App\Http\Controllers\IGDController;
use App\Http\Controllers\KamarOperasiController;
use App\Http\Controllers\KategoriPerawatanController;
use App\Http\Controllers\Kepegawaian\BankController;
use App\Http\Controllers\Kepegawaian\BidangController;
use App\Http\Controllers\Kepegawaian\DepartemenController;
use App\Http\Controllers\Kepegawaian\EmergencyIndexController;
use App\Http\Controllers\Kepegawaian\JenjangJabatanController;
use App\Http\Controllers\Kepegawaian\KelompokJabatanController;
use App\Http\Controllers\Kepegawaian\PendidikanController;
use App\Http\Controllers\Kepegawaian\ResikoKerjaController;
use App\Http\Controllers\Kepegawaian\SipPegawaiController;
use App\Http\Controllers\Kepegawaian\SttsKerjaController;
use App\Http\Controllers\Kepegawaian\SttsWpController;
use App\Http\Controllers\LaboratoriumController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\Pasien\BahasaPasienController;
use App\Http\Controllers\Pasien\CacatFisikController;
use App\Http\Controllers\Pasien\PerusahaanPasienController;
use App\Http\Controllers\Pasien\SukuBangsaController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PermintaanLabController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RadiologiController;
use App\Http\Controllers\RawatInapController;
use App\Http\Controllers\RawatJalan\ObatController;
use App\Http\Controllers\RawatJalan\RawatJalanController;
use App\Http\Controllers\RawatJalan\ResepController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RegPeriksaController;
use App\Http\Controllers\RehabilitasiMedikController;
use App\Http\Controllers\setting\SettingController;
use App\Http\Controllers\SpesialisController;
use App\Http\Controllers\TarifTindakanController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Note: API routes telah dipindahkan ke routes/api.php

// Root route: arahkan ke dashboard jika sudah login, jika belum arahkan ke halaman login
Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

// Kompatibilitas: redirect /landing ke dashboard
Route::get('/landing', function () {
    return redirect()->route('dashboard');
})->name('landing');

// API routes that don't require authentication
Route::get('/api/lab-tests', [PermintaanLabController::class, 'getLabTests'])->name('api.lab-tests');

// API routes that require authentication
Route::middleware('auth')->prefix('api')->group(function () {
    Route::get('/menu/search', [\App\Http\Controllers\API\MenuSearchController::class, 'search'])->name('api.menu.search');
    Route::get('/menu/popular', [\App\Http\Controllers\API\MenuSearchController::class, 'popular'])->name('api.menu.popular');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $table = null;

        $hasSetting = Schema::hasTable('setting') && Schema::hasColumn('setting', 'key') && Schema::hasColumn('setting', 'value');
        $hasSettings = Schema::hasTable('settings') && Schema::hasColumn('settings', 'key') && Schema::hasColumn('settings', 'value');

        if ($hasSetting) {
            $table = 'setting';
        } elseif ($hasSettings) {
            $table = 'settings';
        }

        $highlights = [];
        $priorities = [];

        if ($table) {
            $highlightRow = DB::table($table)->where('key', 'dashboard_highlights')->first();
            $priorityRow = DB::table($table)->where('key', 'dashboard_priorities')->first();

            if ($highlightRow && $highlightRow->value) {
                $decoded = json_decode($highlightRow->value, true);
                if (is_array($decoded)) {
                    $highlights = array_values(array_filter($decoded, function ($item) {
                        return is_array($item)
                            && isset($item['label'], $item['text'])
                            && $item['label'] !== ''
                            && $item['text'] !== '';
                    }));
                }
            }

            if ($priorityRow && $priorityRow->value) {
                $decoded = json_decode($priorityRow->value, true);
                if (is_array($decoded)) {
                    $priorities = array_values(array_filter($decoded, function ($item) {
                        if (is_string($item)) {
                            return trim($item) !== '';
                        }

                        return is_array($item)
                            && isset($item['text'])
                            && trim($item['text']) !== '';
                    }));
                }
            }

            $priorities = array_map(function ($item) {
                if (is_string($item)) {
                    return ['text' => $item];
                }

                return [
                    'text' => $item['text'] ?? '',
                ];
            }, $priorities);
        }

        return Inertia::render('Dashboard', [
            'dashboardHighlights' => $highlights,
            'dashboardPriorities' => $priorities,
        ]);
    })->name('dashboard');

    Route::get('/docs/{section?}', function ($section = null) {
        return Inertia::render('Docs', ['section' => $section]);
    })->name('docs');

    // Akutansi: preview invoice berbasis billing/nota
    Route::get('/akutansi/invoice/{no_rawat}', [AkutansiController::class, 'invoice'])
        ->where('no_rawat', '.*')
        ->name('akutansi.invoice');

    // Akutansi: Rekening page (Inertia)
    Route::get('/akutansi/rekening', [RekeningController::class, 'page'])
        ->name('akutansi.rekening.page');

    // Akutansi: Home page (Inertia)
    Route::get('/akutansi/home', function () {
        return Inertia::render('Akutansi/Home');
    })->name('akutansi.home.page');

    // Akutansi: Rekening Tahun (Saldo Awal per Tahun) page (Inertia)
    Route::get('/akutansi/rekening-tahun', function () {
        return Inertia::render('Akutansi/RekeningTahun');
    })->name('akutansi.rekening-tahun.page');

    // Akutansi: Akun Bayar page (Inertia)
    Route::get('/akutansi/akun-bayar', [AkunBayarController::class, 'page'])
        ->name('akutansi.akun-bayar.page');

    // Akutansi: Akun Piutang page (Inertia)
    Route::get('/akutansi/akun-piutang', [AkunPiutangController::class, 'page'])
        ->name('akutansi.akun-piutang.page');

    // Akutansi: Pengaturan Rekening/COA (Inertia)
    Route::get('/akutansi/pengaturan-rekening', function () {
        return Inertia::render('Akutansi/PengaturanRekening');
    })->name('akutansi.pengaturan-rekening.page');

    // Akutansi: Jurnal page (Inertia)
    Route::get('/akutansi/jurnal', [JurnalController::class, 'page'])
        ->name('akutansi.jurnal.page');

    // Akutansi: Jurnal Penyesuaian (Adjusting Entries) page (Inertia)
    Route::get('/akutansi/jurnal-penyesuaian', [JurnalController::class, 'penyesuaianPage'])
        ->name('akutansi.jurnal-penyesuaian.page');

    // Akutansi: Jurnal Penutup (Closing Entries) page (Inertia)
    Route::get('/akutansi/jurnal-penutup', [JurnalController::class, 'penutupPage'])
        ->name('akutansi.jurnal-penutup.page');

    // Akutansi: Setoran Bank page (Inertia)
    Route::get('/akutansi/setoran-bank', [JurnalController::class, 'setoranBankPage'])
        ->name('akutansi.setoran-bank.page');

    // Akutansi: Buku Besar (General Ledger) page (Inertia)
    Route::get('/akutansi/buku-besar', [BukuBesarController::class, 'page'])
        ->name('akutansi.buku-besar.page');

    // Akutansi: Neraca (Balance Sheet) page (Inertia)
    Route::get('/akutansi/neraca', function () {
        return Inertia::render('Akutansi/Neraca');
    })->name('akutansi.neraca.page');

    // Akutansi: Detail Jurnal page (Inertia)
    Route::get('/akutansi/detail-jurnal', function () {
        return Inertia::render('Akutansi/DetailJurnal');
    })->name('akutansi.detail-jurnal.page');

    // Akutansi: Mutasi Rekening page (Inertia)
    Route::get('/akutansi/mutasi-rekening', function () {
        return Inertia::render('Akutansi/MutasiRekening');
    })->name('akutansi.mutasi-rekening.page');

    // Akutansi: Mutasi Kas page (Inertia)
    Route::get('/akutansi/mutasi-kas', function () {
        return Inertia::render('Akutansi/MutasiKas');
    })->name('akutansi.mutasi-kas.page');

    // Akutansi: Cash Flow page (Inertia)
    Route::get('/akutansi/cashflow', [CashFlowController::class, 'page'])
        ->name('akutansi.cashflow.page');

    Route::get('/akutansi/billing', [BillingController::class, 'page'])
        ->name('akutansi.billing.page');
    Route::get('/akutansi/billing-ranap', [BillingController::class, 'ranapPage'])
        ->name('akutansi.billing-ranap.page');

    // Akutansi: Nota Jalan page (Inertia)
    Route::get('/akutansi/nota-jalan', [\App\Http\Controllers\Akutansi\NotaJalanController::class, 'page'])
        ->name('akutansi.nota-jalan.page');

    // Akutansi: Kasir Ralan page (Inertia)
    Route::get('/akutansi/kasir-ralan', [BillingController::class, 'kasirRalanPage'])
        ->name('akutansi.kasir-ralan.page');

    // Akutansi API: Rekening CRUD
    Route::prefix('api/akutansi')->group(function () {
        Route::get('/rekening', [RekeningController::class, 'index'])->name('api.akutansi.rekening.index');
        Route::post('/rekening', [RekeningController::class, 'store'])->name('api.akutansi.rekening.store');
        Route::put('/rekening/{kd_rek}', [RekeningController::class, 'update'])->name('api.akutansi.rekening.update');
        Route::delete('/rekening/{kd_rek}', [RekeningController::class, 'destroy'])->name('api.akutansi.rekening.destroy');
        // Rekening hierarchical operations (subrekening)
        Route::post('/rekening/{kd_rek}/make-sub', [RekeningController::class, 'makeSub'])->name('api.akutansi.rekening.make-sub');
        Route::post('/rekening/{kd_rek}/make-induk', [RekeningController::class, 'makeInduk'])->name('api.akutansi.rekening.make-induk');
        Route::get('/rekening/{kd_rek}/children', [RekeningController::class, 'children'])->name('api.akutansi.rekening.children');

        // Akutansi API: Rekening Tahun (Saldo Awal per Tahun)
        Route::get('/rekeningtahun', [\App\Http\Controllers\Akutansi\RekeningTahunController::class, 'index'])->name('api.akutansi.rekeningtahun.index');
        Route::post('/rekeningtahun', [\App\Http\Controllers\Akutansi\RekeningTahunController::class, 'store'])->name('api.akutansi.rekeningtahun.store');
        Route::put('/rekeningtahun/{thn}/{kd_rek}', [\App\Http\Controllers\Akutansi\RekeningTahunController::class, 'update'])->name('api.akutansi.rekeningtahun.update');
        Route::delete('/rekeningtahun/{thn}/{kd_rek}', [\App\Http\Controllers\Akutansi\RekeningTahunController::class, 'destroy'])->name('api.akutansi.rekeningtahun.destroy');

        // Akutansi API: Jurnal CRUD
        Route::get('/jurnal', [JurnalController::class, 'index'])->name('api.akutansi.jurnal.index');
        // IMPORTANT: Place static routes BEFORE dynamic catch-all to avoid shadowing
        // Akutansi API: Preview Jurnal Penutup
        Route::get('/jurnal/closing-preview', [JurnalController::class, 'closingPreview'])->name('api.akutansi.jurnal.closing-preview');
        // Akutansi API: Kandidat akun untuk Ikhtisar & Modal
        Route::get('/jurnal/closing-candidates', [JurnalController::class, 'closingCandidates'])->name('api.akutansi.jurnal.closing-candidates');
        // Akutansi API: Single Posting Point dari tampjurnal
        Route::post('/jurnal/preview', [JurnalController::class, 'previewFromTemp'])->name('api.akutansi.jurnal.preview');
        Route::post('/jurnal/post', [JurnalController::class, 'postFromTemp'])->name('api.akutansi.jurnal.post');
        // Dynamic show/update/destroy must come AFTER static routes
        Route::get('/jurnal/{no_jurnal}', [JurnalController::class, 'show'])
            ->where('no_jurnal', '^(?!closing-(?:preview|candidates)$).*$')
            ->name('api.akutansi.jurnal.show');
        Route::post('/jurnal', [JurnalController::class, 'store'])->name('api.akutansi.jurnal.store');
        Route::put('/jurnal/{no_jurnal}', [JurnalController::class, 'update'])
            ->where('no_jurnal', '^(?!closing-(?:preview|candidates)$).*$')
            ->name('api.akutansi.jurnal.update');
        Route::delete('/jurnal/{no_jurnal}', [JurnalController::class, 'destroy'])
            ->where('no_jurnal', '^(?!closing-(?:preview|candidates)$).*$')
            ->name('api.akutansi.jurnal.destroy');

        // Akutansi API: Cash Flow aggregation
        Route::get('/cashflow', [CashFlowController::class, 'index'])->name('api.akutansi.cashflow.index');

        // Akutansi API: Buku Besar (General Ledger)
        Route::get('/buku-besar', [BukuBesarController::class, 'index'])->name('api.akutansi.buku-besar.index');

        // Billing CRUD
        Route::get('/billing', [BillingController::class, 'index'])->name('api.akutansi.billing.index');
        Route::get('/billing-ranap', [BillingController::class, 'indexRanap'])->name('api.akutansi.billing-ranap.index');
        Route::post('/billing', [BillingController::class, 'store'])->name('api.akutansi.billing.store');
        Route::put('/billing/{noindex}', [BillingController::class, 'update'])->name('api.akutansi.billing.update');
        Route::delete('/billing/{noindex}', [BillingController::class, 'destroy'])->name('api.akutansi.billing.destroy');

        // Akun Bayar CRUD
        Route::get('/akun-bayar', [AkunBayarController::class, 'index'])->name('api.akutansi.akun-bayar.index');
        Route::post('/akun-bayar', [AkunBayarController::class, 'store'])->name('api.akutansi.akun-bayar.store');
        Route::put('/akun-bayar/{nama_bayar}', [AkunBayarController::class, 'update'])->name('api.akutansi.akun-bayar.update');
        Route::delete('/akun-bayar/{nama_bayar}', [AkunBayarController::class, 'destroy'])->name('api.akutansi.akun-bayar.destroy');

        // Akun Piutang CRUD
        Route::get('/akun-piutang', [AkunPiutangController::class, 'index'])->name('api.akutansi.akun-piutang.index');
        Route::post('/akun-piutang', [AkunPiutangController::class, 'store'])->name('api.akutansi.akun-piutang.store');
        Route::put('/akun-piutang/{nama_bayar}', [AkunPiutangController::class, 'update'])->name('api.akutansi.akun-piutang.update');
        Route::delete('/akun-piutang/{nama_bayar}', [AkunPiutangController::class, 'destroy'])->name('api.akutansi.akun-piutang.destroy');

        // Setoran Bank: stage & post via single posting service
        Route::post('/setoran-bank/stage', [JurnalController::class, 'setoranBankStage'])->name('api.akutansi.setoran-bank.stage');
        Route::post('/setoran-bank/post', [JurnalController::class, 'setoranBankPost'])->name('api.akutansi.setoran-bank.post');
        Route::get('/setoran-bank', [SetoranBankController::class, 'index'])->name('api.akutansi.setoran-bank.index');
        Route::post('/setoran-bank', [SetoranBankController::class, 'store'])->name('api.akutansi.setoran-bank.store');
        Route::get('/setoran-bank/{id}', [SetoranBankController::class, 'show'])->name('api.akutansi.setoran-bank.show');
        Route::put('/setoran-bank/{id}', [SetoranBankController::class, 'update'])->name('api.akutansi.setoran-bank.update');
        Route::delete('/setoran-bank/{id}', [SetoranBankController::class, 'destroy'])->name('api.akutansi.setoran-bank.destroy');
        Route::post('/setoran-bank/{id}/stage', [SetoranBankController::class, 'stage'])->name('api.akutansi.setoran-bank.stage-by-id');
        Route::post('/setoran-bank/{id}/post', [SetoranBankController::class, 'post'])->name('api.akutansi.setoran-bank.post-by-id');

        // Nota Jalan & Detail Nota Jalan
        Route::get('/nota-jalan/{no_rawat}', [\App\Http\Controllers\Akutansi\NotaJalanController::class, 'show'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.nota-jalan.show');
        Route::post('/nota-jalan', [\App\Http\Controllers\Akutansi\NotaJalanController::class, 'store'])
            ->name('api.akutansi.nota-jalan.store');
        Route::delete('/nota-jalan/{no_rawat}', [\App\Http\Controllers\Akutansi\NotaJalanController::class, 'destroy'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.nota-jalan.destroy');

        Route::get('/detail-nota-jalan/{no_rawat}', [\App\Http\Controllers\Akutansi\DetailNotaJalanController::class, 'index'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.detail-nota-jalan.index');
        Route::post('/detail-nota-jalan', [\App\Http\Controllers\Akutansi\DetailNotaJalanController::class, 'store'])
            ->name('api.akutansi.detail-nota-jalan.store');
        Route::delete('/detail-nota-jalan/{no_rawat}/{nama_bayar}', [\App\Http\Controllers\Akutansi\DetailNotaJalanController::class, 'destroy'])
            ->where(['no_rawat' => '.*', 'nama_bayar' => '.*'])
            ->name('api.akutansi.detail-nota-jalan.destroy');

        // Piutang Pasien & Detail Piutang Pasien
        Route::get('/piutang-pasien', [\App\Http\Controllers\Akutansi\PiutangPasienController::class, 'index'])
            ->name('api.akutansi.piutang-pasien.index');
        Route::get('/piutang-pasien/{no_rawat}', [\App\Http\Controllers\Akutansi\PiutangPasienController::class, 'show'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.piutang-pasien.show');
        Route::post('/piutang-pasien', [\App\Http\Controllers\Akutansi\PiutangPasienController::class, 'store'])
            ->name('api.akutansi.piutang-pasien.store');
        Route::put('/piutang-pasien/{no_rawat}', [\App\Http\Controllers\Akutansi\PiutangPasienController::class, 'update'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.piutang-pasien.update');
        Route::delete('/piutang-pasien/{no_rawat}', [\App\Http\Controllers\Akutansi\PiutangPasienController::class, 'destroy'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.piutang-pasien.destroy');

        Route::get('/detail-piutang-pasien/{no_rawat}', [\App\Http\Controllers\Akutansi\DetailPiutangPasienController::class, 'index'])
            ->where('no_rawat', '.*')
            ->name('api.akutansi.detail-piutang-pasien.index');
        Route::post('/detail-piutang-pasien', [\App\Http\Controllers\Akutansi\DetailPiutangPasienController::class, 'store'])
            ->name('api.akutansi.detail-piutang-pasien.store');
        Route::put('/detail-piutang-pasien/{no_rawat}/{nama_bayar}', [\App\Http\Controllers\Akutansi\DetailPiutangPasienController::class, 'update'])
            ->where(['no_rawat' => '.*', 'nama_bayar' => '.*'])
            ->name('api.akutansi.detail-piutang-pasien.update');
        Route::delete('/detail-piutang-pasien/{no_rawat}/{nama_bayar}', [\App\Http\Controllers\Akutansi\DetailPiutangPasienController::class, 'destroy'])
            ->where(['no_rawat' => '.*', 'nama_bayar' => '.*'])
            ->name('api.akutansi.detail-piutang-pasien.destroy');

        // Pengaturan Rekening/COA (SetAkun)
        Route::get('/pengaturan-rekening', [SetAkunController::class, 'index'])
            ->name('api.akutansi.pengaturan-rekening.index');
        // NOTE: Tempatkan route statis 'rekening' SEBELUM route dinamis '{section}' untuk mencegah konflik penangkapan
        Route::get('/pengaturan-rekening/rekening', [SetAkunController::class, 'rekening'])
            ->name('api.akutansi.pengaturan-rekening.rekening');
        Route::get('/pengaturan-rekening/{section}', [SetAkunController::class, 'show'])
            ->where('section', '^(umum|umum2|ralan|ranap|ranap2)$')
            ->name('api.akutansi.pengaturan-rekening.show');
        Route::put('/pengaturan-rekening/{section}', [SetAkunController::class, 'update'])
            ->where('section', '^(umum|umum2|ralan|ranap|ranap2)$')
            ->name('api.akutansi.pengaturan-rekening.update');
    });

    // Master Data landing page
    Route::get('/master-data', function () {
        return Inertia::render('MasterData/MenuUtama');
    })->name('master-data.index');
    // Backward-compatible aliases to fix mismatched DB menu URLs
    Route::get('/masterdata', function () {
        return redirect()->route('master-data.index');
    })->name('masterdata.alias');
    Route::get('/master', function () {
        return redirect()->route('master-data.index');
    })->name('master.alias');

    // Master Data - Jadwal Dokter (Inertia)
    Route::get('/master-data/jadwal', [\App\Http\Controllers\JadwalController::class, 'index'])
        ->name('jadwal.index');
    // Describe tabel jadwal (JSON)
    Route::get('/master-data/jadwal/describe', [\App\Http\Controllers\JadwalController::class, 'describe'])
        ->name('jadwal.describe');

    // Patient routes
    Route::resource('patients', PatientController::class);
    Route::post('/patients/{patient}/register-periksa', [PatientController::class, 'registerPeriksa'])->name('patients.register-periksa');
    Route::get('/patients/{patient}/check-poli-status', [PatientController::class, 'checkPatientPoliStatus'])->name('patients.check-poli-status');

    // Perusahaan Pasien routes (untuk popup)
    Route::prefix('perusahaan-pasien')->name('perusahaan-pasien.')->group(function () {
        Route::post('/', [PerusahaanPasienController::class, 'store'])->name('store');
    });

    // Bahasa Pasien routes (untuk popup)
    Route::prefix('bahasa-pasien')->name('bahasa-pasien.')->group(function () {
        Route::post('/', [BahasaPasienController::class, 'store'])->name('store');
    });

    // Suku Bangsa routes (untuk popup)
    Route::prefix('suku-bangsa')->name('suku-bangsa.')->group(function () {
        Route::post('/', [SukuBangsaController::class, 'store'])->name('store');
    });

    // Cacat Fisik routes (untuk popup)
    Route::prefix('cacat-fisik')->name('cacat-fisik.')->group(function () {
        Route::post('/', [CacatFisikController::class, 'store'])->name('store');
    });

    // Registration routes
    Route::get('/registration', [RegistrationController::class, 'index'])->name('registration.index');
    // Registration Lanjutan: arahkan ke halaman Index agar konsisten
    Route::get('/registration/lanjutan', [RegistrationController::class, 'index'])
        ->name('registration.lanjutan')
        ->middleware('menu.permission');
    Route::get('/registration/search-patients', [RegistrationController::class, 'searchPatients'])->name('registration.search-patients');
    Route::post('/registration/{patient}/register', [RegistrationController::class, 'registerPatient'])->name('registration.register-patient');
    Route::get('/registration/{patient}/check-poli-status', [RegistrationController::class, 'checkPatientPoliStatus'])->name('registration.check-poli-status');
    Route::get('/registration/get-registrations', [RegistrationController::class, 'getRegistrations'])->name('registration.get-registrations');
    // Statistik kunjungan poli per bulan (untuk Dashboard)
    Route::get('/registration/poli-monthly-stats', [RegistrationController::class, 'poliMonthlyStats'])->name('registration.poli-monthly-stats');
    Route::post('/registration/cancel', [RegistrationController::class, 'cancelRegistration'])->name('registration.cancel');
    Route::get('/registration/{no_rawat}/print', [RegistrationController::class, 'print'])->name('registration.print')->where('no_rawat', '.*');

    // Employee routes
    Route::resource('employees', EmployeeController::class);

    // Departemen routes (untuk popup)
    Route::prefix('departemen')->name('departemen.')->group(function () {
        Route::post('/', [DepartemenController::class, 'store'])->name('store');
    });

    // Bidang routes (untuk popup)
    Route::prefix('bidang')->name('bidang.')->group(function () {
        Route::post('/', [BidangController::class, 'store'])->name('store');
    });

    // Pendidikan routes (untuk popup)
    Route::prefix('pendidikan')->name('pendidikan.')->group(function () {
        Route::post('/', [PendidikanController::class, 'store'])->name('store');
    });

    // Resiko Kerja routes (untuk popup)
    Route::prefix('resiko-kerja')->name('resiko-kerja.')->group(function () {
        Route::post('/', [ResikoKerjaController::class, 'store'])->name('store');
    });

    // Kelompok Jabatan routes (untuk popup)
    Route::prefix('kelompok-jabatan')->name('kelompok-jabatan.')->group(function () {
        Route::post('/', [KelompokJabatanController::class, 'store'])->name('store');
    });

    // Emergency Index routes (untuk popup)
    Route::prefix('emergency-index')->name('emergency-index.')->group(function () {
        Route::post('/', [EmergencyIndexController::class, 'store'])->name('store');
    });

    // Bank routes (untuk popup)
    Route::prefix('bank')->name('bank.')->group(function () {
        Route::post('/', [BankController::class, 'store'])->name('store');
    });

    // Status WP routes (untuk popup)
    Route::prefix('stts-wp')->name('stts-wp.')->group(function () {
        Route::post('/', [SttsWpController::class, 'store'])->name('store');
    });

    // Status Kerja routes (untuk popup)
    Route::prefix('stts-kerja')->name('stts-kerja.')->group(function () {
        Route::post('/', [SttsKerjaController::class, 'store'])->name('store');
    });

    // Jenjang Jabatan routes
    Route::prefix('jenjang-jabatan')->name('jenjang-jabatan.')->group(function () {
        Route::get('/', [JenjangJabatanController::class, 'index'])->name('index');
        Route::get('/create', [JenjangJabatanController::class, 'create'])->name('create');
        Route::post('/', [JenjangJabatanController::class, 'store'])->name('store');
        Route::get('/{kode}', [JenjangJabatanController::class, 'show'])->name('show');
        Route::get('/{kode}/edit', [JenjangJabatanController::class, 'edit'])->name('edit');
        Route::put('/{kode}', [JenjangJabatanController::class, 'update'])->name('update');
        Route::patch('/{kode}', [JenjangJabatanController::class, 'update'])->name('update.patch');
        Route::delete('/{kode}', [JenjangJabatanController::class, 'destroy'])->name('destroy');
    });

    // SIP Pegawai routes
    Route::prefix('sip-pegawai')->name('sip-pegawai.')->group(function () {
        Route::get('/', [SipPegawaiController::class, 'index'])->name('index');
        Route::get('/create', [SipPegawaiController::class, 'create'])->name('create');
        Route::post('/', [SipPegawaiController::class, 'store'])->name('store');
        Route::get('/{nik}', [SipPegawaiController::class, 'show'])->name('show');
        Route::get('/{nik}/edit', [SipPegawaiController::class, 'edit'])->name('edit');
        Route::put('/{nik}', [SipPegawaiController::class, 'update'])->name('update');
        Route::patch('/{nik}', [SipPegawaiController::class, 'update'])->name('update.patch');
        Route::delete('/{nik}', [SipPegawaiController::class, 'destroy'])->name('destroy');
    });

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

    // Pembayaran module routes
    Route::prefix('pembayaran')
        ->name('pembayaran.')
        ->middleware('menu.permission')
        ->group(function () {
            Route::get('/', [PembayaranController::class, 'index'])->name('index');
            Route::get('/ralan', [PembayaranController::class, 'ralan'])->name('ralan');
            Route::get('/ralan/{no_rawat}', [PembayaranController::class, 'ralanDetail'])
                ->where('no_rawat', '.*')
                ->name('ralan.detail');
            Route::get('/ranap', [PembayaranController::class, 'ranap'])->name('ranap');
        });

    // Premium Module routes
    // Route::resource('premium-modules', PremiumModuleController::class);
    // Route::post('/premium-modules/{premiumModule}/generate-license', [PremiumModuleController::class, 'generateLicense'])->name('premium-modules.generate-license');
    // Route::post('/premium-modules/activate', [PremiumModuleController::class, 'activate'])->name('premium-modules.activate');
    // Route::post('/premium-modules/{premiumModule}/deactivate', [PremiumModuleController::class, 'deactivate'])->name('premium-modules.deactivate');
    // Route::get('/premium-modules/{premiumModule}/status', [PremiumModuleController::class, 'status'])->name('premium-modules.status');
    // Route::post('/premium-modules/validate-license', [PremiumModuleController::class, 'validateLicense'])->name('premium-modules.validate-license');

    Route::get('rawat-jalan/lanjutan', [RawatJalanController::class, 'lanjutan'])->name('rawat-jalan.lanjutan');
    // Rawat Jalan landing/index page (Inertia)
    Route::get('rawat-jalan', function () {
        return Inertia::render('RawatJalan/Index');
    })->name('rawat-jalan.index');
    Route::get('rawat-jalan/riwayat', [RawatJalanController::class, 'riwayat'])->name('rawat-jalan.riwayat');
    Route::get('rawat-jalan/riwayat-pemeriksaan', [RawatJalanController::class, 'getRiwayatPemeriksaan'])->name('rawat-jalan.riwayat-pemeriksaan');
    Route::get('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'pemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan');
    Route::post('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'storePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.store');
    Route::delete('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'deletePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.delete');
    Route::put('rawat-jalan/pemeriksaan-ralan', [RawatJalanController::class, 'updatePemeriksaanRalan'])->name('rawat-jalan.pemeriksaan-ralan.update');
    Route::get('rawat-jalan/obat-ralan/{no_rawat}', [RawatJalanController::class, 'getobatRalanPublic'])
        ->name('rawat-jalan.obat-ralan')
        ->where('no_rawat', '.*');
    Route::get('rawat-jalan/lab/{no_rawat}', [RawatJalanController::class, 'getPemeriksaanLabPublic'])
        ->name('rawat-jalan.lab')
        ->where('no_rawat', '.*');
    Route::get('rawat-jalan/radiologi/{no_rawat}', [RawatJalanController::class, 'getRadiologiPublic'])
        ->name('rawat-jalan.radiologi')
        ->where('no_rawat', '.*');
    Route::get('pegawai/search', [RawatJalanController::class, 'searchPegawai'])->name('pegawai.search');
    Route::get('rawat-jalan-statistics', [RawatJalanController::class, 'getStatistics'])->name('rawat-jalan.statistics');

    // Rawat Inap: CPPT/Pemeriksaan (pemeriksaan_ranap)
    Route::get('rawat-inap/pemeriksaan-ranap', [RawatInapController::class, 'pemeriksaanRanap'])->name('rawat-inap.pemeriksaan-ranap');
    Route::post('rawat-inap/pemeriksaan-ranap', [RawatInapController::class, 'storePemeriksaanRanap'])->name('rawat-inap.pemeriksaan-ranap.store');
    Route::delete('rawat-inap/pemeriksaan-ranap', [RawatInapController::class, 'deletePemeriksaanRanap'])->name('rawat-inap.pemeriksaan-ranap.delete');
    Route::put('rawat-inap/pemeriksaan-ranap', [RawatInapController::class, 'updatePemeriksaanRanap'])->name('rawat-inap.pemeriksaan-ranap.update');
    Route::get('rawat-inap/obat-ranap/{no_rawat}', [RawatInapController::class, 'getObatRanapPublic'])
        ->name('rawat-inap.obat-ranap')
        ->where('no_rawat', '.*');
    Route::get('rawat-inap/lab/{no_rawat}', [RawatInapController::class, 'getPemeriksaanLabPublic'])
        ->name('rawat-inap.lab')
        ->where('no_rawat', '.*');
    Route::get('rawat-inap/radiologi/{no_rawat}', [RawatInapController::class, 'getRadiologiPublic'])
        ->name('rawat-inap.radiologi')
        ->where('no_rawat', '.*');
    Route::get('rawat-inap/riwayat', [RawatInapController::class, 'riwayat'])->name('rawat-inap.riwayat');

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
    Route::post('api/resep/{no_resep}/penyerahan', [ResepController::class, 'penyerahan'])->name('api.resep.penyerahan');

    Route::resource('rawat-jalan', RawatJalanController::class);

    // Profile
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Profile Menu (Inertia)
    Route::get('/profile/menu', function () {
        return Inertia::render('Profile/index');
    })->name('profile.menu');

    Route::get('/profile/home', function () {
        return Inertia::render('Profile/Home');
    })->name('profile.home');

    // Application Settings (CRUD generic untuk tabel `setting`)
    Route::prefix('setting')->name('setting.')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');
        Route::get('/describe', [SettingController::class, 'describe'])->name('describe');
        Route::post('/', [SettingController::class, 'store'])->name('store');
        Route::put('/{id}', [SettingController::class, 'update'])->name('update');
        Route::delete('/{id}', [SettingController::class, 'destroy'])->name('destroy');

        // Legacy App Settings CRUD sesuai tabel `setting` (schema pada gambar)
        Route::get('/app', [SettingController::class, 'appIndex'])->name('app.index');
        Route::post('/app', [SettingController::class, 'appStore'])->name('app.store');
        Route::put('/app/{nama_instansi}', [SettingController::class, 'appUpdate'])->name('app.update');
        Route::delete('/app/{nama_instansi}', [SettingController::class, 'appDestroy'])->name('app.destroy');
        // Stream blob untuk preview
        Route::get('/app/{nama_instansi}/wallpaper', [SettingController::class, 'appWallpaper'])->name('app.wallpaper');
        Route::get('/app/{nama_instansi}/logo', [SettingController::class, 'appLogo'])->name('app.logo');

        Route::get('/dashboard', [SettingController::class, 'dashboardIndex'])->name('dashboard.index');
        Route::post('/dashboard', [SettingController::class, 'dashboardStore'])->name('dashboard.store');
    });

    // Menu Management routes
    Route::resource('menus', MenuController::class);
    Route::post('/menus/{menu}/toggle-status', [MenuController::class, 'toggleStatus'])->name('menus.toggle-status');
    Route::post('/menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');

    // Pelayanan Medis routes
    Route::get('rawat-inap/lanjutan', [RawatInapController::class, 'lanjutan'])->name('rawat-inap.lanjutan');
    Route::resource('rawat-inap', RawatInapController::class);
    Route::resource('igd', IGDController::class);
    Route::resource('kamar-operasi', KamarOperasiController::class);

    // Penunjang Medis routes
    Route::prefix('laboratorium')->name('laboratorium.')->group(function () {
        Route::get('/', [LaboratoriumController::class, 'index'])->name('index');
        Route::get('/dashboard', [LaboratoriumController::class, 'dashboard'])->name('dashboard');
        Route::get('/create', [LaboratoriumController::class, 'create'])->name('create');
        Route::post('/', [LaboratoriumController::class, 'store'])->name('store');
        // JSON detail untuk popup input hasil — gunakan query string agar aman untuk no_rawat yang mengandung '/'
        Route::get('/detail', [LaboratoriumController::class, 'detail'])->name('detail');

        // Permintaan Laboratorium (resource) di bawah prefix laboratorium
        // IMPORTANT: Route spesifik harus didefinisikan SEBELUM route wildcard
        Route::resource('permintaan-lab', PermintaanLabController::class);
        // Ambil sampel: update tanggal & jam sampel berdasarkan no_rawat (order terbaru)
        Route::post('/permintaan-lab/ambil-sampel', [PermintaanLabController::class, 'ambilSampel'])->name('permintaan-lab.ambil-sampel');
        // Update sampel: update tanggal & jam sampel berdasarkan noorder (sesuai dokumentasi)
        // Route ini HARUS didefinisikan SEBELUM route wildcard /{noRawat} untuk menghindari konflik
        Route::put('/permintaan-lab/{permintaan_lab}/sampel', [PermintaanLabController::class, 'updateSampel'])->name('permintaan-lab.update-sampel');
        // Input hasil: tampilkan form input hasil berdasarkan permintaan lab
        Route::get('/permintaan-lab/{permintaan_lab}/hasil', [PermintaanLabController::class, 'inputHasil'])->name('permintaan-lab.input-hasil');
        Route::post('/permintaan-lab/{permintaan_lab}/hasil', [PermintaanLabController::class, 'storeHasil'])->name('permintaan-lab.store-hasil');
        // Preview hasil pemeriksaan sebelum download PDF
        Route::get('/permintaan-lab/{permintaan_lab}/preview', [PermintaanLabController::class, 'preview'])->name('permintaan-lab.preview');
        // Cetak hasil pemeriksaan (download PDF)
        Route::get('/permintaan-lab/{permintaan_lab}/cetak', [PermintaanLabController::class, 'cetak'])->name('permintaan-lab.cetak');

        // Tampilkan pemeriksaan berdasarkan no_rawat (mengizinkan karakter '/')
        // Route wildcard HARUS didefinisikan TERAKHIR untuk menghindari konflik dengan route spesifik
        Route::get('/{noRawat}', [LaboratoriumController::class, 'show'])->name('show')->where('noRawat', '.*');
        Route::get('/{noRawat}/edit', [LaboratoriumController::class, 'edit'])->name('edit')->where('noRawat', '.*');
        Route::put('/{noRawat}', [LaboratoriumController::class, 'update'])->name('update')->where('noRawat', '.*');
        Route::delete('/{noRawat}', [LaboratoriumController::class, 'destroy'])->name('destroy')->where('noRawat', '.*');
        Route::put('/{noRawat}/hasil', [LaboratoriumController::class, 'updateHasil'])->name('update-hasil')->where('noRawat', '.*');
    });

    // Permintaan Laboratorium routes dipindahkan ke dalam prefix laboratorium (lihat di atas)
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
        // Compose staging jurnal untuk Rawat Jalan (umum) → tulis ke tampjurnal2
        Route::post('/stage-ralan', [TarifTindakanController::class, 'stageJurnalRalan'])->name('stage-ralan');
        Route::get('/riwayat/{noRawat}', [TarifTindakanController::class, 'getRiwayatTindakan'])->name('riwayat')->where('noRawat', '.*');
        // Fallback agar frontend lama yang masih mengirim POST + _method=DELETE tetap terlayani
        // Terima DELETE dan POST pada endpoint yang sama
        Route::match(['delete', 'post'], '/', [TarifTindakanController::class, 'deleteTindakan'])->name('delete');
    });

    // Tarif Tindakan Rawat Inap API routes
    Route::prefix('api/tarif-tindakan-ranap')->name('api.tarif-tindakan-ranap.')->group(function () {
        Route::get('/', [TarifTindakanController::class, 'indexRanap'])->name('index');
        Route::post('/dokter', [TarifTindakanController::class, 'storeRanapDokter'])->name('store-dokter');
        Route::post('/perawat', [TarifTindakanController::class, 'storeRanapPerawat'])->name('store-perawat');
        Route::post('/dokter-perawat', [TarifTindakanController::class, 'storeRanapDokterPerawat'])->name('store-dokter-perawat');
        Route::get('/riwayat/{noRawat}', [TarifTindakanController::class, 'getRiwayatTindakanRanap'])->name('riwayat')->where('noRawat', '.*');
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

        // Daftar Permintaan Resep (search by no_rawat / no_rkm_medis)
        Route::get('/permintaan-resep', function () {
            return Inertia::render('farmasi/DaftarPermintaanResep');
        })->name('permintaan-resep');

        Route::get('/riwayat-transaksi-gudang', function () {
            return Inertia::render('farmasi/RiwayatTransaksiGudang');
        })->name('riwayat-transaksi-gudang');

        // Riwayat Barang Medis (Inertia page + JSON data endpoint)
        Route::get('/riwayat-barang-medis', [\App\Http\Controllers\Farmasi\RiwayatBarangMedisController::class, 'index'])
            ->name('riwayat-barang-medis');
        Route::get('/riwayat-barang-medis/data', [\App\Http\Controllers\Farmasi\RiwayatBarangMedisController::class, 'data'])
            ->name('riwayat-barang-medis.data');

        Route::get('/stok-obat', function () {
            return Inertia::render('farmasi/StokObat');
        })->name('stok-obat');
        Route::get('/stok-opname', function () {
            return Inertia::render('farmasi/StokOpname');
        })->name('stok-opname');

        // Farmasi - Data Opname (laporan/daftar hasil opname)
        Route::get('/data-opname', function () {
            return Inertia::render('farmasi/DataOpname');
        })->name('data-opname');

        // Alias route under farmasi namespace for consistency dengan frontend route helpers
        Route::get('/farmasi/data-opname', function () {
            return Inertia::render('farmasi/DataOpname');
        })->name('farmasi.data-opname');
        Route::get('/cetak/data-opname', function () {
            return Inertia::render('farmasi/CetakFarmasi/DataOpname');
        })->name('cetak.data-opname');
        Route::get('/farmasi/cetak/data-opname', function () {
            return Inertia::render('farmasi/CetakFarmasi/DataOpname');
        })->name('farmasi.cetak.data-opname');
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
    // Pcare routes
    // Global alias: allow direct access to '/cetak/data-opname' and forward to Farmasi route
    Route::get('/cetak/data-opname', function () {
        return redirect()->to(route('farmasi.cetak.data-opname', request()->query()));
    });

    Route::prefix('pcare')->name('pcare.')->group(function () {
        // Landing page
        Route::get('/', function () {
            return Inertia::render('Pcare/Menu');
        })->name('index');

        // Mapping Poli PCare page (Inertia)
        Route::get('/mapping/poli', function () {
            return Inertia::render('Pcare/MappingPoliPcare');
        })->name('mapping.poli');

        // Mapping Dokter PCare page (Inertia)
        Route::get('/mapping/dokter', function () {
            return Inertia::render('Pcare/MappingDokterPcare');
        })->name('mapping.dokter');

        // Mapping Obat PCare page (Inertia)
        Route::get('/mapping/obat', function () {
            return Inertia::render('Pcare/MappingObatPcare');
        })->name('mapping.obat');

        Route::get('/monitoring', function () {
            return Inertia::render('Pcare/MonitoringPcare');
        })->name('monitoring');

        Route::get('/monitoring-status', function () {
            return Inertia::render('Pcare/MonitoringStatusPcare');
        })->name('monitoring.status');

        // Referensi Diagnosa page (Inertia)
        Route::get('/referensi/diagnosa', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiDiagnosa');
        })->name('referensi.diagnosa');

        // Referensi Dokter page (Inertia)
        Route::get('/referensi/dokter', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiDokter');
        })->name('referensi.dokter');

        // Referensi Poli page (Inertia)
        Route::get('/referensi/poli', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiPoli');
        })->name('referensi.poli');

        // Referensi Kesadaran page (Inertia)
        Route::get('/referensi/kesadaran', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiKesadaran');
        })->name('referensi.kesadaran');

        // Referensi Prognosa page (Inertia)
        Route::get('/referensi/prognosa', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiPrognosa');
        })->name('referensi.prognosa');

        // Referensi Tindakan page (Inertia)
        Route::get('/referensi/tindakan', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiTindakan');
        })->name('referensi.tindakan');

        // Referensi DPHO page (Inertia)
        Route::get('/referensi/dpho', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiDpho');
        })->name('referensi.dpho');

        // Referensi Provider Rayonisasi page (Inertia)
        Route::get('/referensi/provider', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiProvider');
        })->name('referensi.provider');

        // Referensi Spesialis page (Inertia)
        Route::get('/referensi/spesialis', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiSpesialis');
        })->name('referensi.spesialis');

        // Referensi Sub Spesialis page (Inertia)
        Route::get('/referensi/subspesialis', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiSubSpesialis');
        })->name('referensi.subspesialis');

        // Referensi Sarana page (Inertia)
        Route::get('/referensi/sarana', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiSarana');
        })->name('referensi.sarana');

        // Referensi Khusus page (Inertia)
        Route::get('/referensi/khusus', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiKhusus');
        })->name('referensi.khusus');

        // Referensi Alergi page (Inertia)
        Route::get('/referensi/alergi', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiAlergi');
        })->name('referensi.alergi');

        // Referensi Status Pulang page (Inertia)
        Route::get('/referensi/statuspulang', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiStatusPulang');
        })->name('referensi.statuspulang');

        // Referensi Faskes Rujukan page (Inertia)
        Route::get('/referensi/faskes-rujukan', function () {
            return Inertia::render('Pcare/ReferensiPcare/ReferensiFaskesRujukan');
        })->name('referensi.faskes-rujukan');

        // Referensi Poli MobileJKN page (Inertia)
        Route::get('/referensi-mobilejkn/poli', function () {
            return Inertia::render('Pcare/ReferensiMobileJkn/ReferensiPoliMobileJkn');
        })->name('referensi.mobilejkn.poli');

        // Referensi Dokter MobileJKN page (Inertia)
        Route::get('/referensi-mobilejkn/dokter', function () {
            return Inertia::render('Pcare/ReferensiMobileJkn/ReferensiDokterMobileJkn');
        })->name('referensi.mobilejkn.dokter');

        // Layanan PCare: Cek Peserta by NIK (Inertia page)
        Route::get('/data-peserta-by-nik', function () {
            return Inertia::render('Pcare/LayananPcare/CekPesertaPcareNik');
        })->name('layanan.cek-peserta-nik');

        // Layanan PCare: Form terpadu (3 card: Peserta+SOAP, Kunjungan, Rujukan)
        Route::get('/layanan', function () {
            return Inertia::render('Pcare/LayananPcare/LayananPcare');
        })->name('layanan.pcare');

        // Kegiatan Kelompok - Club Prolanis (Inertia page)
        Route::get('/kelompok/club-prolanis', function () {
            return Inertia::render('Pcare/KegiatanKelompok/ClubProlanis');
        })->name('kelompok.club-prolanis');

        // Kegiatan Kelompok - Form & daftar kegiatan (Inertia page)
        Route::get('/kelompok/kegiatan', function () {
            return Inertia::render('Pcare/KegiatanKelompok/KegiatanKelompok');
        })->name('kelompok.kegiatan');

        // Kegiatan Kelompok - Entri Kegiatan (Inertia page)
        Route::get('/kelompok/entri', function () {
            return Inertia::render('Pcare/KegiatanKelompok/EntriKegiatan');
        })->name('kelompok.entri');

        // Kegiatan Kelompok - Peserta Kegiatan (Inertia page)
        Route::get('/kelompok/peserta-kegiatan', function () {
            return Inertia::render('Pcare/KegiatanKelompok/PesertaKegiatan');
        })->name('kelompok.peserta-kegiatan');

        // API: Get Diagnosa dari BPJS PCare
        Route::get('/api/diagnosa', [\App\Http\Controllers\Pcare\PcareController::class, 'getDiagnosa'])
            ->name('diagnosa.api');

        // API: Get Dokter dari BPJS PCare
        Route::get('/api/dokter', [\App\Http\Controllers\Pcare\PcareController::class, 'getDokter'])
            ->name('dokter.api');

        // API: Get Poli dari BPJS PCare
        Route::get('/api/poli', [\App\Http\Controllers\Pcare\PcareController::class, 'getPoli'])
            ->name('poli.api');

        // API: Pencarian Poliklinik RS (sumber: tabel poliklinik)
        Route::get('/api/rs/poliklinik', [\App\Http\Controllers\Pcare\PcareController::class, 'searchPoliklinikRs'])
            ->name('rs.poliklinik.api');

        // API: Pencarian Dokter RS (sumber: tabel dokter)
        Route::get('/api/rs/dokter', [\App\Http\Controllers\Pcare\PcareController::class, 'searchDokterRs'])
            ->name('rs.dokter.api');

        // API: Pencarian Obat RS (sumber: tabel databarang)
        Route::get('/api/rs/obat', [\App\Http\Controllers\Pcare\PcareController::class, 'searchObatRs'])
            ->name('rs.obat.api');

        // API: Mapping Poli (GET daftar & POST simpan)
        Route::get('/api/mapping/poli', [\App\Http\Controllers\Pcare\PcareController::class, 'getMappingPoli'])
            ->name('mapping.poli.get');
        Route::post('/api/mapping/poli', [\App\Http\Controllers\Pcare\PcareController::class, 'storeMappingPoli'])
            ->name('mapping.poli.store');
        Route::delete('/api/mapping/poli', [\App\Http\Controllers\Pcare\PcareController::class, 'deleteMappingPoli'])
            ->name('mapping.poli.delete');

        // API: Mapping Dokter (GET daftar & POST simpan & DELETE)
        Route::get('/api/mapping/dokter', [\App\Http\Controllers\Pcare\PcareController::class, 'getMappingDokter'])
            ->name('mapping.dokter.get');
        Route::post('/api/mapping/dokter', [\App\Http\Controllers\Pcare\PcareController::class, 'storeMappingDokter'])
            ->name('mapping.dokter.store');
        Route::delete('/api/mapping/dokter', [\App\Http\Controllers\Pcare\PcareController::class, 'deleteMappingDokter'])
            ->name('mapping.dokter.delete');

        // API: Mapping Obat (GET daftar & POST simpan & DELETE)
        Route::get('/api/mapping/obat', [\App\Http\Controllers\Pcare\PcareController::class, 'getMappingObat'])
            ->name('mapping.obat.get');
        Route::post('/api/mapping/obat', [\App\Http\Controllers\Pcare\PcareController::class, 'storeMappingObat'])
            ->name('mapping.obat.store');
        Route::delete('/api/mapping/obat', [\App\Http\Controllers\Pcare\PcareController::class, 'deleteMappingObat'])
            ->name('mapping.obat.delete');

        // API: Get Referensi Tindakan dari BPJS PCare
        Route::get('/api/tindakan', [\App\Http\Controllers\Pcare\PcareController::class, 'getTindakan'])
            ->name('tindakan.api');

        // API: Get Peserta by NIK dari BPJS PCare
        Route::get('/api/peserta/nik', [\App\Http\Controllers\Pcare\PcareController::class, 'pesertaByNik'])
            ->name('peserta.nik.api');
        // API: Kirim Kunjungan Sehat ke BPJS PCare (POST)
        Route::post('/api/kunjungan-sehat', [\App\Http\Controllers\Pcare\PcareController::class, 'kirimKunjunganSehat'])
            ->name('kunjungan.sehat.api');

        Route::get('/api/monitoring/summary', [\App\Http\Controllers\Pcare\PcareController::class, 'monitoringSummary'])
            ->name('monitoring.summary.api');
        Route::get('/api/monitoring/attempts', [\App\Http\Controllers\Pcare\PcareController::class, 'monitoringAttempts'])
            ->name('monitoring.attempts.api');
        Route::get('/api/pendaftaran/summary', [\App\Http\Controllers\Pcare\PcareController::class, 'pendaftaranSummary'])
            ->name('pendaftaran.summary.api');
        Route::get('/api/pendaftaran/list', [\App\Http\Controllers\Pcare\PcareController::class, 'pendaftaranList'])
            ->name('pendaftaran.list.api');
        Route::get('/api/monitoring/raw/{no_rawat}', [\App\Http\Controllers\Pcare\PcareController::class, 'monitoringRaw'])
            ->where('no_rawat', '.*')
            ->name('monitoring.raw.api');
        Route::get('/api/bpjs-log/list', [\App\Http\Controllers\Pcare\PcareController::class, 'bpjsLogList'])
            ->name('bpjs.log.list.api');
        Route::get('/api/bpjs-log/rawat/{no_rawat}', [\App\Http\Controllers\Pcare\PcareController::class, 'bpjsLogByRawat'])
            ->where('no_rawat', '.*')
            ->name('bpjs.log.byrawat.api');
        Route::post('/api/resend/{no_rawat}', [\App\Http\Controllers\Pcare\PcareController::class, 'resendByNoRawat'])
            ->where('no_rawat', '.*')
            ->name('resend.api');
        Route::post('/api/mass-send', [\App\Http\Controllers\Pcare\PcareController::class, 'massSend'])
            ->name('mass-send.api');

        // API: Get Peserta by No. Kartu (versi sederhana — tanpa tanggal pelayanan)
        Route::get('/api/peserta/{noka}', [\App\Http\Controllers\Pcare\PcareController::class, 'getPeserta'])
            ->where('noka', '.*')
            ->name('peserta.noka.simple.api');

        // API: Get Peserta by No. Kartu dan Tanggal Pelayanan
        Route::get('/api/peserta/nokartu/{noka}/tgl/{tglPelayanan}', [\App\Http\Controllers\Pcare\PcareController::class, 'pesertaByNoKartu'])
            ->where('noka', '.*')
            ->where('tglPelayanan', '.*')
            ->name('peserta.nokartu.api');

        // API: Club Prolanis by jenis program (01=DM, 02=Hipertensi)
        Route::get('/api/kelompok/club/{kdProgram}', [\App\Http\Controllers\Pcare\PcareController::class, 'getClubProlanis'])
            ->where('kdProgram', '.*')
            ->name('kelompok.club.api');

        // API: Kegiatan Kelompok berdasarkan bulan (tanggal dd-mm-yyyy)
        Route::get('/api/kelompok/kegiatan/{tanggal}', [\App\Http\Controllers\Pcare\PcareController::class, 'getKegiatanKelompok'])
            ->where('tanggal', '.*')
            ->name('kelompok.kegiatan.api');

        // API: Tambah Kegiatan Kelompok (POST)
        Route::post('/api/kelompok/kegiatan', [\App\Http\Controllers\Pcare\PcareController::class, 'addKegiatanKelompok'])
            ->name('kelompok.kegiatan.add.api');

        // API: Update Kegiatan Kelompok (PUT)
        Route::put('/api/kelompok/kegiatan', [\App\Http\Controllers\Pcare\PcareController::class, 'updateKegiatanKelompok'])
            ->name('kelompok.kegiatan.update.api');

        // API: Delete Kegiatan Kelompok (DELETE)
        Route::delete('/api/kelompok/kegiatan/{eduId}', [\App\Http\Controllers\Pcare\PcareController::class, 'deleteKegiatanKelompok'])
            ->where('eduId', '.*')
            ->name('kelompok.kegiatan.delete.api');

        // API: Peserta Kegiatan Kelompok berdasarkan eduId
        Route::get('/api/kelompok/peserta/{eduId}', [\App\Http\Controllers\Pcare\PcareController::class, 'getPesertaKegiatan'])
            ->where('eduId', '.*')
            ->name('kelompok.peserta.api');

        // API: Tambah Peserta Kegiatan Kelompok (POST)
        Route::post('/api/kelompok/peserta', [\App\Http\Controllers\Pcare\PcareController::class, 'addPesertaKegiatan'])
            ->name('kelompok.peserta.add.api');

        // API: Delete Peserta Kegiatan Kelompok (DELETE)
        Route::delete('/api/kelompok/peserta/{eduId}/{noKartu}', [\App\Http\Controllers\Pcare\PcareController::class, 'deletePesertaKegiatan'])
            ->where('eduId', '.*')
            ->where('noKartu', '.*')
            ->name('kelompok.peserta.delete.api');

        // Setting Bridging BPJS PCare (Inertia form + CRUD)
        Route::get('/setting', [\App\Http\Controllers\Pcare\SettingBridgingBpjsController::class, 'index'])
            ->name('setting.index');
        Route::post('/setting', [\App\Http\Controllers\Pcare\SettingBridgingBpjsController::class, 'store'])
            ->name('setting.store');
        Route::delete('/setting', [\App\Http\Controllers\Pcare\SettingBridgingBpjsController::class, 'destroy'])
            ->name('setting.destroy');

        // Setting Bridging Mobile JKN (Inertia form + CRUD)
        Route::get('/setting-mobilejkn', [\App\Http\Controllers\Pcare\SettingBridgingMobileJknController::class, 'index'])
            ->name('setting.mobilejkn.index');
        Route::post('/setting-mobilejkn', [\App\Http\Controllers\Pcare\SettingBridgingMobileJknController::class, 'store'])
            ->name('setting.mobilejkn.store');
        Route::delete('/setting-mobilejkn', [\App\Http\Controllers\Pcare\SettingBridgingMobileJknController::class, 'destroy'])
            ->name('setting.mobilejkn.destroy');
    });

    // Penjab & Poliklinik routes
    Route::get('/penjab', [\App\Http\Controllers\PenjabController::class, 'index'])->name('penjab.index');
    Route::post('/penjab', [\App\Http\Controllers\PenjabController::class, 'store'])->name('penjab.store');
    Route::put('/penjab/{kd_pj}', [\App\Http\Controllers\PenjabController::class, 'update'])->name('penjab.update');
    Route::patch('/penjab/{kd_pj}/toggle-status', [\App\Http\Controllers\PenjabController::class, 'toggleStatus'])->name('penjab.toggle-status');
    Route::get('/penjab/generate-kode', [\App\Http\Controllers\PenjabController::class, 'generateKode'])->name('penjab.generate-kode');

    // Poliklinik routes
    Route::get('/poliklinik', [\App\Http\Controllers\PoliklinikController::class, 'index'])->name('poliklinik.index');
    Route::post('/poliklinik', [\App\Http\Controllers\PoliklinikController::class, 'store'])->name('poliklinik.store');
    Route::put('/poliklinik/{kd_poli}', [\App\Http\Controllers\PoliklinikController::class, 'update'])->name('poliklinik.update');
    Route::patch('/poliklinik/{kd_poli}/toggle-status', [\App\Http\Controllers\PoliklinikController::class, 'toggleStatus'])->name('poliklinik.toggle-status');
    Route::get('/poliklinik/generate-kode', [\App\Http\Controllers\PoliklinikController::class, 'generateKode'])->name('poliklinik.generate-kode');

    // SATUSEHAT routes (Inertia pages)
    Route::prefix('satusehat')->name('satusehat.')->group(function () {
        // Halaman utama modul SATUSEHAT
        Route::get('/', function () {
            return Inertia::render('SatuSehat/MenuSatuSehat');
        })->name('index');
        // Prasyarat: halaman pemetaan Organization Subunits
        Route::get('/prerequisites/organization', function () {
            return Inertia::render('SatuSehat/Prerequisites/SatuSehatOrganization');
        })->name('prerequisites.organization');
        // Prasyarat: halaman pemetaan Location (Poliklinik ↔ SATUSEHAT Location)
        Route::get('/prerequisites/location', function () {
            return Inertia::render('SatuSehat/Prerequisites/SatuSehatLocation');
        })->name('prerequisites.location');
        // Prasyarat: halaman pemetaan Location Ranap (Bangsal ↔ SATUSEHAT Location)
        Route::get('/prerequisites/location-ranap', function () {
            return Inertia::render('SatuSehat/Prerequisites/SatuSehatLocationRanap');
        })->name('prerequisites.location_ranap');
        Route::get('/prerequisites/location-farmasi', function () {
            return Inertia::render('SatuSehat/Prerequisites/SatuSehatLocationFarmasi');
        })->name('prerequisites.location_farmasi');
        Route::get('/prerequisites/practitioner', function () {
            return Inertia::render('SatuSehat/Prerequisites/Practitioner');
        })->name('prerequisites.practitioner');
        Route::get('/prerequisites/patient', function () {
            return Inertia::render('SatuSehat/Prerequisites/Patient');
        })->name('prerequisites.patient');
        Route::get('/interoperabilitas/rajal/encounter', function () {
            return Inertia::render('SatuSehat/Interoperabilitas/PelayananRawatJalan/Encounter');
        })->name('interoperabilitas.rajal.encounter');
    });

});
// Routes for Set Harga Obat (Farmasi)

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
