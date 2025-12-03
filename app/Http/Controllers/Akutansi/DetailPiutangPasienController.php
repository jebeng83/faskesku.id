<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\DetailPiutangPasien;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DetailPiutangPasienController extends Controller
{
    /**
     * List detail piutang per no_rawat
     */
    public function index(string $no_rawat): JsonResponse
    {
        $rows = DetailPiutangPasien::where('no_rawat', $no_rawat)
            ->orderBy('nama_bayar')
            ->get();

        return response()->json([
            'no_rawat' => $no_rawat,
            'items' => $rows,
        ]);
    }

    /**
     * Tambah/Update baris detail_piutang_pasien
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'no_rawat' => ['required', 'string', 'exists:reg_periksa,no_rawat'],
            'nama_bayar' => ['required', 'string', 'exists:akun_piutang,nama_bayar'],
            'kd_pj' => ['required', 'string', 'exists:penjab,kd_pj'],
            'totalpiutang' => ['required', 'numeric', 'min:0'],
            'sisapiutang' => ['nullable', 'numeric', 'min:0'],
            'tgltempo' => ['nullable', 'date'],
        ]);

        $row = DetailPiutangPasien::updateOrCreate(
            ['no_rawat' => $data['no_rawat'], 'nama_bayar' => $data['nama_bayar']],
            [
                'kd_pj' => $data['kd_pj'],
                'totalpiutang' => (float) $data['totalpiutang'],
                'sisapiutang' => (float) ($data['sisapiutang'] ?? $data['totalpiutang']),
                'tgltempo' => $data['tgltempo'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Detail piutang pasien tersimpan',
            'item' => $row,
        ], 201);
    }

    /**
     * Update baris detail_piutang_pasien
     */
    public function update(Request $request, string $no_rawat, string $nama_bayar): JsonResponse
    {
        $row = DetailPiutangPasien::where('no_rawat', $no_rawat)->where('nama_bayar', $nama_bayar)->firstOrFail();
        $data = $request->validate([
            'kd_pj' => ['nullable', 'string', 'exists:penjab,kd_pj'],
            'totalpiutang' => ['nullable', 'numeric', 'min:0'],
            'sisapiutang' => ['nullable', 'numeric', 'min:0'],
            'tgltempo' => ['nullable', 'date'],
        ]);
        $row->fill($data);
        $row->save();

        return response()->json(['message' => 'Detail piutang pasien diperbarui', 'item' => $row]);
    }

    /**
     * Hapus baris detail_piutang_pasien
     */
    public function destroy(string $no_rawat, string $nama_bayar): JsonResponse
    {
        $row = DetailPiutangPasien::where('no_rawat', $no_rawat)
            ->where('nama_bayar', $nama_bayar)
            ->firstOrFail();
        $row->delete();

        return response()->json(['message' => 'Detail piutang pasien dihapus']);
    }
}
