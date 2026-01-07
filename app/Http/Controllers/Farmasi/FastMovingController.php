<?php

namespace App\Http\Controllers\Farmasi;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FastMovingController
{
    public function index(Request $request)
    {
        $period = (string) $request->query('period', 'week');
        $limit = (int) $request->query('limit', 10);
        if ($limit <= 0) {
            $limit = 10;
        }

        $now = Carbon::now();
        $periodKey = strtolower($period);
        $yearStart = $now->clone()->startOfYear();
        $monthStart = $now->clone()->startOfMonth();
        $monthEnd = $now->clone()->endOfMonth();
        $weekStart = $now->clone()->startOfWeek(Carbon::MONDAY);
        $weekEnd = $now->clone()->endOfWeek(Carbon::SUNDAY);

        $start = $weekStart;
        $end = $weekEnd;
        if ($periodKey === 'month') {
            $start = $monthStart;
            $end = $monthEnd;
        } elseif ($periodKey === '3m') {
            if ((int) $now->month <= 3) {
                $start = $yearStart;
            } else {
                $start = $now->clone()->subMonths(2)->startOfMonth();
            }
            $end = $monthEnd;
        } elseif ($periodKey === '6m') {
            if ((int) $now->month <= 6) {
                $start = $yearStart;
            } else {
                $start = $now->clone()->subMonths(5)->startOfMonth();
            }
            $end = $monthEnd;
        } elseif ($periodKey === 'year') {
            $start = $yearStart;
            $end = $now;
        } elseif ($periodKey === 'week') {
            $start = $weekStart;
            $end = $weekEnd;
        }

        $rows = DB::table('resep_dokter as rd')
            ->join('resep_obat as ro', 'ro.no_resep', '=', 'rd.no_resep')
            ->join('databarang as db', 'rd.kode_brng', '=', 'db.kode_brng')
            ->where('ro.tgl_peresepan', '<>', '0000-00-00')
            ->whereBetween('ro.tgl_peresepan', [$start->toDateString(), $end->toDateString()])
            ->groupBy('rd.kode_brng', 'db.nama_brng')
            ->select('rd.kode_brng', 'db.nama_brng', DB::raw('SUM(rd.jml) as jumlah'))
            ->orderByDesc('jumlah')
            ->limit($limit)
            ->get()
            ->map(function ($r) {
                return [
                    'kode_brng' => $r->kode_brng,
                    'nama_brng' => $r->nama_brng,
                    'jumlah' => (float) ($r->jumlah ?? 0),
                ];
            });

        return response()->json(['data' => $rows]);
    }
}
