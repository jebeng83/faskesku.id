<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\Departemen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DepartemenController extends Controller
{
    /**
     * API: GET /api/departemen
     * Mengembalikan daftar departemen untuk kebutuhan mapping SATUSEHAT.
     * Query:
     *  - q: pencarian berdasarkan dep_id atau nama
     *  - start, limit: pagination sederhana
     */
    public function index(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $start = max(0, (int) $request->query('start', 0));
        $limit = max(1, min(500, (int) $request->query('limit', 25)));

        $query = DB::table('departemen')->select('dep_id', 'nama');

        if ($q !== '') {
            $query->where(function ($w) use ($q) {
                $w->where('dep_id', 'like', "%{$q}%")
                    ->orWhere('nama', 'like', "%{$q}%");
            });
        }

        $total = (clone $query)->count();
        $list = $query->orderBy('dep_id')->offset($start)->limit($limit)->get();

        return response()->json([
            'ok' => true,
            'total' => $total,
            'start' => $start,
            'limit' => $limit,
            'list' => $list,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dep_id' => 'required|string|max:4|unique:departemen,dep_id',
            'nama' => 'required|string|max:25',
        ], [
            'dep_id.required' => 'Kode Departemen harus diisi',
            'dep_id.unique' => 'Kode Departemen sudah digunakan',
            'dep_id.max' => 'Kode Departemen maksimal 4 karakter',
            'nama.required' => 'Nama Departemen harus diisi',
            'nama.max' => 'Nama Departemen maksimal 25 karakter',
        ]);

        if ($validator->fails()) {
            // Untuk request dari Inertia, return redirect back dengan errors
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }
            // Untuk request JSON biasa (non-Inertia)
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        $departemen = Departemen::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Departemen berhasil ditambahkan.')
                ->with('departemenCreated', [
                    'dep_id' => $departemen->dep_id,
                    'nama' => $departemen->nama,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Departemen berhasil ditambahkan.',
                'data' => $departemen,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Departemen berhasil ditambahkan.');
    }
}
