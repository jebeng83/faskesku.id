<?php

namespace App\Http\Controllers\Pcare;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SettingBridgingMobileJknController extends Controller
{
    /**
     * Tampilkan form pengaturan Bridging Mobile JKN.
     */
    public function index()
    {
        $row = DB::table('setting_briding_mobilejkn')->first();

        return Inertia::render('Pcare/SettingBridingMobileJkn', [
            'setting' => [
                'user_mobilejkn' => $row->user_mobilejkn ?? '',
                'pass_mobilejkn' => $row->pass_mobilejkn ?? '',
                'cons_id_mobilejkn' => $row->cons_id_mobilejkn ?? '',
                'secretkey_mobilejkn' => $row->secretkey_mobilejkn ?? '',
                'userkey_mobilejkn' => $row->userkey_mobilejkn ?? '',
                // Tambahan konfigurasi endpoint & antrol dari DB
                'base_url_mobilejkn' => $row->base_url_mobilejkn ?? '',
                'base_url_v1' => $row->base_url_v1 ?? '',
                'base_url_v2' => $row->base_url_v2 ?? '',
                'username_antrol' => $row->username_antrol ?? '',
                'password_antrol' => $row->password_antrol ?? '',
            ],
        ]);
    }

    /**
     * Simpan/update pengaturan Bridging Mobile JKN.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_mobilejkn' => 'required|string|max:20',
            'pass_mobilejkn' => 'required|string|max:20',
            'cons_id_mobilejkn' => 'required|string|max:20',
            'secretkey_mobilejkn' => 'required|string|max:200',
            'userkey_mobilejkn' => 'required|string|max:200',
            // Tambahan kolom untuk endpoint & antrol
            'base_url_mobilejkn' => 'required|string|max:200',
            'base_url_v1' => 'nullable|string|max:200',
            'base_url_v2' => 'nullable|string|max:200',
            'username_antrol' => 'nullable|string|max:50',
            'password_antrol' => 'nullable|string|max:50',
        ], [
            'required' => ':attribute wajib diisi',
            'max' => ':attribute maksimal :max karakter',
        ]);

        $exists = DB::table('setting_briding_mobilejkn')->exists();

        if ($exists) {
            // update seluruh baris (diasumsikan hanya 1 baris konfigurasi)
            DB::table('setting_briding_mobilejkn')->update($validated);
        } else {
            DB::table('setting_briding_mobilejkn')->insert($validated);
        }

        return redirect()->route('pcare.setting.mobilejkn.index')
            ->with('success', 'Pengaturan Bridging Mobile JKN berhasil disimpan');
    }

    /**
     * Hapus pengaturan (opsional bila ingin reset menjadi kosong).
     */
    public function destroy()
    {
        DB::table('setting_briding_mobilejkn')->truncate();

        return redirect()->route('pcare.setting.mobilejkn.index')
            ->with('success', 'Pengaturan Mobile JKN berhasil direset');
    }
}
