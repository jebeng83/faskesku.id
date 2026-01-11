<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CashFlowController extends Controller
{
    /**
     * Inertia page for Cash Flow.
     */
    public function page(): InertiaResponse
    {
        return Inertia::render('Akutansi/CashFlow');
    }

    /**
     * Cash flow aggregation based on jurnal, detailjurnal, rekening, and rekeningtahun.
     */
    public function index(Request $request): JsonResponse
    {
        $from = (string) $request->query('from', '');
        $to = (string) $request->query('to', '');

        $fromDate = $from !== '' ? $from : date('Y-m-d');
        $toDate = $to !== '' ? $to : date('Y-m-d');
        $fromYear = (int) substr($fromDate, 0, 4);
        $toYear = (int) substr($toDate, 0, 4);

        // Kas Awal: saldo awal akun Kas/Bank (Neraca, balance = D), dijumlahkan per akun dalam rentang tahun
        $kasAwalItems = DB::table('rekening')
            ->join('rekeningtahun', 'rekeningtahun.kd_rek', '=', 'rekening.kd_rek')
            ->where('rekening.tipe', 'N')
            ->where('rekening.balance', 'D')
            ->where(function ($w) {
                $w->where('rekening.nm_rek', 'like', '%KAS%')
                  ->orWhere('rekening.nm_rek', 'like', '%BANK%')
                  ->orWhere('rekening.kd_rek', 'like', '11%');
            })
            ->whereBetween('rekeningtahun.thn', [$fromYear, $toYear])
            ->select('rekening.kd_rek', 'rekening.nm_rek', DB::raw('SUM(rekeningtahun.saldo_awal) AS amount'))
            ->groupBy('rekening.kd_rek', 'rekening.nm_rek')
            ->orderBy('rekening.kd_rek')
            ->get();

        $totalKasAwal = (float) ($kasAwalItems->sum('amount'));

        $pendapatanSaldoAwal = DB::table('rekening')
            ->join('rekeningtahun', 'rekeningtahun.kd_rek', '=', 'rekening.kd_rek')
            ->where(function ($w) {
                $w->where('rekening.nm_rek', 'like', '%PENDAPATAN%')
                  ->orWhere('rekening.kd_rek', 'like', '41%')
                  ->orWhere('rekening.kd_rek', 'like', '42%')
                  ->orWhere('rekening.kd_rek', 'like', '43%');
            })
            ->whereBetween('rekeningtahun.thn', [$fromYear, $toYear])
            ->select('rekening.kd_rek', 'rekening.nm_rek', DB::raw('SUM(rekeningtahun.saldo_awal) AS amount'))
            ->groupBy('rekening.kd_rek', 'rekening.nm_rek')
            ->orderBy('rekening.kd_rek')
            ->get();

        $pendapatanSaldoMap = [];
        foreach ($pendapatanSaldoAwal as $r) {
            $pendapatanSaldoMap[(string) ($r->kd_rek ?? '')] = (float) ($r->amount ?? 0);
        }

        $pendapatanMovements = DB::table('jurnal')
            ->join('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->join('rekening', 'rekening.kd_rek', '=', 'detailjurnal.kd_rek')
            ->where(function ($w) {
                $w->where('rekening.nm_rek', 'like', '%PENDAPATAN%')
                  ->orWhere('rekening.kd_rek', 'like', '41%')
                  ->orWhere('rekening.kd_rek', 'like', '42%')
                  ->orWhere('rekening.kd_rek', 'like', '43%');
            })
            ->whereBetween('jurnal.tgl_jurnal', [$fromDate, $toDate])
            ->select('detailjurnal.kd_rek', 'rekening.nm_rek', DB::raw('SUM(detailjurnal.kredit) - SUM(detailjurnal.debet) AS movement'))
            ->groupBy('detailjurnal.kd_rek', 'rekening.nm_rek')
            ->orderBy('detailjurnal.kd_rek')
            ->get();

        $kasMasukItems = collect($pendapatanMovements)->map(function ($row) use ($pendapatanSaldoMap) {
            $mov = (float) ($row->movement ?? 0);
            $saldo = (float) ($pendapatanSaldoMap[(string) ($row->kd_rek ?? '')] ?? 0);
            $amt = $mov + $saldo;
            $row->amount = $amt > 0 ? $amt : 0.0;
            return $row;
        })->filter(function ($row) {
            return (float) ($row->amount ?? 0) > 0;
        })->values();

        $totalPenerimaan = (float) ($kasMasukItems->sum('amount'));

        $bebanSaldoAwal = DB::table('rekening')
            ->join('rekeningtahun', 'rekeningtahun.kd_rek', '=', 'rekening.kd_rek')
            ->where(function ($w) {
                $w->where('rekening.nm_rek', 'like', '%BEBAN%')
                  ->orWhere('rekening.nm_rek', 'like', '%BIAYA%')
                  ->orWhere('rekening.kd_rek', 'like', '5%');
            })
            ->whereBetween('rekeningtahun.thn', [$fromYear, $toYear])
            ->select('rekening.kd_rek', 'rekening.nm_rek', DB::raw('SUM(rekeningtahun.saldo_awal) AS amount'))
            ->groupBy('rekening.kd_rek', 'rekening.nm_rek')
            ->orderBy('rekening.kd_rek')
            ->get();

        $bebanSaldoMap = [];
        foreach ($bebanSaldoAwal as $r) {
            $bebanSaldoMap[(string) ($r->kd_rek ?? '')] = (float) ($r->amount ?? 0);
        }

        $bebanMovements = DB::table('jurnal')
            ->join('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->join('rekening', 'rekening.kd_rek', '=', 'detailjurnal.kd_rek')
            ->where(function ($w) {
                $w->where('rekening.nm_rek', 'like', '%BEBAN%')
                  ->orWhere('rekening.nm_rek', 'like', '%BIAYA%')
                  ->orWhere('rekening.kd_rek', 'like', '5%');
            })
            ->whereBetween('jurnal.tgl_jurnal', [$fromDate, $toDate])
            ->select('detailjurnal.kd_rek', 'rekening.nm_rek', DB::raw('SUM(detailjurnal.debet) - SUM(detailjurnal.kredit) AS movement'))
            ->groupBy('detailjurnal.kd_rek', 'rekening.nm_rek')
            ->orderBy('detailjurnal.kd_rek')
            ->get();

        $kasKeluarItems = collect($bebanMovements)->map(function ($row) use ($bebanSaldoMap) {
            $mov = (float) ($row->movement ?? 0);
            $saldo = (float) ($bebanSaldoMap[(string) ($row->kd_rek ?? '')] ?? 0);
            $amt = $mov + $saldo;
            $row->amount = $amt > 0 ? $amt : 0.0;
            return $row;
        })->filter(function ($row) {
            return (float) ($row->amount ?? 0) > 0;
        })->values();

        $totalPengeluaran = (float) ($kasKeluarItems->sum('amount'));

        // Kas Akhir = Kas Awal + Penerimaan (abs) - Pengeluaran (abs)
        $kasAkhir = $totalKasAwal + $totalPenerimaan - $totalPengeluaran;

        return response()->json([
            'filters' => ['from' => $fromDate, 'to' => $toDate],
            'kas_awal' => $kasAwalItems,
            'kas_masuk' => $kasMasukItems,
            'kas_keluar' => $kasKeluarItems,
            'totals' => [
                'kas_awal' => $totalKasAwal,
                'penerimaan' => $totalPenerimaan,
                'pengeluaran' => $totalPengeluaran,
                'kas_akhir' => $kasAkhir,
            ],
        ]);
    }
}
