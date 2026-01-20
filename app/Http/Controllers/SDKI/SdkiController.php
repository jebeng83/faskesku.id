<?php

namespace App\Http\Controllers\SDKI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class SdkiController extends Controller
{
    protected function tableAvailable(): bool
    {
        return Schema::hasTable('sdki');
    }

    protected function getColumns(): array
    {
        try {
            return Schema::getColumnListing('sdki');
        } catch (\Throwable $e) {
            return [];
        }
    }

    protected function normalizeKey(array $cols, $idOrKode): ?array
    {
        $id = (string) $idOrKode;
        if ($id !== '' && in_array('id', $cols) && ctype_digit(preg_replace('/\D/', '', $id))) {
            return ['col' => 'id', 'val' => $id];
        }
        foreach (['kode', 'code', 'kd', 'kd_sdki'] as $c) {
            if (in_array($c, $cols)) {
                return ['col' => $c, 'val' => $id];
            }
        }
        return null;
    }

    public function index(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki tidak tersedia'], 404);
        }
        $q = strtolower(trim((string) $request->query('q', '')));
        $cols = $this->getColumns();
        $selectCols = [];
        foreach (['id', 'kode', 'code', 'kd', 'kd_sdki', 'nama', 'nm_sdki', 'label', 'judul', 'kategori', 'kd_kategori', 'category', 'subkategori', 'kd_subkategori', 'subcategory', 'definisi', 'definisi_sdki', 'definition', 'created_at', 'updated_at'] as $c) {
            if (in_array($c, $cols)) {
                $selectCols[] = $c;
            }
        }
        $rows = DB::table('sdki')->select($selectCols ?: ['*']);
        if ($q !== '') {
            $rows->where(function ($x) use ($cols, $q) {
                foreach (['id', 'kode', 'code', 'kd', 'kd_sdki', 'nama', 'nm_sdki', 'label', 'judul', 'kategori', 'kd_kategori', 'category', 'subkategori', 'kd_subkategori', 'subcategory', 'definisi', 'definisi_sdki', 'definition'] as $c) {
                    if (in_array($c, $cols)) {
                        $x->orWhere($c, 'like', '%'.$q.'%');
                    }
                }
            });
        }
        $orderCol = in_array('kd_sdki', $cols) ? 'kd_sdki' : (in_array('kode', $cols) ? 'kode' : (in_array('nm_sdki', $cols) ? 'nm_sdki' : (in_array('nama', $cols) ? 'nama' : ($selectCols[0] ?? 'id'))));
        $list = $rows->orderBy($orderCol)->limit(500)->get();
        
        // Map kolom database ke format yang diharapkan frontend
        $list = $list->map(function ($item) {
            $array = (array) $item;
            // Tambahkan alias kolom untuk kompatibilitas
            if (isset($array['kd_sdki']) && !isset($array['kode'])) {
                $array['kode'] = $array['kd_sdki'];
            }
            if (isset($array['nm_sdki']) && !isset($array['nama'])) {
                $array['nama'] = $array['nm_sdki'];
            }
            if (isset($array['kd_kategori']) && !isset($array['kategori'])) {
                $array['kategori'] = $array['kd_kategori'];
            }
            if (isset($array['kd_subkategori']) && !isset($array['subkategori'])) {
                $array['subkategori'] = $array['kd_subkategori'];
            }
            if (isset($array['definisi_sdki']) && !isset($array['definisi'])) {
                $array['definisi'] = $array['definisi_sdki'];
            }
            return $array;
        });
        
        return response()->json(['data' => $list]);
    }

    public function store(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki tidak tersedia'], 404);
        }
        $cols = $this->getColumns();
        
        // Mapping kolom: dari input frontend ke kolom database
        $columnMap = [
            'kode' => Schema::hasColumn('sdki', 'kd_sdki') ? 'kd_sdki' : (Schema::hasColumn('sdki', 'kode') ? 'kode' : null),
            'nama' => Schema::hasColumn('sdki', 'nm_sdki') ? 'nm_sdki' : (Schema::hasColumn('sdki', 'nama') ? 'nama' : null),
            'kategori' => Schema::hasColumn('sdki', 'kd_kategori') ? 'kd_kategori' : (Schema::hasColumn('sdki', 'kategori') ? 'kategori' : null),
            'subkategori' => Schema::hasColumn('sdki', 'kd_subkategori') ? 'kd_subkategori' : (Schema::hasColumn('sdki', 'subkategori') ? 'subkategori' : null),
            'definisi' => Schema::hasColumn('sdki', 'definisi_sdki') ? 'definisi_sdki' : (Schema::hasColumn('sdki', 'definisi') ? 'definisi' : null),
        ];
        
        // Baca input dari berbagai sumber (JSON, form, query)
        $incoming = [];
        $ct = strtolower((string) $request->header('Content-Type', ''));
        
        if (config('app.debug')) {
            try {
                Log::debug('SdkiController.store debug', [
                    'content_type' => $ct,
                    'raw_preview' => substr((string) $request->getContent(), 0, 256),
                    'all' => (array) $request->all(),
                    'query' => (array) $request->query(),
                ]);
            } catch (\Throwable $e) {
            }
        }
        
        // Laravel secara otomatis memparse JSON jika Content-Type adalah application/json
        // Jadi kita bisa langsung menggunakan $request->all() atau $request->input()
        $incoming = (array) $request->all();
        
        // Jika kosong, coba baca langsung dari JSON body
        if (empty($incoming) && $ct !== '' && str_contains($ct, 'application/json')) {
            $raw = (string) $request->getContent();
            if (!empty($raw)) {
                $json = json_decode($raw, true);
                if (is_array($json) && json_last_error() === JSON_ERROR_NONE) {
                    $incoming = $json;
                }
            }
        }
        
        // Merge dengan query params jika ada
        if (! empty($request->query())) {
            $incoming = array_merge((array) $request->query(), $incoming);
        }
        
        // Ambil nilai dari $incoming atau langsung dari $request->input()
        $data = [];
        $inputMap = [
            'kode' => (string) ($incoming['kode'] ?? $request->input('kode', '')),
            'nama' => (string) ($incoming['nama'] ?? $request->input('nama', '')),
            'kategori' => (string) ($incoming['kategori'] ?? $request->input('kategori', '')),
            'subkategori' => (string) ($incoming['subkategori'] ?? $request->input('subkategori', '')),
            'definisi' => (string) ($incoming['definisi'] ?? $request->input('definisi', '')),
        ];
        
        if (config('app.debug')) {
            Log::debug('SdkiController.store inputMap', [
                'inputMap' => $inputMap,
                'incoming' => $incoming,
            ]);
        }
        
        foreach ($inputMap as $inputKey => $inputValue) {
            $dbColumn = $columnMap[$inputKey];
            if ($dbColumn && in_array($dbColumn, $cols)) {
                $value = trim($inputValue);
                if ($value !== '') {
                    $data[$dbColumn] = $inputKey === 'kode' ? strtoupper($value) : $value;
                }
            }
        }
        
        if (empty($data)) {
            if (config('app.debug')) {
                Log::debug('SdkiController.store empty data', [
                    'inputMap' => $inputMap,
                    'columnMap' => $columnMap,
                    'cols' => $cols,
                ]);
            }
            return response()->json([
                'ok' => false, 
                'message' => 'payload kosong atau tidak ada kolom yang sesuai',
                'debug' => config('app.debug') ? [
                    'inputMap' => $inputMap,
                    'columnMap' => $columnMap,
                    'cols' => $cols,
                ] : null
            ], 422);
        }
        // Cek duplikasi kode
        $kodeColumn = $columnMap['kode'];
        if ($kodeColumn && isset($data[$kodeColumn])) {
            $exists = DB::table('sdki')->where($kodeColumn, $data[$kodeColumn])->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'kode sudah ada'], 409);
            }
        }
        
        // Tambahkan timestamps jika ada
        if (in_array('created_at', $cols)) {
            $data['created_at'] = now();
        }
        if (in_array('updated_at', $cols)) {
            $data['updated_at'] = now();
        }
        
        DB::table('sdki')->insert($data);
        
        // Ambil data yang baru saja diinsert
        $rowQ = DB::table('sdki');
        if ($kodeColumn && isset($data[$kodeColumn])) {
            $rowQ = $rowQ->where($kodeColumn, $data[$kodeColumn]);
        } else {
            $rowQ = $rowQ->orderByDesc(in_array('id', $cols) ? 'id' : (in_array('updated_at', $cols) ? 'updated_at' : ($kodeColumn ?? 'kd_sdki')));
        }
        $row = $rowQ->first();
        return response()->json(['ok' => true, 'row' => $row], 201);
    }

    public function update(Request $request, $id)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki tidak tersedia'], 404);
        }
        $cols = $this->getColumns();
        $key = $this->normalizeKey($cols, $id);
        if (! $key) {
            return response()->json(['ok' => false, 'message' => 'kolom kunci tidak ditemukan'], 422);
        }
        $payload = [];
        foreach (['kode', 'nama', 'kategori', 'subkategori', 'definisi'] as $k) {
            if (in_array($k, $cols)) {
                $v = $request->input($k);
                if ($v !== null) {
                    $payload[$k] = $k === 'kode' ? strtoupper(trim((string) $v)) : trim((string) $v);
                }
            }
        }
        if (empty($payload)) {
            return response()->json(['ok' => false, 'message' => 'payload kosong'], 422);
        }
        if (isset($payload['kode']) && in_array('kode', $cols)) {
            $exists = DB::table('sdki')->where('kode', $payload['kode'])->where($key['col'], '<>', $key['val'])->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'kode sudah ada'], 409);
            }
        }
        if (in_array('updated_at', $cols)) {
            $payload['updated_at'] = now();
        }
        $affected = DB::table('sdki')->where($key['col'], $key['val'])->update($payload);
        $row = DB::table('sdki')->where($key['col'], $key['val'])->first();
        return response()->json(['ok' => $affected > 0, 'row' => $row]);
    }

    public function destroy(Request $request, $id)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki tidak tersedia'], 404);
        }
        $cols = $this->getColumns();
        $key = $this->normalizeKey($cols, $id);
        if (! $key) {
            return response()->json(['ok' => false, 'message' => 'kolom kunci tidak ditemukan'], 422);
        }
        $deleted = DB::table('sdki')->where($key['col'], $key['val'])->delete();
        return response()->json(['ok' => $deleted > 0]);
    }
}

