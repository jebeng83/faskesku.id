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
            $rawat = RawatJalan::with('patient')
                ->when($noRkmMedis, fn ($q) => $q->where('no_rkm_medis', $noRkmMedis))
                ->where('no_rawat', $noRawat)
                ->first();
        } elseif ($noRkmMedis) {
            $rawat = RawatJalan::with('patient')
                ->where('no_rkm_medis', $noRkmMedis)
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->first();
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
        ]);

        // Pastikan format jam menjadi H:i:s
        $validated['jam_rawat'] = sprintf('%s:00', $validated['jam_rawat']);

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
            'no_surat' => 'required|string|max:17',
            'no_rawat' => 'required|string|max:17',
            'tanggalawal' => 'required|date',
            'tanggalakhir' => 'required|date|after:tanggalawal',
            'lamasakit' => 'required|string|max:20',
            'nama2' => 'required|string|max:50',
            'tgl_lahir' => 'required|date',
            'umur' => 'required|string|max:20',
            'jk' => 'required|in:Laki-laki,Perempuan',
            'alamat' => 'required|string|max:200',
            'hubungan' => 'required|in:Suami,Istri,Anak,Ayah,Saudara,Keponakan',
            'pekerjaan' => 'required|in:Karyawan Swasta,PNS,Wiraswasta,Pelajar,Mahasiswa,Buruh,Lain-lain',
            'instansi' => 'required|string|max:50',
        ]);

        // TODO: Insert data ke tabel suratsakitpihak2
        // DB::table('suratsakitpihak2')->insert($request->all());

        return redirect()->route('rawat-jalan.index')
            ->with('success', 'Surat sakit berhasil dibuat dan disimpan.');
    }
}
