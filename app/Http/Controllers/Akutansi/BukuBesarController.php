<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Carbon\Carbon;

class BukuBesarController extends Controller
{
    /** Inertia page renderer */
    public function page(): InertiaResponse
    {
        return Inertia::render('Akutansi/BukuBesar');
    }

    /**
     * API: General Ledger untuk satu akun (kd_rek) dengan filter tahun, opsional bulan & tanggal.
     * Query params:
     * - kd_rek: string (required)
     * - year:  YYYY (required)
     * - month: MM (optional)
     * - day:   DD (optional, hanya berlaku jika month diisi)
     *
     * Response: {
     *   meta: { kd_rek, nm_rek, balance, tipe, year, month?, day?, saldo_awal },
     *   rows: [ { tgl_jurnal, jam_jurnal, no_jurnal, no_bukti, keterangan, debet, kredit, saldo_awal, saldo_akhir } ],
     *   totals: { debet: number, kredit: number, saldo_akhir: number }
     * }
     */
    public function index(Request $request)
    {
        $kdRek = trim((string) $request->query('kd_rek', ''));
        $year = trim((string) $request->query('year', ''));
        $month = $request->query('month');
        $day = $request->query('day');

        if ($kdRek === '' || $year === '') {
            return response()->json(['message' => 'kd_rek dan year wajib diisi'], 422);
        }
        // Validasi minimal format numerik tahun/bulan/tanggal
        if (!preg_match('/^\d{4}$/', $year)) {
            return response()->json(['message' => 'Format year tidak valid (YYYY)'], 422);
        }
        if ($month !== null && !preg_match('/^(0[1-9]|1[0-2])$/', (string) $month)) {
            return response()->json(['message' => 'Format month tidak valid (MM)'], 422);
        }
        if ($day !== null && !preg_match('/^(0[1-9]|[12][0-9]|3[01])$/', (string) $day)) {
            return response()->json(['message' => 'Format day tidak valid (DD)'], 422);
        }

        $rekening = DB::table('rekening')->where('kd_rek', $kdRek)->first();
        if (!$rekening) {
            return response()->json(['message' => 'Rekening tidak ditemukan'], 404);
        }
        $balanceCode = strtoupper((string) ($rekening->balance ?? 'D')); // D atau K
        $tipeCode = strtoupper((string) ($rekening->tipe ?? 'N'));

        // Saldo awal dari rekeningtahun
        $saldoAwalTahun = (float) (DB::table('rekeningtahun')
            ->where('kd_rek', $kdRek)
            ->where('thn', $year)
            ->sum('saldo_awal') ?? 0);

        // Hitung akumulasi transaksi sebelum periode yang diminta (untuk saldo awal periode)
        $startOfYear = Carbon::createFromFormat('Y-m-d', $year . '-01-01');
        $cutoff = null; // tanggal terakhir sebelum periode view
        if ($month === null) {
            // Jika tidak ada month, maka periode adalah sepanjang tahun → saldo awal periode cukup dari rekeningtahun
            $cutoff = null;
        } else {
            // Jika ada month (dan mungkin day), tentukan tanggal cutoff = tanggal view awal - 1 hari
            $viewStart = Carbon::createFromFormat('Y-m-d', $year . '-' . $month . '-' . ($day ? $day : '01'));
            $cutoff = $viewStart->copy()->subDay();
        }

        $debetBefore = 0.0;
        $kreditBefore = 0.0;
        if ($cutoff) {
            $aggBefore = DB::table('jurnal')
                ->join('detailjurnal', 'jurnal.no_jurnal', '=', 'detailjurnal.no_jurnal')
                ->where('detailjurnal.kd_rek', $kdRek)
                ->whereBetween('jurnal.tgl_jurnal', [$startOfYear->format('Y-m-d'), $cutoff->format('Y-m-d')])
                ->selectRaw('COALESCE(SUM(detailjurnal.debet),0) AS debet, COALESCE(SUM(detailjurnal.kredit),0) AS kredit')
                ->first();
            $debetBefore = (float) ($aggBefore->debet ?? 0);
            $kreditBefore = (float) ($aggBefore->kredit ?? 0);
        } else {
            // Jika sepanjang tahun, akumulasi sebelum periode = 0 karena saldo awal dari rekeningtahun sudah mewakili per 1 Jan
            $debetBefore = 0.0;
            $kreditBefore = 0.0;
        }

        // Saldo awal periode berdasarkan balance (D/K)
        $saldoAwalPeriode = $saldoAwalTahun;
        if ($balanceCode === 'D') {
            $saldoAwalPeriode += ($debetBefore - $kreditBefore);
        } else { // K
            $saldoAwalPeriode += ($kreditBefore - $debetBefore);
        }

        // Bangun filter baris jurnal untuk periode tampilan
        $pattern = $year . '%';
        if ($month !== null) {
            $pattern = $year . '-' . $month . '%';
        }
        if ($month !== null && $day !== null) {
            $pattern = $year . '-' . $month . '-' . $day . '%';
        }

        $items = DB::table('jurnal')
            ->join('detailjurnal', 'jurnal.no_jurnal', '=', 'detailjurnal.no_jurnal')
            ->where('detailjurnal.kd_rek', $kdRek)
            ->where('jurnal.tgl_jurnal', 'like', $pattern)
            ->orderBy('jurnal.tgl_jurnal')
            ->orderBy('jurnal.jam_jurnal')
            ->select([
                'jurnal.no_jurnal',
                'jurnal.tgl_jurnal',
                'jurnal.jam_jurnal',
                'jurnal.no_bukti',
                'jurnal.keterangan',
                DB::raw('detailjurnal.debet AS debet'),
                DB::raw('detailjurnal.kredit AS kredit'),
            ])
            ->get();

        // Susun baris dengan saldo berjalan
        $rows = [];
        $runningSaldo = $saldoAwalPeriode;
        $totalDebet = 0.0;
        $totalKredit = 0.0;
        foreach ($items as $it) {
            $debet = (float) ($it->debet ?? 0);
            $kredit = (float) ($it->kredit ?? 0);
            $totalDebet += $debet;
            $totalKredit += $kredit;

            // Saldo akhir baris mengikuti nature akun
            if ($balanceCode === 'D') {
                $runningSaldo = $runningSaldo + $debet - $kredit;
            } else {
                $runningSaldo = $runningSaldo + $kredit - $debet;
            }

            $rows[] = [
                'tgl_jurnal' => $it->tgl_jurnal,
                'jam_jurnal' => $it->jam_jurnal,
                'no_jurnal' => $it->no_jurnal,
                'no_bukti' => $it->no_bukti,
                'keterangan' => $it->keterangan,
                'saldo_awal' => $runningSaldo - ($balanceCode === 'D' ? ($debet - $kredit) : ($kredit - $debet)),
                'debet' => $debet,
                'kredit' => $kredit,
                'saldo_akhir' => $runningSaldo,
            ];
        }

        return response()->json([
            'meta' => [
                'kd_rek' => $kdRek,
                'nm_rek' => (string) ($rekening->nm_rek ?? $kdRek),
                'balance' => $balanceCode,
                'tipe' => $tipeCode,
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'saldo_awal' => $saldoAwalPeriode,
            ],
            'rows' => $rows,
            'totals' => [
                'debet' => $totalDebet,
                'kredit' => $totalKredit,
                'saldo_akhir' => $runningSaldo,
            ],
        ]);
    }
}

