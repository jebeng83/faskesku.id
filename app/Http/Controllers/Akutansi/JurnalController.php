<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\Akutansi\JournalService;
use App\Services\Akutansi\JurnalPostingService;
use Carbon\Carbon;

class JurnalController extends Controller
{
    /**
     * Inertia page untuk Jurnal Akutansi
     */
    public function page()
    {
        return \Inertia\Inertia::render('Akutansi/Jurnal');
    }

    /**
     * Bangun staging tampjurnal dari total billing per no_rawat dengan pemecahan debit (kas/bank vs piutang) dan opsi PPN.
     * Body contoh:
     * {
     *   no_rawat: string,
     *   bayar?: number,              // nominal bayar tunai/transfer
     *   piutang?: number,            // sisa piutang
     *   ppn_percent?: number,        // persen PPN
     *   akun_bayar?: { kd_rek: string },
     *   akun_piutang?: { kd_rek: string },
     *   kd_rek_kredit?: string       // akun pendapatan utama (fallback config)
     * }
     */
    public function stageFromBilling(Request $request)
    {
        $noRawat = $request->input('no_rawat');
        if (!$noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        // Subtotal dari snapshot billing (tanpa PPN)
        $subtotal = (float) DB::table('billing')->where('no_rawat', $noRawat)->sum('totalbiaya');
        if ($subtotal <= 0) {
            return response()->json(['message' => 'Total billing 0, tidak ada yang di-stage'], 400);
        }

        // Hitung PPN jika ada
        $ppnPercent = (float) ($request->input('ppn_percent') ?? 0);
        $ppnNominal = $ppnPercent > 0 ? round($subtotal * ($ppnPercent / 100), 2) : 0.0;
        $totalWithPpn = round($subtotal + $ppnNominal, 2);

        // Ambil nominal bayar & piutang dari payload (opsional)
        $bayar = (float) ($request->input('bayar') ?? 0);
        $piutang = (float) ($request->input('piutang') ?? max(0.0, $totalWithPpn - $bayar));

        // Validasi overpay: bayar tidak boleh melebihi totalWithPpn
        if ($bayar > $totalWithPpn) {
            return response()->json([
                'message' => 'Nominal bayar melebihi total tagihan + PPN. Atur kembali agar uang kembali = 0 sebelum menyimpan.',
            ], 422);
        }

        // Akun debit: bayar (kas/bank) dan piutang (AR)
        $kdDebetBayar = $request->input('akun_bayar.kd_rek') ?? $request->input('kd_rek_debet') ?? config('akutansi.rek_kas_default');
        $kdDebetPiutang = $request->input('akun_piutang.kd_rek') ?? null;

        if ($bayar > 0 && !$kdDebetBayar) {
            return response()->json(['message' => 'Akun Bayar (kas/bank) wajib diisi untuk nominal bayar > 0. Set rek_kas_default di config/akutansi.php atau pilih dari UI.'], 422);
        }
        if ($piutang > 0 && !$kdDebetPiutang) {
            return response()->json(['message' => 'Akun Piutang wajib diisi ketika ada sisa piutang. Pilih dari UI.'], 422);
        }

        // Akun kredit: pendapatan utama dan PPN keluaran (opsional)
        $kdKreditPendapatan = $request->input('kd_rek_kredit') ?? config('akutansi.rek_pendapatan_default');
        if (!$kdKreditPendapatan) {
            return response()->json([
                'message' => 'Akun pendapatan (rek_pendapatan_default) belum diatur. Lengkapi config/akutansi.php atau kirim kd_rek_kredit pada payload.',
            ], 422);
        }

        // Ambil akun PPN Keluaran dari set_akun jika tersedia
        $kdKreditPpn = DB::table('set_akun')->value('PPN_Keluaran');
        if (!$kdKreditPpn && $ppnNominal > 0) {
            // Jika tidak ada pengaturan, tetap lanjut dengan memperingatkan user bahwa PPN akan digabung ke pendapatan
            // Untuk menjaga keseimbangan, tambahkan PPN ke pendapatan jika akun PPN tidak tersedia
            $kdKreditPpn = null;
        }

        // Nama akun untuk tampilan (opsional)
        $nmDebetBayar = $kdDebetBayar ? (DB::table('rekening')->where('kd_rek', $kdDebetBayar)->value('nm_rek') ?? 'Kas/Bank') : null;
        $nmDebetPiutang = $kdDebetPiutang ? (DB::table('rekening')->where('kd_rek', $kdDebetPiutang)->value('nm_rek') ?? 'Piutang') : null;
        $nmKreditPendapatan = DB::table('rekening')->where('kd_rek', $kdKreditPendapatan)->value('nm_rek') ?? 'Pendapatan';
        $nmKreditPpn = $kdKreditPpn ? (DB::table('rekening')->where('kd_rek', $kdKreditPpn)->value('nm_rek') ?? 'PPN Keluaran') : null;

        // Tulis ke staging tampjurnal: kosongkan dulu
        DB::table('tampjurnal')->truncate();

        // Debet: kas/bank
        if ($bayar > 0 && $kdDebetBayar) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => $kdDebetBayar,
                'nm_rek' => $nmDebetBayar,
                'debet'  => $bayar,
                'kredit' => 0,
            ]);
        }

        // Debet: piutang
        if ($piutang > 0 && $kdDebetPiutang) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => $kdDebetPiutang,
                'nm_rek' => $nmDebetPiutang,
                'debet'  => $piutang,
                'kredit' => 0,
            ]);
        }

        // Kredit: pendapatan (subtotal tanpa PPN)
        DB::table('tampjurnal')->insert([
            'kd_rek' => $kdKreditPendapatan,
            'nm_rek' => $nmKreditPendapatan,
            'debet'  => 0,
            'kredit' => $subtotal,
        ]);

        // Kredit: PPN keluaran jika akun tersedia, jika tidak maka gabungkan ke pendapatan agar tetap seimbang
        if ($ppnNominal > 0) {
            if ($kdKreditPpn) {
                DB::table('tampjurnal')->insert([
                    'kd_rek' => $kdKreditPpn,
                    'nm_rek' => $nmKreditPpn,
                    'debet'  => 0,
                    'kredit' => $ppnNominal,
                ]);
            } else {
                // Tambahkan ke pendapatan jika akun PPN tidak tersedia
                DB::table('tampjurnal')->insert([
                    'kd_rek' => $kdKreditPendapatan,
                    'nm_rek' => $nmKreditPendapatan,
                    'debet'  => 0,
                    'kredit' => $ppnNominal,
                ]);
            }
        }

        return response()->json([
            'status' => 'ok',
            'message' => 'Staging tampjurnal dari billing berhasil (debet bayar/piutang, kredit pendapatan + opsi PPN)',
            'no_rawat' => $noRawat,
            'subtotal' => $subtotal,
            'ppn_nominal' => $ppnNominal,
            'total_with_ppn' => $totalWithPpn,
            'bayar' => $bayar,
            'piutang' => $piutang,
            'akun' => [
                'debet_bayar' => $kdDebetBayar,
                'debet_piutang' => $kdDebetPiutang,
                'kredit_pendapatan' => $kdKreditPendapatan,
                'kredit_ppn' => $kdKreditPpn,
            ],
        ]);
    }

    /**
     * Posting tampjurnal ke jurnal/detailjurnal.
     * Body: { no_bukti, jenis?, keterangan? }
     */
    public function postStaging(Request $request, JournalService $service)
    {
        $noBukti = $request->input('no_bukti');
        if (!$noBukti) {
            return response()->json(['message' => 'no_bukti wajib diisi'], 422);
        }

        $jenis = $request->input('jenis', 'U');
        $keterangan = $request->input('keterangan', 'Posting otomatis');

        $result = $service->postFromStaging($noBukti, $jenis, $keterangan);
        if ($result['status'] !== 'ok') {
            return response()->json($result, 400);
        }
        return response()->json($result);
    }

    /**
     * Preview komposisi staging (tampjurnal + tampjurnal2) sebelum posting.
     * Response: { meta: {jml, tanggal, jam, debet, kredit, balanced}, lines: [{kd_rek,nm_rek,debet,kredit}] }
     */
    public function previewFromTemp(JurnalPostingService $service)
    {
        try {
            $data = $service->preview();
            return response()->json($data);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Gagal mengambil preview staging jurnal: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Posting staging (tampjurnal + tampjurnal2) ke jurnal/detailjurnal.
     * Body: { no_bukti?: string, keterangan?: string, tgl_jurnal?: string(YYYY-MM-DD) }
     * Response (201): { no_jurnal: string }
     */
    public function postFromTemp(Request $request, JurnalPostingService $service)
    {
        $noBukti = $request->input('no_bukti');
        $keterangan = $request->input('keterangan');
        $tgl = $request->input('tgl_jurnal');

        try {
            $result = $service->post($noBukti, $keterangan, $tgl);
            return response()->json($result, 201);
        } catch (\Throwable $e) {
            // Validasi keseimbangan atau staging kosong akan melempar exception dengan pesan yang informatif
            return response()->json([
                'message' => 'Gagal posting jurnal: ' . $e->getMessage(),
            ], 400);
        }
    }
}
