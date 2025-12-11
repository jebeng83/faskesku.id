<?php

namespace App\Http\Controllers;

use App\Models\RawatJalan\ResepObat;
use App\Models\RawatJlDr;
use App\Models\RawatJlDrpr;
use App\Models\RawatJlPr;
use App\Models\RegPeriksa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class PembayaranController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Pembayaran/Index');
    }

    public function ralan(Request $request): Response|JsonResponse
    {
        // Jika diminta JSON eksplisit via query (untuk konsumsi dari halaman index tabbed)
        // Catatan: Jangan gunakan wantsJson agar tidak mengganggu permintaan Inertia (X-Inertia)
        if ($request->boolean('json')) {
            $q = trim((string) $request->input('q', ''));
            $startDateInput = $request->input('start_date');
            $endDateInput = $request->input('end_date');

            $startDate = $startDateInput ? Carbon::parse($startDateInput) : Carbon::today()->subDays(6);
            $endDate = $endDateInput ? Carbon::parse($endDateInput) : Carbon::today();

            if ($startDate->greaterThan($endDate)) {
                [$startDate, $endDate] = [$endDate, $startDate];
            }

            $registrations = RegPeriksa::with([
                'patient:no_rkm_medis,nm_pasien,alamat,no_tlp',
                'penjab:kd_pj,png_jawab',
            ])
                ->where('status_lanjut', 'Ralan')
                ->whereBetween('tgl_registrasi', [$startDate->toDateString(), $endDate->toDateString()])
                ->when($q !== '', function ($query) use ($q) {
                    $like = '%'.str_replace(' ', '%', $q).'%';
                    $query
                        ->where(function ($inner) use ($like) {
                            $inner->where('no_rawat', 'like', $like)
                                ->orWhere('no_rkm_medis', 'like', $like)
                                ->orWhereHas('patient', function ($p) use ($like) {
                                    $p->where('nm_pasien', 'like', $like);
                                });
                        });
                })
                ->orderByDesc('tgl_registrasi')
                ->orderByDesc('jam_reg')
                ->limit(400)
                ->get();

            $groups = $registrations
                ->groupBy('tgl_registrasi')
                ->map(function ($items, $date) {
                    $carbonDate = Carbon::parse($date);

                    return [
                        'tanggal' => $date,
                        'display_tanggal' => $carbonDate->translatedFormat('d M Y'),
                        'items' => $items->map(function (RegPeriksa $reg) use ($date) {
                            return [
                                'no_rawat' => $reg->no_rawat,
                                'no_rkm_medis' => $reg->no_rkm_medis,
                                'pasien' => $reg->patient->nm_pasien ?? '-',
                                'penjamin' => $reg->penjab->png_jawab ?? $reg->kd_pj,
                                'total' => (float) $reg->biaya_reg,
                                'status_bayar' => $reg->status_bayar ?? '-',
                                'status' => $reg->stts ?? '-',
                                'jam_reg' => $reg->jam_reg,
                                'tanggal' => $date,
                            ];
                        })->values(),
                    ];
                })
                ->sortKeysDesc()
                ->values()
                ->toArray();

            $stats = [
                'menunggu_pembayaran' => $registrations->where('status_bayar', 'Belum Bayar')->count(),
                'menunggu_penjamin' => $registrations->filter(function ($reg) {
                    return $reg->status_bayar === 'Belum Bayar' && ($reg->kd_pj ?? '') !== 'UMUM';
                })->count(),
                'dalam_proses_kasir' => $registrations->whereIn('stts', ['Belum', 'Berkas Diterima'])->count(),
                'selesai_hari_ini' => $registrations->filter(function ($reg) {
                    return ($reg->status_bayar === 'Sudah Bayar') && $reg->tgl_registrasi === Carbon::today()->toDateString();
                })->count(),
            ];

            return response()->json([
                'groups' => $groups,
                'stats' => $stats,
                'filters' => [
                    'start_date' => $startDate->toDateString(),
                    'end_date' => $endDate->toDateString(),
                    'q' => $q,
                ],
            ]);
        }

        $startDateInput = $request->input('start_date');
        $endDateInput = $request->input('end_date');

        $startDate = $startDateInput ? Carbon::parse($startDateInput) : Carbon::today()->subDays(6);
        $endDate = $endDateInput ? Carbon::parse($endDateInput) : Carbon::today();

        if ($startDate->greaterThan($endDate)) {
            [$startDate, $endDate] = [$endDate, $startDate];
        }

        $registrations = RegPeriksa::with([
            'patient:no_rkm_medis,nm_pasien,alamat,no_tlp',
            'penjab:kd_pj,png_jawab',
        ])
            ->where('status_lanjut', 'Ralan')
            ->whereBetween('tgl_registrasi', [$startDate->toDateString(), $endDate->toDateString()])
            ->orderByDesc('tgl_registrasi')
            ->orderByDesc('jam_reg')
            ->limit(400)
            ->get();

        $groups = $registrations
            ->groupBy('tgl_registrasi')
            ->map(function ($items, $date) {
                $carbonDate = Carbon::parse($date);

                return [
                    'tanggal' => $date,
                    'display_tanggal' => $carbonDate->translatedFormat('d M Y'),
                    'items' => $items->map(function (RegPeriksa $reg) use ($date) {
                        return [
                            'no_rawat' => $reg->no_rawat,
                            'no_rkm_medis' => $reg->no_rkm_medis,
                            'pasien' => $reg->patient->nm_pasien ?? '-',
                            'penjamin' => $reg->penjab->png_jawab ?? $reg->kd_pj,
                            'total' => (float) $reg->biaya_reg,
                            'status_bayar' => $reg->status_bayar ?? '-',
                            'status' => $reg->stts ?? '-',
                            'jam_reg' => $reg->jam_reg,
                            'tanggal' => $date,
                        ];
                    })->values(),
                ];
            })
            ->sortKeysDesc()
            ->values()
            ->toArray();

        $stats = [
            'menunggu_pembayaran' => $registrations->where('status_bayar', 'Belum Bayar')->count(),
            'menunggu_penjamin' => $registrations->filter(function ($reg) {
                return $reg->status_bayar === 'Belum Bayar' && ($reg->kd_pj ?? '') !== 'UMUM';
            })->count(),
            'dalam_proses_kasir' => $registrations->whereIn('stts', ['Belum', 'Berkas Diterima'])->count(),
            'selesai_hari_ini' => $registrations->filter(function ($reg) {
                return ($reg->status_bayar === 'Sudah Bayar') && $reg->tgl_registrasi === Carbon::today()->toDateString();
            })->count(),
        ];

        return Inertia::render('Pembayaran/Ralan', [
            'groups' => $groups,
            'stats' => $stats,
            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ],
        ]);
    }

    public function ralanDetail(string $noRawat): Response
    {
        $regPeriksa = RegPeriksa::with([
            'patient:no_rkm_medis,nm_pasien,alamat,no_tlp',
            'penjab:kd_pj,png_jawab',
            'dokter:kd_dokter,nm_dokter',
            'poliklinik:kd_poli,nm_poli',
        ])->where('no_rawat', $noRawat)->firstOrFail();

        $tindakanDokter = RawatJlDr::with([
            'jenisPerawatan.kategoriPerawatan:kd_kategori,nm_kategori',
        ])
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get()
            ->map(function (RawatJlDr $item) {
                return [
                    'kategori' => $item->jenisPerawatan->kategoriPerawatan->nm_kategori ?? 'Tanpa Kategori',
                    'jenis_perawatan' => $item->jenisPerawatan->nm_perawatan ?? $item->kd_jenis_prw,
                    'biaya' => (float) $item->biaya_rawat,
                    'material' => (float) $item->material,
                    'bhp' => (float) $item->bhp,
                    'tarif_dokter' => (float) $item->tarif_tindakandr,
                    'tarif_perawat' => 0.0,
                    'kso' => (float) $item->kso,
                    'manajemen' => (float) $item->menejemen,
                ];
            });

        $tindakanPerawat = RawatJlPr::with([
            'jenisPerawatan.kategoriPerawatan:kd_kategori,nm_kategori',
        ])
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get()
            ->map(function (RawatJlPr $item) {
                return [
                    'kategori' => $item->jenisPerawatan->kategoriPerawatan->nm_kategori ?? 'Tanpa Kategori',
                    'jenis_perawatan' => $item->jenisPerawatan->nm_perawatan ?? $item->kd_jenis_prw,
                    'biaya' => (float) $item->biaya_rawat,
                    'material' => (float) $item->material,
                    'bhp' => (float) $item->bhp,
                    'tarif_dokter' => 0.0,
                    'tarif_perawat' => (float) $item->tarif_tindakanpr,
                    'kso' => (float) $item->kso,
                    'manajemen' => (float) $item->menejemen,
                ];
            });

        $tindakanDokterPerawat = RawatJlDrpr::with([
            'jenisPerawatan.kategoriPerawatan:kd_kategori,nm_kategori',
        ])
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->get()
            ->map(function (RawatJlDrpr $item) {
                return [
                    'kategori' => $item->jenisPerawatan->kategoriPerawatan->nm_kategori ?? 'Tanpa Kategori',
                    'jenis_perawatan' => $item->jenisPerawatan->nm_perawatan ?? $item->kd_jenis_prw,
                    'biaya' => (float) $item->biaya_rawat,
                    'material' => (float) $item->material,
                    'bhp' => (float) $item->bhp,
                    'tarif_dokter' => (float) $item->tarif_tindakandr,
                    'tarif_perawat' => (float) $item->tarif_tindakanpr,
                    'kso' => (float) $item->kso,
                    'manajemen' => (float) $item->menejemen,
                ];
            });

        $semuaTindakan = $tindakanDokter
            ->merge($tindakanPerawat)
            ->merge($tindakanDokterPerawat);

        $tindakanPerKategori = $semuaTindakan
            ->groupBy('kategori')
            ->map(function ($items, $kategori) {
                return [
                    'kategori' => $kategori,
                    'total_biaya' => $items->sum('biaya'),
                    'total_material' => $items->sum('material'),
                    'total_bhp' => $items->sum('bhp'),
                    'total_tarif_dokter' => $items->sum('tarif_dokter'),
                    'total_tarif_perawat' => $items->sum('tarif_perawat'),
                    'total_kso' => $items->sum('kso'),
                    'total_manajemen' => $items->sum('manajemen'),
                    'items' => $items->map(function ($item) {
                        return [
                            'nama' => $item['jenis_perawatan'],
                            'biaya' => $item['biaya'],
                        ];
                    })->values(),
                ];
            })
            ->values();

        $tindakanSummary = [
            'jumlah_kategori' => $tindakanPerKategori->count(),
            'jumlah_tindakan' => $semuaTindakan->count(),
            'grand_total' => $tindakanPerKategori->sum('total_biaya'),
        ];

        $resep = ResepObat::with(['resepDokter.databarang:kode_brng,nama_brng,kode_sat,ralan'])
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_peresepan')
            ->orderByDesc('jam_peresepan')
            ->get()
            ->map(function (ResepObat $resep) {
                return [
                    'no_resep' => $resep->no_resep,
                    'tgl_peresepan' => $resep->tgl_peresepan,
                    'jam_peresepan' => $resep->jam_peresepan,
                    'status' => $resep->status,
                    'items' => $resep->resepDokter->map(function ($detail) {
                        return [
                            'kode_brng' => $detail->kode_brng,
                            'nama_brng' => $detail->databarang->nama_brng ?? '-',
                            'satuan' => $detail->databarang->kode_sat ?? '',
                            'jumlah' => (float) $detail->jml,
                            'aturan_pakai' => $detail->aturan_pakai,
                            'harga' => (float) ($detail->databarang->ralan ?? 0),
                        ];
                    })->values(),
                ];
            })
            ->values();

        return Inertia::render('Pembayaran/RalanDetail', [
            'reg_periksa' => [
                'no_rawat' => $regPeriksa->no_rawat,
                'tgl_registrasi' => $regPeriksa->tgl_registrasi,
                'jam_reg' => $regPeriksa->jam_reg,
                'status_bayar' => $regPeriksa->status_bayar,
                'penjamin' => $regPeriksa->penjab->png_jawab ?? $regPeriksa->kd_pj,
                'pasien' => [
                    'no_rkm_medis' => $regPeriksa->no_rkm_medis,
                    'nama' => $regPeriksa->patient->nm_pasien ?? '-',
                    'alamat' => $regPeriksa->patient->alamat ?? '-',
                    'no_tlp' => $regPeriksa->patient->no_tlp ?? null,
                ],
                'dokter' => $regPeriksa->dokter->nm_dokter ?? null,
                'poliklinik' => $regPeriksa->poliklinik->nm_poli ?? null,
                'biaya_reg' => (float) $regPeriksa->biaya_reg,
            ],
            'tindakan_kategori' => $tindakanPerKategori,
            'tindakan_summary' => $tindakanSummary,
            'resep_obat' => $resep,
        ]);
    }

    public function ranap(Request $request): Response|JsonResponse
    {
        // Sediakan JSON sederhana agar bisa ditampilkan dari tab Index
        // Catatan: Jangan gunakan wantsJson agar tidak mengganggu permintaan Inertia (X-Inertia)
        if ($request->boolean('json')) {
            $summary = [
                ['label' => 'Pasien Dirawat', 'value' => 54, 'desc' => 'Dengan tagihan aktif'],
                ['label' => 'Butuh Verifikasi', 'value' => 12, 'desc' => 'Menunggu konfirmasi penjamin'],
                ['label' => 'Siap Discharge', 'value' => 7, 'desc' => 'Menunggu proses kasir'],
                ['label' => 'Lunas Minggu Ini', 'value' => 39, 'desc' => 'Sudah diterbitkan kwitansi'],
            ];

            $rows = [
                ['pasien' => 'Arum Setyani', 'ranjang' => 'VIP-102', 'penjamin' => 'BPJS', 'total' => 'Rp 12.450.000', 'status' => 'Menunggu Penjamin'],
                ['pasien' => 'Bagus Priyanto', 'ranjang' => 'Kelas 1-14B', 'penjamin' => 'Umum', 'total' => 'Rp 6.820.000', 'status' => 'Kasir'],
                ['pasien' => 'Clara Hapsari', 'ranjang' => 'Kelas 2-21C', 'penjamin' => 'Perusahaan', 'total' => 'Rp 9.120.000', 'status' => 'Resume'],
            ];

            return response()->json([
                'summary' => $summary,
                'rows' => $rows,
            ]);
        }

        return Inertia::render('Pembayaran/Ranap');
    }
}
