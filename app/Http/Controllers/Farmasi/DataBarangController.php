<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DataBarangController extends Controller
{
    public function index(Request $request)
    {
        $q = (string) $request->get('q', '');
        $perPage = (int) $request->get('perPage', 10);

        $itemsQuery = DB::table('databarang')
            ->select([
                'kode_brng', 'nama_brng', 'kode_sat', 'kode_satbesar',
                'dasar', 'h_beli',
                'ralan', 'kelas1', 'kelas2', 'kelas3', 'utama', 'vip', 'vvip', 'beliluar', 'jualbebas', 'karyawan',
                'stokminimal', 'status', 'letak_barang', 'isi', 'kapasitas', 'kdjns', 'expire',
                'kode_industri', 'kode_kategori', 'kode_golongan'
            ])
            ->when($q, function ($query) use ($q) {
                $query->where(function ($q2) use ($q) {
                    $q2->where('kode_brng', 'like', "%$q%")
                        ->orWhere('nama_brng', 'like', "%$q%")
                        ->orWhere('kode_sat', 'like', "%$q%");
                });
            })
            ->orderBy('kode_brng', 'asc');

        // If client expects JSON (selector/autocomplete), return lightweight list
        if ($request->wantsJson()) {
            $items = $itemsQuery->limit(50)->get();
            return response()->json([
                'items' => $items,
                'filters' => [ 'q' => $q, 'perPage' => $perPage ],
            ]);
        }

        $items = $itemsQuery->paginate($perPage)->withQueryString();
        $nextCode = $this->generateNextCode();

        return Inertia::render('farmasi/dataobat', [
            'items' => $items,
            'filters' => [
                'q' => $q,
                'perPage' => $perPage,
            ],
            'nextCode' => $nextCode,
        ]);
    }

    private function generateNextCode(): string
    {
        $latest = DB::table('databarang')->select('kode_brng')->orderBy('kode_brng', 'desc')->first();
        if (!$latest || empty($latest->kode_brng)) {
            return 'B0001';
        }
        $code = (string) $latest->kode_brng;
        if (preg_match('/^([A-Za-z]*)(\d+)$/', $code, $m)) {
            $prefix = $m[1] ?? '';
            $numStr = $m[2] ?? '0';
            $num = (int) $numStr;
            $width = strlen($numStr);
            return $prefix . str_pad($num + 1, $width, '0', STR_PAD_LEFT);
        }
        if (preg_match('/(\d+)\s*$/', $code, $m)) {
            $numStr = $m[1] ?? '0';
            $num = (int) $numStr;
            $width = strlen($numStr);
            $prefix = preg_replace('/\d+$/', '', $code) ?? '';
            return ($prefix ?: 'B') . str_pad($num + 1, $width, '0', STR_PAD_LEFT);
        }
        return 'B0001';
    }

    public function store(Request $request)
    {
        $payload = $request->all();
        if (empty($payload['kode_brng'])) {
            $payload['kode_brng'] = $this->generateNextCode();
        }
        // Default values for required non-nullable columns
        $payload['kode_satbesar'] = $payload['kode_satbesar'] ?? 'UNIT';
        $payload['dasar'] = isset($payload['dasar']) ? (float) $payload['dasar'] : 0;
        $payload['isi'] = isset($payload['isi']) ? (float) $payload['isi'] : 1;
        $payload['kapasitas'] = isset($payload['kapasitas']) ? (float) $payload['kapasitas'] : 0;
        $payload['status'] = $payload['status'] ?? '1';
        $payload['letak_barang'] = $payload['letak_barang'] ?? 'Apotek';

        $validated = $request->validate([
            'kode_brng' => 'required|string|max:15|unique:databarang,kode_brng',
            'nama_brng' => 'required|string|max:80',
            'kode_sat' => 'nullable|string|max:4',
            'kode_satbesar' => 'required|string|max:4',
            'dasar' => 'required|numeric',
            'h_beli' => 'nullable|numeric',
            'ralan' => 'nullable|numeric',
            'kelas1' => 'nullable|numeric',
            'kelas2' => 'nullable|numeric',
            'kelas3' => 'nullable|numeric',
            'utama' => 'nullable|numeric',
            'vip' => 'nullable|numeric',
            'vvip' => 'nullable|numeric',
            'beliluar' => 'nullable|numeric',
            'jualbebas' => 'nullable|numeric',
            'karyawan' => 'nullable|numeric',
            'isi' => 'required|numeric',
            'kapasitas' => 'required|numeric',
            'status' => 'required|in:0,1',
            'letak_barang' => 'nullable|string|max:100',
            'stokminimal' => 'nullable|numeric',
            'kdjns' => 'nullable|string|max:4',
            'expire' => 'nullable|date',
            'kode_industri' => 'nullable|string|max:5',
            'kode_kategori' => 'nullable|string|max:4',
            'kode_golongan' => 'nullable|string|max:4',
        ], [], [
            'kode_brng' => 'Kode Barang',
            'nama_brng' => 'Nama Barang',
        ]);

        DB::table('databarang')->insert($validated);

        return redirect()->route('farmasi.data-obat')->with('success', 'Data obat berhasil ditambahkan.');
    }

    public function update(Request $request, string $kode_brng)
    {
        $validated = $request->validate([
            'nama_brng' => 'required|string|max:80',
            'kode_sat' => 'nullable|string|max:4',
            'kode_satbesar' => 'required|string|max:4',
            'dasar' => 'required|numeric',
            'h_beli' => 'nullable|numeric',
            'ralan' => 'nullable|numeric',
            'kelas1' => 'nullable|numeric',
            'kelas2' => 'nullable|numeric',
            'kelas3' => 'nullable|numeric',
            'utama' => 'nullable|numeric',
            'vip' => 'nullable|numeric',
            'vvip' => 'nullable|numeric',
            'beliluar' => 'nullable|numeric',
            'jualbebas' => 'nullable|numeric',
            'karyawan' => 'nullable|numeric',
            'isi' => 'required|numeric',
            'kapasitas' => 'required|numeric',
            'status' => 'required|in:0,1',
            'letak_barang' => 'nullable|string|max:100',
            'stokminimal' => 'nullable|numeric',
            'kdjns' => 'nullable|string|max:4',
            'expire' => 'nullable|date',
            'kode_industri' => 'nullable|string|max:5',
            'kode_kategori' => 'nullable|string|max:4',
            'kode_golongan' => 'nullable|string|max:4',
        ]);

        DB::table('databarang')->where('kode_brng', $kode_brng)->update($validated);

        return redirect()->route('farmasi.data-obat')->with('success', 'Data obat berhasil diperbarui.');
    }

    public function destroy(string $kode_brng)
    {
        DB::table('databarang')->where('kode_brng', $kode_brng)->delete();
        return redirect()->route('farmasi.data-obat')->with('success', 'Data obat berhasil dihapus.');
}
}