<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
}
