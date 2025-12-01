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
use Carbon\Carbon;

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
        
        // Normalisasi no_rawat: decode jika ada encoding, trim whitespace
        $noRawat = trim(urldecode($noRawat));
        
        // Ambil informasi reg_periksa untuk validasi tanggal, jam, dan no_rkm_medis
        $regPeriksa = RegPeriksa::where('no_rawat', $noRawat)->first();
        
        if (!$regPeriksa) {
            return response()->json([
                'items' => [],
                'summary' => [
                    'by_status' => [],
                    'grand_total' => 0,
                ],
            ]);
        }
        
        // Filter ketat berdasarkan no_rawat yang diberikan
        // Pastikan menggunakan exact match untuk menghindari data dari no_rawat lain
        // Catatan: Validasi tanggal akan dilakukan di PHP setelah query untuk fleksibilitas lebih baik
        $query = Billing::query()->where('no_rawat', '=', $noRawat);

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

            // Gunakan $regPeriksa yang sudah diambil sebelumnya untuk konsistensi
            $reg = $regPeriksa;
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

            // Laborat - Agregasi dari periksa_lab
            // Validasi ketat: kelompokkan berdasarkan kombinasi no_rawat, kd_jenis_prw, tgl_periksa, jam
            // Setiap kombinasi unik = 1 item dengan jumlah = 1
            $laboratDetails = DB::table('periksa_lab')
                ->join('jns_perawatan_lab', 'periksa_lab.kd_jenis_prw', '=', 'jns_perawatan_lab.kd_jenis_prw')
                ->where('periksa_lab.no_rawat', $noRawat)
                ->select(
                    'periksa_lab.no_rawat',
                    'periksa_lab.kd_jenis_prw',
                    'periksa_lab.tgl_periksa',
                    'periksa_lab.jam',
                    'periksa_lab.biaya',
                    'jns_perawatan_lab.nm_perawatan',
                    'jns_perawatan_lab.total_byr'
                )
                ->orderBy('periksa_lab.tgl_periksa')
                ->orderBy('periksa_lab.jam')
                ->get();

            // Agregasi per kombinasi unik: no_rawat, kd_jenis_prw, tgl_periksa, jam
            // Setiap kombinasi unik = 1 item dengan jumlah = 1
            $laboratItems = $laboratDetails
                ->groupBy(function ($item) {
                    // Buat key unik berdasarkan kombinasi no_rawat, kd_jenis_prw, tanggal, jam
                    // Normalisasi format tanggal dan jam untuk konsistensi
                    try {
                        $tglPeriksa = Carbon::parse($item->tgl_periksa)->format('Y-m-d');
                    } catch (\Exception $e) {
                        $tglPeriksa = is_string($item->tgl_periksa) ? substr($item->tgl_periksa, 0, 10) : '';
                    }
                    
                    try {
                        $jam = Carbon::parse($item->jam)->format('H:i:s');
                    } catch (\Exception $e) {
                        $jam = is_string($item->jam) ? $item->jam : '';
                    }
                    
                    return sprintf(
                        '%s|%s|%s|%s',
                        $item->no_rawat ?? '',
                        $item->kd_jenis_prw ?? '',
                        $tglPeriksa,
                        $jam
                    );
                })
                ->map(function ($group) use ($noRawat) {
                    $first = $group->first();
                    
                    // Gunakan biaya dari periksa_lab jika ada, jika tidak gunakan total_byr dari jns_perawatan_lab
                    $biayaPerJenis = (float) ($first->biaya ?? $first->total_byr ?? 0);
                    
                    // Validasi: jumlah selalu = 1 untuk setiap kombinasi unik
                    // Tidak peduli berapa banyak template dalam jenis yang sama, tetap dihitung sebagai 1 item
                    $jumlah = 1;
                    
                    // Total biaya = biaya per jenis (karena jumlah = 1)
                    $totalBiaya = $biayaPerJenis;

                    // Format tanggal untuk tgl_byr (gunakan format Y-m-d)
                    try {
                        $tglByr = Carbon::parse($first->tgl_periksa)->format('Y-m-d');
                    } catch (\Exception $e) {
                        $tglByr = is_string($first->tgl_periksa) ? substr($first->tgl_periksa, 0, 10) : '';
                    }

                    return [
                        'noindex' => null,
                        'no_rawat' => $noRawat,
                        'tgl_byr' => $tglByr,
                        'no' => $first->kd_jenis_prw ?? '',
                        'nm_perawatan' => $first->nm_perawatan ?? $first->kd_jenis_prw ?? '',
                        'pemisah' => '-',
                        'biaya' => $biayaPerJenis,
                        'jumlah' => $jumlah, // Selalu 1 untuk setiap kombinasi unik
                        'tambahan' => 0,
                        'totalbiaya' => $totalBiaya,
                        'status' => 'Laborat',
                        'source' => 'preview',
                    ];
                })
                ->values();

            // Obat/Resep - Ambil setiap baris dari detail_pemberian_obat sebagai item terpisah
            // PENTING: Hanya mengambil dari detail_pemberian_obat yang berarti obat sudah DISERAHKAN
            // Item obat hanya akan tampil setelah proses penyerahan obat selesai (setelah masuk ke detail_pemberian_obat)
            // Jangan mengambil dari resep_obat/resep_dokter karena bisa termasuk resep yang belum diserahkan
            // Perbaikan: Hapus GROUP BY dan tampilkan setiap baris sebagai item terpisah untuk memastikan semua item muncul
            // Validasi tanggal: hanya ambil obat dengan tgl_perawatan >= tgl_registrasi
            $obatDetails = DB::table('detail_pemberian_obat')
                ->join('databarang', 'detail_pemberian_obat.kode_brng', '=', 'databarang.kode_brng')
                ->leftJoin('jenis', 'databarang.kdjns', '=', 'jenis.kdjns')
                ->where('detail_pemberian_obat.no_rawat', $noRawat)
                ->where('detail_pemberian_obat.status', 'Ralan') // Hanya untuk rawat jalan
                ->whereDate('detail_pemberian_obat.tgl_perawatan', '>=', $regPeriksa->tgl_registrasi) // Validasi tanggal
                ->select(
                    'detail_pemberian_obat.kode_brng',
                    'databarang.nama_brng',
                    'jenis.nama as nama_jenis',
                    'detail_pemberian_obat.biaya_obat',
                    'detail_pemberian_obat.tgl_perawatan',
                    'detail_pemberian_obat.jam',
                    'detail_pemberian_obat.no_faktur',
                    'detail_pemberian_obat.no_batch',
                    'detail_pemberian_obat.jml',
                    'detail_pemberian_obat.embalase',
                    'detail_pemberian_obat.tuslah',
                    'detail_pemberian_obat.total',
                    'detail_pemberian_obat.h_beli'
                )
                ->orderBy('detail_pemberian_obat.tgl_perawatan')
                ->orderBy('detail_pemberian_obat.jam')
                ->orderBy('detail_pemberian_obat.no_faktur')
                ->orderBy('detail_pemberian_obat.kode_brng')
                ->orderBy('jenis.nama')
                ->get();

            // DEBUG: Log jumlah data yang diambil dari database
            \Log::info('BillingController: Data obat dari detail_pemberian_obat', [
                'no_rawat' => $noRawat,
                'total_rows' => $obatDetails->count(),
                'items' => $obatDetails->map(function($item) {
                    return [
                        'kode_brng' => $item->kode_brng,
                        'nama_brng' => $item->nama_brng,
                        'no_faktur' => $item->no_faktur,
                        'no_batch' => $item->no_batch,
                        'tgl_perawatan' => $item->tgl_perawatan,
                        'jam' => $item->jam,
                        'jml' => $item->jml,
                    ];
                })->toArray(),
            ]);

            // Map ke format billing items - setiap baris menjadi item terpisah
            $obatItems = $obatDetails->map(function ($item) use ($noRawat) {
                $biayaObat = (float) ($item->biaya_obat ?? 0);
                $jml = (float) ($item->jml ?? 0);
                $embalase = (float) ($item->embalase ?? 0);
                $tuslah = (float) ($item->tuslah ?? 0);
                $tambahan = $embalase + $tuslah;
                $total = (float) ($item->total ?? 0);
                // Total biaya = total + tambahan (sesuai logika Java: total + tambahan)
                $totalBiaya = $total + $tambahan;
                
                // Format nama: nama_brng (nama_jenis) sesuai Java
                $nmPerawatan = $item->nama_brng ?? $item->kode_brng ?? '';
                if ($item->nama_jenis) {
                    $nmPerawatan .= ' (' . $item->nama_jenis . ')';
                }

                // Buat identifier unik untuk setiap item berdasarkan kombinasi primary key
                // Primary key: tgl_perawatan, jam, no_rawat, kode_brng, no_batch, no_faktur
                // Gunakan no_faktur jika ada (lebih readable), jika tidak gunakan kombinasi lengkap dengan no_rawat
                $noIdentifier = !empty($item->no_faktur) 
                    ? $item->no_faktur 
                    : ($item->tgl_perawatan ?? '') . '_' . ($item->jam ?? '') . '_' . ($item->kode_brng ?? '') . '_' . ($item->no_batch ?? '') . '_' . $noRawat;
                
                return [
                    'noindex' => null,
                    'no_rawat' => $noRawat,
                    'tgl_byr' => $item->tgl_perawatan ?? '',
                    'no' => $noIdentifier, // Gunakan identifier unik untuk membedakan setiap item
                    'nm_perawatan' => $nmPerawatan,
                    'pemisah' => '-',
                    'biaya' => $biayaObat,
                    'jumlah' => $jml,
                    'tambahan' => $tambahan,
                    'totalbiaya' => $totalBiaya,
                    'status' => 'Obat',
                    'source' => 'preview',
                    'kode_brng' => $item->kode_brng ?? '', // Tambahkan kode_brng untuk referensi
                    'no_faktur' => $item->no_faktur ?? '', // Tambahkan no_faktur untuk referensi
                    'jam' => $item->jam ?? '', // Tambahkan jam untuk referensi
                ];
            });

            // DEBUG: Log jumlah item setelah mapping
            \Log::info('BillingController: Item obat setelah mapping', [
                'no_rawat' => $noRawat,
                'total_items' => $obatItems->count(),
                'items' => $obatItems->map(function($item) {
                    return [
                        'no' => $item['no'],
                        'kode_brng' => $item['kode_brng'],
                        'nm_perawatan' => $item['nm_perawatan'],
                        'no_faktur' => $item['no_faktur'],
                        'tgl_byr' => $item['tgl_byr'],
                        'jam' => $item['jam'],
                        'jumlah' => $item['jumlah'],
                        'totalbiaya' => $item['totalbiaya'],
                    ];
                })->toArray(),
            ]);

            // Gabungkan semua items dan pastikan hanya yang memiliki no_rawat yang sesuai
            $allPreviewItems = $previewItems
                ->concat($ralanDr)
                ->concat($ralanDrpr)
                ->concat($ralanPr)
                ->concat($laboratItems)
                ->concat($obatItems);
            
            // Filter ketat berdasarkan no_rawat dan validasi tanggal untuk memastikan tidak ada data dari tanggal lain
            $items = $allPreviewItems->filter(function ($item) use ($noRawat, $regPeriksa) {
                // Validasi 1: no_rawat harus sesuai
                if (($item['no_rawat'] ?? '') !== $noRawat) {
                    return false;
                }
                
                // Validasi 2: jika ada tgl_byr, pastikan >= tgl_registrasi
                if (isset($item['tgl_byr']) && $item['tgl_byr']) {
                    try {
                        $tglByr = Carbon::parse($item['tgl_byr']);
                        $tglReg = Carbon::parse($regPeriksa->tgl_registrasi);
                        if ($tglByr->lt($tglReg)) {
                            \Log::warning('Preview item dengan tgl_byr lebih lama dari tgl_registrasi diabaikan', [
                                'no_rawat' => $noRawat,
                                'tgl_byr' => $item['tgl_byr'],
                                'tgl_registrasi' => $regPeriksa->tgl_registrasi,
                                'item' => $item,
                            ]);
                            return false;
                        }
                    } catch (\Exception $e) {
                        // Jika parsing tanggal gagal, tetap tampilkan item (fallback)
                        \Log::warning('Gagal parsing tanggal untuk preview item', [
                            'no_rawat' => $noRawat,
                            'tgl_byr' => $item['tgl_byr'] ?? null,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }
                
                return true;
            })->values();
        } else {
            // Tambahkan metadata 'source' untuk konsistensi
            // Validasi ketat: hanya ambil billing yang sesuai dengan tanggal registrasi dan no_rkm_medis
            $items = $existing->filter(function ($b) use ($noRawat, $regPeriksa) {
                // Validasi 1: no_rawat harus sesuai
                if ($b->no_rawat !== $noRawat) {
                    \Log::warning('Item billing dengan no_rawat tidak sesuai ditemukan', [
                        'expected' => $noRawat,
                        'actual' => $b->no_rawat,
                        'noindex' => $b->noindex,
                    ]);
                    return false;
                }
                
                // Validasi 2: tgl_byr harus >= tgl_registrasi (tidak boleh lebih lama dari tanggal registrasi)
                // Ini mencegah menampilkan data dari tanggal sebelumnya yang mungkin salah input
                $tglByr = Carbon::parse($b->tgl_byr);
                $tglReg = Carbon::parse($regPeriksa->tgl_registrasi);
                
                if ($tglByr->lt($tglReg)) {
                    \Log::warning('Item billing dengan tgl_byr lebih lama dari tgl_registrasi diabaikan', [
                        'no_rawat' => $noRawat,
                        'noindex' => $b->noindex,
                        'tgl_byr' => $b->tgl_byr,
                        'tgl_registrasi' => $regPeriksa->tgl_registrasi,
                    ]);
                    return false;
                }
                
                return true;
            })->map(function ($b) {
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

        // Pastikan semua items memiliki no_rawat yang sesuai dan validasi tanggal sebelum membuat summary
        $filteredItems = collect($items)->filter(function ($item) use ($noRawat, $regPeriksa) {
            // Validasi 1: no_rawat harus sesuai
            if (($item['no_rawat'] ?? '') !== $noRawat) {
                return false;
            }
            
            // Validasi 2: jika ada tgl_byr, pastikan >= tgl_registrasi
            if (isset($item['tgl_byr']) && $item['tgl_byr']) {
                try {
                    $tglByr = Carbon::parse($item['tgl_byr']);
                    $tglReg = Carbon::parse($regPeriksa->tgl_registrasi);
                    if ($tglByr->lt($tglReg)) {
                        return false;
                    }
                } catch (\Exception $e) {
                    // Jika parsing tanggal gagal, tetap tampilkan item (fallback)
                }
            }
            
            return true;
        })->values();
        
        $summaryByStatus = $filteredItems->groupBy('status')->map(function ($rows) {
            return [
                'count' => $rows->count(),
                'total' => round(collect($rows)->sum('totalbiaya'), 2),
            ];
        });

        // DEBUG: Log final items yang dikembalikan ke frontend
        $obatItemsFinal = $filteredItems->filter(function($item) {
            return ($item['status'] ?? '') === 'Obat';
        });
        \Log::info('BillingController: Final response items obat', [
            'no_rawat' => $noRawat,
            'total_obat_items' => $obatItemsFinal->count(),
            'obat_items' => $obatItemsFinal->map(function($item) {
                return [
                    'no' => $item['no'],
                    'kode_brng' => $item['kode_brng'] ?? 'N/A',
                    'nm_perawatan' => $item['nm_perawatan'],
                    'no_faktur' => $item['no_faktur'] ?? 'N/A',
                    'source' => $item['source'] ?? 'N/A',
                ];
            })->toArray(),
            'total_all_items' => $filteredItems->count(),
            'summary_by_status' => $summaryByStatus->toArray(),
        ]);

        return response()->json([
            'items' => $filteredItems->all(),
            'summary' => [
                'by_status' => $summaryByStatus,
                'grand_total' => round($filteredItems->sum('totalbiaya'), 2),
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
