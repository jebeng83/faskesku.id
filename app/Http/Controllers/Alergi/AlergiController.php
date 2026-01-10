<?php

namespace App\Http\Controllers\Alergi;

use App\Http\Controllers\Controller;
use App\Models\Alergi\DataAlergi;
use App\Models\Alergi\JenisAlergi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlergiController extends Controller
{
    public function index(Request $request)
    {
        $kodeJenis = $request->query('kode_jenis');
        $q = DataAlergi::query();
        if ($kodeJenis) {
            $q->where('kode_jenis', $kodeJenis);
        }
        $search = $request->query('q');
        if ($search) {
            $q->where(function ($w) use ($search) {
                $w->where('kd_alergi', 'like', "%$search%")
                    ->orWhere('nm_alergi', 'like', "%$search%");
            });
        }
        $perPage = (int) $request->query('per_page', 20);
        $page = $q->orderBy('kd_alergi')->paginate($perPage);

        return response()->json([
            'data' => $page->items(),
            'pagination' => [
                'total' => $page->total(),
                'per_page' => $page->perPage(),
                'current_page' => $page->currentPage(),
                'last_page' => $page->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_alergi' => 'required|string|max:5',
            'nm_alergi' => 'required|string|max:100',
            'kode_jenis' => 'required|integer|exists:jenis_alergi,kode_jenis',
        ]);
        $kd = strtoupper(trim($validated['kd_alergi']));
        $nm = trim($validated['nm_alergi']);
        $kodeJenis = $validated['kode_jenis'];
        if (DataAlergi::query()->where('kd_alergi', $kd)->exists()) {
            return response()->json(['message' => 'kd_alergi sudah ada'], 409);
        }
        $model = DataAlergi::query()->create([
            'kd_alergi' => $kd,
            'nm_alergi' => $nm,
            'kode_jenis' => $kodeJenis,
        ]);

        return response()->json($model, 201);
    }

    public function update(Request $request, string $kd_alergi)
    {
        $model = DataAlergi::query()->find($kd_alergi);
        if (! $model) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $validated = $request->validate([
            'nm_alergi' => 'sometimes|required|string|max:100',
            'kode_jenis' => 'nullable|integer|exists:jenis_alergi,kode_jenis',
        ]);
        $update = [];
        if (array_key_exists('nm_alergi', $validated)) {
            $update['nm_alergi'] = trim($validated['nm_alergi']);
        }
        $kodeJenis = $validated['kode_jenis'] ?? null;
        if ($kodeJenis) {
            $update['kode_jenis'] = $kodeJenis;
        }
        $model->update($update);

        return response()->json($model);
    }

    public function destroy(string $kd_alergi)
    {
        $model = DataAlergi::query()->find($kd_alergi);
        if (! $model) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $model->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function jenisIndex(Request $request)
    {
        $q = JenisAlergi::query();
        $search = $request->query('q');
        if ($search) {
            $q->where('nama_jenis', 'like', "%$search%");
        }
        $perPage = (int) $request->query('per_page', 20);
        $page = $q->orderBy('kode_jenis')->paginate($perPage);

        return response()->json([
            'data' => $page->items(),
            'pagination' => [
                'total' => $page->total(),
                'per_page' => $page->perPage(),
                'current_page' => $page->currentPage(),
                'last_page' => $page->lastPage(),
            ],
        ]);
    }

    public function jenisStore(Request $request)
    {
        $validated = $request->validate([
            'nama_jenis' => 'required|string|max:100',
        ]);
        $model = JenisAlergi::query()->create([
            'nama_jenis' => trim($validated['nama_jenis']),
        ]);

        return response()->json($model, 201);
    }

    public function jenisUpdate(Request $request, int $kode_jenis)
    {
        $model = JenisAlergi::query()->find($kode_jenis);
        if (! $model) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $validated = $request->validate([
            'nama_jenis' => 'sometimes|required|string|max:100',
        ]);
        $update = [];
        if (array_key_exists('nama_jenis', $validated)) {
            $update['nama_jenis'] = trim($validated['nama_jenis']);
        }
        $model->update($update);

        return response()->json($model);
    }

    public function jenisDestroy(int $kode_jenis)
    {
        $model = JenisAlergi::query()->find($kode_jenis);
        if (! $model) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $hasChildren = DataAlergi::query()->where('kode_jenis', $kode_jenis)->exists();
        if ($hasChildren) {
            return response()->json(['message' => 'Tidak dapat menghapus: masih ada data alergi'], 409);
        }
        $model->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function nextCode(Request $request)
    {
        $latest = DB::table('data_alergi')
            ->select('kd_alergi')
            ->whereRaw('kd_alergi REGEXP "^[0-9]{1,5}$"')
            ->orderByRaw('CAST(kd_alergi AS UNSIGNED) DESC')
            ->first();

        $lastNumber = 0;
        if ($latest && preg_match('/^([0-9]{1,5})$/', (string) $latest->kd_alergi, $m)) {
            $lastNumber = (int) $m[1];
        }

        $nextNumber = $lastNumber + 1;
        $nextCode = str_pad((string) $nextNumber, 5, '0', STR_PAD_LEFT);
        $lastCode = $lastNumber > 0 ? str_pad((string) $lastNumber, 5, '0', STR_PAD_LEFT) : null;

        return response()->json([
            'last_number' => $lastNumber,
            'last_code' => $lastCode,
            'next_code' => $nextCode,
        ]);
    }

    /**
     * Ambil alergi pasien berdasarkan no_rkm_medis
     */
    public function getAlergiPasien(Request $request)
    {
        $noRkmMedis = $request->query('no_rkm_medis');
        if (! $noRkmMedis) {
            return response()->json(['message' => 'no_rkm_medis required'], 400);
        }

        $alergiPasien = DB::table('alergi_pasien')
            ->join('data_alergi', 'alergi_pasien.kd_alergi', '=', 'data_alergi.kd_alergi')
            ->join('jenis_alergi', 'alergi_pasien.kode_jenis', '=', 'jenis_alergi.kode_jenis')
            ->where('alergi_pasien.no_rkm_medis', $noRkmMedis)
            ->select(
                'alergi_pasien.no_rkm_medis',
                'alergi_pasien.kode_jenis',
                'alergi_pasien.kd_alergi',
                'data_alergi.nm_alergi',
                'jenis_alergi.nama_jenis'
            )
            ->orderBy('alergi_pasien.kode_jenis')
            ->orderBy('data_alergi.nm_alergi')
            ->get();

        return response()->json([
            'data' => $alergiPasien,
        ]);
    }
}
