<?php

namespace App\Http\Controllers\SDKI;

use App\Http\Controllers\Controller;
use App\Models\AsuhanKeperawatan\SubKategoriSdki;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class SubKategoriSdkiController extends Controller
{
    protected function tableAvailable(): bool
    {
        return Schema::hasTable('subkategori_sdki');
    }

    protected function getColumns(): array
    {
        try {
            $cols = Schema::getColumnListing('subkategori_sdki');
            // Map kolom lama ke kolom baru untuk kompatibilitas
            $mapping = [
                'kd_subkategori' => 'kode',
                'nm_subkategori' => 'nama',
                'kd_kategori' => 'kategori',
            ];
            $mapped = [];
            foreach ($cols as $col) {
                $mapped[] = $mapping[$col] ?? $col;
            }

            return array_unique(array_merge($cols, $mapped));
        } catch (\Throwable $e) {
            return [];
        }
    }

    public function index(Request $request)
    {
        try {
            if (! $this->tableAvailable()) {
                return response()->json(['ok' => false, 'message' => 'tabel subkategori_sdki tidak tersedia'], 404);
            }
        $q = strtolower(trim((string) $request->query('q', '')));
        $kategori = trim((string) $request->query('kategori', ''));
        $cols = $this->getColumns();
        $rows = SubKategoriSdki::query();
        
        // Gunakan join untuk memastikan nama kategori selalu tersedia
        $useJoin = false;
        if (Schema::hasTable('kategori_sdki') && Schema::hasColumn('subkategori_sdki', 'kd_kategori')) {
            $rows->leftJoin('kategori_sdki', 'subkategori_sdki.kd_kategori', '=', 'kategori_sdki.kd_kategori')
                 ->select('subkategori_sdki.*', 'kategori_sdki.nm_kategori as kategori_nm');
            $useJoin = true;
        } else {
            // Jika tidak bisa join, gunakan eager loading
            $rows->with('kategoriSdki');
        }

        // Filter by kategori jika ada
        if ($kategori !== '') {
            if (Schema::hasColumn('subkategori_sdki', 'kd_kategori')) {
                if ($useJoin) {
                    $rows->where('subkategori_sdki.kd_kategori', $kategori);
                } else {
                    $rows->where('kd_kategori', $kategori);
                }
            } elseif (Schema::hasColumn('subkategori_sdki', 'kategori')) {
                $rows->where('kategori', $kategori);
            }
        }

        if ($q !== '') {
            $rows->where(function ($x) use ($q, $useJoin) {
                // Cek kolom yang tersedia di database
                if (Schema::hasColumn('subkategori_sdki', 'kd_subkategori')) {
                    if ($useJoin) {
                        $x->orWhere('subkategori_sdki.kd_subkategori', 'like', '%'.$q.'%');
                    } else {
                        $x->orWhere('kd_subkategori', 'like', '%'.$q.'%');
                    }
                } elseif (Schema::hasColumn('subkategori_sdki', 'kode')) {
                    $x->orWhere('kode', 'like', '%'.$q.'%');
                }
                if (Schema::hasColumn('subkategori_sdki', 'nm_subkategori')) {
                    if ($useJoin) {
                        $x->orWhere('subkategori_sdki.nm_subkategori', 'like', '%'.$q.'%');
                    } else {
                        $x->orWhere('nm_subkategori', 'like', '%'.$q.'%');
                    }
                } elseif (Schema::hasColumn('subkategori_sdki', 'nama')) {
                    $x->orWhere('nama', 'like', '%'.$q.'%');
                }
                if (Schema::hasColumn('subkategori_sdki', 'kd_kategori')) {
                    if ($useJoin) {
                        $x->orWhere('subkategori_sdki.kd_kategori', 'like', '%'.$q.'%');
                    } else {
                        $x->orWhere('kd_kategori', 'like', '%'.$q.'%');
                    }
                }
            });
        }
        // Order by kolom yang tersedia
        if (Schema::hasColumn('subkategori_sdki', 'kd_kategori')) {
            if ($useJoin) {
                $rows->orderBy('subkategori_sdki.kd_kategori')->orderBy('subkategori_sdki.kd_subkategori');
            } else {
                $rows->orderBy('kd_kategori')->orderBy('kd_subkategori');
            }
        } elseif (Schema::hasColumn('subkategori_sdki', 'kategori')) {
            $rows->orderBy('kategori')->orderBy('kode');
        } else {
            if ($useJoin) {
                $rows->orderBy('subkategori_sdki.kd_subkategori');
            } else {
                $rows->orderBy('kd_subkategori');
            }
        }
        
        $list = $rows->limit(500)->get();
        
        // Pastikan setiap item memiliki kategori_nama
        $list = $list->map(function ($item) use ($useJoin) {
            try {
                // Jika menggunakan join, ambil attributes langsung dari model
                if ($useJoin) {
                    // Model masih Eloquent, tapi dengan kolom tambahan dari join
                    $array = array_merge(
                        $item->getAttributes(),
                        ['kategori_nm' => $item->getAttribute('kategori_nm')]
                    );
                    
                    // Jika kategori_nm sudah ada dari join
                    if (isset($array['kategori_nm'])) {
                        $array['kategori_nama'] = $array['kategori_nm'];
                    }
                    
                    // Pastikan kolom alias ada
                    if (isset($array['kd_subkategori']) && !isset($array['kode'])) {
                        $array['kode'] = $array['kd_subkategori'];
                    }
                    if (isset($array['nm_subkategori']) && !isset($array['nama'])) {
                        $array['nama'] = $array['nm_subkategori'];
                    }
                    if (isset($array['kd_kategori']) && !isset($array['kategori'])) {
                        $array['kategori'] = $array['kd_kategori'];
                    }
                    
                    return $array;
                } else {
                    // Jika tidak menggunakan join, gunakan toArray() dari model
                    $array = $item->toArray();
                    
                    // Jika kategori_nama belum ada, coba ambil dari relasi
                    if (!isset($array['kategori_nama']) && $item->relationLoaded('kategoriSdki') && $item->kategoriSdki) {
                        $array['kategori_nama'] = $item->kategoriSdki->nama ?? $item->kategoriSdki->nm_kategori ?? null;
                        $array['kategori_kode'] = $item->kategoriSdki->kode ?? $item->kategoriSdki->kd_kategori ?? null;
                    }
                    
                    return $array;
                }
            } catch (\Exception $e) {
                // Fallback jika ada error - gunakan getAttributes() atau toArray()
                try {
                    if (method_exists($item, 'getAttributes')) {
                        return $item->getAttributes();
                    }
                    if (method_exists($item, 'toArray')) {
                        return $item->toArray();
                    }
                    return (array) $item;
                } catch (\Exception $e2) {
                    return [];
                }
            }
        });

        return response()->json(['data' => $list]);
        } catch (\Exception $e) {
            Log::error('SubKategoriSdkiController.index error', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'ok' => false,
                'message' => 'Terjadi kesalahan saat memuat data subkategori: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel subkategori_sdki tidak tersedia'], 404);
        }
        $cols = $this->getColumns();
        // Tentukan kolom yang diizinkan berdasarkan struktur tabel yang ada
        $allowed = [];
        if (Schema::hasColumn('subkategori_sdki', 'kd_subkategori') || Schema::hasColumn('subkategori_sdki', 'kode')) {
            $allowed[] = Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode';
        }
        if (Schema::hasColumn('subkategori_sdki', 'nm_subkategori') || Schema::hasColumn('subkategori_sdki', 'nama')) {
            $allowed[] = Schema::hasColumn('subkategori_sdki', 'nm_subkategori') ? 'nm_subkategori' : 'nama';
        }
        if (Schema::hasColumn('subkategori_sdki', 'kd_kategori') || Schema::hasColumn('subkategori_sdki', 'kategori')) {
            $allowed[] = Schema::hasColumn('subkategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kategori';
        }

        // Juga terima input dengan nama kolom baru untuk mapping
        $allowedMap = [
            'kode' => Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode',
            'nama' => Schema::hasColumn('subkategori_sdki', 'nm_subkategori') ? 'nm_subkategori' : 'nama',
            'kategori' => Schema::hasColumn('subkategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kategori',
        ];
        $incoming = [];
        $ct = strtolower((string) $request->header('Content-Type', ''));
        if (config('app.debug')) {
            try {
                Log::debug('SubKategoriSdkiController.store debug', [
                    'content_type' => $ct,
                    'raw_preview' => substr((string) $request->getContent(), 0, 256),
                    'all' => (array) $request->all(),
                    'query' => (array) $request->query(),
                    'headers' => $request->headers->all(),
                ]);
            } catch (\Throwable $e) {
            }
        }
        if ($ct !== '' && str_contains($ct, 'application/json')) {
            $raw = (string) $request->getContent();
            $json = json_decode($raw, true);
            if (is_array($json)) {
                $incoming = $json;
            }
        }
        if (empty($incoming) && $ct !== '' && str_contains($ct, 'application/x-www-form-urlencoded')) {
            $raw = (string) $request->getContent();
            $form = [];
            parse_str($raw, $form);
            if (is_array($form)) {
                $incoming = $form;
            }
        }
        if (empty($incoming)) {
            $incoming = (array) $request->all();
        }
        if (! empty($request->query())) {
            $incoming = array_merge((array) $request->query(), $incoming);
        }
        $payload = [];
        // Proses input dengan mapping kolom
        foreach ($allowedMap as $inputKey => $dbKey) {
            $v = $incoming[$inputKey] ?? $incoming[$dbKey] ?? null;
            if ($v !== null) {
                $payload[$dbKey] = ($inputKey === 'kode' || $inputKey === 'kategori') ? strtoupper(trim((string) $v)) : trim((string) $v);
            }
        }
        // Proses kolom langsung yang ada di tabel
        foreach ($allowed as $k) {
            if (! isset($payload[$k])) {
                $v = $incoming[$k] ?? null;
                if ($v !== null) {
                    $payload[$k] = (in_array($k, ['kd_subkategori', 'kd_kategori', 'kode', 'kategori'])) ? strtoupper(trim((string) $v)) : trim((string) $v);
                }
            }
        }
        if (empty($payload)) {
            return response()->json(['ok' => false, 'message' => 'payload kosong'], 422);
        }

        // Validasi required fields
        $kodeCol = Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode';
        $namaCol = Schema::hasColumn('subkategori_sdki', 'nm_subkategori') ? 'nm_subkategori' : 'nama';
        $kategoriCol = Schema::hasColumn('subkategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kategori';

        if (! isset($payload[$kodeCol]) || $payload[$kodeCol] === '') {
            return response()->json(['ok' => false, 'message' => 'kode subkategori wajib diisi'], 422);
        }
        if (! isset($payload[$namaCol]) || $payload[$namaCol] === '') {
            return response()->json(['ok' => false, 'message' => 'nama subkategori wajib diisi'], 422);
        }
        if (! isset($payload[$kategoriCol]) || $payload[$kategoriCol] === '') {
            return response()->json(['ok' => false, 'message' => 'kode kategori wajib diisi'], 422);
        }

        // Cek duplikasi kode subkategori
        if (isset($payload[$kodeCol])) {
            $exists = SubKategoriSdki::where($kodeCol, $payload[$kodeCol])->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'kode subkategori sudah ada'], 409);
            }
        }

        $row = SubKategoriSdki::create($payload);

        return response()->json(['ok' => true, 'row' => $row], 201);
    }

    protected function findByIdOrKey($idOrKey): ?SubKategoriSdki
    {
        $kodeCol = Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode';

        if (is_numeric($idOrKey) && Schema::hasColumn('subkategori_sdki', 'id')) {
            return SubKategoriSdki::find((int) $idOrKey);
        }
        $key = trim((string) $idOrKey);

        // Cari berdasarkan kode subkategori
        return SubKategoriSdki::where($kodeCol, $key)->first();
    }

    public function update(Request $request, $idOrKey)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel subkategori_sdki tidak tersedia'], 404);
        }
        $row = $this->findByIdOrKey($idOrKey);
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'data tidak ditemukan'], 404);
        }
        $cols = $this->getColumns();
        // Tentukan kolom yang diizinkan berdasarkan struktur tabel yang ada
        $allowed = [];
        if (Schema::hasColumn('subkategori_sdki', 'kd_subkategori') || Schema::hasColumn('subkategori_sdki', 'kode')) {
            $allowed[] = Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode';
        }
        if (Schema::hasColumn('subkategori_sdki', 'nm_subkategori') || Schema::hasColumn('subkategori_sdki', 'nama')) {
            $allowed[] = Schema::hasColumn('subkategori_sdki', 'nm_subkategori') ? 'nm_subkategori' : 'nama';
        }
        if (Schema::hasColumn('subkategori_sdki', 'kd_kategori') || Schema::hasColumn('subkategori_sdki', 'kategori')) {
            $allowed[] = Schema::hasColumn('subkategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kategori';
        }

        // Juga terima input dengan nama kolom baru untuk mapping
        $allowedMap = [
            'kode' => Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode',
            'nama' => Schema::hasColumn('subkategori_sdki', 'nm_subkategori') ? 'nm_subkategori' : 'nama',
            'kategori' => Schema::hasColumn('subkategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kategori',
        ];
        $incoming = [];
        $ct = strtolower((string) $request->header('Content-Type', ''));
        if (config('app.debug')) {
            try {
                Log::debug('SubKategoriSdkiController.update debug', [
                    'content_type' => $ct,
                    'raw_preview' => substr((string) $request->getContent(), 0, 256),
                    'all' => (array) $request->all(),
                    'query' => (array) $request->query(),
                    'headers' => $request->headers->all(),
                ]);
            } catch (\Throwable $e) {
            }
        }
        if ($ct !== '' && str_contains($ct, 'application/json')) {
            $raw = (string) $request->getContent();
            $json = json_decode($raw, true);
            if (is_array($json)) {
                $incoming = $json;
            }
        }
        if (empty($incoming) && $ct !== '' && str_contains($ct, 'application/x-www-form-urlencoded')) {
            $raw = (string) $request->getContent();
            $form = [];
            parse_str($raw, $form);
            if (is_array($form)) {
                $incoming = $form;
            }
        }
        if (empty($incoming)) {
            $incoming = (array) $request->all();
        }
        if (! empty($request->query())) {
            $incoming = array_merge((array) $request->query(), $incoming);
        }
        $payload = [];
        // Proses input dengan mapping kolom
        foreach ($allowedMap as $inputKey => $dbKey) {
            $v = $incoming[$inputKey] ?? $incoming[$dbKey] ?? null;
            if ($v !== null) {
                $payload[$dbKey] = ($inputKey === 'kode' || $inputKey === 'kategori') ? strtoupper(trim((string) $v)) : trim((string) $v);
            }
        }
        // Proses kolom langsung yang ada di tabel
        foreach ($allowed as $k) {
            if (! isset($payload[$k])) {
                $v = $incoming[$k] ?? null;
                if ($v !== null) {
                    $payload[$k] = (in_array($k, ['kd_subkategori', 'kd_kategori', 'kode', 'kategori'])) ? strtoupper(trim((string) $v)) : trim((string) $v);
                }
            }
        }

        // Cek duplikasi kode subkategori
        $kodeCol = Schema::hasColumn('subkategori_sdki', 'kd_subkategori') ? 'kd_subkategori' : 'kode';
        if (isset($payload[$kodeCol])) {
            $query = SubKategoriSdki::where($kodeCol, $payload[$kodeCol]);
            $query->where($kodeCol, '<>', $row->{$kodeCol});
            if ($query->exists()) {
                return response()->json(['ok' => false, 'message' => 'kode subkategori sudah ada'], 409);
            }
        }

        $row->fill($payload);
        $row->save();

        return response()->json(['ok' => true, 'row' => $row]);
    }

    public function destroy(Request $request, $idOrKey)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel subkategori_sdki tidak tersedia'], 404);
        }
        $row = $this->findByIdOrKey($idOrKey);
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'data tidak ditemukan'], 404);
        }
        $ok = (bool) $row->delete();

        return response()->json(['ok' => $ok]);
    }
}
