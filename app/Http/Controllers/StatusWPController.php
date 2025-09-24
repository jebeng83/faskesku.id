<?php

namespace App\Http\Controllers;

use App\Models\StatusWP;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusWPController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $perPage = $request->get('per_page', 10);

        $statusWP = StatusWP::query()
            ->when($search, function ($query, $search) {
                return $query->where('stts', 'like', "%{$search}%")
                           ->orWhere('ktg', 'like', "%{$search}%");
            })
            ->orderBy('stts')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Kepegawian/StatusWP/index', [
            'statusWP' => $statusWP,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'stts' => 'required|string|max:5|unique:stts_wp,stts',
            'ktg' => 'required|string|max:50',
        ], [
            'stts.required' => 'Status harus diisi.',
            'stts.max' => 'Status maksimal 5 karakter.',
            'stts.unique' => 'Status sudah ada.',
            'ktg.required' => 'Keterangan harus diisi.',
            'ktg.max' => 'Keterangan maksimal 50 karakter.',
        ]);

        StatusWP::create([
            'stts' => $request->stts,
            'ktg' => $request->ktg,
        ]);

        return redirect()->route('status-wp.index')->with('success', 'Status WP berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StatusWP $statusWp)
    {
        $request->validate([
            'stts' => 'required|string|max:5|unique:stts_wp,stts,' . $statusWp->id,
            'ktg' => 'required|string|max:50',
        ], [
            'stts.required' => 'Status harus diisi.',
            'stts.max' => 'Status maksimal 5 karakter.',
            'stts.unique' => 'Status sudah ada.',
            'ktg.required' => 'Keterangan harus diisi.',
            'ktg.max' => 'Keterangan maksimal 50 karakter.',
        ]);

        $statusWp->update([
            'stts' => $request->stts,
            'ktg' => $request->ktg,
        ]);

        return redirect()->route('status-wp.index')->with('success', 'Status WP berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StatusWP $statusWp)
    {
        try {
            $statusWp->delete();
            return redirect()->route('status-wp.index')->with('success', 'Status WP berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('status-wp.index')->with('error', 'Status WP tidak dapat dihapus karena masih digunakan.');
        }
    }
}