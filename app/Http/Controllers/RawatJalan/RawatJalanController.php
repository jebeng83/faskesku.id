<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\Patient;
use App\Models\Penjab;
use App\Models\Poliklinik;
use App\Models\RawatJalan\RawatJalan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RawatJalanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RawatJalan::query()
            ->with(['patient' => function ($q) {
                $q->with(['kelurahan', 'kecamatan', 'kabupaten']);
            }])
            ->leftJoin('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
            ->leftJoin('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
            ->leftJoin('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
            ->select([
                'reg_periksa.*',
                DB::raw('dokter.nm_dokter as nm_dokter'),
                DB::raw('poliklinik.nm_poli as nm_poli'),
                DB::raw('penjab.png_jawab as nm_penjamin'),
            ]);

        // Default tanggal ke hari ini jika parameter tidak ada
        $appliedDate = $request->has('tanggal')
            ? $request->input('tanggal')
            : Carbon::today()->toDateString();

        // Dukung filter rentang tanggal: start_date, end_date
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if ($startDate || $endDate) {
            if ($startDate && $endDate) {
                $query->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate]);
            } elseif ($startDate) {
                $query->whereDate('reg_periksa.tgl_registrasi', '>=', $startDate);
            } elseif ($endDate) {
                $query->whereDate('reg_periksa.tgl_registrasi', '<=', $endDate);
            }
        } else {
            // Filter berdasarkan tanggal (gunakan default jika tidak ada)
            if (! empty($appliedDate)) {
                $query->where('reg_periksa.tgl_registrasi', $appliedDate);
            }
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
            $query->whereHas('patient', function ($q) use ($request) {
                $q->where('nm_pasien', 'like', '%'.$request->nama_pasien.'%');
            });
        }

        // Filter berdasarkan dokter (kode atau nama)
        if ($request->filled('kd_dokter')) {
            $query->where('reg_periksa.kd_dokter', $request->kd_dokter);
        }
        if ($request->filled('nama_dokter')) {
            $query->where('dokter.nm_dokter', 'like', '%'.$request->nama_dokter.'%');
        }

        // Filter berdasarkan poliklinik (kode atau nama)
        if ($request->filled('kd_poli')) {
            $query->where('reg_periksa.kd_poli', $request->kd_poli);
        }
        if ($request->filled('nama_poli')) {
            $query->where('poliklinik.nm_poli', 'like', '%'.$request->nama_poli.'%');
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
            'Pulang Paksa' => 'Pulang Paksa',
        ];

        $statusBayarOptions = [
            'Sudah Bayar' => 'Sudah Bayar',
            'Belum Bayar' => 'Belum Bayar',
        ];

        // Ambil opsi dokter dan poliklinik untuk dropdown statis
        $dokterOptions = Dokter::aktif()
            ->orderBy('nm_dokter')
            ->get(['kd_dokter', 'nm_dokter']);
        $poliOptions = Poliklinik::aktif()
            ->orderBy('nm_poli')
            ->get(['kd_poli', 'nm_poli']);

        return Inertia::render('RawatJalan/Index', [
            'rawatJalan' => $rawatJalan,
            'statusOptions' => $statusOptions,
            'statusBayarOptions' => $statusBayarOptions,
            'dokterOptions' => $dokterOptions,
            'poliOptions' => $poliOptions,
            'filters' => array_merge(
                $request->only(['tanggal', 'start_date', 'end_date', 'status', 'status_bayar', 'nama_pasien', 'kd_dokter', 'kd_poli', 'nama_dokter', 'nama_poli']),
                [
                    'tanggal' => $appliedDate,
                    'start_date' => $startDate ?: $appliedDate,
                    'end_date' => $endDate ?: $appliedDate,
                ]
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $patients = Patient::orderBy('nm_pasien')->get();
        $polikliniks = Poliklinik::aktif()->orderBy('nm_poli')->get();
        $dokters = Dokter::aktif()->orderBy('nm_dokter')->get();
        $penjaabs = Penjab::aktif()->orderBy('png_jawab')->get();

        $statusOptions = [
            'Belum' => 'Belum',
            'Sudah' => 'Sudah',
            'Batal' => 'Batal',
            'Berkas Diterima' => 'Berkas Diterima',
            'Dirujuk' => 'Dirujuk',
            'Meninggal' => 'Meninggal',
            'Dirawat' => 'Dirawat',
            'Pulang Paksa' => 'Pulang Paksa',
        ];

        $statusDaftarOptions = [
            '-' => '-',
            'Lama' => 'Lama',
            'Baru' => 'Baru',
        ];

        $statusLanjutOptions = [
            'Ralan' => 'Ralan',
            'Ranap' => 'Ranap',
        ];

        $statusBayarOptions = [
            'Sudah Bayar' => 'Sudah Bayar',
            'Belum Bayar' => 'Belum Bayar',
        ];

        $statusPoliOptions = [
            'Lama' => 'Lama',
            'Baru' => 'Baru',
        ];

        $sttsumurOptions = [
            'Th' => 'Tahun',
            'Bl' => 'Bulan',
            'Hr' => 'Hari',
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
            'CHECK-IN' => 'CHECK-IN',
        ];

        return Inertia::render('RawatJalan/Create', [
            'patients' => $patients,
            'polikliniks' => $polikliniks,
            'dokters' => $dokters,
            'penjaabs' => $penjaabs,
            'statusOptions' => $statusOptions,
            'statusDaftarOptions' => $statusDaftarOptions,
            'statusLanjutOptions' => $statusLanjutOptions,
            'statusBayarOptions' => $statusBayarOptions,
            'statusPoliOptions' => $statusPoliOptions,
            'sttsumurOptions' => $sttsumurOptions,
            'keputusanOptions' => $keputusanOptions,
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
            $rawat = RawatJalan::with(['patient.kelurahan', 'patient.kecamatan', 'patient.kabupaten'])
                ->when($noRkmMedis, fn ($q) => $q->where('no_rkm_medis', $noRkmMedis))
                ->where('no_rawat', $noRawat)
                ->first();
        } elseif ($noRkmMedis) {
            $rawat = RawatJalan::with(['patient.kelurahan', 'patient.kecamatan', 'patient.kabupaten'])
                ->where('no_rkm_medis', $noRkmMedis)
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->first();
        }

        // Hitung hari sejak kunjungan terakhir (reg_periksa sebelumnya)
        $lastVisitDays = null;
        $lastVisitDate = null;
        if ($rawat && $rawat->no_rkm_medis) {
            $prev = DB::table('reg_periksa')
                ->where('no_rkm_medis', $rawat->no_rkm_medis)
                ->where(function ($q) use ($rawat) {
                    $q->where('tgl_registrasi', '<', $rawat->tgl_registrasi)
                        ->orWhere(function ($qq) use ($rawat) {
                            $qq->where('tgl_registrasi', '=', $rawat->tgl_registrasi)
                                ->where('jam_reg', '<', $rawat->jam_reg);
                        });
                })
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->first();

            if ($prev) {
                $lastVisitDate = \Carbon\Carbon::parse($prev->tgl_registrasi)->toDateString();
                $lastVisitDays = \Carbon\Carbon::parse($prev->tgl_registrasi)->diffInDays(\Carbon\Carbon::today());
            }
        }

        // Get medication data for this patient visit
        $medicationData = [];
        if ($noRawat) {
            $medicationData = self::getobatRalan($noRawat);
        }

        return Inertia::render('RawatJalan/Lanjutan', [
            'rawatJalan' => $rawat,
            'medicationData' => $medicationData,
            'params' => [
                'no_rawat' => $noRawat,
                'no_rkm_medis' => $noRkmMedis,
            ],
            'lastVisitDays' => $lastVisitDays,
            'lastVisitDate' => $lastVisitDate,
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
            // Join dengan tabel poliklinik untuk mendapatkan nama poli (nm_poli)
            $riwayat = DB::table('reg_periksa')
                ->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
                ->where('reg_periksa.no_rkm_medis', $noRkmMedis)
                ->orderByDesc('reg_periksa.tgl_registrasi')
                ->orderByDesc('reg_periksa.jam_reg')
                ->limit(25)
                ->select(
                    'reg_periksa.no_rawat',
                    'reg_periksa.tgl_registrasi',
                    'reg_periksa.jam_reg',
                    'reg_periksa.kd_dokter',
                    'reg_periksa.kd_poli',
                    'poliklinik.nm_poli',
                    'reg_periksa.stts',
                    'reg_periksa.status_bayar'
                )
                ->get();
        }

        return response()->json([
            'data' => $riwayat,
        ]);
    }

    /**
     * Get patient examination history
     */
    public function getRiwayatPemeriksaan(Request $request)
    {
        $token = $request->query('t');
        $noRM = $request->query('no_rkm_medis');
        if ($token) {
            $padded = str_replace(['-', '_'], ['+', '/'], $token);
            $paddingNeeded = 4 - (strlen($padded) % 4);
            if ($paddingNeeded < 4) {
                $padded .= str_repeat('=', $paddingNeeded);
            }
            $decoded = json_decode(base64_decode($padded), true);
            $noRM = $decoded['no_rkm_medis'] ?? $noRM;
        }

        if (! $noRM) {
            return response()->json(['data' => []]);
        }

        $data = DB::table('reg_periksa')
            ->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
            ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
            ->where('no_rkm_medis', $noRM)
            ->where('reg_periksa.stts', '<>', 'Batal')
            ->select(
                'reg_periksa.tgl_registrasi',
                'reg_periksa.no_rawat',
                'dokter.nm_dokter',
                'reg_periksa.status_lanjut',
                'poliklinik.nm_poli',
                'reg_periksa.no_reg'
            )
            ->orderBy('reg_periksa.tgl_registrasi', 'desc')
            ->limit(10)
            ->get();

        return response()->json(['data' => $data]);
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

        if (! $noRawat) {
            return response()->json(['data' => []]);
        }

        $rows = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get([
                'no_rawat', 'tgl_perawatan', 'jam_rawat', 'suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'tinggi', 'berat', 'spo2', 'gcs', 'kesadaran', 'keluhan', 'pemeriksaan', 'alergi', 'lingkar_perut', 'rtl', 'penilaian', 'instruksi', 'evaluasi', 'nip',
            ]);

        return response()->json(['data' => $rows]);
    }

    /**
     * Get medication history for outpatient care (static version)
     */
    public static function getobatRalan($noRawat)
    {
        $dataobat = DB::table('detail_pemberian_obat')
            ->join('databarang', 'detail_pemberian_obat.kode_brng', '=', 'databarang.kode_brng')
            ->where('detail_pemberian_obat.no_rawat', $noRawat)
            ->where('detail_pemberian_obat.status', 'Ralan')
            ->select('databarang.nama_brng', 'detail_pemberian_obat.jml', 'detail_pemberian_obat.kode_brng', 'detail_pemberian_obat.tgl_perawatan', 'detail_pemberian_obat.jam')
            ->get();

        foreach ($dataobat as $obat) {
            $aturan = DB::table('aturan_pakai')
                ->where('kode_brng', $obat->kode_brng)
                ->where('no_rawat', $noRawat)
                ->value('aturan');
            $obat->aturan = $aturan ?? '-';
        }

        return $dataobat;
    }

    /**
     * Get laboratory examination history for outpatient care
     */
    public static function getPemeriksaanLab($noRawat)
    {
        $data = DB::table('detail_periksa_lab')
            ->join('template_laboratorium', 'detail_periksa_lab.id_template', '=', 'template_laboratorium.id_template')
            ->where('detail_periksa_lab.no_rawat', $noRawat)
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

        return $data;
    }

    /**
     * Public endpoint: Lab history for a no_rawat
     */
    public function getPemeriksaanLabPublic(Request $request, $no_rawat)
    {
        $rows = self::getPemeriksaanLab($no_rawat);

        return response()->json(['data' => $rows]);
    }

    /**
     * Get radiology results for outpatient care
     */
    public static function getRadiologi($noRawat)
    {
        // Ambil dua sumber terpisah lalu gabungkan di PHP untuk menghindari isu UNION/ORDER BY
        $periksa = DB::table('periksa_radiologi')
            ->where('no_rawat', $noRawat)
            ->get(['no_rawat', 'tgl_periksa', 'jam']);

        // Tabel hasil_radiologi: no_rawat, tgl_periksa, jam, hasil (tanpa kolom keterangan)
        $hasil = DB::table('hasil_radiologi')
            ->where('no_rawat', $noRawat)
            ->get(['no_rawat', 'tgl_periksa', 'jam', 'hasil']);

        // Index hasil by composite key (tgl_periksa + jam)
        $keyedHasil = [];
        foreach ($hasil as $h) {
            $keyedHasil[$h->tgl_periksa.'|'.$h->jam] = $h;
        }

        $merged = [];
        // Gabungkan: mulai dari periksa (supaya waktu ter-cover) dan sertakan hasil bila ada
        foreach ($periksa as $p) {
            $key = $p->tgl_periksa.'|'.$p->jam;
            $h = $keyedHasil[$key] ?? null;
            $merged[] = (object) [
                'no_rawat' => $p->no_rawat,
                'tgl_periksa' => $p->tgl_periksa,
                'jam' => $p->jam,
                'hasil' => isset($h->hasil) ? $h->hasil : '',
                'keterangan' => '',
            ];
            // Tandai terpakai
            unset($keyedHasil[$key]);
        }

        // Tambahkan sisa hasil yang tidak punya pasangan di periksa
        foreach ($keyedHasil as $h) {
            $merged[] = (object) [
                'no_rawat' => $h->no_rawat,
                'tgl_periksa' => $h->tgl_periksa,
                'jam' => $h->jam,
                'hasil' => isset($h->hasil) ? $h->hasil : '',
                'keterangan' => '',
            ];
        }

        // Urutkan desc berdasarkan tanggal dan jam
        usort($merged, function ($a, $b) {
            $da = strtotime($a->tgl_periksa.' '.($a->jam ?? '00:00:00'));
            $db = strtotime($b->tgl_periksa.' '.($b->jam ?? '00:00:00'));

            return $db <=> $da;
        });

        return collect($merged);
    }

    /**
     * Public endpoint: Radiology history for a no_rawat
     */
    public function getRadiologiPublic(Request $request, $no_rawat)
    {
        $rows = self::getRadiologi($no_rawat);

        return response()->json(['data' => $rows]);
    }

    /**
     * Get medication history for outpatient care
     */
    public function getobatRalanPublic(Request $request, $no_rawat)
    {
        // Handle token-based authentication if needed
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

        $dataobat = self::getobatRalan($no_rawat);

        return response()->json(['data' => $dataobat]);
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
            'alergi_pasien' => 'nullable|array',
            'alergi_pasien.no_rkm_medis' => 'required_with:alergi_pasien|string|max:15',
            'alergi_pasien.kode_jenis' => 'required_with:alergi_pasien|integer',
            'alergi_pasien.kd_alergi' => 'required_with:alergi_pasien|string|max:5',
        ]);

        // Pastikan format jam menjadi H:i:s
        $validated['jam_rawat'] = sprintf('%s:00', $validated['jam_rawat']);

        // Pisahkan alergi_pasien dari data pemeriksaan
        $alergiPasien = $validated['alergi_pasien'] ?? null;
        unset($validated['alergi_pasien']);

        // Insert data pemeriksaan tanpa alergi_pasien
        DB::table('pemeriksaan_ralan')->insert($validated);

        // Update status reg_periksa.stts menjadi 'Sudah' setelah pemeriksaan tersimpan
        // Ketika pemeriksaan disimpan, status harus menjadi 'Sudah'
        try {
            $regPeriksa = DB::table('reg_periksa')
                ->where('no_rawat', $validated['no_rawat'])
                ->first();

            if ($regPeriksa) {
                $currentStts = $regPeriksa->stts ?? 'Belum';

                // Selalu update menjadi 'Sudah' ketika pemeriksaan disimpan
                $updated = DB::table('reg_periksa')
                    ->where('no_rawat', $validated['no_rawat'])
                    ->update(['stts' => 'Sudah']);

                \Illuminate\Support\Facades\Log::info('Berhasil update status reg_periksa menjadi Sudah setelah simpan pemeriksaan', [
                    'no_rawat' => $validated['no_rawat'],
                    'previous_stts' => $currentStts,
                    'new_stts' => 'Sudah',
                    'rows_affected' => $updated,
                ]);

                // Simpan alergi pasien jika ada
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

                            \Illuminate\Support\Facades\Log::info('Berhasil menyimpan alergi_pasien', [
                                'no_rkm_medis' => $noRM,
                                'kode_jenis' => $kodeJenis,
                                'kd_alergi' => $kdAlergi,
                            ]);
                        } catch (\Throwable $e) {
                            \Illuminate\Support\Facades\Log::error('Gagal menyimpan alergi_pasien', [
                                'no_rkm_medis' => $noRM,
                                'kode_jenis' => $kodeJenis,
                                'kd_alergi' => $kdAlergi,
                                'error' => $e->getMessage(),
                            ]);
                        }
                    }
                }
            } else {
                \Illuminate\Support\Facades\Log::warning('reg_periksa tidak ditemukan untuk update status', [
                    'no_rawat' => $validated['no_rawat'],
                ]);
            }
        } catch (\Throwable $e) {
            // Log error tapi jangan gagalkan response karena pemeriksaan sudah tersimpan
            \Illuminate\Support\Facades\Log::error('Gagal update status reg_periksa setelah simpan pemeriksaan', [
                'no_rawat' => $validated['no_rawat'],
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }

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
            'alergi_pasien' => 'nullable|array',
            'alergi_pasien.no_rkm_medis' => 'required_with:alergi_pasien|string|max:15',
            'alergi_pasien.kode_jenis' => 'required_with:alergi_pasien|integer',
            'alergi_pasien.kd_alergi' => 'required_with:alergi_pasien|string|max:5',
        ]);

        $key = $validated['key'];
        $data = $request->only(['suhu_tubuh', 'tensi', 'nadi', 'respirasi', 'tinggi', 'berat', 'spo2', 'gcs', 'kesadaran', 'keluhan', 'pemeriksaan', 'alergi', 'lingkar_perut', 'rtl', 'penilaian', 'instruksi', 'evaluasi', 'nip']);

        $updated = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $key['no_rawat'])
            ->where('tgl_perawatan', $key['tgl_perawatan'])
            ->where('jam_rawat', $key['jam_rawat'])
            ->update($data);

        if ($updated === 0) {
            return response()->json(['message' => 'Data tidak ditemukan atau tidak berubah'], 404);
        }

        // Update status reg_periksa.stts menjadi 'Sudah' setelah pemeriksaan diupdate
        // Ketika pemeriksaan diupdate, status harus menjadi 'Sudah'
        try {
            $regPeriksa = DB::table('reg_periksa')
                ->where('no_rawat', $key['no_rawat'])
                ->first();

            if ($regPeriksa) {
                $currentStts = $regPeriksa->stts ?? 'Belum';

                // Selalu update menjadi 'Sudah' ketika pemeriksaan diupdate
                $updatedReg = DB::table('reg_periksa')
                    ->where('no_rawat', $key['no_rawat'])
                    ->update(['stts' => 'Sudah']);

                \Illuminate\Support\Facades\Log::info('Berhasil update status reg_periksa menjadi Sudah setelah update pemeriksaan', [
                    'no_rawat' => $key['no_rawat'],
                    'previous_stts' => $currentStts,
                    'new_stts' => 'Sudah',
                    'rows_affected' => $updatedReg,
                ]);

                // Simpan alergi pasien jika ada
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

                            \Illuminate\Support\Facades\Log::info('Berhasil menyimpan alergi_pasien setelah update pemeriksaan', [
                                'no_rkm_medis' => $noRM,
                                'kode_jenis' => $kodeJenis,
                                'kd_alergi' => $kdAlergi,
                            ]);
                        } catch (\Throwable $e) {
                            \Illuminate\Support\Facades\Log::error('Gagal menyimpan alergi_pasien setelah update pemeriksaan', [
                                'no_rkm_medis' => $noRM,
                                'kode_jenis' => $kodeJenis,
                                'kd_alergi' => $kdAlergi,
                                'error' => $e->getMessage(),
                            ]);
                        }
                    }
                }
            } else {
                \Illuminate\Support\Facades\Log::warning('reg_periksa tidak ditemukan untuk update status', [
                    'no_rawat' => $key['no_rawat'],
                ]);
            }
        } catch (\Throwable $e) {
            // Log error tapi jangan gagalkan response karena pemeriksaan sudah diupdate
            \Illuminate\Support\Facades\Log::error('Gagal update status reg_periksa setelah update pemeriksaan', [
                'no_rawat' => $key['no_rawat'],
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }

        return response()->json(['message' => 'Pemeriksaan diperbarui']);
    }

    /**
     * Ambil daftar diagnosa pasien (ICD-10) untuk no_rawat tertentu.
     * Sumber: tabel diagnosa_pasien bergabung dengan penyakit untuk nama.
     * Response: { data: [{ kode, nama, prioritas, type }] }
     */
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

    /**
     * Simpan daftar diagnosa pasien (ICD-10) untuk no_rawat tertentu.
     * - Menghapus diagnosa sebelumnya dan menulis ulang berdasarkan urutan input.
     * - Memastikan hanya ada satu diagnosa utama (prioritas = 1).
     * - Diagnosa sekunder akan diberi prioritas 2 dan 3 sesuai urutan.
     * Request: { no_rawat: string, list: [{ kode: string, type: 'utama'|'sekunder' }] }
     */
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

        // Susun ulang: pastikan utama di posisi pertama, sisanya sekunder urut sesuai input
        $utama = $list->firstWhere('type', 'utama');
        $sekunder = $list->filter(fn ($it) => ($it['type'] ?? '') === 'sekunder');
        $ordered = collect([]);
        if ($utama) {
            $ordered->push($utama);
        }
        foreach ($sekunder as $it) {
            $ordered->push($it);
        }

        // Batasi maksimal 3 diagnosa
        $ordered = $ordered->take(3)->values();

        DB::beginTransaction();
        try {
            // Hapus diagnosa lama
            DB::table('diagnosa_pasien')->where('no_rawat', $no_rawat)->delete();

            // Tulis diagnosa baru dengan prioritas 1..3 dan status Ralan (bila kolom tersedia)
            $prioritas = 1;
            foreach ($ordered as $item) {
                $row = [
                    'no_rawat' => $no_rawat,
                    'kd_penyakit' => $item['kode'],
                    'prioritas' => (string) $prioritas,
                ];

                // Beberapa skema memiliki kolom 'status' (Ralan/Ranap). Sertakan bila ada.
                // Kita tidak dapat mendeteksi skema di sini, jadi gunakan try-catch pada insert, dan ulang tanpa status bila gagal.
                try {
                    DB::table('diagnosa_pasien')->insert(array_merge($row, ['status' => 'Ralan']));
                } catch (\Throwable $e) {
                    DB::table('diagnosa_pasien')->insert($row);
                }

                $prioritas++;
            }

            DB::commit();

            // Kembalikan daftar terbaru untuk ditampilkan di UI
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

    /**
     * Pencarian pegawai (petugas) untuk dropdown: q by nama/nik
     */
    public function searchPegawai(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $rows = DB::table('pegawai')
            ->when($q !== '', function ($query) use ($q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('nama', 'like', "%{$q}%")
                        ->orWhere('nik', 'like', "%{$q}%");
                });
            })
            ->orderBy('nama')
            ->limit(20)
            ->get(['nik', 'nama']);

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
            'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa',
            'stts_daftar' => 'required|in:-,Lama,Baru',
            'status_lanjut' => 'required|in:Ralan,Ranap',
            'kd_pj' => 'required|string|max:3',
            'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
        ]);

        // Generate no_reg dan no_rawat
        $no_reg = RawatJalan::generateNoReg($request->tgl_registrasi, $request->kd_dokter);
        $no_rawat = RawatJalan::generateNoRawat($request->tgl_registrasi);

        // Ambil data pasien untuk menghitung umur
        $patient = Patient::find($request->no_rkm_medis);
        $umur = $patient->calculateAge();

        // Tentukan status_poli otomatis berdasarkan riwayat kunjungan
        $status_poli = RawatJalan::checkPatientStatus($request->no_rkm_medis);

        // Ambil biaya_reg dari tabel poliklinik
        $poliklinik = Poliklinik::find($request->kd_poli);
        $biaya_reg = $status_poli === 'Baru' ? $poliklinik->registrasi : $poliklinik->registrasilama;

        // Parse umur untuk mendapatkan nilai dan satuan
        $umurdaftar = null;
        $sttsumur = null;
        if ($umur) {
            if (strpos($umur, 'Th') !== false) {
                $umurdaftar = (int) str_replace(' Th', '', $umur);
                $sttsumur = 'Th';
            } elseif (strpos($umur, 'Bl') !== false) {
                $umurdaftar = (int) str_replace(' Bl', '', $umur);
                $sttsumur = 'Bl';
            } elseif (strpos($umur, 'Hr') !== false) {
                $umurdaftar = (int) str_replace(' Hr', '', $umur);
                $sttsumur = 'Hr';
            }
        }

        $data = $request->all();
        $data['no_reg'] = $no_reg;
        $data['no_rawat'] = $no_rawat;
        $data['biaya_reg'] = $biaya_reg;
        $data['status_poli'] = $status_poli;
        $data['umurdaftar'] = $umurdaftar;
        $data['sttsumur'] = $sttsumur;
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
            'rawatJalan' => $rawatJalan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RawatJalan $rawatJalan)
    {
        $patients = Patient::orderBy('nm_pasien')->get();
        $polikliniks = Poliklinik::aktif()->orderBy('nm_poli')->get();
        $dokters = Dokter::aktif()->orderBy('nm_dokter')->get();
        $penjaabs = Penjab::aktif()->orderBy('png_jawab')->get();

        $statusOptions = [
            'Belum' => 'Belum',
            'Sudah' => 'Sudah',
            'Batal' => 'Batal',
            'Berkas Diterima' => 'Berkas Diterima',
            'Dirujuk' => 'Dirujuk',
            'Meninggal' => 'Meninggal',
            'Dirawat' => 'Dirawat',
            'Pulang Paksa' => 'Pulang Paksa',
        ];

        $statusDaftarOptions = [
            '-' => '-',
            'Lama' => 'Lama',
            'Baru' => 'Baru',
        ];

        $statusLanjutOptions = [
            'Ralan' => 'Ralan',
            'Ranap' => 'Ranap',
        ];

        $statusBayarOptions = [
            'Sudah Bayar' => 'Sudah Bayar',
            'Belum Bayar' => 'Belum Bayar',
        ];

        $statusPoliOptions = [
            'Lama' => 'Lama',
            'Baru' => 'Baru',
        ];

        $sttsumurOptions = [
            'Th' => 'Tahun',
            'Bl' => 'Bulan',
            'Hr' => 'Hari',
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
            'CHECK-IN' => 'CHECK-IN',
        ];

        return Inertia::render('RawatJalan/Edit', [
            'rawatJalan' => $rawatJalan,
            'patients' => $patients,
            'polikliniks' => $polikliniks,
            'dokters' => $dokters,
            'penjaabs' => $penjaabs,
            'statusOptions' => $statusOptions,
            'statusDaftarOptions' => $statusDaftarOptions,
            'statusLanjutOptions' => $statusLanjutOptions,
            'statusBayarOptions' => $statusBayarOptions,
            'statusPoliOptions' => $statusPoliOptions,
            'sttsumurOptions' => $sttsumurOptions,
            'keputusanOptions' => $keputusanOptions,
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
     * Show surat sehat form
     */
    public function suratSehat($noRawat)
    {
        $rawatJalan = RawatJalan::where('no_rawat', $noRawat)
            ->with(['patient', 'dokter'])
            ->firstOrFail();

        $patient = $rawatJalan->patient;
        $dokter = $rawatJalan->dokter;

        // Jika dokter tidak ditemukan, buat objek dokter kosong
        if (! $dokter) {
            $dokter = new \App\Models\Dokter;
            $dokter->kd_dokter = '';
            $dokter->nm_dokter = '';
        }

        return Inertia::render('RawatJalan/components/SuratSehat', [
            'rawatJalan' => $rawatJalan,
            'patient' => $patient,
            'dokter' => $dokter,
        ]);
    }

    /**
     * Store surat sehat
     */
    public function storeSuratSehat(Request $request)
    {
        $request->validate([
            'no_surat' => 'required|string|max:17',
            'no_rawat' => 'required|string|max:17',
            'tanggalsurat' => 'required|date',
            'berat' => 'required|string|max:3',
            'tinggi' => 'required|string|max:3',
            'tensi' => 'required|string|max:8',
            'suhu' => 'required|string|max:4',
            'butawarna' => 'required|in:Ya,Tidak',
            'keperluan' => 'required|string|max:100',
            'kesimpulan' => 'required|in:Sehat,Tidak Sehat',
        ]);

        // TODO: Insert data ke tabel surat_keterangan_sehat
        // DB::table('surat_keterangan_sehat')->insert($request->all());

        return redirect()->route('rawat-jalan.index')
            ->with('success', 'Surat sehat berhasil dibuat dan disimpan.');
    }

    /**
     * Show surat sakit form
     */
    public function suratSakit($noRawat)
    {
        $rawatJalan = RawatJalan::where('no_rawat', $noRawat)
            ->with(['patient', 'dokter'])
            ->firstOrFail();

        $patient = $rawatJalan->patient;
        $dokter = $rawatJalan->dokter;

        // Jika dokter tidak ditemukan, buat objek dokter kosong
        if (! $dokter) {
            $dokter = new \App\Models\Dokter;
            $dokter->kd_dokter = '';
            $dokter->nm_dokter = '';
        }

        return Inertia::render('RawatJalan/components/SuratSakit', [
            'rawatJalan' => $rawatJalan,
            'patient' => $patient,
            'dokter' => $dokter,
        ]);
    }

    /**
     * Store surat sakit
     */
    public function storeSuratSakit(Request $request)
    {
        $request->validate([
            'no_surat' => 'required|string|max:20',
            'no_rawat' => 'required|string|max:17',
            'tanggalawal' => 'required|date',
            'tanggalakhir' => 'required|date|after:tanggalawal',
            'lamasakit' => 'required|string|max:20',
            'nama2' => 'nullable|string|max:50',
            'tgl_lahir' => 'nullable|date',
            'umur' => 'nullable|string|max:20',
            'jk' => 'nullable|in:Laki-laki,Perempuan',
            'alamat' => 'nullable|string|max:200',
            'hubungan' => 'nullable|in:Suami,Istri,Anak,Ayah,Saudara,Keponakan',
            'pekerjaan' => 'nullable|in:Karyawan Swasta,PNS,Wiraswasta,Pelajar,Mahasiswa,Buruh,Lain-lain',
            'instansi' => 'nullable|string|max:50',
        ]);
        $instansi = null;
        try {
            if (Schema::hasTable('setting')) {
                $q = DB::table('setting');
                if (Schema::hasColumn('setting', 'aktifkan')) {
                    $q->where('aktifkan', 'Yes');
                }
                $row = $q->orderBy('nama_instansi')->first();
                $instansi = $row->nama_instansi ?? null;
            }
        } catch (\Throwable $e) {}

        $hari = null;
        try {
            $mulai = \Carbon\Carbon::parse($request->input('tanggalawal'));
            $akhir = \Carbon\Carbon::parse($request->input('tanggalakhir'));
            $hari = $mulai && $akhir ? $mulai->diffInDays($akhir) + 1 : null;
        } catch (\Throwable $e) {}

        $reg = DB::table('reg_periksa')->where('no_rawat', $request->input('no_rawat'))->first();
        $mr = (string) ($reg->no_rkm_medis ?? '');
        $dokterName = (string) (DB::table('dokter')->where('kd_dokter', (string) ($reg->kd_dokter ?? ''))->value('nm_dokter') ?: '');
        $pasien = $mr ? DB::table('pasien')->where('no_rkm_medis', $mr)->first() : null;
        $instansiFinal = (string) ($request->input('instansi') ?: ($instansi ?? ''));
        $tglLahirRaw = (string) ($request->input('tgl_lahir') ?: (is_object($pasien) ? (string) ($pasien->tgl_lahir ?? '') : ''));
        $tglLahirYmd = null;
        try { if ($tglLahirRaw) { $tglLahirYmd = \Carbon\Carbon::parse($tglLahirRaw)->format('Y-m-d'); } } catch (\Throwable $e) {}
        $jkInput = (string) $request->input('jk');
        $jkNorm = $jkInput ?: ((strtoupper((string) (is_object($pasien) ? ($pasien->jk ?? '') : '')) === 'P') ? 'Perempuan' : 'Laki-laki');
        $allowedHub = ['Suami','Istri','Anak','Ayah','Saudara','Keponakan'];
        $hubungan = (string) $request->input('hubungan');
        if (! in_array($hubungan, $allowedHub, true)) { $hubungan = 'Suami'; }
        $allowedJobs = ['Karyawan Swasta','PNS','Wiraswasta','Pelajar','Mahasiswa','Buruh','Lain-lain'];
        $pekerjaan = (string) $request->input('pekerjaan');
        if (! in_array($pekerjaan, $allowedJobs, true)) { $pekerjaan = 'Karyawan Swasta'; }
        $alamatFinal = (string) ($request->input('alamat') ?: (is_object($pasien) ? (string) ($pasien->alamat ?? '') : ''));
        $nama2Final = (string) ($request->input('nama2') ?: (is_object($pasien) ? (string) ($pasien->nm_pasien ?? '') : ''));

        $payload = [
            'type' => 'SKS',
            'nomor' => (string) $request->input('no_surat'),
            'instansi' => $instansiFinal,
            'nama' => (string) ($request->user()?->name ?? ''),
            'tgl_lahir' => (string) ($tglLahirYmd ?: $tglLahirRaw),
            'mr' => $mr,
            'tanggal_surat' => (string) $request->input('tanggalawal'),
            'dokter' => $dokterName,
            'status' => 'Valid',
            'hari' => $hari ?? $request->input('lamasakit'),
            'mulai' => (string) $request->input('tanggalawal'),
            'akhir' => (string) $request->input('tanggalakhir'),
        ];

        try {
            if (Schema::hasTable('suratsakitpihak2')) {
                $tglLahirFinal = $tglLahirYmd ?: (function () use ($request) {
                    try { return \Carbon\Carbon::parse($request->input('tanggalawal'))->format('Y-m-d'); } catch (\Throwable $e) { return date('Y-m-d'); }
                })();
                $insert = [
                    'no_surat' => (string) $request->input('no_surat'),
                    'no_rawat' => (string) $request->input('no_rawat'),
                    'tanggalawal' => \Carbon\Carbon::parse($request->input('tanggalawal'))->format('Y-m-d'),
                    'tanggalakhir' => \Carbon\Carbon::parse($request->input('tanggalakhir'))->format('Y-m-d'),
                    'lamasakit' => (string) $request->input('lamasakit'),
                    'nama2' => $nama2Final,
                    'tgl_lahir' => $tglLahirFinal,
                    'umur' => (string) ($request->input('umur') ?: ''),
                    'jk' => $jkNorm,
                    'alamat' => $alamatFinal,
                    'hubungan' => $hubungan,
                    'pekerjaan' => $pekerjaan,
                    'instansi' => $instansiFinal,
                ];
                if (Schema::hasColumn('suratsakitpihak2', 'payload_json')) {
                    $insert['payload_json'] = json_encode($payload);
                }
                $exists = DB::table('suratsakitpihak2')
                    ->where('no_surat', (string) $request->input('no_surat'))
                    ->exists();
                if ($exists) {
                    if (Schema::hasColumn('suratsakitpihak2', 'updated_at')) {
                        $insert['updated_at'] = now();
                    }
                } else {
                    if (Schema::hasColumn('suratsakitpihak2', 'created_at')) {
                        $insert['created_at'] = now();
                    }
                    if (Schema::hasColumn('suratsakitpihak2', 'updated_at')) {
                        $insert['updated_at'] = now();
                    }
                }
                DB::table('suratsakitpihak2')->updateOrInsert(
                    ['no_surat' => (string) $request->input('no_surat')],
                    $insert
                );
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Gagal menyimpan suratsakitpihak2', [
                'no_rawat' => $request->input('no_rawat'),
                'error' => $e->getMessage(),
            ]);
        }

        return redirect()->route('rawat-jalan.index')
            ->with('success', 'Surat sakit berhasil dibuat dan disimpan.');
    }

    /**
     * Verifikasi server-side surat sakit
     * Response: { status: 'Valid'|'Tidak Valid', payload: {...}, match: boolean }
     */
    public function verifySuratSakit(Request $request, $no_rawat)
    {
        $no_rawat = urldecode((string) $no_rawat);
        $token = $request->query('t');
        $client = null;
        try {
            if ($token) {
                $padded = str_replace(['-', '_'], ['+', '/'], $token);
                $padLen = 4 - (strlen($padded) % 4);
                if ($padLen < 4) $padded .= str_repeat('=', $padLen);
                $client = json_decode(base64_decode($padded), true) ?: null;
            }
        } catch (\Throwable $e) {}

        $reg = DB::table('reg_periksa')->where('no_rawat', $no_rawat)->first();
        if (! $reg) {
            $compact = preg_replace('/[^0-9]/', '', $no_rawat);
            if (strlen($compact) >= 9) {
                $yy = substr($compact, 0, 4);
                $mm = substr($compact, 4, 2);
                $dd = substr($compact, 6, 2);
                $seq = substr($compact, 8);
                $candidate = $yy . '/' . $mm . '/' . $dd . '/' . $seq;
                $reg = DB::table('reg_periksa')->where('no_rawat', $candidate)->first();
                if ($reg) {
                    $no_rawat = $candidate;
                }
            }
        }
        if (! $reg && is_array($client)) {
            try {
                $nomorClient = (string) ($client['nomor'] ?? '');
                if ($nomorClient && Schema::hasTable('suratsakitpihak2')) {
                    $row = DB::table('suratsakitpihak2')->where('no_surat', $nomorClient)->orderByDesc('created_at')->first();
                    if ($row) {
                        $no_rawat = (string) ($row->no_rawat ?? $no_rawat);
                        $reg = DB::table('reg_periksa')->where('no_rawat', $no_rawat)->first();
                    }
                }
            } catch (\Throwable $e) {}
        }
        if (! $reg && is_array($client)) {
            try {
                $mrClient = (string) ($client['mr'] ?? '');
                $tglClient = (string) ($client['tanggal_surat'] ?? '');
                $mulaiClient = (string) ($client['mulai'] ?? '');
                $akhirClient = (string) ($client['akhir'] ?? '');
                $ymdTanggal = null;
                $ymdMulai = null;
                $ymdAkhir = null;
                try { if ($tglClient) { $ymdTanggal = \Carbon\Carbon::createFromFormat('d-m-Y', $tglClient)->format('Y-m-d'); } } catch (\Throwable $e) { try { if ($tglClient) { $ymdTanggal = \Carbon\Carbon::parse($tglClient)->format('Y-m-d'); } } catch (\Throwable $e2) {} }
                try { if ($mulaiClient) { $ymdMulai = \Carbon\Carbon::createFromFormat('d-m-Y', $mulaiClient)->format('Y-m-d'); } } catch (\Throwable $e) { try { if ($mulaiClient) { $ymdMulai = \Carbon\Carbon::parse($mulaiClient)->format('Y-m-d'); } } catch (\Throwable $e2) {} }
                try { if ($akhirClient) { $ymdAkhir = \Carbon\Carbon::createFromFormat('d-m-Y', $akhirClient)->format('Y-m-d'); } } catch (\Throwable $e) { try { if ($akhirClient) { $ymdAkhir = \Carbon\Carbon::parse($akhirClient)->format('Y-m-d'); } } catch (\Throwable $e2) {} }
                if ($mrClient) {
                    $q = DB::table('reg_periksa')->where('no_rkm_medis', $mrClient);
                    if ($ymdMulai && $ymdAkhir) {
                        $q->whereBetween('tgl_registrasi', [$ymdMulai, $ymdAkhir]);
                    } elseif ($ymdTanggal) {
                        $q->whereDate('tgl_registrasi', $ymdTanggal);
                    }
                    $reg = $q->orderByDesc('tgl_registrasi')->first();
                    if ($reg) {
                        $no_rawat = (string) $reg->no_rawat;
                    }
                }
            } catch (\Throwable $e) {}
        }
        if (! $reg) {
            return response()->json(['status' => 'Tidak Valid', 'payload' => null, 'match' => false], 404);
        }

        $mr = $reg->no_rkm_medis;
        $patient = DB::table('pasien')->where('no_rkm_medis', $mr)->first();
        $dokter = DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first();

        $instansi = null;
        try {
            if (Schema::hasTable('setting')) {
                $q = DB::table('setting');
                if (Schema::hasColumn('setting', 'aktifkan')) {
                    $q->where('aktifkan', 'Yes');
                }
                $row = $q->orderBy('nama_instansi')->first();
                $instansi = $row->nama_instansi ?? null;
            }
        } catch (\Throwable $e) {}

        $surat = null;
        try {
            if (Schema::hasTable('suratsakitpihak2')) {
                $surat = DB::table('suratsakitpihak2')->where('no_rawat', $no_rawat)->orderByDesc('created_at')->first();
            }
        } catch (\Throwable $e) {}

        $mulai = $surat?->tanggalawal ?: $reg->tgl_registrasi;
        $akhir = $surat?->tanggalakhir ?: $reg->tgl_registrasi;
        $hari = null;
        try {
            $hari = \Carbon\Carbon::parse($mulai)->diffInDays(\Carbon\Carbon::parse($akhir)) + 1;
        } catch (\Throwable $e) {}

        $payload = [
            'type' => 'SKS',
            'nomor' => (string) ($surat->no_surat ?? ''),
            'instansi' => (string) ($instansi ?? ''),
            'nama' => (string) ($patient->nm_pasien ?? ''),
            'tgl_lahir' => (string) ($patient->tgl_lahir ?? ''),
            'mr' => (string) ($mr ?? ''),
            'tanggal_surat' => (string) $mulai,
            'dokter' => (string) ($dokter->nm_dokter ?? ''),
            'status' => ($reg->stts === 'Batal') ? 'Tidak Valid' : 'Valid',
            'hari' => $hari,
            'mulai' => (string) $mulai,
            'akhir' => (string) $akhir,
        ];

        $match = false;
        try {
            if (is_array($client)) {
                $keys = ['type','instansi','mr','dokter'];
                $same = true;
                foreach ($keys as $k) {
                    $a = strtolower(trim((string) ($client[$k] ?? '')));
                    $b = strtolower(trim((string) ($payload[$k] ?? '')));
                    if ($a !== $b) { $same = false; break; }
                }
                $match = $same;
            }
        } catch (\Throwable $e) {}

        return response()->json([
            'status' => $payload['status'],
            'payload' => $payload,
            'match' => $match,
            'qr' => (function () use ($payload) {
                $nomor = (string) ($payload['nomor'] ?? '');
                if ($nomor === '') {
                    return null;
                }
                $url = route('rawat-jalan.surat-sakit.by-nomor', ['no_surat' => $nomor]);
                $url = preg_replace('/\/+$/', '', (string) $url) . '?mode=info';
                $svg = null;
                try {
                    $svg = QrCode::size(160)->errorCorrection('H')->format('svg')->generate($url);
                } catch (\Throwable $e) {}
                return [
                    'url' => $url,
                    'svg' => $svg,
                ];
            })(),
        ]);
    }

    public function nextNoSuratSakit(Request $request)
    {
        $tanggal = (string) ($request->query('tanggal') ?: Carbon::today()->toDateString());
        try { $tanggal = Carbon::parse($tanggal)->toDateString(); } catch (\Throwable $e) {}
        $year = Carbon::parse($tanggal)->format('Y');
        $prefix = 'SKS/'.$year.'/';
        $next = $prefix . '00001';
        try {
            if (Schema::hasTable('suratsakitpihak2')) {
                $row = DB::table('suratsakitpihak2')
                    ->where('no_surat', 'like', $prefix.'%')
                    ->orderByDesc('no_surat')
                    ->first();
                if (! $row && Schema::hasColumn('suratsakitpihak2','created_at')) {
                    $row = DB::table('suratsakitpihak2')
                        ->orderByDesc('created_at')
                        ->first();
                }
                if ($row && isset($row->no_surat)) {
                    $last = (string) $row->no_surat;
                    $num = 0;
                    if (preg_match('/^'.preg_quote($prefix,'/').'([0-9]+)$/', $last, $m)) {
                        $num = (int) ($m[1] ?? 0);
                    } elseif (preg_match('/([0-9]{1,})$/', $last, $m)) {
                        $num = (int) ($m[1] ?? 0);
                    }
                    $num = $num + 1;
                    $next = $prefix . str_pad((string) $num, 5, '0', STR_PAD_LEFT);
                }
            } elseif (Schema::hasTable('suratsakit')) {
                $row = DB::table('suratsakit')
                    ->where('no_surat', 'like', $prefix.'%')
                    ->orderByDesc('no_surat')
                    ->first();
                if ($row && isset($row->no_surat)) {
                    $last = (string) $row->no_surat;
                    $num = 0;
                    if (preg_match('/^'.preg_quote($prefix,'/').'([0-9]+)$/', $last, $m)) {
                        $num = (int) ($m[1] ?? 0);
                    } elseif (preg_match('/([0-9]{1,})$/', $last, $m)) {
                        $num = (int) ($m[1] ?? 0);
                    }
                    $num = $num + 1;
                    $next = $prefix . str_pad((string) $num, 5, '0', STR_PAD_LEFT);
                }
            }
        } catch (\Throwable $e) {}
        return response()->json(['nomor' => $next]);
    }

    public function suratSakitByNomor(Request $request, $no_surat)
    {
        $no_surat = urldecode((string) $no_surat);
        $mode = (string) $request->query('mode', '');
        if (! Schema::hasTable('suratsakitpihak2')) {
            abort(404);
        }
        $row = DB::table('suratsakitpihak2')->where('no_surat', $no_surat)->first();
        if (! $row || ! isset($row->no_rawat)) {
            abort(404);
        }
        if (strtolower($mode) === 'info') {
            $no_rawat = (string) $row->no_rawat;
            $reg = DB::table('reg_periksa')->where('no_rawat', $no_rawat)->first();
            if (! $reg) {
                abort(404);
            }
            $mr = (string) ($reg->no_rkm_medis ?? '');
            $patient = DB::table('pasien')->where('no_rkm_medis', $mr)->first();
            $dokter = DB::table('dokter')->where('kd_dokter', $reg->kd_dokter)->first();
            $instansi = null;
            try {
                if (Schema::hasTable('setting')) {
                    $q = DB::table('setting');
                    if (Schema::hasColumn('setting', 'aktifkan')) {
                        $q->where('aktifkan', 'Yes');
                    }
                    $r = $q->orderBy('nama_instansi')->first();
                    $instansi = $r->nama_instansi ?? null;
                }
            } catch (\Throwable $e) {}
            $surat = DB::table('suratsakitpihak2')->where('no_surat', $no_surat)->first();
            $mulai = $surat?->tanggalawal ?: $reg->tgl_registrasi;
            $akhir = $surat?->tanggalakhir ?: $reg->tgl_registrasi;
            $hari = null;
            try {
                $hari = \Carbon\Carbon::parse($mulai)->diffInDays(\Carbon\Carbon::parse($akhir)) + 1;
            } catch (\Throwable $e) {}
            $fmt = function ($v) {
                try { return $v ? \Carbon\Carbon::parse($v)->format('d-m-Y') : ''; } catch (\Throwable $e) { return (string) $v; }
            };
            $mask = function ($n) {
                $s = trim((string) $n);
                if ($s === '') return '-';
                $arr = explode(' ', $s);
                $first = $arr[0] ?? '';
                $maskedFirst = substr($first, 0, 2) . '**';
                $rest = [];
                foreach (array_slice($arr, 1) as $x) { $rest[] = str_repeat('*', strlen($x)); }
                $out = trim($maskedFirst . ' ' . implode(' ', $rest));
                return $out !== '' ? $out : $maskedFirst;
            };
            $status = ($reg->stts === 'Batal') ? 'Tidak Valid' : 'Valid';
            $html = '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Surat Sakit</title><style>body{margin:0;background:#f6f7f9;color:#111;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif} .wrap{max-width:640px;margin:24px auto;padding:16px} .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,0.06)} .head{padding:24px 24px 8px;text-align:center} .check{display:inline-flex;width:56px;height:56px;border-radius:50%;align-items:center;justify-content:center;background:#2563eb;color:#fff;font-weight:700} .title{margin-top:8px;font-size:22px;font-weight:800;text-transform:uppercase} .divider{margin:12px 0;border-top:1px solid #e5e7eb} .body{padding:8px 24px 24px;font-size:14px} .row{display:flex;align-items:center;justify-content:space-between;margin:6px 0} .label{color:#4b5563} .val{font-weight:600;color:#111} .status.valid{color:#16a34a;font-weight:700} .status.invalid{color:#dc2626;font-weight:700} </style></head><body><div class="wrap"><div class="card"><div class="head"><div class="check">✓</div><div class="title">Surat Sakit</div></div><div class="divider"></div><div class="body">' .
                '<div class="row"><span class="label">KLINIK :</span><span class="val">' . e((string) ($instansi ?? '-')) . '</span></div>' .
                '<div class="row"><span class="label">NAMA :</span><span class="val">' . e($mask($patient->nm_pasien ?? '')) . '</span></div>' .
                '<div class="row"><span class="label">TANGGAL LAHIR :</span><span class="val">' . e($fmt($patient->tgl_lahir ?? '')) . '</span></div>' .
                '<div class="row"><span class="label">ID MR :</span><span class="val">' . e($mr ?: '-') . '</span></div>' .
                '<div class="row"><span class="label">TANGGAL SURAT :</span><span class="val">' . e($fmt($mulai)) . '</span></div>' .
                '<div class="row"><span class="label">PENANGGUNG JAWAB :</span><span class="val">' . e((string) ($dokter->nm_dokter ?? '-')) . '</span></div>' .
                '<div class="row"><span class="label">STATUS :</span><span class="' . ($status === 'Valid' ? 'status valid' : 'status invalid') . '">' . e($status) . '</span></div>' .
                '<div class="divider"></div>' .
                '<div style="margin:10px 0;color:#111">Dalam keadaan <span style="font-weight:700">SAKIT</span> dan memerlukan istirahat selama <span style="font-weight:700">' . e((string) $hari) . '</span> hari</div>' .
                '<div class="row"><span class="label">Terhitung mulai tanggal :</span><span class="val">' . e($fmt($mulai)) . '</span></div>' .
                '<div class="row"><span class="label">Sampai dengan tanggal :</span><span class="val">' . e($fmt($akhir)) . '</span></div>' .
                '</div></div></div></body></html>';
            return response($html)->header('Content-Type', 'text/html');
        }
        return $this->suratSakit($row->no_rawat);
    }

    public function verifySuratSakitByNomor(Request $request, $no_surat)
    {
        $no_surat = urldecode((string) $no_surat);
        $no_rawat = null;
        if (Schema::hasTable('suratsakitpihak2')) {
            $row = DB::table('suratsakitpihak2')->where('no_surat', $no_surat)->first();
            $no_rawat = (string) ($row->no_rawat ?? '');
        }
        if (! $no_rawat) {
            return response()->json(['status' => 'Tidak Valid', 'payload' => null, 'match' => false], 404);
        }
        return $this->verifySuratSakit($request, $no_rawat);
    }

    public function storeValidasiTtd(Request $request)
    {
        if (! Schema::hasTable('validasi_ttd')) {
            return response()->json(['ok' => false, 'message' => 'tabel validasi_ttd tidak tersedia'], 500);
        }

        $label = (string) ($request->input('label') ?: $request->input('type') ?: 'SKS');
        $jenis = (string) ($request->input('jenis') ?: null);
        $no_surat = (string) ($request->input('nomor') ?: $request->input('no_surat') ?: '');
        $no_rawat = (string) ($request->input('no_rawat') ?: '');
        $no_rkm_medis = (string) ($request->input('no_rkm_medis') ?: $request->input('mr') ?: '');
        $statusStr = (string) ($request->input('status') ?: '0');
        $status = in_array($statusStr, ['0','1']) ? $statusStr : (strtolower($statusStr) === 'valid' ? '1' : '0');
        $payload = $request->input('payload');
        $tanggalInput = (string) ($request->input('tanggal') ?: '');
        $tanggal = $tanggalInput ?: now()->toDateString();
        try { $tanggal = \Carbon\Carbon::parse($tanggal)->toDateString(); } catch (\Throwable $e) {}
        $verifiedAt = now();

        $cols = [];
        try { $cols = Schema::getColumnListing('validasi_ttd'); } catch (\Throwable $e) {}

        $row = [];
        if (in_array('no_surat', $cols)) { $row['no_surat'] = $no_surat; }
        if (in_array('no_rawat', $cols)) { $row['no_rawat'] = $no_rawat; }
        if (in_array('no_rkm_medis', $cols)) { $row['no_rkm_medis'] = $no_rkm_medis; }
        if (in_array('tanggal', $cols)) { $row['tanggal'] = $tanggal; }
        if (in_array('status', $cols)) { $row['status'] = $status; }
        if (in_array('label', $cols)) { $row['label'] = $label; }
        if (in_array('jenis', $cols)) { $row['jenis'] = $jenis; }
        if (in_array('payload_json', $cols)) { $row['payload_json'] = is_array($payload) ? json_encode($payload) : (is_string($payload) ? $payload : null); }
        if (in_array('verified_at', $cols)) { $row['verified_at'] = $verifiedAt; }
        if (in_array('created_at', $cols)) { $row['created_at'] = now(); }
        if (in_array('updated_at', $cols)) { $row['updated_at'] = now(); }

        if (empty($row)) {
            return response()->json(['ok' => false, 'message' => 'kolom validasi_ttd tidak kompatibel'], 422);
        }

        try {
            $key = [];
            if (in_array('no_surat', $cols)) { $key['no_surat'] = $no_surat; }
            if (! empty($key)) {
                DB::table('validasi_ttd')->updateOrInsert($key, $row);
            } else {
                DB::table('validasi_ttd')->insert($row);
            }
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 500);
        }
        try {
            if ($label === 'SKS' && Schema::hasTable('suratsakitpihak2')) {
                $instansi = null;
                try {
                    if (Schema::hasTable('setting')) {
                        $q = DB::table('setting');
                        if (Schema::hasColumn('setting', 'aktifkan')) { $q->where('aktifkan', 'Yes'); }
                        $r = $q->orderBy('nama_instansi')->first();
                        $instansi = $r->nama_instansi ?? null;
                    }
                } catch (\Throwable $e) {}

                $reg = DB::table('reg_periksa')->where('no_rawat', $no_rawat)->first();
                $mrDb = (string) ($reg->no_rkm_medis ?? $no_rkm_medis);
                $pasien = $mrDb ? DB::table('pasien')->where('no_rkm_medis', $mrDb)->first() : null;
                $nama2 = (string) ($pasien->nm_pasien ?? '');
                $alamat = (string) ($pasien->alamat ?? '');
                $jkRaw = (string) ($pasien->jk ?? '');
                $jk = strtoupper($jkRaw) === 'P' ? 'Perempuan' : 'Laki-laki';
                $tglLahirRaw = (string) ($pasien->tgl_lahir ?? '');
                $tglLahirYmd = null;
                try { if ($tglLahirRaw) { $tglLahirYmd = \Carbon\Carbon::parse($tglLahirRaw)->format('Y-m-d'); } } catch (\Throwable $e) {}
                $instansiFinal = (string) (($payload['instansi'] ?? null) ?: ($instansi ?? ''));
                $mulaiStr = (string) ($payload['mulai'] ?? $tanggal);
                $akhirStr = (string) ($payload['akhir'] ?? $tanggal);
                $mulaiYmd = $tanggal;
                $akhirYmd = $tanggal;
                try { $mulaiYmd = \Carbon\Carbon::parse($mulaiStr)->format('Y-m-d'); } catch (\Throwable $e) {}
                try { $akhirYmd = \Carbon\Carbon::parse($akhirStr)->format('Y-m-d'); } catch (\Throwable $e) {}
                $hari = null;
                try { $hari = \Carbon\Carbon::parse($mulaiYmd)->diffInDays(\Carbon\Carbon::parse($akhirYmd)) + 1; } catch (\Throwable $e) {}
                $hariStr = (string) (($payload['hari'] ?? null) ?: ($hari ?? 1));
                $hubungan = 'Suami';
                $pekerjaan = 'Karyawan Swasta';

                $insert = [
                    'no_surat' => $no_surat,
                    'no_rawat' => $no_rawat,
                    'tanggalawal' => $mulaiYmd,
                    'tanggalakhir' => $akhirYmd,
                    'lamasakit' => $hariStr,
                    'nama2' => $nama2,
                    'tgl_lahir' => (string) ($tglLahirYmd ?: $mulaiYmd),
                    'umur' => '',
                    'jk' => $jk,
                    'alamat' => $alamat,
                    'hubungan' => $hubungan,
                    'pekerjaan' => $pekerjaan,
                    'instansi' => $instansiFinal,
                ];
                if (Schema::hasColumn('suratsakitpihak2', 'payload_json')) { $insert['payload_json'] = json_encode($payload ?: []); }

                $exists = DB::table('suratsakitpihak2')->where('no_surat', $no_surat)->exists();
                if ($exists) {
                    if (Schema::hasColumn('suratsakitpihak2', 'updated_at')) { $insert['updated_at'] = now(); }
                } else {
                    if (Schema::hasColumn('suratsakitpihak2', 'created_at')) { $insert['created_at'] = now(); }
                    if (Schema::hasColumn('suratsakitpihak2', 'updated_at')) { $insert['updated_at'] = now(); }
                }
                DB::table('suratsakitpihak2')->updateOrInsert(['no_surat' => $no_surat], $insert);
            }
        } catch (\Throwable $e) {}

        return response()->json(['ok' => true, 'data' => $row]);
    }

    public function describeValidasiTtd()
    {
        if (! Schema::hasTable('validasi_ttd')) {
            return response()->json(['ok' => false, 'message' => 'tabel validasi_ttd tidak tersedia'], 404);
        }
        $columns = [];
        try {
            $cols = Schema::getColumnListing('validasi_ttd');
            foreach ($cols as $c) {
                $columns[] = ['name' => $c];
            }
        } catch (\Throwable $e) {}
        return response()->json(['ok' => true, 'columns' => $columns]);
    }

    public function findValidasiTtd(Request $request)
    {
        if (! Schema::hasTable('validasi_ttd')) {
            return response()->json(['ok' => false, 'row' => null], 404);
        }
        $label = (string) $request->query('label', '');
        $no_rawat = (string) $request->query('no_rawat', '');
        $no_rkm_medis = (string) $request->query('no_rkm_medis', '');
        $tanggalInput = (string) $request->query('tanggal', '');
        $tanggal = $tanggalInput ?: null;
        try { if ($tanggal) { $tanggal = \Carbon\Carbon::parse($tanggal)->toDateString(); } } catch (\Throwable $e) {}

        $q = DB::table('validasi_ttd');
        if ($label !== '') { $q->where('label', $label); }
        if ($no_rawat !== '') { $q->where('no_rawat', $no_rawat); }
        if ($no_rkm_medis !== '') { $q->where('no_rkm_medis', $no_rkm_medis); }
        if ($tanggal) { $q->where('tanggal', $tanggal); }
        $row = $q->orderByDesc('updated_at')->orderByDesc('verified_at')->first();
        return response()->json(['ok' => (bool) $row, 'row' => $row ?: null]);
    }
}
