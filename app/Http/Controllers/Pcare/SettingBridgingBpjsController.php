<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SettingBridgingBpjsController extends Controller
{
    /**
     * Tampilkan form pengaturan Bridging BPJS PCare.
     */
    public function index()
    {
        $row = DB::table('setting_bridging_bpjs')->first();

        return Inertia::render('Pcare/SettingBridingPcare', [
            'setting' => [
                'user_pcare' => $row->user_pcare ?? '',
                'pass_pcare' => $row->pass_pcare ?? '',
                'cons_id_pcare' => $row->cons_id_pcare ?? '',
                'secretkey_pcare' => $row->secretkey_pcare ?? '',
                'userkey_pcare' => $row->userkey_pcare ?? '',
                'userkey_mjkn' => $row->userkey_mjkn ?? '',
            ],
        ]);
    }

    /**
     * Simpan/update pengaturan Bridging BPJS PCare.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_pcare' => 'required|string|max:20',
            'pass_pcare' => 'required|string|max:20',
            'cons_id_pcare' => 'required|string|max:20',
            'secretkey_pcare' => 'required|string|max:50',
            'userkey_pcare' => 'required|string|max:200',
            'userkey_mjkn' => 'required|string|max:200',
        ], [
            'required' => ':attribute wajib diisi',
            'max' => ':attribute maksimal :max karakter',
        ]);

        $exists = DB::table('setting_bridging_bpjs')->exists();

        if ($exists) {
            // update seluruh baris (diasumsikan hanya 1 baris konfigurasi)
            DB::table('setting_bridging_bpjs')->update($validated);
        } else {
            DB::table('setting_bridging_bpjs')->insert($validated);
        }

        return redirect()->route('pcare.setting.index')
            ->with('success', 'Pengaturan Bridging BPJS PCare berhasil disimpan');
    }

    /**
     * Hapus pengaturan (opsional bila ingin reset menjadi kosong).
     */
    public function destroy()
    {
        DB::table('setting_bridging_bpjs')->truncate();

        return redirect()->route('pcare.setting.index')
            ->with('success', 'Pengaturan berhasil direset');
    }

    public function getKdProvider(Request $request)
    {
        $row = DB::table('setting_bridging_bpjs')->first();
        $kdProvider = (string) ($row->user_pcare ?? '');
        return response()->json([
            'success' => true,
            'kdProvider' => $kdProvider,
            'source' => 'setting_bridging_bpjs.user_pcare',
        ]);
    }
}
