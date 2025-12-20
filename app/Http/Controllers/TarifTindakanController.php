<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\JnsPerawatan;
use App\Models\JnsPerawatanInap;
use App\Models\RawatJlDr;
use App\Models\RawatJlDrpr;
use App\Models\RawatJlPr;
use App\Services\Akutansi\TampJurnalComposerRalan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TarifTindakanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JnsPerawatan::with(['kategori', 'poliklinik', 'penjamin'])
            ->active();

        // Filter berdasarkan poliklinik jika ada
        if ($request->filled('kd_poli')) {
            $query->byPoliklinik($request->kd_poli);
        }

        // Filter berdasarkan penjamin jika ada
        if ($request->filled('kd_pj')) {
            $query->byPenjamin($request->kd_pj);
        }

        // Filter berdasarkan pencarian nama perawatan
        if ($request->filled('search')) {
            $query->where('nm_perawatan', 'like', '%'.$request->search.'%');
        }

        // Filter berdasarkan jenis tarif
        if ($request->filled('jenis_tarif')) {
            switch ($request->jenis_tarif) {
                case 'dokter':
                    $query->hasTarifDokter();
                    break;
                case 'perawat':
                    $query->hasTarifPerawat();
                    break;
                case 'dokter_perawat':
                    $query->hasTarifDokterPerawat();
                    break;
            }
        }

        // Jika request untuk input tindakan (ada parameter jenis_tarif), ambil semua data tanpa pagination
        if ($request->filled('jenis_tarif')) {
            $jenisPerawatan = $query->get();

            return response()->json([
                'data' => $jenisPerawatan,
                'message' => 'Data jenis perawatan berhasil diambil',
            ]);
        }

        // Untuk keperluan lain, tetap gunakan pagination
        $jenisPerawatan = $query->paginate(15);

        return response()->json([
            'data' => $jenisPerawatan->items(),
            'pagination' => [
                'current_page' => $jenisPerawatan->currentPage(),
                'last_page' => $jenisPerawatan->lastPage(),
                'per_page' => $jenisPerawatan->perPage(),
                'total' => $jenisPerawatan->total(),
            ],
            'message' => 'Data jenis perawatan berhasil diambil',
        ]);
    }

    public function indexRanap(Request $request)
    {
        $query = JnsPerawatanInap::with(['kategoriPerawatan', 'bangsal', 'penjab'])->aktif();
        if ($request->filled('kd_bangsal')) {
            $query->where('kd_bangsal', $request->kd_bangsal);
        }
        if ($request->filled('kd_pj')) {
            $query->where('kd_pj', $request->kd_pj);
        }
        if ($request->filled('search')) {
            $query->where('nm_perawatan', 'like', '%'.$request->search.'%');
        }
        if ($request->filled('jenis_tarif')) {
            switch ($request->jenis_tarif) {
                case 'dokter':
                    $query->where('tarif_tindakandr', '>', 0);
                    break;
                case 'perawat':
                    $query->where('tarif_tindakanpr', '>', 0);
                    break;
                case 'dokter_perawat':
                    $query->where('tarif_tindakandr', '>', 0)->where('tarif_tindakanpr', '>', 0);
                    break;
            }
        }
        if ($request->filled('jenis_tarif')) {
            $jenisPerawatan = $query->get();
            return response()->json([
                'data' => $jenisPerawatan,
                'message' => 'Data jenis perawatan ranap berhasil diambil',
            ]);
        }
        $jenisPerawatan = $query->paginate(15);
        return response()->json([
            'data' => $jenisPerawatan->items(),
            'pagination' => [
                'current_page' => $jenisPerawatan->currentPage(),
                'last_page' => $jenisPerawatan->lastPage(),
                'per_page' => $jenisPerawatan->perPage(),
                'total' => $jenisPerawatan->total(),
            ],
            'message' => 'Data jenis perawatan ranap berhasil diambil',
        ]);
    }

    public function storeRanapDokter(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'kd_dokter' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'token' => 'nullable|string',
        ]);
        try {
            DB::beginTransaction();
            $jenis = JnsPerawatanInap::findOrFail($request->kd_jenis_prw);
            DB::table('rawat_inap_dr')->insert([
                'no_rawat' => $request->no_rawat,
                'kd_jenis_prw' => $request->kd_jenis_prw,
                'kd_dokter' => $request->kd_dokter,
                'tgl_perawatan' => Carbon::parse($request->tgl_perawatan)->format('Y-m-d'),
                'jam_rawat' => preg_match('/^\\d{2}:\\d{2}$/', (string) $request->jam_rawat) ? $request->jam_rawat.':00' : ($request->jam_rawat ?? Carbon::now()->format('H:i:s')),
                'material' => $jenis->material ?? 0,
                'bhp' => $jenis->bhp ?? 0,
                'tarif_tindakandr' => $jenis->tarif_tindakandr ?? 0,
                'kso' => $jenis->kso ?? 0,
                'menejemen' => $jenis->menejemen ?? 0,
                'biaya_rawat' => $jenis->total_byrdr ?? 0,
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Tindakan ranap dokter berhasil disimpan',
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan tindakan ranap dokter: '.$e->getMessage(),
            ], 500);
        }
    }

    public function storeRanapPerawat(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'nip' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'token' => 'nullable|string',
        ]);
        try {
            DB::beginTransaction();
            $jenis = JnsPerawatanInap::findOrFail($request->kd_jenis_prw);
            DB::table('rawat_inap_pr')->insert([
                'no_rawat' => $request->no_rawat,
                'kd_jenis_prw' => $request->kd_jenis_prw,
                'nip' => $request->nip,
                'tgl_perawatan' => Carbon::parse($request->tgl_perawatan)->format('Y-m-d'),
                'jam_rawat' => preg_match('/^\\d{2}:\\d{2}$/', (string) $request->jam_rawat) ? $request->jam_rawat.':00' : ($request->jam_rawat ?? Carbon::now()->format('H:i:s')),
                'material' => $jenis->material ?? 0,
                'bhp' => $jenis->bhp ?? 0,
                'tarif_tindakanpr' => $jenis->tarif_tindakanpr ?? 0,
                'kso' => $jenis->kso ?? 0,
                'menejemen' => $jenis->menejemen ?? 0,
                'biaya_rawat' => $jenis->total_byrpr ?? 0,
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Tindakan ranap perawat berhasil disimpan',
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan tindakan ranap perawat: '.$e->getMessage(),
            ], 500);
        }
    }

    public function storeRanapDokterPerawat(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'kd_dokter' => 'required|string',
            'nip' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'token' => 'nullable|string',
        ]);
        try {
            DB::beginTransaction();
            $jenis = JnsPerawatanInap::findOrFail($request->kd_jenis_prw);
            DB::table('rawat_inap_drpr')->insert([
                'no_rawat' => $request->no_rawat,
                'kd_jenis_prw' => $request->kd_jenis_prw,
                'kd_dokter' => $request->kd_dokter,
                'nip' => $request->nip,
                'tgl_perawatan' => Carbon::parse($request->tgl_perawatan)->format('Y-m-d'),
                'jam_rawat' => preg_match('/^\\d{2}:\\d{2}$/', (string) $request->jam_rawat) ? $request->jam_rawat.':00' : ($request->jam_rawat ?? Carbon::now()->format('H:i:s')),
                'material' => $jenis->material ?? 0,
                'bhp' => $jenis->bhp ?? 0,
                'tarif_tindakandr' => $jenis->tarif_tindakandr ?? 0,
                'tarif_tindakanpr' => $jenis->tarif_tindakanpr ?? 0,
                'kso' => $jenis->kso ?? 0,
                'menejemen' => $jenis->menejemen ?? 0,
                'biaya_rawat' => $jenis->total_byrdrpr ?? 0,
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Tindakan ranap dokter+perawat berhasil disimpan',
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan tindakan ranap dokter+perawat: '.$e->getMessage(),
            ], 500);
        }
    }

    public function getRiwayatTindakanRanap(Request $request, $noRawat)
    {
        try {
            $decodedNoRawat = urldecode($noRawat);
            $tindakanDokter = DB::table('rawat_inap_dr')
                ->join('jns_perawatan_inap', 'rawat_inap_dr.kd_jenis_prw', '=', 'jns_perawatan_inap.kd_jenis_prw')
                ->leftJoin('dokter', 'rawat_inap_dr.kd_dokter', '=', 'dokter.kd_dokter')
                ->where('rawat_inap_dr.no_rawat', $decodedNoRawat)
                ->orderBy('rawat_inap_dr.tgl_perawatan', 'desc')
                ->orderBy('rawat_inap_dr.jam_rawat', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->no_rawat.'_'.$item->kd_jenis_prw.'_'.$item->kd_dokter.'_'.$item->tgl_perawatan.'_'.$item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'dokter' => $item->kd_dokter ? [
                            'kd_dokter' => $item->kd_dokter,
                            'nm_dokter' => $item->nm_dokter ?? '',
                        ] : null,
                        'jenis_tindakan' => 'dokter',
                    ];
                });
            $tindakanPerawat = DB::table('rawat_inap_pr')
                ->join('jns_perawatan_inap', 'rawat_inap_pr.kd_jenis_prw', '=', 'jns_perawatan_inap.kd_jenis_prw')
                ->leftJoin('petugas', 'rawat_inap_pr.nip', '=', 'petugas.nip')
                ->where('rawat_inap_pr.no_rawat', $decodedNoRawat)
                ->orderBy('rawat_inap_pr.tgl_perawatan', 'desc')
                ->orderBy('rawat_inap_pr.jam_rawat', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->no_rawat.'_'.$item->kd_jenis_prw.'_'.$item->nip.'_'.$item->tgl_perawatan.'_'.$item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'perawat' => $item->nip ? [
                            'nip' => $item->nip,
                            'nama' => $item->nama ?? '',
                        ] : null,
                        'jenis_tindakan' => 'perawat',
                    ];
                });
            $tindakanDokterPerawat = DB::table('rawat_inap_drpr')
                ->join('jns_perawatan_inap', 'rawat_inap_drpr.kd_jenis_prw', '=', 'jns_perawatan_inap.kd_jenis_prw')
                ->leftJoin('dokter', 'rawat_inap_drpr.kd_dokter', '=', 'dokter.kd_dokter')
                ->leftJoin('petugas', 'rawat_inap_drpr.nip', '=', 'petugas.nip')
                ->where('rawat_inap_drpr.no_rawat', $decodedNoRawat)
                ->orderBy('rawat_inap_drpr.tgl_perawatan', 'desc')
                ->orderBy('rawat_inap_drpr.jam_rawat', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->no_rawat.'_'.$item->kd_jenis_prw.'_'.$item->kd_dokter.'_'.$item->nip.'_'.$item->tgl_perawatan.'_'.$item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'dokter' => $item->kd_dokter ? [
                            'kd_dokter' => $item->kd_dokter,
                            'nm_dokter' => $item->nm_dokter ?? '',
                        ] : null,
                        'perawat' => $item->nip ? [
                            'nip' => $item->nip,
                            'nama' => $item->nama ?? '',
                        ] : null,
                        'jenis_tindakan' => 'dokter_perawat',
                    ];
                });
            return response()->json([
                'success' => true,
                'data' => [
                    'tindakan_dokter' => $tindakanDokter,
                    'tindakan_perawat' => $tindakanPerawat,
                    'tindakan_dokter_perawat' => $tindakanDokterPerawat,
                ],
                'message' => 'Riwayat tindakan ranap berhasil diambil',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil riwayat tindakan ranap: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Compose staging jurnal (tampjurnal2) untuk tindakan Rawat Jalan (umum) berdasarkan no_rawat.
     * Menggunakan pengaturan akun rawat jalan jika tersedia.
     */
    public function stageJurnalRalan(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => ['required', 'string'],
        ]);

        try {
            // Bersihkan staging lama sebelum membuat staging baru
            // Penting: JurnalPostingService menggabungkan tampjurnal + tampjurnal2,
            // jadi keduanya harus dibersihkan untuk menghindari ketidakseimbangan
            DB::table('tampjurnal')->delete();
            DB::table('tampjurnal2')->delete();

            /** @var TampJurnalComposerRalan $composer */
            $composer = app(TampJurnalComposerRalan::class);
            $result = $composer->composeForNoRawat($validated['no_rawat']);

            $balanced = round($result['debet'], 2) === round($result['kredit'], 2);

            // Validasi tambahan: pastikan debet dan kredit seimbang
            if (! $balanced) {
                Log::warning('Staging jurnal tidak seimbang', [
                    'no_rawat' => $validated['no_rawat'],
                    'debet' => $result['debet'],
                    'kredit' => $result['kredit'],
                    'selisih' => abs($result['debet'] - $result['kredit']),
                ]);
            }

            return response()->json([
                'success' => true,
                'meta' => [
                    'debet' => $result['debet'],
                    'kredit' => $result['kredit'],
                    'balanced' => $balanced,
                    'lines' => count($result['lines']),
                ],
                'lines' => $result['lines'],
                'message' => 'Staging jurnal (tampjurnal2) berhasil disusun untuk rawat jalan umum',
            ], 201);
        } catch (\Throwable $e) {
            Log::error('Gagal menyusun staging jurnal', [
                'no_rawat' => $validated['no_rawat'] ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyusun staging jurnal: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store tindakan dokter
     */
    public function storeTindakanDokter(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'kd_dokter' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'token' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Ambil data jenis perawatan
            $jenisPerawatan = JnsPerawatan::findOrFail($request->kd_jenis_prw);

            // Buat record rawat jalan dokter
            $rawatJlDr = RawatJlDr::create([
                'no_rawat' => $request->no_rawat,
                'kd_jenis_prw' => $request->kd_jenis_prw,
                'kd_dokter' => $request->kd_dokter,
                'tgl_perawatan' => $request->tgl_perawatan,
                'jam_rawat' => $request->jam_rawat ?? Carbon::now()->format('H:i:s'),
                'material' => $jenisPerawatan->material ?? 0,
                'bhp' => $jenisPerawatan->bhp ?? 0,
                'tarif_tindakandr' => $jenisPerawatan->tarif_tindakandr ?? 0,
                'kso' => $jenisPerawatan->kso ?? 0,
                'menejemen' => $jenisPerawatan->menejemen ?? 0,
                'biaya_rawat' => $jenisPerawatan->total_byrdr ?? 0,
                'stts_bayar' => 'Belum',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $rawatJlDr,
                'message' => 'Tindakan dokter berhasil disimpan',
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Gagal menyimpan tindakan dokter: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store tindakan perawat
     */
    public function storeTindakanPerawat(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'nip' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'token' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Ambil data jenis perawatan
            $jenisPerawatan = JnsPerawatan::findOrFail($request->kd_jenis_prw);

            // Buat record rawat jalan perawat
            $rawatJlPr = RawatJlPr::create([
                'no_rawat' => $request->no_rawat,
                'kd_jenis_prw' => $request->kd_jenis_prw,
                'nip' => $request->nip,
                'tgl_perawatan' => $request->tgl_perawatan,
                'jam_rawat' => $request->jam_rawat ?? Carbon::now()->format('H:i:s'),
                'material' => $jenisPerawatan->material ?? 0,
                'bhp' => $jenisPerawatan->bhp ?? 0,
                'tarif_tindakanpr' => $jenisPerawatan->tarif_tindakanpr ?? 0,
                'kso' => $jenisPerawatan->kso ?? 0,
                'menejemen' => $jenisPerawatan->menejemen ?? 0,
                'biaya_rawat' => $jenisPerawatan->total_byrpr ?? 0,
                'stts_bayar' => 'Belum',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $rawatJlPr,
                'message' => 'Tindakan perawat berhasil disimpan',
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Gagal menyimpan tindakan perawat: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store tindakan dokter dan perawat
     */
    public function storeTindakanDokterPerawat(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'kd_dokter' => 'required|string',
            'nip' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required',
            'token' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Ambil data jenis perawatan
            $jenisPerawatan = JnsPerawatan::findOrFail($request->kd_jenis_prw);

            // Buat record rawat jalan dokter dan perawat
            $rawatJlDrpr = RawatJlDrpr::create([
                'no_rawat' => $request->no_rawat,
                'kd_jenis_prw' => $request->kd_jenis_prw,
                'kd_dokter' => $request->kd_dokter,
                'nip' => $request->nip,
                'tgl_perawatan' => $request->tgl_perawatan,
                'jam_rawat' => $request->jam_rawat ?? Carbon::now()->format('H:i:s'),
                'material' => $jenisPerawatan->material ?? 0,
                'bhp' => $jenisPerawatan->bhp ?? 0,
                'tarif_tindakandr' => $jenisPerawatan->tarif_tindakandr ?? 0,
                'tarif_tindakanpr' => $jenisPerawatan->tarif_tindakanpr ?? 0,
                'kso' => $jenisPerawatan->kso ?? 0,
                'menejemen' => $jenisPerawatan->menejemen ?? 0,
                'biaya_rawat' => $jenisPerawatan->total_byrdrpr ?? 0,
                'stts_bayar' => 'Belum',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $rawatJlDrpr,
                'message' => 'Tindakan dokter dan perawat berhasil disimpan',
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Gagal menyimpan tindakan dokter dan perawat: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get riwayat tindakan berdasarkan no_rawat
     */
    public function getRiwayatTindakan(Request $request, $noRawat)
    {
        try {
            // Decode noRawat untuk menangani encoding dari frontend
            $decodedNoRawat = urldecode($noRawat);

            // Ambil tindakan dokter dengan ordering
            $tindakanDokter = RawatJlDr::with(['jenisPerawatan', 'dokter'])
                ->where('no_rawat', $decodedNoRawat)
                ->orderBy('tgl_perawatan', 'desc')
                ->orderBy('jam_rawat', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->no_rawat.'_'.$item->kd_jenis_prw.'_'.$item->kd_dokter.'_'.$item->tgl_perawatan.'_'.$item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->jenisPerawatan->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'dokter' => $item->dokter ? [
                            'kd_dokter' => $item->dokter->kd_dokter,
                            'nm_dokter' => $item->dokter->nm_dokter,
                        ] : null,
                        'jenis_tindakan' => 'dokter',
                    ];
                });

            // Ambil tindakan perawat dengan ordering
            $tindakanPerawat = RawatJlPr::with(['jenisPerawatan', 'perawat'])
                ->where('no_rawat', $decodedNoRawat)
                ->orderBy('tgl_perawatan', 'desc')
                ->orderBy('jam_rawat', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->no_rawat.'_'.$item->kd_jenis_prw.'_'.$item->nip.'_'.$item->tgl_perawatan.'_'.$item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->jenisPerawatan->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'perawat' => $item->perawat ? [
                            'nip' => $item->perawat->nip,
                            'nama' => $item->perawat->nama,
                        ] : null,
                        'jenis_tindakan' => 'perawat',
                    ];
                });

            // Ambil tindakan dokter dan perawat dengan ordering
            $tindakanDokterPerawat = RawatJlDrpr::with(['jenisPerawatan', 'dokter', 'perawat'])
                ->where('no_rawat', $decodedNoRawat)
                ->orderBy('tgl_perawatan', 'desc')
                ->orderBy('jam_rawat', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->no_rawat.'_'.$item->kd_jenis_prw.'_'.$item->kd_dokter.'_'.$item->nip.'_'.$item->tgl_perawatan.'_'.$item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->jenisPerawatan->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'dokter' => $item->dokter ? [
                            'kd_dokter' => $item->dokter->kd_dokter,
                            'nm_dokter' => $item->dokter->nm_dokter,
                        ] : null,
                        'perawat' => $item->perawat ? [
                            'nip' => $item->perawat->nip,
                            'nama' => $item->perawat->nama,
                        ] : null,
                        'jenis_tindakan' => 'dokter_perawat',
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'tindakan_dokter' => $tindakanDokter,
                    'tindakan_perawat' => $tindakanPerawat,
                    'tindakan_dokter_perawat' => $tindakanDokterPerawat,
                ],
                'message' => 'Riwayat tindakan berhasil diambil',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil riwayat tindakan: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete tindakan
     */
    public function deleteTindakan(Request $request)
    {
        $request->validate([
            'jenis_tindakan' => 'required|in:dokter,perawat,dokter_perawat',
            'no_rawat' => 'required|string',
            'kd_jenis_prw' => 'required|string',
            'tgl_perawatan' => 'required|date',
            'jam_rawat' => 'required|string',
            'kd_dokter' => 'nullable|string',
            'nip' => 'nullable|string',
        ]);

        // Normalisasi tgl_perawatan dan jam_rawat agar sesuai dengan format kolom di DB
        // Beberapa frontend/axios mengirimkan tgl_perawatan sebagai ISO 8601 (mis. "2025-11-21T17:00:00.000000Z")
        // dan jam_rawat sebagai "HH:MM" tanpa detik. Kita konversi keduanya ke timezone lokal dan format yang konsisten.
        $appTz = config('app.timezone', 'Asia/Jakarta');
        try {
            $tglNormalized = Carbon::parse($request->tgl_perawatan)
                ->setTimezone($appTz)
                ->format('Y-m-d');
        } catch (\Throwable $e) {
            // Jika parsing gagal, gunakan nilai asli apa adanya
            $tglNormalized = is_string($request->tgl_perawatan)
                ? (str_contains($request->tgl_perawatan, 'T')
                    ? explode('T', $request->tgl_perawatan)[0]
                    : (str_contains($request->tgl_perawatan, ' ')
                        ? explode(' ', $request->tgl_perawatan)[0]
                        : $request->tgl_perawatan))
                : (string) $request->tgl_perawatan;
        }

        // Normalisasi jam_rawat ke format HH:MM:SS
        $jamRaw = trim((string) $request->jam_rawat);
        if (preg_match('/^\d{2}:\d{2}$/', $jamRaw)) {
            $jamNormalized = $jamRaw.':00';
        } elseif (preg_match('/^\d{2}:\d{2}:\d{2}$/', $jamRaw)) {
            $jamNormalized = $jamRaw;
        } else {
            // Upaya parsing generik bila format tidak standar
            try {
                $jamNormalized = Carbon::parse($jamRaw)->setTimezone($appTz)->format('H:i:s');
            } catch (\Throwable $e) {
                $jamNormalized = $jamRaw; // fallback
            }
        }

        // Log untuk debugging (termasuk nilai yang telah dinormalisasi)
        $logPayload = $request->all();
        $logPayload['tgl_perawatan_normalized'] = $tglNormalized;
        $logPayload['jam_rawat_normalized'] = $jamNormalized;
        Log::info('Delete tindakan request:', $logPayload);

        try {
            DB::beginTransaction();

            $deleted = false;
            $recordFound = false;

            switch ($request->jenis_tindakan) {
                case 'dokter':
                    // Cek apakah record ada sebelum dihapus
                    $query = RawatJlDr::where('no_rawat', $request->no_rawat)
                        ->where('kd_jenis_prw', $request->kd_jenis_prw)
                        ->where('tgl_perawatan', $tglNormalized)
                        ->where('jam_rawat', $jamNormalized);

                    if ($request->kd_dokter) {
                        $query->where('kd_dokter', $request->kd_dokter);
                    }

                    $record = $query->first();

                    if ($record) {
                        $recordFound = true;
                        Log::info('Found record to delete (dokter):', $record->toArray());
                        $deleted = $record->delete();
                    }
                    break;
                case 'perawat':
                    // Cek apakah record ada sebelum dihapus
                    $query = RawatJlPr::where('no_rawat', $request->no_rawat)
                        ->where('kd_jenis_prw', $request->kd_jenis_prw)
                        ->where('tgl_perawatan', $tglNormalized)
                        ->where('jam_rawat', $jamNormalized);

                    if ($request->nip) {
                        $query->where('nip', $request->nip);
                    }

                    $record = $query->first();

                    if ($record) {
                        $recordFound = true;
                        Log::info('Found record to delete (perawat):', $record->toArray());
                        $deleted = $record->delete();
                    }
                    break;
                case 'dokter_perawat':
                    // Cek apakah record ada sebelum dihapus
                    $query = RawatJlDrpr::where('no_rawat', $request->no_rawat)
                        ->where('kd_jenis_prw', $request->kd_jenis_prw)
                        ->where('tgl_perawatan', $tglNormalized)
                        ->where('jam_rawat', $jamNormalized);

                    if ($request->kd_dokter) {
                        $query->where('kd_dokter', $request->kd_dokter);
                    }

                    if ($request->nip) {
                        $query->where('nip', $request->nip);
                    }

                    $record = $query->first();

                    if ($record) {
                        $recordFound = true;
                        Log::info('Found record to delete (dokter_perawat):', $record->toArray());
                        $deleted = $record->delete();
                    }
                    break;
            }

            if (! $recordFound) {
                Log::warning('No record found for deletion with criteria:', $request->all());
            }

            if ($deleted) {
                DB::commit();

                return response()->json([
                    'message' => 'Tindakan berhasil dihapus',
                ]);
            } else {
                DB::rollback();

                return response()->json([
                    'message' => 'Tindakan tidak ditemukan',
                ], 404);
            }

        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Gagal menghapus tindakan: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get list of doctors
     */
    public function getDokter()
    {
        try {
            $dokters = \App\Models\Dokter::select('kd_dokter', 'nm_dokter')
                ->where('status', '1')
                ->orderBy('nm_dokter')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $dokters,
                'message' => 'Data dokter berhasil diambil',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dokter: '.$e->getMessage(),
            ], 500);
        }
    }

    public function getPetugas()
    {
        try {
            $petugas = DB::table('petugas')
                ->select('nip', 'nama')
                ->where('status', '1')
                ->orderBy('nama')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $petugas,
                'message' => 'Data petugas berhasil diambil',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data petugas: '.$e->getMessage(),
            ], 500);
        }
    }
}
