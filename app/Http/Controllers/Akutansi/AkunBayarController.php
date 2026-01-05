<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\AkunBayar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AkunBayarController extends Controller
{
    // Inertia page renderer
    public function page(): InertiaResponse
    {
        return Inertia::render('Akutansi/AkunBayar');
    }

    // API: list akun bayar (optional q filter)
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, (int) $request->query('per_page', 20));

        $query = AkunBayar::query()
            ->leftJoin('rekening', 'akun_bayar.kd_rek', '=', 'rekening.kd_rek')
            ->select(['akun_bayar.nama_bayar', 'akun_bayar.kd_rek', 'akun_bayar.ppn', 'rekening.nm_rek']);

        if ($q !== '') {
            $query->where(function ($builder) use ($q) {
                $builder->where('akun_bayar.nama_bayar', 'like', "%$q%")
                    ->orWhere('akun_bayar.kd_rek', 'like', "%$q%")
                    ->orWhere('rekening.nm_rek', 'like', "%$q%")
                    ->orWhere('akun_bayar.ppn', 'like', "%$q%");
            });
        }

        $paginator = $query->orderBy('akun_bayar.nama_bayar')->paginate($perPage)->appends(['q' => $q]);

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

    // API: create akun bayar
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nama_bayar' => 'required|string|max:50|unique:akun_bayar,nama_bayar',
            'kd_rek' => 'required|string|max:15|exists:rekening,kd_rek',
            // "ppn" di sini digunakan sebagai persentase surcharge/MDR per metode bayar
            'ppn' => 'nullable|numeric|min:0|max:100',
        ]);

        // Normalisasi ppn: jika null, set 0
        if (! isset($data['ppn']) || $data['ppn'] === '') {
            $data['ppn'] = 0;
        }

        $created = AkunBayar::create($data);

        return response()->json(['message' => 'Akun Bayar created', 'data' => $created], 201);
    }

    // API: update akun bayar
    public function update(Request $request, string $nama_bayar): JsonResponse
    {
        $row = AkunBayar::findOrFail($nama_bayar);
        $data = $request->validate([
            'kd_rek' => 'required|string|max:15|exists:rekening,kd_rek',
            'ppn' => 'nullable|numeric|min:0|max:100',
        ]);
        $row->kd_rek = $data['kd_rek'];
        $row->ppn = $data['ppn'] ?? 0;
        $row->save();

        return response()->json(['message' => 'Akun Bayar updated', 'data' => $row]);
    }

    // API: delete akun bayar
    public function destroy(string $nama_bayar): JsonResponse
    {
        $row = AkunBayar::findOrFail($nama_bayar);
        // Catatan: bisa ditambahkan proteksi jika ada transaksi yang menggunakan nama_bayar ini
        $row->delete();

        return response()->json(['message' => 'Akun Bayar deleted']);
    }
}
