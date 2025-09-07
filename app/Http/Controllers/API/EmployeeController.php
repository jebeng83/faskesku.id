<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nik' => ['required', 'string', 'max:50'],
            'no_ktp' => ['required', 'digits:16'],
            'nama' => ['required', 'string', 'max:191'],
            'jk' => ['required', Rule::in(['Pria', 'Wanita'])],
            'tmp_lahir' => ['required', 'string', 'max:100'],
            'tgl_lahir' => ['required', 'date'],
            'alamat' => ['required', 'string'],
        ]);

        $employee = Employee::create([
            'nik' => $validated['nik'],
            'no_ktp' => $validated['no_ktp'],
            'nama' => $validated['nama'],
            'jk' => $validated['jk'],
            'tmp_lahir' => $validated['tmp_lahir'],
            'tgl_lahir' => $validated['tgl_lahir'],
            'alamat' => $validated['alamat'],
        ]);

        return response()->json([
            'message' => 'Pegawai berhasil dibuat',
            'data' => $employee,
        ], 201);
    }

    public function destroy(Employee $employee): JsonResponse
    {
        try {
            $employeeName = $employee->nama;
            $employee->delete();

            return response()->json([
                'message' => "Pegawai '{$employeeName}' berhasil dihapus",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus pegawai',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
