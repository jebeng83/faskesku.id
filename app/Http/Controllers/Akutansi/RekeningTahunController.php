<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RekeningTahunController extends Controller
{
    /**
     * Listing saldo awal per akun untuk tahun tertentu, berikut mutasi & saldo akhir.
     */
    public function index(Request $request): JsonResponse
    {
        $thn = (string) $request->get('thn', date('Y'));
        $q = (string) $request->get('q', '');
        $period = (string) $request->get('period', 'year'); // 'year' | 'month' | 'day' | 'range'
        $month = $request->get('month'); // 1..12
        $date = $request->get('date'); // YYYY-MM-DD
        $from = $request->get('from'); // YYYY-MM-DD
        $to = $request->get('to');   // YYYY-MM-DD

        $baseQuery = DB::table('rekening')
            ->join('rekeningtahun', 'rekeningtahun.kd_rek', '=', 'rekening.kd_rek')
            ->where('rekeningtahun.thn', $thn);

        if ($q !== '') {
            $baseQuery->where(function ($w) use ($q) {
                $w->where('rekening.kd_rek', 'like', "%$q%")
                    ->orWhere('rekening.nm_rek', 'like', "%$q%")
                    ->orWhere('rekening.tipe', 'like', "%$q%")
                    ->orWhere('rekening.balance', 'like', "%$q%");
            });
        }

        $rows = $baseQuery
            ->select('rekeningtahun.thn', 'rekening.kd_rek', 'rekening.nm_rek', 'rekening.tipe', 'rekening.balance', 'rekeningtahun.saldo_awal')
            ->orderBy('rekening.kd_rek')
            ->get();

        // Tentukan rentang tanggal mutasi sesuai filter periode
        $fromDate = sprintf('%s-01-01', $thn);
        $toDate = sprintf('%s-12-31', $thn);

        if (is_string($from) && is_string($to) && $from !== '' && $to !== '') {
            $fromDate = $from;
            $toDate = $to;
        } elseif ($period === 'day' && is_string($date) && $date !== '') {
            // Neraca harian: akumulasi dari awal tahun s/d tanggal terpilih
            $fromDate = sprintf('%s-01-01', $thn);
            $toDate = $date;
        } elseif ($period === 'month' && $month !== null && $month !== '') {
            // Neraca bulanan: akumulasi dari awal tahun s/d akhir bulan terpilih
            $m = str_pad((string) (int) $month, 2, '0', STR_PAD_LEFT);
            $fromDate = sprintf('%s-01-01', $thn);
            $toDate = date('Y-m-t', strtotime("$thn-$m-01"));
        } else {
            // Default tahunan: akumulasi satu tahun penuh
            $fromDate = sprintf('%s-01-01', $thn);
            $toDate = sprintf('%s-12-31', $thn);
        }

        // Ambil mutasi per akun untuk rentang tanggal bersangkutan
        $mutasi = DB::table('jurnal')
            ->join('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->select('detailjurnal.kd_rek', DB::raw('SUM(detailjurnal.debet) AS sum_debet'), DB::raw('SUM(detailjurnal.kredit) AS sum_kredit'))
            ->whereBetween('jurnal.tgl_jurnal', [$fromDate, $toDate])
            ->groupBy('detailjurnal.kd_rek')
            ->get()
            ->keyBy('kd_rek');

        $items = $rows->map(function ($row) use ($mutasi) {
            $sum_debet = (float) ($mutasi[$row->kd_rek]->sum_debet ?? 0);
            $sum_kredit = (float) ($mutasi[$row->kd_rek]->sum_kredit ?? 0);

            if ($row->balance === 'D') {
                $mutasi_debet = $sum_debet;
                $mutasi_kredit = $sum_kredit;
            } else { // 'K'
                $mutasi_debet = $sum_kredit;
                $mutasi_kredit = $sum_debet;
            }

            $saldo_akhir = (float) $row->saldo_awal + ($mutasi_debet - $mutasi_kredit);

            return [
                'thn' => (string) $row->thn,
                'kd_rek' => (string) $row->kd_rek,
                'nm_rek' => (string) $row->nm_rek,
                'tipe' => (string) $row->tipe,
                'balance' => (string) $row->balance,
                'saldo_awal' => (float) $row->saldo_awal,
                'mutasi_debet' => $mutasi_debet,
                'mutasi_kredit' => $mutasi_kredit,
                'saldo_akhir' => $saldo_akhir,
            ];
        });

        return response()->json([
            'filters' => [
                'thn' => $thn,
                'q' => $q,
                'period' => $period,
                'month' => $month,
                'date' => $date,
                'from' => $fromDate,
                'to' => $toDate,
            ],
            'items' => $items,
            'count' => $items->count(),
        ]);
    }

    /**
     * Upsert saldo awal (kunci gabungan thn + kd_rek).
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'thn' => ['required', 'string', 'regex:/^\d{4}$/'],
            'kd_rek' => ['required', 'string', Rule::exists('rekening', 'kd_rek')],
            'saldo_awal' => ['required', 'numeric'],
        ]);

        DB::table('rekeningtahun')->updateOrInsert(
            ['thn' => $data['thn'], 'kd_rek' => $data['kd_rek']],
            ['saldo_awal' => (float) $data['saldo_awal']]
        );

        return response()->json(['message' => 'Saldo awal tersimpan', 'data' => $data]);
    }

    /**
     * Update saldo awal untuk pasangan thn + kd_rek.
     */
    public function update(Request $request, string $thn, string $kd_rek): JsonResponse
    {
        $validated = $request->validate([
            'saldo_awal' => ['required', 'numeric'],
        ]);

        DB::table('rekeningtahun')
            ->where('thn', $thn)
            ->where('kd_rek', $kd_rek)
            ->update(['saldo_awal' => (float) $validated['saldo_awal']]);

        return response()->json(['message' => 'Saldo awal diperbarui', 'data' => ['thn' => $thn, 'kd_rek' => $kd_rek] + $validated]);
    }

    /**
     * Hapus saldo awal untuk pasangan thn + kd_rek.
     */
    public function destroy(string $thn, string $kd_rek): JsonResponse
    {
        DB::table('rekeningtahun')
            ->where('thn', $thn)
            ->where('kd_rek', $kd_rek)
            ->delete();

        return response()->json(['message' => 'Saldo awal dihapus', 'data' => ['thn' => $thn, 'kd_rek' => $kd_rek]]);
    }
}
