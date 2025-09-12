<?php

namespace App\Http\Controllers;

use App\Models\RawatJalan;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class RawatJalanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RawatJalan::query()
            ->with('patient')
            ->leftJoin('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
            ->leftJoin('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
            ->select([
                'reg_periksa.*',
                DB::raw('dokter.nm_dokter as nm_dokter'),
                DB::raw('penjab.png_jawab as nm_penjamin'),
            ]);

        // Default tanggal ke hari ini jika parameter tidak ada
        $appliedDate = $request->has('tanggal')
            ? $request->input('tanggal')
            : Carbon::today()->toDateString();

        // Filter berdasarkan tanggal (gunakan default jika tidak ada)
        if (!empty($appliedDate)) {
            $query->where('reg_periksa.tgl_registrasi', $appliedDate);
        }

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('reg_periksa.stts', $request->status);
        }

        // Filter berdasarkan status bayar
        if ($request->filled('status_bayar')) {
            $query->where('reg_periksa.status_bayar', $request->status_bayar);
        }

        // Filter berdasarkan nama pasien
        if ($request->filled('nama_pasien')) {
            $query->whereHas('patient', function($q) use ($request) {
                $q->where('nm_pasien', 'like', '%' . $request->nama_pasien . '%');
            });
        }

        $rawatJalan = $query->orderBy('reg_periksa.tgl_registrasi', 'desc')
                           ->orderBy('reg_periksa.jam_reg', 'desc')
                           ->paginate(15);

        $statusOptions = [
            'Belum' => 'Belum',
            'Sudah' => 'Sudah',
            'Batal' => 'Batal',
            'Berkas Diterima' => 'Berkas Diterima',
            'Dirujuk' => 'Dirujuk',
            'Meninggal' => 'Meninggal',
            'Dirawat' => 'Dirawat',
            'Pulang Paksa' => 'Pulang Paksa'
        ];

        $statusBayarOptions = [
            'Sudah Bayar' => 'Sudah Bayar',
            'Belum Bayar' => 'Belum Bayar'
        ];

        return Inertia::render('RawatJalan/Index', [
            'rawatJalan' => $rawatJalan,
            'statusOptions' => $statusOptions,
            'statusBayarOptions' => $statusBayarOptions,
            'filters' => array_merge(
                $request->only(['tanggal', 'status', 'status_bayar', 'nama_pasien']),
                ['tanggal' => $appliedDate]
            )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $patients = Patient::orderBy('nm_pasien')->get();
        $statusOptions = [
            'Belum' => 'Belum',
            'Sudah' => 'Sudah',
            'Batal' => 'Batal',
            'Berkas Diterima' => 'Berkas Diterima',
            'Dirujuk' => 'Dirujuk',
            'Meninggal' => 'Meninggal',
            'Dirawat' => 'Dirawat',
            'Pulang Paksa' => 'Pulang Paksa'
        ];

        $statusDaftarOptions = [
            '-' => '-',
            'Lama' => 'Lama',
            'Baru' => 'Baru'
        ];

        $statusLanjutOptions = [
            'Ralan' => 'Ralan',
            'Ranap' => 'Ranap'
        ];

        $statusBayarOptions = [
            'Sudah Bayar' => 'Sudah Bayar',
            'Belum Bayar' => 'Belum Bayar'
        ];

        $statusPoliOptions = [
            'Lama' => 'Lama',
            'Baru' => 'Baru'
        ];

        $sttsumurOptions = [
            'Th' => 'Tahun',
            'Bl' => 'Bulan',
            'Hr' => 'Hari'
        ];

        $keputusanOptions = [
            '-' => '-',
            'RUJUKAN' => 'RUJUKAN',
            'PRIORITAS' => 'PRIORITAS',
            'HIJAU' => 'HIJAU',
            'KUNING' => 'KUNING',
            'MERAH' => 'MERAH',
            'HITAM' => 'HITAM',
            'MJKN' => 'MJKN',
            'CHECK-IN' => 'CHECK-IN'
        ];

        return Inertia::render('RawatJalan/Create', [
            'patients' => $patients,
            'statusOptions' => $statusOptions,
            'statusDaftarOptions' => $statusDaftarOptions,
            'statusLanjutOptions' => $statusLanjutOptions,
            'statusBayarOptions' => $statusBayarOptions,
            'statusPoliOptions' => $statusPoliOptions,
            'sttsumurOptions' => $sttsumurOptions,
            'keputusanOptions' => $keputusanOptions
        ]);
    }

    /**
     * Halaman lanjutan rawat jalan (placeholder awal)
     */
    public function lanjutan(Request $request)
    {
        // Mendukung skema terenkripsi sederhana via token base64-url (param 't')
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
        // Cari data bila parameter ada; jangan 404-kan agar tidak memutus navigasi
        $rawat = null;
        if ($noRawat) {
            $rawat = RawatJalan::with('patient')
                ->when($noRkmMedis, fn($q) => $q->where('no_rkm_medis', $noRkmMedis))
                ->where('no_rawat', $noRawat)
                ->first();
        } elseif ($noRkmMedis) {
            $rawat = RawatJalan::with('patient')
                ->where('no_rkm_medis', $noRkmMedis)
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->first();
        }

        return Inertia::render('RawatJalan/Lanjutan', [
            'rawatJalan' => $rawat,
            'params' => [
                'no_rawat' => $noRawat,
                'no_rkm_medis' => $noRkmMedis,
            ],
        ]);
    }

    /**
     * Endpoint data riwayat rawat jalan pasien (AJAX-Inertia partial load)
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
            $riwayat = RawatJalan::where('no_rkm_medis', $noRkmMedis)
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->limit(25)
                ->get(['no_rawat','tgl_registrasi','jam_reg','kd_dokter','kd_poli','stts','status_bayar']);
        }

        return response()->json([
            'data' => $riwayat,
        ]);
    }

    /**
     * Daftar pemeriksaan_ralan untuk no_rawat tertentu (JSON)
     */
    public function pemeriksaanRalan(Request $request)
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

        if (!$noRawat) {
            return response()->json(['data' => []]);
        }

        $rows = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get([
                'no_rawat','tgl_perawatan','jam_rawat','suhu_tubuh','tensi','nadi','respirasi','tinggi','berat','spo2','gcs','kesadaran','keluhan','pemeriksaan','alergi','lingkar_perut','rtl','penilaian','instruksi','evaluasi','nip'
            ]);

        return response()->json(['data' => $rows]);
    }

    /**
     * Simpan pemeriksaan_ralan
     */
    public function storePemeriksaanRalan(Request $request)
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
            'lingkar_perut' => 'nullable|string|max:5',
            'rtl' => 'required|string|max:2000',
            'penilaian' => 'required|string|max:2000',
            'instruksi' => 'required|string|max:2000',
            'evaluasi' => 'required|string|max:2000',
            'nip' => 'required|string|max:20',
        ]);

        // Pastikan format jam menjadi H:i:s
        $validated['jam_rawat'] = sprintf('%s:00', $validated['jam_rawat']);

        DB::table('pemeriksaan_ralan')->insert($validated);

        return response()->json(['message' => 'Pemeriksaan tersimpan']);
    }

    /**
     * Hapus pemeriksaan_ralan berdasarkan kunci komposit
     */
    public function deletePemeriksaanRalan(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|string|max:17',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|date_format:H:i:s',
        ]);

        $deleted = DB::table('pemeriksaan_ralan')
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
     * Update pemeriksaan_ralan berdasarkan kunci komposit
     */
    public function updatePemeriksaanRalan(Request $request)
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
            'lingkar_perut' => 'nullable|string|max:5',
            'rtl' => 'required|string|max:2000',
            'penilaian' => 'required|string|max:2000',
            'instruksi' => 'required|string|max:2000',
            'evaluasi' => 'required|string|max:2000',
            'nip' => 'required|string|max:20',
        ]);

        $key = $validated['key'];
        $data = $request->only(['suhu_tubuh','tensi','nadi','respirasi','tinggi','berat','spo2','gcs','kesadaran','keluhan','pemeriksaan','alergi','lingkar_perut','rtl','penilaian','instruksi','evaluasi','nip']);

        $updated = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $key['no_rawat'])
            ->where('tgl_perawatan', $key['tgl_perawatan'])
            ->where('jam_rawat', $key['jam_rawat'])
            ->update($data);

        if ($updated === 0) {
            return response()->json(['message' => 'Data tidak ditemukan atau tidak berubah'], 404);
        }

        return response()->json(['message' => 'Pemeriksaan diperbarui']);
    }

    /**
     * Pencarian pegawai (petugas) untuk dropdown: q by nama/nik
     */
    public function searchPegawai(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $rows = DB::table('pegawai')
            ->when($q !== '', function($query) use ($q) {
                $query->where(function($sub) use ($q) {
                    $sub->where('nama', 'like', "%{$q}%")
                        ->orWhere('nik', 'like', "%{$q}%");
                });
            })
            ->orderBy('nama')
            ->limit(20)
            ->get(['nik','nama']);

        return response()->json(['data' => $rows]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'no_rkm_medis' => 'required|exists:pasien,no_rkm_medis',
            'tgl_registrasi' => 'required|date',
            'jam_reg' => 'required',
            'kd_dokter' => 'required|string|max:20',
            'kd_poli' => 'required|string|max:5',
            'p_jawab' => 'nullable|string|max:100',
            'almt_pj' => 'nullable|string|max:200',
            'hubunganpj' => 'nullable|string|max:20',
            'biaya_reg' => 'nullable|numeric|min:0',
            'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
            'stts_daftar' => 'required|in:-,Lama,Baru',
            'status_lanjut' => 'required|in:Ralan,Ranap',
            'kd_pj' => 'required|string|max:3',
            'umurdaftar' => 'nullable|integer|min:0',
            'sttsumur' => 'nullable|in:Th,Bl,Hr',
            'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
            'status_poli' => 'required|in:Lama,Baru'
        ]);

        // Generate no_rawat
        $no_rawat = $this->generateNoRawat($request->tgl_registrasi);

        $data = $request->all();
        $data['no_rawat'] = $no_rawat;
        $data['tgl_registrasi'] = Carbon::parse($request->tgl_registrasi)->format('Y-m-d');
        $data['jam_reg'] = Carbon::parse($request->jam_reg)->format('H:i:s');

        RawatJalan::create($data);

        return redirect()->route('rawat-jalan.index')
                        ->with('success', 'Data rawat jalan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RawatJalan $rawatJalan)
    {
        $rawatJalan->load('patient');
        return Inertia::render('RawatJalan/Show', [
            'rawatJalan' => $rawatJalan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RawatJalan $rawatJalan)
    {
        $patients = Patient::orderBy('nm_pasien')->get();
        $statusOptions = [
            'Belum' => 'Belum',
            'Sudah' => 'Sudah',
            'Batal' => 'Batal',
            'Berkas Diterima' => 'Berkas Diterima',
            'Dirujuk' => 'Dirujuk',
            'Meninggal' => 'Meninggal',
            'Dirawat' => 'Dirawat',
            'Pulang Paksa' => 'Pulang Paksa'
        ];

        $statusDaftarOptions = [
            '-' => '-',
            'Lama' => 'Lama',
            'Baru' => 'Baru'
        ];

        $statusLanjutOptions = [
            'Ralan' => 'Ralan',
            'Ranap' => 'Ranap'
        ];

        $statusBayarOptions = [
            'Sudah Bayar' => 'Sudah Bayar',
            'Belum Bayar' => 'Belum Bayar'
        ];

        $statusPoliOptions = [
            'Lama' => 'Lama',
            'Baru' => 'Baru'
        ];

        $sttsumurOptions = [
            'Th' => 'Tahun',
            'Bl' => 'Bulan',
            'Hr' => 'Hari'
        ];


        return Inertia::render('RawatJalan/Edit', [
            'rawatJalan' => $rawatJalan,
            'patients' => $patients,
            'statusOptions' => $statusOptions,
            'statusDaftarOptions' => $statusDaftarOptions,
            'statusLanjutOptions' => $statusLanjutOptions,
            'statusBayarOptions' => $statusBayarOptions,
            'statusPoliOptions' => $statusPoliOptions,
            'sttsumurOptions' => $sttsumurOptions,
            'keputusanOptions' => $keputusanOptions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RawatJalan $rawatJalan)
    {
        $request->validate([
            'no_rkm_medis' => 'required|exists:pasien,no_rkm_medis',
            'tgl_registrasi' => 'required|date',
            'jam_reg' => 'required',
            'kd_dokter' => 'required|string|max:20',
            'kd_poli' => 'required|string|max:5',
            'p_jawab' => 'nullable|string|max:100',
            'almt_pj' => 'nullable|string|max:200',
            'hubunganpj' => 'nullable|string|max:20',
            'biaya_reg' => 'nullable|numeric|min:0',
            'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
            'stts_daftar' => 'required|in:-,Lama,Baru',
            'status_lanjut' => 'required|in:Ralan,Ranap',
            'kd_pj' => 'required|string|max:3',
            'umurdaftar' => 'nullable|integer|min:0',
            'sttsumur' => 'nullable|in:Th,Bl,Hr',
            'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
            'status_poli' => 'required|in:Lama,Baru',
            'keputusan' => 'nullable|in:-,RUJUKAN,PRIORITAS,HIJAU,KUNING,MERAH,HITAM,MJKN,CHECK-IN'
        ]);

        $data = $request->all();
        $data['tgl_registrasi'] = Carbon::parse($request->tgl_registrasi)->format('Y-m-d');
        $data['jam_reg'] = Carbon::parse($request->jam_reg)->format('H:i:s');

        $rawatJalan->update($data);

        return redirect()->route('rawat-jalan.index')
                        ->with('success', 'Data rawat jalan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RawatJalan $rawatJalan)
    {
        $rawatJalan->delete();

        return redirect()->route('rawat-jalan.index')
                        ->with('success', 'Data rawat jalan berhasil dihapus.');
    }

    /**
     * Generate nomor rawat
     */
    private function generateNoRawat($tanggal)
    {
        $tgl = Carbon::parse($tanggal)->format('Y-m-d');
        $tglFormatted = str_replace('-', '', $tgl);
        
        // Cari nomor urut terakhir untuk tanggal tersebut
        $lastRecord = RawatJalan::where('tgl_registrasi', $tgl)
                               ->orderBy('no_rawat', 'desc')
                               ->first();
        
        if ($lastRecord) {
            $lastNo = substr($lastRecord->no_rawat, 8);
            $nextNo = str_pad((int)$lastNo + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $nextNo = '0001';
        }
        
        return $tglFormatted . $nextNo;
    }

    /**
     * Get statistics for dashboard
     */
    public function getStatistics()
    {
        $today = Carbon::today();
        
        $stats = [
            'total_hari_ini' => RawatJalan::where('tgl_registrasi', $today)->count(),
            'belum_bayar' => RawatJalan::where('tgl_registrasi', $today)
                                      ->where('status_bayar', 'Belum Bayar')
                                      ->count(),
            'sudah_bayar' => RawatJalan::where('tgl_registrasi', $today)
                                      ->where('status_bayar', 'Sudah Bayar')
                                      ->count(),
            'total_bulan_ini' => RawatJalan::whereMonth('tgl_registrasi', $today->month)
                                          ->whereYear('tgl_registrasi', $today->year)
                                          ->count()
        ];

        return response()->json($stats);
    }
}
