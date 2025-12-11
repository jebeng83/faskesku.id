<?php

namespace App\Http\Controllers\Farmasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SirkulasiObatController
{
    public function index(Request $request)
    {
        $jenis = $request->query('jenis', '');
        $kategori = $request->query('kategori', '');
        $golongan = $request->query('golongan', '');
        $q = $request->query('q', '');
        $batchParam = $request->query('batch');
        $lokasi = (string) $request->query('lokasi', '');
        $tglAwal = $request->query('tgl_awal');
        $tglAkhir = $request->query('tgl_akhir');
        $debugParam = (string) $request->query('debug', '');
        $debug = in_array(strtolower($debugParam), ['1', 'true', 'yes', 'on']);
        $page = max(1, (int) $request->query('page', 1));
        $perPage = (int) $request->query('per_page', 10);
        if ($perPage <= 0) {
            $perPage = 10;
        }

        $defaultBatch = env('AKTIFKANBATCHOBAT', 'Yes');
        $batchOn = $batchParam !== null
            ? in_array(strtolower($batchParam), ['on', 'yes', 'true', '1'])
            : in_array(strtolower($defaultBatch), ['on', 'yes', 'true', '1']);

        $hppColumn = env('HPPFARMASI', 'dasar');

        $baseQuery = DB::table('databarang as db')
            ->join('jenis as j', 'db.kdjns', '=', 'j.kdjns')
            ->join('golongan_barang as g', 'db.kode_golongan', '=', 'g.kode')
            ->join('kategori_barang as k', 'db.kode_kategori', '=', 'k.kode')
            ->select(
                'db.kode_brng',
                'db.nama_brng',
                'db.kode_sat',
                DB::raw($hppColumn . ' as harga_satuan')
            )
            ->where('j.nama', 'like', '%' . $jenis . '%')
            ->where('k.nama', 'like', '%' . $kategori . '%')
            ->where('g.nama', 'like', '%' . $golongan . '%')
            ->where(function ($w) use ($q) {
                $w->where('db.kode_brng', 'like', '%' . $q . '%')
                    ->orWhere('db.nama_brng', 'like', '%' . $q . '%');
            })
            ->orderBy('db.kode_brng');

        $paginator = $baseQuery->paginate($perPage, ['*'], 'page', $page);
        $items = $paginator->items();

        $kodeList = [];
        foreach ($items as $it) {
            $kodeList[] = $it->kode_brng;
        }

        $stokMap = [];
        $pengadaanMap = [];
        $penerimaanMap = [];
        $penjualanMap = [];
        $kePasienMap = [];
        $piutangMap = [];
        $returBeliMap = [];
        $returJualMap = [];
        $returPiutangMap = [];
        $utdMap = [];
        $stokKeluarMap = [];
        $resepPulangMap = [];
        $mutasiMasukMap = [];
        $mutasiKeluarMap = [];
        $hibahMap = [];
        $stokAwalMap = [];
        $tglOpnameMap = [];

        if (count($kodeList) > 0) {
            $qStok = DB::table('gudangbarang')->whereIn('kode_brng', $kodeList);
            if ($lokasi !== '') {
                $qStok->where('kd_bangsal', $lokasi);
            }
            if ($batchOn) {
                $qStok->where('no_batch', '<>', '')->where('no_faktur', '<>', '');
            } else {
                $qStok->where(function ($q) {
                    $q->whereNull('no_batch')->orWhere('no_batch', '');
                })
                ->where(function ($q) {
                    $q->whereNull('no_faktur')->orWhere('no_faktur', '');
                });
            }
            $rowsStok = $qStok->select('kode_brng', DB::raw('COALESCE(SUM(stok),0) as stok'))->groupBy('kode_brng')->get();
            foreach ($rowsStok as $r) {
                $stokMap[$r->kode_brng] = (float) ($r->stok ?? 0);
            }

            $qOpnameFirst = DB::table('opname')->whereIn('kode_brng', $kodeList);
            if ($lokasi !== '') {
                $qOpnameFirst->where('kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qOpnameFirst->whereBetween('tanggal', [$tglAwal, $tglAkhir]);
            } elseif ($tglAwal) {
                $qOpnameFirst->where('tanggal', '<=', $tglAwal);
            }
            if ($batchOn) {
                $qOpnameFirst->where('no_batch', '<>', '')->where('no_faktur', '<>', '');
            } else {
                $qOpnameFirst->where(function ($q) {
                    $q->whereNull('no_batch')->orWhere('no_batch', '');
                })->where(function ($q) {
                    $q->whereNull('no_faktur')->orWhere('no_faktur', '');
                });
            }
            $subFirst = $qOpnameFirst->select('kode_brng', DB::raw('MIN(tanggal) as first_tanggal'))->groupBy('kode_brng');

            $qStokAwal = DB::table('opname as o')
                ->joinSub($subFirst, 's', function ($join) {
                    $join->on('o.kode_brng', '=', 's.kode_brng')
                         ->on('o.tanggal', '=', 's.first_tanggal');
                })
                ->whereIn('o.kode_brng', $kodeList);
            if ($lokasi !== '') {
                $qStokAwal->where('o.kd_bangsal', $lokasi);
            }
            if ($batchOn) {
                $qStokAwal->where('o.no_batch', '<>', '')->where('o.no_faktur', '<>', '');
            } else {
                $qStokAwal->where(function ($q) {
                    $q->whereNull('o.no_batch')->orWhere('o.no_batch', '');
                })->where(function ($q) {
                    $q->whereNull('o.no_faktur')->orWhere('o.no_faktur', '');
                });
            }
            $rowsStokAwal = $qStokAwal->select('o.kode_brng', DB::raw('COALESCE(SUM(o.stok),0) as stok'), DB::raw('MIN(o.tanggal) as tanggal'))
                ->groupBy('o.kode_brng')
                ->get();
            foreach ($rowsStokAwal as $r) {
                $stokAwalMap[$r->kode_brng] = (float) ($r->stok ?? 0);
                $tglOpnameMap[$r->kode_brng] = $r->tanggal ?? null;
            }

            // Fallback: jika tidak ada opname dalam periode, ambil opname terakhir sebelum tgl_awal
            if ($tglAwal) {
                $qOpnameBefore = DB::table('opname')->whereIn('kode_brng', $kodeList);
                if ($lokasi !== '') {
                    $qOpnameBefore->where('kd_bangsal', $lokasi);
                }
                $qOpnameBefore->where('tanggal', '<=', $tglAwal);
                if ($batchOn) {
                    $qOpnameBefore->where('no_batch', '<>', '')->where('no_faktur', '<>', '');
                } else {
                    $qOpnameBefore->where(function ($q) {
                        $q->whereNull('no_batch')->orWhere('no_batch', '');
                    })->where(function ($q) {
                        $q->whereNull('no_faktur')->orWhere('no_faktur', '');
                    });
                }
                $subBefore = $qOpnameBefore->select('kode_brng', DB::raw('MAX(tanggal) as before_tanggal'))->groupBy('kode_brng');

                $qStokAwalBefore = DB::table('opname as o2')
                    ->joinSub($subBefore, 'b', function ($join) {
                        $join->on('o2.kode_brng', '=', 'b.kode_brng')
                             ->on('o2.tanggal', '=', 'b.before_tanggal');
                    })
                    ->whereIn('o2.kode_brng', $kodeList);
                if ($lokasi !== '') {
                    $qStokAwalBefore->where('o2.kd_bangsal', $lokasi);
                }
                if ($batchOn) {
                    $qStokAwalBefore->where('o2.no_batch', '<>', '')->where('o2.no_faktur', '<>', '');
                } else {
                    $qStokAwalBefore->where(function ($q) {
                        $q->whereNull('o2.no_batch')->orWhere('o2.no_batch', '');
                    })->where(function ($q) {
                        $q->whereNull('o2.no_faktur')->orWhere('o2.no_faktur', '');
                    });
                }
                $rowsStokAwalBefore = $qStokAwalBefore->select('o2.kode_brng', DB::raw('COALESCE(SUM(o2.stok),0) as stok'), DB::raw('MAX(o2.tanggal) as tanggal'))
                    ->groupBy('o2.kode_brng')
                    ->get();
                foreach ($rowsStokAwalBefore as $r) {
                    if (!array_key_exists($r->kode_brng, $stokAwalMap)) {
                        $stokAwalMap[$r->kode_brng] = (float) ($r->stok ?? 0);
                        $tglOpnameMap[$r->kode_brng] = $r->tanggal ?? $tglAwal;
                    }
                }
            }

            $qPengadaan = DB::table('detailbeli as d')
                ->join('pembelian as p', 'd.no_faktur', '=', 'p.no_faktur')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qPengadaan->where('p.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qPengadaan->whereRaw('p.tgl_beli >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                           ->where('p.tgl_beli', '<=', $tglAkhir);
            }
            $rowsPengadaan = $qPengadaan->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jumlah),0) as jumlah'), DB::raw('COALESCE(SUM(d.total),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsPengadaan as $r) {
                $pengadaanMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qPenerimaan = DB::table('detailpesan as d')
                ->join('pemesanan as p', 'd.no_faktur', '=', 'p.no_faktur')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qPenerimaan->where('p.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qPenerimaan->whereRaw('p.tgl_pesan >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                             ->where('p.tgl_pesan', '<=', $tglAkhir);
            }
            $rowsPenerimaan = $qPenerimaan->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jumlah),0) as jumlah'), DB::raw('COALESCE(SUM(d.total),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsPenerimaan as $r) {
                $penerimaanMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qPenjualan = DB::table('detailjual as d')
                ->join('penjualan as p', 'd.nota_jual', '=', 'p.nota_jual')
                ->whereIn('d.kode_brng', $kodeList)
                ->where('p.status', 'Sudah Dibayar')
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qPenjualan->where('p.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qPenjualan->whereRaw('p.tgl_jual >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                           ->where('p.tgl_jual', '<=', $tglAkhir);
            }
            $rowsPenjualan = $qPenjualan->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jumlah),0) as jumlah'), DB::raw('COALESCE(SUM(d.total),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsPenjualan as $r) {
                $penjualanMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qKePasien = DB::table('detail_pemberian_obat')
                ->whereIn('detail_pemberian_obat.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('detail_pemberian_obat.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qKePasien->where('kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qKePasien->whereRaw('tgl_perawatan >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                           ->where('tgl_perawatan', '<=', $tglAkhir);
            }
            $rowsKePasien = $qKePasien->select('detail_pemberian_obat.kode_brng', DB::raw('COALESCE(SUM(jml),0) as jumlah'), DB::raw('COALESCE(SUM(COALESCE(total,0)-COALESCE(embalase,0)-COALESCE(tuslah,0)),0) as total'))->groupBy('detail_pemberian_obat.kode_brng')->get();
            foreach ($rowsKePasien as $r) {
                $kePasienMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qPiutang = DB::table('detailpiutang as d')
                ->join('piutang as p', 'd.nota_piutang', '=', 'p.nota_piutang')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qPiutang->where('p.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qPiutang->whereRaw('p.tgl_piutang >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                         ->where('p.tgl_piutang', '<=', $tglAkhir);
            }
            $rowsPiutang = $qPiutang->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jumlah),0) as jumlah'), DB::raw('COALESCE(SUM(d.total),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsPiutang as $r) {
                $piutangMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qReturBeli = DB::table('detreturbeli as d')
                ->join('returbeli as r', 'd.no_retur_beli', '=', 'r.no_retur_beli')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qReturBeli->where('r.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qReturBeli->whereRaw('r.tgl_retur >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                            ->where('r.tgl_retur', '<=', $tglAkhir);
            }
            $rowsReturBeli = $qReturBeli->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jml_retur),0) as jumlah'), DB::raw('COALESCE(SUM(d.total),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsReturBeli as $r) {
                $returBeliMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qReturJual = DB::table('detreturjual as d')
                ->join('returjual as r', 'd.no_retur_jual', '=', 'r.no_retur_jual')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qReturJual->where('r.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qReturJual->whereRaw('r.tgl_retur >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                            ->where('r.tgl_retur', '<=', $tglAkhir);
            }
            $rowsReturJual = $qReturJual->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jml_retur),0) as jumlah'), DB::raw('COALESCE(SUM(d.subtotal),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsReturJual as $r) {
                $returJualMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qReturPiutang = DB::table('detreturpiutang as d')
                ->join('returpiutang as r', 'd.no_retur_piutang', '=', 'r.no_retur_piutang')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qReturPiutang->where('r.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qReturPiutang->whereRaw('r.tgl_retur >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                               ->where('r.tgl_retur', '<=', $tglAkhir);
            }
            $rowsReturPiutang = $qReturPiutang->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jml_retur),0) as jumlah'), DB::raw('COALESCE(SUM(d.subtotal),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsReturPiutang as $r) {
                $returPiutangMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qUtd = DB::table('utd_pengambilan_medis')
                ->whereIn('utd_pengambilan_medis.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('utd_pengambilan_medis.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qUtd->where('kd_bangsal_dr', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qUtd->whereRaw('tanggal >= COALESCE(CONCAT(s.first_tanggal, " 00:00:00"), ?)', [$tglAwal . ' 00:00:00'])
                     ->where('tanggal', '<=', $tglAkhir . ' 23:59:59');
            }
            $rowsUtd = $qUtd->select('utd_pengambilan_medis.kode_brng', DB::raw('COALESCE(SUM(utd_pengambilan_medis.jml),0) as jumlah'), DB::raw('COALESCE(SUM(utd_pengambilan_medis.total),0) as total'))->groupBy('utd_pengambilan_medis.kode_brng')->get();
            foreach ($rowsUtd as $r) {
                $utdMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qStokKeluar = DB::table('detail_pengeluaran_obat_bhp as d')
                ->join('pengeluaran_obat_bhp as p', 'd.no_keluar', '=', 'p.no_keluar')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qStokKeluar->where('p.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qStokKeluar->whereRaw('p.tanggal >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                             ->where('p.tanggal', '<=', $tglAkhir);
            }
            $rowsStokKeluar = $qStokKeluar->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jumlah),0) as jumlah'), DB::raw('COALESCE(SUM(d.total),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsStokKeluar as $r) {
                $stokKeluarMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qResepPulang = DB::table('resep_pulang')
                ->whereIn('resep_pulang.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('resep_pulang.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qResepPulang->where('kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qResepPulang->whereRaw('tanggal >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                              ->where('tanggal', '<=', $tglAkhir);
            }
            $rowsResepPulang = $qResepPulang->select('resep_pulang.kode_brng', DB::raw('COALESCE(SUM(jml_barang),0) as jumlah'), DB::raw('COALESCE(SUM(total),0) as total'))->groupBy('resep_pulang.kode_brng')->get();
            foreach ($rowsResepPulang as $r) {
                $resepPulangMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qMutasiMasuk = DB::table('mutasibarang')
                ->whereIn('mutasibarang.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('mutasibarang.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qMutasiMasuk->where('kd_bangsalke', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qMutasiMasuk->whereRaw('tanggal >= COALESCE(CONCAT(s.first_tanggal, " 00:00:00"), ?)', [$tglAwal . ' 00:00:00'])
                              ->where('tanggal', '<=', $tglAkhir . ' 23:59:59');
            }
            $rowsMutasiMasuk = $qMutasiMasuk->select('mutasibarang.kode_brng', DB::raw('COALESCE(SUM(jml),0) as jumlah'), DB::raw('COALESCE(SUM(jml*harga),0) as total'))->groupBy('mutasibarang.kode_brng')->get();
            foreach ($rowsMutasiMasuk as $r) {
                $mutasiMasukMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qMutasiKeluar = DB::table('mutasibarang')
                ->whereIn('mutasibarang.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('mutasibarang.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qMutasiKeluar->where('kd_bangsaldari', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qMutasiKeluar->whereRaw('tanggal >= COALESCE(CONCAT(s.first_tanggal, " 00:00:00"), ?)', [$tglAwal . ' 00:00:00'])
                               ->where('tanggal', '<=', $tglAkhir . ' 23:59:59');
            }
            $rowsMutasiKeluar = $qMutasiKeluar->select('mutasibarang.kode_brng', DB::raw('COALESCE(SUM(jml),0) as jumlah'), DB::raw('COALESCE(SUM(jml*harga),0) as total'))->groupBy('mutasibarang.kode_brng')->get();
            foreach ($rowsMutasiKeluar as $r) {
                $mutasiKeluarMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }

            $qHibah = DB::table('detailhibah_obat_bhp as d')
                ->join('hibah_obat_bhp as h', 'd.no_hibah', '=', 'h.no_hibah')
                ->whereIn('d.kode_brng', $kodeList)
                ->leftJoinSub($subFirst, 's', function ($join) {
                    $join->on('d.kode_brng', '=', 's.kode_brng');
                });
            if ($lokasi !== '') {
                $qHibah->where('h.kd_bangsal', $lokasi);
            }
            if ($tglAwal && $tglAkhir) {
                $qHibah->whereRaw('h.tgl_hibah >= COALESCE(s.first_tanggal, ?)', [$tglAwal])
                        ->where('h.tgl_hibah', '<=', $tglAkhir);
            }
            $rowsHibah = $qHibah->select('d.kode_brng', DB::raw('COALESCE(SUM(d.jumlah),0) as jumlah'), DB::raw('COALESCE(SUM(d.subtotaldiakui),0) as total'))->groupBy('d.kode_brng')->get();
            foreach ($rowsHibah as $r) {
                $hibahMap[$r->kode_brng] = ['jumlah' => (float) ($r->jumlah ?? 0), 'total' => (float) ($r->total ?? 0)];
            }
        }

        $resultItems = [];
        $sourceCounts = ['opname' => 0, 'calc' => 0, 'stok_terakhir' => 0];
        $debugSamples = [];
        foreach ($items as $item) {
            $stokTerakhir = (float) ($stokMap[$item->kode_brng] ?? 0);
            $harga = (float) ($item->harga_satuan ?? 0);
            $asetStok = $harga * $stokTerakhir;

            $pengadaan = $pengadaanMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $penerimaan = $penerimaanMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $penjualan = $penjualanMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $kePasien = $kePasienMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $piutang = $piutangMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $returBeli = $returBeliMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $returJual = $returJualMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $returPiutang = $returPiutangMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $utd = $utdMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $stokKeluar = $stokKeluarMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $resepPulang = $resepPulangMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $mutasiMasuk = $mutasiMasukMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $mutasiKeluar = $mutasiKeluarMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];
            $hibah = $hibahMap[$item->kode_brng] ?? ['jumlah' => 0.0, 'total' => 0.0];

            $inJumlah = (float) (
                ($pengadaan['jumlah'] ?? 0) +
                ($penerimaan['jumlah'] ?? 0) +
                ($mutasiMasuk['jumlah'] ?? 0) +
                ($hibah['jumlah'] ?? 0) +
                ($returJual['jumlah'] ?? 0) +
                ($returPiutang['jumlah'] ?? 0)
            );
            $outJumlah = (float) (
                ($mutasiKeluar['jumlah'] ?? 0) +
                ($penjualan['jumlah'] ?? 0) +
                ($kePasien['jumlah'] ?? 0) +
                ($piutang['jumlah'] ?? 0) +
                ($returBeli['jumlah'] ?? 0) +
                ($utd['jumlah'] ?? 0) +
                ($stokKeluar['jumlah'] ?? 0) +
                ($resepPulang['jumlah'] ?? 0)
            );
            $stokAwalCalc = $stokTerakhir - $inJumlah + $outJumlah;
            $stokAwalFromOpname = $stokAwalMap[$item->kode_brng] ?? null;
            if ($stokAwalFromOpname !== null) {
                $stokAwal = (float) $stokAwalFromOpname;
                $stokAwalSource = 'opname';
            } else {
                $stokAwal = (float) $stokAwalCalc;
                $stokAwalSource = 'calc';
            }
            $stokAwal = max(0.0, (float) $stokAwal);
            $stokAkhirPeriode = max(0.0, (float) ($stokAwal + $inJumlah - $outJumlah));
            $asetStok = $harga * $stokAkhirPeriode;

            $row = [
                'kode_brng' => $item->kode_brng,
                'nama_brng' => $item->nama_brng,
                'kode_sat' => $item->kode_sat,
                'stok_terakhir' => $stokAkhirPeriode,
                'aset_stok' => $asetStok,
                'stok_awal' => $stokAwal,
                'tgl_opname_awal' => $tglOpnameMap[$item->kode_brng] ?? $tglAwal,
                'pengadaan' => $pengadaan,
                'penerimaan' => $penerimaan,
                'penjualan' => $penjualan,
                'ke_pasien' => $kePasien,
                'piutang' => $piutang,
                'retur_beli' => $returBeli,
                'retur_jual' => $returJual,
                'retur_piutang' => $returPiutang,
                'pengambilan_utd' => $utd,
                'stok_keluar_medis' => $stokKeluar,
                'resep_pulang' => $resepPulang,
                'mutasi_masuk' => $mutasiMasuk,
                'mutasi_keluar' => $mutasiKeluar,
                'hibah' => $hibah,
            ];

            if ($debug) {
                $row['debug'] = [
                    'stok_awal_source' => $stokAwalSource,
                    'stok_awal_calc' => (float) $stokAwalCalc,
                    'in_jumlah' => (float) $inJumlah,
                    'out_jumlah' => (float) $outJumlah,
                    'opname_value' => $stokAwalFromOpname !== null ? (float) $stokAwalFromOpname : null,
                    'has_opname' => $stokAwalFromOpname !== null,
                    'lokasi' => $lokasi,
                    'tgl_awal' => $tglAwal,
                    'tgl_akhir' => $tglAkhir,
                ];
                $sourceCounts[$stokAwalSource] = ($sourceCounts[$stokAwalSource] ?? 0) + 1;
                if (count($debugSamples) < 10) {
                    $debugSamples[] = [
                        'kode_brng' => $item->kode_brng,
                        'stok_terakhir' => $stokAkhirPeriode,
                        'stok_awal' => $stokAwal,
                        'source' => $stokAwalSource,
                        'calc' => (float) $stokAwalCalc,
                    ];
                }
            }

            $resultItems[] = $row;
        }

        $links = [];
        $lastPage = (int) $paginator->lastPage();
        $currentPage = (int) $paginator->currentPage();
        if ($lastPage > 1) {
            for ($i = 1; $i <= $lastPage; $i++) {
                $links[] = [
                    'url' => $i === $currentPage ? null : ('?page=' . $i),
                    'label' => (string) $i,
                    'active' => $i === $currentPage,
                ];
            }
        }

        if ($debug) {
            Log::info('SirkulasiObat debug', [
                'filters' => [
                    'lokasi' => $lokasi,
                    'tgl_awal' => $tglAwal,
                    'tgl_akhir' => $tglAkhir,
                    'batch_on' => $batchOn,
                    'per_page' => $perPage,
                    'page' => $page,
                    'q' => $q,
                    'jenis' => $jenis,
                    'kategori' => $kategori,
                    'golongan' => $golongan,
                ],
                'source_counts' => $sourceCounts,
                'samples' => $debugSamples,
            ]);
        }

        return response()->json([
            'items' => [
                'data' => $resultItems,
                'current_page' => $currentPage,
                'last_page' => $lastPage,
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
                'links' => $links,
            ],
        ]);
    }
}
