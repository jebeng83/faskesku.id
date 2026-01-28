<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\RawatJalan\Gudangbarang;
use App\Models\RiwayatTransaksiGudangBarang;
use App\Models\Farmasi\MutasiBarang;

class PermintaanObatController extends Controller
{
    public function search(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $from = $request->query('from');
        $to = $request->query('to');
        $tanggal = $request->query('tanggal');
        $asal = (string) $request->query('kd_bangsal', '');
        $tujuan = (string) $request->query('kd_bangsaltujuan', '');
        $petugas = (string) $request->query('nip', '');
        $status = (string) $request->query('status', '');
        $perPage = (int) $request->query('perPage', 50);
        if ($perPage <= 0) $perPage = 50;

        $query = DB::table('permintaan_medis')
            ->leftJoin('bangsal as asal', 'asal.kd_bangsal', '=', 'permintaan_medis.kd_bangsal')
            ->leftJoin('bangsal as tujuan', 'tujuan.kd_bangsal', '=', 'permintaan_medis.kd_bangsaltujuan')
            ->leftJoin('pegawai', 'pegawai.nik', '=', 'permintaan_medis.nip')
            ->select(
                'permintaan_medis.no_permintaan',
                'permintaan_medis.tanggal',
                'permintaan_medis.kd_bangsal',
                DB::raw('COALESCE(asal.nm_bangsal, permintaan_medis.kd_bangsal) as nm_bangsal_asal'),
                'permintaan_medis.kd_bangsaltujuan',
                DB::raw('COALESCE(tujuan.nm_bangsal, permintaan_medis.kd_bangsaltujuan) as nm_bangsal_tujuan'),
                'permintaan_medis.nip',
                DB::raw('COALESCE(pegawai.nama, permintaan_medis.nip) as nama_pegawai'),
                'permintaan_medis.status'
            )
            ->orderByDesc('permintaan_medis.tanggal')
            ->orderByDesc('permintaan_medis.no_permintaan');

        if ($q !== '') {
            $query->where(function ($w) use ($q) {
                $w->where('no_permintaan', 'like', "%$q%")
                    ->orWhere('kd_bangsal', 'like', "%$q%")
                    ->orWhere('kd_bangsaltujuan', 'like', "%$q%")
                    ->orWhere('nip', 'like', "%$q%");
            });
        }
        if ($tanggal) {
            $query->whereDate('tanggal', $tanggal);
        } else {
            if ($from) $query->whereDate('tanggal', '>=', $from);
            if ($to) $query->whereDate('tanggal', '<=', $to);
        }
        if ($asal !== '') $query->where('permintaan_medis.kd_bangsal', $asal);
        if ($tujuan !== '') $query->where('permintaan_medis.kd_bangsaltujuan', $tujuan);
        if ($petugas !== '') $query->where('permintaan_medis.nip', $petugas);
        if ($status !== '') $query->where('permintaan_medis.status', $status);

        $total = (clone $query)->count();
        $items = $query->limit($perPage)->get();
        return response()->json([
            'items' => $items,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => ['required', 'date'],
            'kd_bangsal_asal' => ['required', 'string', 'max:5'],
            'kd_bangsal_tujuan' => ['required', 'string', 'max:5'],
            'kd_petugas' => ['required', 'string', 'max:20'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.kode_brng' => ['required', 'string', 'max:15'],
            'items.*.satuan' => ['nullable', 'string', 'max:4'],
            'items.*.jumlah' => ['required', 'numeric', 'min:0.0000001'],
            'items.*.keterangan' => ['nullable', 'string', 'max:150'],
        ]);

        $tanggal = (string) $validated['tanggal'];
        $asal = (string) $validated['kd_bangsal_asal'];
        $tujuan = (string) $validated['kd_bangsal_tujuan'];
        $petugas = (string) $validated['kd_petugas'];
        $items = collect($validated['items'])
            ->map(function ($it) {
                return [
                    'kode_brng' => (string) ($it['kode_brng'] ?? ''),
                    'kode_sat' => (string) ($it['satuan'] ?? ''),
                    'jumlah' => (double) ($it['jumlah'] ?? 0),
                    'keterangan' => str_replace(['"', "'"], '', (string) ($it['keterangan'] ?? '')),
                ];
            })
            ->filter(fn ($it) => ($it['kode_brng'] !== '') && ($it['jumlah'] > 0))
            ->values()
            ->all();

        if (empty($items)) {
            return response()->json(['success' => false, 'message' => 'Tidak ada item valid'], 422);
        }

        $no = null;
        DB::transaction(function () use (&$no, $tanggal, $asal, $tujuan, $petugas, $items) {
            $prefix = 'PM' . str_replace('-', '', $tanggal);
            $last = DB::table('permintaan_medis')
                ->where('no_permintaan', 'like', $prefix . '%')
                ->orderBy('no_permintaan', 'desc')
                ->value('no_permintaan');
            $nextNum = $last ? (int) substr($last, strlen($prefix)) + 1 : 1;
            $no = $prefix . str_pad($nextNum, 3, '0', STR_PAD_LEFT);

            DB::table('permintaan_medis')->insert([
                'no_permintaan' => $no,
                'kd_bangsal' => $asal,
                'nip' => $petugas,
                'tanggal' => $tanggal,
                'status' => 'Baru',
                'kd_bangsaltujuan' => $tujuan,
            ]);

            foreach ($items as $it) {
                DB::table('detail_permintaan_medis')->insert([
                    'no_permintaan' => $no,
                    'kode_brng' => $it['kode_brng'],
                    'kode_sat' => $it['kode_sat'],
                    'jumlah' => $it['jumlah'],
                    'keterangan' => $it['keterangan'],
                ]);
            }
        });

        return response()->json(['success' => true, 'no_permintaan' => $no]);
    }

    public function approveMutasi(Request $request, string $no): JsonResponse
    {
        try {
            return DB::transaction(function () use ($no) {
                $perm = DB::table('permintaan_medis')->where('no_permintaan', $no)->lockForUpdate()->first();
                if (! $perm) {
                    return response()->json(['success' => false, 'message' => 'Permintaan tidak ditemukan'], 404);
                }
                $asal = (string) ($perm->kd_bangsal ?? '');
                $tujuan = (string) ($perm->kd_bangsaltujuan ?? '');
                $status = (string) ($perm->status ?? '');
                if ($asal === '' || $tujuan === '') {
                    return response()->json(['success' => false, 'message' => 'Lokasi asal/tujuan tidak valid'], 422);
                }

                $details = DB::table('detail_permintaan_medis')->where('no_permintaan', $no)->get();
                if ($details->isEmpty()) {
                    return response()->json(['success' => false, 'message' => 'Detail permintaan kosong'], 422);
                }

                foreach ($details as $det) {
                    $kode = (string) ($det->kode_brng ?? '');
                    $jumlah = (float) ($det->jumlah ?? 0);
                    if ($kode === '' || $jumlah <= 0) continue;

                    $available = DB::table('gudangbarang')
                        ->where('kode_brng', $kode)
                        ->where('kd_bangsal', $asal)
                        ->sum('stok');
                    if ($available < $jumlah) {
                        throw new \Exception("Stok tidak mencukupi untuk {$kode}. Tersedia: {$available}, Diminta: {$jumlah}");
                    }

                    $sisa = $jumlah;
                    $rows = DB::table('gudangbarang')
                        ->where('kode_brng', $kode)
                        ->where('kd_bangsal', $asal)
                        ->where('stok', '>', 0)
                        ->orderBy('no_faktur')
                        ->orderBy('no_batch')
                        ->lockForUpdate()
                        ->get();

                    foreach ($rows as $r) {
                        if ($sisa <= 0) break;
                        $ambil = min($sisa, (float) ($r->stok ?? 0));
                        if ($ambil <= 0) continue;

                        $stokLama = (float) ($r->stok ?? 0);
                        $stokBaru = $stokLama - $ambil;
                        DB::table('gudangbarang')
                            ->where('kode_brng', $kode)
                            ->where('kd_bangsal', $asal)
                            ->where('no_batch', (string) ($r->no_batch ?? ''))
                            ->where('no_faktur', (string) ($r->no_faktur ?? ''))
                            ->update(['stok' => $stokBaru]);

                        try {
                            RiwayatTransaksiGudangBarang::catatUpdate(
                                $kode,
                                $asal,
                                (string) ($r->no_batch ?? ''),
                                (string) ($r->no_faktur ?? ''),
                                $stokLama,
                                $stokBaru,
                                'permintaan_obat',
                                'approve_mutasi',
                                ['no_permintaan' => $no, 'jumlah_diambil' => $ambil],
                                ['no_permintaan' => $no, 'jumlah_diambil' => $ambil]
                            );
                        } catch (\Throwable $th) {}

                        $target = DB::table('gudangbarang')
                            ->where('kode_brng', $kode)
                            ->where('kd_bangsal', $tujuan)
                            ->where('no_batch', (string) ($r->no_batch ?? ''))
                            ->where('no_faktur', (string) ($r->no_faktur ?? ''))
                            ->lockForUpdate()
                            ->first();

                        if ($target) {
                            $stokLamaT = (float) ($target->stok ?? 0);
                            $stokBaruT = $stokLamaT + $ambil;
                            DB::table('gudangbarang')
                                ->where('kode_brng', $kode)
                                ->where('kd_bangsal', $tujuan)
                                ->where('no_batch', (string) ($r->no_batch ?? ''))
                                ->where('no_faktur', (string) ($r->no_faktur ?? ''))
                                ->update(['stok' => $stokBaruT]);
                            try {
                                RiwayatTransaksiGudangBarang::catatUpdate(
                                    $kode,
                                    $tujuan,
                                    (string) ($r->no_batch ?? ''),
                                    (string) ($r->no_faktur ?? ''),
                                    $stokLamaT,
                                    $stokBaruT,
                                    'permintaan_obat',
                                    'approve_mutasi',
                                    ['no_permintaan' => $no, 'jumlah_diterima' => $ambil],
                                    ['no_permintaan' => $no, 'jumlah_diterima' => $ambil]
                                );
                            } catch (\Throwable $th) {}
                        } else {
                            DB::table('gudangbarang')->insert([
                                'kode_brng' => $kode,
                                'kd_bangsal' => $tujuan,
                                'stok' => $ambil,
                                'no_batch' => (string) ($r->no_batch ?? ''),
                                'no_faktur' => (string) ($r->no_faktur ?? ''),
                            ]);
                            try {
                                RiwayatTransaksiGudangBarang::catatInsert(
                                    $kode,
                                    $tujuan,
                                    (string) ($r->no_batch ?? ''),
                                    (string) ($r->no_faktur ?? ''),
                                    $ambil,
                                    'permintaan_obat',
                                    'approve_mutasi',
                                    ['no_permintaan' => $no, 'jumlah_diterima' => $ambil]
                                );
                            } catch (\Throwable $th) {}
                        }

                        $sisa -= $ambil;
                    }

                    $hBeli = (float) (DB::table('databarang')->where('kode_brng', $kode)->value('h_beli') ?? 0);
                    DB::table('mutasibarang')->insert([
                        'kode_brng' => $kode,
                        'jml' => $jumlah,
                        'harga' => $hBeli,
                        'kd_bangsaldari' => $asal,
                        'kd_bangsalke' => $tujuan,
                        'tanggal' => now()->format('Y-m-d H:i:s'),
                        'keterangan' => 'Permintaan No. ' . $no,
                        'no_batch' => '',
                        'no_faktur' => '',
                    ]);
                }

                DB::table('permintaan_medis')->where('no_permintaan', $no)->update(['status' => 'Disetujui']);
                return response()->json(['success' => true, 'status' => 'Disetujui']);
            });
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function approveStokKeluar(Request $request, string $no): JsonResponse
    {
        try {
            return DB::transaction(function () use ($no) {
                $perm = DB::table('permintaan_medis')->where('no_permintaan', $no)->lockForUpdate()->first();
                if (! $perm) {
                    return response()->json(['success' => false, 'message' => 'Permintaan tidak ditemukan'], 404);
                }
                $asal = (string) ($perm->kd_bangsal ?? '');
                if ($asal === '') {
                    return response()->json(['success' => false, 'message' => 'Lokasi asal tidak valid'], 422);
                }

                $details = DB::table('detail_permintaan_medis')->where('no_permintaan', $no)->get();
                if ($details->isEmpty()) {
                    return response()->json(['success' => false, 'message' => 'Detail permintaan kosong'], 422);
                }

                foreach ($details as $det) {
                    $kode = (string) ($det->kode_brng ?? '');
                    $jumlah = (float) ($det->jumlah ?? 0);
                    if ($kode === '' || $jumlah <= 0) continue;

                    $available = DB::table('gudangbarang')
                        ->where('kode_brng', $kode)
                        ->where('kd_bangsal', $asal)
                        ->sum('stok');
                    if ($available < $jumlah) {
                        throw new \Exception("Stok tidak mencukupi untuk {$kode}. Tersedia: {$available}, Diminta: {$jumlah}");
                    }

                    $sisa = $jumlah;
                    $rows = DB::table('gudangbarang')
                        ->where('kode_brng', $kode)
                        ->where('kd_bangsal', $asal)
                        ->where('stok', '>', 0)
                        ->orderBy('no_faktur')
                        ->orderBy('no_batch')
                        ->lockForUpdate()
                        ->get();

                    foreach ($rows as $r) {
                        if ($sisa <= 0) break;
                        $ambil = min($sisa, (float) ($r->stok ?? 0));
                        if ($ambil <= 0) continue;

                        $stokLama = (float) ($r->stok ?? 0);
                        $stokBaru = $stokLama - $ambil;
                        DB::table('gudangbarang')
                            ->where('kode_brng', $kode)
                            ->where('kd_bangsal', $asal)
                            ->where('no_batch', (string) ($r->no_batch ?? ''))
                            ->where('no_faktur', (string) ($r->no_faktur ?? ''))
                            ->update(['stok' => $stokBaru]);

                        try {
                            RiwayatTransaksiGudangBarang::catatUpdate(
                                $kode,
                                $asal,
                                (string) ($r->no_batch ?? ''),
                                (string) ($r->no_faktur ?? ''),
                                $stokLama,
                                $stokBaru,
                                'permintaan_obat',
                                'approve_stok_keluar',
                                ['no_permintaan' => $no, 'jumlah_diambil' => $ambil],
                                ['no_permintaan' => $no, 'jumlah_diambil' => $ambil]
                            );
                        } catch (\Throwable $th) {}

                        $sisa -= $ambil;
                    }
                }

                DB::table('permintaan_medis')->where('no_permintaan', $no)->update(['status' => 'Disetujui']);
                return response()->json(['success' => true, 'status' => 'Disetujui']);
            });
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function reject(Request $request, string $no): JsonResponse
    {
        $exists = DB::table('permintaan_medis')->where('no_permintaan', $no)->exists();
        if (! $exists) {
            return response()->json(['success' => false, 'message' => 'Permintaan tidak ditemukan'], 404);
        }
        DB::table('permintaan_medis')->where('no_permintaan', $no)->update(['status' => 'Tidak Disetujui']);
        return response()->json(['success' => true, 'status' => 'Tidak Disetujui']);
    }

    public function destroy(Request $request, string $no): JsonResponse
    {
        $perm = DB::table('permintaan_medis')->where('no_permintaan', $no)->first();
        if (! $perm) {
            return response()->json(['success' => false, 'message' => 'Permintaan tidak ditemukan'], 404);
        }
        if ((string) ($perm->status ?? '') === 'Disetujui') {
            return response()->json(['success' => false, 'message' => 'Tidak dapat menghapus permintaan yang sudah disetujui'], 409);
        }
        DB::transaction(function () use ($no) {
            DB::table('detail_permintaan_medis')->where('no_permintaan', $no)->delete();
            DB::table('permintaan_medis')->where('no_permintaan', $no)->delete();
        });
        return response()->json(['success' => true]);
    }
}
