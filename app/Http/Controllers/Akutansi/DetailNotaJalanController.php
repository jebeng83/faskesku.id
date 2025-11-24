<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Akutansi\DetailNotaJalan;
use App\Models\Akutansi\AkunBayar;
use Illuminate\Support\Facades\DB;

class DetailNotaJalanController extends Controller
{
    /**
     * List detail_nota_jalan untuk satu no_rawat
     */
    public function index(Request $request, string $no_rawat): JsonResponse
    {
        $rows = DB::table('detail_nota_jalan')
            ->leftJoin('akun_bayar', 'akun_bayar.nama_bayar', '=', 'detail_nota_jalan.nama_bayar')
            ->where('detail_nota_jalan.no_rawat', $no_rawat)
            ->select(['detail_nota_jalan.*', 'akun_bayar.kd_rek', 'akun_bayar.ppn'])
            ->orderBy('detail_nota_jalan.nama_bayar')
            ->get();

        $totalBayar = (float) $rows->sum('besar_bayar');
        $totalPPN = (float) $rows->sum('besarppn');

        return response()->json([
            'no_rawat' => $no_rawat,
            'items' => $rows,
            'totals' => [
                'besar_bayar' => $totalBayar,
                'besarppn' => $totalPPN,
                'grand_total' => $totalBayar + $totalPPN,
            ],
        ]);
    }

    /**
     * Tambah/Update baris detail_nota_jalan
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'no_rawat' => ['required', 'string', 'exists:reg_periksa,no_rawat'],
            'nama_bayar' => ['required', 'string', 'exists:akun_bayar,nama_bayar'],
            'besar_bayar' => ['required', 'numeric', 'min:0'],
        ]);

        $akun = AkunBayar::findOrFail($data['nama_bayar']);
        $ppnPercent = (float) ($akun->ppn ?? 0);
        $besarppn = round(((float) $data['besar_bayar']) * $ppnPercent / 100.0, 2);

        $row = DetailNotaJalan::firstOrNew([
            'no_rawat' => $data['no_rawat'],
            'nama_bayar' => $data['nama_bayar'],
        ]);
        $row->besar_bayar = (float) $data['besar_bayar'];
        $row->besarppn = $besarppn;
        $row->save();

        return response()->json([
            'message' => 'Detail Nota Jalan tersimpan',
            'item' => $row,
        ], 201);
    }

    /**
     * Hapus baris detail_nota_jalan
     */
    public function destroy(string $no_rawat, string $nama_bayar): JsonResponse
    {
        $row = DetailNotaJalan::where('no_rawat', $no_rawat)
            ->where('nama_bayar', $nama_bayar)
            ->firstOrFail();
        $row->delete();

        return response()->json([
            'message' => 'Detail Nota Jalan dihapus',
        ]);
    }
}