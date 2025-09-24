<?php

namespace App\Http\Controllers;

use App\Models\Pendidikan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendidikanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pendidikan::query();

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('tingkat', 'like', "%{$search}%");
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $pendidikan = $query->orderBy('indek', 'asc')->paginate($perPage);

        return Inertia::render('Kepegawian/Pendidikan/index', [
            'pendidikan' => $pendidikan,
            'filters' => $request->only(['search', 'per_page']),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kepegawian/Pendidikan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tingkat' => 'required|string|max:80',
            'indek' => 'required|integer|min:0|max:9999',
            'gapok1' => 'required|numeric|min:0',
            'kenaikan' => 'required|numeric|min:0',
            'maksimal' => 'required|integer|min:0|max:2147483647',
        ], [
            'tingkat.required' => 'Tingkat pendidikan harus diisi.',
            'tingkat.max' => 'Tingkat pendidikan maksimal 80 karakter.',
            'indek.required' => 'Indek harus diisi.',
            'indek.integer' => 'Indek harus berupa angka.',
            'indek.min' => 'Indek minimal 0.',
            'indek.max' => 'Indek maksimal 9999.',
            'gapok1.required' => 'Gaji pokok harus diisi.',
            'gapok1.numeric' => 'Gaji pokok harus berupa angka.',
            'gapok1.min' => 'Gaji pokok minimal 0.',
            'kenaikan.required' => 'Kenaikan harus diisi.',
            'kenaikan.numeric' => 'Kenaikan harus berupa angka.',
            'kenaikan.min' => 'Kenaikan minimal 0.',
            'maksimal.required' => 'Maksimal harus diisi.',
            'maksimal.integer' => 'Maksimal harus berupa angka.',
            'maksimal.min' => 'Maksimal minimal 0.',
            'maksimal.max' => 'Maksimal terlalu besar.',
        ]);

        try {
            Pendidikan::create($validated);
            return redirect()->route('pendidikan.index')->with('success', 'Data pendidikan berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan data pendidikan: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pendidikan $pendidikan)
    {
        return Inertia::render('Kepegawian/Pendidikan/show', [
            'pendidikan' => $pendidikan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pendidikan $pendidikan)
    {
        return Inertia::render('Kepegawian/Pendidikan/edit', [
            'pendidikan' => $pendidikan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pendidikan $pendidikan)
    {
        $validated = $request->validate([
            'tingkat' => 'required|string|max:80',
            'indek' => 'required|integer|min:0|max:9999',
            'gapok1' => 'required|numeric|min:0',
            'kenaikan' => 'required|numeric|min:0',
            'maksimal' => 'required|integer|min:0|max:2147483647',
        ], [
            'tingkat.required' => 'Tingkat pendidikan harus diisi.',
            'tingkat.max' => 'Tingkat pendidikan maksimal 80 karakter.',
            'indek.required' => 'Indek harus diisi.',
            'indek.integer' => 'Indek harus berupa angka.',
            'indek.min' => 'Indek minimal 0.',
            'indek.max' => 'Indek maksimal 9999.',
            'gapok1.required' => 'Gaji pokok harus diisi.',
            'gapok1.numeric' => 'Gaji pokok harus berupa angka.',
            'gapok1.min' => 'Gaji pokok minimal 0.',
            'kenaikan.required' => 'Kenaikan harus diisi.',
            'kenaikan.numeric' => 'Kenaikan harus berupa angka.',
            'kenaikan.min' => 'Kenaikan minimal 0.',
            'maksimal.required' => 'Maksimal harus diisi.',
            'maksimal.integer' => 'Maksimal harus berupa angka.',
            'maksimal.min' => 'Maksimal minimal 0.',
            'maksimal.max' => 'Maksimal terlalu besar.',
        ]);

        try {
            $pendidikan->update($validated);
            return redirect()->route('pendidikan.index')->with('success', 'Data pendidikan berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui data pendidikan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pendidikan $pendidikan)
    {
        try {
            $pendidikan->delete();
            return redirect()->route('pendidikan.index')->with('success', 'Data pendidikan berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus data pendidikan: ' . $e->getMessage());
        }
    }
}