<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SetHargaKamarController extends Controller
{
    public function apiIndex(Request $request)
    {
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 50)));
        $q = trim((string) $request->query('q', ''));
        $kd_bangsal = trim((string) $request->query('kd_bangsal', ''));
        $kd_pj = trim((string) $request->query('kd_pj', ''));
        $kd_kamar = trim((string) $request->query('kd_kamar', ''));

        $tbl = DB::table('set_harga_kamar as shk')
            ->leftJoin('kamar as k', function ($join) {
                $join->on(DB::raw('trim(k.kd_kamar)'), '=', DB::raw('trim(shk.kd_kamar)'));
            })
            ->leftJoin('bangsal as b', 'b.kd_bangsal', '=', 'k.kd_bangsal')
            ->leftJoin('penjab as pj', function ($join) {
                $join->on(DB::raw('trim(pj.kd_pj)'), '=', DB::raw('trim(shk.kd_pj)'));
            })
            ->select([
                'shk.kd_kamar',
                'shk.kd_pj',
                'shk.tarif',
                'k.kd_bangsal',
                DB::raw('b.nm_bangsal as nm_bangsal'),
                DB::raw('pj.png_jawab as nm_penjamin'),
            ]);

        if ($kd_bangsal !== '') {
            $tbl->where('k.kd_bangsal', $kd_bangsal);
        }
        if ($kd_pj !== '') {
            $tbl->where('shk.kd_pj', $kd_pj);
        }
        if ($kd_kamar !== '') {
            $tbl->where('shk.kd_kamar', $kd_kamar);
        }
        if ($q !== '') {
            $tbl->where(function ($w) use ($q) {
                $w->where('shk.kd_kamar', 'like', "%{$q}%")
                    ->orWhere('shk.kd_pj', 'like', "%{$q}%")
                    ->orWhere('b.nm_bangsal', 'like', "%{$q}%")
                    ->orWhere('pj.png_jawab', 'like', "%{$q}%");
            });
        }

        $total = (clone $tbl)->count();
        $rows = $tbl
            ->orderBy('k.kd_bangsal')
            ->orderBy('shk.kd_kamar')
            ->orderBy('shk.kd_pj')
            ->offset($start)
            ->limit($limit)
            ->get();

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
            'kd_kamar' => 'required|string|max:15|exists:kamar,kd_kamar',
            'kd_pj' => 'required|string|max:3|exists:penjab,kd_pj',
            'tarif' => 'required|numeric|min:0',
        ]);

        $exists = DB::table('set_harga_kamar')
            ->where('kd_kamar', $validated['kd_kamar'])
            ->where('kd_pj', $validated['kd_pj'])
            ->exists();

        DB::table('set_harga_kamar')->updateOrInsert(
            ['kd_kamar' => $validated['kd_kamar'], 'kd_pj' => $validated['kd_pj']],
            ['tarif' => (float) $validated['tarif']]
        );

        return response()->json([
            'ok' => true,
            'message' => $exists ? 'Set harga kamar berhasil diperbarui' : 'Set harga kamar berhasil ditambahkan',
        ], $exists ? 200 : 201);
    }

    public function apiUpdate(Request $request, string $kd_kamar, string $kd_pj)
    {
        $validated = $request->validate([
            'tarif' => 'required|numeric|min:0',
        ]);

        $q = DB::table('set_harga_kamar')
            ->where('kd_kamar', $kd_kamar)
            ->where('kd_pj', $kd_pj);

        if (! $q->exists()) {
            return response()->json([
                'ok' => false,
                'message' => 'Data set harga kamar tidak ditemukan',
            ], 404);
        }

        $q->update(['tarif' => (float) $validated['tarif']]);

        return response()->json([
            'ok' => true,
            'message' => 'Set harga kamar berhasil diperbarui',
        ]);
    }

    public function apiDestroy(string $kd_kamar, string $kd_pj)
    {
        $q = DB::table('set_harga_kamar')
            ->where('kd_kamar', $kd_kamar)
            ->where('kd_pj', $kd_pj);

        if (! $q->exists()) {
            return response()->json([
                'ok' => false,
                'message' => 'Data set harga kamar tidak ditemukan',
            ], 404);
        }

        $q->delete();

        return response()->json([
            'ok' => true,
            'message' => 'Set harga kamar berhasil dihapus',
        ]);
    }
}
