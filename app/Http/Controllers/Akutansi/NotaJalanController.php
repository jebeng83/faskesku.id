<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Akutansi\Billing;
use App\Models\RawatJlDr;
use App\Models\RawatJlPr;
use App\Models\RawatJlDrpr;

class NotaJalanController extends Controller
{
    /**
     * Cek apakah nota_jalan sudah ada untuk no_rawat tertentu.
     * Response: { count: number }
     */
    public function exists(Request $request)
    {
        $noRawat = $request->query('no_rawat');
        if (!$noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        $count = DB::table('nota_jalan')->where('no_rawat', $noRawat)->count();
        return response()->json(['count' => $count]);
    }

    /**
     * Buat nomor nota_jalan dan simpan record.
     * Body: { no_rawat, tanggal (YYYY-MM-DD), jam (HH:MM:SS) }
     * Nomor format: YYYY/MM/DD/RJ/NNNN (urut harian)
     */
    public function store(Request $request)
    {
        $noRawat = $request->input('no_rawat');
        $tanggal = $request->input('tanggal');
        $jam = $request->input('jam');

        if (!$noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        $date = $tanggal ? Carbon::parse($tanggal) : Carbon::now();
        $time = $jam ?: Carbon::now()->format('H:i:s');

        $prefix = $date->format('Y/m/d') . '/RJ/';

        return DB::transaction(function () use ($noRawat, $date, $time, $prefix) {
            // Ambil suffix max 4 digit per tanggal
            $maxSuffix = DB::table('nota_jalan')
                ->whereDate('tanggal', $date->toDateString())
                ->select(DB::raw('IFNULL(MAX(CONVERT(RIGHT(no_nota,4),SIGNED)),0) AS mx'))
                ->value('mx');

            $newSuffix = (int)$maxSuffix + 1;
            $suffix = str_pad((string)$newSuffix, 4, '0', STR_PAD_LEFT);
            $noNota = $prefix . $suffix;

            // Insert, jika terjadi konflik unik, coba sekali lagi dengan increment
            try {
                DB::table('nota_jalan')->insert([
                    'no_rawat' => $noRawat,
                    'no_nota'  => $noNota,
                    'tanggal'  => $date->toDateString(),
                    'jam'      => $time,
                ]);
            } catch (\Throwable $e) {
                // Hapus nota_jalan yang bentrok untuk no_rawat ini lalu generate ulang
                DB::table('nota_jalan')->where('no_rawat', $noRawat)->delete();
                $newSuffix += 1;
                $suffix = str_pad((string)$newSuffix, 4, '0', STR_PAD_LEFT);
                $noNota = $prefix . $suffix;
                DB::table('nota_jalan')->insert([
                    'no_rawat' => $noRawat,
                    'no_nota'  => $noNota,
                    'tanggal'  => $date->toDateString(),
                    'jam'      => $time,
                ]);
            }

            // Otomatis buat tagihan_sadewa setelah nota_jalan dibuat
            try {
                \App\Http\Controllers\Akutansi\TagihanSadewaController::createFromNota(
                    $noNota,
                    auth()->user()?->name ?? 'System'
                );
            } catch (\Throwable $e) {
                // Log error tapi jangan gagalkan pembuatan nota
                \Log::warning('Gagal membuat tagihan_sadewa otomatis: ' . $e->getMessage());
            }

            return response()->json(['no_nota' => $noNota], 201);
        });
    }

    /**
     * Endpoint stub untuk membangun snapshot billing dari sumber operasional (isRawat2) berdasarkan toggle.
     * Body: { no_rawat, toggles: { laborat, radiologi, obat, administrasi, sarpras, tarifDokter, tarifPerawat, tambahan, potongan } }
     * Saat ini mengembalikan sukses (placeholder). Implementasi agregasi penuh dapat ditambahkan menyusul.
     */
    public function snapshot(Request $request)
    {
        $noRawat = $request->input('no_rawat');
        if (!$noRawat) {
            return response()->json(['message' => 'no_rawat wajib diisi'], 422);
        }

        // Blokir snapshot jika nota_jalan sudah ada (mengikuti perilaku Java)
        try {
            $notaExists = DB::table('nota_jalan')->where('no_rawat', $noRawat)->count();
            if ($notaExists > 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tagihan sudah pernah disimpan (nota_jalan sudah ada). Snapshot tidak diizinkan.',
                ], 409);
            }
        } catch (\Throwable $e) {
            // Lanjutkan, tetapi catat error
            \Log::warning('Gagal cek nota_jalan exists: '.$e->getMessage());
        }

        $items = $request->input('items', []);
        $toggles = $request->input('toggles', []); // optional: { label_bool }
        $selectedStatuses = $request->input('selected_statuses', []); // optional: ["Laborat","Ralan Dokter",...]

        // Jika items tidak diberikan, bangun dari tabel rawat_jl_* (Ralan) sebagai fallback minimal
        if (!is_array($items) || count($items) === 0) {
            $ralanDr = RawatJlDr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float)($r->biaya_rawat ?? 0);
                    return [
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'status' => 'Ralan Dokter',
                    ];
                });

            $ralanPr = RawatJlPr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float)($r->biaya_rawat ?? 0);
                    return [
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'status' => 'Ralan Paramedis',
                    ];
                });

            $ralanDrpr = RawatJlDrpr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float)($r->biaya_rawat ?? 0);
                    return [
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'status' => 'Ralan Dokter Paramedis',
                    ];
                });

            $items = $ralanDr->concat($ralanDrpr)->concat($ralanPr)->values()->all();
        }

        // Terapkan filter berdasarkan selected_statuses (jika tersedia) atau berdasarkan toggles
        if (is_array($selectedStatuses) && count($selectedStatuses) > 0) {
            $items = array_values(array_filter($items, function ($it) use ($selectedStatuses) {
                return in_array($it['status'] ?? '-', $selectedStatuses, true);
            }));
        } elseif (is_array($toggles) && count($toggles) > 0) {
            $map = [
                'Laboratorium' => ['Laborat', 'TtlLaborat'],
                'Radiologi' => ['Radiologi', 'TtlRadiologi'],
                'Tarif Dokter' => ['Ralan Dokter', 'Ranap Dokter', 'TtlRalan Dokter', 'TtlRanap Dokter', 'Dokter', 'Ralan Dokter Paramedis'],
                'Tarif Paramedis' => ['Ralan Paramedis', 'Ranap Paramedis', 'TtlRalan Paramedis', 'Perawat', 'Ralan Dokter Paramedis'],
                'Obat' => ['Obat', 'Resep Pulang', 'TtlObat', 'TtlResep Pulang', 'Retur Obat', 'TtlRetur Obat'],
                'Tambahan' => ['Tambahan', 'TtlTambahan'],
                'Potongan' => ['Potongan', 'TtlPotongan'],
                'Administrasi' => ['Administrasi', 'Registrasi', 'Service'],
                'Sarpras' => ['Kamar', 'TtlKamar', 'Harian'],
            ];
            $allowed = [];
            foreach ($map as $label => $statuses) {
                $val = $toggles[$label] ?? false;
                if ($val) {
                    foreach ($statuses as $st) {
                        $allowed[$st] = true;
                    }
                }
            }
            if (!empty($allowed)) {
                $items = array_values(array_filter($items, function ($it) use ($allowed) {
                    return isset($allowed[$it['status'] ?? '-']);
                }));
            }
        }

        if (!is_array($items) || count($items) === 0) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Tidak ada item yang disimpan berdasarkan toggle/seleksi',
                'inserted' => 0,
                'grand_total' => 0,
            ]);
        }

        // Siapkan rows untuk insert massal
        $nowDate = Carbon::now()->toDateString();
        $nextIndex = (int) DB::table('billing')->max('noindex') + 1;
        $rows = [];
        $grandTotal = 0.0;
        foreach ($items as $it) {
            $biaya = (float) ($it['biaya'] ?? 0);
            $jumlah = (float) ($it['jumlah'] ?? 1);
            $tambahan = (float) ($it['tambahan'] ?? 0);
            $total = round(($biaya * $jumlah) + $tambahan, 2);
            $grandTotal += $total;
            $rows[] = [
                'noindex' => $nextIndex++,
                'no_rawat' => $noRawat,
                'tgl_byr' => $it['tgl_byr'] ?? $nowDate,
                'no' => $it['no'] ?? null,
                'nm_perawatan' => $it['nm_perawatan'] ?? ($it['no'] ?? 'Item'),
                'pemisah' => $it['pemisah'] ?? '-',
                'biaya' => $biaya,
                'jumlah' => $jumlah,
                'tambahan' => $tambahan,
                'totalbiaya' => $total,
                'status' => $it['status'] ?? '-',
            ];
        }

        DB::transaction(function () use ($rows) {
            DB::table('billing')->insert($rows);
        });

        return response()->json([
            'status' => 'ok',
            'message' => 'Snapshot billing tersimpan',
            'inserted' => count($rows),
            'grand_total' => round($grandTotal, 2),
        ], 201);
    }
}
