<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\RegPeriksa;
use Inertia\Inertia;

class RawatInapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $dateFilterMode = (string) $request->query('date_filter_mode', 'belum_pulang');
        $startDate = (string) $request->query('start_date', date('Y-m-d'));
        $endDate = (string) $request->query('end_date', date('Y-m-d'));
        $perPage = (int) ($request->query('per_page', 12));

        $query = RegPeriksa::query()
            ->select([
                'kamar_inap.no_rawat',
                'reg_periksa.no_rkm_medis',
                'pasien.nm_pasien',
                DB::raw("concat(pasien.alamat,', ',kelurahan.nm_kel,', ',kecamatan.nm_kec,', ',kabupaten.nm_kab) as alamat"),
                'reg_periksa.p_jawab',
                'reg_periksa.hubunganpj',
                'penjab.png_jawab',
                DB::raw("concat(kamar_inap.kd_kamar,' ',bangsal.nm_bangsal) as kamar"),
                'kamar_inap.trf_kamar',
                'kamar_inap.diagnosa_awal',
                'kamar_inap.diagnosa_akhir',
                'kamar_inap.tgl_masuk',
                'kamar_inap.jam_masuk',
                'kamar_inap.tgl_keluar',
                'kamar_inap.jam_keluar',
                'kamar_inap.ttl_biaya',
                'kamar_inap.stts_pulang',
                'kamar_inap.lama',
                'dokter.nm_dokter',
                'kamar_inap.kd_kamar',
                'reg_periksa.kd_pj',
                DB::raw("concat(reg_periksa.umurdaftar,' ',reg_periksa.sttsumur) as umur"),
                'reg_periksa.status_bayar',
                'pasien.agama'
            ])
            ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
            ->join('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
            ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
            ->join('bangsal', 'kamar.kd_bangsal', '=', 'bangsal.kd_bangsal')
            ->join('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel')
            ->join('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
            ->join('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
            ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
            ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj');

        // Apply Date/Status Filter Modes (R1, R2, R3)
        if ($dateFilterMode === 'belum_pulang') {
            $query->where('kamar_inap.stts_pulang', '-');
        } elseif ($dateFilterMode === 'masuk') {
            $query->whereBetween('kamar_inap.tgl_masuk', [$startDate, $endDate]);
        } elseif ($dateFilterMode === 'pulang') {
            $query->whereBetween('kamar_inap.tgl_keluar', [$startDate, $endDate]);
        }

        if ($search !== '') {
            $like = "%$search%";
            $query->where(function ($w) use ($like) {
                $w->where('kamar_inap.no_rawat', 'like', $like)
                    ->orWhere('reg_periksa.no_rkm_medis', 'like', $like)
                    ->orWhere('pasien.nm_pasien', 'like', $like)
                    ->orWhere('kamar_inap.kd_kamar', 'like', $like)
                    ->orWhere('bangsal.nm_bangsal', 'like', $like)
                    ->orWhere('dokter.nm_dokter', 'like', $like)
                    ->orWhere('penjab.png_jawab', 'like', $like);
            });
        }

        $query->orderBy('bangsal.nm_bangsal')
              ->orderBy('kamar_inap.tgl_masuk')
              ->orderBy('kamar_inap.jam_masuk');

        $rawatInap = $query->paginate($perPage)->withQueryString();

        return Inertia::render('RawatInap/Index', [
            'title' => 'Data Rawat Inap',
            'rawatInap' => $rawatInap,
            'filters' => [
                'search' => $search,
                'date_filter_mode' => $dateFilterMode,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
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
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17|exists:reg_periksa,no_rawat',
            'tgl_masuk' => 'required|date',
            'jam_masuk' => 'required|date_format:H:i',
            'kd_kamar' => 'required|string|max:15|exists:kamar,kd_kamar',
            'diagnosa_awal' => 'nullable|string|max:100',
        ]);

        $existingActive = DB::table('kamar_inap')
            ->where('no_rawat', $validated['no_rawat'])
            ->whereNull('tgl_keluar')
            ->exists();

        if ($existingActive) {
            return back()
                ->withErrors(['no_rawat' => 'Pasien ini sudah memiliki rawat inap aktif.'])
                ->withInput();
        }

        $tarifKamar = DB::table('kamar')
            ->where('kd_kamar', $validated['kd_kamar'])
            ->value('trf_kamar');

        $tarifKamar = $tarifKamar !== null ? (float) $tarifKamar : 0.0;

        $jamMasuk = sprintf('%s:00', $validated['jam_masuk']);

        try {
            DB::transaction(function () use ($validated, $tarifKamar, $jamMasuk) {
                DB::table('kamar_inap')->insert([
                    'no_rawat' => $validated['no_rawat'],
                    'kd_kamar' => $validated['kd_kamar'],
                    'trf_kamar' => $tarifKamar,
                    'diagnosa_awal' => $validated['diagnosa_awal'] ?? '-',
                    'diagnosa_akhir' => null,
                    'tgl_masuk' => $validated['tgl_masuk'],
                    'jam_masuk' => $jamMasuk,
                    'tgl_keluar' => null,
                    'jam_keluar' => null,
                    'lama' => 0,
                    'ttl_biaya' => 0,
                    'stts_pulang' => '-',
                ]);

                DB::table('reg_periksa')
                    ->where('no_rawat', $validated['no_rawat'])
                    ->update([
                        'status_lanjut' => 'Ranap',
                        'stts' => 'Dirawat',
                    ]);
            });
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal menyimpan data kamar_inap', [
                'no_rawat' => $validated['no_rawat'],
                'kd_kamar' => $validated['kd_kamar'],
                'error' => $e->getMessage(),
            ]);

            return back()
                ->withErrors(['error' => 'Gagal menyimpan data rawat inap.'])
                ->withInput();
        }

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
            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                ->leftJoin('poliklinik', 'poliklinik.kd_poli', '=', 'reg_periksa.kd_poli')
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
                    'reg_periksa.kd_pj',
                    'kamar.kd_bangsal',
                    'kamar.kelas',
                    DB::raw('poliklinik.nm_poli as nm_poli'),
                    DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                ])
                ->when($noRkmMedis, fn ($q) => $q->where('reg_periksa.no_rkm_medis', $noRkmMedis))
                ->where('reg_periksa.no_rawat', $noRawat)
                ->orderByDesc('kamar_inap.tgl_masuk')
                ->orderByDesc('kamar_inap.jam_masuk')
                ->first();
        } elseif ($noRkmMedis) {
            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                ->leftJoin('poliklinik', 'poliklinik.kd_poli', '=', 'reg_periksa.kd_poli')
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
                    'reg_periksa.kd_pj',
                    'kamar.kd_bangsal',
                    'kamar.kelas',
                    DB::raw('poliklinik.nm_poli as nm_poli'),
                    DB::raw('bangsal.nm_bangsal as nm_bangsal'),
                ])
                ->where('reg_periksa.no_rkm_medis', $noRkmMedis)
                ->orderByDesc('reg_periksa.tgl_registrasi')
                ->orderByDesc('reg_periksa.jam_reg')
                ->orderByDesc('kamar_inap.tgl_masuk')
                ->orderByDesc('kamar_inap.jam_masuk')
                ->first();
        }

        return Inertia::render('RawatInap/Lanjutan', [
            'rawatInap' => $rawat,
            'params' => [
                'no_rawat' => $noRawat,
                'no_rkm_medis' => $noRkmMedis,
            ],
        ]);
    }

    public function getDiagnosaRanap(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
        ]);

        $query = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->where('diagnosa_pasien.no_rawat', $validated['no_rawat']);

        if (Schema::hasColumn('diagnosa_pasien', 'status')) {
            $query->where('diagnosa_pasien.status', 'Ranap');
        }

        $rows = $query
            ->orderBy('diagnosa_pasien.prioritas')
            ->get([
                'diagnosa_pasien.kd_penyakit',
                'penyakit.nm_penyakit',
                'diagnosa_pasien.prioritas',
                'diagnosa_pasien.status_penyakit',
            ]);

        $data = $rows->map(function ($row) {
            $type = ((string) $row->prioritas === '1') ? 'utama' : 'sekunder';

            return [
                'kode' => $row->kd_penyakit,
                'nama' => $row->nm_penyakit,
                'prioritas' => (string) $row->prioritas,
                'type' => $type,
                'status_penyakit' => $row->status_penyakit,
            ];
        });

        return response()->json(['data' => $data]);
    }

    public function storeDiagnosaRanap(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'list' => 'required|array|min:1|max:3',
            'list.*.kode' => 'required|string|max:10',
            'list.*.type' => 'required|in:utama,sekunder',
            'list.*.status_penyakit' => 'nullable|in:Lama,Baru',
        ]);

        $no_rawat = $validated['no_rawat'];
        $list = collect($validated['list']);

        $hasPrimary = false;
        $normalized = collect();
        foreach ($list as $item) {
            $itemType = $item['type'] ?? 'sekunder';
            if ($itemType === 'utama' && ! $hasPrimary) {
                $normalized->push(array_merge($item, ['type' => 'utama']));
                $hasPrimary = true;
            } else {
                $normalized->push(array_merge($item, ['type' => 'sekunder']));
            }
        }

        $ordered = $normalized->take(3)->values();

        DB::beginTransaction();
        try {
            if (Schema::hasColumn('diagnosa_pasien', 'status')) {
                DB::table('diagnosa_pasien')
                    ->where('no_rawat', $no_rawat)
                    ->where('status', 'Ranap')
                    ->delete();
            } else {
                DB::table('diagnosa_pasien')
                    ->where('no_rawat', $no_rawat)
                    ->delete();
            }

            $prioritas = 1;
            foreach ($ordered as $item) {
                $row = [
                    'no_rawat' => $no_rawat,
                    'kd_penyakit' => $item['kode'],
                    'prioritas' => (string) $prioritas,
                    'status_penyakit' => $item['status_penyakit'] ?? null,
                ];

                try {
                    DB::table('diagnosa_pasien')->insert(array_merge($row, ['status' => 'Ranap']));
                } catch (\Throwable $e) {
                    DB::table('diagnosa_pasien')->insert($row);
                }

                $prioritas++;
            }

            DB::commit();

            $query = DB::table('diagnosa_pasien')
                ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
                ->where('diagnosa_pasien.no_rawat', $no_rawat);

            if (Schema::hasColumn('diagnosa_pasien', 'status')) {
                $query->where('diagnosa_pasien.status', 'Ranap');
            }

            $rows = $query
                ->orderBy('diagnosa_pasien.prioritas')
                ->get([
                    'diagnosa_pasien.kd_penyakit',
                    'penyakit.nm_penyakit',
                    'diagnosa_pasien.prioritas',
                    'diagnosa_pasien.status_penyakit',
                ]);

            $data = $rows->map(function ($row) {
                $type = ((string) $row->prioritas === '1') ? 'utama' : 'sekunder';

                return [
                    'kode' => $row->kd_penyakit,
                    'nama' => $row->nm_penyakit,
                    'prioritas' => (string) $row->prioritas,
                    'type' => $type,
                    'status_penyakit' => $row->status_penyakit,
                ];
            });

            return response()->json(['message' => 'Diagnosa ranap tersimpan', 'data' => $data]);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Gagal menyimpan diagnosa ranap', 'error' => $e->getMessage()], 500);
        }
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

        $rows = DB::table('pemeriksaan_ranap')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get([
                'no_rawat', 'tgl_perawatan', 'jam_rawat', 'suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'tinggi', 'berat', 'spo2', 'gcs', 'kesadaran', 'keluhan', 'pemeriksaan', 'alergi', 'rtl', 'penilaian', 'instruksi', 'evaluasi', 'nip',
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
            'rtl' => 'nullable|string|max:2000',
            'penilaian' => 'nullable|string|max:2000',
            'instruksi' => 'nullable|string|max:2000',
            'evaluasi' => 'nullable|string|max:2000',
            'nip' => 'required|string|max:20',
        ]);

        foreach (['rtl', 'penilaian', 'instruksi', 'evaluasi'] as $field) {
            $validated[$field] = $validated[$field] ?? '';
        }

        // Pastikan format jam menjadi H:i:s
        $validated['jam_rawat'] = sprintf('%s:00', $validated['jam_rawat']);

        DB::table('pemeriksaan_ranap')->insert($validated);

        // Update status reg_periksa.stts menjadi 'Sudah' setelah pemeriksaan tersimpan
        try {
            $regPeriksa = DB::table('reg_periksa')
                ->where('no_rawat', $validated['no_rawat'])
                ->first();

            if ($regPeriksa) {
                $currentStts = $regPeriksa->stts ?? 'Belum';
                $updated = DB::table('reg_periksa')
                    ->where('no_rawat', $validated['no_rawat'])
                    ->update(['stts' => 'Sudah']);
                \Illuminate\Support\Facades\Log::info('Berhasil update status reg_periksa menjadi Sudah setelah simpan pemeriksaan ranap', [
                    'no_rawat' => $validated['no_rawat'],
                    'previous_stts' => $currentStts,
                    'new_stts' => 'Sudah',
                    'rows_affected' => $updated,
                ]);
            } else {
                \Illuminate\Support\Facades\Log::warning('reg_periksa tidak ditemukan untuk update status (ranap)', [
                    'no_rawat' => $validated['no_rawat'],
                ]);
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal update status reg_periksa setelah simpan pemeriksaan ranap', [
                'no_rawat' => $validated['no_rawat'],
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
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
            // Updatable fields
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
            'rtl' => 'nullable|string|max:2000',
            'penilaian' => 'nullable|string|max:2000',
            'instruksi' => 'nullable|string|max:2000',
            'evaluasi' => 'nullable|string|max:2000',
            'nip' => 'required|string|max:20',
        ]);

        foreach (['rtl', 'penilaian', 'instruksi', 'evaluasi'] as $field) {
            if (array_key_exists($field, $validated) && $validated[$field] === null) {
                $validated[$field] = '';
            }
        }

        $key = $validated['key'];
        $data = $request->only(['suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'tinggi', 'berat', 'spo2', 'gcs', 'kesadaran', 'keluhan', 'pemeriksaan', 'alergi', 'rtl', 'penilaian', 'instruksi', 'evaluasi', 'nip']);

        foreach (['rtl', 'penilaian', 'instruksi', 'evaluasi'] as $field) {
            if (array_key_exists($field, $data) && $data[$field] === null) {
                $data[$field] = '';
            }
        }

        $updated = DB::table('pemeriksaan_ranap')
            ->where('no_rawat', $key['no_rawat'])
            ->where('tgl_perawatan', $key['tgl_perawatan'])
            ->where('jam_rawat', $key['jam_rawat'])
            ->update($data);

        if ($updated === 0) {
            return response()->json(['message' => 'Data tidak ditemukan atau tidak berubah'], 404);
        }

        // Update status reg_periksa.stts menjadi 'Sudah' setelah pemeriksaan diupdate
        try {
            $regPeriksa = DB::table('reg_periksa')
                ->where('no_rawat', $key['no_rawat'])
                ->first();

            if ($regPeriksa) {
                $currentStts = $regPeriksa->stts ?? 'Belum';
                $updatedReg = DB::table('reg_periksa')
                    ->where('no_rawat', $key['no_rawat'])
                    ->update(['stts' => 'Sudah']);
                \Illuminate\Support\Facades\Log::info('Berhasil update status reg_periksa menjadi Sudah setelah update pemeriksaan ranap', [
                    'no_rawat' => $key['no_rawat'],
                    'previous_stts' => $currentStts,
                    'new_stts' => 'Sudah',
                    'rows_affected' => $updatedReg,
                ]);
            } else {
                \Illuminate\Support\Facades\Log::warning('reg_periksa tidak ditemukan untuk update status (ranap)', [
                    'no_rawat' => $key['no_rawat'],
                ]);
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal update status reg_periksa setelah update pemeriksaan ranap', [
                'no_rawat' => $key['no_rawat'],
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }

        return response()->json(['message' => 'Pemeriksaan diperbarui']);
    }

    public function getObatRanapPublic(Request $request, $no_rawat)
    {
        $token = $request->query('t');
        if ($token) {
            $padded = str_replace(['-', '_'], ['+', '/'], $token);
            $paddingNeeded = 4 - (strlen($padded) % 4);
            if ($paddingNeeded < 4) {
                $padded .= str_repeat('=', $paddingNeeded);
            }
            $decoded = json_decode(base64_decode($padded), true);
            $no_rawat = $decoded['no_rawat'] ?? $no_rawat;
        }

        $rows = DB::table('detail_pemberian_obat')
            ->join('databarang', 'detail_pemberian_obat.kode_brng', '=', 'databarang.kode_brng')
            ->where('detail_pemberian_obat.no_rawat', $no_rawat)
            ->where('detail_pemberian_obat.status', 'Ranap')
            ->select('databarang.nama_brng', 'detail_pemberian_obat.jml', 'detail_pemberian_obat.kode_brng', 'detail_pemberian_obat.tgl_perawatan', 'detail_pemberian_obat.jam')
            ->get();

        foreach ($rows as $obat) {
            $aturan = DB::table('aturan_pakai')
                ->where('kode_brng', $obat->kode_brng)
                ->where('no_rawat', $no_rawat)
                ->value('aturan');
            $obat->aturan = $aturan ?? '-';
        }

        return response()->json(['data' => $rows]);
    }

    public function getPemeriksaanLabPublic(Request $request, $no_rawat)
    {
        $rows = DB::table('detail_periksa_lab')
            ->join('template_laboratorium', 'detail_periksa_lab.id_template', '=', 'template_laboratorium.id_template')
            ->where('detail_periksa_lab.no_rawat', $no_rawat)
            ->select(
                DB::raw('template_laboratorium.Pemeriksaan as pemeriksaan'),
                'detail_periksa_lab.tgl_periksa',
                'detail_periksa_lab.jam',
                'detail_periksa_lab.nilai',
                DB::raw('template_laboratorium.satuan as satuan'),
                'detail_periksa_lab.nilai_rujukan',
                'detail_periksa_lab.keterangan'
            )
            ->orderBy('detail_periksa_lab.tgl_periksa', 'desc')
            ->orderBy('detail_periksa_lab.jam', 'desc')
            ->get();

        return response()->json(['data' => $rows]);
    }

    public function getRadiologiPublic(Request $request, $no_rawat)
    {
        $periksa = DB::table('periksa_radiologi')
            ->where('no_rawat', $no_rawat)
            ->get(['no_rawat', 'tgl_periksa', 'jam']);

        $hasil = DB::table('hasil_radiologi')
            ->where('no_rawat', $no_rawat)
            ->get(['no_rawat', 'tgl_periksa', 'jam', 'hasil']);

        $keyedHasil = [];
        foreach ($hasil as $h) {
            $keyedHasil[$h->tgl_periksa . '|' . $h->jam] = $h;
        }

        $merged = [];
        foreach ($periksa as $p) {
            $key = $p->tgl_periksa . '|' . $p->jam;
            $h = $keyedHasil[$key] ?? null;
            $merged[] = (object) [
                'no_rawat' => $p->no_rawat,
                'tgl_periksa' => $p->tgl_periksa,
                'jam' => $p->jam,
                'hasil' => isset($h->hasil) ? $h->hasil : '',
                'keterangan' => '',
            ];
            unset($keyedHasil[$key]);
        }

        foreach ($keyedHasil as $remaining) {
            $merged[] = (object) [
                'no_rawat' => $remaining->no_rawat,
                'tgl_periksa' => $remaining->tgl_periksa,
                'jam' => $remaining->jam,
                'hasil' => $remaining->hasil,
                'keterangan' => '',
            ];
        }

        usort($merged, function ($a, $b) {
            if ($a->tgl_periksa === $b->tgl_periksa) {
                return strcmp($b->jam, $a->jam);
            }
            return strcmp($b->tgl_periksa, $a->tgl_periksa);
        });

        return response()->json(['data' => $merged]);
    }

    /**
     * Endpoint data riwayat rawat inap pasien (AJAX)
     */
    public function riwayat(Request $request)
    {
        $token = $request->query('t');
        $noRkmMedis = $request->query('no_rkm_medis');
        if ($token) {
            $padded = str_replace(['-', '_'], ['+', '/'], $token);
            $paddingNeeded = 4 - (strlen($padded) % 4);
            if ($paddingNeeded < 4) {
                $padded .= str_repeat('=', $paddingNeeded);
            }
            $decoded = json_decode(base64_decode($padded), true);
            $noRkmMedis = $decoded['no_rkm_medis'] ?? $noRkmMedis;
        }

        $riwayat = [];
        if ($noRkmMedis) {
            $riwayat = DB::table('reg_periksa')
                ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                ->join('kamar', 'kamar.kd_kamar', '=', 'kamar_inap.kd_kamar')
                ->where('reg_periksa.no_rkm_medis', $noRkmMedis)
                ->where('reg_periksa.status_lanjut', 'Ranap')
                ->orderByDesc('reg_periksa.tgl_registrasi')
                ->orderByDesc('reg_periksa.jam_reg')
                ->limit(25)
                ->select(
                    'reg_periksa.no_rawat',
                    'reg_periksa.tgl_registrasi',
                    'reg_periksa.jam_reg',
                    'reg_periksa.kd_dokter',
                    'reg_periksa.stts',
                    'reg_periksa.status_bayar',
                    'kamar.kd_bangsal',
                    'kamar.kelas',
                    DB::raw('kamar_inap.kd_kamar as kd_kamar')
                )
                ->get();
        }

        return response()->json(['data' => $riwayat]);
    }
}
