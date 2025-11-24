<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
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
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $from = (string) $request->get('from', '');
        $to = (string) $request->get('to', '');

        $fromDate = $from !== '' ? $from : date('Y-m-d');
        $toDate = $to !== '' ? $to : date('Y-m-d');
        $fromYear = (int) substr($fromDate, 0, 4);
        $toYear = (int) substr($toDate, 0, 4);

        // Kas Awal: saldo awal akun Neraca dengan balance = D, dijumlahkan per akun dalam rentang tahun
        $kasAwalItems = DB::table('rekening')
            ->join('rekeningtahun', 'rekeningtahun.kd_rek', '=', 'rekening.kd_rek')
            ->where('rekening.tipe', 'N')
            ->where('rekening.balance', 'D')
            ->whereBetween('rekeningtahun.thn', [$fromYear, $toYear])
            ->select('rekening.kd_rek', 'rekening.nm_rek', DB::raw('SUM(rekeningtahun.saldo_awal) AS amount'))
            ->groupBy('rekening.kd_rek', 'rekening.nm_rek')
            ->orderBy('rekening.kd_rek')
            ->get();

        $totalKasAwal = (float) ($kasAwalItems->sum('amount'));

        // Peta saldo awal untuk akun tipe R (Pendapatan/Beban) agar bisa dijumlahkan ke pergerakan
        $openingR = DB::table('rekeningtahun')
            ->join('rekening', 'rekening.kd_rek', '=', 'rekeningtahun.kd_rek')
            ->where('rekening.tipe', 'R')
            ->whereBetween('rekeningtahun.thn', [$fromYear, $toYear])
            ->select('rekeningtahun.kd_rek', DB::raw('SUM(rekeningtahun.saldo_awal) as opening'))
            ->groupBy('rekeningtahun.kd_rek')
            ->get()
            ->keyBy('kd_rek');

        // Kas Masuk: akun tipe R dengan balance K, pergerakan kredit - debet, ditambah saldo awal
        $kasMasukMovements = DB::table('jurnal')
            ->join('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->join('rekening', 'rekening.kd_rek', '=', 'detailjurnal.kd_rek')
            ->where('rekening.tipe', 'R')
            ->where('rekening.balance', 'K')
            ->whereBetween('jurnal.tgl_jurnal', [$fromDate, $toDate])
            ->select('detailjurnal.kd_rek', 'rekening.nm_rek', DB::raw('SUM(detailjurnal.kredit) - SUM(detailjurnal.debet) AS movement'))
            ->groupBy('detailjurnal.kd_rek', 'rekening.nm_rek')
            ->orderBy('detailjurnal.kd_rek')
            ->get();

        $kasMasukItems = $kasMasukMovements->map(function ($row) use ($openingR) {
            $open = (float) ($openingR[$row->kd_rek]->opening ?? 0);
            $amount = (float) ($row->movement) + $open;
            $row->amount = $amount;
            return $row;
        });

        $totalPenerimaan = (float) (collect($kasMasukItems)->sum('amount'));

        // Kas Keluar: akun tipe R dengan balance D, pergerakan debet - kredit, ditambah saldo awal
        $kasKeluarMovements = DB::table('jurnal')
            ->join('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->join('rekening', 'rekening.kd_rek', '=', 'detailjurnal.kd_rek')
            ->where('rekening.tipe', 'R')
            ->where('rekening.balance', 'D')
            ->whereBetween('jurnal.tgl_jurnal', [$fromDate, $toDate])
            ->select('detailjurnal.kd_rek', 'rekening.nm_rek', DB::raw('SUM(detailjurnal.debet) - SUM(detailjurnal.kredit) AS movement'))
            ->groupBy('detailjurnal.kd_rek', 'rekening.nm_rek')
            ->orderBy('detailjurnal.kd_rek')
            ->get();

        $kasKeluarItems = $kasKeluarMovements->map(function ($row) use ($openingR) {
            $open = (float) ($openingR[$row->kd_rek]->opening ?? 0);
            $amount = (float) ($row->movement) + $open;
            $row->amount = $amount;
            return $row;
        });

        $totalPengeluaran = (float) (collect($kasKeluarItems)->sum('amount'));

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