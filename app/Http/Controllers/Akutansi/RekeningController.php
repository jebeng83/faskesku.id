<?php
declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Akutansi\Rekening;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\JsonResponse;

class RekeningController extends Controller
{
    // Inertia page renderer
    public function page(): InertiaResponse
    {
        return Inertia::render('Akutansi/Rekening');
    }

    // API: list rekening (optional q filter)
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->get('q', ''));
        $perPage = max(1, (int) $request->get('per_page', 20));

        $query = Rekening::query();
        if ($q !== '') {
            $query->where(function ($builder) use ($q) {
                $builder->where('kd_rek', 'like', "%$q%")
                    ->orWhere('nm_rek', 'like', "%$q%")
                    ->orWhere('tipe', 'like', "%$q%")
                    ->orWhere('balance', 'like', "%$q%");
            });
        }

        $paginator = $query->orderBy('kd_rek')->paginate($perPage)->appends(['q' => $q]);

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

    // API: create rekening
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'kd_rek' => 'required|string|max:20|unique:rekening,kd_rek',
            'tipe' => 'required|string|in:N,R,M',
            // Store balance as code: D (Debet) or K (Kredit)
            'balance' => 'required|string|in:D,K',
            'nm_rek' => 'required|string|max:100',
            'level' => 'nullable|integer|min:0',
        ]);

        // Enforce level = '1' on create (string to match ENUM('0','1'))
        $data['level'] = '1';

        $created = Rekening::create($data);
        return response()->json(['message' => 'Rekening created', 'data' => $created], 201);
    }

    // API: update rekening
    public function update(Request $request, string $kd_rek): JsonResponse
    {
        $rek = Rekening::findOrFail($kd_rek);
        $data = $request->validate([
            'tipe' => 'required|string|in:N,R,M',
            // Store balance as code: D (Debet) or K (Kredit)
            'balance' => 'required|string|in:D,K',
            'nm_rek' => 'required|string|max:100',
            'level' => 'nullable|integer|min:0',
        ]);

        // Enforce level = '1' on update (string to match ENUM('0','1'))
        $rek->tipe = $data['tipe'];
        $rek->balance = $data['balance'];
        $rek->nm_rek = $data['nm_rek'];
        $rek->level = '1';
        $rek->save();
        return response()->json(['message' => 'Rekening updated', 'data' => $rek]);
    }

    // API: delete rekening
    public function destroy(string $kd_rek): JsonResponse
    {
        $rek = Rekening::findOrFail($kd_rek);
        // Proteksi: jangan hapus jika memiliki transaksi jurnal terkait
        if ($rek->detailJurnals()->exists()) {
            return response()->json([
                'message' => 'Tidak dapat menghapus: rekening memiliki transaksi jurnal terkait (detailjurnal).',
            ], 409);
        }
        $rek->delete();
        return response()->json(['message' => 'Rekening deleted']);
    }
}