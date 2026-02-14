<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use App\Models\Bangsal;
use App\Models\Farmasi\SetLokasi;
use App\Models\Poliklinik;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SetLokasiController extends Controller
{
    public function index()
    {
        $current = SetLokasi::first();
        $bangsal = Bangsal::select('kd_bangsal', 'nm_bangsal')->orderBy('nm_bangsal')->get();
        $bangsalRanap = FacadesDB::table('kamar as k')
            ->join('bangsal as b', 'b.kd_bangsal', '=', 'k.kd_bangsal')
            ->where('k.statusdata', '1')
            ->whereNotNull('k.kd_bangsal')
            ->where('k.kd_bangsal', '!=', '')
            ->where('k.kd_bangsal', '!=', '-')
            ->select(FacadesDB::raw('trim(k.kd_bangsal) as kd_bangsal'), 'b.nm_bangsal')
            ->distinct()
            ->orderBy('b.nm_bangsal')
            ->get();
        $poliklinik = Poliklinik::select('kd_poli', 'nm_poli')->orderBy('nm_poli')->get();
        $ralanMappings = FacadesDB::table('set_depo_ralan as s')
            ->join('poliklinik as p', 'p.kd_poli', '=', 's.kd_poli')
            ->join('bangsal as b', 'b.kd_bangsal', '=', 's.kd_bangsal')
            ->select('s.kd_poli', 'p.nm_poli', 's.kd_bangsal', 'b.nm_bangsal')
            ->orderBy('p.nm_poli')
            ->get();
        $ranapMappings = FacadesDB::table('set_depo_ranap as s')
            ->join('bangsal as src', 'src.kd_bangsal', '=', 's.kd_bangsal')
            ->join('bangsal as depo', 'depo.kd_bangsal', '=', 's.kd_depo')
            ->select(
                's.kd_bangsal',
                'src.nm_bangsal as nm_bangsal',
                's.kd_depo',
                'depo.nm_bangsal as nm_depo'
            )
            ->orderBy('src.nm_bangsal')
            ->get();
        
        return Inertia::render('farmasi/SetLokasi', [
            'current' => $current,
            'bangsal' => $bangsal,
            'bangsal_ranap' => $bangsalRanap,
            'poliklinik' => $poliklinik,
            'ralan_mappings' => $ralanMappings,
            'ranap_mappings' => $ranapMappings,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kd_bangsal' => 'required|exists:bangsal,kd_bangsal',
            'asal_stok' => 'required|in:Gunakan Stok Utama Obat,Gunakan Stok Bangsal'
        ]);

        DB::transaction(function () use ($request) {
            SetLokasi::query()->delete();
            SetLokasi::create([
                'kd_bangsal' => $request->kd_bangsal,
                'asal_stok' => $request->asal_stok
            ]);
        });

        return redirect()->back()->with('success', 'Pengaturan lokasi berhasil ditetapkan.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'kd_bangsal' => 'required|exists:bangsal,kd_bangsal',
            'asal_stok' => 'required|in:Gunakan Stok Utama Obat,Gunakan Stok Bangsal'
        ]);

        DB::transaction(function () use ($request) {
            SetLokasi::query()->delete();
            SetLokasi::create([
                'kd_bangsal' => $request->kd_bangsal,
                'asal_stok' => $request->asal_stok
            ]);
        });

        return redirect()->back()->with('success', 'Pengaturan lokasi berhasil diperbarui.');
    }

    public function destroy()
    {
        DB::transaction(function () {
            SetLokasi::query()->delete();
        });

        return redirect()->back()->with('success', 'Pengaturan lokasi dihapus.');
    }

    public function ralanStore(Request $request)
    {
        $request->validate([
            'kd_poli' => 'required|exists:poliklinik,kd_poli',
            'kd_bangsal' => 'required|exists:bangsal,kd_bangsal',
        ]);

        FacadesDB::table('set_depo_ralan')->updateOrInsert(
            ['kd_poli' => $request->kd_poli, 'kd_bangsal' => $request->kd_bangsal],
            []
        );

        return redirect()->back()->with('success', 'Mapping Ralan berhasil disimpan.');
    }

    public function ralanDestroy(Request $request)
    {
        $request->validate([
            'kd_poli' => 'required|exists:poliklinik,kd_poli',
            'kd_bangsal' => 'required|exists:bangsal,kd_bangsal',
        ]);

        FacadesDB::table('set_depo_ralan')
            ->where('kd_poli', $request->kd_poli)
            ->where('kd_bangsal', $request->kd_bangsal)
            ->delete();

        return redirect()->back()->with('success', 'Mapping Ralan berhasil dihapus.');
    }

    public function ranapStore(Request $request)
    {
        $request->validate([
            'kd_bangsal' => 'required|exists:bangsal,kd_bangsal',
            'kd_depo' => 'required|exists:bangsal,kd_bangsal',
        ]);

        FacadesDB::table('set_depo_ranap')->updateOrInsert(
            ['kd_bangsal' => $request->kd_bangsal, 'kd_depo' => $request->kd_depo],
            []
        );

        return redirect()->back()->with('success', 'Mapping Ranap berhasil disimpan.');
    }

    public function ranapDestroy(Request $request)
    {
        $request->validate([
            'kd_bangsal' => 'required|exists:bangsal,kd_bangsal',
            'kd_depo' => 'required|exists:bangsal,kd_bangsal',
        ]);

        FacadesDB::table('set_depo_ranap')
            ->where('kd_bangsal', $request->kd_bangsal)
            ->where('kd_depo', $request->kd_depo)
            ->delete();

        return redirect()->back()->with('success', 'Mapping Ranap berhasil dihapus.');
    }
}
