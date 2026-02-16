<?php

namespace App\Http\Controllers;

use App\Models\Kamar;
use App\Models\Bangsal;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class KamarController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view-kamar')->only(['index', 'show', 'apiIndex', 'getByBangsal', 'getKosong']);
        $this->middleware('permission:create-kamar')->only(['create', 'store', 'apiStore']);
        $this->middleware('permission:edit-kamar')->only(['edit', 'update', 'apiUpdate', 'updateStatus']);
        $this->middleware('permission:delete-kamar')->only(['destroy', 'apiDestroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Kamar::with(['bangsal']);

        // Filter by bangsal
        if ($request->has('kd_bangsal') && $request->kd_bangsal) {
            $query->where('kd_bangsal', $request->kd_bangsal);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by kelas
        if ($request->has('kelas') && $request->kelas) {
            $query->where('kelas', $request->kelas);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kd_kamar', 'like', "%{$search}%")
                    ->orWhereHas('bangsal', function ($q) use ($search) {
                        $q->where('nm_bangsal', 'like', "%{$search}%");
                    });
            });
        }

        // Get all bangsal for filter dropdown
        $bangsal = Bangsal::active()->get();

        $kamar = $query->orderBy('kd_bangsal')->orderBy('kd_kamar')->paginate(15);

        return Inertia::render('Kamar/Index', [
            'kamar' => $kamar,
            'bangsal' => $bangsal,
            'filters' => $request->only(['search', 'kd_bangsal', 'status', 'kelas']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $bangsal = Bangsal::active()->get();

        return Inertia::render('Kamar/Create', [
            'bangsal' => $bangsal,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_kamar' => 'required|string|max:15|unique:kamar,kd_kamar',
            'kd_bangsal' => 'required|string|exists:bangsal,kd_bangsal',
            'trf_kamar' => 'required|numeric|min:0',
            'status' => 'required|in:KOSONG,ISI',
            'kelas' => 'nullable|in:1,2,3,VIP,Utama',
            'statusdata' => 'nullable|in:0,1',
        ], [
            'kd_kamar.required' => 'Kode kamar wajib diisi',
            'kd_kamar.unique' => 'Kode kamar sudah digunakan',
            'kd_bangsal.required' => 'Bangsal wajib dipilih',
            'kd_bangsal.exists' => 'Bangsal tidak ditemukan',
            'trf_kamar.required' => 'Tarif kamar wajib diisi',
            'trf_kamar.numeric' => 'Tarif kamar harus berupa angka',
            'trf_kamar.min' => 'Tarif kamar tidak boleh negatif',
            'status.required' => 'Status kamar wajib dipilih',
            'status.in' => 'Status kamar tidak valid',
        ]);

        Kamar::create($validated);

        return redirect()->route('kamar.index')
            ->with('success', 'Data kamar berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kamar = Kamar::with(['bangsal', 'kamarInap', 'setHargaKamar'])
            ->where('kd_kamar', $id)
            ->firstOrFail();

        return Inertia::render('Kamar/Show', [
            'kamar' => $kamar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $kamar = Kamar::where('kd_kamar', $id)->firstOrFail();
        $bangsal = Bangsal::active()->get();

        return Inertia::render('Kamar/Edit', [
            'kamar' => $kamar,
            'bangsal' => $bangsal,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kamar = Kamar::where('kd_kamar', $id)->firstOrFail();

        $validated = $request->validate([
            'kd_bangsal' => 'required|string|exists:bangsal,kd_bangsal',
            'trf_kamar' => 'required|numeric|min:0',
            'status' => 'required|in:KOSONG,ISI',
            'kelas' => 'nullable|in:1,2,3,VIP,Utama',
            'statusdata' => 'nullable|in:0,1',
        ], [
            'kd_bangsal.required' => 'Bangsal wajib dipilih',
            'kd_bangsal.exists' => 'Bangsal tidak ditemukan',
            'trf_kamar.required' => 'Tarif kamar wajib diisi',
            'trf_kamar.numeric' => 'Tarif kamar harus berupa angka',
            'trf_kamar.min' => 'Tarif kamar tidak boleh negatif',
            'status.required' => 'Status kamar wajib dipilih',
            'status.in' => 'Status kamar tidak valid',
        ]);

        $kamar->update($validated);

        return redirect()->route('kamar.index')
            ->with('success', 'Data kamar berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kamar = Kamar::where('kd_kamar', $id)->firstOrFail();

        $activeInapExists = \Illuminate\Support\Facades\DB::table('kamar_inap')
            ->where('kd_kamar', $kamar->kd_kamar)
            ->where('stts_pulang', '-')
            ->where(function ($w) {
                $w->whereNull('tgl_keluar')->orWhere('tgl_keluar', '0000-00-00');
            })
            ->exists();
        if ($kamar->status === 'ISI' || $activeInapExists) {
            return redirect()->back()
                ->with('error', 'Tidak dapat menghapus kamar yang sedang dipakai rawat inap');
        }

        \Illuminate\Support\Facades\DB::table('set_harga_kamar')->where('kd_kamar', $kamar->kd_kamar)->delete();
        \Illuminate\Support\Facades\DB::table('satu_sehat_mapping_lokasi_ranap')->where('kd_kamar', $kamar->kd_kamar)->delete();

        try {
            $kamar->delete();
        } catch (QueryException $e) {
            $sqlState = (string) ($e->errorInfo[0] ?? '');
            $driverCode = (int) ($e->errorInfo[1] ?? 0);
            if ($sqlState === '23000' && $driverCode === 1451) {
                $kamar->update([
                    'status' => 'KOSONG',
                    'statusdata' => '0',
                ]);

                return redirect()->route('kamar.index')
                    ->with('success', 'Kamar tidak bisa dihapus karena ada data terkait. Kamar dinonaktifkan.');
            }

            throw $e;
        }

        return redirect()->route('kamar.index')
            ->with('success', 'Data kamar berhasil dihapus.');
    }

    /**
     * API: Get kamar by bangsal
     */
    public function getByBangsal(Request $request, string $kd_bangsal)
    {
        $query = Kamar::with(['bangsal'])
            ->where('kd_bangsal', $kd_bangsal)
            ->aktif();

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $kamar = $query->orderBy('kd_kamar')->get();

        return response()->json([
            'success' => true,
            'data' => $kamar,
        ]);
    }

    /**
     * API: Get kamar kosong
     */
    public function getKosong(Request $request)
    {
        $query = Kamar::with(['bangsal'])
            ->kosong()
            ->aktif();

        // Filter by bangsal
        if ($request->has('kd_bangsal') && $request->kd_bangsal) {
            $query->where('kd_bangsal', $request->kd_bangsal);
        }

        // Filter by kelas
        if ($request->has('kelas') && $request->kelas) {
            $query->where('kelas', $request->kelas);
        }

        $kamar = $query->orderBy('kd_bangsal')->orderBy('kd_kamar')->get();

        return response()->json([
            'success' => true,
            'data' => $kamar,
        ]);
    }

    /**
     * API: Update status kamar
     */
    public function updateStatus(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:KOSONG,ISI',
        ]);

        $kamar = Kamar::where('kd_kamar', $id)->firstOrFail();
        $kamar->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'message' => 'Status kamar berhasil diperbarui',
            'data' => $kamar,
        ]);
    }

    public function apiIndex(Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));
        $kd_bangsal = trim((string) $request->query('kd_bangsal', ''));
        $status = trim((string) $request->query('status', ''));
        $kelas = trim((string) $request->query('kelas', ''));
        $statusdata = trim((string) $request->query('statusdata', '1'));

        $tbl = \Illuminate\Support\Facades\DB::table('kamar as k')
            ->leftJoin('bangsal as b', 'b.kd_bangsal', '=', 'k.kd_bangsal')
            ->select('k.kd_kamar', 'k.kd_bangsal', 'b.nm_bangsal', 'k.trf_kamar', 'k.status', 'k.kelas', 'k.statusdata');

        if ($statusdata !== '' && $statusdata !== 'all') {
            $tbl->where('k.statusdata', $statusdata);
        }
        if ($kd_bangsal !== '') {
            $tbl->where('k.kd_bangsal', $kd_bangsal);
        }
        if ($status !== '') {
            $tbl->where('k.status', $status);
        }
        if ($kelas !== '') {
            $tbl->where('k.kelas', $kelas);
        }
        if ($q !== '') {
            $tbl->where(function ($w) use ($q) {
                $w->where('k.kd_kamar', 'like', "%{$q}%")
                    ->orWhere('k.kd_bangsal', 'like', "%{$q}%")
                    ->orWhere('b.nm_bangsal', 'like', "%{$q}%");
            });
        }

        $total = (clone $tbl)->count();
        $rows = $tbl->orderBy('k.kd_bangsal')->orderBy('k.kd_kamar')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $rows,
        ]);
    }

    public function apiStore(Request $request)
    {
        $validated = $request->validate([
            'kd_kamar' => 'required|string|max:15|unique:kamar,kd_kamar',
            'kd_bangsal' => 'required|string|exists:bangsal,kd_bangsal',
            'trf_kamar' => 'required|numeric|min:0',
            'status' => 'required|in:KOSONG,ISI',
            'kelas' => 'nullable|in:1,2,3,VIP,Utama',
            'statusdata' => 'nullable|in:0,1',
        ]);

        $kamar = Kamar::create($validated);

        return response()->json([
            'ok' => true,
            'message' => 'Kamar berhasil ditambahkan',
            'data' => $kamar,
        ], 201);
    }

    public function apiUpdate(Request $request, string $id)
    {
        $kamar = Kamar::where('kd_kamar', $id)->firstOrFail();

        $validated = $request->validate([
            'kd_bangsal' => 'required|string|exists:bangsal,kd_bangsal',
            'trf_kamar' => 'required|numeric|min:0',
            'status' => 'required|in:KOSONG,ISI',
            'kelas' => 'nullable|in:1,2,3,VIP,Utama',
            'statusdata' => 'nullable|in:0,1',
        ]);

        $kamar->update($validated);

        return response()->json([
            'ok' => true,
            'message' => 'Kamar berhasil diperbarui',
            'data' => $kamar,
        ]);
    }

    public function apiDestroy(string $id)
    {
        $kamar = Kamar::where('kd_kamar', $id)->firstOrFail();

        $activeInapExists = \Illuminate\Support\Facades\DB::table('kamar_inap')
            ->where('kd_kamar', $kamar->kd_kamar)
            ->where('stts_pulang', '-')
            ->where(function ($w) {
                $w->whereNull('tgl_keluar')->orWhere('tgl_keluar', '0000-00-00');
            })
            ->exists();
        if ($kamar->status === 'ISI' || $activeInapExists) {
            return response()->json([
                'ok' => false,
                'message' => 'Tidak dapat menghapus kamar yang sedang dipakai rawat inap',
            ], 422);
        }

        \Illuminate\Support\Facades\DB::table('set_harga_kamar')->where('kd_kamar', $kamar->kd_kamar)->delete();
        \Illuminate\Support\Facades\DB::table('satu_sehat_mapping_lokasi_ranap')->where('kd_kamar', $kamar->kd_kamar)->delete();

        try {
            $kamar->delete();
        } catch (QueryException $e) {
            $sqlState = (string) ($e->errorInfo[0] ?? '');
            $driverCode = (int) ($e->errorInfo[1] ?? 0);
            if ($sqlState === '23000' && $driverCode === 1451) {
                $kamar->update([
                    'status' => 'KOSONG',
                    'statusdata' => '0',
                ]);

                return response()->json([
                    'ok' => true,
                    'message' => 'Kamar tidak bisa dihapus karena ada data terkait. Kamar dinonaktifkan.',
                    'data' => [
                        'kd_kamar' => $kamar->kd_kamar,
                        'status' => 'KOSONG',
                        'statusdata' => '0',
                    ],
                ]);
            }

            throw $e;
        }

        return response()->json([
            'ok' => true,
            'message' => 'Kamar berhasil dihapus',
        ]);
    }
}
