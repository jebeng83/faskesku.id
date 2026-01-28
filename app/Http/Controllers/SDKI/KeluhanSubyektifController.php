<?php

namespace App\Http\Controllers\SDKI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeluhanSubyektifController extends Controller
{
    protected function tableAvailable(): bool
    {
        return Schema::hasTable('sdki_data_subyektif');
    }

    protected function getColumns(): array
    {
        try {
            return Schema::getColumnListing('sdki_data_subyektif');
        } catch (\Throwable $e) {
            return [];
        }
    }

    public function index(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki_data_subyektif tidak tersedia'], 404);
        }

        $kdSdki = trim((string) $request->query('kd_sdki', ''));
        $kdKategori = trim((string) $request->query('kd_kategori', ''));
        $kdSubkategori = trim((string) $request->query('kd_subkategori', ''));

        $cols = $this->getColumns();
        $rows = DB::table('sdki_data_subyektif');

        // Filter by kd_sdki jika ada
        if ($kdSdki !== '') {
            $rows->where('kd_sdki', $kdSdki);
        }

        // Filter by kd_kategori jika ada
        if ($kdKategori !== '') {
            $rows->where('kd_kategori', $kdKategori);
        }

        // Filter by kd_subkategori jika ada
        if ($kdSubkategori !== '') {
            $rows->where('kd_subkategori', $kdSubkategori);
        }

        $list = $rows->orderBy('kd_sub')->limit(500)->get();

        // Map kolom database ke format yang diharapkan frontend
        $list = $list->map(function ($item) {
            $array = (array) $item;
            // Tambahkan alias kolom untuk kompatibilitas
            if (isset($array['kd_sub']) && ! isset($array['kode'])) {
                $array['kode'] = $array['kd_sub'];
            }
            if (isset($array['kel_subyektif']) && ! isset($array['keluhan'])) {
                $array['keluhan'] = $array['kel_subyektif'];
            }

            return $array;
        });

        return response()->json(['data' => $list]);
    }

    public function store(Request $request)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki_data_subyektif tidak tersedia'], 404);
        }

        $cols = $this->getColumns();

        // Baca input dari berbagai sumber (JSON, form, query)
        $incoming = (array) $request->all();
        $ct = strtolower((string) $request->header('Content-Type', ''));

        // Jika kosong, coba baca langsung dari JSON body
        if (empty($incoming) && $ct !== '' && str_contains($ct, 'application/json')) {
            $raw = (string) $request->getContent();
            if (! empty($raw)) {
                $json = json_decode($raw, true);
                if (is_array($json) && json_last_error() === JSON_ERROR_NONE) {
                    $incoming = $json;
                }
            }
        }

        // Mapping kolom: dari input frontend ke kolom database
        $columnMap = [
            'kode' => Schema::hasColumn('sdki_data_subyektif', 'kd_sub') ? 'kd_sub' : null,
            'keluhan' => Schema::hasColumn('sdki_data_subyektif', 'kel_subyektif') ? 'kel_subyektif' : null,
        ];

        $data = [];
        $inputMap = [
            'kd_sdki' => (string) ($incoming['kd_sdki'] ?? $request->input('kd_sdki', '')),
            'kd_kategori' => (string) ($incoming['kd_kategori'] ?? $request->input('kd_kategori', '')),
            'kd_subkategori' => (string) ($incoming['kd_subkategori'] ?? $request->input('kd_subkategori', '')),
            'kode' => (string) ($incoming['kode'] ?? $request->input('kode', '')),
            'keluhan' => (string) ($incoming['keluhan'] ?? $request->input('keluhan', '')),
        ];

        // Validasi required fields
        if (empty($inputMap['kd_sdki']) || empty($inputMap['kode']) || empty($inputMap['keluhan'])) {
            return response()->json([
                'ok' => false,
                'message' => 'kd_sdki, kode, dan keluhan wajib diisi',
            ], 422);
        }

        // Set kolom yang diperlukan
        if (in_array('kd_sdki', $cols)) {
            $data['kd_sdki'] = $inputMap['kd_sdki'];
        }
        if (in_array('kd_kategori', $cols) && ! empty($inputMap['kd_kategori'])) {
            $data['kd_kategori'] = $inputMap['kd_kategori'];
        }
        if (in_array('kd_subkategori', $cols) && ! empty($inputMap['kd_subkategori'])) {
            $data['kd_subkategori'] = $inputMap['kd_subkategori'];
        }

        $kodeColumn = $columnMap['kode'];
        $keluhanColumn = $columnMap['keluhan'];

        if ($kodeColumn && in_array($kodeColumn, $cols)) {
            $data[$kodeColumn] = trim($inputMap['kode']);
        }
        if ($keluhanColumn && in_array($keluhanColumn, $cols)) {
            $data[$keluhanColumn] = trim($inputMap['keluhan']);
        }

        if (empty($data)) {
            return response()->json([
                'ok' => false,
                'message' => 'payload kosong atau tidak ada kolom yang sesuai',
            ], 422);
        }

        // Cek duplikasi kode untuk SDKI yang sama
        if ($kodeColumn && isset($data[$kodeColumn])) {
            $exists = DB::table('sdki_data_subyektif')
                ->where('kd_sdki', $data['kd_sdki'])
                ->where($kodeColumn, $data[$kodeColumn])
                ->exists();
            if ($exists) {
                return response()->json(['ok' => false, 'message' => 'kode sudah ada untuk SDKI ini'], 409);
            }
        }

        DB::table('sdki_data_subyektif')->insert($data);

        // Ambil data yang baru saja diinsert
        $row = DB::table('sdki_data_subyektif')
            ->where('kd_sdki', $data['kd_sdki'])
            ->where($kodeColumn, $data[$kodeColumn])
            ->first();

        // Map kolom untuk response
        if ($row) {
            $rowArray = (array) $row;
            if (isset($rowArray['kd_sub']) && ! isset($rowArray['kode'])) {
                $rowArray['kode'] = $rowArray['kd_sub'];
            }
            if (isset($rowArray['kel_subyektif']) && ! isset($rowArray['keluhan'])) {
                $rowArray['keluhan'] = $rowArray['kel_subyektif'];
            }
            $row = (object) $rowArray;
        }

        return response()->json(['ok' => true, 'row' => $row], 201);
    }

    public function update(Request $request, $id)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki_data_subyektif tidak tersedia'], 404);
        }

        $cols = $this->getColumns();
        $keyColumn = Schema::hasColumn('sdki_data_subyektif', 'kd_sub') ? 'kd_sub' : 'id';

        // Baca input
        $incoming = (array) $request->all();
        $ct = strtolower((string) $request->header('Content-Type', ''));

        if (empty($incoming) && $ct !== '' && str_contains($ct, 'application/json')) {
            $raw = (string) $request->getContent();
            if (! empty($raw)) {
                $json = json_decode($raw, true);
                if (is_array($json) && json_last_error() === JSON_ERROR_NONE) {
                    $incoming = $json;
                }
            }
        }

        $columnMap = [
            'kode' => Schema::hasColumn('sdki_data_subyektif', 'kd_sub') ? 'kd_sub' : null,
            'keluhan' => Schema::hasColumn('sdki_data_subyektif', 'kel_subyektif') ? 'kel_subyektif' : null,
        ];

        $payload = [];
        if ($columnMap['kode'] && in_array($columnMap['kode'], $cols)) {
            $v = $incoming['kode'] ?? $request->input('kode');
            if ($v !== null) {
                $payload[$columnMap['kode']] = trim((string) $v);
            }
        }
        if ($columnMap['keluhan'] && in_array($columnMap['keluhan'], $cols)) {
            $v = $incoming['keluhan'] ?? $request->input('keluhan');
            if ($v !== null) {
                $payload[$columnMap['keluhan']] = trim((string) $v);
            }
        }

        if (empty($payload)) {
            return response()->json(['ok' => false, 'message' => 'payload kosong'], 422);
        }

        // Cek duplikasi kode jika kode diubah
        if (isset($payload[$columnMap['kode']])) {
            $kdSdki = $incoming['kd_sdki'] ?? $request->input('kd_sdki', '');
            if ($kdSdki) {
                $exists = DB::table('sdki_data_subyektif')
                    ->where('kd_sdki', $kdSdki)
                    ->where($columnMap['kode'], $payload[$columnMap['kode']])
                    ->where($keyColumn, '<>', $id)
                    ->exists();
                if ($exists) {
                    return response()->json(['ok' => false, 'message' => 'kode sudah ada untuk SDKI ini'], 409);
                }
            }
        }

        $affected = DB::table('sdki_data_subyektif')
            ->where($keyColumn, $id)
            ->update($payload);

        $row = DB::table('sdki_data_subyektif')
            ->where($keyColumn, $id)
            ->first();

        // Map kolom untuk response
        if ($row) {
            $rowArray = (array) $row;
            if (isset($rowArray['kd_sub']) && ! isset($rowArray['kode'])) {
                $rowArray['kode'] = $rowArray['kd_sub'];
            }
            if (isset($rowArray['kel_subyektif']) && ! isset($rowArray['keluhan'])) {
                $rowArray['keluhan'] = $rowArray['kel_subyektif'];
            }
            $row = (object) $rowArray;
        }

        return response()->json(['ok' => $affected > 0, 'row' => $row]);
    }

    public function destroy(Request $request, $id)
    {
        if (! $this->tableAvailable()) {
            return response()->json(['ok' => false, 'message' => 'tabel sdki_data_subyektif tidak tersedia'], 404);
        }

        $keyColumn = Schema::hasColumn('sdki_data_subyektif', 'kd_sub') ? 'kd_sub' : 'id';

        $deleted = DB::table('sdki_data_subyektif')
            ->where($keyColumn, $id)
            ->delete();

        return response()->json(['ok' => $deleted > 0]);
    }
}
