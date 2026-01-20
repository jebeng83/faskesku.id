<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $status = (string) $request->query('status', '');
        $sort = (string) $request->query('sort', 'terbaru');
        $sttsPulang = (string) $request->query('stts_pulang', '-');
        $perPage = (int) ($request->query('per_page', 12));

        $query = RegPeriksa::query()
            ->with([
                'patient:no_rkm_medis,nm_pasien',
                'dokter:kd_dokter,nm_dokter',
            ])
            ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
            ->leftJoin('ranap_gabung as rg', 'rg.no_rawat', '=', 'reg_periksa.no_rawat')
            ->leftJoin('ranap_gabung as rg2', 'rg2.no_rawat2', '=', 'reg_periksa.no_rawat')
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

        return Inertia::render('RawatInap/Index', [
            'title' => 'Data Rawat Inap',
            'rawatInap' => $rawatInap,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'sort' => $sort,
                'stts_pulang' => $sttsPulang,
            ],
            'sttsPulangOptions' => $sttsPulangOptions,
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
            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'reg_periksa.no_rkm_medis')
                ->select([
                    'reg_periksa.*',
                    DB::raw('kamar_inap.kd_kamar as kamar'),
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.jam_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.jam_keluar',
                    'kamar_inap.stts_pulang',
                ])
                ->when($noRkmMedis, fn ($q) => $q->where('reg_periksa.no_rkm_medis', $noRkmMedis))
                ->where('reg_periksa.no_rawat', $noRawat)
                ->first();
        } elseif ($noRkmMedis) {
            $rawat = RegPeriksa::query()
                ->with(['patient', 'dokter'])
                ->join('kamar_inap', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
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
            ],
        ]);
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
}
