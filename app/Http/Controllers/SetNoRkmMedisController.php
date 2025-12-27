<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SetNoRkmMedisController extends Controller
{
    public function index()
    {
        $row = DB::table('set_no_rkm_medis')->first();

        return Inertia::render('Setting/SetNoRkmMedis', [
            'current' => $row->no_rkm_medis ?? '000000',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_rkm_medis' => 'required|string|max:15',
        ]);

        $exists = DB::table('set_no_rkm_medis')->exists();

        if ($exists) {
            DB::table('set_no_rkm_medis')->update($validated);
        } else {
            DB::table('set_no_rkm_medis')->insert($validated);
        }

        return redirect()->route('pcare.setting.no-rm.index')
            ->with('success', 'Pengaturan No. RM berhasil disimpan');
    }
}
