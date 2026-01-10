<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RiwayatTransaksiGudangController extends Controller
{
    public function index()
    {
        return Inertia::render('farmasi/RiwayatTransaksiGudang');
    }

    public function data(Request $request)
    {
        $perPage = (int) ($request->query('perPage', 25));
        $page = (int) ($request->query('page', 1));
        $from = $request->query('from');
        $to = $request->query('to');
        $q = $request->query('q');
        $kode = $request->query('kode_brng');
        $bangsal = $request->query('kd_bangsal');
        $namaBrng = $request->query('nama_brng');
        $nmBangsal = $request->query('nm_bangsal');
        $jenis = $request->query('jenis_transaksi');
        $sumber = $request->query('sumber_transaksi');
        $noBatch = $request->query('no_batch');
        $noFaktur = $request->query('no_faktur');

        $query = DB::table('riwayat_transaksi_gudangbarang')
            ->leftJoin('databarang', 'riwayat_transaksi_gudangbarang.kode_brng', '=', 'databarang.kode_brng')
            ->leftJoin('bangsal', 'riwayat_transaksi_gudangbarang.kd_bangsal', '=', 'bangsal.kd_bangsal')
            ->leftJoin('users', 'riwayat_transaksi_gudangbarang.user_id', '=', 'users.id')
            ->select([
                'riwayat_transaksi_gudangbarang.kode_brng',
                'databarang.nama_brng',
                'riwayat_transaksi_gudangbarang.kd_bangsal',
                'bangsal.nm_bangsal',
                'riwayat_transaksi_gudangbarang.no_batch',
                'riwayat_transaksi_gudangbarang.no_faktur',
                'riwayat_transaksi_gudangbarang.jenis_transaksi',
                'riwayat_transaksi_gudangbarang.stok_sebelum',
                'riwayat_transaksi_gudangbarang.stok_sesudah',
                'riwayat_transaksi_gudangbarang.selisih',
                'riwayat_transaksi_gudangbarang.sumber_transaksi',
                'riwayat_transaksi_gudangbarang.keterangan',
                'riwayat_transaksi_gudangbarang.waktu_transaksi',
                DB::raw('users.name as user_name'),
            ]);

        if ($from && $to) {
            $query->whereBetween('riwayat_transaksi_gudangbarang.waktu_transaksi', [
                $from . ' 00:00:00',
                $to . ' 23:59:59',
            ]);
        }

        if ($kode) {
            $query->where('riwayat_transaksi_gudangbarang.kode_brng', 'like', '%' . $kode . '%');
        }

        if ($bangsal) {
            $query->where('riwayat_transaksi_gudangbarang.kd_bangsal', 'like', '%' . $bangsal . '%');
        }

        if ($namaBrng) {
            $query->where('databarang.nama_brng', 'like', '%' . $namaBrng . '%');
        }

        if ($nmBangsal) {
            $query->where('bangsal.nm_bangsal', 'like', '%' . $nmBangsal . '%');
        }

        if ($jenis) {
            $query->where('riwayat_transaksi_gudangbarang.jenis_transaksi', $jenis);
        }

        if ($sumber) {
            $query->where('riwayat_transaksi_gudangbarang.sumber_transaksi', 'like', '%' . $sumber . '%');
        }

        if ($noBatch) {
            $query->where('riwayat_transaksi_gudangbarang.no_batch', 'like', '%' . $noBatch . '%');
        }

        if ($noFaktur) {
            $query->where('riwayat_transaksi_gudangbarang.no_faktur', 'like', '%' . $noFaktur . '%');
        }

        if ($q) {
            $query->where(function ($sub) use ($q) {
                $sub->orWhere('riwayat_transaksi_gudangbarang.kode_brng', 'like', '%' . $q . '%')
                    ->orWhere('databarang.nama_brng', 'like', '%' . $q . '%')
                    ->orWhere('riwayat_transaksi_gudangbarang.kd_bangsal', 'like', '%' . $q . '%')
                    ->orWhere('bangsal.nm_bangsal', 'like', '%' . $q . '%')
                    ->orWhere('riwayat_transaksi_gudangbarang.no_batch', 'like', '%' . $q . '%')
                    ->orWhere('riwayat_transaksi_gudangbarang.no_faktur', 'like', '%' . $q . '%')
                    ->orWhere('riwayat_transaksi_gudangbarang.jenis_transaksi', 'like', '%' . $q . '%')
                    ->orWhere('riwayat_transaksi_gudangbarang.sumber_transaksi', 'like', '%' . $q . '%')
                    ->orWhere('riwayat_transaksi_gudangbarang.keterangan', 'like', '%' . $q . '%')
                    ->orWhere('users.name', 'like', '%' . $q . '%');
            });
        }

        $query->orderByDesc('riwayat_transaksi_gudangbarang.waktu_transaksi');

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'items' => $paginator->items(),
            'total' => $paginator->total(),
            'page' => $paginator->currentPage(),
            'perPage' => $paginator->perPage(),
        ]);
    }
}
