<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\RegPeriksa;
use App\Services\Akutansi\JurnalPostingService;
use Inertia\Inertia;

class RawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $status = (string) $request->query('status', '');
        $sort = (string) $request->query('sort', 'terbaru');
        $sttsPulang = (string) $request->query('stts_pulang', '-');
        $kdBangsal = trim((string) $request->query('kd_bangsal', ''));
        $perPage = (int) ($request->query('per_page', 12));

        $kiLatest = DB::table('kamar_inap as ki')
            ->select([
                'ki.no_rawat',
                DB::raw('max(concat(ki.tgl_masuk," ",ki.jam_masuk)) as masuk_dt'),
            ])
            ->groupBy('ki.no_rawat');

        $query = RegPeriksa::query()
            ->with([
                'patient:no_rkm_medis,nm_pasien',
                'dokter:kd_dokter,nm_dokter',
            ])
            ->joinSub($kiLatest, 'kil', function ($join) {
                $join->on('kil.no_rawat', '=', 'reg_periksa.no_rawat');
            })
            ->join('kamar_inap', function ($join) {
                $join->on('kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                    ->on(DB::raw('concat(kamar_inap.tgl_masuk," ",kamar_inap.jam_masuk)'), '=', DB::raw('kil.masuk_dt'));
            })
            ->leftJoin('kamar as km', function ($join) {
                $join->on(DB::raw('trim(km.kd_kamar)'), '=', DB::raw('trim(kamar_inap.kd_kamar)'));
            })
            ->leftJoin('bangsal', 'bangsal.kd_bangsal', '=', 'km.kd_bangsal')
            ->leftJoin('ranap_gabung as rg', 'rg.no_rawat', '=', 'reg_periksa.no_rawat')
            ->leftJoin('ranap_gabung as rg2', 'rg2.no_rawat2', '=', 'reg_periksa.no_rawat')
            ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
            ->where('reg_periksa.status_lanjut', 'Ranap')
            ->select([
                'reg_periksa.*',
                DB::raw('kamar_inap.kd_kamar as kamar'),
                DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                'kamar_inap.trf_kamar',
                'kamar_inap.diagnosa_awal',
                'kamar_inap.diagnosa_akhir',
                'kamar_inap.tgl_masuk',
                'kamar_inap.jam_masuk',
                'kamar_inap.tgl_keluar',
                'kamar_inap.jam_keluar',
                'kamar_inap.lama',
                'kamar_inap.ttl_biaya',
                'kamar_inap.stts_pulang',
                DB::raw('case when rg.no_rawat2 is not null then "Ibu" when rg2.no_rawat is not null then "Bayi" else null end as gabung_role'),
                DB::raw('coalesce(rg.no_rawat2, rg2.no_rawat) as gabung_pair_rawat'),
            ]);

        if ($search !== '') {
            $like = "%$search%";
            $query->where(function ($w) use ($like) {
                $w->where('reg_periksa.no_rawat', 'like', $like)
                    ->orWhere('reg_periksa.no_rkm_medis', 'like', $like)
                    ->orWhere('pasien.nm_pasien', 'like', $like)
                    ->orWhere('kamar_inap.kd_kamar', 'like', $like);
            });
        }

        if ($status !== '') {
            switch ($status) {
                case 'Pulang':
                    $query->whereNotNull('kamar_inap.tgl_keluar');
                    break;
                case 'Dirujuk':
                    $query->where('kamar_inap.stts_pulang', 'Rujuk');
                    break;
                case 'Menunggu':
                case 'Dirawat':
                    $query->whereNull('kamar_inap.tgl_keluar');
                    break;
            }
        }

        if ($sttsPulang !== '') {
            $query->where('kamar_inap.stts_pulang', $sttsPulang);
        }

        if ($kdBangsal !== '') {
            $query->whereRaw('trim(km.kd_bangsal) = ?', [$kdBangsal]);
        }

        switch ($sort) {
            case 'terlama':
                $query->orderBy('reg_periksa.tgl_registrasi')->orderBy('reg_periksa.jam_reg');
                break;
            case 'nama':
                $query->orderBy('pasien.nm_pasien');
                break;
            default:
                $query->orderByDesc('reg_periksa.tgl_registrasi')->orderByDesc('reg_periksa.jam_reg');
                break;
        }

        $rawatInap = $query->paginate($perPage)->withQueryString();

        $sttsPulangOptions = DB::table('kamar_inap')
            ->select('stts_pulang')
            ->distinct()
            ->orderBy('stts_pulang')
            ->pluck('stts_pulang')
            ->filter(function ($v) {
                return $v !== null && $v !== '';
            })
            ->values();

        $bangsalOptions = DB::table('kamar as km')
            ->join('bangsal as b', 'b.kd_bangsal', '=', 'km.kd_bangsal')
            ->where('km.statusdata', '1')
            ->whereNotNull('km.kd_bangsal')
            ->where('km.kd_bangsal', '!=', '')
            ->where('km.kd_bangsal', '!=', '-')
            ->select([
                DB::raw('trim(km.kd_bangsal) as kd_bangsal'),
                'b.nm_bangsal',
            ])
            ->distinct()
            ->orderBy('b.nm_bangsal')
            ->get();

        return Inertia::render('RawatInap/Index', [
            'title' => 'Data Rawat Inap',
            'rawatInap' => $rawatInap,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'sort' => $sort,
                'stts_pulang' => $sttsPulang,
                'kd_bangsal' => $kdBangsal,
            ],
            'sttsPulangOptions' => $sttsPulangOptions,
            'bangsalOptions' => $bangsalOptions,
        ]);
    }

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RawatInap/Create', [
            'title' => 'Tambah Data Rawat Inap',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing rawat inap data
        return redirect()->route('rawat-inap.index')
            ->with('success', 'Data rawat inap berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('RawatInap/Show', [
            'title' => 'Detail Rawat Inap',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('RawatInap/Edit', [
            'title' => 'Edit Data Rawat Inap',
        ]);
    }

    public function lanjutan(Request $request)
    {
        $token = $request->query('t');
        if ($token) {
            $padded = str_replace(['-', '_'], ['+', '/'], $token);
            $paddingNeeded = 4 - (strlen($padded) % 4);
            if ($paddingNeeded < 4) {
                $padded .= str_repeat('=', $paddingNeeded);
            }
            $decoded = json_decode(base64_decode($padded), true);
            $noRawat = $decoded['no_rawat'] ?? null;
            $noRkmMedis = $decoded['no_rkm_medis'] ?? null;
        } else {
            $noRawat = $request->query('no_rawat');
            $noRkmMedis = $request->query('no_rkm_medis');
        }

        $rawat = null;
        if ($noRawat) {
            $kiLatest = DB::table('kamar_inap as ki')
                ->select([
                    'ki.no_rawat',
                    DB::raw('max(concat(ki.tgl_masuk," ",ki.jam_masuk)) as masuk_dt'),
                ])
                ->where('ki.no_rawat', $noRawat)
                ->groupBy('ki.no_rawat');

            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->joinSub($kiLatest, 'kil', function ($join) {
                    $join->on('kil.no_rawat', '=', 'reg_periksa.no_rawat');
                })
                ->join('kamar_inap', function ($join) {
                    $join->on('kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                        ->on(DB::raw('concat(kamar_inap.tgl_masuk," ",kamar_inap.jam_masuk)'), '=', DB::raw('kil.masuk_dt'));
                })
                ->leftJoin('kamar', 'kamar.kd_kamar', '=', 'kamar_inap.kd_kamar')
                ->leftJoin('bangsal', 'bangsal.kd_bangsal', '=', 'kamar.kd_bangsal')
                ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
                ->select([
                    'reg_periksa.*',
                    DB::raw('kamar_inap.kd_kamar as kamar'),
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.jam_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.jam_keluar',
                    'kamar_inap.stts_pulang',
                    DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                ])
                ->when($noRkmMedis, fn ($q) => $q->where('reg_periksa.no_rkm_medis', $noRkmMedis))
                ->where('reg_periksa.no_rawat', $noRawat)
                ->first();
        } elseif ($noRkmMedis) {
            $kiLatest = DB::table('kamar_inap as ki')
                ->select([
                    'ki.no_rawat',
                    DB::raw('max(concat(ki.tgl_masuk," ",ki.jam_masuk)) as masuk_dt'),
                ])
                ->groupBy('ki.no_rawat');

            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->joinSub($kiLatest, 'kil', function ($join) {
                    $join->on('kil.no_rawat', '=', 'reg_periksa.no_rawat');
                })
                ->join('kamar_inap', function ($join) {
                    $join->on('kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                        ->on(DB::raw('concat(kamar_inap.tgl_masuk," ",kamar_inap.jam_masuk)'), '=', DB::raw('kil.masuk_dt'));
                })
                ->leftJoin('kamar', 'kamar.kd_kamar', '=', 'kamar_inap.kd_kamar')
                ->leftJoin('bangsal', 'bangsal.kd_bangsal', '=', 'kamar.kd_bangsal')
                ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
                ->where('reg_periksa.status_lanjut', 'Ranap')
                ->select([
                    'reg_periksa.*',
                    DB::raw('kamar_inap.kd_kamar as kamar'),
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.jam_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.jam_keluar',
                    'kamar_inap.stts_pulang',
                    DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                ])
                ->where('reg_periksa.no_rkm_medis', $noRkmMedis)
                ->orderByDesc('reg_periksa.tgl_registrasi')
                ->orderByDesc('reg_periksa.jam_reg')
                ->first();
        }

        return Inertia::render('RawatInap/Lanjutan', [
            'rawatInap' => $rawat,
            'params' => [
                'no_rawat' => $noRawat,
                'no_rkm_medis' => $noRkmMedis,
                'tab' => $request->query('tab'),
            ],
        ]);
    }

    public function canvas(Request $request)
    {
        $token = $request->query('t');
        if ($token) {
            $padded = str_replace(['-', '_'], ['+', '/'], $token);
            $paddingNeeded = 4 - (strlen($padded) % 4);
            if ($paddingNeeded < 4) {
                $padded .= str_repeat('=', $paddingNeeded);
            }
            $decoded = json_decode(base64_decode($padded), true);
            $noRawat = $decoded['no_rawat'] ?? null;
            $noRkmMedis = $decoded['no_rkm_medis'] ?? null;
        } else {
            $noRawat = $request->query('no_rawat');
            $noRkmMedis = $request->query('no_rkm_medis');
        }

        $rawat = null;
        if ($noRawat) {
            $kiLatest = DB::table('kamar_inap as ki')
                ->select([
                    'ki.no_rawat',
                    DB::raw('max(concat(ki.tgl_masuk," ",ki.jam_masuk)) as masuk_dt'),
                ])
                ->where('ki.no_rawat', $noRawat)
                ->groupBy('ki.no_rawat');

            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->joinSub($kiLatest, 'kil', function ($join) {
                    $join->on('kil.no_rawat', '=', 'reg_periksa.no_rawat');
                })
                ->join('kamar_inap', function ($join) {
                    $join->on('kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                        ->on(DB::raw('concat(kamar_inap.tgl_masuk," ",kamar_inap.jam_masuk)'), '=', DB::raw('kil.masuk_dt'));
                })
                ->leftJoin('kamar', 'kamar.kd_kamar', '=', 'kamar_inap.kd_kamar')
                ->leftJoin('bangsal', 'bangsal.kd_bangsal', '=', 'kamar.kd_bangsal')
                ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
                ->leftJoin('penjab', 'penjab.kd_pj', '=', 'reg_periksa.kd_pj')
                ->select([
                    'reg_periksa.*',
                    DB::raw('kamar_inap.kd_kamar as kamar'),
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.jam_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.jam_keluar',
                    'kamar_inap.stts_pulang',
                    DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                    DB::raw('penjab.png_jawab as nm_penjamin'),
                ])
                ->when($noRkmMedis, fn ($q) => $q->where('reg_periksa.no_rkm_medis', $noRkmMedis))
                ->where('reg_periksa.no_rawat', $noRawat)
                ->first();
        } elseif ($noRkmMedis) {
            $kiLatest = DB::table('kamar_inap as ki')
                ->select([
                    'ki.no_rawat',
                    DB::raw('max(concat(ki.tgl_masuk," ",ki.jam_masuk)) as masuk_dt'),
                ])
                ->groupBy('ki.no_rawat');

            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->joinSub($kiLatest, 'kil', function ($join) {
                    $join->on('kil.no_rawat', '=', 'reg_periksa.no_rawat');
                })
                ->join('kamar_inap', function ($join) {
                    $join->on('kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                        ->on(DB::raw('concat(kamar_inap.tgl_masuk," ",kamar_inap.jam_masuk)'), '=', DB::raw('kil.masuk_dt'));
                })
                ->leftJoin('kamar', 'kamar.kd_kamar', '=', 'kamar_inap.kd_kamar')
                ->leftJoin('bangsal', 'bangsal.kd_bangsal', '=', 'kamar.kd_bangsal')
                ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
                ->leftJoin('penjab', 'penjab.kd_pj', '=', 'reg_periksa.kd_pj')
                ->where('reg_periksa.status_lanjut', 'Ranap')
                ->select([
                    'reg_periksa.*',
                    DB::raw('kamar_inap.kd_kamar as kamar'),
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.jam_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.jam_keluar',
                    'kamar_inap.stts_pulang',
                    DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                    DB::raw('penjab.png_jawab as nm_penjamin'),
                ])
                ->where('reg_periksa.no_rkm_medis', $noRkmMedis)
                ->orderByDesc('reg_periksa.tgl_registrasi')
                ->orderByDesc('reg_periksa.jam_reg')
                ->first();
        }

        $patient = null;
        if ($rawat) {
            $patient = [
                'nm_pasien' => optional($rawat->patient)->nm_pasien,
                'no_rkm_medis' => $rawat->no_rkm_medis,
                'tgl_lahir' => optional($rawat->patient)->tgl_lahir,
                'jk' => optional($rawat->patient)->jk,
                'gol_darah' => optional($rawat->patient)->gol_darah,
                'no_ktp' => optional($rawat->patient)->no_ktp,
                'no_peserta' => optional($rawat->patient)->no_peserta,
                'alamat' => optional($rawat->patient)->alamat,
                'nm_bangsal' => $rawat->nm_bangsal ?? null,
                'nm_dokter' => optional($rawat->dokter)->nm_dokter,
                'png_jawab' => $rawat->nm_penjamin ?? null,
            ];
        }

        return Inertia::render('RawatInap/CanvasRanap', [
            'patient' => $patient,
            'no_rawat' => $rawat ? $rawat->no_rawat : $noRawat,
            'tab' => $request->query('tab'),
        ]);
    }

    /**
     * Daftar pemeriksaan_ranap untuk no_rawat tertentu (JSON)
     */
    public function pemeriksaanRanap(Request $request)
    {
        $token = $request->query('t');
        $noRawat = $request->query('no_rawat');
        if ($token) {
            $padded = str_replace(['-', '_'], ['+', '/'], $token);
            $paddingNeeded = 4 - (strlen($padded) % 4);
            if ($paddingNeeded < 4) {
                $padded .= str_repeat('=', $paddingNeeded);
            }
            $decoded = json_decode(base64_decode($padded), true);
            $noRawat = $decoded['no_rawat'] ?? $noRawat;
        }

        if (! $noRawat) {
            return response()->json(['data' => []]);
        }

        $rows = DB::table('pemeriksaan_ranap as pr')
            ->leftJoin('pegawai as pg', function ($join) {
                $join->on(DB::raw('trim(pg.nik)'), '=', DB::raw('trim(pr.nip)'));
            })
            ->where('pr.no_rawat', $noRawat)
            ->orderByDesc('pr.tgl_perawatan')
            ->orderByDesc('pr.jam_rawat')
            ->get([
                'pr.no_rawat',
                'pr.tgl_perawatan',
                'pr.jam_rawat',
                'pr.suhu_tubuh',
                'pr.tensi',
                'pr.nadi',
                'pr.respirasi',
                'pr.tinggi',
                'pr.berat',
                'pr.spo2',
                'pr.gcs',
                'pr.kesadaran',
                'pr.keluhan',
                'pr.pemeriksaan',
                'pr.alergi',
                'pr.rtl',
                'pr.penilaian',
                'pr.instruksi',
                'pr.evaluasi',
                'pr.nip',
                DB::raw('pg.nama as nama_petugas'),
            ]);

        return response()->json(['data' => $rows]);
    }

    /**
     * Simpan pemeriksaan_ranap
     */
    public function storePemeriksaanRanap(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|date_format:H:i',
            'suhu_tubuh' => 'nullable|string|max:5',
            'tensi' => 'required|string|max:8',
            'nadi' => 'nullable|string|max:3',
            'respirasi' => 'nullable|string|max:3',
            'tinggi' => 'nullable|string|max:5',
            'berat' => 'nullable|string|max:5',
            'spo2' => 'required|string|max:3',
            'gcs' => 'nullable|string|max:10',
            'kesadaran' => 'required|in:Compos Mentis,Somnolence,Sopor,Coma,Alert,Confusion,Voice,Pain,Unresponsive,Apatis,Delirium',
            'keluhan' => 'nullable|string|max:2000',
            'pemeriksaan' => 'nullable|string|max:2000',
            'alergi' => 'nullable|string|max:80',
            'rtl' => 'required|string|max:2000',
            'penilaian' => 'required|string|max:2000',
            'instruksi' => 'required|string|max:2000',
            'evaluasi' => 'required|string|max:2000',
            'nip' => 'required|string|max:20',
            'alergi_pasien' => 'nullable|array',
            'alergi_pasien.no_rkm_medis' => 'required_with:alergi_pasien|string|max:15',
            'alergi_pasien.kode_jenis' => 'required_with:alergi_pasien|integer',
            'alergi_pasien.kd_alergi' => 'required_with:alergi_pasien|string|max:5',
        ]);

        $validated['jam_rawat'] = sprintf('%s:00', $validated['jam_rawat']);

        $alergiPasien = $validated['alergi_pasien'] ?? null;
        unset($validated['alergi_pasien']);

        DB::table('pemeriksaan_ranap')->insert($validated);

        try {
            $regPeriksa = DB::table('reg_periksa')
                ->where('no_rawat', $validated['no_rawat'])
                ->first();

            if ($regPeriksa) {
                DB::table('reg_periksa')
                    ->where('no_rawat', $validated['no_rawat'])
                    ->update(['stts' => 'Sudah']);
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal update status reg_periksa setelah simpan pemeriksaan ranap', [
                'no_rawat' => $validated['no_rawat'],
                'error' => $e->getMessage(),
            ]);
        }

        if (isset($alergiPasien) && is_array($alergiPasien)) {
            $alergiData = $alergiPasien;
            $noRM = $alergiData['no_rkm_medis'] ?? null;
            $kodeJenis = $alergiData['kode_jenis'] ?? null;
            $kdAlergi = trim((string) ($alergiData['kd_alergi'] ?? ''));

            if ($noRM && $kodeJenis && $kdAlergi !== '' && $kdAlergi !== '-') {
                try {
                    DB::table('alergi_pasien')->updateOrInsert(
                        [
                            'no_rkm_medis' => $noRM,
                            'kd_alergi' => $kdAlergi,
                        ],
                        [
                            'kode_jenis' => $kodeJenis,
                        ]
                    );
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::error('Gagal menyimpan alergi_pasien (ranap)', [
                        'no_rkm_medis' => $noRM,
                        'kode_jenis' => $kodeJenis,
                        'kd_alergi' => $kdAlergi,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        }

        try {
            \App\Jobs\SatuSehat\ProcessVitalSignsJob::dispatch(
                $validated['no_rawat'],
                $validated['tgl_perawatan'],
                $validated['jam_rawat']
            )->afterResponse();
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal dispatch Vital Signs job ke SATU SEHAT (ranap)', [
                'no_rawat' => $validated['no_rawat'],
                'error' => $e->getMessage(),
            ]);
        }

        try {
            if (isset($alergiPasien)) {
                \App\Jobs\SatuSehat\ProcessAllergyIntoleranceJob::dispatch(
                    $validated['no_rawat']
                )->afterResponse();
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal dispatch AllergyIntolerance job ke SATU SEHAT (ranap)', [
                'no_rawat' => $validated['no_rawat'],
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json(['message' => 'Pemeriksaan tersimpan']);
    }

    /**
     * Hapus pemeriksaan_ranap berdasarkan kunci komposit
     */
    public function deletePemeriksaanRanap(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|date_format:H:i:s',
        ]);

        $deleted = DB::table('pemeriksaan_ranap')
            ->where('no_rawat', $validated['no_rawat'])
            ->where('tgl_perawatan', $validated['tgl_perawatan'])
            ->where('jam_rawat', $validated['jam_rawat'])
            ->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json(['message' => 'Pemeriksaan dihapus']);
    }

    /**
     * Update pemeriksaan_ranap berdasarkan kunci komposit
     */
    public function updatePemeriksaanRanap(Request $request)
    {
        $validated = $request->validate([
            'key.no_rawat' => 'required|string|max:17',
            'key.tgl_perawatan' => 'required|date',
            'key.jam_rawat' => 'required|date_format:H:i:s',
            'suhu_tubuh' => 'nullable|string|max:5',
            'tensi' => 'required|string|max:8',
            'nadi' => 'nullable|string|max:3',
            'respirasi' => 'nullable|string|max:3',
            'tinggi' => 'nullable|string|max:5',
            'berat' => 'nullable|string|max:5',
            'spo2' => 'required|string|max:3',
            'gcs' => 'nullable|string|max:10',
            'kesadaran' => 'required|in:Compos Mentis,Somnolence,Sopor,Coma,Alert,Confusion,Voice,Pain,Unresponsive,Apatis,Delirium',
            'keluhan' => 'nullable|string|max:2000',
            'pemeriksaan' => 'nullable|string|max:2000',
            'alergi' => 'nullable|string|max:80',
            'rtl' => 'required|string|max:2000',
            'penilaian' => 'required|string|max:2000',
            'instruksi' => 'required|string|max:2000',
            'evaluasi' => 'required|string|max:2000',
            'nip' => 'required|string|max:20',
            'alergi_pasien' => 'nullable|array',
            'alergi_pasien.no_rkm_medis' => 'required_with:alergi_pasien|string|max:15',
            'alergi_pasien.kode_jenis' => 'required_with:alergi_pasien|integer',
            'alergi_pasien.kd_alergi' => 'required_with:alergi_pasien|string|max:5',
        ]);

        $key = $validated['key'];
        $data = $request->only(['suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'tinggi', 'berat', 'spo2', 'gcs', 'kesadaran', 'keluhan', 'pemeriksaan', 'alergi', 'rtl', 'penilaian', 'instruksi', 'evaluasi', 'nip']);

        $updated = DB::table('pemeriksaan_ranap')
            ->where('no_rawat', $key['no_rawat'])
            ->where('tgl_perawatan', $key['tgl_perawatan'])
            ->where('jam_rawat', $key['jam_rawat'])
            ->update($data);

        if ($updated === 0) {
            return response()->json(['message' => 'Data tidak ditemukan atau tidak berubah'], 404);
        }

        try {
            DB::table('reg_periksa')
                ->where('no_rawat', $key['no_rawat'])
                ->update(['stts' => 'Sudah']);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal update status reg_periksa setelah update pemeriksaan ranap', [
                'no_rawat' => $key['no_rawat'],
                'error' => $e->getMessage(),
            ]);
        }

        if (isset($validated['alergi_pasien']) && is_array($validated['alergi_pasien'])) {
            $alergiData = $validated['alergi_pasien'];
            $noRM = $alergiData['no_rkm_medis'] ?? null;
            $kodeJenis = $alergiData['kode_jenis'] ?? null;
            $kdAlergi = trim((string) ($alergiData['kd_alergi'] ?? ''));

            if ($noRM && $kodeJenis && $kdAlergi !== '' && $kdAlergi !== '-') {
                try {
                    DB::table('alergi_pasien')->updateOrInsert(
                        [
                            'no_rkm_medis' => $noRM,
                            'kd_alergi' => $kdAlergi,
                        ],
                        [
                            'kode_jenis' => $kodeJenis,
                        ]
                    );
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::error('Gagal menyimpan alergi_pasien setelah update pemeriksaan (ranap)', [
                        'no_rkm_medis' => $noRM,
                        'kode_jenis' => $kodeJenis,
                        'kd_alergi' => $kdAlergi,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        }

        try {
            \App\Jobs\SatuSehat\ProcessVitalSignsJob::dispatch(
                $key['no_rawat'],
                $key['tgl_perawatan'],
                $key['jam_rawat']
            )->afterResponse();
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal dispatch Vital Signs job update ke SATU SEHAT (ranap)', [
                'no_rawat' => $key['no_rawat'],
                'error' => $e->getMessage(),
            ]);
        }

        try {
            if (isset($validated['alergi_pasien'])) {
                \App\Jobs\SatuSehat\ProcessAllergyIntoleranceJob::dispatch(
                    $key['no_rawat']
                )->afterResponse();
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal dispatch AllergyIntolerance job ke SATU SEHAT (ranap)', [
                'no_rawat' => $key['no_rawat'],
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json(['message' => 'Pemeriksaan diperbarui']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Implementation for updating rawat inap data
        return redirect()->route('rawat-inap.index')
            ->with('success', 'Data rawat inap berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Implementation for deleting rawat inap data
        return redirect()->route('rawat-inap.index')
            ->with('success', 'Data rawat inap berhasil dihapus.');
    }

    /**
     * Get jenis tindakan berdasarkan jenis penanganan
     */
    public function getJenisTindakan(Request $request)
    {
        $jenis = $request->query('jenis', 'dokter'); // dokter | perawat | dokter-perawat

        $query = DB::table('jns_perawatan_inap');

        if ($jenis === 'dokter') {
            $query->select([
                'kd_jenis_prw',
                'nm_perawatan',
                'total_byrdr',
                'tarif_tindakandr',
                'kso',
                'material',
                'bhp',
                'menejemen'
            ])->where('total_byrdr', '>', 0);
        } elseif ($jenis === 'perawat') {
            $query->select([
                'kd_jenis_prw',
                'nm_perawatan',
                'total_byrpr',
                'tarif_tindakanpr',
                'kso',
                'material',
                'bhp',
                'menejemen'
            ])->where('total_byrpr', '>', 0);
        } else { // dokter-perawat
            $query->select([
                'kd_jenis_prw',
                'nm_perawatan',
                'total_byrdrpr',
                'tarif_tindakandr',
                'tarif_tindakanpr',
                'kso',
                'material',
                'bhp',
                'menejemen'
            ])->where('total_byrdrpr', '>', 0);
        }

        $tindakan = $query->where('status', '1')
            ->orderBy('nm_perawatan')
            ->get();

        return response()->json($tindakan);
    }

    /**
     * Cek status billing verifikasi
     */
    public function cekBillingStatus($noRawat)
    {
        $verified = DB::table('reg_periksa')
            ->where('no_rawat', $noRawat)
            ->where('stts_daftar', 'Berkas Diterima')
            ->exists();

        return response()->json(['verified' => $verified]);
    }

    /**
     * Store tindakan dokter
     */
    public function storeTindakanDokter(Request $request, JurnalPostingService $postingService)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'kd_dokter' => 'required|string|max:20',
            'tindakan' => 'required|array|min:1',
            'tindakan.*.kd_jenis_prw' => 'required|string|max:15',
            'tindakan.*.quantity' => 'required|integer|min:1',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|date_format:H:i:s',
        ]);

        // Cek billing status
        $verified = DB::table('reg_periksa')
            ->where('no_rawat', $validated['no_rawat'])
            ->where('stts_daftar', 'Berkas Diterima')
            ->exists();

        if ($verified) {
            return response()->json([
                'message' => 'Data billing sudah terverifikasi. Silahkan hubungi bagian kasir/keuangan!'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $totals = [
                'biaya' => 0.0,
                'bhp' => 0.0,
                'kso' => 0.0,
                'manajemen' => 0.0,
                'dr' => 0.0,
                'pr' => 0.0,
                'sarana' => 0.0,
            ];

            foreach ($validated['tindakan'] as $tindakan) {
                $jenisTindakan = DB::table('jns_perawatan_inap')
                    ->where('kd_jenis_prw', $tindakan['kd_jenis_prw'])
                    ->first();

                if (!$jenisTindakan) {
                    continue;
                }

                for ($i = 0; $i < $tindakan['quantity']; $i++) {
                    $totals['biaya'] += (float) ($jenisTindakan->total_byrdr ?? 0);
                    $totals['bhp'] += (float) ($jenisTindakan->bhp ?? 0);
                    $totals['kso'] += (float) ($jenisTindakan->kso ?? 0);
                    $totals['manajemen'] += (float) ($jenisTindakan->menejemen ?? 0);
                    $totals['dr'] += (float) ($jenisTindakan->tarif_tindakandr ?? 0);
                    $totals['sarana'] += (float) ($jenisTindakan->material ?? 0);

                    DB::table('rawat_inap_dr')->insert([
                        'no_rawat' => $validated['no_rawat'],
                        'kd_jenis_prw' => $tindakan['kd_jenis_prw'],
                        'kd_dokter' => $validated['kd_dokter'],
                        'tgl_perawatan' => $validated['tgl_perawatan'],
                        'jam_rawat' => $validated['jam_rawat'],
                        'material' => $jenisTindakan->material ?? 0,
                        'bhp' => $jenisTindakan->bhp ?? 0,
                        'tarif_tindakandr' => $jenisTindakan->tarif_tindakandr ?? 0,
                        'kso' => $jenisTindakan->kso ?? 0,
                        'menejemen' => $jenisTindakan->menejemen ?? 0,
                        'biaya_rawat' => $jenisTindakan->total_byrdr ?? 0,
                    ]);
                }
            }

            $posted = $this->postJurnalTindakanRanap(
                $postingService,
                $validated['no_rawat'],
                $validated['tgl_perawatan'],
                $totals
            );

            DB::commit();
            return response()->json([
                'message' => 'Tindakan berhasil disimpan',
                'no_jurnal' => $posted['no_jurnal'] ?? null,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menyimpan tindakan: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store tindakan perawat
     */
    public function storeTindakanPerawat(Request $request, JurnalPostingService $postingService)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'nip' => 'required|string|max:20',
            'tindakan' => 'required|array|min:1',
            'tindakan.*.kd_jenis_prw' => 'required|string|max:15',
            'tindakan.*.quantity' => 'required|integer|min:1',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|date_format:H:i:s',
        ]);

        // Cek billing status
        $verified = DB::table('reg_periksa')
            ->where('no_rawat', $validated['no_rawat'])
            ->where('stts_daftar', 'Berkas Diterima')
            ->exists();

        if ($verified) {
            return response()->json([
                'message' => 'Data billing sudah terverifikasi. Silahkan hubungi bagian kasir/keuangan!'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $totals = [
                'biaya' => 0.0,
                'bhp' => 0.0,
                'kso' => 0.0,
                'manajemen' => 0.0,
                'dr' => 0.0,
                'pr' => 0.0,
                'sarana' => 0.0,
            ];

            foreach ($validated['tindakan'] as $tindakan) {
                $jenisTindakan = DB::table('jns_perawatan_inap')
                    ->where('kd_jenis_prw', $tindakan['kd_jenis_prw'])
                    ->first();

                if (!$jenisTindakan) {
                    continue;
                }

                for ($i = 0; $i < $tindakan['quantity']; $i++) {
                    $totals['biaya'] += (float) ($jenisTindakan->total_byrpr ?? 0);
                    $totals['bhp'] += (float) ($jenisTindakan->bhp ?? 0);
                    $totals['kso'] += (float) ($jenisTindakan->kso ?? 0);
                    $totals['manajemen'] += (float) ($jenisTindakan->menejemen ?? 0);
                    $totals['pr'] += (float) ($jenisTindakan->tarif_tindakanpr ?? 0);
                    $totals['sarana'] += (float) ($jenisTindakan->material ?? 0);

                    DB::table('rawat_inap_pr')->insert([
                        'no_rawat' => $validated['no_rawat'],
                        'kd_jenis_prw' => $tindakan['kd_jenis_prw'],
                        'nip' => $validated['nip'],
                        'tgl_perawatan' => $validated['tgl_perawatan'],
                        'jam_rawat' => $validated['jam_rawat'],
                        'material' => $jenisTindakan->material ?? 0,
                        'bhp' => $jenisTindakan->bhp ?? 0,
                        'tarif_tindakanpr' => $jenisTindakan->tarif_tindakanpr ?? 0,
                        'kso' => $jenisTindakan->kso ?? 0,
                        'menejemen' => $jenisTindakan->menejemen ?? 0,
                        'biaya_rawat' => $jenisTindakan->total_byrpr ?? 0,
                    ]);
                }
            }

            $posted = $this->postJurnalTindakanRanap(
                $postingService,
                $validated['no_rawat'],
                $validated['tgl_perawatan'],
                $totals
            );

            DB::commit();
            return response()->json([
                'message' => 'Tindakan berhasil disimpan',
                'no_jurnal' => $posted['no_jurnal'] ?? null,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menyimpan tindakan: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store tindakan dokter + perawat
     */
    public function storeTindakanDokterPerawat(Request $request, JurnalPostingService $postingService)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'kd_dokter' => 'required|string|max:20',
            'nip' => 'required|string|max:20',
            'tindakan' => 'required|array|min:1',
            'tindakan.*.kd_jenis_prw' => 'required|string|max:15',
            'tindakan.*.quantity' => 'required|integer|min:1',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|date_format:H:i:s',
        ]);

        // Cek billing status
        $verified = DB::table('reg_periksa')
            ->where('no_rawat', $validated['no_rawat'])
            ->where('stts_daftar', 'Berkas Diterima')
            ->exists();

        if ($verified) {
            return response()->json([
                'message' => 'Data billing sudah terverifikasi. Silahkan hubungi bagian kasir/keuangan!'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $totals = [
                'biaya' => 0.0,
                'bhp' => 0.0,
                'kso' => 0.0,
                'manajemen' => 0.0,
                'dr' => 0.0,
                'pr' => 0.0,
                'sarana' => 0.0,
            ];

            foreach ($validated['tindakan'] as $tindakan) {
                $jenisTindakan = DB::table('jns_perawatan_inap')
                    ->where('kd_jenis_prw', $tindakan['kd_jenis_prw'])
                    ->first();

                if (!$jenisTindakan) {
                    continue;
                }

                for ($i = 0; $i < $tindakan['quantity']; $i++) {
                    $totals['biaya'] += (float) ($jenisTindakan->total_byrdrpr ?? 0);
                    $totals['bhp'] += (float) ($jenisTindakan->bhp ?? 0);
                    $totals['kso'] += (float) ($jenisTindakan->kso ?? 0);
                    $totals['manajemen'] += (float) ($jenisTindakan->menejemen ?? 0);
                    $totals['dr'] += (float) ($jenisTindakan->tarif_tindakandr ?? 0);
                    $totals['pr'] += (float) ($jenisTindakan->tarif_tindakanpr ?? 0);
                    $totals['sarana'] += (float) ($jenisTindakan->material ?? 0);

                    DB::table('rawat_inap_drpr')->insert([
                        'no_rawat' => $validated['no_rawat'],
                        'kd_jenis_prw' => $tindakan['kd_jenis_prw'],
                        'kd_dokter' => $validated['kd_dokter'],
                        'nip' => $validated['nip'],
                        'tgl_perawatan' => $validated['tgl_perawatan'],
                        'jam_rawat' => $validated['jam_rawat'],
                        'material' => $jenisTindakan->material ?? 0,
                        'bhp' => $jenisTindakan->bhp ?? 0,
                        'tarif_tindakandr' => $jenisTindakan->tarif_tindakandr ?? 0,
                        'tarif_tindakanpr' => $jenisTindakan->tarif_tindakanpr ?? 0,
                        'kso' => $jenisTindakan->kso ?? 0,
                        'menejemen' => $jenisTindakan->menejemen ?? 0,
                        'biaya_rawat' => $jenisTindakan->total_byrdrpr ?? 0,
                    ]);
                }
            }

            $posted = $this->postJurnalTindakanRanap(
                $postingService,
                $validated['no_rawat'],
                $validated['tgl_perawatan'],
                $totals
            );

            DB::commit();
            return response()->json([
                'message' => 'Tindakan berhasil disimpan',
                'no_jurnal' => $posted['no_jurnal'] ?? null,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menyimpan tindakan: ' . $e->getMessage()], 500);
        }
    }

    public function getDiagnosaPasien(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
        ]);

        $rows = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $validated['no_rawat'])
            ->orderBy('diagnosa_pasien.prioritas')
            ->get(['diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit', 'diagnosa_pasien.prioritas']);

        $data = $rows->map(function ($row) {
            $type = ((string) $row->prioritas === '1') ? 'utama' : 'sekunder';

            return [
                'kode' => $row->kd_penyakit,
                'nama' => $row->nm_penyakit,
                'prioritas' => (string) $row->prioritas,
                'type' => $type,
            ];
        });

        return response()->json(['data' => $data]);
    }

    public function storeDiagnosaPasien(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'list' => 'required|array|min:1|max:3',
            'list.*.kode' => 'required|string|max:10',
            'list.*.type' => 'required|in:utama,sekunder',
        ]);

        $no_rawat = $validated['no_rawat'];
        $list = collect($validated['list']);

        $utama = $list->firstWhere('type', 'utama');
        $sekunder = $list->filter(fn ($it) => ($it['type'] ?? '') === 'sekunder');
        $ordered = collect([]);
        if ($utama) {
            $ordered->push($utama);
        }
        foreach ($sekunder as $it) {
            $ordered->push($it);
        }

        $ordered = $ordered->take(3)->values();

        DB::beginTransaction();
        try {
            DB::table('diagnosa_pasien')->where('no_rawat', $no_rawat)->delete();

            $prioritas = 1;
            foreach ($ordered as $item) {
                $row = [
                    'no_rawat' => $no_rawat,
                    'kd_penyakit' => $item['kode'],
                    'prioritas' => (string) $prioritas,
                ];

                try {
                    DB::table('diagnosa_pasien')->insert(array_merge($row, ['status' => 'Ranap']));
                } catch (\Throwable $e) {
                    DB::table('diagnosa_pasien')->insert($row);
                }

                $prioritas++;
            }

            DB::commit();

            try {
                foreach ($ordered as $item) {
                    \App\Jobs\SatuSehat\ProcessConditionJob::dispatch($no_rawat, $item['kode'], 'Ranap')->afterResponse();
                }
                \App\Jobs\SatuSehat\ProcessProcedureJob::dispatch($no_rawat, 'Ranap')->afterResponse();
            } catch (\Throwable $e) {
            }

            $rows = DB::table('diagnosa_pasien')
                ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                ->where('diagnosa_pasien.no_rawat', $no_rawat)
                ->orderBy('diagnosa_pasien.prioritas')
                ->get(['diagnosa_pasien.kd_penyakit', 'penyakit.nm_penyakit', 'diagnosa_pasien.prioritas']);

            $data = $rows->map(function ($row) {
                $type = ((string) $row->prioritas === '1') ? 'utama' : 'sekunder';

                return [
                    'kode' => $row->kd_penyakit,
                    'nama' => $row->nm_penyakit,
                    'prioritas' => (string) $row->prioritas,
                    'type' => $type,
                ];
            });

            return response()->json(['message' => 'Diagnosa tersimpan', 'data' => $data]);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Gagal menyimpan diagnosa', 'error' => $e->getMessage()], 500);
        }
    }

    private function postJurnalTindakanRanap(JurnalPostingService $postingService, string $noRawat, string $tglPerawatan, array $totals): array
    {
        $akun = DB::table('set_akun_ranap')->first();
        if (! $akun) {
            throw new \RuntimeException('Pengaturan akun rawat inap (set_akun_ranap) tidak ditemukan.');
        }

        $totalBiaya = (float) ($totals['biaya'] ?? 0);
        $totalBhp = (float) ($totals['bhp'] ?? 0);
        $totalKso = (float) ($totals['kso'] ?? 0);
        $totalManajemen = (float) ($totals['manajemen'] ?? 0);
        $totalDr = (float) ($totals['dr'] ?? 0);
        $totalPr = (float) ($totals['pr'] ?? 0);
        $totalSarana = (float) ($totals['sarana'] ?? 0);

        if (round($totalBiaya, 2) <= 0) {
            return ['no_jurnal' => null];
        }

        $lines = [];

        $suspen = (string) ($akun->Suspen_Piutang_Tindakan_Ranap ?? '');
        $pendapatan = (string) ($akun->Tindakan_Ranap ?? '');
        if ($suspen === '' || $pendapatan === '') {
            throw new \RuntimeException('Akun Suspen/Pendapatan tindakan rawat inap belum terkonfigurasi.');
        }
        $lines[] = ['kd_rek' => $suspen, 'debet' => $totalBiaya, 'kredit' => 0.0];
        $lines[] = ['kd_rek' => $pendapatan, 'debet' => 0.0, 'kredit' => $totalBiaya];

        if (($akun->Beban_Jasa_Medik_Dokter_Tindakan_Ranap ?? null) && ($akun->Utang_Jasa_Medik_Dokter_Tindakan_Ranap ?? null) && $totalDr > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Medik_Dokter_Tindakan_Ranap, 'debet' => $totalDr, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Medik_Dokter_Tindakan_Ranap, 'debet' => 0.0, 'kredit' => $totalDr];
        }

        if (($akun->Beban_Jasa_Medik_Paramedis_Tindakan_Ranap ?? null) && ($akun->Utang_Jasa_Medik_Paramedis_Tindakan_Ranap ?? null) && $totalPr > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Medik_Paramedis_Tindakan_Ranap, 'debet' => $totalPr, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Medik_Paramedis_Tindakan_Ranap, 'debet' => 0.0, 'kredit' => $totalPr];
        }

        if (($akun->Beban_KSO_Tindakan_Ranap ?? null) && ($akun->Utang_KSO_Tindakan_Ranap ?? null) && $totalKso > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_KSO_Tindakan_Ranap, 'debet' => $totalKso, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_KSO_Tindakan_Ranap, 'debet' => 0.0, 'kredit' => $totalKso];
        }

        if (($akun->HPP_BHP_Tindakan_Ranap ?? null) && ($akun->Persediaan_BHP_Tindakan_Ranap ?? null) && $totalBhp > 0) {
            $lines[] = ['kd_rek' => (string) $akun->HPP_BHP_Tindakan_Ranap, 'debet' => $totalBhp, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Persediaan_BHP_Tindakan_Ranap, 'debet' => 0.0, 'kredit' => $totalBhp];
        }

        if (($akun->Beban_Jasa_Menejemen_Tindakan_Ranap ?? null) && ($akun->Utang_Jasa_Menejemen_Tindakan_Ranap ?? null) && $totalManajemen > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Menejemen_Tindakan_Ranap, 'debet' => $totalManajemen, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Menejemen_Tindakan_Ranap, 'debet' => 0.0, 'kredit' => $totalManajemen];
        }

        if (($akun->Beban_Jasa_Sarana_Tindakan_Ranap ?? null) && ($akun->Utang_Jasa_Sarana_Tindakan_Ranap ?? null) && $totalSarana > 0) {
            $lines[] = ['kd_rek' => (string) $akun->Beban_Jasa_Sarana_Tindakan_Ranap, 'debet' => $totalSarana, 'kredit' => 0.0];
            $lines[] = ['kd_rek' => (string) $akun->Utang_Jasa_Sarana_Tindakan_Ranap, 'debet' => 0.0, 'kredit' => $totalSarana];
        }

        $totDeb = 0.0;
        $totKre = 0.0;
        foreach ($lines as $l) {
            $totDeb += (float) $l['debet'];
            $totKre += (float) $l['kredit'];
        }
        if (round($totDeb, 2) !== round($totKre, 2)) {
            throw new \RuntimeException('Komposisi jurnal tindakan rawat inap tidak seimbang. Periksa konfigurasi akun di set_akun_ranap.');
        }

        DB::table('tampjurnal')->delete();
        DB::table('tampjurnal2')->delete();
        DB::table('tampjurnal2')->insert(array_map(function ($l) {
            return [
                'kd_rek' => $l['kd_rek'],
                'nm_rek' => null,
                'debet' => $l['debet'],
                'kredit' => $l['kredit'],
            ];
        }, $lines));

        $noRm = DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('no_rkm_medis');
        $ket = 'Posting otomatis tindakan Rawat Inap no_rawat '.$noRawat.(is_string($noRm) && $noRm !== '' ? ' (RM '.$noRm.')' : '');

        return $postingService->post($noRawat, $ket, $tglPerawatan);
    }

    public function handover(Request $request)
    {
        return Inertia::render('RawatInap/Catatan/HandOver', [
            'title' => 'Monitoring Handover Perawat',
        ]);
    }

    public function handoverData(Request $request)
    {
        $kiLatest = DB::table('kamar_inap as ki')
            ->select([
                'ki.no_rawat',
                DB::raw('max(concat(ki.tgl_masuk," ",ki.jam_masuk)) as masuk_dt'),
            ])
            ->groupBy('ki.no_rawat');

        $patients = RegPeriksa::query()
            ->with([
                'patient:no_rkm_medis,nm_pasien,tgl_lahir,jk',
                'dokter:kd_dokter,nm_dokter',
            ])
            ->joinSub($kiLatest, 'kil', function ($join) {
                $join->on('kil.no_rawat', '=', 'reg_periksa.no_rawat');
            })
            ->join('kamar_inap', function ($join) {
                $join->on('kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                    ->on(DB::raw('concat(kamar_inap.tgl_masuk," ",kamar_inap.jam_masuk)'), '=', DB::raw('kil.masuk_dt'));
            })
            ->leftJoin('kamar as km', function ($join) {
                $join->on(DB::raw('trim(km.kd_kamar)'), '=', DB::raw('trim(kamar_inap.kd_kamar)'));
            })
            ->leftJoin('bangsal', 'bangsal.kd_bangsal', '=', 'km.kd_bangsal')
            ->where('reg_periksa.status_lanjut', 'Ranap')
            ->whereNull('kamar_inap.tgl_keluar')
            ->select([
                'reg_periksa.no_rawat',
                'reg_periksa.no_rkm_medis',
                'reg_periksa.kd_dokter',
                'reg_periksa.kd_poli',
                'kamar_inap.kd_kamar as kamar',
                'bangsal.nm_bangsal',
                'kamar_inap.tgl_masuk',
                'kamar_inap.jam_masuk',
            ])
            ->get();

        foreach ($patients as $p) {
            // Latest Vitals
            $p->vitals = DB::table('catatan_observasi_ranap')
                ->where('no_rawat', $p->no_rawat)
                ->orderByDesc('tgl_perawatan')
                ->orderByDesc('jam_rawat')
                ->limit(20)
                ->get();

            // Latest SOAP & Advis
            $p->soap = DB::table('pemeriksaan_ranap')
                ->where('no_rawat', $p->no_rawat)
                ->orderByDesc('tgl_perawatan')
                ->orderByDesc('jam_rawat')
                ->first();

            $p->soap_dokter = DB::table('pemeriksaan_ranap as pr')
                ->join('dokter as d', function ($join) {
                    $join->on(DB::raw('trim(d.kd_dokter)'), '=', DB::raw('trim(pr.nip)'));
                })
                ->where('pr.no_rawat', $p->no_rawat)
                ->where(function ($q) {
                    $q->whereRaw("coalesce(trim(pr.rtl),'') <> ''")
                        ->orWhereRaw("coalesce(trim(pr.instruksi),'') <> ''");
                })
                ->orderByDesc('pr.tgl_perawatan')
                ->orderByDesc('pr.jam_rawat')
                ->first([
                    'pr.no_rawat',
                    'pr.tgl_perawatan',
                    'pr.jam_rawat',
                    'pr.rtl',
                    'pr.instruksi',
                    'd.kd_dokter',
                    'd.nm_dokter',
                ]);

            $noResepRanap = DB::table('resep_obat')
                ->where('no_rawat', $p->no_rawat)
                ->orderByDesc('tgl_peresepan')
                ->orderByDesc('jam_peresepan')
                ->orderByDesc('tgl_perawatan')
                ->orderByDesc('jam')
                ->value('no_resep');

            $resepRanapItems = collect([]);
            if ($noResepRanap) {
                $resepRanapItems = DB::table('resep_dokter as rd')
                    ->join('databarang as db', 'db.kode_brng', '=', 'rd.kode_brng')
                    ->where('rd.no_resep', $noResepRanap)
                    ->orderBy('db.nama_brng')
                    ->get([
                        'rd.kode_brng',
                        'db.nama_brng',
                        'rd.jml',
                        'rd.aturan_pakai',
                    ]);
            }

            $p->resep_ranap = [
                'no_resep' => $noResepRanap,
                'items' => $resepRanapItems,
            ];

            $noRawatRalan = DB::table('reg_periksa')
                ->where('no_rkm_medis', $p->no_rkm_medis)
                ->where('status_lanjut', 'Ralan')
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->value('no_rawat');

            $ralanSoap = null;
            if ($noRawatRalan) {
                $ralanSoap = DB::table('pemeriksaan_ralan')
                    ->where('no_rawat', $noRawatRalan)
                    ->orderByDesc('tgl_perawatan')
                    ->orderByDesc('jam_rawat')
                    ->first(['no_rawat', 'tgl_perawatan', 'jam_rawat', 'instruksi']);
            }

            $noResep = null;
            $resepItems = collect([]);
            if ($noRawatRalan) {
                $noResep = DB::table('resep_obat')
                    ->where('no_rawat', $noRawatRalan)
                    ->orderByDesc('tgl_peresepan')
                    ->orderByDesc('jam_peresepan')
                    ->value('no_resep');
            }
            if ($noResep) {
                $resepItems = DB::table('resep_dokter as rd')
                    ->join('databarang as db', 'db.kode_brng', '=', 'rd.kode_brng')
                    ->where('rd.no_resep', $noResep)
                    ->orderBy('db.nama_brng')
                    ->get([
                        'rd.kode_brng',
                        'db.nama_brng',
                        'rd.jml',
                        'rd.aturan_pakai',
                    ]);
            }

            $p->ralan = [
                'no_rawat' => $noRawatRalan,
                'tgl_perawatan' => $ralanSoap ? $ralanSoap->tgl_perawatan : null,
                'jam_rawat' => $ralanSoap ? $ralanSoap->jam_rawat : null,
                'instruksi' => $ralanSoap ? $ralanSoap->instruksi : null,
                'resep' => [
                    'no_resep' => $noResep,
                    'items' => $resepItems,
                ],
            ];

            // Latest Nursing Notes
            $p->nursing_notes = DB::table('catatan_keperawatan_ranap')
                ->where('no_rawat', $p->no_rawat)
                ->orderByDesc('tanggal')
                ->orderByDesc('jam')
                ->limit(5)
                ->get();
        }

        return response()->json(['data' => $patients]);
    }
}
