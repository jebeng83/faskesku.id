<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function jabatanLookup(Request $request): JsonResponse
    {
        if (! Schema::hasTable('jabatan')) {
            return response()->json([
                'data' => [],
            ]);
        }

        $q = trim((string) $request->query('q', ''));
        $limit = (int) $request->query('limit', 50);
        if ($limit < 1) $limit = 50;
        if ($limit > 200) $limit = 200;

        $query = DB::table('jabatan')->select('kd_jbtn', 'nm_jbtn');
        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                $w->where('kd_jbtn', 'like', $like);
                if (Schema::hasColumn('jabatan', 'nm_jbtn')) {
                    $w->orWhere('nm_jbtn', 'like', $like);
                }
            });
        }

        $data = $query
            ->orderBy(Schema::hasColumn('jabatan', 'nm_jbtn') ? 'nm_jbtn' : 'kd_jbtn')
            ->limit($limit)
            ->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    public function pegawaiLookup(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $limit = (int) $request->query('limit', 20);
        if ($limit < 1) $limit = 20;
        if ($limit > 100) $limit = 100;

        $query = Employee::query()
            ->leftJoin('jabatan', function ($join) {
                $join->on('jabatan.kd_jbtn', '=', 'pegawai.jbtn')
                    ->orOn('jabatan.nm_jbtn', '=', 'pegawai.jbtn');
            })
            ->select(
                'pegawai.nik',
                'pegawai.nama',
                'pegawai.jk',
                'pegawai.tmp_lahir',
                'pegawai.tgl_lahir',
                'pegawai.alamat',
                'pegawai.jbtn',
                'pegawai.stts_aktif',
                'jabatan.kd_jbtn as kd_jbtn'
            )
            ->whereNotIn('nik', function ($sub) {
                $sub->select('nip')->from('petugas');
            });

        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                $w->where('nama', 'like', $like)->orWhere('nik', 'like', $like);
            });
        }

        $data = $query->orderBy('nama')->limit($limit)->get();

        return response()->json([
            'data' => $data,
        ]);
    }

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

    public function petugasDescribe(): JsonResponse
    {
        try {
            $rows = DB::select('DESCRIBE petugas');
            return response()->json(['data' => $rows]);
        } catch (\Throwable $e) {
            $cols = [];
            try {
                $cols = Schema::getColumnListing('petugas');
            } catch (\Throwable $e2) {
            }

            return response()->json([
                'data' => [],
                'columns' => $cols,
                'message' => 'Gagal DESCRIBE petugas',
            ], 200);
        }
    }

    public function petugasIndex(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', ''));
        $perPage = (int) $request->query('per_page', 10);
        if ($perPage < 1) $perPage = 10;
        if ($perPage > 100) $perPage = 100;

        $candidates = [
            'nip',
            'nama',
            'jk',
            'tmp_lahir',
            'tgl_lahir',
            'gol_darah',
            'agama',
            'stts_nikah',
            'alamat',
            'kd_jbtn',
            'no_telp',
            'email',
            'status',
        ];
        $select = array_values(array_filter($candidates, fn ($c) => Schema::hasColumn('petugas', $c)));
        if (empty($select)) {
            $select = ['nip'];
        }

        $query = DB::table('petugas')->select($select);

        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                if (Schema::hasColumn('petugas', 'nip')) {
                    $w->orWhere('nip', 'like', $like);
                }
                if (Schema::hasColumn('petugas', 'nama')) {
                    $w->orWhere('nama', 'like', $like);
                }
                if (Schema::hasColumn('petugas', 'email')) {
                    $w->orWhere('email', 'like', $like);
                }
            });
        }

        if ($status !== '' && Schema::hasColumn('petugas', 'status')) {
            $query->where('status', $status);
        }

        if (Schema::hasColumn('petugas', 'nama')) {
            $query->orderBy('nama');
        } else {
            $query->orderBy('nip');
        }

        $p = $query->paginate($perPage)->withQueryString();
        return response()->json($p);
    }

    public function petugasStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nip' => ['required', 'string', 'max:20'],
            'nama' => ['required', 'string', 'max:191'],
            'jk' => ['nullable', 'string', 'max:10'],
            'tmp_lahir' => ['nullable', 'string', 'max:100'],
            'tgl_lahir' => ['nullable', 'date'],
            'gol_darah' => ['nullable', 'string', 'max:5'],
            'agama' => ['nullable', 'string', 'max:50'],
            'stts_nikah' => ['nullable', 'string', 'max:50'],
            'alamat' => ['nullable', 'string'],
            'kd_jbtn' => ['nullable', 'string', 'max:100'],
            'no_telp' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'string', 'max:191'],
            'status' => ['nullable', 'string', 'max:5'],
        ]);

        $nip = trim((string) $validated['nip']);
        if (DB::table('petugas')->where('nip', $nip)->exists()) {
            return response()->json([
                'message' => 'NIP sudah terdaftar di tabel petugas',
            ], 409);
        }

        $jk = isset($validated['jk']) ? trim((string) $validated['jk']) : '';
        if (strcasecmp($jk, 'Pria') === 0) $jk = 'L';
        if (strcasecmp($jk, 'Wanita') === 0) $jk = 'P';
        if (! in_array($jk, ['L', 'P'], true)) $jk = '';

        $payload = $validated;
        $payload['nip'] = $nip;
        $payload['nama'] = trim((string) $payload['nama']);
        if ($jk !== '') {
            $payload['jk'] = $jk;
        }

        if (Schema::hasColumn('petugas', 'kd_jbtn') && array_key_exists('kd_jbtn', $payload)) {
            $kd = trim((string) ($payload['kd_jbtn'] ?? ''));
            if ($kd === '') {
                $payload['kd_jbtn'] = null;
            } elseif (Schema::hasTable('jabatan')) {
                $exists = DB::table('jabatan')->where('kd_jbtn', $kd)->exists();
                if (! $exists && Schema::hasColumn('jabatan', 'nm_jbtn')) {
                    $mapped = DB::table('jabatan')->where('nm_jbtn', $kd)->value('kd_jbtn');
                    $payload['kd_jbtn'] = $mapped ?: null;
                } elseif (! $exists) {
                    $payload['kd_jbtn'] = null;
                }
            }
        }

        $defaults = [
            'jk' => 'L',
            'tmp_lahir' => '',
            'gol_darah' => '-',
            'agama' => '',
            'stts_nikah' => 'BELUM MENIKAH',
            'alamat' => '',
            'kd_jbtn' => null,
            'no_telp' => '',
            'email' => '',
            'status' => '1',
        ];

        foreach ($defaults as $k => $v) {
            if (! Schema::hasColumn('petugas', $k)) {
                unset($payload[$k]);
                continue;
            }
            if (! array_key_exists($k, $payload) || $payload[$k] === null || trim((string) $payload[$k]) === '') {
                $payload[$k] = $v;
            }
        }

        foreach (array_keys($payload) as $k) {
            if ($k === 'tgl_lahir') {
                if (! Schema::hasColumn('petugas', 'tgl_lahir')) {
                    unset($payload['tgl_lahir']);
                }
                continue;
            }
            if (! Schema::hasColumn('petugas', $k)) {
                unset($payload[$k]);
            }
        }

        DB::table('petugas')->insert($payload);

        return response()->json([
            'message' => 'Petugas berhasil dibuat',
        ], 201);
    }

    public function petugasUpdate(Request $request, string $nip): JsonResponse
    {
        $nip = trim((string) $nip);
        $exists = DB::table('petugas')->where('nip', $nip)->exists();
        if (! $exists) {
            return response()->json(['message' => 'Petugas tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => ['nullable', 'string', 'max:191'],
            'jk' => ['nullable', 'string', 'max:10'],
            'tmp_lahir' => ['nullable', 'string', 'max:100'],
            'tgl_lahir' => ['nullable', 'date'],
            'gol_darah' => ['nullable', 'string', 'max:5'],
            'agama' => ['nullable', 'string', 'max:50'],
            'stts_nikah' => ['nullable', 'string', 'max:50'],
            'alamat' => ['nullable', 'string'],
            'kd_jbtn' => ['nullable', 'string', 'max:100'],
            'no_telp' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'string', 'max:191'],
            'status' => ['nullable', 'string', 'max:5'],
        ]);

        $jk = isset($validated['jk']) ? trim((string) $validated['jk']) : '';
        if (strcasecmp($jk, 'Pria') === 0) $jk = 'L';
        if (strcasecmp($jk, 'Wanita') === 0) $jk = 'P';
        if ($jk !== '' && ! in_array($jk, ['L', 'P'], true)) {
            unset($validated['jk']);
        } elseif ($jk !== '') {
            $validated['jk'] = $jk;
        }

        if (Schema::hasColumn('petugas', 'kd_jbtn') && array_key_exists('kd_jbtn', $validated)) {
            $kd = trim((string) ($validated['kd_jbtn'] ?? ''));
            if ($kd === '') {
                $validated['kd_jbtn'] = null;
            } elseif (Schema::hasTable('jabatan')) {
                $exists = DB::table('jabatan')->where('kd_jbtn', $kd)->exists();
                if (! $exists && Schema::hasColumn('jabatan', 'nm_jbtn')) {
                    $mapped = DB::table('jabatan')->where('nm_jbtn', $kd)->value('kd_jbtn');
                    $validated['kd_jbtn'] = $mapped ?: null;
                } elseif (! $exists) {
                    $validated['kd_jbtn'] = null;
                }
            }
        }

        foreach (array_keys($validated) as $k) {
            if (! Schema::hasColumn('petugas', $k)) {
                unset($validated[$k]);
            }
        }

        if (empty($validated)) {
            return response()->json(['message' => 'Tidak ada perubahan'], 200);
        }

        DB::table('petugas')->where('nip', $nip)->update($validated);

        return response()->json([
            'message' => 'Petugas berhasil diperbarui',
        ], 200);
    }

    public function petugasDestroy(string $nip): JsonResponse
    {
        $nip = trim((string) $nip);
        try {
            $deleted = DB::table('petugas')->where('nip', $nip)->delete();
            if ($deleted < 1) {
                return response()->json(['message' => 'Petugas tidak ditemukan'], 404);
            }

            return response()->json(['message' => 'Petugas berhasil dihapus'], 200);
        } catch (\Throwable $e) {
            if (Schema::hasColumn('petugas', 'status')) {
                DB::table('petugas')->where('nip', $nip)->update(['status' => '0']);
                return response()->json([
                    'message' => 'Petugas tidak dapat dihapus karena relasi data. Status dinonaktifkan.',
                ], 409);
            }

            return response()->json([
                'message' => 'Gagal menghapus petugas',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
