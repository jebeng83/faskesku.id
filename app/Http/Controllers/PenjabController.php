<?php

namespace App\Http\Controllers;

use App\Models\Penjab;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class PenjabController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $query = Penjab::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('kd_pj', 'like', "%{$search}%")
                    ->orWhere('png_jawab', 'like', "%{$search}%")
                    ->orWhere('nama_perusahaan', 'like', "%{$search}%");
            });
        }
        $penjabs = $query->orderBy('png_jawab')->paginate(10)->withQueryString();

        return Inertia::render('Penjab/Index', [
            'penjabs' => $penjabs,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_pj' => ['required', 'string', 'max:10', 'unique:penjab,kd_pj'],
            'png_jawab' => ['required', 'string', 'max:100'],
            'nama_perusahaan' => ['required', 'string', 'max:150'],
            'alamat_asuransi' => ['required', 'string', 'max:255'],
            'no_telp' => ['required', 'string', 'max:50'],
            'attn' => ['required', 'string', 'max:100'],
        ], [
            'kd_pj.unique' => 'Kode Penjamin sudah ada',
            'png_jawab.required' => 'Nama Penjamin wajib diisi',
            'png_jawab.max' => 'Nama Penjamin maksimal 100 karakter',
            'nama_perusahaan.required' => 'Nama Perusahaan wajib diisi',
            'nama_perusahaan.max' => 'Nama Perusahaan maksimal 150 karakter',
            'alamat_asuransi.required' => 'Alamat Asuransi wajib diisi',
            'alamat_asuransi.max' => 'Alamat Asuransi maksimal 255 karakter',
            'no_telp.required' => 'No Telp wajib diisi',
            'no_telp.max' => 'No Telp maksimal 50 karakter',
            'attn.required' => 'Attn wajib diisi',
            'attn.max' => 'Attn maksimal 100 karakter',
        ]);

        Penjab::create(array_merge($validated, ['status' => '1']));

        return to_route('penjab.index', [], 303)->with('success', 'Penjamin berhasil ditambahkan');
    }

    public function update(Request $request, string $kd_pj)
    {
        $penjab = Penjab::findOrFail($kd_pj);

        $validated = $request->validate([
            'png_jawab' => ['required', 'string', 'max:100'],
            'nama_perusahaan' => ['nullable', 'string', 'max:150'],
            'alamat_asuransi' => ['nullable', 'string', 'max:255'],
            'no_telp' => ['nullable', 'string', 'max:50'],
            'attn' => ['nullable', 'string', 'max:100'],
        ]);

        $penjab->update($validated);

        return to_route('penjab.index', [], 303)->with('success', 'Penjamin berhasil diperbarui');
    }

    public function toggleStatus(Request $request, string $kd_pj)
    {
        $penjab = Penjab::findOrFail($kd_pj);

        $validated = $request->validate([
            'status' => ['required', Rule::in(['0', '1'])],
        ]);

        $penjab->update($validated);

        $statusText = $validated['status'] === '1' ? 'diaktifkan' : 'dinonaktifkan';

        return to_route('penjab.index', [], 303)->with('success', "Penjamin berhasil {$statusText}");
    }
}
