<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JadwalController extends Controller
{
    /**
     * Tampilkan halaman Jadwal (Inertia) dengan dua kartu: form input & datatable.
     */
    public function index(Request $request)
    {
        return Inertia::render('MasterData/Jadwal');
    }

    /**
     * Describe tabel jadwal untuk melihat struktur kolom.
     * Response: { columns: [{ Field, Type, Null, Key, Default, Extra, Comment }] }
     */
    public function describe(Request $request)
    {
        try {
            // SHOW FULL COLUMNS memberikan kolom komentar juga bila ada
            $columns = DB::select('SHOW FULL COLUMNS FROM jadwal');

            return response()->json([
                'columns' => $columns,
            ]);
        } catch (\Throwable $e) {
            Log::error('Describe jadwal failed: '.$e->getMessage());

            return response()->json([
                'message' => 'Gagal mengambil struktur tabel jadwal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ambil daftar nilai enum dari kolom jadwal.hari_kerja langsung dari database.
     * Response: { data: ["SENIN","SELASA",...] }
     */
    public function getHariKerja(Request $request)
    {
        try {
            $dbName = DB::getDatabaseName();
            $row = DB::selectOne(
                "SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'jadwal' AND COLUMN_NAME = 'hari_kerja'",
                [$dbName]
            );

            $enum = $row?->COLUMN_TYPE ?? '';
            // COLUMN_TYPE bentuknya: enum('SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU','AKHAD')
            $values = [];
            if (str_starts_with($enum, 'enum(')) {
                $trimmed = trim($enum, 'enum()');
                // Split by comma while stripping single quotes
                $values = array_map(function ($v) {
                    return trim($v, "' ");
                }, explode(',', $trimmed));
            }

            return response()->json(['data' => $values]);
        } catch (\Throwable $e) {
            Log::error('Get hari_kerja enum failed: '.$e->getMessage());

            // Fallback static jika gagal, mengikuti struktur umum
            return response()->json(['data' => ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'AKHAD']]);
        }
    }

    /**
     * List data jadwal dengan join dokter & poliklinik.
     * Query params opsional: q (search pada kd_dokter/nm_dokter/kd_poli/nm_poli), hari
     */
    public function list(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $hari = trim((string) $request->query('hari', ''));
        $perPage = (int) ($request->query('per_page', 15));

        $query = DB::table('jadwal as j')
            ->leftJoin('dokter as d', 'j.kd_dokter', '=', 'd.kd_dokter')
            ->leftJoin('poliklinik as p', 'j.kd_poli', '=', 'p.kd_poli')
            ->select([
                'j.kd_dokter', 'd.nm_dokter',
                'j.kd_poli', 'p.nm_poli',
                'j.hari_kerja', 'j.jam_mulai', 'j.jam_selesai', 'j.kuota',
            ])
            ->orderBy('j.kd_poli')
            ->orderBy('j.kd_dokter')
            ->orderBy('j.hari_kerja')
            ->orderBy('j.jam_mulai');

        if ($q !== '') {
            $like = '%'.$q.'%';
            $query->where(function ($w) use ($like) {
                $w->where('j.kd_dokter', 'like', $like)
                    ->orWhere('d.nm_dokter', 'like', $like)
                    ->orWhere('j.kd_poli', 'like', $like)
                    ->orWhere('p.nm_poli', 'like', $like);
            });
        }
        if ($hari !== '') {
            $query->where('j.hari_kerja', $hari);
        }

        // Pagination sederhana via manual since this is Query Builder
        $page = max(1, (int) $request->query('page', 1));
        $total = (clone $query)->count();
        $rows = $query->forPage($page, $perPage)->get();

        return response()->json([
            'data' => $rows,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'last_page' => (int) ceil($total / max(1, $perPage)),
            ],
        ]);
    }

    /**
     * Simpan entri jadwal baru.
     * Body: { kd_dokter, hari_kerja, jam_mulai(H:i), jam_selesai(H:i), kd_poli, kuota }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kd_dokter' => ['required', 'string', 'max:20'],
            'hari_kerja' => ['required', 'string', 'max:10'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i'],
            'kd_poli' => ['required', 'string', 'max:10'],
            'kuota' => ['required', 'integer', 'min:1'],
        ]);

        // Cek validitas dokter & poli
        $dokterExists = DB::table('dokter')->where('kd_dokter', $validated['kd_dokter'])->exists();
        $poliExists = DB::table('poliklinik')->where('kd_poli', $validated['kd_poli'])->exists();
        if (! $dokterExists || ! $poliExists) {
            return response()->json([
                'message' => 'Kode dokter atau kode poliklinik tidak ditemukan',
            ], 422);
        }

        // Normalisasi waktu ke HH:MM:SS
        $jm = $validated['jam_mulai'].':00';
        $js = $validated['jam_selesai'].':00';

        // Cegah duplikasi berdasarkan composite key (kd_dokter, hari_kerja, jam_mulai)
        $exists = DB::table('jadwal')
            ->where('kd_dokter', $validated['kd_dokter'])
            ->where('hari_kerja', $validated['hari_kerja'])
            ->where('jam_mulai', $jm)
            ->exists();
        if ($exists) {
            return response()->json([
                'message' => 'Jadwal dengan kombinasi dokter, hari kerja, dan jam mulai tersebut sudah ada',
            ], 409);
        }

        DB::table('jadwal')->insert([
            'kd_dokter' => $validated['kd_dokter'],
            'hari_kerja' => $validated['hari_kerja'],
            'jam_mulai' => $jm,
            'jam_selesai' => $js,
            'kd_poli' => $validated['kd_poli'],
            'kuota' => $validated['kuota'],
        ]);

        return response()->json([
            'message' => 'Jadwal berhasil disimpan',
        ], 201);
    }

    /**
     * Update entri jadwal yang ada.
     * Body:
     * {
     *   old_kd_dokter, old_kd_poli, old_hari_kerja, old_jam_mulai(H:i atau H:i:s),
     *   kd_dokter, kd_poli, hari_kerja, jam_mulai(H:i), jam_selesai(H:i), kuota
     * }
     */
    public function update(Request $request)
    {
        // Validasi minimal untuk key lama dan data baru
        $validated = $request->validate([
            'old_kd_dokter' => ['required', 'string', 'max:20'],
            'old_kd_poli' => ['required', 'string', 'max:10'],
            'old_hari_kerja' => ['required', 'string', 'max:10'],
            'old_jam_mulai' => ['required', 'string'], // terima H:i atau H:i:s

            'kd_dokter' => ['required', 'string', 'max:20'],
            'hari_kerja' => ['required', 'string', 'max:10'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i'],
            'kd_poli' => ['required', 'string', 'max:10'],
            'kuota' => ['required', 'integer', 'min:1'],
        ]);

        // Cek validitas dokter & poli
        $dokterExists = DB::table('dokter')->where('kd_dokter', $validated['kd_dokter'])->exists();
        $poliExists = DB::table('poliklinik')->where('kd_poli', $validated['kd_poli'])->exists();
        if (! $dokterExists || ! $poliExists) {
            return response()->json([
                'message' => 'Kode dokter atau kode poliklinik tidak ditemukan',
            ], 422);
        }

        // Normalisasi waktu
        $oldJamMulai = $validated['old_jam_mulai'];
        if (preg_match('/^\d{2}:\d{2}$/', $oldJamMulai)) {
            $oldJamMulai .= ':00';
        }
        $newJamMulai = $validated['jam_mulai'].':00';
        $newJamSelesai = $validated['jam_selesai'].':00';

        // Pastikan data lama ada
        $existsOld = DB::table('jadwal')
            ->where('kd_dokter', $validated['old_kd_dokter'])
            ->where('kd_poli', $validated['old_kd_poli'])
            ->where('hari_kerja', $validated['old_hari_kerja'])
            ->where('jam_mulai', $oldJamMulai)
            ->exists();
        if (! $existsOld) {
            return response()->json([
                'message' => 'Data jadwal lama tidak ditemukan',
            ], 404);
        }

        // Cegah duplikasi pada kombinasi (kd_dokter, hari_kerja, jam_mulai) baru jika berubah
        $isKeyChanged = (
            $validated['kd_dokter'] !== $validated['old_kd_dokter'] ||
            $validated['hari_kerja'] !== $validated['old_hari_kerja'] ||
            $newJamMulai !== $oldJamMulai
        );
        if ($isKeyChanged) {
            $dup = DB::table('jadwal')
                ->where('kd_dokter', $validated['kd_dokter'])
                ->where('hari_kerja', $validated['hari_kerja'])
                ->where('jam_mulai', $newJamMulai)
                ->exists();
            if ($dup) {
                return response()->json([
                    'message' => 'Kombinasi dokter, hari kerja, dan jam mulai baru sudah ada',
                ], 409);
            }
        }

        // Lakukan update
        DB::table('jadwal')
            ->where('kd_dokter', $validated['old_kd_dokter'])
            ->where('kd_poli', $validated['old_kd_poli'])
            ->where('hari_kerja', $validated['old_hari_kerja'])
            ->where('jam_mulai', $oldJamMulai)
            ->update([
                'kd_dokter' => $validated['kd_dokter'],
                'kd_poli' => $validated['kd_poli'],
                'hari_kerja' => $validated['hari_kerja'],
                'jam_mulai' => $newJamMulai,
                'jam_selesai' => $newJamSelesai,
                'kuota' => $validated['kuota'],
            ]);

        return response()->json([
            'message' => 'Jadwal berhasil diperbarui',
        ]);
    }

    /**
     * Hapus entri jadwal.
     * Body: { kd_dokter, kd_poli, hari_kerja, jam_mulai(H:i atau H:i:s) }
     */
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'kd_dokter' => ['required', 'string', 'max:20'],
            'kd_poli' => ['required', 'string', 'max:10'],
            'hari_kerja' => ['required', 'string', 'max:10'],
            'jam_mulai' => ['required', 'string'], // terima H:i atau H:i:s
        ]);

        $jam = $validated['jam_mulai'];
        if (preg_match('/^\d{2}:\d{2}$/', $jam)) {
            $jam .= ':00';
        }

        $deleted = DB::table('jadwal')
            ->where('kd_dokter', $validated['kd_dokter'])
            ->where('kd_poli', $validated['kd_poli'])
            ->where('hari_kerja', $validated['hari_kerja'])
            ->where('jam_mulai', $jam)
            ->delete();

        if ($deleted === 0) {
            return response()->json([
                'message' => 'Jadwal tidak ditemukan atau sudah dihapus',
            ], 404);
        }

        return response()->json([
            'message' => 'Jadwal berhasil dihapus',
        ]);
    }
}
