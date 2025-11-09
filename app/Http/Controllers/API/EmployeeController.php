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
            // Data utama pegawai
            'nik' => ['required', 'string', 'max:50'],
            'no_ktp' => ['required', 'digits:16'],
            'nama' => ['required', 'string', 'max:191'],
            'jk' => ['required', Rule::in(['Pria', 'Wanita'])],
            'tmp_lahir' => ['required', 'string', 'max:100'],
            'tgl_lahir' => ['required', 'date'],
            'alamat' => ['required', 'string'],

            // Informasi kepegawaian (opsional)
            'jbtn' => ['nullable', 'string', 'max:100'],
            'jnj_jabatan' => ['nullable', 'string', 'max:100'],
            'departemen' => ['nullable', 'string', 'max:100'],
            'bidang' => ['nullable', 'string', 'max:100'],
            'stts_wp' => ['nullable', 'string', 'max:50'],
            'stts_kerja' => ['nullable', 'string', 'max:50'],
            'pendidikan' => ['nullable', 'string', 'max:50'],
            'kota' => ['nullable', 'string', 'max:100'],
            'mulai_kerja' => ['nullable', 'date'],
            'stts_aktif' => ['nullable', 'string', 'max:20'],

            // Informasi finansial (opsional)
            'npwp' => ['nullable', 'string', 'max:30'],
            'gapok' => ['nullable', 'numeric'],
            'bpd' => ['nullable', 'string', 'max:50'],
            'rekening' => ['nullable', 'string', 'max:30'],
        ]);

        $employee = Employee::create($validated);

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
