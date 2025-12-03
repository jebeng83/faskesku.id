<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Services\Akutansi\JournalService;
use App\Services\Akutansi\JurnalPostingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class JurnalController extends Controller
{
    /**
     * List jurnal dengan filter pencarian, rentang tanggal, jenis, dan paginasi.
     * Response: { data: [...], meta: { current_page, last_page, per_page, total } }
     */
    public function index(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $from = $request->query('from');
        $to = $request->query('to');
        $jenis = trim((string) $request->query('jenis', ''));
        $perPage = (int) $request->query('per_page', 20);
        $perPage = $perPage > 0 ? $perPage : 20;

        $query = \App\Models\Akutansi\Jurnal::query()
            ->leftJoin('detailjurnal', 'jurnal.no_jurnal', '=', 'detailjurnal.no_jurnal')
            ->select([
                'jurnal.no_jurnal',
                'jurnal.tgl_jurnal',
                'jurnal.jam_jurnal',
                'jurnal.no_bukti',
                'jurnal.jenis',
                'jurnal.keterangan',
                \Illuminate\Support\Facades\DB::raw('COALESCE(SUM(detailjurnal.debet),0) AS debet_total'),
                \Illuminate\Support\Facades\DB::raw('COALESCE(SUM(detailjurnal.kredit),0) AS kredit_total'),
            ])
            ->groupBy('jurnal.no_jurnal', 'jurnal.tgl_jurnal', 'jurnal.jam_jurnal', 'jurnal.no_bukti', 'jurnal.jenis', 'jurnal.keterangan');

        if ($q !== '') {
            $like = "%$q%";
            $query->where(function ($w) use ($like) {
                $w->where('jurnal.no_jurnal', 'like', $like)
                    ->orWhere('jurnal.no_bukti', 'like', $like)
                    ->orWhere('jurnal.keterangan', 'like', $like);
            });
        }
        if ($jenis !== '') {
            $query->where('jurnal.jenis', $jenis);
        }
        if ($from && $to) {
            $query->whereBetween('jurnal.tgl_jurnal', [$from, $to]);
        } elseif ($from) {
            $query->whereDate('jurnal.tgl_jurnal', '>=', $from);
        } elseif ($to) {
            $query->whereDate('jurnal.tgl_jurnal', '<=', $to);
        }

        $paginator = $query->orderBy('jurnal.tgl_jurnal', 'desc')
            ->orderBy('jurnal.jam_jurnal', 'desc')
            ->paginate($perPage)
            ->appends($request->query());

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    /**
     * Inertia page untuk Jurnal Akutansi
     */
    public function page()
    {
        return \Inertia\Inertia::render('Akutansi/Jurnal');
    }

    /**
     * Inertia page khusus untuk Jurnal Penyesuaian (Adjusting Entries)
     */
    public function penyesuaianPage()
    {
        return \Inertia\Inertia::render('Akutansi/JurnalPenyesuaian');
    }

    /**
     * Inertia page khusus untuk Jurnal Penutup (Closing Entries)
     */
    public function penutupPage()
    {
        return \Inertia\Inertia::render('Akutansi/JurnalPenutup');
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
        if (! $noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        // Subtotal dari snapshot billing (tanpa PPN)
        $subtotal = (float) DB::table('billing')->where('no_rawat', $noRawat)->sum('totalbiaya');
        // Komponen khusus: biaya Registrasi bila ada di snapshot billing
        $registrasiSubtotal = (float) DB::table('billing')
            ->where('no_rawat', $noRawat)
            ->where('status', 'Registrasi')
            ->sum('totalbiaya');
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
        // Tidak lagi bergantung pada .env/config; gunakan master rekening
        $kdDebetBayar = $request->input('akun_bayar.kd_rek')
            ?? $request->input('kd_rek_debet')
            ?? $this->findDefaultKas();
        $kdDebetPiutang = $request->input('akun_piutang.kd_rek')
            ?? $this->findDefaultPiutang();

        if ($bayar > 0 && ! $kdDebetBayar) {
            return response()->json(['message' => 'Akun Bayar (kas/bank) wajib diisi untuk nominal bayar > 0. Pilih dari UI, atau lengkapi master rekening untuk akun Kas/Bank (kode awal 1).'], 422);
        }
        if ($piutang > 0 && ! $kdDebetPiutang) {
            return response()->json(['message' => 'Akun Piutang tidak ditemukan otomatis. Pilih dari UI atau lengkapi master rekening (nm_rek mengandung "Piutang" atau kd_rek diawali 112, balance=D).'], 422);
        }

        // Akun kredit: pendapatan utama dan PPN keluaran (opsional)
        // Tidak menggunakan .env/config lagi. Penentuan default diambil dari master rekening (rekening & subrekening) berdasarkan hierarki/prefix.
        // Urutan prioritas:
        // 1) kd_rek_kredit dari payload (jika dikirim oleh sumber lain)
        // 2) auto-detect berdasarkan status layanan (Ranap/Ralan → 41/42/43)
        // 3) fallback pencarian prefix 41 → 42 → 43 jika status layanan tidak tersedia
        $kdKreditPendapatan = $request->input('kd_rek_kredit')
            ?? $this->findPendapatanDefaultByNoRawat($noRawat)
            ?? $this->findPendapatanByPrefix('41')
            ?? $this->findPendapatanByPrefix('42')
            ?? $this->findPendapatanByPrefix('43')
            ?? $this->findPendapatanByName();
        if (! $kdKreditPendapatan) {
            return response()->json([
                'message' => 'Akun pendapatan tidak ditemukan. Sistem memilih berdasarkan sumber layanan (Ranap=41, Ralan=42, Operasional Lain=43). Lengkapi master rekening atau kirim kd_rek_kredit pada payload.',
            ], 422);
        }

        // Akun kredit untuk Registrasi: ambil dari set_akun_ralan/ranap bila tersedia
        $statusPerawatan = DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('status_lanjut');
        $kdKreditRegistrasi = null;
        if ($statusPerawatan === 'Ralan') {
            $kdKreditRegistrasi = DB::table('set_akun_ralan')->value('Registrasi_Ralan');
        } elseif ($statusPerawatan === 'Ranap') {
            $kdKreditRegistrasi = DB::table('set_akun_ranap')->value('Registrasi_Ranap');
        }

        // Ambil akun PPN Keluaran dari set_akun jika tersedia
        $kdKreditPpn = DB::table('set_akun')->value('PPN_Keluaran');
        if (! $kdKreditPpn && $ppnNominal > 0) {
            // Jika tidak ada pengaturan, tetap lanjut dengan memperingatkan user bahwa PPN akan digabung ke pendapatan
            // Untuk menjaga keseimbangan, tambahkan PPN ke pendapatan jika akun PPN tidak tersedia
            $kdKreditPpn = null;
        }

        // Nama akun untuk tampilan (opsional)
        $nmDebetBayar = $kdDebetBayar ? (DB::table('rekening')->where('kd_rek', $kdDebetBayar)->value('nm_rek') ?? 'Kas/Bank') : null;
        $nmDebetPiutang = $kdDebetPiutang ? (DB::table('rekening')->where('kd_rek', $kdDebetPiutang)->value('nm_rek') ?? 'Piutang') : null;
        $nmKreditPendapatan = DB::table('rekening')->where('kd_rek', $kdKreditPendapatan)->value('nm_rek') ?? 'Pendapatan';
        $nmKreditRegistrasi = $kdKreditRegistrasi ? (DB::table('rekening')->where('kd_rek', $kdKreditRegistrasi)->value('nm_rek') ?? 'Pendapatan Registrasi') : null;
        $nmKreditPpn = $kdKreditPpn ? (DB::table('rekening')->where('kd_rek', $kdKreditPpn)->value('nm_rek') ?? 'PPN Keluaran') : null;

        // Tulis ke staging tampjurnal: kosongkan dulu (termasuk tampjurnal2 untuk menghindari data lama)
        DB::table('tampjurnal')->truncate();
        DB::table('tampjurnal2')->truncate();

        // Debet: kas/bank
        if ($bayar > 0 && $kdDebetBayar) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => $kdDebetBayar,
                'nm_rek' => $nmDebetBayar,
                'debet' => $bayar,
                'kredit' => 0,
            ]);
        }

        // Debet: piutang
        if ($piutang > 0 && $kdDebetPiutang) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => $kdDebetPiutang,
                'nm_rek' => $nmDebetPiutang,
                'debet' => $piutang,
                'kredit' => 0,
            ]);
        }

        // Kredit: pendapatan (subtotal tanpa PPN) dikurangi komponen Registrasi bila akun registrasi tersedia
        $pendapatanTanpaRegistrasi = $subtotal - $registrasiSubtotal;
        if ($pendapatanTanpaRegistrasi > 0) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => $kdKreditPendapatan,
                'nm_rek' => $nmKreditPendapatan,
                'debet' => 0,
                'kredit' => $pendapatanTanpaRegistrasi,
            ]);
        }

        // Kredit: Registrasi (jika ada di snapshot dan akun Registrasi tersedia)
        if ($registrasiSubtotal > 0) {
            DB::table('tampjurnal')->insert([
                'kd_rek' => $kdKreditRegistrasi ?: $kdKreditPendapatan,
                'nm_rek' => $kdKreditRegistrasi ? $nmKreditRegistrasi : $nmKreditPendapatan,
                'debet' => 0,
                'kredit' => $registrasiSubtotal,
            ]);
        }

        // Kredit: PPN keluaran jika akun tersedia, jika tidak maka gabungkan ke pendapatan agar tetap seimbang
        if ($ppnNominal > 0) {
            if ($kdKreditPpn) {
                DB::table('tampjurnal')->insert([
                    'kd_rek' => $kdKreditPpn,
                    'nm_rek' => $nmKreditPpn,
                    'debet' => 0,
                    'kredit' => $ppnNominal,
                ]);
            } else {
                // Tambahkan ke pendapatan jika akun PPN tidak tersedia
                DB::table('tampjurnal')->insert([
                    'kd_rek' => $kdKreditPendapatan,
                    'nm_rek' => $nmKreditPendapatan,
                    'debet' => 0,
                    'kredit' => $ppnNominal,
                ]);
            }
        }

        // Validasi keseimbangan sebelum return
        $totalDebet = $bayar + $piutang;
        $totalKredit = $pendapatanTanpaRegistrasi + $registrasiSubtotal + $ppnNominal;

        // Round untuk perbandingan
        $totalDebetRounded = round($totalDebet, 2);
        $totalKreditRounded = round($totalKredit, 2);

        // Validasi ulang keseimbangan setelah insert ke tampjurnal
        $actualAgg = DB::table('tampjurnal')
            ->select(DB::raw('IFNULL(SUM(debet),0) AS debet'), DB::raw('IFNULL(SUM(kredit),0) AS kredit'))
            ->first();

        $actualDebet = round((float) ($actualAgg->debet ?? 0), 2);
        $actualKredit = round((float) ($actualAgg->kredit ?? 0), 2);
        $selisih = $actualKredit - $actualDebet;

        if (abs($selisih) > 0.01) {
            \Log::warning('Keseimbangan debet/kredit tidak sama saat staging billing, melakukan penyesuaian', [
                'no_rawat' => $noRawat,
                'total_debet' => $actualDebet,
                'total_kredit' => $actualKredit,
                'selisih' => $selisih,
            ]);

            // Sesuaikan dengan menambahkan/mengurangi selisih ke akun yang sesuai
            if ($selisih > 0) {
                // Kredit lebih besar dari debet, tambahkan selisih ke debet (kas/bank atau piutang)
                if ($bayar > 0 && $kdDebetBayar) {
                    // Tambahkan ke kas/bank terlebih dahulu
                    DB::table('tampjurnal')
                        ->where('kd_rek', $kdDebetBayar)
                        ->where('debet', '>', 0)
                        ->update(['debet' => DB::raw("debet + {$selisih}")]);
                } elseif ($piutang > 0 && $kdDebetPiutang) {
                    // Jika tidak ada kas/bank, tambahkan ke piutang
                    DB::table('tampjurnal')
                        ->where('kd_rek', $kdDebetPiutang)
                        ->where('debet', '>', 0)
                        ->update(['debet' => DB::raw("debet + {$selisih}")]);
                } else {
                    // Jika tidak ada debet yang tersedia, kurangi dari kredit pendapatan
                    DB::table('tampjurnal')
                        ->where('kd_rek', $kdKreditPendapatan)
                        ->where('kredit', '>', 0)
                        ->orderBy('kredit', 'desc')
                        ->limit(1)
                        ->update(['kredit' => DB::raw("GREATEST(0, kredit - {$selisih})")]);
                }
            } else {
                // Debet lebih besar dari kredit, tambahkan selisih ke kredit (pendapatan)
                $absSelisih = abs($selisih);
                $existingKredit = DB::table('tampjurnal')
                    ->where('kd_rek', $kdKreditPendapatan)
                    ->where('kredit', '>', 0)
                    ->sum('kredit');

                if ($existingKredit > 0) {
                    // Tambahkan ke pendapatan yang sudah ada
                    DB::table('tampjurnal')
                        ->where('kd_rek', $kdKreditPendapatan)
                        ->where('kredit', '>', 0)
                        ->orderBy('kredit', 'desc')
                        ->limit(1)
                        ->update(['kredit' => DB::raw("kredit + {$absSelisih}")]);
                } else {
                    // Jika tidak ada pendapatan yang sudah ada, buat baris baru
                    DB::table('tampjurnal')->insert([
                        'kd_rek' => $kdKreditPendapatan,
                        'nm_rek' => $nmKreditPendapatan,
                        'debet' => 0,
                        'kredit' => $absSelisih,
                    ]);
                }
            }

            // Validasi ulang setelah penyesuaian
            $finalAgg = DB::table('tampjurnal')
                ->select(DB::raw('IFNULL(SUM(debet),0) AS debet'), DB::raw('IFNULL(SUM(kredit),0) AS kredit'))
                ->first();

            $finalDebet = round((float) ($finalAgg->debet ?? 0), 2);
            $finalKredit = round((float) ($finalAgg->kredit ?? 0), 2);
            $finalSelisih = abs($finalKredit - $finalDebet);

            if ($finalSelisih > 0.01) {
                \Log::error('Gagal menyeimbangkan debet/kredit setelah penyesuaian', [
                    'no_rawat' => $noRawat,
                    'final_debet' => $finalDebet,
                    'final_kredit' => $finalKredit,
                    'final_selisih' => $finalSelisih,
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
                'kredit_registrasi' => $kdKreditRegistrasi,
            ],
            'balance_check' => [
                'total_debet' => round($bayar + $piutang, 2),
                'total_kredit' => round($pendapatanTanpaRegistrasi + $registrasiSubtotal + $ppnNominal, 2),
                'balanced' => abs(round($bayar + $piutang, 2) - round($pendapatanTanpaRegistrasi + $registrasiSubtotal + $ppnNominal, 2)) <= 0.01,
            ],
        ]);
    }

    /**
     * Cari default akun Kas/Bank dari master rekening:
     * Prioritas: nm_rek mengandung 'KAS'/'BANK' atau kd_rek mulai '11', balance='D'.
     * Fallback: kd_rek mulai '1', balance='D'.
     */
    private function findDefaultKas(): ?string
    {
        try {
            $q = DB::table('rekening')
                ->where('balance', 'D')
                ->where(function ($w) {
                    $w->where('nm_rek', 'like', '%KAS%')
                        ->orWhere('nm_rek', 'like', '%BANK%')
                        ->orWhere('kd_rek', 'like', '11%');
                })
                ->orderBy('kd_rek');
            $kas = $q->value('kd_rek');
            if ($kas) {
                return $kas;
            }

            return DB::table('rekening')
                ->where('balance', 'D')
                ->where('kd_rek', 'like', '1%')
                ->orderBy('kd_rek')
                ->value('kd_rek');
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Cari default akun Piutang dari master rekening:
     * Prioritas: nm_rek mengandung 'Piutang' atau kd_rek mulai '112', balance='D'.
     */
    private function findDefaultPiutang(): ?string
    {
        try {
            // Prefer nm_rek contains Piutang
            $piutangByName = DB::table('rekening')
                ->where('balance', 'D')
                ->where('nm_rek', 'like', '%Piutang%')
                ->orderBy('kd_rek')
                ->value('kd_rek');
            if ($piutangByName) {
                return $piutangByName;
            }

            // Fallback by code prefix 112 (Piutang Usaha)
            return DB::table('rekening')
                ->where('balance', 'D')
                ->where('kd_rek', 'like', '112%')
                ->orderBy('kd_rek')
                ->value('kd_rek');
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Tentukan akun pendapatan default berdasarkan no_rawat (Ranap/Ralan) via reg_periksa.
     * Ranap → prefix 41, Ralan → prefix 42, selain itu → prefix 43.
     */
    private function findPendapatanDefaultByNoRawat(string $noRawat): ?string
    {
        try {
            $status = DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('status_lanjut');
            if ($status === 'Ranap') {
                return $this->findPendapatanByPrefix('41');
            }
            if ($status === 'Ralan') {
                return $this->findPendapatanByPrefix('42');
            }

            return $this->findPendapatanByPrefix('43');
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Ambil akun pendapatan berdasarkan prefix (41/42/43), prioritaskan akun dengan balance='K'.
     * Jika kode grup (mis. '41') ada, gunakan itu; jika tidak, gunakan kode terkecil di prefix tersebut.
     */
    private function findPendapatanByPrefix(string $prefix): ?string
    {
        try {
            // Coba kode grup persis
            $exact = DB::table('rekening')
                ->where('kd_rek', $prefix)
                ->where('balance', 'K')
                ->value('kd_rek');
            if ($exact) {
                return $exact;
            }

            // Cari akun spesifik di bawah prefix
            $row = DB::table('rekening')
                ->where('kd_rek', 'like', $prefix.'%')
                ->where('balance', 'K')
                ->orderBy('kd_rek')
                ->value('kd_rek');

            return $row ?: null;
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Fallback umum: cari akun dengan nama mengandung 'Pendapatan' dan balance='K'.
     */
    private function findPendapatanByName(): ?string
    {
        try {
            return DB::table('rekening')
                ->where('balance', 'K')
                ->where('nm_rek', 'like', '%Pendapatan%')
                ->orderBy('kd_rek')
                ->value('kd_rek');
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Posting tampjurnal ke jurnal/detailjurnal.
     * Body: { no_bukti, jenis?, keterangan? }
     */
    public function postStaging(Request $request, JournalService $service)
    {
        $noBukti = $request->input('no_bukti');
        if (! $noBukti) {
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
                'message' => 'Gagal mengambil preview staging jurnal: '.$e->getMessage(),
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
        } catch (\RuntimeException $e) {
            // Validasi keseimbangan atau staging kosong akan melempar RuntimeException dengan pesan yang informatif
            Log::warning('Posting jurnal gagal', [
                'no_bukti' => $noBukti,
                'keterangan' => $keterangan,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal posting jurnal: '.$e->getMessage(),
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Throwable $e) {
            // Error lainnya
            Log::error('Posting jurnal error', [
                'no_bukti' => $noBukti,
                'keterangan' => $keterangan,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal posting jurnal: '.$e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Preview jurnal penutup (Closing Entries) server-side.
     * Query params: thn, period(year|month|day), month?, date?, ikhtisar_kd_rek, modal_kd_rek
     * Response: { filters, rows: [{kd_rek, debet, kredit}], totals: {debet, kredit, balanced}, net: number, profit: boolean }
     */
    public function closingPreview(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'thn' => ['required', 'regex:/^\d{4}$/'],
            'period' => ['required', 'string', 'in:year,month,day'],
            'month' => ['nullable', 'integer', 'min:1', 'max:12'],
            'date' => ['nullable', 'date'],
            'ikhtisar_kd_rek' => [
                'required', 'string',
                Rule::exists('rekening', 'kd_rek')->where(function ($q) {
                    $q->where('tipe', 'R');
                }),
            ],
            'modal_kd_rek' => [
                'required', 'string',
                Rule::exists('rekening', 'kd_rek')->where(function ($q) {
                    $q->where('tipe', 'M');
                }),
            ],
        ]);

        $thn = (string) $validated['thn'];
        $period = (string) $validated['period'];
        $month = $validated['month'] ?? null;
        $date = $validated['date'] ?? null;
        $ikhtisar = (string) $validated['ikhtisar_kd_rek'];
        $modal = (string) $validated['modal_kd_rek'];

        // Tentukan rentang tanggal sesuai period (PER-PERIODE, bukan akumulasi YTD)
        // year  →  01-01 s/d 12-31 pada tahun bersangkutan
        // month →  awal bulan s/d akhir bulan pada tahun & bulan terpilih
        // day   →  tanggal yang sama (hanya hari itu)
        $fromDate = sprintf('%s-01-01', $thn);
        $toDate = sprintf('%s-12-31', $thn);
        if ($period === 'day' && is_string($date) && $date !== '') {
            // Hanya mutasi pada tanggal tersebut
            $fromDate = $date;
            $toDate = $date;
        } elseif ($period === 'month' && $month !== null && $month !== '') {
            $m = str_pad((string) (int) $month, 2, '0', STR_PAD_LEFT);
            // Mutasi untuk bulan terpilih saja
            $fromDate = sprintf('%s-%s-01', $thn, $m);
            $toDate = date('Y-m-t', strtotime("$thn-$m-01"));
        } else {
            // Tahunan penuh
            $fromDate = sprintf('%s-01-01', $thn);
            $toDate = sprintf('%s-12-31', $thn);
        }

        // Ambil daftar akun nominal (tipe 'R') untuk tahun bersangkutan beserta saldo_awal
        $rows = \Illuminate\Support\Facades\DB::table('rekening')
            ->join('rekeningtahun', 'rekeningtahun.kd_rek', '=', 'rekening.kd_rek')
            ->where('rekeningtahun.thn', $thn)
            ->where('rekening.tipe', 'R')
            // Hindari duplikasi: akun Ikhtisar dipakai sebagai agregator saja, tidak ditutup sebagai akun nominal
            ->where('rekening.kd_rek', '!=', $ikhtisar)
            ->select('rekening.kd_rek', 'rekening.nm_rek', 'rekening.balance', 'rekeningtahun.saldo_awal')
            ->orderBy('rekening.kd_rek')
            ->get();

        // Ambil mutasi akumulatif s/d toDate
        $mutasi = \Illuminate\Support\Facades\DB::table('jurnal')
            ->join('detailjurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
            ->select('detailjurnal.kd_rek', \Illuminate\Support\Facades\DB::raw('SUM(detailjurnal.debet) AS sum_debet'), \Illuminate\Support\Facades\DB::raw('SUM(detailjurnal.kredit) AS sum_kredit'))
            ->whereBetween('jurnal.tgl_jurnal', [$fromDate, $toDate])
            ->groupBy('detailjurnal.kd_rek')
            ->get()
            ->keyBy('kd_rek');

        $closingRows = [];
        $ikhtisarDebit = 0.0;
        $ikhtisarCredit = 0.0;

        foreach ($rows as $row) {
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
            if (round($saldo_akhir, 2) === 0.0) {
                continue;
            }

            // Tutup akun nominal ke Ikhtisar Laba Rugi
            if ($row->balance === 'K') {
                if ($saldo_akhir > 0) {
                    // Pendapatan normal (kredit) → Debet akun pendapatan, Kredit Ikhtisar
                    $closingRows[] = ['kd_rek' => (string) $row->kd_rek, 'debet' => $saldo_akhir, 'kredit' => 0];
                    $ikhtisarCredit += $saldo_akhir;
                } else { // saldo_akhir < 0, anomali → tutup searah kondisi
                    $amt = abs($saldo_akhir);
                    $closingRows[] = ['kd_rek' => (string) $row->kd_rek, 'debet' => 0, 'kredit' => $amt];
                    $ikhtisarDebit += $amt;
                }
            } else { // balance D (beban)
                if ($saldo_akhir > 0) {
                    // Beban normal (debet) → Kredit akun beban, Debet Ikhtisar
                    $closingRows[] = ['kd_rek' => (string) $row->kd_rek, 'debet' => 0, 'kredit' => $saldo_akhir];
                    $ikhtisarDebit += $saldo_akhir;
                } else { // saldo_akhir < 0, anomali
                    $amt = abs($saldo_akhir);
                    $closingRows[] = ['kd_rek' => (string) $row->kd_rek, 'debet' => $amt, 'kredit' => 0];
                    $ikhtisarCredit += $amt;
                }
            }
        }

        if (round($ikhtisarDebit, 2) > 0) {
            $closingRows[] = ['kd_rek' => $ikhtisar, 'debet' => $ikhtisarDebit, 'kredit' => 0];
        }
        if (round($ikhtisarCredit, 2) > 0) {
            $closingRows[] = ['kd_rek' => $ikhtisar, 'debet' => 0, 'kredit' => $ikhtisarCredit];
        }
        $net = $ikhtisarCredit - $ikhtisarDebit; // >0 laba, <0 rugi
        if (round($net, 2) !== 0.0) {
            if ($net > 0) {
                $closingRows[] = ['kd_rek' => $ikhtisar, 'debet' => $net, 'kredit' => 0];
                $closingRows[] = ['kd_rek' => $modal, 'debet' => 0, 'kredit' => $net];
            } else {
                $amt = abs($net);
                $closingRows[] = ['kd_rek' => $ikhtisar, 'debet' => 0, 'kredit' => $amt];
                $closingRows[] = ['kd_rek' => $modal, 'debet' => $amt, 'kredit' => 0];
            }
        }

        // Hitung total
        $totDebet = 0.0;
        $totKredit = 0.0;
        foreach ($closingRows as $r) {
            $totDebet += (float) ($r['debet'] ?? 0);
            $totKredit += (float) ($r['kredit'] ?? 0);
        }
        $balanced = (round($totDebet, 2) === round($totKredit, 2));

        return response()->json([
            'filters' => [
                'thn' => $thn,
                'period' => $period,
                'month' => $month,
                'date' => $date,
                'from' => $fromDate,
                'to' => $toDate,
                'ikhtisar_kd_rek' => $ikhtisar,
                'modal_kd_rek' => $modal,
            ],
            'rows' => $closingRows,
            'totals' => ['debet' => $totDebet, 'kredit' => $totKredit, 'balanced' => $balanced],
            'net' => $net,
            'profit' => ($net > 0),
        ]);
    }

    public function closingCandidates(\Illuminate\Http\Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $limit = (int) $request->query('limit', 50);
        $limit = $limit > 0 ? $limit : 50;

        $ikhtisarQuery = \Illuminate\Support\Facades\DB::table('rekening')
            ->where('tipe', 'R');
        $modalQuery = \Illuminate\Support\Facades\DB::table('rekening')
            ->where('tipe', 'M');

        if ($q !== '') {
            $like = "%$q%";
            $ikhtisarQuery->where(function ($w) use ($like) {
                $w->where('kd_rek', 'like', $like)
                    ->orWhere('nm_rek', 'like', $like);
            });
            $modalQuery->where(function ($w) use ($like) {
                $w->where('kd_rek', 'like', $like)
                    ->orWhere('nm_rek', 'like', $like);
            });
        }

        $ikhtisar = $ikhtisarQuery
            ->select(['kd_rek', 'nm_rek', 'balance'])
            ->orderBy('kd_rek')
            ->limit($limit)
            ->get();
        $modal = $modalQuery
            ->select(['kd_rek', 'nm_rek', 'balance'])
            ->orderBy('kd_rek')
            ->limit($limit)
            ->get();

        return response()->json([
            'filters' => [
                'q' => $q,
                'limit' => $limit,
            ],
            'ikhtisar' => $ikhtisar,
            'modal' => $modal,
        ]);
    }

    /**
     * Tampilkan detail jurnal: header + detail baris + total.
     * Response: { header: {...}, details: [...], totals: {debet, kredit, balanced} }
     */
    public function show(string $no_jurnal)
    {
        $header = \App\Models\Akutansi\Jurnal::query()->where('no_jurnal', $no_jurnal)->first();
        if (! $header) {
            return response()->json(['message' => 'Jurnal tidak ditemukan'], 404);
        }

        $details = \Illuminate\Support\Facades\DB::table('detailjurnal')
            ->leftJoin('rekening', 'detailjurnal.kd_rek', '=', 'rekening.kd_rek')
            ->where('detailjurnal.no_jurnal', $no_jurnal)
            ->select(['detailjurnal.kd_rek', 'rekening.nm_rek', 'detailjurnal.debet', 'detailjurnal.kredit'])
            ->orderBy('detailjurnal.kd_rek')
            ->get();

        $debet = 0.0;
        $kredit = 0.0;
        foreach ($details as $d) {
            $debet += (float) ($d->debet ?? 0);
            $kredit += (float) ($d->kredit ?? 0);
        }
        $balanced = (round($debet, 2) === round($kredit, 2));

        return response()->json([
            'header' => $header,
            'details' => $details,
            'totals' => ['debet' => $debet, 'kredit' => $kredit, 'balanced' => $balanced],
        ]);
    }

    /**
     * Simpan jurnal umum (jenis = 'U') dengan detail baris.
     * Body: { tgl_jurnal: Y-m-d, jam_jurnal: HH:MM:SS, no_bukti?: string, jenis: 'U', keterangan?: string, details: [{kd_rek,debet,kredit}] }
     * Response (201): { message, no_jurnal }
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'tgl_jurnal' => ['required', 'date'],
            'jam_jurnal' => ['required', 'string', 'max:8'],
            'no_bukti' => ['nullable', 'string', 'max:30'],
            // Izinkan simpan manual untuk Jurnal Umum (U), Penyesuaian (P), maupun Penutup (C)
            'jenis' => ['required', 'string', 'in:U,P,C'],
            'keterangan' => ['nullable', 'string', 'max:350'],
            'details' => ['required', 'array', 'min:1'],
            'details.*.kd_rek' => ['required', 'string', 'exists:rekening,kd_rek'],
            'details.*.debet' => ['nullable', 'numeric', 'min:0'],
            'details.*.kredit' => ['nullable', 'numeric', 'min:0'],
        ]);

        // Validasi tambahan khusus jurnal penutup
        if ($data['jenis'] === 'C') {
            $request->validate([
                'ikhtisar_kd_rek' => [
                    'required', 'string',
                    Rule::exists('rekening', 'kd_rek')->where(function ($q) {
                        $q->where('tipe', 'R');
                    }),
                ],
                'modal_kd_rek' => [
                    'required', 'string',
                    Rule::exists('rekening', 'kd_rek')->where(function ($q) {
                        $q->where('tipe', 'M');
                    }),
                ],
                'closing_period' => ['required', 'string', 'in:year,month,day'],
                'closing_year' => ['required', 'regex:/^\d{4}$/'],
                'closing_month' => ['nullable', 'integer', 'min:1', 'max:12'],
                'closing_date' => ['nullable', 'date'],
            ]);
            // Tidak boleh sama antara ikhtisar dan modal
            if ($request->input('ikhtisar_kd_rek') === $request->input('modal_kd_rek')) {
                return response()->json(['message' => 'Ikhtisar dan Modal/Saldo Laba tidak boleh akun yang sama'], 422);
            }
        }

        // Cegah duplikasi jurnal penutup untuk periode yang sama
        if ($data['jenis'] === 'C') {
            $closingPeriod = (string) $request->input('closing_period', ''); // year|month|day
            $closingYear = $request->input('closing_year');
            $closingMonth = $request->input('closing_month');
            $closingDate = $request->input('closing_date');

            $exists = false;
            if (! empty($data['no_bukti'])) {
                $exists = \Illuminate\Support\Facades\DB::table('jurnal')
                    ->where('jenis', 'C')
                    ->where('no_bukti', $data['no_bukti'])
                    ->exists();
            }

            if (! $exists) {
                if ($closingPeriod === 'day' && is_string($closingDate) && $closingDate !== '') {
                    $exists = \Illuminate\Support\Facades\DB::table('jurnal')
                        ->where('jenis', 'C')
                        ->where('tgl_jurnal', $closingDate)
                        ->exists();
                } elseif ($closingPeriod === 'month' && $closingYear && $closingMonth) {
                    $m = str_pad((string) (int) $closingMonth, 2, '0', STR_PAD_LEFT);
                    $from = sprintf('%s-%s-01', $closingYear, $m);
                    $to = date('Y-m-t', strtotime("$closingYear-$m-01"));
                    $exists = \Illuminate\Support\Facades\DB::table('jurnal')
                        ->where('jenis', 'C')
                        ->whereBetween('tgl_jurnal', [$from, $to])
                        ->exists();
                } elseif ($closingPeriod === 'year' && $closingYear) {
                    $from = sprintf('%s-01-01', $closingYear);
                    $to = sprintf('%s-12-31', $closingYear);
                    $exists = \Illuminate\Support\Facades\DB::table('jurnal')
                        ->where('jenis', 'C')
                        ->whereBetween('tgl_jurnal', [$from, $to])
                        ->exists();
                }
            }

            if ($exists) {
                return response()->json([
                    'message' => 'Jurnal penutup untuk periode ini sudah ada. Gunakan nomor bukti lain atau pilih periode berbeda.',
                ], 409);
            }
        }

        // Validasi Debet/Kredit per baris dan total seimbang
        $debet = 0.0;
        $kredit = 0.0;
        foreach ($data['details'] as $row) {
            $deb = (float) ($row['debet'] ?? 0);
            $kre = (float) ($row['kredit'] ?? 0);
            if ($deb <= 0 && $kre <= 0) {
                return response()->json(['message' => 'Setiap baris harus memiliki Debet atau Kredit > 0'], 422);
            }
            if ($deb > 0 && $kre > 0) {
                return response()->json(['message' => 'Debet dan Kredit tidak boleh keduanya > 0 dalam satu baris'], 422);
            }
            $debet += $deb;
            $kredit += $kre;
        }
        if (round($debet, 2) !== round($kredit, 2)) {
            return response()->json(['message' => 'Total Debet dan Kredit harus seimbang'], 422);
        }

        // Generate nomor jurnal harian: JR + yyyymmdd + 6 digit urut
        $tgl = \Carbon\Carbon::parse($data['tgl_jurnal'])->format('Y-m-d');
        $jam = $data['jam_jurnal'];
        $prefix = 'JR'.str_replace('-', '', $tgl);
        $max = \Illuminate\Support\Facades\DB::table('jurnal')
            ->where('tgl_jurnal', $tgl)
            ->select(\Illuminate\Support\Facades\DB::raw('IFNULL(MAX(CONVERT(RIGHT(no_jurnal,6),SIGNED)),0) AS max_no'))
            ->value('max_no');
        $next = ((int) $max) + 1;
        $noSuffix = str_pad((string) $next, 6, '0', STR_PAD_LEFT);
        $noJurnal = $prefix.$noSuffix;

        // Simpan header & detail dalam transaksi
        \Illuminate\Support\Facades\DB::transaction(function () use ($noJurnal, $data, $tgl, $jam, $request) {
            \Illuminate\Support\Facades\DB::table('jurnal')->insert([
                'no_jurnal' => $noJurnal,
                'no_bukti' => $data['no_bukti'] ?? null,
                'tgl_jurnal' => $tgl,
                'jam_jurnal' => $jam,
                'jenis' => $data['jenis'],
                'keterangan' => $data['keterangan'] ?? null,
            ]);

            $detailRows = [];
            foreach ($data['details'] as $row) {
                $detailRows[] = [
                    'no_jurnal' => $noJurnal,
                    'kd_rek' => $row['kd_rek'],
                    'debet' => (float) ($row['debet'] ?? 0),
                    'kredit' => (float) ($row['kredit'] ?? 0),
                ];
            }
            if (! empty($detailRows)) {
                \Illuminate\Support\Facades\DB::table('detailjurnal')->insert($detailRows);
            }

            // Jika jurnal penutup, simpan metadata ke tabel jurnal_penutup
            if ($data['jenis'] === 'C') {
                $period = (string) $request->input('closing_period');
                $year = (int) $request->input('closing_year');
                $month = $request->input('closing_month') ? (int) $request->input('closing_month') : null;
                $cutoff = $request->input('closing_date');
                $ikhtisar = (string) $request->input('ikhtisar_kd_rek');
                $modal = (string) $request->input('modal_kd_rek');

                // Hitung net profit/loss dari baris Modal
                $sumModalDebit = 0.0;
                $sumModalCredit = 0.0;
                foreach ($detailRows as $dr) {
                    if ($dr['kd_rek'] === $modal) {
                        $sumModalDebit += (float) $dr['debet'];
                        $sumModalCredit += (float) $dr['kredit'];
                    }
                }
                $net = $sumModalCredit - $sumModalDebit; // >0 laba, <0 rugi

                \Illuminate\Support\Facades\DB::table('jurnal_penutup')->insert([
                    'no_jurnal' => $noJurnal,
                    'period' => $period,
                    'year' => $year,
                    'month' => $month,
                    'cutoff_date' => $cutoff,
                    'ikhtisar_kd_rek' => $ikhtisar,
                    'modal_kd_rek' => $modal,
                    'net' => $net,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });

        return response()->json(['message' => 'Jurnal tersimpan', 'no_jurnal' => $noJurnal], 201);
    }

    /**
     * Update header jurnal dan (jika jenis U) detailnya.
     * Body: { no_bukti?, tgl_jurnal?, jam_jurnal?, keterangan?, details?: [{kd_rek,debet,kredit}] }
     */
    public function update(Request $request, string $no_jurnal)
    {
        $j = \App\Models\Akutansi\Jurnal::query()->where('no_jurnal', $no_jurnal)->first();
        if (! $j) {
            return response()->json(['message' => 'Jurnal tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'no_bukti' => ['nullable', 'string', 'max:30'],
            'tgl_jurnal' => ['nullable', 'date'],
            'jam_jurnal' => ['nullable', 'string', 'max:8'],
            'keterangan' => ['nullable', 'string', 'max:350'],
            'details' => ['nullable', 'array'],
            'details.*.kd_rek' => ['required_with:details', 'string', 'exists:rekening,kd_rek'],
            'details.*.debet' => ['nullable', 'numeric', 'min:0'],
            'details.*.kredit' => ['nullable', 'numeric', 'min:0'],
        ]);

        // Update header
        if (array_key_exists('no_bukti', $validated)) {
            $j->no_bukti = $validated['no_bukti'];
        }
        if (array_key_exists('tgl_jurnal', $validated) && $validated['tgl_jurnal']) {
            $j->tgl_jurnal = $validated['tgl_jurnal'];
        }
        if (array_key_exists('jam_jurnal', $validated) && $validated['jam_jurnal']) {
            $j->jam_jurnal = $validated['jam_jurnal'];
        }
        if (array_key_exists('keterangan', $validated)) {
            $j->keterangan = $validated['keterangan'];
        }
        $j->save();

        // Jika jenis U dan ada details dalam payload → replace seluruh detail
        if ($j->jenis === 'U' && isset($validated['details']) && is_array($validated['details'])) {
            // Validasi keseimbangan
            $debet = 0.0;
            $kredit = 0.0;
            foreach ($validated['details'] as $row) {
                $deb = (float) ($row['debet'] ?? 0);
                $kre = (float) ($row['kredit'] ?? 0);
                if ($deb <= 0 && $kre <= 0) {
                    return response()->json(['message' => 'Setiap baris harus memiliki Debet atau Kredit > 0'], 422);
                }
                if ($deb > 0 && $kre > 0) {
                    return response()->json(['message' => 'Debet dan Kredit tidak boleh keduanya > 0 dalam satu baris'], 422);
                }
                $debet += $deb;
                $kredit += $kre;
            }
            if (round($debet, 2) !== round($kredit, 2)) {
                return response()->json(['message' => 'Total Debet dan Kredit harus seimbang'], 422);
            }

            \Illuminate\Support\Facades\DB::transaction(function () use ($no_jurnal, $validated) {
                \Illuminate\Support\Facades\DB::table('detailjurnal')->where('no_jurnal', $no_jurnal)->delete();
                $rows = [];
                foreach ($validated['details'] as $row) {
                    $rows[] = [
                        'no_jurnal' => $no_jurnal,
                        'kd_rek' => $row['kd_rek'],
                        'debet' => (float) ($row['debet'] ?? 0),
                        'kredit' => (float) ($row['kredit'] ?? 0),
                    ];
                }
                if (! empty($rows)) {
                    \Illuminate\Support\Facades\DB::table('detailjurnal')->insert($rows);
                }
            });
        }

        return response()->json(['message' => 'Jurnal diperbarui']);
    }

    /**
     * Hapus jurnal umum (jenis U). Jurnal hasil posting (jenis P) tidak boleh dihapus.
     */
    public function destroy(string $no_jurnal)
    {
        $j = \App\Models\Akutansi\Jurnal::query()->where('no_jurnal', $no_jurnal)->first();
        if (! $j) {
            return response()->json(['message' => 'Jurnal tidak ditemukan'], 404);
        }
        if ($j->jenis !== 'U') {
            return response()->json(['message' => 'Jurnal hasil posting (jenis P/C) tidak boleh dihapus'], 409);
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($no_jurnal) {
            \Illuminate\Support\Facades\DB::table('detailjurnal')->where('no_jurnal', $no_jurnal)->delete();
            \Illuminate\Support\Facades\DB::table('jurnal')->where('no_jurnal', $no_jurnal)->delete();
        });

        return response()->json(['message' => 'Jurnal dihapus']);
    }
}
