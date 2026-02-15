<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SetKamarInapController extends Controller
{
    private function defaults(): array
    {
        return [
            'lamajam' => 0,
            'hariawal' => 'No',
            'feeperujuk' => 0,
            'diagnosaakhir' => 'No',
            'bayi' => 0,
            'aktifkan_hapus_data_salah' => 'No',
            'kamar_inap_kasir_ralan' => 'No',
            'ubah_status_kamar' => 'No',
        ];
    }

    public function apiShow(Request $request)
    {
        $row = DB::table('set_jam_minimal')->first();

        if (! $row) {
            return response()->json([
                'ok' => true,
                'exists' => false,
                'data' => $this->defaults(),
            ]);
        }

        $data = [
            'lamajam' => (int) ($row->lamajam ?? 0),
            'hariawal' => (string) ($row->hariawal ?? 'No'),
            'feeperujuk' => (float) ($row->feeperujuk ?? 0),
            'diagnosaakhir' => (string) ($row->diagnosaakhir ?? 'No'),
            'bayi' => (int) ($row->bayi ?? 0),
            'aktifkan_hapus_data_salah' => (string) ($row->aktifkan_hapus_data_salah ?? 'No'),
            'kamar_inap_kasir_ralan' => (string) ($row->kamar_inap_kasir_ralan ?? 'No'),
            'ubah_status_kamar' => (string) ($row->ubah_status_kamar ?? 'No'),
        ];

        return response()->json([
            'ok' => true,
            'exists' => true,
            'data' => $data,
        ]);
    }

    public function apiStore(Request $request)
    {
        if (DB::table('set_jam_minimal')->exists()) {
            return response()->json([
                'ok' => false,
                'message' => 'Setup kamar inap sudah ada. Gunakan update untuk mengubah.',
            ], 409);
        }

        $validated = $request->validate([
            'lamajam' => 'required|integer|min:0|max:999',
            'hariawal' => 'required|in:Yes,No',
            'feeperujuk' => 'required|numeric|min:0',
            'diagnosaakhir' => 'required|in:Yes,No',
            'bayi' => 'required|integer|min:0|max:100',
            'aktifkan_hapus_data_salah' => 'required|in:Yes,No',
            'kamar_inap_kasir_ralan' => 'required|in:Yes,No',
            'ubah_status_kamar' => 'required|in:Yes,No',
        ]);

        DB::table('set_jam_minimal')->insert([
            'lamajam' => (int) $validated['lamajam'],
            'hariawal' => $validated['hariawal'],
            'feeperujuk' => (float) $validated['feeperujuk'],
            'diagnosaakhir' => $validated['diagnosaakhir'],
            'bayi' => (int) $validated['bayi'],
            'aktifkan_hapus_data_salah' => $validated['aktifkan_hapus_data_salah'],
            'kamar_inap_kasir_ralan' => $validated['kamar_inap_kasir_ralan'],
            'ubah_status_kamar' => $validated['ubah_status_kamar'],
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Setup kamar inap berhasil disimpan',
        ], 201);
    }

    public function apiUpdate(Request $request)
    {
        $validated = $request->validate([
            'lamajam' => 'required|integer|min:0|max:999',
            'hariawal' => 'required|in:Yes,No',
            'feeperujuk' => 'required|numeric|min:0',
            'diagnosaakhir' => 'required|in:Yes,No',
            'bayi' => 'required|integer|min:0|max:100',
            'aktifkan_hapus_data_salah' => 'required|in:Yes,No',
            'kamar_inap_kasir_ralan' => 'required|in:Yes,No',
            'ubah_status_kamar' => 'required|in:Yes,No',
        ]);

        $existed = DB::table('set_jam_minimal')->exists();

        DB::transaction(function () use ($validated) {
            DB::table('set_jam_minimal')->delete();
            DB::table('set_jam_minimal')->insert([
                'lamajam' => (int) $validated['lamajam'],
                'hariawal' => $validated['hariawal'],
                'feeperujuk' => (float) $validated['feeperujuk'],
                'diagnosaakhir' => $validated['diagnosaakhir'],
                'bayi' => (int) $validated['bayi'],
                'aktifkan_hapus_data_salah' => $validated['aktifkan_hapus_data_salah'],
                'kamar_inap_kasir_ralan' => $validated['kamar_inap_kasir_ralan'],
                'ubah_status_kamar' => $validated['ubah_status_kamar'],
            ]);
        });

        return response()->json([
            'ok' => true,
            'message' => $existed ? 'Setup kamar inap berhasil diperbarui' : 'Setup kamar inap berhasil disimpan',
        ], $existed ? 200 : 201);
    }

    public function apiDestroy(Request $request)
    {
        $deleted = DB::table('set_jam_minimal')->delete();

        return response()->json([
            'ok' => true,
            'deleted' => $deleted,
            'message' => 'Setup kamar inap berhasil dihapus',
        ]);
    }
}

