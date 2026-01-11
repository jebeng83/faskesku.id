<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class KategoriPengeluaranHarianController extends Controller
{
    public function index(Request $request)
    {
        if (! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['data' => []]);
        }

        $q = (string) $request->query('q', '');

        $query = DB::table('kategori_pengeluaran_harian')
            ->select('kode_kategori', 'nama_kategori', 'kd_rek', 'kd_rek2')
            ->orderBy('nama_kategori');

        if ($q !== '') {
            $query->where(function ($w) use ($q) {
                $w->where('kode_kategori', 'like', "%{$q}%")
                    ->orWhere('nama_kategori', 'like', "%{$q}%");
            });
        }

        $rows = $query->get();

        return response()->json(['data' => $rows]);
    }

    public function nextCode(Request $request)
    {
        if (! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['success' => false, 'message' => 'Tabel kategori_pengeluaran_harian tidak tersedia'], 404);
        }

        $max = DB::table('kategori_pengeluaran_harian')
            ->whereRaw("kode_kategori REGEXP '^[0-9]+$'")
            ->select(DB::raw('MAX(CAST(kode_kategori AS UNSIGNED)) as maxnum'))
            ->value('maxnum');

        $next = (int) ($max ?: 0) + 1;
        $kode = str_pad((string) $next, 3, '0', STR_PAD_LEFT);

        return response()->json(['success' => true, 'kode' => $kode]);
    }

    public function store(Request $request)
    {
        if (! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['success' => false, 'message' => 'Tabel kategori_pengeluaran_harian tidak tersedia'], 404);
        }

        $data = $request->validate([
            'kode_kategori' => ['required', 'string', 'max:5', Rule::unique('kategori_pengeluaran_harian', 'kode_kategori')],
            'nama_kategori' => ['nullable', 'string', 'max:40'],
            'kd_rek' => ['required', 'string', 'max:15', Rule::exists('rekening', 'kd_rek')],
            'kd_rek2' => ['required', 'string', 'max:15', Rule::exists('rekening', 'kd_rek')],
        ]);

        DB::table('kategori_pengeluaran_harian')->insert($data);

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function update(Request $request, string $kode)
    {
        if (! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['success' => false, 'message' => 'Tabel kategori_pengeluaran_harian tidak tersedia'], 404);
        }

        $exists = DB::table('kategori_pengeluaran_harian')->where('kode_kategori', $kode)->exists();
        if (! $exists) {
            return response()->json(['success' => false, 'message' => 'Kategori tidak ditemukan'], 404);
        }

        $data = $request->validate([
            'nama_kategori' => ['nullable', 'string', 'max:40'],
            'kd_rek' => ['required', 'string', 'max:15', Rule::exists('rekening', 'kd_rek')],
            'kd_rek2' => ['required', 'string', 'max:15', Rule::exists('rekening', 'kd_rek')],
        ]);

        DB::table('kategori_pengeluaran_harian')->where('kode_kategori', $kode)->update($data);

        return response()->json(['success' => true, 'data' => array_merge(['kode_kategori' => $kode], $data)]);
    }

    public function destroy(string $kode)
    {
        if (! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['success' => false, 'message' => 'Tabel kategori_pengeluaran_harian tidak tersedia'], 404);
        }

        $used = Schema::hasTable('pengeluaran_harian') && DB::table('pengeluaran_harian')->where('kode_kategori', $kode)->exists();
        if ($used) {
            return response()->json(['success' => false, 'message' => 'Kategori sedang digunakan dan tidak dapat dihapus'], 422);
        }

        $deleted = DB::table('kategori_pengeluaran_harian')->where('kode_kategori', $kode)->delete();
        if (! $deleted) {
            return response()->json(['success' => false, 'message' => 'Kategori tidak ditemukan'], 404);
        }

        return response()->json(['success' => true]);
    }
}
