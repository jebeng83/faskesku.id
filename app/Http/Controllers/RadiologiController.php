<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\PermintaanRadiologi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RadiologiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = PermintaanRadiologi::with(['regPeriksa.patient', 'dokter']);

        if ($request->filled('tanggal')) {
            $query->byTanggalPermintaan($request->tanggal);
        }

        if ($request->filled('start_date') || $request->filled('end_date')) {
            $start = $request->get('start_date');
            $end = $request->get('end_date');
            if ($start && $end) {
                $query->whereBetween('tgl_permintaan', [$start, $end]);
            } elseif ($start) {
                $query->whereDate('tgl_permintaan', '>=', $start);
            } elseif ($end) {
                $query->whereDate('tgl_permintaan', '<=', $end);
            }
        }

        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        if ($request->filled('dokter')) {
            $query->byDokter($request->dokter);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_rawat', 'like', "%{$search}%")
                    ->orWhere('noorder', 'like', "%{$search}%")
                    ->orWhereHas('regPeriksa.patient', function ($qr) use ($search) {
                        $qr->where('nm_pasien', 'like', "%{$search}%");
                    });
            });
        }

        $permintaanRadiologi = $query->orderBy('tgl_permintaan', 'desc')
            ->orderBy('jam_permintaan', 'desc')
            ->paginate(15)
            ->withQueryString();

        $permintaanRadiologi->getCollection()->transform(function ($item) {
            $tglSampelValid = $item->tgl_sampel && $item->tgl_sampel !== '0000-00-00';

            $item->has_sampel = (bool) $tglSampelValid;

            if (method_exists($item, 'hasHasilTersedia')) {
                try {
                    $item->has_hasil = $item->hasHasilTersedia();
                } catch (\Throwable $e) {
                    $tglHasilValid = $item->tgl_hasil && $item->tgl_hasil !== '0000-00-00';
                    $item->has_hasil = (bool) $tglHasilValid;
                }
            } else {
                $tglHasilValid = $item->tgl_hasil && $item->tgl_hasil !== '0000-00-00';
                $item->has_hasil = (bool) $tglHasilValid;
            }

            return $item;
        });

        $dokters = Dokter::select('kd_dokter', 'nm_dokter')
            ->orderBy('nm_dokter')
            ->get();

        return Inertia::render('Radiologi/Index', [
            'title' => 'Permintaan Radiologi',
            'permintaanRadiologi' => $permintaanRadiologi,
            'dokters' => $dokters,
            'filters' => $request->only(['tanggal', 'start_date', 'end_date', 'status', 'dokter', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Radiologi/Create', [
            'title' => 'Tambah Data Radiologi',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Implementation for storing radiologi data
        return redirect()->route('radiologi.index')
            ->with('success', 'Data radiologi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $permintaan = PermintaanRadiologi::with(['regPeriksa.patient', 'dokter', 'detailPermintaan.jenisPerawatan'])
            ->findOrFail($id);

        $hasHasil = method_exists($permintaan, 'hasHasilTersedia')
            ? $permintaan->hasHasilTersedia()
            : ($permintaan->tgl_hasil && $permintaan->tgl_hasil !== '0000-00-00');

        return Inertia::render('Radiologi/Show', [
            'title' => 'Detail Radiologi',
            'permintaan' => $permintaan,
            'has_hasil' => (bool) $hasHasil,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $permintaan = PermintaanRadiologi::with(['regPeriksa.patient', 'dokter'])
            ->findOrFail($id);

        $hasHasil = method_exists($permintaan, 'hasHasilTersedia')
            ? $permintaan->hasHasilTersedia()
            : ($permintaan->tgl_hasil && $permintaan->tgl_hasil !== '0000-00-00');

        return Inertia::render('Radiologi/Edit', [
            'title' => 'Edit Data Radiologi',
            'permintaan' => $permintaan,
            'has_hasil' => (bool) $hasHasil,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $permintaan = PermintaanRadiologi::findOrFail($id);

        if (method_exists($permintaan, 'hasHasilTersedia') && $permintaan->hasHasilTersedia()) {
            return redirect()->route('radiologi.index')
                ->with('error', 'Tidak dapat memperbarui permintaan karena hasil sudah tersedia.');
        }

        $data = $request->validate([
            'tgl_sampel' => 'nullable|date',
            'jam_sampel' => 'nullable|date_format:H:i',
            'dokter_perujuk' => 'nullable|string|max:20',
            'informasi_tambahan' => 'nullable|string|max:60',
            'diagnosa_klinis' => 'nullable|string|max:80',
        ]);

        $permintaan->update($data);

        return redirect()->route('radiologi.index')
            ->with('success', 'Data radiologi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permintaan = PermintaanRadiologi::findOrFail($id);

        if (method_exists($permintaan, 'hasHasilTersedia') && $permintaan->hasHasilTersedia()) {
            return redirect()->route('radiologi.index')
                ->with('error', 'Tidak dapat menghapus permintaan karena hasil sudah tersedia.');
        }

        $permintaan->delete();

        return redirect()->route('radiologi.index')
            ->with('success', 'Data radiologi berhasil dihapus.');
    }
}
