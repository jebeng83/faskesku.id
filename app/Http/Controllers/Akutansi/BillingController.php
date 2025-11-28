<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\Billing;
use App\Models\RawatJlDr;
use App\Models\RawatJlDrpr;
use App\Models\RawatJlPr;
use App\Models\RegPeriksa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillingController extends Controller
{
    /**
     * Render halaman Inertia untuk CRUD Billing.
     */
    public function page(Request $request)
    {
        // Enumerasi status berdasarkan schema_dump untuk validasi & pilihan di UI
        $statusOptions = [
            'Laborat', 'Radiologi', 'Operasi', 'Obat', 'Ranap Dokter', 'Ranap Dokter Paramedis', 'Ranap Paramedis',
            'Ralan Dokter', 'Ralan Dokter Paramedis', 'Ralan Paramedis', 'Tambahan', 'Potongan', 'Administrasi', 'Kamar', '-',
            'Registrasi', 'Harian', 'Service', 'TtlObat', 'TtlRanap Dokter', 'TtlRanap Paramedis', 'TtlRalan Dokter',
            'TtlRalan Paramedis', 'TtlKamar', 'Dokter', 'Perawat', 'TtlTambahan', 'Retur Obat', 'TtlRetur Obat', 'Resep Pulang',
            'TtlResep Pulang', 'TtlPotongan', 'TtlLaborat', 'TtlOperasi', 'TtlRadiologi', 'Tagihan',
        ];

        return inertia('Akutansi/Billing', [
            'statusOptions' => $statusOptions,
            'initialNoRawat' => $request->query('no_rawat'),
        ]);
    }

    /**
     * Render halaman Inertia untuk Kasir Ralan (UI serupa Billing, sesuai DlgKasirRalan).
     */
    public function kasirRalanPage(Request $request)
    {
        $statusOptions = [
            'Laborat', 'Radiologi', 'Operasi', 'Obat', 'Ranap Dokter', 'Ranap Dokter Paramedis', 'Ranap Paramedis',
            'Ralan Dokter', 'Ralan Dokter Paramedis', 'Ralan Paramedis', 'Tambahan', 'Potongan', 'Administrasi', 'Kamar', '-',
            'Registrasi', 'Harian', 'Service', 'TtlObat', 'TtlRanap Dokter', 'TtlRanap Paramedis', 'TtlRalan Dokter',
            'TtlRalan Paramedis', 'TtlKamar', 'Dokter', 'Perawat', 'TtlTambahan', 'Retur Obat', 'TtlRetur Obat', 'Resep Pulang',
            'TtlResep Pulang', 'TtlPotongan', 'TtlLaborat', 'TtlOperasi', 'TtlRadiologi', 'Tagihan',
        ];

        return inertia('Akutansi/KasirRalan', [
            'statusOptions' => $statusOptions,
            'initialNoRawat' => $request->query('no_rawat'),
        ]);
    }

    /**
     * Listing billing per no_rawat, dengan filter opsional.
     */
    public function index(Request $request)
    {
        $request->validate([
            'no_rawat' => ['required', 'string'],
            'q' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        $noRawat = $request->string('no_rawat');
        $query = Billing::query()->where('no_rawat', $noRawat);

        if ($request->filled('q')) {
            $q = '%'.$request->string('q').'%';
            $query->where(function ($sub) use ($q) {
                $sub->where('nm_perawatan', 'like', $q)
                    ->orWhere('no', 'like', $q);
            });
        }
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }
        if ($request->filled('start_date')) {
            $query->whereDate('tgl_byr', '>=', $request->date('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('tgl_byr', '<=', $request->date('end_date'));
        }

        $existing = $query->orderBy('noindex')->get();

        // Jika snapshot billing belum ada, bangun PREVIEW dari tabel tindakan Ralan
        if ($existing->isEmpty()) {
            // Awali dengan item Registrasi (biaya_reg) jika tersedia
            $previewItems = collect();

            $reg = RegPeriksa::where('no_rawat', $noRawat)->first();
            if ($reg && (float) ($reg->biaya_reg ?? 0) > 0) {
                $previewItems->push([
                    'noindex' => null,
                    'no_rawat' => $noRawat,
                    'tgl_byr' => $reg->tgl_registrasi,
                    'no' => 'REG',
                    'nm_perawatan' => 'Registrasi',
                    'pemisah' => '-',
                    'biaya' => (float) ($reg->biaya_reg ?? 0),
                    'jumlah' => 1,
                    'tambahan' => 0,
                    'totalbiaya' => (float) ($reg->biaya_reg ?? 0),
                    'status' => 'Registrasi',
                    'source' => 'preview',
                ]);
            }

            // Ralan Dokter
            $ralanDr = RawatJlDr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float) ($r->biaya_rawat ?? 0);

                    return [
                        'noindex' => null,
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'totalbiaya' => $biaya,
                        'status' => 'Ralan Dokter',
                        'source' => 'preview',
                    ];
                });

            // Ralan Paramedis
            $ralanPr = RawatJlPr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float) ($r->biaya_rawat ?? 0);

                    return [
                        'noindex' => null,
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'totalbiaya' => $biaya,
                        'status' => 'Ralan Paramedis',
                        'source' => 'preview',
                    ];
                });

            // Ralan Dokter Paramedis
            $ralanDrpr = RawatJlDrpr::where('no_rawat', $noRawat)
                ->with('jenisPerawatan')
                ->orderBy('tgl_perawatan')
                ->orderBy('jam_rawat')
                ->get()
                ->map(function ($r) {
                    $biaya = (float) ($r->biaya_rawat ?? 0);

                    return [
                        'noindex' => null,
                        'no_rawat' => $r->no_rawat,
                        'tgl_byr' => $r->tgl_perawatan,
                        'no' => $r->kd_jenis_prw,
                        'nm_perawatan' => optional($r->jenisPerawatan)->nm_perawatan ?? $r->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biaya,
                        'jumlah' => 1,
                        'tambahan' => 0,
                        'totalbiaya' => $biaya,
                        'status' => 'Ralan Dokter Paramedis',
                        'source' => 'preview',
                    ];
                });

            // Laborat - Agregasi dari permintaan_detail_permintaan_lab
            // Agregasi per noorder dan kd_jenis_prw untuk mendapatkan total biaya per jenis pemeriksaan per permintaan
            $laboratDetails = DB::table('permintaan_detail_permintaan_lab')
                ->join('permintaan_lab', 'permintaan_detail_permintaan_lab.noorder', '=', 'permintaan_lab.noorder')
                ->join('jns_perawatan_lab', 'permintaan_detail_permintaan_lab.kd_jenis_prw', '=', 'jns_perawatan_lab.kd_jenis_prw')
                ->where('permintaan_lab.no_rawat', $noRawat)
                ->where('permintaan_lab.status', 'ralan') // Hanya untuk rawat jalan
                ->select(
                    'permintaan_detail_permintaan_lab.kd_jenis_prw',
                    'jns_perawatan_lab.nm_perawatan',
                    'jns_perawatan_lab.total_byr',
                    'permintaan_lab.tgl_permintaan',
                    'permintaan_lab.noorder'
                )
                ->get();

            // Agregasi per noorder dan kd_jenis_prw
            // total_byr dari jns_perawatan_lab adalah tarif per jenis pemeriksaan (sama untuk semua template dalam jenis yang sama)
            // Jadi untuk setiap kombinasi (noorder, kd_jenis_prw), ambil total_byr dari salah satu record
            $laboratItems = $laboratDetails
                ->groupBy(function ($item) {
                    return $item->noorder.'|'.$item->kd_jenis_prw;
                })
                ->map(function ($group) use ($noRawat) {
                    $first = $group->first();
                    // total_byr adalah tarif per jenis pemeriksaan (sama untuk semua template dalam jenis yang sama)
                    $biayaPerJenis = (float) $first->total_byr;
                    // Jumlah = jumlah template dalam kombinasi (noorder, kd_jenis_prw) ini
                    $jumlah = $group->count();
                    // Total biaya = biaya per jenis (karena semua template dalam jenis yang sama punya tarif yang sama)
                    $totalBiaya = $biayaPerJenis;

                    return [
                        'noindex' => null,
                        'no_rawat' => $noRawat,
                        'tgl_byr' => $first->tgl_permintaan,
                        'no' => $first->noorder ?? $first->kd_jenis_prw,
                        'nm_perawatan' => $first->nm_perawatan ?? $first->kd_jenis_prw,
                        'pemisah' => '-',
                        'biaya' => $biayaPerJenis,
                        'jumlah' => $jumlah,
                        'tambahan' => 0,
                        'totalbiaya' => $totalBiaya,
                        'status' => 'Laborat',
                        'source' => 'preview',
                    ];
                })
                ->values();

            $items = $previewItems->concat($ralanDr)->concat($ralanDrpr)->concat($ralanPr)->concat($laboratItems);
        } else {
            // Tambahkan metadata 'source' untuk konsistensi
            $items = $existing->map(function ($b) {
                return [
                    'noindex' => $b->noindex,
                    'no_rawat' => $b->no_rawat,
                    'tgl_byr' => $b->tgl_byr,
                    'no' => $b->no,
                    'nm_perawatan' => $b->nm_perawatan,
                    'pemisah' => $b->pemisah,
                    'biaya' => (float) $b->biaya,
                    'jumlah' => (float) $b->jumlah,
                    'tambahan' => (float) $b->tambahan,
                    'totalbiaya' => (float) $b->totalbiaya,
                    'status' => $b->status,
                    'source' => 'billing',
                ];
            });
        }

        $summaryByStatus = collect($items)->groupBy('status')->map(function ($rows) {
            return [
                'count' => $rows->count(),
                'total' => round(collect($rows)->sum('totalbiaya'), 2),
            ];
        });

        return response()->json([
            'items' => $items,
            'summary' => [
                'by_status' => $summaryByStatus,
                'grand_total' => round(collect($items)->sum('totalbiaya'), 2),
            ],
        ]);
    }

    /**
     * Simpan baris billing baru.
     */
    public function store(Request $request)
    {
        $statusOptions = [
            'Laborat', 'Radiologi', 'Operasi', 'Obat', 'Ranap Dokter', 'Ranap Dokter Paramedis', 'Ranap Paramedis',
            'Ralan Dokter', 'Ralan Dokter Paramedis', 'Ralan Paramedis', 'Tambahan', 'Potongan', 'Administrasi', 'Kamar', '-',
            'Registrasi', 'Harian', 'Service', 'TtlObat', 'TtlRanap Dokter', 'TtlRanap Paramedis', 'TtlRalan Dokter',
            'TtlRalan Paramedis', 'TtlKamar', 'Dokter', 'Perawat', 'TtlTambahan', 'Retur Obat', 'TtlRetur Obat', 'Resep Pulang',
            'TtlResep Pulang', 'TtlPotongan', 'TtlLaborat', 'TtlOperasi', 'TtlRadiologi', 'Tagihan',
        ];

        $data = $request->validate([
            'no_rawat' => ['required', 'string', 'exists:reg_periksa,no_rawat'],
            'tgl_byr' => ['nullable', 'date'],
            'no' => ['nullable', 'string', 'max:50'],
            'nm_perawatan' => ['required', 'string', 'max:200'],
            'pemisah' => ['nullable', 'string', 'max:1'],
            'biaya' => ['required', 'numeric'],
            'jumlah' => ['required', 'numeric'],
            'tambahan' => ['nullable', 'numeric'],
            'status' => ['required', 'in:'.implode(',', $statusOptions)],
        ]);

        $biaya = (float) ($data['biaya'] ?? 0);
        $jumlah = (float) ($data['jumlah'] ?? 0);
        $tambahan = (float) ($data['tambahan'] ?? 0);
        $totalbiaya = round(($biaya * $jumlah) + $tambahan, 2);

        // Generate noindex berbasis max+1 (karena tabel tidak auto-increment)
        $nextIndex = (int) Billing::max('noindex') + 1;

        $row = [
            'noindex' => $nextIndex,
            'no_rawat' => $data['no_rawat'],
            'tgl_byr' => $data['tgl_byr'] ?? now()->toDateString(),
            'no' => $data['no'] ?? null,
            'nm_perawatan' => $data['nm_perawatan'],
            'pemisah' => $data['pemisah'] ?? '-',
            'biaya' => $biaya,
            'jumlah' => $jumlah,
            'tambahan' => $tambahan,
            'totalbiaya' => $totalbiaya,
            'status' => $data['status'],
        ];

        DB::transaction(function () use ($row) {
            Billing::create($row);
        });

        return response()->json(['message' => 'Billing item created', 'item' => $row], 201);
    }

    /**
     * Update baris billing berdasarkan noindex.
     */
    public function update(Request $request, int $noindex)
    {
        $statusOptions = [
            'Laborat', 'Radiologi', 'Operasi', 'Obat', 'Ranap Dokter', 'Ranap Dokter Paramedis', 'Ranap Paramedis',
            'Ralan Dokter', 'Ralan Dokter Paramedis', 'Ralan Paramedis', 'Tambahan', 'Potongan', 'Administrasi', 'Kamar', '-',
            'Registrasi', 'Harian', 'Service', 'TtlObat', 'TtlRanap Dokter', 'TtlRanap Paramedis', 'TtlRalan Dokter',
            'TtlRalan Paramedis', 'TtlKamar', 'Dokter', 'Perawat', 'TtlTambahan', 'Retur Obat', 'TtlRetur Obat', 'Resep Pulang',
            'TtlResep Pulang', 'TtlPotongan', 'TtlLaborat', 'TtlOperasi', 'TtlRadiologi', 'Tagihan',
        ];

        $bill = Billing::where('noindex', $noindex)->firstOrFail();

        $data = $request->validate([
            'tgl_byr' => ['nullable', 'date'],
            'no' => ['nullable', 'string', 'max:50'],
            'nm_perawatan' => ['required', 'string', 'max:200'],
            'pemisah' => ['nullable', 'string', 'max:1'],
            'biaya' => ['required', 'numeric'],
            'jumlah' => ['required', 'numeric'],
            'tambahan' => ['nullable', 'numeric'],
            'status' => ['required', 'in:'.implode(',', $statusOptions)],
        ]);

        $biaya = (float) ($data['biaya'] ?? 0);
        $jumlah = (float) ($data['jumlah'] ?? 0);
        $tambahan = (float) ($data['tambahan'] ?? 0);
        $totalbiaya = round(($biaya * $jumlah) + $tambahan, 2);

        $bill->update([
            'tgl_byr' => $data['tgl_byr'] ?? $bill->tgl_byr,
            'no' => $data['no'] ?? $bill->no,
            'nm_perawatan' => $data['nm_perawatan'],
            'pemisah' => $data['pemisah'] ?? $bill->pemisah,
            'biaya' => $biaya,
            'jumlah' => $jumlah,
            'tambahan' => $tambahan,
            'totalbiaya' => $totalbiaya,
            'status' => $data['status'],
        ]);

        return response()->json(['message' => 'Billing item updated']);
    }

    /**
     * Hapus baris billing.
     */
    public function destroy(int $noindex)
    {
        $bill = Billing::where('noindex', $noindex)->firstOrFail();
        $bill->delete();

        return response()->json(['message' => 'Billing item deleted']);
    }
}
