<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Akutansi\NotaJalan;

class NotaJalanController extends Controller
{
    /**
     * Tampilkan nota_jalan beserta ringkasannya
     */
    public function show(string $no_rawat): JsonResponse
    {
        $nota = NotaJalan::where('no_rawat', $no_rawat)->first();
        $details = DB::table('detail_nota_jalan')
            ->leftJoin('akun_bayar', 'akun_bayar.nama_bayar', '=', 'detail_nota_jalan.nama_bayar')
            ->where('detail_nota_jalan.no_rawat', $no_rawat)
            ->select(['detail_nota_jalan.*', 'akun_bayar.kd_rek', 'akun_bayar.ppn'])
            ->orderBy('detail_nota_jalan.nama_bayar')
            ->get();

        $totals = [
            'besar_bayar' => (float) $details->sum('besar_bayar'),
            'besarppn' => (float) $details->sum('besarppn'),
        ];
        $totals['grand_total'] = $totals['besar_bayar'] + $totals['besarppn'];

        return response()->json([
            'nota' => $nota,
            'details' => $details,
            'totals' => $totals,
        ]);
    }

    /**
     * Buat atau perbarui nota_jalan untuk no_rawat tertentu
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'no_rawat' => ['required', 'string', 'exists:reg_periksa,no_rawat'],
            'tanggal' => ['nullable', 'date'],
            'jam' => ['nullable', 'date_format:H:i:s'],
        ]);

        $now = Carbon::now();
        $tanggal = $data['tanggal'] ?? $now->toDateString();
        $jam = $data['jam'] ?? $now->toTimeString();

        // Generate no_nota unik mirip pola RJYYYYMMDD-XXXX
        $prefix = 'RJ' . Carbon::parse($tanggal)->format('Ymd');
        $no_nota = null;
        for ($i = 0; $i < 5; $i++) {
            $candidate = $prefix . '-' . strtoupper(substr(md5(uniqid((string) mt_rand(), true)), 0, 4));
            if (!NotaJalan::where('no_nota', $candidate)->exists()) {
                $no_nota = $candidate;
                break;
            }
        }
        if ($no_nota === null) {
            // fallback jika semuanya tabrakan (sangat kecil kemungkinannya)
            $no_nota = $prefix . '-' . $now->format('His');
        }

        $row = NotaJalan::updateOrCreate(
            ['no_rawat' => $data['no_rawat']],
            [
                'no_nota' => $no_nota,
                'tanggal' => $tanggal,
                'jam' => $jam,
            ]
        );

        return response()->json([
            'message' => 'Nota Jalan tersimpan',
            'nota' => $row,
        ], 201);
    }

    /**
     * Batalkan nota_jalan (hapus nota + detail)
     */
    public function destroy(string $no_rawat): JsonResponse
    {
        DB::beginTransaction();
        try {
            DB::table('detail_nota_jalan')->where('no_rawat', $no_rawat)->delete();
            DB::table('nota_jalan')->where('no_rawat', $no_rawat)->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Gagal membatalkan nota_jalan',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Nota Jalan dibatalkan',
        ]);
    }
}