<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Services\Akutansi\JurnalPostingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class PengeluaranHarianController extends Controller
{
    public function index(Request $request)
    {
        if (! Schema::hasTable('pengeluaran_harian')) {
            return response()->json(['success' => false, 'message' => 'Tabel pengeluaran_harian tidak tersedia', 'data' => [], 'meta' => ['total' => 0, 'page' => 1, 'per_page' => 25]], 404);
        }

        $from = trim((string) ($request->query('from') ?? ''));
        $to = trim((string) ($request->query('to') ?? ''));
        $today = date('Y-m-d');
        if ($from === '') $from = $today;
        if ($to === '') $to = $today;
        $start = $from.' 00:00:00';
        $end = $to.' 23:59:59';

        $namaKategori = trim((string) ($request->query('nama_kategori') ?? ''));
        $page = max(1, (int) ($request->query('page') ?? 1));
        $perPage = max(1, min(100, (int) ($request->query('per_page') ?? 25)));
        $offset = ($page - 1) * $perPage;

        $qb = DB::table('pengeluaran_harian as p')
            ->leftJoin('kategori_pengeluaran_harian as k', 'k.kode_kategori', '=', 'p.kode_kategori')
            ->select(['p.no_keluar', 'p.tanggal', 'p.kode_kategori', 'p.biaya', 'p.nip', 'p.keterangan', DB::raw('k.nama_kategori as nama_kategori')])
            ->whereBetween('p.tanggal', [$start, $end]);

        if ($namaKategori !== '') {
            $qb = $qb->where('k.nama_kategori', 'like', '%'.$namaKategori.'%');
        }

        $total = (clone $qb)->count();

        $rows = $qb->orderBy('p.tanggal', 'desc')
            ->offset($offset)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $rows,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
            ],
            'filters' => [
                'from' => $from,
                'to' => $to,
                'nama_kategori' => $namaKategori,
            ],
        ]);
    }

    public function generateNoKeluar()
    {
        if (! Schema::hasTable('pengeluaran_harian')) {
            return response()->json(['success' => false, 'message' => 'Tabel pengeluaran_harian tidak tersedia'], 404);
        }

        return DB::transaction(function () {
            $max = DB::table('pengeluaran_harian')
                ->whereRaw("no_keluar REGEXP '^PH[0-9]+$'")
                ->select(DB::raw('MAX(CAST(SUBSTRING(no_keluar, 3) AS UNSIGNED)) as maxnum'))
                ->lockForUpdate()
                ->value('maxnum');

            $next = (int) ($max ?: 0) + 1;
            $no = 'PH'.str_pad((string) $next, 9, '0', STR_PAD_LEFT);

            while (DB::table('pengeluaran_harian')->where('no_keluar', $no)->exists()) {
                $next++;
                $no = 'PH'.str_pad((string) $next, 9, '0', STR_PAD_LEFT);
            }

            return response()->json(['success' => true, 'no_keluar' => $no]);
        });
    }

    public function store(Request $request, JurnalPostingService $posting)
    {
        $data = $request->validate([
            'no_keluar' => ['required', 'string'],
            'tanggal' => ['nullable', 'string'],
            'kode_kategori' => ['required', 'string'],
            'nip' => ['required', 'string'],
            'besar' => ['required', 'numeric'],
            'keterangan' => ['required', 'string'],
        ]);

        if (! Schema::hasTable('pengeluaran_harian')) {
            return response()->json(['message' => 'Tabel pengeluaran_harian tidak tersedia'], 500);
        }
        if (! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['message' => 'Tabel kategori_pengeluaran_harian tidak tersedia'], 500);
        }

        $tanggal = (string) ($data['tanggal'] ?? '');
        if ($tanggal === '') {
            $d = (string) ($request->input('tanggal_date') ?? date('Y-m-d'));
            $t = (string) ($request->input('tanggal_time') ?? date('H:i'));
            $tanggal = substr($d, 0, 10).' '.substr($t, 0, 5).':00';
        }

        return DB::transaction(function () use ($data, $posting, $tanggal) {
            $exists = DB::table('pengeluaran_harian')->where('no_keluar', $data['no_keluar'])->exists();
            if ($exists) {
                return response()->json(['message' => 'no_keluar sudah ada'], 422);
            }

            DB::table('pengeluaran_harian')->insert([
                'no_keluar' => $data['no_keluar'],
                'tanggal' => $tanggal,
                'kode_kategori' => $data['kode_kategori'],
                'biaya' => (float) $data['besar'],
                'nip' => $data['nip'],
                'keterangan' => $data['keterangan'],
            ]);

            $kat = DB::table('kategori_pengeluaran_harian')
                ->select('kd_rek', 'kd_rek2')
                ->where('kode_kategori', $data['kode_kategori'])
                ->first();
            if (! $kat || empty($kat->kd_rek) || empty($kat->kd_rek2)) {
                throw new \RuntimeException('Kategori tidak memiliki kd_rek/kd_rek2');
            }

            DB::table('tampjurnal')->delete();
            DB::table('tampjurnal')->insert([
                ['kd_rek' => (string) $kat->kd_rek, 'nm_rek' => null, 'debet' => (float) $data['besar'], 'kredit' => 0.0],
                ['kd_rek' => (string) $kat->kd_rek2, 'nm_rek' => null, 'debet' => 0.0, 'kredit' => (float) $data['besar']],
            ]);

            $posting->post($data['no_keluar'], $data['keterangan'], substr($tanggal, 0, 10));

            return response()->json(['ok' => true], 201);
        });
    }

    public function storeMandiri(Request $request, JurnalPostingService $posting)
    {
        $data = $request->validate([
            'no_keluar' => ['required', 'string'],
            'tanggal' => ['nullable', 'string'],
            'kode_kategori' => ['required', 'string'],
            'nip' => ['required', 'string'],
            'besar' => ['required', 'numeric'],
            'keterangan' => ['required', 'string'],
            'norek' => ['required', 'string'],
            'atas_nama' => ['required', 'string'],
            'kota_atas_nama' => ['required', 'string'],
            'kode_metode' => ['required', 'string'],
            'kode_bank' => ['required', 'string'],
            'biaya_transaksi' => ['nullable', 'numeric'],
        ]);

        if (! Schema::hasTable('pengeluaran_harian') || ! Schema::hasTable('kategori_pengeluaran_harian')) {
            return response()->json(['message' => 'Tabel pengeluaran_harian/kategori_pengeluaran_harian tidak tersedia'], 500);
        }
        if (! Schema::hasTable('set_akun_mandiri')) {
            return response()->json(['message' => 'Tabel set_akun_mandiri tidak tersedia'], 500);
        }
        if (! Schema::hasTable('pembayaran_pihak_ke3_bankmandiri')) {
            return response()->json(['message' => 'Tabel pembayaran_pihak_ke3_bankmandiri tidak tersedia'], 500);
        }
        if (! Schema::hasTable('metode_pembayaran_bankmandiri') || ! Schema::hasTable('bank_tujuan_transfer_bankmandiri')) {
            return response()->json(['message' => 'Tabel metode/bank Mandiri tidak tersedia'], 500);
        }

        $tanggal = (string) ($data['tanggal'] ?? '');
        if ($tanggal === '') {
            $d = (string) ($request->input('tanggal_date') ?? date('Y-m-d'));
            $t = (string) ($request->input('tanggal_time') ?? date('H:i'));
            $tanggal = substr($d, 0, 10).' '.substr($t, 0, 5).':00';
        }

        return DB::transaction(function () use ($data, $posting, $tanggal) {
            $exists = DB::table('pengeluaran_harian')->where('no_keluar', $data['no_keluar'])->exists();
            if ($exists) {
                return response()->json(['message' => 'no_keluar sudah ada'], 422);
            }

            DB::table('pengeluaran_harian')->insert([
                'no_keluar' => $data['no_keluar'],
                'tanggal' => $tanggal,
                'kode_kategori' => $data['kode_kategori'],
                'biaya' => (float) $data['besar'],
                'nip' => $data['nip'],
                'keterangan' => $data['keterangan'],
            ]);

            $kat = DB::table('kategori_pengeluaran_harian')
                ->select('kd_rek', 'kd_rek2')
                ->where('kode_kategori', $data['kode_kategori'])
                ->first();
            $mandiri = DB::table('set_akun_mandiri')->select('kd_rek', 'kd_rek_biaya', 'kode_mcm', 'no_rekening')->first();
            if (! $kat || empty($kat->kd_rek) || empty($kat->kd_rek2) || ! $mandiri) {
                throw new \RuntimeException('Kategori/Mandiri tidak valid');
            }

            $biayaTrans = $data['biaya_transaksi'] ?? null;
            if ($biayaTrans === null) {
                $biayaTrans = DB::table('metode_pembayaran_bankmandiri')
                    ->where('kode_metode', $data['kode_metode'])
                    ->value('biaya_transaksi');
                $biayaTrans = (float) ($biayaTrans ?? 0);
            } else {
                $biayaTrans = (float) $biayaTrans;
            }

            DB::table('tampjurnal')->delete();
            if ($biayaTrans > 0 && ! empty($mandiri->kd_rek_biaya)) {
                DB::table('tampjurnal')->insert([
                    'kd_rek' => (string) $mandiri->kd_rek_biaya,
                    'nm_rek' => null,
                    'debet' => $biayaTrans,
                    'kredit' => 0.0,
                ]);
            }
            DB::table('tampjurnal')->insert([
                'kd_rek' => (string) $kat->kd_rek,
                'nm_rek' => null,
                'debet' => (float) $data['besar'],
                'kredit' => 0.0,
            ]);
            DB::table('tampjurnal')->insert([
                'kd_rek' => (string) $kat->kd_rek2,
                'nm_rek' => null,
                'debet' => 0.0,
                'kredit' => (float) $data['besar'] + $biayaTrans,
            ]);

            $posting->post($data['no_keluar'], $data['keterangan'], substr($tanggal, 0, 10));

            $prefix = (string) $mandiri->kode_mcm.'14'.preg_replace('/[^0-9]/', '', substr($tanggal, 0, 10));
            $driver = DB::connection()->getDriverName();
            $expr = $driver === 'sqlite'
                ? 'IFNULL(MAX(CAST(SUBSTR(nomor_pembayaran, -6) AS INTEGER)),0)'
                : 'IFNULL(MAX(CONVERT(RIGHT(nomor_pembayaran,6),SIGNED)),0)';
            $max = DB::table('pembayaran_pihak_ke3_bankmandiri')
                ->lockForUpdate()
                ->whereDate('tgl_pembayaran', substr($tanggal, 0, 10))
                ->select(DB::raw($expr.' AS mx'))
                ->value('mx');
            $next = ((int) ($max ?? 0)) + 1;
            $suffix = str_pad((string) $next, 6, '0', STR_PAD_LEFT);
            $nomorPembayaran = $prefix.$suffix;

            DB::table('pembayaran_pihak_ke3_bankmandiri')->insert([
                'nomor_pembayaran' => $nomorPembayaran,
                'tgl_pembayaran' => $tanggal,
                'no_rekening_sumber' => (string) ($mandiri->no_rekening ?? ''),
                'no_rekening_tujuan' => (string) $data['norek'],
                'atas_nama_rekening_tujuan' => (string) $data['atas_nama'],
                'kota_atas_nama_rekening_tujuan' => (string) $data['kota_atas_nama'],
                'nominal_pembayaran' => (float) $data['besar'],
                'nomor_tagihan' => (string) $data['no_keluar'],
                'kode_metode' => (string) $data['kode_metode'],
                'kode_bank' => (string) $data['kode_bank'],
                'kode_transaksi' => (string) $data['no_keluar'],
                'asal_transaksi' => 'Pengeluaran Harian',
                'status_transaksi' => 'Baru',
            ]);

            return response()->json(['ok' => true, 'nomor_pembayaran' => $nomorPembayaran], 201);
        });
    }

    public function destroy(string $no_keluar, JurnalPostingService $posting)
    {
        if (! Schema::hasTable('pengeluaran_harian')) {
            return response()->json(['message' => 'Tabel pengeluaran_harian tidak tersedia'], 500);
        }

        $row = DB::table('pengeluaran_harian')->where('no_keluar', $no_keluar)->first();
        if (! $row) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return DB::transaction(function () use ($row, $posting, $no_keluar) {
            $kat = DB::table('kategori_pengeluaran_harian')
                ->select('kd_rek', 'kd_rek2')
                ->where('kode_kategori', $row->kode_kategori)
                ->first();
            $mandiri = Schema::hasTable('set_akun_mandiri')
                ? DB::table('set_akun_mandiri')->select('kd_rek', 'kd_rek_biaya')->first()
                : null;

            $biayaTrans = 0.0;
            if ($mandiri && $kat && (string) $kat->kd_rek2 === (string) $mandiri->kd_rek && Schema::hasTable('pembayaran_pihak_ke3_bankmandiri')) {
                $biayaTrans = (float) (DB::table('pembayaran_pihak_ke3_bankmandiri as p')
                    ->leftJoin('metode_pembayaran_bankmandiri as m', 'm.kode_metode', '=', 'p.kode_metode')
                    ->where('p.nomor_tagihan', $no_keluar)
                    ->value('m.biaya_transaksi') ?? 0);
                DB::table('pembayaran_pihak_ke3_bankmandiri')->where('nomor_tagihan', $no_keluar)->delete();
            }

            DB::table('pengeluaran_harian')->where('no_keluar', $no_keluar)->delete();

            if ($kat && ! empty($kat->kd_rek) && ! empty($kat->kd_rek2) && (float) ($row->biaya ?? 0) > 0) {
                DB::table('tampjurnal')->delete();
                if ($biayaTrans > 0 && $mandiri && ! empty($mandiri->kd_rek_biaya)) {
                    DB::table('tampjurnal')->insert([
                        'kd_rek' => (string) $mandiri->kd_rek_biaya,
                        'nm_rek' => null,
                        'debet' => 0.0,
                        'kredit' => $biayaTrans,
                    ]);
                }
                DB::table('tampjurnal')->insert([
                    'kd_rek' => (string) $kat->kd_rek,
                    'nm_rek' => null,
                    'debet' => 0.0,
                    'kredit' => (float) $row->biaya,
                ]);
                DB::table('tampjurnal')->insert([
                    'kd_rek' => (string) $kat->kd_rek2,
                    'nm_rek' => null,
                    'debet' => (float) $row->biaya + $biayaTrans,
                    'kredit' => 0.0,
                ]);
                $posting->post($no_keluar, 'Pembatalan '.((string) $row->keterangan ?? ''), substr((string) $row->tanggal, 0, 10));
            }

            return response()->json(['ok' => true]);
        });
    }
}
