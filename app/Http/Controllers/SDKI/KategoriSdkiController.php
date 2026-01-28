<?php

namespace App\Http\Controllers\SDKI;

use App\Http\Controllers\Controller;
use App\Models\AsuhanKeperawatan\KategoriSdki;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

class KategoriSdkiController extends Controller
{
    protected function tableAvailable(): bool
    {
        return Schema::hasTable('kategori_sdki');
    }

    protected function getColumns(): array
    {
        try {
            $cols = Schema::getColumnListing('kategori_sdki');
            // Map kolom lama ke kolom baru untuk kompatibilitas
            $mapping = [
                'kd_kategori' => 'kode',
                'nm_kategori' => 'nama',
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
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel kategori_sdki tidak tersedia'], 404);
        }
        $q = strtolower(trim((string) $request->query('q', '')));
        $cols = $this->getColumns();
        $rows = KategoriSdki::query();
        if ($q !== '') {
            $rows->where(function ($x) use ($q, $cols) {
                // Cek kolom yang tersedia di database
                if (Schema::hasColumn('kategori_sdki', 'kd_kategori')) {
                    $x->orWhere('kd_kategori', 'like', '%'.$q.'%');
                } elseif (Schema::hasColumn('kategori_sdki', 'kode')) {
                    $x->orWhere('kode', 'like', '%'.$q.'%');
                }
                if (Schema::hasColumn('kategori_sdki', 'nm_kategori')) {
                    $x->orWhere('nm_kategori', 'like', '%'.$q.'%');
                } elseif (Schema::hasColumn('kategori_sdki', 'nama')) {
                    $x->orWhere('nama', 'like', '%'.$q.'%');
                }
                // Kolom opsional
                foreach (['label','slug','kategori'] as $c) {
                    if (Schema::hasColumn('kategori_sdki', $c)) {
                        $x->orWhere($c, 'like', '%'.$q.'%');
                    }
                }
            });
        }
        // Order by kolom yang tersedia
        if (Schema::hasColumn('kategori_sdki', 'kd_kategori')) {
            $rows->orderBy('kd_kategori');
        } elseif (Schema::hasColumn('kategori_sdki', 'kode')) {
            $rows->orderBy('kode');
        } elseif (Schema::hasColumn('kategori_sdki', 'nm_kategori')) {
            $rows->orderBy('nm_kategori');
        } elseif (Schema::hasColumn('kategori_sdki', 'nama')) {
            $rows->orderBy('nama');
        }
        $list = $rows->limit(500)->get();
        return response()->json(['data' => $list]);
    }

    public function store(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel kategori_sdki tidak tersedia'], 404);
        }
        $cols = $this->getColumns();
        // Tentukan kolom yang diizinkan berdasarkan struktur tabel yang ada
        $allowed = [];
        if (Schema::hasColumn('kategori_sdki', 'kd_kategori') || Schema::hasColumn('kategori_sdki', 'kode')) {
            $allowed[] = Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode';
        }
        if (Schema::hasColumn('kategori_sdki', 'nm_kategori') || Schema::hasColumn('kategori_sdki', 'nama')) {
            $allowed[] = Schema::hasColumn('kategori_sdki', 'nm_kategori') ? 'nm_kategori' : 'nama';
        }
        // Kolom opsional
        foreach (['label','slug','kategori'] as $c) {
            if (Schema::hasColumn('kategori_sdki', $c)) {
                $allowed[] = $c;
            }
        }
        // Juga terima input dengan nama kolom baru untuk mapping
        $allowedMap = [
            'kode' => Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode',
            'nama' => Schema::hasColumn('kategori_sdki', 'nm_kategori') ? 'nm_kategori' : 'nama',
        ];
        $incoming = [];
        $ct = strtolower((string) $request->header('Content-Type', ''));
        if (config('app.debug')) {
            try {
                Log::debug('KategoriSdkiController.store debug', [
                    'content_type' => $ct,
                    'raw_preview' => substr((string) $request->getContent(), 0, 256),
                    'all' => (array) $request->all(),
                    'query' => (array) $request->query(),
                    'headers' => $request->headers->all(),
                ]);
            } catch (\Throwable $e) {}
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
                $payload[$dbKey] = $inputKey === 'kode' ? strtoupper(trim((string) $v)) : trim((string) $v);
            }
        }
        // Proses kolom langsung yang ada di tabel
        foreach ($allowed as $k) {
            if (!isset($payload[$k])) {
                $v = $incoming[$k] ?? null;
                if ($v !== null) {
                    $payload[$k] = trim((string) $v);
                }
            }
        }
        if (empty($payload)) {
            return response()->json(['ok' => false, 'message' => 'payload kosong'], 422);
        }
        // Generate slug jika kolom slug ada dan belum diisi
        $namaCol = Schema::hasColumn('kategori_sdki', 'nm_kategori') ? 'nm_kategori' : 'nama';
        $kodeCol = Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode';
        
        if (Schema::hasColumn('kategori_sdki', 'slug') && (! isset($payload['slug']) || $payload['slug'] === '')) {
            $name = $payload[$namaCol] ?? '';
            if ($name !== '') {
                $slug = strtolower($name);
                $slug = preg_replace('/[^a-z0-9]+/i', '-', $slug);
                $slug = trim((string) $slug, '-');
                $payload['slug'] = $slug;
            }
        }
        // Cek duplikasi kode
        if (isset($payload[$kodeCol])) {
            $exists = KategoriSdki::where($kodeCol, $payload[$kodeCol])->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'kode sudah ada'], 409);
            }
        }
        // Cek duplikasi slug jika kolom ada
        if (Schema::hasColumn('kategori_sdki', 'slug') && isset($payload['slug'])) {
            $exists = KategoriSdki::where('slug', $payload['slug'])->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'slug sudah ada'], 409);
            }
        }
        $row = KategoriSdki::create($payload);
        return response()->json(['ok' => true, 'row' => $row], 201);
    }

    protected function findByIdOrKey($idOrKey): ?KategoriSdki
    {
        $kodeCol = Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode';
        $idCol = Schema::hasColumn('kategori_sdki', 'id') ? 'id' : $kodeCol;
        
        if (is_numeric($idOrKey) && Schema::hasColumn('kategori_sdki', 'id')) {
            return KategoriSdki::find((int) $idOrKey);
        }
        $key = trim((string) $idOrKey);
        // Cari berdasarkan kode
        $row = KategoriSdki::where($kodeCol, $key)->first();
        if ($row) return $row;
        // Cari berdasarkan slug jika kolom ada
        if (Schema::hasColumn('kategori_sdki', 'slug')) {
            return KategoriSdki::where('slug', $key)->first();
        }
        return null;
    }

    public function update(Request $request, $idOrKey)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel kategori_sdki tidak tersedia'], 404);
        }
        $row = $this->findByIdOrKey($idOrKey);
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'data tidak ditemukan'], 404);
        }
        $cols = $this->getColumns();
        // Tentukan kolom yang diizinkan berdasarkan struktur tabel yang ada
        $allowed = [];
        if (Schema::hasColumn('kategori_sdki', 'kd_kategori') || Schema::hasColumn('kategori_sdki', 'kode')) {
            $allowed[] = Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode';
        }
        if (Schema::hasColumn('kategori_sdki', 'nm_kategori') || Schema::hasColumn('kategori_sdki', 'nama')) {
            $allowed[] = Schema::hasColumn('kategori_sdki', 'nm_kategori') ? 'nm_kategori' : 'nama';
        }
        // Kolom opsional
        foreach (['label','slug','kategori'] as $c) {
            if (Schema::hasColumn('kategori_sdki', $c)) {
                $allowed[] = $c;
            }
        }
        // Juga terima input dengan nama kolom baru untuk mapping
        $allowedMap = [
            'kode' => Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode',
            'nama' => Schema::hasColumn('kategori_sdki', 'nm_kategori') ? 'nm_kategori' : 'nama',
        ];
        $incoming = [];
        $ct = strtolower((string) $request->header('Content-Type', ''));
        if (config('app.debug')) {
            try {
                Log::debug('KategoriSdkiController.update debug', [
                    'content_type' => $ct,
                    'raw_preview' => substr((string) $request->getContent(), 0, 256),
                    'all' => (array) $request->all(),
                    'query' => (array) $request->query(),
                    'headers' => $request->headers->all(),
                ]);
            } catch (\Throwable $e) {}
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
                $payload[$dbKey] = $inputKey === 'kode' ? strtoupper(trim((string) $v)) : trim((string) $v);
            }
        }
        // Proses kolom langsung yang ada di tabel
        foreach ($allowed as $k) {
            if (!isset($payload[$k])) {
                $v = $incoming[$k] ?? null;
                if ($v !== null) {
                    $payload[$k] = trim((string) $v);
                }
            }
        }
        // Cek duplikasi kode
        $kodeCol = Schema::hasColumn('kategori_sdki', 'kd_kategori') ? 'kd_kategori' : 'kode';
        $idCol = Schema::hasColumn('kategori_sdki', 'id') ? 'id' : $kodeCol;
        if (isset($payload[$kodeCol])) {
            $query = KategoriSdki::where($kodeCol, $payload[$kodeCol]);
            if (Schema::hasColumn('kategori_sdki', 'id')) {
                $query->where('id', '<>', $row->id);
            } else {
                $query->where($kodeCol, '<>', $row->{$kodeCol});
            }
            if ($query->exists()) {
                return response()->json(['ok' => false, 'message' => 'kode sudah ada'], 409);
            }
        }
        // Cek duplikasi slug jika kolom ada
        if (Schema::hasColumn('kategori_sdki', 'slug') && isset($payload['slug'])) {
            $query = KategoriSdki::where('slug', $payload['slug']);
            if (Schema::hasColumn('kategori_sdki', 'id')) {
                $query->where('id', '<>', $row->id);
            } else {
                $query->where($kodeCol, '<>', $row->{$kodeCol});
            }
            if ($query->exists()) {
                return response()->json(['ok' => false, 'message' => 'slug sudah ada'], 409);
            }
        }
        $row->fill($payload);
        $row->save();
        return response()->json(['ok' => true, 'row' => $row]);
    }

    public function destroy(Request $request, $idOrKey)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel kategori_sdki tidak tersedia'], 404);
        }
        $row = $this->findByIdOrKey($idOrKey);
        if (! $row) {
            return response()->json(['ok' => false, 'message' => 'data tidak ditemukan'], 404);
        }
        $ok = (bool) $row->delete();
        return response()->json(['ok' => $ok]);
    }
}
