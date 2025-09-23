<?php

namespace App\Http\Controllers;

use App\Models\JnsPerawatan;
use App\Models\RawatJlDr;
use App\Models\RawatJlDrpr;
use App\Models\RawatJlPr;
use App\Models\RegPeriksa;
use App\Models\Dokter;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

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
            $query->where('nm_perawatan', 'like', '%' . $request->search . '%');
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
                'message' => 'Data jenis perawatan berhasil diambil'
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
                'total' => $jenisPerawatan->total()
            ],
            'message' => 'Data jenis perawatan berhasil diambil'
        ]);
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
            'token' => 'nullable|string'
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
                'stts_bayar' => 'Belum'
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $rawatJlDr,
                'message' => 'Tindakan dokter berhasil disimpan'
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Gagal menyimpan tindakan dokter: ' . $e->getMessage()
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
            'token' => 'nullable|string'
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
                'stts_bayar' => 'Belum'
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $rawatJlPr,
                'message' => 'Tindakan perawat berhasil disimpan'
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Gagal menyimpan tindakan perawat: ' . $e->getMessage()
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
            'token' => 'nullable|string'
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
                'stts_bayar' => 'Belum'
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $rawatJlDrpr,
                'message' => 'Tindakan dokter dan perawat berhasil disimpan'
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Gagal menyimpan tindakan dokter dan perawat: ' . $e->getMessage()
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
                        'id' => $item->no_rawat . '_' . $item->kd_jenis_prw . '_' . $item->kd_dokter . '_' . $item->tgl_perawatan . '_' . $item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->jenisPerawatan->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'dokter' => $item->dokter ? [
                            'kd_dokter' => $item->dokter->kd_dokter,
                            'nm_dokter' => $item->dokter->nm_dokter
                        ] : null,
                        'jenis_tindakan' => 'dokter'
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
                        'id' => $item->no_rawat . '_' . $item->kd_jenis_prw . '_' . $item->nip . '_' . $item->tgl_perawatan . '_' . $item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->jenisPerawatan->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'perawat' => $item->perawat ? [
                            'nip' => $item->perawat->nip,
                            'nama' => $item->perawat->nama
                        ] : null,
                        'jenis_tindakan' => 'perawat'
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
                        'id' => $item->no_rawat . '_' . $item->kd_jenis_prw . '_' . $item->kd_dokter . '_' . $item->nip . '_' . $item->tgl_perawatan . '_' . $item->jam_rawat,
                        'no_rawat' => $item->no_rawat,
                        'kd_jenis_prw' => $item->kd_jenis_prw,
                        'nm_perawatan' => $item->jenisPerawatan->nm_perawatan ?? '',
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam_rawat' => $item->jam_rawat,
                        'biaya_rawat' => $item->biaya_rawat,
                        'dokter' => $item->dokter ? [
                            'kd_dokter' => $item->dokter->kd_dokter,
                            'nm_dokter' => $item->dokter->nm_dokter
                        ] : null,
                        'perawat' => $item->perawat ? [
                            'nip' => $item->perawat->nip,
                            'nama' => $item->perawat->nama
                        ] : null,
                        'jenis_tindakan' => 'dokter_perawat'
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'tindakan_dokter' => $tindakanDokter,
                    'tindakan_perawat' => $tindakanPerawat,
                    'tindakan_dokter_perawat' => $tindakanDokterPerawat
                ],
                'message' => 'Riwayat tindakan berhasil diambil'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil riwayat tindakan: ' . $e->getMessage()
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
            'nip' => 'nullable|string'
        ]);
        
        // Log untuk debugging
        Log::info('Delete tindakan request:', $request->all());

        try {
            DB::beginTransaction();

            $deleted = false;
            $recordFound = false;

            switch ($request->jenis_tindakan) {
                case 'dokter':
                    // Cek apakah record ada sebelum dihapus
                    $query = RawatJlDr::where('no_rawat', $request->no_rawat)
                        ->where('kd_jenis_prw', $request->kd_jenis_prw)
                        ->where('tgl_perawatan', $request->tgl_perawatan)
                        ->where('jam_rawat', $request->jam_rawat);
                    
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
                        ->where('tgl_perawatan', $request->tgl_perawatan)
                        ->where('jam_rawat', $request->jam_rawat);
                    
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
                        ->where('tgl_perawatan', $request->tgl_perawatan)
                        ->where('jam_rawat', $request->jam_rawat);
                    
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
            
            if (!$recordFound) {
                Log::warning('No record found for deletion with criteria:', $request->all());
            }

            if ($deleted) {
                DB::commit();
                return response()->json([
                    'message' => 'Tindakan berhasil dihapus'
                ]);
            } else {
                DB::rollback();
                return response()->json([
                    'message' => 'Tindakan tidak ditemukan'
                ], 404);
            }

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Gagal menghapus tindakan: ' . $e->getMessage()
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
                'message' => 'Data dokter berhasil diambil'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dokter: ' . $e->getMessage()
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
                'message' => 'Data petugas berhasil diambil'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data petugas: ' . $e->getMessage()
            ], 500);
        }
    }
}