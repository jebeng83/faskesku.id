<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Akutansi\PiutangPasien;

class PiutangPasienController extends Controller
{
    /**
     * List piutang pasien dengan filter sederhana
     */
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $status = $request->query('status'); // 'Lunas' atau 'Belum Lunas'
        $from = $request->query('from');
        $to = $request->query('to');

        $query = DB::table('piutang_pasien')
            ->leftJoin('pasien', 'pasien.no_rkm_medis', '=', 'piutang_pasien.no_rkm_medis')
            ->select([
                'piutang_pasien.*',
                'pasien.nm_pasien',
            ]);

        if ($q !== '') {
            $like = "%$q%";
            $query->where(function ($w) use ($like) {
                $w->where('piutang_pasien.no_rawat', 'like', $like)
                  ->orWhere('piutang_pasien.no_rkm_medis', 'like', $like)
                  ->orWhere('pasien.nm_pasien', 'like', $like);
            });
        }
        if (!empty($status)) {
            $query->where('piutang_pasien.status', $status);
        }
        if ($from && $to) {
            $query->whereBetween('piutang_pasien.tgl_piutang', [$from, $to]);
        }

        $rows = $query->orderByDesc('piutang_pasien.tgl_piutang')->limit(300)->get();

        return response()->json([
            'data' => $rows,
            'filters' => [
                'q' => $q,
                'status' => $status,
                'from' => $from,
                'to' => $to,
            ],
        ]);
    }

    /**
     * Detail satu piutang pasien (termasuk rincian per akun piutang)
     */
    public function show(string $no_rawat): JsonResponse
    {
        $piutang = PiutangPasien::where('no_rawat', $no_rawat)->firstOrFail();
        $details = DB::table('detail_piutang_pasien')
            ->leftJoin('akun_piutang', 'akun_piutang.nama_bayar', '=', 'detail_piutang_pasien.nama_bayar')
            ->leftJoin('penjab', 'penjab.kd_pj', '=', 'detail_piutang_pasien.kd_pj')
            ->where('detail_piutang_pasien.no_rawat', $no_rawat)
            ->select([
                'detail_piutang_pasien.*',
                'akun_piutang.kd_rek',
                'penjab.png_jawab',
            ])
            ->orderBy('detail_piutang_pasien.nama_bayar')
            ->get();

        return response()->json([
            'piutang' => $piutang,
            'details' => $details,
        ]);
    }

    /**
     * Buat/Update piutang pasien untuk no_rawat
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'no_rawat' => ['required', 'string', 'exists:reg_periksa,no_rawat'],
            'no_rkm_medis' => ['required', 'string', 'exists:pasien,no_rkm_medis'],
            'totalpiutang' => ['required', 'numeric', 'min:0'],
            'uangmuka' => ['nullable', 'numeric', 'min:0'],
            'tgl_piutang' => ['nullable', 'date'],
            'tgltempo' => ['nullable', 'date'],
        ]);

        $now = Carbon::now();
        $tglPiutang = $data['tgl_piutang'] ?? $now->toDateString();
        $uangMuka = (float) ($data['uangmuka'] ?? 0);
        $total = (float) $data['totalpiutang'];
        $sisa = max(0.0, $total - $uangMuka);

        $row = PiutangPasien::updateOrCreate(
            ['no_rawat' => $data['no_rawat']],
            [
                'tgl_piutang' => $tglPiutang,
                'no_rkm_medis' => $data['no_rkm_medis'],
                'status' => $sisa <= 0 ? 'Lunas' : 'Belum Lunas',
                'totalpiutang' => $total,
                'uangmuka' => $uangMuka,
                'sisapiutang' => $sisa,
                'tgltempo' => $data['tgltempo'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Piutang pasien tersimpan',
            'piutang' => $row,
        ], 201);
    }

    /**
     * Update status/angka piutang pasien
     */
    public function update(Request $request, string $no_rawat): JsonResponse
    {
        $row = PiutangPasien::findOrFail($no_rawat);
        $data = $request->validate([
            'status' => ['nullable', 'in:Lunas,Belum Lunas'],
            'totalpiutang' => ['nullable', 'numeric', 'min:0'],
            'uangmuka' => ['nullable', 'numeric', 'min:0'],
            'sisapiutang' => ['nullable', 'numeric', 'min:0'],
            'tgltempo' => ['nullable', 'date'],
        ]);

        // Jika sebagian field kosong, biarkan nilai lama
        $row->fill($data);
        // Normalisasi status berdasarkan sisa
        if (array_key_exists('totalpiutang', $data) || array_key_exists('uangmuka', $data) || array_key_exists('sisapiutang', $data)) {
            $sisa = (float) ($data['sisapiutang'] ?? $row->sisapiutang ?? 0);
            $row->status = $sisa <= 0 ? 'Lunas' : 'Belum Lunas';
        }
        $row->save();

        return response()->json([
            'message' => 'Piutang pasien diperbarui',
            'piutang' => $row,
        ]);
    }

    /**
     * Hapus piutang pasien + detailnya
     */
    public function destroy(string $no_rawat): JsonResponse
    {
        DB::beginTransaction();
        try {
            DB::table('detail_piutang_pasien')->where('no_rawat', $no_rawat)->delete();
            DB::table('piutang_pasien')->where('no_rawat', $no_rawat)->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Gagal menghapus piutang pasien',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Piutang pasien dihapus',
        ]);
    }
}