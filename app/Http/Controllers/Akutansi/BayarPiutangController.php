<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\BayarPiutang;
use App\Models\Akutansi\TagihanSadewa;
use App\Models\RegPeriksa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BayarPiutangController extends Controller
{
    /**
     * List pembayaran piutang dengan filter opsional
     */
    public function index(Request $request)
    {
        $request->validate([
            'no_rkm_medis' => ['nullable', 'string'],
            'no_rawat' => ['nullable', 'string'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        $query = BayarPiutang::with(['patient', 'regPeriksa', 'rekening', 'rekeningKontra']);

        if ($request->filled('no_rkm_medis')) {
            $query->where('no_rkm_medis', $request->no_rkm_medis);
        }

        if ($request->filled('no_rawat')) {
            $query->where('no_rawat', $request->no_rawat);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('tgl_bayar', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('tgl_bayar', '<=', $request->end_date);
        }

        $bayarPiutang = $query->orderBy('tgl_bayar', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $bayarPiutang,
        ]);
    }

    /**
     * Show detail pembayaran piutang
     */
    public function show(Request $request)
    {
        $request->validate([
            'tgl_bayar' => ['required', 'date'],
            'no_rkm_medis' => ['required', 'string'],
            'no_rawat' => ['required', 'string'],
            'kd_rek' => ['required', 'string'],
            'kd_rek_kontra' => ['required', 'string'],
        ]);

        $bayarPiutang = BayarPiutang::where('tgl_bayar', $request->tgl_bayar)
            ->where('no_rkm_medis', $request->no_rkm_medis)
            ->where('no_rawat', $request->no_rawat)
            ->where('kd_rek', $request->kd_rek)
            ->where('kd_rek_kontra', $request->kd_rek_kontra)
            ->with(['patient', 'regPeriksa', 'rekening', 'rekeningKontra'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $bayarPiutang,
        ]);
    }

    /**
     * Simpan pembayaran piutang (cicilan)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tgl_bayar' => ['required', 'date'],
            'no_rkm_medis' => ['required', 'string', 'exists:pasien,no_rkm_medis'],
            'no_rawat' => ['required', 'string', 'exists:reg_periksa,no_rawat'],
            'besar_cicilan' => ['required', 'numeric', 'min:0'],
            'kd_rek' => ['required', 'string', 'exists:rekening,kd_rek'],
            'kd_rek_kontra' => ['required', 'string', 'exists:rekening,kd_rek'],
            'catatan' => ['nullable', 'string', 'max:100'],
            'diskon_piutang' => ['nullable', 'numeric', 'min:0'],
            'kd_rek_diskon_piutang' => ['nullable', 'string', 'exists:rekening,kd_rek'],
            'tidak_terbayar' => ['nullable', 'numeric', 'min:0'],
            'kd_rek_tidak_terbayar' => ['nullable', 'string', 'exists:rekening,kd_rek'],
        ]);

        return DB::transaction(function () use ($validated) {
            // Cek apakah sudah ada pembayaran dengan key yang sama
            $existing = BayarPiutang::where('tgl_bayar', $validated['tgl_bayar'])
                ->where('no_rkm_medis', $validated['no_rkm_medis'])
                ->where('no_rawat', $validated['no_rawat'])
                ->where('kd_rek', $validated['kd_rek'])
                ->where('kd_rek_kontra', $validated['kd_rek_kontra'])
                ->first();

            if ($existing) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pembayaran piutang dengan data yang sama sudah ada.',
                    'data' => $existing,
                ], 409);
            }

            // Buat pembayaran piutang
            $bayarPiutang = BayarPiutang::create($validated);

            // Update tagihan_sadewa jika ada
            $regPeriksa = RegPeriksa::findOrFail($validated['no_rawat']);
            $notaJalan = DB::table('nota_jalan')
                ->where('no_rawat', $validated['no_rawat'])
                ->first();

            if ($notaJalan) {
                $tagihan = TagihanSadewa::find($notaJalan->no_nota);
                if ($tagihan) {
                    $jumlahBayarBaru = $tagihan->jumlah_bayar + $validated['besar_cicilan'];
                    $tagihan->update([
                        'jumlah_bayar' => $jumlahBayarBaru,
                        'status' => $jumlahBayarBaru >= $tagihan->jumlah_tagihan ? 'Sudah' : 'Belum',
                        'tgl_bayar' => Carbon::now(),
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran piutang berhasil disimpan',
                'data' => $bayarPiutang->load(['patient', 'regPeriksa', 'rekening', 'rekeningKontra']),
            ], 201);
        });
    }

    /**
     * Update pembayaran piutang
     */
    public function update(Request $request)
    {
        $request->validate([
            'tgl_bayar' => ['required', 'date'],
            'no_rkm_medis' => ['required', 'string'],
            'no_rawat' => ['required', 'string'],
            'kd_rek' => ['required', 'string'],
            'kd_rek_kontra' => ['required', 'string'],
        ]);

        $bayarPiutang = BayarPiutang::where('tgl_bayar', $request->tgl_bayar)
            ->where('no_rkm_medis', $request->no_rkm_medis)
            ->where('no_rawat', $request->no_rawat)
            ->where('kd_rek', $request->kd_rek)
            ->where('kd_rek_kontra', $request->kd_rek_kontra)
            ->firstOrFail();

        $validated = $request->validate([
            'besar_cicilan' => ['required', 'numeric', 'min:0'],
            'catatan' => ['nullable', 'string', 'max:100'],
            'diskon_piutang' => ['nullable', 'numeric', 'min:0'],
            'kd_rek_diskon_piutang' => ['nullable', 'string', 'exists:rekening,kd_rek'],
            'tidak_terbayar' => ['nullable', 'numeric', 'min:0'],
            'kd_rek_tidak_terbayar' => ['nullable', 'string', 'exists:rekening,kd_rek'],
        ]);

        $bayarPiutang->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran piutang berhasil diperbarui',
            'data' => $bayarPiutang->load(['patient', 'regPeriksa', 'rekening', 'rekeningKontra']),
        ]);
    }

    /**
     * Hapus pembayaran piutang
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'tgl_bayar' => ['required', 'date'],
            'no_rkm_medis' => ['required', 'string'],
            'no_rawat' => ['required', 'string'],
            'kd_rek' => ['required', 'string'],
            'kd_rek_kontra' => ['required', 'string'],
        ]);

        $bayarPiutang = BayarPiutang::where('tgl_bayar', $request->tgl_bayar)
            ->where('no_rkm_medis', $request->no_rkm_medis)
            ->where('no_rawat', $request->no_rawat)
            ->where('kd_rek', $request->kd_rek)
            ->where('kd_rek_kontra', $request->kd_rek_kontra)
            ->firstOrFail();

        $bayarPiutang->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pembayaran piutang berhasil dihapus',
        ]);
    }

    /**
     * Get total piutang pasien
     */
    public function getTotalPiutang(Request $request)
    {
        $request->validate([
            'no_rkm_medis' => ['required', 'string'],
        ]);

        // Hitung total tagihan belum lunas
        $totalTagihan = DB::table('tagihan_sadewa')
            ->where('no_rkm_medis', $request->no_rkm_medis)
            ->where('status', 'Belum')
            ->selectRaw('SUM(jumlah_tagihan - jumlah_bayar) as total_piutang')
            ->value('total_piutang') ?? 0;

        // Hitung total cicilan yang sudah dibayar
        $totalCicilan = BayarPiutang::where('no_rkm_medis', $request->no_rkm_medis)
            ->sum('besar_cicilan');

        return response()->json([
            'success' => true,
            'data' => [
                'total_piutang' => (float) $totalTagihan,
                'total_cicilan' => (float) $totalCicilan,
                'sisa_piutang' => max(0, (float) $totalTagihan - (float) $totalCicilan),
            ],
        ]);
    }
}
