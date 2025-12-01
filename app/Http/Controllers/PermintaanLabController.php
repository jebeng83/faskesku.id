<?php

namespace App\Http\Controllers;

use App\Models\DetailPeriksaLab;
use App\Models\Dokter;
use App\Models\Employee;
use App\Models\JnsPerawatanLab;
use App\Models\PeriksaLab;
use App\Models\PermintaanDetailPermintaanLab;
use App\Models\PermintaanLab;
use App\Models\RegPeriksa;
use App\Models\TemplateLaboratorium;
use App\Models\User;
use App\Services\Akutansi\TampJurnalComposerLab;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PermintaanLabController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PermintaanLab::with([
            'regPeriksa.patient',
            'regPeriksa.poliklinik',
            'regPeriksa.penjab',
            'dokter',
            // Eager-load detail permintaan beserta templatenya
            'detailPermintaan.templateLaboratorium',
            'detailPermintaan.jnsPerawatanLab',
        ]);

        // Filter berdasarkan tanggal
        if ($request->filled('tanggal')) {
            $query->byTanggalPermintaan($request->tanggal);
        }

        // Filter berdasarkan rentang tanggal (start_date, end_date)
        if ($request->filled('start_date') || $request->filled('end_date')) {
            $start = $request->get('start_date');
            $end = $request->get('end_date');
            if ($start && $end) {
                $query->whereBetween('tgl_permintaan', [$start, $end]);
            } elseif ($start) {
                $query->whereDate('tgl_permintaan', '>=', $start);
            } elseif ($end) {
                $query->whereDate('tgl_permintaan', '<=', $end);
            }
        }

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        // Filter berdasarkan dokter
        if ($request->filled('dokter')) {
            $query->byDokter($request->dokter);
        }

        // Search berdasarkan no_rawat atau nama pasien
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_rawat', 'like', "%{$search}%")
                    ->orWhere('noorder', 'like', "%{$search}%")
                    ->orWhereHas('regPeriksa.patient', function ($q) use ($search) {
                        $q->where('nm_pasien', 'like', "%{$search}%");
                    });
            });
        }

        $permintaanLab = $query->orderBy('tgl_permintaan', 'desc')
            ->orderBy('jam_permintaan', 'desc')
            ->paginate(15);

        // Tambahkan informasi has_hasil untuk setiap permintaan
        // Pastikan detailPermintaan sudah dimuat untuk setiap item
        $permintaanLab->getCollection()->transform(function ($item) {
            // Pastikan relasi detailPermintaan sudah dimuat
            if (! $item->relationLoaded('detailPermintaan')) {
                $item->load('detailPermintaan');
            }
            $item->has_hasil = $item->hasHasilTersedia();

            return $item;
        });

        // Get list of doctors for filter dropdown
        $dokters = \App\Models\Dokter::select('kd_dokter', 'nm_dokter')
            ->orderBy('nm_dokter')
            ->get();

        return Inertia::render('Laboratorium/Index', [
            'permintaanLab' => $permintaanLab,
            'dokters' => $dokters,
            'filters' => $request->only(['tanggal', 'start_date', 'end_date', 'status', 'dokter', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $regPeriksa = RegPeriksa::with('patient')
            ->whereDate('tgl_registrasi', today())
            ->where('status_lanjut', 'Ralan')
            ->get();

        return Inertia::render('PermintaanLab/Create', [
            'dokters' => $dokters,
            'regPeriksa' => $regPeriksa,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Decode no_rawat untuk menangani encoding dari frontend
        $requestData = $request->all();
        if (isset($requestData['no_rawat'])) {
            $requestData['no_rawat'] = urldecode($requestData['no_rawat']);
        }

        $validator = Validator::make($requestData, [
            'no_rawat' => 'required|string|max:17|exists:reg_periksa,no_rawat',
            'tgl_permintaan' => 'required|date',
            'jam_permintaan' => 'required|date_format:H:i',
            'tgl_sampel' => 'nullable|date',
            'jam_sampel' => 'nullable|date_format:H:i',
            'tgl_hasil' => 'nullable|date',
            'jam_hasil' => 'nullable|date_format:H:i',
            'status' => 'required|in:ralan,ranap',
            'informasi_tambahan' => 'nullable|string|max:60',
            'diagnosa_klinis' => 'required|string|max:80',
            'dokter_perujuk' => 'nullable|string|max:20',
            'detail_tests' => 'required|array|min:1',
            'detail_tests.*.kd_jenis_prw' => 'required|string|exists:jns_perawatan_lab,kd_jenis_prw',
            'detail_tests.*.stts_bayar' => 'required|in:Sudah,Belum',
            'detail_tests.*.templates' => 'required|array|min:1',
            'detail_tests.*.templates.*' => 'required|integer|exists:template_laboratorium,id_template',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $data = $validator->validated();

            // Set default values untuk sampel dan hasil
            $data['tgl_sampel'] = $data['tgl_sampel'] ?? '0000-00-00';
            $data['jam_sampel'] = $data['jam_sampel'] ?? '00:00:00';
            $data['tgl_hasil'] = $data['tgl_hasil'] ?? '0000-00-00';
            $data['jam_hasil'] = $data['jam_hasil'] ?? '00:00:00';

            // Create main permintaan lab record (noorder akan auto-generate)
            $permintaanLab = PermintaanLab::create([
                'no_rawat' => $data['no_rawat'],
                'tgl_permintaan' => $data['tgl_permintaan'],
                'jam_permintaan' => $data['jam_permintaan'],
                'tgl_sampel' => $data['tgl_sampel'],
                'jam_sampel' => $data['jam_sampel'],
                'tgl_hasil' => $data['tgl_hasil'],
                'jam_hasil' => $data['jam_hasil'],
                'dokter_perujuk' => $data['dokter_perujuk'] ?? '-',
                'status' => $data['status'],
                'informasi_tambahan' => $data['informasi_tambahan'],
                'diagnosa_klinis' => $data['diagnosa_klinis'],
            ]);

            // Create detail records - HANYA menggunakan template yang dipilih
            foreach ($data['detail_tests'] as $detail) {
                $kdJenisPrw = $detail['kd_jenis_prw'];
                $sttsBayar = $detail['stts_bayar'] ?? 'Belum';

                // Validasi: templates harus ada dan tidak kosong
                if (! isset($detail['templates']) || ! is_array($detail['templates']) || count($detail['templates']) === 0) {
                    throw new \Exception("Template harus dipilih untuk pemeriksaan: {$kdJenisPrw}");
                }

                // Gunakan HANYA template yang dipilih
                foreach ($detail['templates'] as $idTemplate) {
                    // Validate template exists and belongs to this kd_jenis_prw
                    $template = TemplateLaboratorium::where('id_template', $idTemplate)
                        ->where('kd_jenis_prw', $kdJenisPrw)
                        ->first();

                    if (! $template) {
                        Log::warning('Template tidak ditemukan atau tidak sesuai dengan jenis pemeriksaan', [
                            'id_template' => $idTemplate,
                            'kd_jenis_prw' => $kdJenisPrw,
                        ]);

                        continue; // Skip template yang tidak valid
                    }

                    PermintaanDetailPermintaanLab::create([
                        'noorder' => $permintaanLab->noorder,
                        'kd_jenis_prw' => $kdJenisPrw,
                        'id_template' => $idTemplate,
                        'stts_bayar' => $sttsBayar,
                    ]);
                }
            }

            DB::commit();

            // Return Inertia response with success message
            return redirect()->back()->with('success', 'Permintaan laboratorium berhasil dibuat dengan nomor order: '.$permintaanLab->noorder);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('PermintaanLabController store error: '.$e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors(['error' => 'Gagal menyimpan permintaan laboratorium: '.$e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $noorder)
    {
        // Redirect ke form input hasil jika sampel sudah diambil
        $permintaanLab = PermintaanLab::findOrFail($noorder);

        // Jika sampel sudah diambil, redirect ke form input hasil
        if ($permintaanLab->tgl_sampel && $permintaanLab->tgl_sampel !== '0000-00-00') {
            return redirect()->route('laboratorium.permintaan-lab.input-hasil', $noorder);
        }

        // Jika belum diambil sampel, tampilkan detail permintaan saja
        $permintaanLab = PermintaanLab::with([
            'regPeriksa.patient',
            'regPeriksa.poliklinik',
            'regPeriksa.penjab',
            'dokter',
            'detailPermintaan.jnsPerawatanLab',
            'detailPermintaan.templateLaboratorium',
        ])->findOrFail($noorder);

        return Inertia::render('Laboratorium/Show', [
            'permintaanLab' => $permintaanLab,
            'mode' => 'detail-permintaan',
        ]);
    }

    /**
     * Tampilkan form input hasil berdasarkan permintaan lab
     * Route: GET /laboratorium/permintaan-lab/{noorder}/hasil
     */
    public function inputHasil(string $noorder)
    {
        $permintaanLab = PermintaanLab::with([
            'regPeriksa.patient',
            'regPeriksa.poliklinik',
            'regPeriksa.penjab',
            'dokter',
            'detailPermintaan.jnsPerawatanLab',
            'detailPermintaan.templateLaboratorium',
        ])->findOrFail($noorder);

        // Validasi: sampel harus sudah diambil
        if (! $permintaanLab->tgl_sampel || $permintaanLab->tgl_sampel === '0000-00-00') {
            return redirect()->route('laboratorium.permintaan-lab.index')
                ->withErrors(['error' => 'Sampel belum diambil. Silakan update waktu pengambilan sampel terlebih dahulu.']);
        }

        // Group detail permintaan by kd_jenis_prw untuk tampilan
        $groupedDetails = $permintaanLab->detailPermintaan
            ->groupBy('kd_jenis_prw')
            ->map(function ($details, $kdJenisPrw) {
                $firstDetail = $details->first();

                return [
                    'kd_jenis_prw' => $kdJenisPrw,
                    'nm_perawatan' => $firstDetail->jnsPerawatanLab->nm_perawatan ?? '',
                    'templates' => $details->map(function ($detail) {
                        $template = $detail->templateLaboratorium;

                        return [
                            'id_template' => $detail->id_template,
                            'pemeriksaan' => $template->Pemeriksaan ?? '',
                            'satuan' => $template->satuan ?? '',
                            'nilai_rujukan_la' => $template->nilai_rujukan_la ?? '',
                            'nilai_rujukan_ld' => $template->nilai_rujukan_ld ?? '',
                            'nilai_rujukan_pa' => $template->nilai_rujukan_pa ?? '',
                            'nilai_rujukan_pd' => $template->nilai_rujukan_pd ?? '',
                            'urut' => $template->urut ?? 0,
                        ];
                    })->sortBy('urut')->values()->toArray(),
                ];
            })
            ->values()
            ->toArray();

        // Load petugas dan dokter untuk dropdown
        $petugas = Employee::whereHas('user')->select('nik', 'nama')->orderBy('nama')->get();
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->orderBy('nm_dokter')->get();

        // Hitung usia pasien untuk nilai rujukan
        $usiaTahun = null;
        if ($permintaanLab->regPeriksa?->patient?->tgl_lahir) {
            try {
                $tglLahir = Carbon::parse($permintaanLab->regPeriksa->patient->tgl_lahir);
                $usiaTahun = $tglLahir->diffInYears(Carbon::now());
                // Pastikan hasil adalah integer (bulatkan ke bawah)
                $usiaTahun = (int) floor($usiaTahun);
            } catch (\Exception $e) {
                $usiaTahun = null;
            }
        }

        return Inertia::render('Laboratorium/Show', [
            'permintaanLab' => $permintaanLab,
            'groupedDetails' => $groupedDetails,
            'petugas' => $petugas,
            'dokters' => $dokters,
            'usiaTahun' => $usiaTahun,
            'mode' => 'input-hasil',
        ]);
    }

    /**
     * Simpan hasil pemeriksaan berdasarkan permintaan lab
     * Route: POST /laboratorium/permintaan-lab/{noorder}/hasil
     */
    public function storeHasil(Request $request, string $noorder)
    {
        $validator = Validator::make($request->all(), [
            'tgl_periksa' => 'required|date',
            'jam' => 'required|date_format:H:i:s',
            'kd_ptg' => 'required|string|exists:pegawai,nik',
            'kd_dokter_pj' => 'required|string|exists:dokter,kd_dokter',
            'hasil' => 'required|array|min:1',
            'hasil.*.id_template' => 'required|integer|exists:template_laboratorium,id_template',
            'hasil.*.hasil' => 'required|string',
            'hasil.*.nilai_rujukan' => 'nullable|string',
            'hasil.*.keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $permintaanLab = PermintaanLab::with('detailPermintaan')->findOrFail($noorder);

            // Validasi: sampel harus sudah diambil
            if (! $permintaanLab->tgl_sampel || $permintaanLab->tgl_sampel === '0000-00-00') {
                return back()->withErrors(['error' => 'Sampel belum diambil.'])->withInput();
            }

            $data = $validator->validated();

            // Group hasil by kd_jenis_prw untuk membuat periksa_lab
            $hasilByJenis = [];
            foreach ($data['hasil'] as $hasilItem) {
                // Cari detail permintaan untuk mendapatkan kd_jenis_prw
                $detailPermintaan = $permintaanLab->detailPermintaan
                    ->where('id_template', $hasilItem['id_template'])
                    ->first();

                if ($detailPermintaan) {
                    $kdJenisPrw = $detailPermintaan->kd_jenis_prw;
                    if (! isset($hasilByJenis[$kdJenisPrw])) {
                        $hasilByJenis[$kdJenisPrw] = [];
                    }
                    $hasilByJenis[$kdJenisPrw][] = $hasilItem;
                }
            }

            // Pastikan data petugas ada di tabel petugas sebelum insert ke periksa_lab
            // Karena periksa_lab.nip memiliki foreign key ke petugas.nip
            // petugas.nip merujuk ke pegawai.nik
            $petugasNip = $data['kd_ptg'];
            $petugasExists = DB::table('petugas')->where('nip', $petugasNip)->exists();

            if (! $petugasExists) {
                // Ambil data pegawai untuk membuat data petugas
                $pegawai = Employee::find($petugasNip);
                if (! $pegawai) {
                    return back()->withErrors(['error' => 'Data pegawai tidak ditemukan.'])->withInput();
                }

                // Insert ke tabel petugas jika belum ada
                // petugas.nip merujuk ke pegawai.nik
                DB::table('petugas')->insertOrIgnore([
                    'nip' => $pegawai->nik,
                    'nama' => $pegawai->nama ?? '',
                    'jk' => $pegawai->jk ?? 'L',
                    'tmp_lahir' => $pegawai->tmp_lahir ?? '',
                    'tgl_lahir' => $pegawai->tgl_lahir ?? null,
                    'gol_darah' => '-',
                    'agama' => '',
                    'stts_nikah' => 'BELUM MENIKAH',
                    'alamat' => $pegawai->alamat ?? '',
                    'kd_jbtn' => $pegawai->jbtn ?? '',
                    'no_telp' => '',
                    'email' => '',
                    'status' => $pegawai->stts_aktif ?? '1',
                ]);
            }

            // Buat periksa_lab untuk setiap jenis pemeriksaan
            foreach ($hasilByJenis as $kdJenisPrw => $hasilItems) {
                // Ambil data jenis perawatan untuk mendapatkan informasi biaya dan kategori
                $jnsPerawatanLab = \App\Models\JnsPerawatanLab::find($kdJenisPrw);

                // Cek apakah sudah ada periksa_lab untuk jenis ini pada tanggal yang sama
                $periksaLab = PeriksaLab::where('no_rawat', $permintaanLab->no_rawat)
                    ->where('kd_jenis_prw', $kdJenisPrw)
                    ->whereDate('tgl_periksa', $data['tgl_periksa'])
                    ->first();

                if (! $periksaLab) {
                    // Buat header periksa_lab baru
                    // Dokter penanggung jawab disimpan di kolom kd_dokter
                    // Status menggunakan nilai dari permintaan_lab (Ralan/Ranap)
                    // Kategori diambil dari jns_perawatan_lab (PK/PA/MB)
                    $periksaLab = PeriksaLab::create([
                        'no_rawat' => $permintaanLab->no_rawat,
                        'nip' => $petugasNip, // Gunakan nip yang sudah dipastikan ada di petugas
                        'kd_jenis_prw' => $kdJenisPrw,
                        'tgl_periksa' => $data['tgl_periksa'],
                        'jam' => $data['jam'],
                        'dokter_perujuk' => $permintaanLab->dokter_perujuk,
                        'kd_dokter' => $data['kd_dokter_pj'], // Simpan dokter PJ di kd_dokter
                        'status' => ucfirst($permintaanLab->status), // Status sesuai dengan permintaan (Ralan/Ranap)
                        'kategori' => $jnsPerawatanLab->kategori ?? 'PK', // Kategori dari jenis perawatan (PK/PA/MB)
                        // Kolom biaya dari jns_perawatan_lab
                        'bagian_rs' => $jnsPerawatanLab->bagian_rs ?? 0,
                        'bhp' => $jnsPerawatanLab->bhp ?? 0,
                        'tarif_perujuk' => $jnsPerawatanLab->tarif_perujuk ?? 0,
                        'tarif_tindakan_dokter' => $jnsPerawatanLab->tarif_tindakan_dokter ?? 0,
                        'tarif_tindakan_petugas' => $jnsPerawatanLab->tarif_tindakan_petugas ?? 0,
                        'kso' => $jnsPerawatanLab->kso ?? 0,
                        'menejemen' => $jnsPerawatanLab->menejemen ?? 0,
                        'biaya' => $jnsPerawatanLab->total_byr ?? 0,
                    ]);
                } else {
                    // Update existing
                    $periksaLab->update([
                        'nip' => $petugasNip, // Gunakan nip yang sudah dipastikan ada di petugas
                        'tgl_periksa' => $data['tgl_periksa'],
                        'jam' => $data['jam'],
                        'kd_dokter' => $data['kd_dokter_pj'], // Update dokter PJ
                        'status' => ucfirst($permintaanLab->status), // Pastikan status sesuai dengan permintaan
                        'kategori' => $jnsPerawatanLab->kategori ?? 'PK', // Update kategori jika berubah
                    ]);
                }

                // Simpan detail hasil
                foreach ($hasilItems as $hasilItem) {
                    // Pastikan nilai hasil tidak kosong sebelum menyimpan
                    if (empty($hasilItem['hasil']) || trim($hasilItem['hasil']) === '') {
                        Log::warning('Store hasil: Mencoba menyimpan hasil kosong', [
                            'noorder' => $noorder,
                            'id_template' => $hasilItem['id_template'],
                            'kd_jenis_prw' => $kdJenisPrw,
                        ]);

                        continue; // Skip hasil yang kosong
                    }

                    // Ambil data template untuk mendapatkan informasi biaya
                    $template = \App\Models\TemplateLaboratorium::find($hasilItem['id_template']);

                    // Hitung keterangan otomatis jika tidak ada atau kosong
                    $keterangan = $hasilItem['keterangan'] ? trim($hasilItem['keterangan']) : null;
                    if (empty($keterangan) && ! empty($hasilItem['hasil']) && ! empty($hasilItem['nilai_rujukan'])) {
                        $keterangan = $this->hitungKeterangan($hasilItem['hasil'], $hasilItem['nilai_rujukan']);
                    }
                    // Default "N" jika masih kosong (Normal)
                    if (empty($keterangan)) {
                        $keterangan = 'N';
                    }

                    $detailPeriksaLab = DetailPeriksaLab::updateOrCreate(
                        [
                            'no_rawat' => $permintaanLab->no_rawat,
                            'kd_jenis_prw' => $kdJenisPrw,
                            'id_template' => $hasilItem['id_template'],
                            'tgl_periksa' => $data['tgl_periksa'],
                            'jam' => $data['jam'],
                        ],
                        [
                            'nilai' => trim($hasilItem['hasil']), // Pastikan tidak ada whitespace
                            'nilai_rujukan' => $hasilItem['nilai_rujukan'] ? trim($hasilItem['nilai_rujukan']) : null,
                            'keterangan' => $keterangan, // Pastikan tidak null, default "N"
                            // Kolom biaya dari template_laboratorium (sesuai dengan Java)
                            'bagian_rs' => $template->bagian_rs ?? 0,
                            'bhp' => $template->bhp ?? 0,
                            'bagian_perujuk' => $template->bagian_perujuk ?? 0,
                            'bagian_dokter' => $template->bagian_dokter ?? 0,
                            'bagian_laborat' => $template->bagian_laborat ?? 0,
                            'kso' => $template->kso ?? 0,
                            'menejemen' => $template->menejemen ?? 0,
                            'biaya_item' => $template->biaya_item ?? 0,
                        ]
                    );

                    // Verifikasi bahwa data benar-benar tersimpan
                    if (empty($detailPeriksaLab->nilai) || trim($detailPeriksaLab->nilai) === '') {
                        Log::error('Store hasil: Gagal menyimpan hasil', [
                            'noorder' => $noorder,
                            'id_template' => $hasilItem['id_template'],
                            'kd_jenis_prw' => $kdJenisPrw,
                        ]);
                    }
                }
            }

            // Verifikasi bahwa semua hasil sudah tersimpan dengan benar
            // sebelum mengupdate tgl_hasil dan jam_hasil di permintaan_lab
            // Reload detail permintaan untuk memastikan data terbaru
            $permintaanLab->refresh();
            $permintaanLab->load('detailPermintaan');

            $allHasResults = true;
            $missingTemplates = [];

            // Verifikasi bahwa semua template yang diminta memiliki hasil yang tersimpan
            foreach ($permintaanLab->detailPermintaan as $detail) {
                // Cek apakah ada hasil yang tersimpan untuk template ini
                // Tidak perlu filter tanggal/jam karena kita baru saja menyimpan hasil tersebut
                $hasResult = DetailPeriksaLab::where('no_rawat', $permintaanLab->no_rawat)
                    ->where('kd_jenis_prw', $detail->kd_jenis_prw)
                    ->where('id_template', $detail->id_template)
                    ->whereNotNull('nilai')
                    ->where('nilai', '!=', '')
                    ->exists();

                if (! $hasResult) {
                    $allHasResults = false;
                    $missingTemplates[] = [
                        'kd_jenis_prw' => $detail->kd_jenis_prw,
                        'id_template' => $detail->id_template,
                    ];

                    Log::warning('Store hasil: Template tidak memiliki hasil', [
                        'noorder' => $noorder,
                        'no_rawat' => $permintaanLab->no_rawat,
                        'kd_jenis_prw' => $detail->kd_jenis_prw,
                        'id_template' => $detail->id_template,
                    ]);
                }
            }

            // Hanya update tgl_hasil jika semua hasil benar-benar tersimpan
            if ($allHasResults) {
                // Pastikan format jam konsisten (H:i:s untuk jam_hasil)
                $jamHasil = $data['jam'];
                // Jika format jam adalah H:i (tanpa detik), tambahkan :00
                if (preg_match('/^\d{2}:\d{2}$/', $jamHasil)) {
                    $jamHasil .= ':00';
                }

                $permintaanLab->update([
                    'tgl_hasil' => $data['tgl_periksa'],
                    'jam_hasil' => $jamHasil,
                ]);

                Log::info('Store hasil: Semua template memiliki hasil', [
                    'noorder' => $noorder,
                    'no_rawat' => $permintaanLab->no_rawat,
                    'tgl_hasil' => $data['tgl_periksa'],
                    'jam_hasil' => $data['jam'],
                ]);
            } else {
                // Jika ada template yang belum memiliki hasil, reset tgl_hasil
                $permintaanLab->update([
                    'tgl_hasil' => '0000-00-00',
                    'jam_hasil' => '00:00:00',
                ]);

                Log::warning('Store hasil: Tidak semua template memiliki hasil', [
                    'noorder' => $noorder,
                    'no_rawat' => $permintaanLab->no_rawat,
                    'missing_templates' => $missingTemplates,
                ]);
            }

            DB::commit();

            return redirect()->route('laboratorium.permintaan-lab.index')
                ->with('success', 'Hasil pemeriksaan berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Store hasil error: '.$e->getMessage(), [
                'noorder' => $noorder,
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['error' => 'Gagal menyimpan hasil pemeriksaan: '.$e->getMessage()])->withInput();
        }
    }

    /**
     * Hitung keterangan berdasarkan nilai hasil dan nilai rujukan
     *
     * @param  string|float  $hasil  Nilai hasil pemeriksaan
     * @param  string  $nilaiRujukan  Nilai rujukan (format: "min-max", "> min", atau "< max")
     * @return string Keterangan: "N" (Normal), "L" (Low), "H" (High), atau "K" (Critical)
     */
    private function hitungKeterangan($hasil, $nilaiRujukan): string
    {
        if (empty($hasil) || empty($nilaiRujukan)) {
            return 'N'; // Default Normal jika tidak ada data
        }

        // Parse hasil menjadi float
        $hasilNum = (float) $hasil;
        if ($hasilNum == 0 && $hasil !== '0' && $hasil !== '0.0') {
            return 'N'; // Jika hasil tidak valid, return Normal
        }

        // Parse nilai rujukan
        $nilaiRujukan = trim($nilaiRujukan);

        // Format range: "13.5-18.0" atau "27.0-31.0"
        if (preg_match('/^([\d.]+)\s*-\s*([\d.]+)$/', $nilaiRujukan, $matches)) {
            $min = (float) $matches[1];
            $max = (float) $matches[2];

            if ($hasilNum < $min) {
                // Hitung deviasi untuk menentukan kritis
                $range = $max - $min;
                $deviation = $range > 0 ? (($min - $hasilNum) / $range) * 100 : 0;
                // Kritis jika deviasi > 100% atau hasil < 50% dari min
                if ($deviation > 100 || ($min > 0 && $hasilNum < ($min * 0.5))) {
                    return 'K';
                }

                return 'L';
            } elseif ($hasilNum > $max) {
                // Hitung deviasi untuk menentukan kritis
                $range = $max - $min;
                $deviation = $range > 0 ? (($hasilNum - $max) / $range) * 100 : 0;
                // Kritis jika deviasi > 100% atau hasil > 2x dari max
                if ($deviation > 100 || $hasilNum > ($max * 2)) {
                    return 'K';
                }

                return 'H';
            } else {
                // Dalam rentang = Normal
                return 'N';
            }
        }
        // Format "> 20.0" - hasil harus > min
        elseif (preg_match('/^>\s*([\d.]+)$/', $nilaiRujukan, $matches)) {
            $min = (float) $matches[1];
            if ($hasilNum < $min) {
                $deviation = $min > 0 ? (($min - $hasilNum) / $min) * 100 : 0;
                if ($deviation > 100 || ($min > 0 && $hasilNum < ($min * 0.5))) {
                    return 'K';
                }

                return 'L';
            }

            return 'N';
        }
        // Format "< 5.0" - hasil harus < max
        elseif (preg_match('/^<\s*([\d.]+)$/', $nilaiRujukan, $matches)) {
            $max = (float) $matches[1];
            if ($hasilNum > $max) {
                $deviation = $max > 0 ? (($hasilNum - $max) / $max) * 100 : 0;
                if ($deviation > 100 || $hasilNum > ($max * 2)) {
                    return 'K';
                }

                return 'H';
            }

            return 'N';
        }

        // Jika format tidak dikenali, return Normal
        return 'N';
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $noorder)
    {
        $permintaanLab = PermintaanLab::with(['regPeriksa.patient', 'dokter'])
            ->findOrFail($noorder);

        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $regPeriksa = RegPeriksa::with('patient')->get();

        return Inertia::render('PermintaanLab/Edit', [
            'permintaanLab' => $permintaanLab,
            'dokters' => $dokters,
            'regPeriksa' => $regPeriksa,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $noorder)
    {
        $permintaanLab = PermintaanLab::findOrFail($noorder);

        // Decode no_rawat untuk menangani encoding dari frontend
        $requestData = $request->all();
        if (isset($requestData['no_rawat'])) {
            $requestData['no_rawat'] = urldecode($requestData['no_rawat']);
        }

        $validator = Validator::make($requestData, [
            'no_rawat' => 'required|string|max:17|exists:reg_periksa,no_rawat',
            'tgl_permintaan' => 'required|date',
            'jam_permintaan' => 'required|date_format:H:i',
            'tgl_sampel' => 'nullable|date',
            'jam_sampel' => 'nullable|date_format:H:i',
            'tgl_hasil' => 'nullable|date',
            'jam_hasil' => 'nullable|date_format:H:i',
            'status' => 'required|in:ralan,ranap',
            'informasi_tambahan' => 'nullable|string|max:60',
            'diagnosa_klinis' => 'required|string|max:80',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $data = $validator->validated();
            $permintaanLab->update($data);

            return redirect()->route('laboratorium.permintaan-lab.index')
                ->with('success', 'Permintaan laboratorium berhasil diperbarui');
        } catch (\Exception $e) {
            Log::error('PermintaanLabController update error: '.$e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['error' => 'Gagal memperbarui permintaan laboratorium: '.$e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $noorder)
    {
        try {
            $permintaanLab = PermintaanLab::with('detailPermintaan')->findOrFail($noorder);

            // Validasi sesuai business rules
            // 1. Tidak boleh dihapus jika ada item yang sudah dibayar
            $hasPaidItem = $permintaanLab->detailPermintaan()
                ->where('stts_bayar', 'Sudah')
                ->exists();

            if ($hasPaidItem) {
                $message = 'Tidak dapat menghapus permintaan yang sudah memiliki item yang dibayar.';

                if (request()->wantsJson() || request()->ajax()) {
                    return response()->json([
                        'success' => false,
                        'message' => $message,
                    ], 422);
                }

                return back()->withErrors(['error' => $message]);
            }

            // 2. Tidak boleh dihapus jika sudah diambil sampel (kecuali Admin Utama)
            // Validasi tgl_sampel yang lebih robust untuk menangani berbagai format tanggal invalid
            $tglSampel = $permintaanLab->tgl_sampel;
            $hasSample = false;

            if ($tglSampel) {
                // Handle berbagai format tanggal yang mungkin
                $dateStr = null;

                if (is_string($tglSampel)) {
                    $dateStr = $tglSampel;
                } elseif (is_object($tglSampel) && method_exists($tglSampel, 'format')) {
                    // Jika berupa Carbon/DateTime object
                    try {
                        $dateStr = $tglSampel->format('Y-m-d');
                    } catch (\Exception $e) {
                        $dateStr = (string) $tglSampel;
                    }
                } else {
                    $dateStr = (string) $tglSampel;
                }

                // Daftar nilai yang dianggap TIDAK valid (belum ada sampel)
                $invalidDates = [
                    '0000-00-00',
                    '0000-00-00 00:00:00',
                    '-0001-11-30',
                    '-0001-11-29',
                    '-0001-11-30 00:00:00',
                    '1970-01-01', // Unix epoch default
                    '1970-01-01 00:00:00',
                ];

                // Cek apakah tanggal adalah nilai invalid
                $isInvalidDate = false;
                foreach ($invalidDates as $invalid) {
                    if (str_contains($dateStr, $invalid)) {
                        $isInvalidDate = true;
                        break;
                    }
                }

                // Cek apakah tanggal dimulai dengan tanda minus (tanggal negatif/invalid)
                if (! $isInvalidDate && str_starts_with(trim($dateStr), '-')) {
                    $isInvalidDate = true;
                }

                // Cek apakah tanggal adalah tahun 1970 atau lebih awal (biasanya default/invalid)
                if (! $isInvalidDate && preg_match('/^(\d{4})-\d{2}-\d{2}/', $dateStr, $matches)) {
                    $year = (int) $matches[1];
                    if ($year < 1970 || $year > 2100) {
                        $isInvalidDate = true;
                    }
                }

                // Sampel dianggap valid hanya jika bukan invalid date
                $hasSample = ! $isInvalidDate;
            }

            $currentUser = Auth::user();
            $isAdmin = ($currentUser instanceof User) && (
                $currentUser->hasRole('Admin Utama') || $currentUser->hasRole('Super Admin')
            );

            if ($hasSample && ! $isAdmin) {
                $message = 'Tidak dapat menghapus permintaan yang sudah diambil sampelnya. Hanya Admin Utama yang dapat menghapus.';

                if (request()->wantsJson() || request()->ajax()) {
                    return response()->json([
                        'success' => false,
                        'error' => $message,
                        'message' => $message,
                    ], 422);
                }

                return back()->withErrors(['error' => $message]);
            }

            DB::beginTransaction();
            try {
                // Hapus detail permintaan terlebih dahulu
                $permintaanLab->detailPermintaan()->delete();

                // Hapus permintaan lab
                $permintaanLab->delete();

                DB::commit();

                $successMessage = 'Permintaan laboratorium berhasil dihapus';

                // Check if request is AJAX/Inertia
                if (request()->wantsJson() || request()->ajax() || request()->header('X-Inertia')) {
                    return redirect()->route('laboratorium.permintaan-lab.index')
                        ->with('success', $successMessage);
                }

                return redirect()->route('laboratorium.permintaan-lab.index')
                    ->with('success', $successMessage);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e; // Re-throw untuk ditangani oleh catch block di luar
            }
        } catch (\Exception $e) {
            Log::error('PermintaanLabController destroy error: '.$e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            $errorMessage = 'Gagal menghapus permintaan laboratorium: '.$e->getMessage();

            // Check if request is AJAX/Inertia
            if (request()->wantsJson() || request()->ajax() || request()->header('X-Inertia')) {
                return back()->withErrors(['error' => $errorMessage]);
            }

            return back()->withErrors(['error' => $errorMessage]);
        }
    }

    /**
     * Get reg periksa data for AJAX
     */
    public function getRegPeriksa(Request $request): JsonResponse
    {
        $query = RegPeriksa::with('patient')
            ->where('status_lanjut', 'Ralan');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_rawat', 'like', "%{$search}%")
                    ->orWhereHas('patient', function ($q) use ($search) {
                        $q->where('nm_pasien', 'like', "%{$search}%")
                            ->orWhere('no_rkm_medis', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('tanggal')) {
            $query->whereDate('tgl_registrasi', $request->tanggal);
        }

        $regPeriksa = $query->limit(10)->get();

        return response()->json([
            'success' => true,
            'data' => $regPeriksa,
        ]);
    }

    /**
     * Get permintaan lab by no_rawat
     * Menampilkan hanya permintaan lab yang sesuai dengan tagihan nota (ada di billing)
     */
    public function getByNoRawat($noRawat): JsonResponse
    {
        try {
            // Decode noRawat untuk menangani encoding dari frontend
            $decodedNoRawat = urldecode($noRawat);

            // Cek apakah sudah ada snapshot billing untuk no_rawat ini
            $hasSnapshotBilling = DB::table('billing')
                ->where('no_rawat', $decodedNoRawat)
                ->exists();

            $noorderDiBilling = [];
            
            if ($hasSnapshotBilling) {
                // Jika sudah ada snapshot billing, ambil hanya noorder yang ada di billing dengan status 'Laborat'
                $noorderDiBilling = DB::table('billing')
                    ->where('no_rawat', $decodedNoRawat)
                    ->where('status', 'Laborat')
                    ->whereNotNull('no')
                    ->where('no', '!=', '')
                    ->distinct()
                    ->pluck('no')
                    ->filter(function ($no) {
                        // Filter hanya yang formatnya seperti noorder (PLYYYYMMDDNNNN)
                        return is_string($no) && (str_starts_with($no, 'PL') || preg_match('/^PL\d{8}\d{4}$/', $no));
                    })
                    ->unique()
                    ->values()
                    ->all();
            } else {
                // Jika belum ada snapshot billing (mode preview), ambil noorder dari permintaan_detail_permintaan_lab
                // yang akan muncul di preview billing (mengikuti logika BillingController)
                // Agregasi per noorder dan kd_jenis_prw untuk mendapatkan total biaya per jenis pemeriksaan per permintaan
                $noorderDiBilling = DB::table('permintaan_detail_permintaan_lab')
                    ->join('permintaan_lab', 'permintaan_detail_permintaan_lab.noorder', '=', 'permintaan_lab.noorder')
                    ->join('jns_perawatan_lab', 'permintaan_detail_permintaan_lab.kd_jenis_prw', '=', 'jns_perawatan_lab.kd_jenis_prw')
                    ->where('permintaan_lab.no_rawat', $decodedNoRawat)
                    ->where('permintaan_lab.status', 'ralan') // Hanya untuk rawat jalan (sesuai BillingController)
                    ->distinct()
                    ->pluck('permintaan_lab.noorder')
                    ->values()
                    ->all();
            }

            // Filter permintaan lab berdasarkan noorder yang ada di billing/preview
            $query = PermintaanLab::with(['regPeriksa.patient', 'dokter', 'detailPermintaan.jenisPerawatan'])
                ->where('no_rawat', $decodedNoRawat);
            
            if (!empty($noorderDiBilling)) {
                // Hanya tampilkan permintaan lab yang noorder-nya ada di billing/preview
                $query->whereIn('noorder', $noorderDiBilling);
                
                // Log untuk debugging
                Log::info('PermintaanLabController getByNoRawat: Filter berdasarkan billing', [
                    'no_rawat' => $decodedNoRawat,
                    'has_snapshot' => $hasSnapshotBilling,
                    'noorder_count' => count($noorderDiBilling),
                    'noorder_list' => $noorderDiBilling,
                ]);
            } else {
                // Jika tidak ada data di billing/preview, return empty array
                Log::info('PermintaanLabController getByNoRawat: Tidak ada data di billing/preview', [
                    'no_rawat' => $decodedNoRawat,
                    'has_snapshot' => $hasSnapshotBilling,
                ]);
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'total' => 0,
                    'message' => 'Tidak ada permintaan laboratorium yang sesuai dengan tagihan nota',
                ]);
            }

            $permintaanList = $query
                ->orderBy('tgl_permintaan', 'desc')
                ->orderBy('jam_permintaan', 'desc')
                ->get()
                ->map(function ($permintaan) {
                    // Tentukan status "sudah dilayani" berdasarkan tgl_hasil dan jam_hasil
                    $tglHasil = $permintaan->tgl_hasil;
                    $jamHasil = $permintaan->jam_hasil;
                    
                    // Cek apakah hasil sudah tersedia
                    $hasHasil = false;
                    if ($tglHasil && $tglHasil !== '0000-00-00' && $tglHasil !== null) {
                        // Cek juga apakah tanggal hasil valid (bukan tanggal default/invalid)
                        try {
                            $dateStr = is_string($tglHasil) ? $tglHasil : (string) $tglHasil;
                            $invalidDates = ['0000-00-00', '0000-00-00 00:00:00', '-0001-11-30', '1970-01-01'];
                            $isInvalid = false;
                            foreach ($invalidDates as $invalid) {
                                if (str_contains($dateStr, $invalid)) {
                                    $isInvalid = true;
                                    break;
                                }
                            }
                            if (!$isInvalid && !str_starts_with(trim($dateStr), '-')) {
                                $hasHasil = true;
                            }
                        } catch (\Exception $e) {
                            // Jika error parsing, anggap belum ada hasil
                            $hasHasil = false;
                        }
                    }
                    
                    // Gunakan method hasHasilTersedia() jika tersedia untuk validasi lebih akurat
                    if (method_exists($permintaan, 'hasHasilTersedia')) {
                        try {
                            $hasHasil = $permintaan->hasHasilTersedia();
                        } catch (\Exception $e) {
                            // Jika method error, gunakan hasil dari pengecekan manual di atas
                        }
                    }
                    
                    // Tentukan status label
                    $statusLabel = $hasHasil ? 'Sudah Dilayani' : ($permintaan->status ?? 'Belum Dilayani');
                    
                    return [
                        'noorder' => $permintaan->noorder,
                        'no_rawat' => $permintaan->no_rawat,
                        'tgl_permintaan' => $permintaan->tgl_permintaan,
                        'jam_permintaan' => $permintaan->jam_permintaan,
                        'tgl_sampel' => $permintaan->tgl_sampel,
                        'jam_sampel' => $permintaan->jam_sampel,
                        'tgl_hasil' => $permintaan->tgl_hasil,
                        'jam_hasil' => $permintaan->jam_hasil,
                        'dokter_perujuk' => $permintaan->dokter_perujuk ?? '-',
                        'status' => $statusLabel, // Status yang lebih jelas
                        'status_raw' => $permintaan->status, // Status asli dari database
                        'sudah_dilayani' => $hasHasil, // Flag boolean untuk kemudahan filter di frontend
                        'informasi_tambahan' => $permintaan->informasi_tambahan,
                        'diagnosa_klinis' => $permintaan->diagnosa_klinis,
                        'pasien' => [
                            'no_rkm_medis' => $permintaan->regPeriksa->patient->no_rkm_medis ?? '',
                            'nm_pasien' => $permintaan->regPeriksa->patient->nm_pasien ?? '',
                        ],
                        'dokter' => [
                            'kd_dokter' => $permintaan->dokter->kd_dokter ?? '',
                            'nm_dokter' => $permintaan->dokter->nm_dokter ?? '',
                        ],
                        'detail_tests' => $permintaan->detailPermintaan->map(function ($detail) use ($permintaan) {
                            // Ambil hasil pemeriksaan dari detail_periksa_lab berdasarkan no_rawat, kd_jenis_prw, tgl_periksa, dan jam
                            // Validasi berdasarkan kombinasi lengkap: no_rawat, kd_jenis_prw, id_template, tgl_periksa, jam
                            // Gunakan kombinasi tgl_periksa dan jam terbaru untuk setiap id_template
                            $hasilPemeriksaan = DB::table('detail_periksa_lab')
                                ->join('template_laboratorium', 'detail_periksa_lab.id_template', '=', 'template_laboratorium.id_template')
                                ->where('detail_periksa_lab.no_rawat', $permintaan->no_rawat)
                                ->where('detail_periksa_lab.kd_jenis_prw', $detail->kd_jenis_prw)
                                ->whereNotNull('detail_periksa_lab.nilai')
                                ->where('detail_periksa_lab.nilai', '!=', '')
                                ->select(
                                    'detail_periksa_lab.id_template',
                                    'detail_periksa_lab.nilai',
                                    'detail_periksa_lab.nilai_rujukan',
                                    'detail_periksa_lab.keterangan',
                                    'detail_periksa_lab.tgl_periksa',
                                    'detail_periksa_lab.jam',
                                    'template_laboratorium.Pemeriksaan as pemeriksaan',
                                    'template_laboratorium.satuan'
                                )
                                ->orderBy('detail_periksa_lab.tgl_periksa', 'desc')
                                ->orderBy('detail_periksa_lab.jam', 'desc')
                                ->get()
                                ->unique(function ($hasil) {
                                    // Gunakan kombinasi id_template untuk unique
                                    // Ini memastikan hanya satu hasil per id_template (yang terbaru karena sudah di-order)
                                    return $hasil->id_template;
                                })
                                ->values()
                                ->map(function ($hasil) {
                                    return [
                                        'id_template' => $hasil->id_template,
                                        'pemeriksaan' => $hasil->pemeriksaan ?? '',
                                        'nilai' => $hasil->nilai ?? '',
                                        'satuan' => $hasil->satuan ?? '',
                                        'nilai_rujukan' => $hasil->nilai_rujukan ?? '',
                                        'keterangan' => $hasil->keterangan ?? '',
                                        'tgl_periksa' => $hasil->tgl_periksa ?? null,
                                        'jam' => $hasil->jam ?? null,
                                    ];
                                });
                            
                            return [
                                'kd_jenis_prw' => $detail->kd_jenis_prw,
                                'nm_perawatan' => $detail->jenisPerawatan->nm_perawatan ?? '',
                                'biaya' => $detail->jenisPerawatan->total_byrdr ?? 0,
                                'stts_bayar' => $detail->stts_bayar,
                                'hasil_pemeriksaan' => $hasilPemeriksaan, // Tambahkan hasil pemeriksaan
                            ];
                        }),
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $permintaanList,
                'total' => $permintaanList->count(),
            ]);

        } catch (\Exception $e) {
            Log::error('PermintaanLabController getByNoRawat error', [
                'no_rawat' => $noRawat ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data permintaan laboratorium: '.$e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    /**
     * Get available lab tests
     */
    public function getLabTests(Request $request): JsonResponse
    {
        try {
            $search = $request->get('search', '');
            $kelas = $request->get('kelas', '');

            $query = JnsPerawatanLab::where('status', '1');

            if (! empty($search)) {
                $query->where('nm_perawatan', 'like', '%'.$search.'%');
            }

            if (! empty($kelas)) {
                $query->where('kelas', $kelas);
            }

            $labTests = $query->orderBy('nm_perawatan', 'asc')->get();

            return response()->json([
                'success' => true,
                'data' => $labTests,
                'total' => $labTests->count(),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching lab tests: '.$e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    /**
     * Get templates for a specific jenis pemeriksaan (kd_jenis_prw)
     */
    public function getTemplates(Request $request, $kdJenisPrw = null): JsonResponse
    {
        try {
            $kdJenisPrw = $kdJenisPrw ?? $request->get('kd_jenis_prw');

            if (! $kdJenisPrw) {
                return response()->json([
                    'success' => false,
                    'message' => 'kd_jenis_prw is required',
                    'data' => [],
                ], 400);
            }

            $templates = TemplateLaboratorium::where('kd_jenis_prw', $kdJenisPrw)
                ->orderBy('urut', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $templates,
                'total' => $templates->count(),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching templates: '.$e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    /**
     * Compose staging jurnal (tampjurnal2) untuk permintaan Laboratorium berdasarkan noorder.
     */
    public function stageJurnalLab(Request $request)
    {
        $validated = $request->validate([
            'noorder' => ['required', 'string'],
        ]);

        try {
            /** @var TampJurnalComposerLab $composer */
            $composer = app(TampJurnalComposerLab::class);
            $result = $composer->composeForNoOrder($validated['noorder']);

            $balanced = round($result['debet'], 2) === round($result['kredit'], 2);

            return response()->json([
                'success' => true,
                'meta' => [
                    'debet' => $result['debet'],
                    'kredit' => $result['kredit'],
                    'balanced' => $balanced,
                    'lines' => count($result['lines']),
                ],
                'lines' => $result['lines'],
                'message' => 'Staging jurnal (tampjurnal2) berhasil disusun untuk permintaan laboratorium',
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyusun staging jurnal: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get riwayat permintaan lab by no_rawat
     */
    public function getRiwayat($noRawat): JsonResponse
    {
        try {
            $riwayatPermintaan = PermintaanLab::with([
                'detailPermintaan.jnsPerawatanLab',
                'detailPermintaan.templateLaboratorium',
            ])
                ->where('no_rawat', $noRawat)
                ->orderBy('tgl_permintaan', 'desc')
                ->orderBy('jam_permintaan', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $riwayatPermintaan,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil riwayat permintaan: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ambil sampel: update tanggal dan jam sampel untuk permintaan lab terbaru berdasarkan no_rawat
     */
    public function ambilSampel(Request $request)
    {
        $requestData = $request->all();
        if (isset($requestData['no_rawat'])) {
            $requestData['no_rawat'] = urldecode($requestData['no_rawat']);
        }

        $validator = Validator::make($requestData, [
            'no_rawat' => 'required|string|exists:reg_periksa,no_rawat',
            'tgl_sampel' => 'required|date',
            'jam_sampel' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $noRawat = $requestData['no_rawat'];
            // Ambil permintaan terbaru untuk no_rawat ini
            $permintaanTerbaru = PermintaanLab::where('no_rawat', $noRawat)
                ->orderBy('tgl_permintaan', 'desc')
                ->orderBy('jam_permintaan', 'desc')
                ->first();

            if (! $permintaanTerbaru) {
                return back()->withErrors(['error' => 'Tidak ditemukan permintaan laboratorium untuk No. Rawat ini.']);
            }

            $permintaanTerbaru->update([
                'tgl_sampel' => $requestData['tgl_sampel'],
                'jam_sampel' => $requestData['jam_sampel'],
            ]);

            return redirect()->route('laboratorium.index')
                ->with('success', 'Tanggal dan jam sampel berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('PermintaanLabController ambilSampel error: '.$e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors(['error' => 'Gagal memperbarui sampel: '.$e->getMessage()])->withInput();
        }
    }

    /**
     * Update waktu sampel berdasarkan noorder
     * Route: PUT /laboratorium/permintaan-lab/{noorder}/sampel
     */
    public function updateSampel(Request $request, string $noorder)
    {
        Log::info('PermintaanLabController updateSampel START', [
            'noorder' => $noorder,
            'request_all' => $request->all(),
            'method' => $request->method(),
            'is_inertia' => $request->header('X-Inertia'),
        ]);

        $validator = Validator::make($request->all(), [
            'tgl_sampel' => 'required|date',
            'jam_sampel' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            Log::warning('PermintaanLabController updateSampel validation failed', [
                'errors' => $validator->errors()->toArray(),
            ]);

            // Untuk Inertia request, selalu gunakan back() dengan errors
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            $permintaanLab = PermintaanLab::findOrFail($noorder);
            Log::info('PermintaanLabController updateSampel found permintaan', [
                'noorder' => $noorder,
                'current_tgl_sampel' => $permintaanLab->tgl_sampel,
                'current_jam_sampel' => $permintaanLab->jam_sampel,
                'current_tgl_hasil' => $permintaanLab->tgl_hasil,
            ]);

            // Validasi: tidak boleh update jika hasil sudah tersedia
            $tglHasil = $permintaanLab->tgl_hasil;
            $hasResult = false;

            if ($tglHasil) {
                // Handle berbagai format tanggal yang mungkin
                $dateStr = null;

                if (is_string($tglHasil)) {
                    $dateStr = $tglHasil;
                } elseif (is_object($tglHasil) && method_exists($tglHasil, 'format')) {
                    // Jika berupa Carbon/DateTime object
                    try {
                        $dateStr = $tglHasil->format('Y-m-d');
                    } catch (\Exception $e) {
                        $dateStr = (string) $tglHasil;
                    }
                } else {
                    $dateStr = (string) $tglHasil;
                }

                // Daftar nilai yang dianggap TIDAK valid (belum ada hasil)
                $invalidDates = [
                    '0000-00-00',
                    '0000-00-00 00:00:00',
                    '-0001-11-30',
                    '-0001-11-30 00:00:00',
                    '1970-01-01', // Unix epoch default
                    '1970-01-01 00:00:00',
                ];

                // Cek apakah tanggal adalah nilai invalid atau tanggal negatif
                $isInvalidDate = false;
                foreach ($invalidDates as $invalid) {
                    if (str_contains($dateStr, $invalid)) {
                        $isInvalidDate = true;
                        break;
                    }
                }

                // Cek apakah tanggal dimulai dengan tanda minus (tanggal negatif/invalid)
                if (! $isInvalidDate && str_starts_with(trim($dateStr), '-')) {
                    $isInvalidDate = true;
                }

                // Cek apakah tanggal adalah tahun 1970 atau lebih awal (biasanya default/invalid)
                if (! $isInvalidDate && preg_match('/^(\d{4})-\d{2}-\d{2}/', $dateStr, $matches)) {
                    $year = (int) $matches[1];
                    if ($year < 1970 || $year > 2100) {
                        $isInvalidDate = true;
                    }
                }

                // Hasil dianggap valid hanya jika bukan invalid date
                $hasResult = ! $isInvalidDate;

                Log::info('PermintaanLabController updateSampel tgl_hasil check', [
                    'noorder' => $noorder,
                    'tgl_hasil_raw' => $tglHasil,
                    'tgl_hasil_string' => $dateStr,
                    'is_invalid_date' => $isInvalidDate,
                    'has_result' => $hasResult,
                ]);
            }

            if ($hasResult) {
                Log::warning('PermintaanLabController updateSampel blocked - hasil sudah tersedia', [
                    'noorder' => $noorder,
                    'tgl_hasil' => $tglHasil,
                ]);

                return redirect()->back()->withErrors([
                    'error' => 'Tidak dapat memperbarui waktu sampel karena hasil sudah tersedia.',
                ]);
            }

            Log::info('PermintaanLabController updateSampel updating', [
                'noorder' => $noorder,
                'new_tgl_sampel' => $request->tgl_sampel,
                'new_jam_sampel' => $request->jam_sampel,
            ]);

            $permintaanLab->update([
                'tgl_sampel' => $request->tgl_sampel,
                'jam_sampel' => $request->jam_sampel,
            ]);

            Log::info('PermintaanLabController updateSampel SUCCESS', [
                'noorder' => $noorder,
                'updated_tgl_sampel' => $permintaanLab->fresh()->tgl_sampel,
                'updated_jam_sampel' => $permintaanLab->fresh()->jam_sampel,
            ]);

            // Untuk Inertia request, selalu gunakan redirect dengan flash message
            return redirect()->back()->with('success', 'Tanggal dan jam sampel berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('PermintaanLabController updateSampel error: '.$e->getMessage(), [
                'noorder' => $noorder,
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors([
                'error' => 'Gagal memperbarui sampel: '.$e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Preview hasil pemeriksaan laboratorium sebelum download PDF
     */
    public function preview(string $noorder)
    {
        try {
            // Ambil data permintaan lab dengan relasi lengkap
            $permintaanLab = PermintaanLab::with([
                'regPeriksa.patient',
                'dokter',
                'detailPermintaan.templateLaboratorium',
                'detailPermintaan.jnsPerawatanLab',
            ])->findOrFail($noorder);

            // Ambil data hasil pemeriksaan dari periksa_lab dan detail_periksa_lab
            $periksaLab = PeriksaLab::with([
                'regPeriksa.patient',
                'petugas',
                'jenisPerawatan',
                'detailPemeriksaan.template',
            ])
                ->where('no_rawat', $permintaanLab->no_rawat)
                ->get();

            // Ambil dokter penanggung jawab jika ada kd_dokter
            $dokterPj = null;
            if ($periksaLab->isNotEmpty() && $periksaLab->first()->kd_dokter) {
                $dokterPj = Dokter::find($periksaLab->first()->kd_dokter);
            }

            // Ambil data setting untuk kop surat (hanya kolom text, skip binary data seperti logo/wallpaper)
            $setting = DB::table('setting')
                ->select('nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email')
                ->first();

            // Format data hasil pemeriksaan
            $hasilPemeriksaan = [];

            // Jika ada hasil pemeriksaan dari periksa_lab
            if ($periksaLab->isNotEmpty()) {
                foreach ($periksaLab as $periksa) {
                    // Reload detail pemeriksaan untuk memastikan data lengkap
                    $details = DetailPeriksaLab::with('template')
                        ->where('no_rawat', $periksa->no_rawat)
                        ->where('kd_jenis_prw', $periksa->kd_jenis_prw)
                        ->get();

                    foreach ($details as $detail) {
                        $hasilPemeriksaan[] = [
                            'jenis_pemeriksaan' => $periksa->jenisPerawatan?->nm_perawatan ? (string) $periksa->jenisPerawatan->nm_perawatan : '-',
                            'nama_pemeriksaan' => $detail->template?->Pemeriksaan ? (string) $detail->template->Pemeriksaan : '-',
                            'hasil' => $detail->nilai ? (string) $detail->nilai : '-',
                            'satuan' => $detail->template?->satuan ? (string) $detail->template->satuan : '-',
                            'nilai_rujukan' => $detail->nilai_rujukan ? (string) $detail->nilai_rujukan : '-',
                            'keterangan' => $detail->keterangan ? (string) $detail->keterangan : '-',
                        ];
                    }
                }
            }

            // Jika tidak ada hasil pemeriksaan, ambil dari detail permintaan
            if (empty($hasilPemeriksaan)) {
                foreach ($permintaanLab->detailPermintaan as $detail) {
                    $hasilPemeriksaan[] = [
                        'jenis_pemeriksaan' => $detail->jnsPerawatanLab?->nm_perawatan ? (string) $detail->jnsPerawatanLab->nm_perawatan : '-',
                        'nama_pemeriksaan' => $detail->templateLaboratorium?->Pemeriksaan ? (string) $detail->templateLaboratorium->Pemeriksaan : '-',
                        'hasil' => '-',
                        'satuan' => $detail->templateLaboratorium?->satuan ? (string) $detail->templateLaboratorium->satuan : '-',
                        'nilai_rujukan' => '-',
                        'keterangan' => '-',
                    ];
                }
            }

            // Format data untuk view
            $formatDate = function ($date) {
                if (! $date || $date === '0000-00-00') {
                    return null;
                }
                if ($date instanceof \Carbon\Carbon) {
                    return $date->toDateString();
                }

                return (string) $date;
            };

            $formatTime = function ($time) {
                if (! $time || $time === '00:00:00') {
                    return null;
                }
                if ($time instanceof \Carbon\Carbon) {
                    return $time->format('H:i:s');
                }

                return (string) $time;
            };

            // Serialize data untuk view
            $periksaLabData = null;
            if ($periksaLab->isNotEmpty()) {
                $periksaLabFirst = $periksaLab->first();
                $periksaLabData = [
                    'no_rawat' => $periksaLabFirst->no_rawat ? (string) $periksaLabFirst->no_rawat : null,
                    'nip' => $periksaLabFirst->nip ? (string) $periksaLabFirst->nip : null,
                    'kd_jenis_prw' => $periksaLabFirst->kd_jenis_prw ? (string) $periksaLabFirst->kd_jenis_prw : null,
                    'tgl_periksa' => $formatDate($periksaLabFirst->tgl_periksa),
                    'jam' => $formatTime($periksaLabFirst->jam),
                    'petugas' => $periksaLabFirst->petugas ? [
                        'nik' => $periksaLabFirst->petugas->nik ? (string) $periksaLabFirst->petugas->nik : null,
                        'nama' => $periksaLabFirst->petugas->nama ? (string) $periksaLabFirst->petugas->nama : null,
                    ] : null,
                    'dokterPj' => $dokterPj ? [
                        'kd_dokter' => $dokterPj->kd_dokter ? (string) $dokterPj->kd_dokter : null,
                        'nm_dokter' => $dokterPj->nm_dokter ? (string) $dokterPj->nm_dokter : null,
                    ] : null,
                ];
            }

            // Serialize setting untuk view
            $settingData = null;
            if ($setting) {
                $settingData = [
                    'nama_instansi' => isset($setting->nama_instansi) ? (string) $setting->nama_instansi : null,
                    'alamat_instansi' => isset($setting->alamat_instansi) ? (string) $setting->alamat_instansi : null,
                    'kabupaten' => isset($setting->kabupaten) ? (string) $setting->kabupaten : null,
                    'propinsi' => isset($setting->propinsi) ? (string) $setting->propinsi : null,
                    'kontak' => isset($setting->kontak) ? (string) $setting->kontak : null,
                    'email' => isset($setting->email) ? (string) $setting->email : null,
                ];
            }

            $permintaanLabData = [
                'noorder' => (string) $permintaanLab->noorder,
                'no_rawat' => (string) $permintaanLab->no_rawat,
                'tgl_permintaan' => $formatDate($permintaanLab->tgl_permintaan),
                'jam_permintaan' => $formatTime($permintaanLab->jam_permintaan),
                'tgl_sampel' => $formatDate($permintaanLab->tgl_sampel),
                'jam_sampel' => $formatTime($permintaanLab->jam_sampel),
                'tgl_hasil' => $formatDate($permintaanLab->tgl_hasil),
                'jam_hasil' => $formatTime($permintaanLab->jam_hasil),
                'dokter_perujuk' => $permintaanLab->dokter_perujuk ? (string) $permintaanLab->dokter_perujuk : null,
                'reg_periksa' => [
                    'patient' => $permintaanLab->regPeriksa?->patient ? [
                        'no_rkm_medis' => (string) $permintaanLab->regPeriksa->patient->no_rkm_medis,
                        'nm_pasien' => (string) $permintaanLab->regPeriksa->patient->nm_pasien,
                        'jk' => $permintaanLab->regPeriksa->patient->jk ? (string) $permintaanLab->regPeriksa->patient->jk : null,
                        'tgl_lahir' => $formatDate($permintaanLab->regPeriksa->patient->tgl_lahir),
                        'alamat' => $permintaanLab->regPeriksa->patient->alamat ? (string) $permintaanLab->regPeriksa->patient->alamat : null,
                    ] : null,
                ],
                'dokter' => $permintaanLab->dokter ? [
                    'kd_dokter' => (string) $permintaanLab->dokter->kd_dokter,
                    'nm_dokter' => (string) $permintaanLab->dokter->nm_dokter,
                ] : null,
            ];

            // Pastikan hasilPemeriksaan adalah array yang valid
            $hasilPemeriksaanClean = array_map(function ($item) {
                return [
                    'jenis_pemeriksaan' => isset($item['jenis_pemeriksaan']) ? (string) $item['jenis_pemeriksaan'] : '-',
                    'nama_pemeriksaan' => isset($item['nama_pemeriksaan']) ? (string) $item['nama_pemeriksaan'] : '-',
                    'hasil' => isset($item['hasil']) ? (string) $item['hasil'] : '-',
                    'satuan' => isset($item['satuan']) ? (string) $item['satuan'] : '-',
                    'nilai_rujukan' => isset($item['nilai_rujukan']) ? (string) $item['nilai_rujukan'] : '-',
                    'keterangan' => isset($item['keterangan']) ? (string) $item['keterangan'] : '-',
                ];
            }, $hasilPemeriksaan);

            // Generate QR Code untuk tanda tangan elektronik petugas lab
            $qrCodePetugasData = $this->generateQrCodePetugasData($permintaanLabData, $periksaLabData, $settingData);
            $qrCodePetugasSvg = QrCode::size(100)
                ->errorCorrection('H')
                ->generate($qrCodePetugasData);

            // Generate QR Code untuk tanda tangan elektronik dokter penanggung jawab
            $qrCodeDokterData = $this->generateQrCodeDokterData($permintaanLabData, $periksaLabData, $settingData);
            $qrCodeDokterSvg = QrCode::size(100)
                ->errorCorrection('H')
                ->generate($qrCodeDokterData);

            // Return view untuk preview (bukan PDF)
            return view('laboratorium.preview', [
                'permintaanLab' => $permintaanLabData,
                'periksaLab' => $periksaLabData,
                'hasilPemeriksaan' => $hasilPemeriksaanClean,
                'setting' => $settingData,
                'noorder' => $noorder,
                'qrCodePetugasSvg' => $qrCodePetugasSvg,
                'qrCodeDokterSvg' => $qrCodeDokterSvg,
            ]);
        } catch (\Exception $e) {
            Log::error('PermintaanLabController preview error: '.$e->getMessage(), [
                'noorder' => $noorder,
                'trace' => $e->getTraceAsString(),
            ]);

            // Jika redirect back tidak bisa (misalnya dari tab baru), redirect ke index
            try {
                return redirect()->back()->withErrors([
                    'error' => 'Gagal mengambil data untuk preview: '.$e->getMessage(),
                ]);
            } catch (\Exception $redirectError) {
                return redirect()->route('laboratorium.permintaan-lab.index')->withErrors([
                    'error' => 'Gagal mengambil data untuk preview: '.$e->getMessage(),
                ]);
            }
        }
    }

    /**
     * Cetak hasil pemeriksaan laboratorium dalam format PDF menggunakan dompdf
     */
    public function cetak(string $noorder)
    {
        try {
            // Ambil data permintaan lab dengan relasi lengkap
            $permintaanLab = PermintaanLab::with([
                'regPeriksa.patient',
                'dokter',
                'detailPermintaan.templateLaboratorium',
                'detailPermintaan.jnsPerawatanLab',
            ])->findOrFail($noorder);

            // Ambil data hasil pemeriksaan dari periksa_lab dan detail_periksa_lab
            $periksaLab = PeriksaLab::with([
                'regPeriksa.patient',
                'petugas',
                'jenisPerawatan',
                'detailPemeriksaan.template',
            ])
                ->where('no_rawat', $permintaanLab->no_rawat)
                ->get();

            // Ambil dokter penanggung jawab jika ada kd_dokter
            $dokterPj = null;
            if ($periksaLab->isNotEmpty() && $periksaLab->first()->kd_dokter) {
                $dokterPj = Dokter::find($periksaLab->first()->kd_dokter);
            }

            // Ambil data setting untuk kop surat (hanya kolom text, skip binary data seperti logo/wallpaper)
            $setting = DB::table('setting')
                ->select('nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email')
                ->first();

            // Format data hasil pemeriksaan
            $hasilPemeriksaan = [];

            // Jika ada hasil pemeriksaan dari periksa_lab
            if ($periksaLab->isNotEmpty()) {
                foreach ($periksaLab as $periksa) {
                    // Reload detail pemeriksaan untuk memastikan data lengkap
                    $details = DetailPeriksaLab::with('template')
                        ->where('no_rawat', $periksa->no_rawat)
                        ->where('kd_jenis_prw', $periksa->kd_jenis_prw)
                        ->get();

                    foreach ($details as $detail) {
                        $hasilPemeriksaan[] = [
                            'jenis_pemeriksaan' => $periksa->jenisPerawatan?->nm_perawatan ? (string) $periksa->jenisPerawatan->nm_perawatan : '-',
                            'nama_pemeriksaan' => $detail->template?->Pemeriksaan ? (string) $detail->template->Pemeriksaan : '-',
                            'hasil' => $detail->nilai ? (string) $detail->nilai : '-',
                            'satuan' => $detail->template?->satuan ? (string) $detail->template->satuan : '-',
                            'nilai_rujukan' => $detail->nilai_rujukan ? (string) $detail->nilai_rujukan : '-',
                            'keterangan' => $detail->keterangan ? (string) $detail->keterangan : '-',
                        ];
                    }
                }
            }

            // Jika tidak ada hasil pemeriksaan, ambil dari detail permintaan
            if (empty($hasilPemeriksaan)) {
                foreach ($permintaanLab->detailPermintaan as $detail) {
                    $hasilPemeriksaan[] = [
                        'jenis_pemeriksaan' => $detail->jnsPerawatanLab?->nm_perawatan ? (string) $detail->jnsPerawatanLab->nm_perawatan : '-',
                        'nama_pemeriksaan' => $detail->templateLaboratorium?->Pemeriksaan ? (string) $detail->templateLaboratorium->Pemeriksaan : '-',
                        'hasil' => '-',
                        'satuan' => $detail->templateLaboratorium?->satuan ? (string) $detail->templateLaboratorium->satuan : '-',
                        'nilai_rujukan' => '-',
                        'keterangan' => '-',
                    ];
                }
            }

            // Format data untuk view
            $formatDate = function ($date) {
                if (! $date || $date === '0000-00-00') {
                    return null;
                }
                if ($date instanceof \Carbon\Carbon) {
                    return $date->toDateString();
                }

                return (string) $date;
            };

            $formatTime = function ($time) {
                if (! $time || $time === '00:00:00') {
                    return null;
                }
                if ($time instanceof \Carbon\Carbon) {
                    return $time->format('H:i:s');
                }

                return (string) $time;
            };

            // Serialize data untuk view
            $periksaLabData = null;
            if ($periksaLab->isNotEmpty()) {
                $periksaLabFirst = $periksaLab->first();
                $periksaLabData = [
                    'no_rawat' => $periksaLabFirst->no_rawat ? (string) $periksaLabFirst->no_rawat : null,
                    'nip' => $periksaLabFirst->nip ? (string) $periksaLabFirst->nip : null,
                    'kd_jenis_prw' => $periksaLabFirst->kd_jenis_prw ? (string) $periksaLabFirst->kd_jenis_prw : null,
                    'tgl_periksa' => $formatDate($periksaLabFirst->tgl_periksa),
                    'jam' => $formatTime($periksaLabFirst->jam),
                    'petugas' => $periksaLabFirst->petugas ? [
                        'nik' => $periksaLabFirst->petugas->nik ? (string) $periksaLabFirst->petugas->nik : null,
                        'nama' => $periksaLabFirst->petugas->nama ? (string) $periksaLabFirst->petugas->nama : null,
                    ] : null,
                    'dokterPj' => $dokterPj ? [
                        'kd_dokter' => $dokterPj->kd_dokter ? (string) $dokterPj->kd_dokter : null,
                        'nm_dokter' => $dokterPj->nm_dokter ? (string) $dokterPj->nm_dokter : null,
                    ] : null,
                ];
            }

            // Serialize setting untuk view
            $settingData = null;
            if ($setting) {
                $settingData = [
                    'nama_instansi' => isset($setting->nama_instansi) ? (string) $setting->nama_instansi : null,
                    'alamat_instansi' => isset($setting->alamat_instansi) ? (string) $setting->alamat_instansi : null,
                    'kabupaten' => isset($setting->kabupaten) ? (string) $setting->kabupaten : null,
                    'propinsi' => isset($setting->propinsi) ? (string) $setting->propinsi : null,
                    'kontak' => isset($setting->kontak) ? (string) $setting->kontak : null,
                    'email' => isset($setting->email) ? (string) $setting->email : null,
                ];
            }

            $permintaanLabData = [
                'noorder' => (string) $permintaanLab->noorder,
                'no_rawat' => (string) $permintaanLab->no_rawat,
                'tgl_permintaan' => $formatDate($permintaanLab->tgl_permintaan),
                'jam_permintaan' => $formatTime($permintaanLab->jam_permintaan),
                'tgl_sampel' => $formatDate($permintaanLab->tgl_sampel),
                'jam_sampel' => $formatTime($permintaanLab->jam_sampel),
                'tgl_hasil' => $formatDate($permintaanLab->tgl_hasil),
                'jam_hasil' => $formatTime($permintaanLab->jam_hasil),
                'dokter_perujuk' => $permintaanLab->dokter_perujuk ? (string) $permintaanLab->dokter_perujuk : null,
                'reg_periksa' => [
                    'patient' => $permintaanLab->regPeriksa?->patient ? [
                        'no_rkm_medis' => (string) $permintaanLab->regPeriksa->patient->no_rkm_medis,
                        'nm_pasien' => (string) $permintaanLab->regPeriksa->patient->nm_pasien,
                        'jk' => $permintaanLab->regPeriksa->patient->jk ? (string) $permintaanLab->regPeriksa->patient->jk : null,
                        'tgl_lahir' => $formatDate($permintaanLab->regPeriksa->patient->tgl_lahir),
                        'alamat' => $permintaanLab->regPeriksa->patient->alamat ? (string) $permintaanLab->regPeriksa->patient->alamat : null,
                    ] : null,
                ],
                'dokter' => $permintaanLab->dokter ? [
                    'kd_dokter' => (string) $permintaanLab->dokter->kd_dokter,
                    'nm_dokter' => (string) $permintaanLab->dokter->nm_dokter,
                ] : null,
            ];

            // Pastikan hasilPemeriksaan adalah array yang valid
            $hasilPemeriksaanClean = array_map(function ($item) {
                return [
                    'jenis_pemeriksaan' => isset($item['jenis_pemeriksaan']) ? (string) $item['jenis_pemeriksaan'] : '-',
                    'nama_pemeriksaan' => isset($item['nama_pemeriksaan']) ? (string) $item['nama_pemeriksaan'] : '-',
                    'hasil' => isset($item['hasil']) ? (string) $item['hasil'] : '-',
                    'satuan' => isset($item['satuan']) ? (string) $item['satuan'] : '-',
                    'nilai_rujukan' => isset($item['nilai_rujukan']) ? (string) $item['nilai_rujukan'] : '-',
                    'keterangan' => isset($item['keterangan']) ? (string) $item['keterangan'] : '-',
                ];
            }, $hasilPemeriksaan);

            // Generate QR Code untuk tanda tangan elektronik petugas lab
            $qrCodePetugasData = $this->generateQrCodePetugasData($permintaanLabData, $periksaLabData, $settingData);
            $qrCodePetugasSvg = QrCode::size(100)
                ->errorCorrection('H')
                ->generate($qrCodePetugasData);

            // Generate QR Code untuk tanda tangan elektronik dokter penanggung jawab
            $qrCodeDokterData = $this->generateQrCodeDokterData($permintaanLabData, $periksaLabData, $settingData);
            $qrCodeDokterSvg = QrCode::size(100)
                ->errorCorrection('H')
                ->generate($qrCodeDokterData);

            // Generate PDF menggunakan dompdf
            $pdf = Pdf::loadView('laboratorium.cetak', [
                'permintaanLab' => $permintaanLabData,
                'periksaLab' => $periksaLabData,
                'hasilPemeriksaan' => $hasilPemeriksaanClean,
                'setting' => $settingData,
                'qrCodePetugasSvg' => $qrCodePetugasSvg,
                'qrCodeDokterSvg' => $qrCodeDokterSvg,
            ]);

            // Set options untuk PDF
            $pdf->setPaper('a4', 'portrait');
            $pdf->setOption('enable-local-file-access', true);
            $pdf->setOption('isHtml5ParserEnabled', true);
            $pdf->setOption('isRemoteEnabled', false);

            // Download PDF dengan nama file yang sesuai
            $filename = 'Hasil_Lab_'.$permintaanLab->noorder.'_'.date('YmdHis').'.pdf';

            return $pdf->download($filename);
        } catch (\Exception $e) {
            Log::error('PermintaanLabController cetak error: '.$e->getMessage(), [
                'noorder' => $noorder,
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors([
                'error' => 'Gagal menghasilkan PDF: '.$e->getMessage(),
            ]);
        }
    }

    /**
     * Generate data untuk QR Code tanda tangan elektronik petugas lab
     */
    private function generateQrCodePetugasData(array $permintaanLabData, ?array $periksaLabData, ?array $settingData): string
    {
        // Ambil nama petugas lab
        $petugasNama = $periksaLabData['petugas']['nama'] ?? '-';

        // Ambil NIP petugas dari periksaLab->petugas->nik
        $petugasNip = $periksaLabData['petugas']['nik'] ?? '-';

        // Ambil tanggal dan jam hasil
        $tglHasil = $permintaanLabData['tgl_hasil'] ?? null;
        $jamHasil = $permintaanLabData['jam_hasil'] ?? null;

        // Format tanggal dan jam
        $tanggalFormatted = '-';
        $jamFormatted = '-';

        if ($tglHasil && $tglHasil !== '0000-00-00') {
            try {
                $tanggalFormatted = \Carbon\Carbon::parse($tglHasil)->locale('id')->isoFormat('D MMMM YYYY');
            } catch (\Exception $e) {
                $tanggalFormatted = $tglHasil;
            }
        }

        if ($jamHasil && $jamHasil !== '00:00:00') {
            $jamFormatted = substr($jamHasil, 0, 5);
        }

        // Ambil nama instansi
        $namaInstansi = $settingData['nama_instansi'] ?? 'Rumah Sakit';

        // Format pesan tanda tangan elektronik petugas
        $pesan = sprintf(
            'Dokumen ini telah ditandatangani secara elektronik oleh %s %s pada tanggal %s %s di %s',
            $petugasNama,
            $petugasNip,
            $tanggalFormatted,
            $jamFormatted,
            $namaInstansi
        );

        return $pesan;
    }

    /**
     * Generate data untuk QR Code tanda tangan elektronik dokter penanggung jawab
     */
    private function generateQrCodeDokterData(array $permintaanLabData, ?array $periksaLabData, ?array $settingData): string
    {
        // Ambil nama dokter penanggung jawab atau dokter perujuk
        $dokterNama = $periksaLabData['dokterPj']['nm_dokter']
            ?? $permintaanLabData['dokter']['nm_dokter']
            ?? '-';

        // Ambil kode dokter
        $dokterKode = $periksaLabData['dokterPj']['kd_dokter']
            ?? $permintaanLabData['dokter']['kd_dokter']
            ?? '-';

        // Ambil tanggal dan jam hasil
        $tglHasil = $permintaanLabData['tgl_hasil'] ?? null;
        $jamHasil = $permintaanLabData['jam_hasil'] ?? null;

        // Format tanggal dan jam
        $tanggalFormatted = '-';
        $jamFormatted = '-';

        if ($tglHasil && $tglHasil !== '0000-00-00') {
            try {
                $tanggalFormatted = \Carbon\Carbon::parse($tglHasil)->locale('id')->isoFormat('D MMMM YYYY');
            } catch (\Exception $e) {
                $tanggalFormatted = $tglHasil;
            }
        }

        if ($jamHasil && $jamHasil !== '00:00:00') {
            $jamFormatted = substr($jamHasil, 0, 5);
        }

        // Ambil nama instansi
        $namaInstansi = $settingData['nama_instansi'] ?? 'Rumah Sakit';

        // Format pesan tanda tangan elektronik dokter
        $pesan = sprintf(
            'Dokumen ini telah ditandatangani secara elektronik oleh %s %s pada tanggal %s %s di %s',
            $dokterNama,
            $dokterKode,
            $tanggalFormatted,
            $jamFormatted,
            $namaInstansi
        );

        return $pesan;
    }
}
