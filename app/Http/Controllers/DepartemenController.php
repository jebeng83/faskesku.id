<?php

namespace App\Http\Controllers;

use App\Models\Departemen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartemenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Departemen::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('dep_id', 'like', "%{$search}%")
                  ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        $departemens = $query->orderBy('dep_id', 'asc')
                            ->paginate(10)
                            ->withQueryString();

        return Inertia::render('Kepegawian/Departemen/index', [
            'departemens' => $departemens,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'dep_id' => 'required|string|max:4|unique:departemen,dep_id',
            'nama' => 'required|string|max:25'
        ]);

        Departemen::create([
            'dep_id' => $request->dep_id,
            'nama' => $request->nama
        ]);

        return redirect()->route('departemen.index')
                        ->with('success', 'Departemen berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $dep_id)
    {
        $departemen = Departemen::where('dep_id', $dep_id)->firstOrFail();

        $request->validate([
            'dep_id' => 'required|string|max:4|unique:departemen,dep_id,' . $dep_id . ',dep_id',
            'nama' => 'required|string|max:25'
        ]);

        $departemen->update([
            'dep_id' => $request->dep_id,
            'nama' => $request->nama
        ]);

        return redirect()->route('departemen.index')
                        ->with('success', 'Departemen berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($dep_id)
    {
        $departemen = Departemen::where('dep_id', $dep_id)->firstOrFail();
        $departemen->delete();

        return redirect()->route('departemen.index')
                        ->with('success', 'Departemen berhasil dihapus.');
    }
}