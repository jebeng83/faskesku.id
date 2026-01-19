<?php

namespace App\Http\Controllers\SDKI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        foreach (['id', 'kode', 'code', 'kd', 'kd_sdki', 'nama', 'label', 'judul', 'kategori', 'category', 'subkategori', 'subcategory', 'definisi', 'definition', 'created_at', 'updated_at'] as $c) {
            if (in_array($c, $cols)) {
                $selectCols[] = $c;
            }
        }
        $rows = DB::table('sdki')->select($selectCols ?: ['*']);
        if ($q !== '') {
            $rows->where(function ($x) use ($cols, $q) {
                foreach (['id', 'kode', 'code', 'kd', 'kd_sdki', 'nama', 'label', 'judul', 'kategori', 'category', 'subkategori', 'subcategory', 'definisi', 'definition'] as $c) {
                    if (in_array($c, $cols)) {
                        $x->orWhere($c, 'like', '%'.$q.'%');
                    }
                }
            });
        }
        $orderCol = in_array('kode', $cols) ? 'kode' : (in_array('nama', $cols) ? 'nama' : ($selectCols[0] ?? 'id'));
        $list = $rows->orderBy($orderCol)->limit(500)->get();
        return response()->json(['data' => $list]);
    }

    public function store(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki tidak tersedia'], 404);
        }
        $cols = $this->getColumns();
        $data = [];
        $map = [
            'kode' => (string) $request->input('kode', ''),
            'nama' => (string) $request->input('nama', ''),
            'kategori' => (string) $request->input('kategori', ''),
            'subkategori' => (string) $request->input('subkategori', ''),
            'definisi' => (string) $request->input('definisi', ''),
        ];
        foreach ($map as $k => $v) {
            if (in_array($k, $cols)) {
                $data[$k] = $k === 'kode' ? strtoupper(trim($v)) : trim($v);
            }
        }
        if (empty($data)) {
            return response()->json(['ok' => false, 'message' => 'payload kosong'], 422);
        }
        if (isset($data['kode']) && in_array('kode', $cols)) {
            $exists = DB::table('sdki')->where('kode', $data['kode'])->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'kode sudah ada'], 409);
            }
        }
        if (in_array('created_at', $cols)) {
            $data['created_at'] = now();
        }
        if (in_array('updated_at', $cols)) {
            $data['updated_at'] = now();
        }
        DB::table('sdki')->insert($data);
        $rowQ = DB::table('sdki');
        if (isset($data['kode']) && in_array('kode', $cols)) {
            $rowQ = $rowQ->where('kode', $data['kode']);
        } else {
            $rowQ = $rowQ->orderByDesc(in_array('id', $cols) ? 'id' : (in_array('updated_at', $cols) ? 'updated_at' : 'id'));
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

