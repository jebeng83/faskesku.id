<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\AkunPiutang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AkunPiutangController extends Controller
{
    /**
     * Render halaman Akun Piutang (Inertia)
     */
    public function page()
    {
        return Inertia::render('Akutansi/AkunPiutang');
    }

    /**
     * List akun piutang dengan pencarian & paginasi
     */
    public function index(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = (int) $request->query('per_page', 20);
        $perPage = $perPage > 0 ? $perPage : 20;

        $query = AkunPiutang::query()
            ->leftJoin('rekening', 'akun_piutang.kd_rek', '=', 'rekening.kd_rek')
            ->leftJoin('penjab', 'akun_piutang.kd_pj', '=', 'penjab.kd_pj')
            ->select([
                'akun_piutang.nama_bayar',
                'akun_piutang.kd_rek',
                'akun_piutang.kd_pj',
                'rekening.nm_rek',
                'penjab.png_jawab',
            ]);

        if ($q !== '') {
            $query->where(function ($w) use ($q) {
                $like = '%'.$q.'%';
                $w->where('akun_piutang.nama_bayar', 'like', $like)
                    ->orWhere('akun_piutang.kd_rek', 'like', $like)
                    ->orWhere('rekening.nm_rek', 'like', $like)
                    ->orWhere('akun_piutang.kd_pj', 'like', $like)
                    ->orWhere('penjab.png_jawab', 'like', $like);
            });
        }

        $paginator = $query
            ->orderBy('akun_piutang.nama_bayar')
            ->paginate($perPage)
            ->appends($request->query());

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
            ],
        ]);
    }

    /**
     * Create akun piutang baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_bayar' => ['required', 'string', 'max:50', 'unique:akun_piutang,nama_bayar'],
            'kd_rek' => ['required', 'string', 'max:15', 'exists:rekening,kd_rek'],
            'kd_pj' => ['required', 'string', 'max:10', 'exists:penjab,kd_pj'],
        ]);

        $item = AkunPiutang::create($validated);

        return response()->json([
            'message' => 'Akun piutang berhasil dibuat',
            'item' => $item,
        ], 201);
    }

    /**
     * Update akun piutang
     */
    public function update(Request $request, string $nama_bayar)
    {
        $item = AkunPiutang::findOrFail($nama_bayar);

        $validated = $request->validate([
            'kd_rek' => ['required', 'string', 'max:15', 'exists:rekening,kd_rek'],
            'kd_pj' => ['required', 'string', 'max:10', 'exists:penjab,kd_pj'],
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'Akun piutang berhasil diperbarui',
            'item' => $item,
        ]);
    }

    /**
     * Hapus akun piutang
     */
    public function destroy(string $nama_bayar)
    {
        $item = AkunPiutang::findOrFail($nama_bayar);
        $item->delete();

        return response()->json([
            'message' => 'Akun piutang berhasil dihapus',
        ]);
    }
}
