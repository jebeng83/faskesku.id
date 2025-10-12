<?php

namespace App\Http\Controllers;

use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class PoliklinikController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $query = Poliklinik::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('kd_poli', 'like', "%{$search}%")
                    ->orWhere('nm_poli', 'like', "%{$search}%");
            });
        }
        $polikliniks = $query->orderBy('nm_poli')->paginate(10)->withQueryString();

        return Inertia::render('Poliklinik/Index', [
            'polikliniks' => $polikliniks,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_poli' => ['required', 'string', 'max:5', 'unique:poliklinik,kd_poli'],
            'nm_poli' => ['required', 'string', 'max:50'],
            'registrasi' => ['required', 'numeric', 'min:0'],
            'registrasilama' => ['required', 'numeric', 'min:0'],
        ], [
            'kd_poli.unique' => 'Kode Poliklinik sudah ada',
            'kd_poli.required' => 'Kode Poliklinik wajib diisi',
            'kd_poli.max' => 'Kode Poliklinik maksimal 5 karakter',
            'nm_poli.required' => 'Nama Poliklinik wajib diisi',
            'nm_poli.max' => 'Nama Poliklinik maksimal 50 karakter',
            'registrasi.required' => 'Tarif Registrasi wajib diisi',
            'registrasi.numeric' => 'Tarif Registrasi harus berupa angka',
            'registrasi.min' => 'Tarif Registrasi minimal 0',
            'registrasilama.required' => 'Tarif Registrasi Lama wajib diisi',
            'registrasilama.numeric' => 'Tarif Registrasi Lama harus berupa angka',
            'registrasilama.min' => 'Tarif Registrasi Lama minimal 0',
        ]);

        Poliklinik::create(array_merge($validated, ['status' => '1']));

        return to_route('poliklinik.index', [], 303)->with('success', 'Poliklinik berhasil ditambahkan');
    }

    public function update(Request $request, string $kd_poli)
    {
        $poliklinik = Poliklinik::findOrFail($kd_poli);

        $validated = $request->validate([
            'nm_poli' => ['required', 'string', 'max:50'],
            'registrasi' => ['required', 'numeric', 'min:0'],
            'registrasilama' => ['required', 'numeric', 'min:0'],
        ], [
            'nm_poli.required' => 'Nama Poliklinik wajib diisi',
            'nm_poli.max' => 'Nama Poliklinik maksimal 50 karakter',
            'registrasi.required' => 'Tarif Registrasi wajib diisi',
            'registrasi.numeric' => 'Tarif Registrasi harus berupa angka',
            'registrasi.min' => 'Tarif Registrasi minimal 0',
            'registrasilama.required' => 'Tarif Registrasi Lama wajib diisi',
            'registrasilama.numeric' => 'Tarif Registrasi Lama harus berupa angka',
            'registrasilama.min' => 'Tarif Registrasi Lama minimal 0',
        ]);

        $poliklinik->update($validated);

        return to_route('poliklinik.index', [], 303)->with('success', 'Poliklinik berhasil diperbarui');
    }

    public function toggleStatus(Request $request, string $kd_poli)
    {
        $poliklinik = Poliklinik::findOrFail($kd_poli);

        $validated = $request->validate([
            'status' => ['required', Rule::in(['0', '1'])],
        ]);

        $poliklinik->update($validated);

        $statusText = $validated['status'] === '1' ? 'diaktifkan' : 'dinonaktifkan';

        return to_route('poliklinik.index', [], 303)->with('success', "Poliklinik berhasil {$statusText}");
    }
}
