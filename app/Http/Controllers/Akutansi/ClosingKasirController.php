<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ClosingKasirController extends Controller
{
    /**
     * List jadwal shift kasir dengan opsi paginasi per_page.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = max(1, (int) $request->query('per_page', 100));

        $paginator = DB::table('closing_kasir')
            ->select(['shift', 'jam_masuk', 'jam_pulang'])
            ->orderBy('shift')
            ->paginate($perPage)
            ->appends($request->query());

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    /**
     * Tambah jadwal shift baru.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'shift' => ['required', 'string', Rule::in(['Pagi', 'Siang', 'Sore', 'Malam'])],
            'jam_masuk' => ['required', 'date_format:H:i:s'],
            'jam_pulang' => ['required', 'date_format:H:i:s'],
        ]);

        $exists = DB::table('closing_kasir')->where('shift', $data['shift'])->exists();
        if ($exists) {
            return response()->json(['message' => 'Shift sudah ada'], 422);
        }

        DB::table('closing_kasir')->insert($data);

        return response()->json(['success' => true]);
    }

    /**
     * Update jadwal shift berdasarkan primary key shift.
     */
    public function update(Request $request, string $shift): JsonResponse
    {
        $data = $request->validate([
            'shift' => ['nullable', 'string', Rule::in(['Pagi', 'Siang', 'Sore', 'Malam'])],
            'jam_masuk' => ['required', 'date_format:H:i:s'],
            'jam_pulang' => ['required', 'date_format:H:i:s'],
        ]);

        $row = DB::table('closing_kasir')->where('shift', $shift)->first();
        if (! $row) {
            return response()->json(['message' => 'Shift tidak ditemukan'], 404);
        }

        $payload = [
            'jam_masuk' => $data['jam_masuk'],
            'jam_pulang' => $data['jam_pulang'],
        ];
        // Jika ingin mengubah nama shift, pastikan valid
        if (! empty($data['shift']) && $data['shift'] !== $shift) {
            // Cegah konflik duplikasi nama shift baru
            $dup = DB::table('closing_kasir')->where('shift', $data['shift'])->exists();
            if ($dup) {
                return response()->json(['message' => 'Shift baru sudah ada'], 422);
            }
            // Hapus baris lama lalu insert ulang dengan nama baru untuk menjaga primary key enum
            DB::table('closing_kasir')->where('shift', $shift)->delete();
            DB::table('closing_kasir')->insert([
                'shift' => $data['shift'],
                'jam_masuk' => $data['jam_masuk'],
                'jam_pulang' => $data['jam_pulang'],
            ]);
            return response()->json(['success' => true]);
        }

        DB::table('closing_kasir')->where('shift', $shift)->update($payload);

        return response()->json(['success' => true]);
    }

    /**
     * Hapus jadwal shift.
     */
    public function destroy(string $shift): JsonResponse
    {
        $deleted = DB::table('closing_kasir')->where('shift', $shift)->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Shift tidak ditemukan'], 404);
        }

        return response()->json(['success' => true]);
    }
}

