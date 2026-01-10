<?php

declare(strict_types=1);

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\Rekening;
use App\Models\Akutansi\SubRekening;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

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
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, (int) $request->query('per_page', 20));
        $level = $request->query->has('level') ? (string) $request->query('level') : null;
        $indukKd = trim((string) $request->query('induk_kd', ''));

        $query = Rekening::query();
        // Filter level jika diberikan
        if ($level === '0' || $level === '1') {
            $query->where('level', $level);
        }
        // Filter anak berdasarkan induk tertentu
        if ($indukKd !== '') {
            $query->whereIn('kd_rek', function ($q2) use ($indukKd) {
                $q2->select('kd_rek2')->from('subrekening')->where('kd_rek', $indukKd);
            });
        }
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
            'parent_kd_rek' => 'nullable|string|max:20',
        ]);
        $parent = null;
        if (! empty($data['parent_kd_rek'])) {
            $parent = Rekening::find($data['parent_kd_rek']);
            if (! $parent) {
                return response()->json(['message' => 'Akun induk tidak ditemukan'], 422);
            }
        }

        // Tentukan level: jika punya parent => '1' (sub); jika tidak => '0' (induk)
        $data['level'] = $parent ? '1' : '0';

        // Buat akun
        $created = Rekening::create([
            'kd_rek' => $data['kd_rek'],
            'tipe' => $data['tipe'],
            'balance' => $data['balance'],
            'nm_rek' => $data['nm_rek'],
            'level' => $data['level'],
        ]);

        // Jika sub-akun, buat mapping
        if ($parent) {
            SubRekening::create([
                'kd_rek' => $parent->kd_rek,
                'kd_rek2' => $created->kd_rek,
            ]);
        }

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

        // Update field dasar
        $rek->tipe = $data['tipe'];
        $rek->balance = $data['balance'];
        $rek->nm_rek = $data['nm_rek'];
        // Jika user ingin mengubah level secara eksplisit, izinkan
        if (isset($data['level'])) {
            $rek->level = (string) $data['level'];
        }
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
        // Proteksi: jangan hapus induk yang memiliki anak
        $hasChildren = SubRekening::where('kd_rek', $kd_rek)->exists();
        if ($hasChildren) {
            return response()->json([
                'message' => 'Tidak dapat menghapus: rekening induk memiliki sub-akun. Hapus/relokasi sub-akun terlebih dahulu.',
            ], 409);
        }
        // Jika akun adalah sub-akun, bersihkan mapping
        SubRekening::where('kd_rek2', $kd_rek)->delete();
        $rek->delete();

        return response()->json(['message' => 'Rekening deleted']);
    }

    /** Jadikan akun sebagai sub dari akun induk tertentu */
    public function makeSub(Request $request, string $kd_rek): JsonResponse
    {
        $rek = Rekening::findOrFail($kd_rek);
        $data = $request->validate([
            'induk_kd' => 'required|string|max:20|exists:rekening,kd_rek',
        ]);

        if ($data['induk_kd'] === $kd_rek) {
            return response()->json(['message' => 'Akun tidak bisa dijadikan sub dari dirinya sendiri'], 422);
        }

        // Validasi siklus: induk_kd tidak boleh merupakan turunan (descendant) dari kd_rek saat ini
        // Karena penetapan ini akan membuat edge induk_kd -> kd_rek, pastikan tidak ada path kd_rek -> ... -> induk_kd
        if ($this->wouldCreateCycle($data['induk_kd'], $kd_rek)) {
            return response()->json(['message' => 'Relasi induk→anak akan menyebabkan siklus hierarki. Pilih induk lain.'], 422);
        }

        // Bersihkan mapping lama jika ada
        SubRekening::where('kd_rek2', $kd_rek)->delete();
        // Buat mapping baru
        SubRekening::create([
            'kd_rek' => $data['induk_kd'],
            'kd_rek2' => $kd_rek,
        ]);

        // Set level ke '1'
        $rek->level = '1';
        $rek->save();

        return response()->json(['message' => 'Akun dijadikan sub-akun', 'data' => $rek]);
    }

    /** Jadikan akun sebagai akun utama (induk) */
    public function makeInduk(Request $request, string $kd_rek): JsonResponse
    {
        $rek = Rekening::findOrFail($kd_rek);
        // Hapus mapping subrekening
        SubRekening::where('kd_rek2', $kd_rek)->delete();
        // Set level ke '0'
        $rek->level = '0';
        $rek->save();

        return response()->json(['message' => 'Akun dijadikan akun utama (induk)', 'data' => $rek]);
    }

    /** List sub-akun berdasarkan akun induk */
    public function children(Request $request, string $induk_kd): JsonResponse
    {
        $induk = Rekening::findOrFail($induk_kd);
        $items = $induk->children()->orderBy('kd_rek')->get();

        return response()->json(['data' => $items]);
    }

    /**
     * Cek apakah penetapan parentKd sebagai induk dari childKd akan menciptakan siklus.
     * Siklus terjadi jika parentKd merupakan turunan (descendant) dari childKd pada state saat ini.
     */
    private function wouldCreateCycle(string $parentKd, string $childKd): bool
    {
        if ($parentKd === $childKd) {
            return true;
        }
        // BFS melalui subrekening: mulai dari childKd, telusuri semua anaknya; jika menemukan parentKd → siklus
        $visited = [];
        $queue = [$childKd];
        while (! empty($queue)) {
            $curr = array_shift($queue);
            if (isset($visited[$curr])) {
                continue;
            }
            $visited[$curr] = true;
            if ($curr === $parentKd) {
                return true;
            }
            // Ambil anak dari curr
            $children = SubRekening::where('kd_rek', $curr)->pluck('kd_rek2');
            foreach ($children as $c) {
                if (! isset($visited[$c])) {
                    $queue[] = $c;
                }
            }
        }

        return false;
    }
}
