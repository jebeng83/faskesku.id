<?php

namespace App\Http\Controllers;

use App\Models\Penjab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

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
        $validator = Validator::make($request->all(), [
            'kd_pj' => ['required', 'string', 'max:3', 'unique:penjab,kd_pj'],
            'png_jawab' => ['required', 'string', 'max:30'],
            'nama_perusahaan' => ['nullable', 'string', 'max:60'],
            'alamat_asuransi' => ['nullable', 'string', 'max:130'],
            'no_telp' => ['nullable', 'string', 'max:40'],
            'attn' => ['nullable', 'string', 'max:60'],
        ], [
            'kd_pj.unique' => 'Kode Penjamin sudah ada',
            'kd_pj.required' => 'Kode Penjamin wajib diisi',
            'kd_pj.max' => 'Kode Penjamin maksimal 3 karakter',
            'png_jawab.required' => 'Nama Penjamin wajib diisi',
            'png_jawab.max' => 'Nama Penjamin maksimal 30 karakter',
            'nama_perusahaan.max' => 'Nama Perusahaan maksimal 60 karakter',
            'alamat_asuransi.max' => 'Alamat Asuransi maksimal 130 karakter',
            'no_telp.max' => 'No Telp maksimal 40 karakter',
            'attn.max' => 'Attn maksimal 60 karakter',
        ]);

        // Handle error validasi untuk popup (Inertia request)
        if ($validator->fails()) {
            // Untuk request dari Inertia (popup), return redirect back dengan errors
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }
            // Untuk request JSON biasa (non-Inertia)
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $penjab = Penjab::create(array_merge($validator->validated(), ['status' => '1']));

            // Return response untuk Inertia (popup)
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->with('success', 'Cara Bayar berhasil ditambahkan.')
                    ->with('penjabCreated', [
                        'kd_pj' => $penjab->kd_pj,
                        'png_jawab' => $penjab->png_jawab,
                    ]);
            }

            // Return response untuk JSON biasa
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Cara Bayar berhasil ditambahkan.',
                    'data' => $penjab,
                ], 201);
            }

            // Default redirect untuk form biasa
            return to_route('penjab.index', [], 303)->with('success', 'Penjamin berhasil ditambahkan');
        } catch (\Exception $e) {
            if ($request->header('X-Inertia')) {
                return redirect()->back()
                    ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.'])
                    ->withInput();
            }

            return redirect()->back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.'])
                ->withInput();
        }
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

    /**
     * Generate auto code for penjab dengan format AXX
     */
    public function generateKode()
    {
        try {
            // Get the last penjab code dengan format AXX
            // Urutkan berdasarkan angka setelah "A" secara numerik, bukan string
            $lastPenjab = Penjab::where('kd_pj', 'like', 'A%')
                ->whereRaw('LENGTH(kd_pj) = 3') // Pastikan panjangnya 3 karakter (AXX)
                ->orderByRaw('CAST(SUBSTRING(kd_pj, 2) AS UNSIGNED) DESC')
                ->first();

            if (! $lastPenjab) {
                $newCode = 'A01';
            } else {
                // Extract number from last code (format: AXX)
                $lastNumber = (int) substr($lastPenjab->kd_pj, 1);
                $newNumber = $lastNumber + 1;
                // Pastikan tidak melebihi 99
                if ($newNumber > 99) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Kode sudah mencapai batas maksimal (A99)',
                    ], 400);
                }
                $newCode = 'A'.str_pad($newNumber, 2, '0', STR_PAD_LEFT);
            }

            return response()->json([
                'success' => true,
                'kode' => $newCode,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate kode cara bayar',
            ], 500);
        }
    }
}
