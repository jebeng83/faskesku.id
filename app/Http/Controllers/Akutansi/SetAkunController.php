<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\Rekening;
use App\Models\Akutansi\SetAkun;
use App\Models\Akutansi\SetAkun2;
use App\Models\Akutansi\SetAkunRalan;
use App\Models\Akutansi\SetAkunRanap;
use App\Models\Akutansi\SetAkunRanap2;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Pengaturan Rekening / COA Mapping Controller
 *
 * Mengelola konfigurasi mapping akun (COA) untuk berbagai modul (umum, ralan, ranap).
 * Tabel-tabel `set_akun*` pada basis data Khanza biasanya berisi SATU baris
 * yang menyimpan kode rekening (kd_rek) untuk masing-masing kategori.
 *
 * Catatan: Karena tabel-tabel tersebut tidak memiliki primary key, update dilakukan
 * melalui DB::table()->update([...]). Model disediakan sebagai wrapper untuk daftar kolom.
 */
class SetAkunController extends Controller
{
    /**
     * Mendapatkan seluruh konfigurasi mapping dalam satu payload.
     */
    public function index(Request $request)
    {
        $umum = DB::table('set_akun')->first();
        $umum2 = DB::table('set_akun2')->first();
        $ralan = DB::table('set_akun_ralan')->first();
        $ranap = DB::table('set_akun_ranap')->first();
        $ranap2 = DB::table('set_akun_ranap2')->first();

        $payload = [
            'umum' => $umum,
            'umum2' => $umum2,
            'ralan' => $ralan,
            'ranap' => $ranap,
            'ranap2' => $ranap2,
        ];

        // Opsi: sertakan daftar rekening jika diminta
        if ($request->boolean('with_rekening')) {
            $q = trim((string) $request->query('q'));
            $rekening = Rekening::query()
                ->when($q !== '', function ($query) use ($q) {
                    $query->where(function ($sub) use ($q) {
                        $sub->where('kd_rek', 'like', "%$q%")
                            ->orWhere('nm_rek', 'like', "%$q%")
                            ->orWhere('tipe', 'like', "%$q%")
                            ->orWhere('level', 'like', "%$q%");
                    });
                })
                ->orderBy('kd_rek')
                ->limit(200)
                ->get(['kd_rek', 'nm_rek', 'tipe', 'level']);

            $payload['rekening'] = $rekening;
        }

        return response()->json($payload);
    }

    /**
     * Mendapatkan konfigurasi untuk satu section: umum|umum2|ralan|ranap|ranap2
     */
    public function show(Request $request, string $section)
    {
        $map = $this->sectionMap();
        if (! isset($map[$section])) {
            return response()->json([
                'message' => 'Section tidak dikenal',
                'sections' => array_keys($map),
            ], 422);
        }

        $table = $map[$section]['table'];
        $data = DB::table($table)->first();

        return response()->json([
            'section' => $section,
            'data' => $data,
        ]);
    }

    /**
     * Update konfigurasi untuk satu section.
     * Payload harus berisi pasangan kolom->kd_rek yang valid (ada di tabel rekening.kd_rek).
     */
    public function update(Request $request, string $section)
    {
        $map = $this->sectionMap();
        if (! isset($map[$section])) {
            return response()->json([
                'message' => 'Section tidak dikenal',
                'sections' => array_keys($map),
            ], 422);
        }

        /** @var Model $model */
        $modelClass = $map[$section]['model'];
        $model = new $modelClass;
        $fillable = $model->getFillable();

        // Bangun rules validasi: kd_rek boleh nullable, max 15, dan harus exists di rekening
        $rules = [];
        foreach ($fillable as $col) {
            $rules[$col] = 'nullable|string|max:15|exists:rekening,kd_rek';
        }
        $validated = $request->validate($rules);

        // Filter hanya kolom yang benar-benar dikirim
        $payload = array_intersect_key($validated, array_flip($fillable));

        // Pastikan ada satu baris terlebih dahulu
        $table = $map[$section]['table'];
        $existing = DB::table($table)->count();
        if ($existing === 0) {
            // Insert baris kosong dulu agar update massal aman
            $emptyRow = [];
            foreach ($fillable as $col) {
                $emptyRow[$col] = null;
            }
            DB::table($table)->insert($emptyRow);
        }

        if (count($payload) === 0) {
            return response()->json([
                'message' => 'Tidak ada kolom yang dikirim untuk diupdate',
            ], 422);
        }

        // Update seluruh baris (tabel konfigurasi 1 baris)
        DB::table($table)->update($payload);

        $fresh = DB::table($table)->first();

        return response()->json([
            'message' => 'Konfigurasi berhasil diperbarui',
            'section' => $section,
            'data' => $fresh,
            'updated_fields' => array_keys($payload),
        ]);
    }

    /**
     * Pencarian rekening (helper untuk autocomplete di UI).
     */
    public function rekening(Request $request)
    {
        $q = trim((string) $request->query('q'));
        $limit = min(max((int) $request->query('limit', 50), 1), 200);

        $items = Rekening::query()
            ->when($q !== '', function ($query) use ($q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('kd_rek', 'like', "%$q%")
                        ->orWhere('nm_rek', 'like', "%$q%")
                        ->orWhere('tipe', 'like', "%$q%")
                        ->orWhere('level', 'like', "%$q%");
                });
            })
            ->orderBy('kd_rek')
            ->limit($limit)
            ->get(['kd_rek', 'nm_rek', 'tipe', 'balance', 'level']);

        return response()->json(['items' => $items]);
    }

    /**
     * Peta section -> model & table.
     */
    protected function sectionMap(): array
    {
        return [
            'umum' => ['model' => SetAkun::class, 'table' => 'set_akun'],
            'umum2' => ['model' => SetAkun2::class, 'table' => 'set_akun2'],
            'ralan' => ['model' => SetAkunRalan::class, 'table' => 'set_akun_ralan'],
            'ranap' => ['model' => SetAkunRanap::class, 'table' => 'set_akun_ranap'],
            'ranap2' => ['model' => SetAkunRanap2::class, 'table' => 'set_akun_ranap2'],
        ];
    }
}
