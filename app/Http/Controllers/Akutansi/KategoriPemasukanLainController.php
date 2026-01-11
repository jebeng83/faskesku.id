<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriPemasukanLainController extends Controller
{
    public function index()
    {
        if (! Schema::hasTable('kategori_pemasukan_lain')) {
            return response()->json(['data' => []]);
        }

        $rows = DB::table('kategori_pemasukan_lain')
            ->select('kode_kategori', 'nama_kategori')
            ->orderBy('nama_kategori')
            ->get();

        return response()->json(['data' => $rows]);
    }

    public function store(Request $request)
    {
        if (! Schema::hasTable('kategori_pemasukan_lain')) {
            return response()->json(['message' => 'Tabel tidak tersedia'], 400);
        }

        $validated = $request->validate([
            'kode_kategori' => ['required', 'string', 'max:20'],
            'nama_kategori' => ['required', 'string', 'max:100'],
        ]);

        $exists = DB::table('kategori_pemasukan_lain')
            ->where('kode_kategori', $validated['kode_kategori'])
            ->exists();

        if ($exists) {
            DB::table('kategori_pemasukan_lain')
                ->where('kode_kategori', $validated['kode_kategori'])
                ->update(['nama_kategori' => $validated['nama_kategori']]);

            return response()->json([
                'data' => [
                    'kode_kategori' => $validated['kode_kategori'],
                    'nama_kategori' => $validated['nama_kategori'],
                ],
                'updated' => true,
            ], 200);
        }

        DB::table('kategori_pemasukan_lain')->insert([
            'kode_kategori' => $validated['kode_kategori'],
            'nama_kategori' => $validated['nama_kategori'],
        ]);

        return response()->json([
            'data' => [
                'kode_kategori' => $validated['kode_kategori'],
                'nama_kategori' => $validated['nama_kategori'],
            ],
            'created' => true,
        ], 201);
    }

    public function generateKode()
    {
        if (! Schema::hasTable('kategori_pemasukan_lain')) {
            return response()->json(['kode' => '01']);
        }

        $rows = DB::table('kategori_pemasukan_lain')->select('kode_kategori')->get();
        $max = 0;
        foreach ($rows as $r) {
            $raw = (string) ($r->kode_kategori ?? '');
            $digits = preg_replace('/[^0-9]/', '', $raw);
            if ($digits === '') continue;
            $n = (int) $digits;
            if ($n > $max) $max = $n;
        }
        $next = $max + 1;
        // Cari kode yang belum dipakai; increment jika bentrok
        while (DB::table('kategori_pemasukan_lain')->where('kode_kategori', str_pad((string) $next, 2, '0', STR_PAD_LEFT))->exists()) {
            $next++;
        }
        $kode = str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        return response()->json(['kode' => $kode]);
    }
}
