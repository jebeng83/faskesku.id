<?php

namespace App\Http\Controllers\Kepegawaian;

use App\Http\Controllers\Controller;
use App\Models\Kepegawaian\Bank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BankController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'namabank' => 'required|string|max:50|unique:bank,namabank',
        ], [
            'namabank.required' => 'Nama Bank harus diisi',
            'namabank.unique' => 'Nama Bank sudah digunakan',
            'namabank.max' => 'Nama Bank maksimal 50 karakter',
        ]);

        if ($validator->fails()) {
            // Untuk request dari Inertia, return redirect back dengan errors
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

        $data = $validator->validated();

        $bank = Bank::create($data);

        // Untuk request dari Inertia, return redirect back dengan success message
        if ($request->header('X-Inertia')) {
            return redirect()->back()
                ->with('success', 'Data Bank berhasil ditambahkan.')
                ->with('bankCreated', [
                    'namabank' => $bank->namabank,
                ]);
        }

        // Untuk request JSON biasa (non-Inertia)
        if ($request->expectsJson() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Data Bank berhasil ditambahkan.',
                'data' => $bank,
            ], 201);
        }

        return redirect()->back()
            ->with('success', 'Data Bank berhasil ditambahkan.');
    }
}
