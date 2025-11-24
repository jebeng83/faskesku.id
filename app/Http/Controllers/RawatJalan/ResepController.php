<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Models\RawatJalan\ResepObat;
use App\Models\RawatJalan\ResepDokter;
use App\Models\RawatJalan\Gudangbarang;
use App\Models\RawatJalan\Databarang;
use App\Models\SetDepoRalan;
use App\Models\RiwayatTransaksiGudangBarang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Services\Akutansi\JurnalPostingService;

class ResepController extends Controller
{
    /**
     * Menyimpan resep baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'no_rawat' => 'required|string',
            'kd_poli' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.kode_brng' => 'required|string',
            'items.*.jml' => 'required|numeric|min:0.1',
            'items.*.aturan_pakai' => 'nullable|string|max:150'
        ]);

        // Validasi kd_dokter
        if (empty($request->kd_dokter)) {
            return response()->json([
                'success' => false,
                'message' => 'Dokter harus dipilih'
            ], 400);
        }

        // Validasi dokter exists dan aktif
        $dokter = \App\Models\Dokter::where('kd_dokter', $request->kd_dokter)
            ->where('status', '1')
            ->first();

        if (!$dokter) {
            return response()->json([
                'success' => false,
                'message' => 'Dokter tidak ditemukan atau tidak aktif'
            ], 400);
        }

        DB::beginTransaction();

        try {
            // Dapatkan bangsal berdasarkan poli untuk validasi stok yang tepat
            $bangsalList = SetDepoRalan::getBangsalByPoli($request->kd_poli);
            
            if (empty($bangsalList)) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada depo yang terkait dengan poli ini'
                ], 400);
            }

            // Validasi stok obat berdasarkan bangsal yang terkait dengan poli
            foreach ($request->items as $obat) {
                $databarang = Databarang::where('kode_brng', $obat['kode_brng'])->first();
                
                if (!$databarang) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Obat dengan kode {$obat['kode_brng']} tidak ditemukan"
                    ], 400);
                }
                
                if ($databarang->status != '1') {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Obat {$databarang->nama_brng} tidak aktif"
                    ], 400);
                }
                
                // Hitung total stok dari bangsal yang terkait dengan poli
                $totalStokTersedia = 0;
                $stokPerBangsal = [];
                
                foreach ($bangsalList as $kdBangsal) {
                    $stokBangsal = Gudangbarang::getTotalStokByBarangBangsal($obat['kode_brng'], $kdBangsal);
                    $totalStokTersedia += $stokBangsal;
                    $stokPerBangsal[$kdBangsal] = $stokBangsal;
                }
                
                if ($totalStokTersedia < $obat['jml']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Stok obat {$databarang->nama_brng} tidak mencukupi. Tersedia: {$totalStokTersedia}, Diminta: {$obat['jml']}",
                        'stok_detail' => $stokPerBangsal
                    ], 400);
                }
                
                // Validasi jumlah minimum
                if ($obat['jml'] <= 0) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => "Jumlah obat {$databarang->nama_brng} harus lebih dari 0"
                    ], 400);
                }
            }

            // Buat resep obat dengan nomor resep otomatis
            $resepObat = ResepObat::createResep([
                'tgl_perawatan' => '0000-00-00',
                'jam' => '00:00:00',
                'no_rawat' => $request->no_rawat,
                'kd_dokter' => $request->kd_dokter, // Dokter yang dipilih user
                'tgl_peresepan' => $request->tgl_peresepan ?? Carbon::now()->format('Y-m-d'),
                'jam_peresepan' => $request->jam_peresepan ?? Carbon::now()->format('H:i:s'),
                'status' => $request->status ?? 'ralan',
                'tgl_penyerahan' => '0000-00-00',
                'jam_penyerahan' => '00:00:00'
            ]);

            // Simpan detail resep
            $resepDetails = ResepDokter::saveResepDetail($resepObat->no_resep, $request->items);

            DB::commit();

            // Otomatis susun dan posting jurnal obat ralan (Suspen vs Pendapatan, HPP vs Persediaan)
            // Dilakukan setelah transaksi resep berhasil disimpan. Pengurangan stok dipindahkan ke event penyerahan.
            try {
                $composer = app()->make('App\\Services\\Akutansi\\TampJurnalComposerResepRalan');
                $composer->composeForNoResep($resepObat->no_resep);
                $postingService = new JurnalPostingService();
                $postingService->post();
            } catch (\Throwable $e) {
                // Jangan gagalkan penyimpanan resep jika posting jurnal gagal; log agar dapat ditindaklanjuti.
                Log::error('Gagal posting jurnal resep ralan: ' . $e->getMessage(), [
                    'no_resep' => $resepObat->no_resep,
                    'no_rawat' => $request->no_rawat,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Resep berhasil disimpan',
                'data' => [
                    'no_resep' => $resepObat->no_resep,
                    'resep_obat' => $resepObat,
                    'resep_detail' => $resepDetails
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Event penyerahan obat: mengurangi stok (FIFO) dan set tgl/jam penyerahan.
     * Validasi stok dilakukan ulang berdasarkan kd_poli dari reg_periksa untuk no_rawat terkait.
     */
    public function penyerahan(Request $request, string $noResep): JsonResponse
    {
        try {
            DB::beginTransaction();

            $resep = ResepObat::where('no_resep', $noResep)->first();
            if (!$resep) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            // Ambil kd_poli dari reg_periksa berdasarkan no_rawat resep
            $reg = DB::table('reg_periksa')->where('no_rawat', $resep->no_rawat)->select('kd_poli')->first();
            if (!$reg || empty($reg->kd_poli)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Poli untuk no_rawat tidak ditemukan'
                ], 400);
            }

            // Ambil detail obat
            $details = ResepDokter::where('no_resep', $noResep)->get(['kode_brng', 'jml', 'aturan_pakai']);
            if ($details->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Detail resep kosong'
                ], 400);
            }

            // Validasi opsional payload biaya tambahan per item
            $request->validate([
                'embalase_tuslah' => 'nullable|array',
                'embalase_tuslah.non_racikan' => 'nullable|array',
                'embalase_tuslah.non_racikan.*.kode_brng' => 'required_with:embalase_tuslah.non_racikan|string',
                'embalase_tuslah.non_racikan.*.embalase' => 'nullable|numeric|min:0',
                'embalase_tuslah.non_racikan.*.tuslah' => 'nullable|numeric|min:0',
            ]);

            // Ambil default Embalase/Tuslah jika tidak dikirimkan dari client
            $defaultEmbalase = 0.0;
            $defaultTuslah = 0.0;
            try {
                $defaultEmbalase = (float) (DB::table('set_embalase')->value('embalase_per_obat') ?? 0);
                $defaultTuslah = (float) (DB::table('set_embalase')->value('tuslah_per_obat') ?? 0);
            } catch (\Throwable $th) {
                // abaikan jika tabel tidak tersedia
            }

            // Map biaya tambahan dari payload: { embalase_tuslah: { non_racikan: [{kode_brng,embalase,tuslah}], racikan: [...] } }
            $payload = $request->input('embalase_tuslah', []);
            $nonRacikanCharges = [];
            if (!empty($payload['non_racikan']) && is_array($payload['non_racikan'])) {
                foreach ($payload['non_racikan'] as $r) {
                    $kode = $r['kode_brng'] ?? null;
                    if ($kode) {
                        $nonRacikanCharges[$kode] = [
                            'embalase' => (float) ($r['embalase'] ?? $defaultEmbalase),
                            'tuslah' => (float) ($r['tuslah'] ?? $defaultTuslah),
                        ];
                    }
                }
            }

            $nowDate = Carbon::now()->format('Y-m-d');
            $nowTime = Carbon::now()->format('H:i:s');
            $jenisStatus = strtolower($resep->status) === 'ranap' ? 'Ranap' : 'Ralan';

            // Validasi stok ulang dan eksekusi pengurangan stok per item
            foreach ($details as $det) {
                // Validasi total stok tersedia di depo terkait poli
                $bangsalList = SetDepoRalan::getBangsalByPoli($reg->kd_poli);
                $totalStok = 0;
                foreach ($bangsalList as $kdBangsal) {
                    $totalStok += Gudangbarang::getTotalStokByBarangBangsal($det->kode_brng, $kdBangsal);
                }
                if ($totalStok < $det->jml) {
                    DB::rollBack();
                    $barang = Databarang::where('kode_brng', $det->kode_brng)->first();
                    $nama = $barang ? $barang->nama_brng : $det->kode_brng;
                    return response()->json([
                        'success' => false,
                        'message' => "Stok obat $nama tidak mencukupi untuk penyerahan. Tersedia: $totalStok, Diminta: {$det->jml}"
                    ], 400);
                }

                // Kurangi stok dengan FIFO dan dapatkan batch yang diambil
                $updatedBatches = $this->updateStokObat($det->kode_brng, $det->jml, $reg->kd_poli);

                // Ambil informasi barang untuk menghitung biaya
                $barangInfo = Databarang::where('kode_brng', $det->kode_brng)->first();
                $kapasitas = max((float) ($barangInfo->kapasitas ?? 1), 1);
                $biayaObat = (float) ($barangInfo->ralan ?? 0); // tarif ralan per satuan kecil
                $hargaBeli = (float) ($barangInfo->h_beli ?? 0);

                // Biaya tambahan per item (embalase/tuslah)
                $embalaseTuslah = $nonRacikanCharges[$det->kode_brng] ?? [
                    'embalase' => $defaultEmbalase,
                    'tuslah' => $defaultTuslah,
                ];

                // Jika pengurangan stok tersebar ke beberapa batch, simpan satu baris per batch.
                // Embalase/Tuslah hanya dibebankan sekali untuk item pertama agar tidak double-charge.
                $chargesAssigned = false;
                foreach ($updatedBatches as $batch) {
                    // Gudangbarang.stok disimpan dalam satuan kecil; gunakan stok_diambil apa adanya sebagai jml kecil
                    $jmlKecil = (float) ($batch['stok_diambil'] ?? 0);
                    $embalase = $chargesAssigned ? 0.0 : (float) ($embalaseTuslah['embalase'] ?? 0);
                    $tuslah = $chargesAssigned ? 0.0 : (float) ($embalaseTuslah['tuslah'] ?? 0);
                    $total = round($embalase + $tuslah + ($biayaObat * $jmlKecil), 2);

                    DB::table('detail_pemberian_obat')->insert([
                        'tgl_perawatan' => $nowDate,
                        'jam' => $nowTime,
                        'no_rawat' => $resep->no_rawat,
                        'kode_brng' => $det->kode_brng,
                        'h_beli' => $hargaBeli,
                        'biaya_obat' => $biayaObat,
                        'jml' => $jmlKecil,
                        'embalase' => $embalase,
                        'tuslah' => $tuslah,
                        'total' => $total,
                        'status' => $jenisStatus,
                        'kd_bangsal' => $batch['kd_bangsal'] ?? '',
                        'no_batch' => $batch['no_batch'] ?? '',
                        'no_faktur' => $batch['no_faktur'] ?? '',
                    ]);

                    // Audit trail stok per batch di gudangbarang
                    try {
                        RiwayatTransaksiGudangBarang::catatUpdate(
                            $det->kode_brng,
                            $batch['kd_bangsal'] ?? '',
                            $batch['no_batch'] ?? '',
                            $batch['no_faktur'] ?? '',
                            $batch['stok_sebelum'] ?? null,
                            $batch['stok_sesudah'] ?? null,
                            'rawat_jalan',
                            'penyerahan_obat',
                            [
                                'no_resep' => $noResep,
                                'no_rawat' => $resep->no_rawat,
                                'stok_diambil' => $jmlKecil,
                                'status' => $jenisStatus
                            ],
                            [
                                'no_resep' => $noResep,
                                'no_rawat' => $resep->no_rawat,
                                'stok_diambil' => $jmlKecil,
                                'status' => $jenisStatus
                            ]
                        );
                    } catch (\Throwable $th) {
                        // Jangan gagal penyerahan hanya karena audit trail error; log untuk investigasi
                        Log::warning('Gagal mencatat riwayat transaksi gudang', [
                            'error' => $th->getMessage(),
                            'kode_brng' => $det->kode_brng,
                            'batch' => $batch,
                            'no_resep' => $noResep,
                        ]);
                    }

                    // Perbarui sisa pada tabel data_batch sesuai batch yang digunakan (satuan kecil)
                    try {
                        $affected = DB::table('data_batch')
                            ->where('no_batch', $batch['no_batch'] ?? '')
                            ->where('kode_brng', $det->kode_brng)
                            ->where('no_faktur', $batch['no_faktur'] ?? '')
                            ->decrement('sisa', $jmlKecil);

                        if ($affected === 0) {
                            // Jika baris tidak ditemukan, log peringatan untuk investigasi. Tetap lanjut agar penyerahan tidak gagal.
                            Log::warning('Row data_batch tidak ditemukan saat update sisa', [
                                'kode_brng' => $det->kode_brng,
                                'no_batch' => $batch['no_batch'] ?? null,
                                'no_faktur' => $batch['no_faktur'] ?? null,
                                'pengurangan' => $jmlKecil,
                                'no_resep' => $noResep,
                            ]);
                        }
                    } catch (\Throwable $th) {
                        // Jangan menggagalkan penyerahan bila terjadi kegagalan update data_batch; catat sebagai warning
                        Log::warning('Gagal memperbarui data_batch.sisa', [
                            'error' => $th->getMessage(),
                            'kode_brng' => $det->kode_brng,
                            'no_batch' => $batch['no_batch'] ?? null,
                            'no_faktur' => $batch['no_faktur'] ?? null,
                            'pengurangan' => $jmlKecil,
                            'no_resep' => $noResep,
                        ]);
                    }

                    // Tandai charges sudah dibebankan agar batch berikutnya tidak mengulang
                    if (!$chargesAssigned && ($embalase > 0 || $tuslah > 0)) {
                        $chargesAssigned = true;
                    }
                }

                // Simpan aturan pakai (jika ada) mengikuti pola Java: ke tabel aturan_pakai
                $aturan = trim((string) ($det->aturan_pakai ?? ''));
                if ($aturan !== '') {
                    DB::table('aturan_pakai')->insert([
                        'tgl_perawatan' => $nowDate,
                        'jam' => $nowTime,
                        'no_rawat' => $resep->no_rawat,
                        'kode_brng' => $det->kode_brng,
                        'aturan' => $aturan,
                    ]);
                }
                }

            // Set tgl/jam penyerahan pada tabel resep_obat
            $resep->tgl_penyerahan = $nowDate;
            $resep->jam_penyerahan = $nowTime;
            $resep->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Penyerahan obat berhasil diproses',
                'data' => [
                    'no_resep' => $resep->no_resep,
                    'tgl_penyerahan' => $resep->tgl_penyerahan,
                    'jam_penyerahan' => $resep->jam_penyerahan,
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validasi payload gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Error penyerahan resep: ' . $e->getMessage(), [ 'no_resep' => $noResep ]);
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat penyerahan obat: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mendapatkan detail resep berdasarkan nomor resep
     *
     * Mengambil data resep lengkap beserta detail obat-obatan
     * yang terkait dengan nomor resep tertentu.
     *
     * @param string $noResep Nomor resep yang akan dicari
     * @return \Illuminate\Http\JsonResponse Response JSON dengan data resep atau error
     *
     * @throws \Exception Jika terjadi kesalahan dalam proses pengambilan data
     */
    public function show(string $noResep): JsonResponse
    {
        try {
            // Ambil data resep dengan relasi ke detail obat
            $resepObat = ResepObat::with('resepDokter.databarang')
                ->where('no_resep', $noResep)
                ->first();

            // Validasi apakah resep ditemukan
            if (!$resepObat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            // Return data resep jika berhasil ditemukan
            return response()->json([
                'success' => true,
                'data' => $resepObat
            ], 200);
            
        } catch (\Exception $e) {
            // Handle error dan return response error
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mendapatkan daftar resep berdasarkan no_rawat
     */
    public function getByNoRawat($noRawat): JsonResponse
    {
        try {
            // Decode noRawat untuk menangani encoding dari frontend
            $decodedNoRawat = urldecode($noRawat);
            
            $resepList = ResepObat::with(['resepDokter.databarang', 'dokter'])
                ->where('no_rawat', $decodedNoRawat)
                ->orderBy('tgl_peresepan', 'desc')
                ->orderBy('jam_peresepan', 'desc')
                ->get()
                ->map(function($resep) {
                    return [
                        'no_resep' => $resep->no_resep,
                        'tgl_peresepan' => $resep->tgl_peresepan,
                        'jam_peresepan' => $resep->jam_peresepan,
                        'no_rawat' => $resep->no_rawat,
                        'kd_dokter' => $resep->kd_dokter,
                        'nama_dokter' => $resep->dokter->nm_dokter ?? 'Dokter tidak ditemukan',
                        'status' => $resep->status,
                        'tgl_perawatan' => $resep->tgl_perawatan,
                        'jam' => $resep->jam,
                        'tgl_penyerahan' => $resep->tgl_penyerahan,
                        'jam_penyerahan' => $resep->jam_penyerahan,
                        'detail_obat' => $resep->resepDokter->map(function($detail) {
                            return [
                                'kode_brng' => $detail->kode_brng,
                                'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                                'jml' => $detail->jml,
                                'aturan_pakai' => $detail->aturan_pakai,
                                'satuan' => $detail->databarang->kode_satbesar ?? '',
                                'harga' => $detail->databarang->h_beli ?? 0
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $resepList
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Endpoint alternatif: Mendapatkan daftar resep berdasarkan no_rawat via query string (?no_rawat=...)
     * Digunakan untuk menghindari konflik route ketika no_rawat mengandung karakter '/'.
     */
    public function getByNoRawatQuery(): JsonResponse
    {
        $noRawat = request()->query('no_rawat');
        if (!$noRawat) {
            return response()->json([
                'success' => false,
                'message' => 'Parameter no_rawat wajib diisi'
            ], 422);
        }
        return $this->getByNoRawat($noRawat);
    }

    /**
     * Mengambil riwayat resep berdasarkan no_rkm_medis pasien dengan pagination
     */
    public function getByNoRkmMedis($noRkmMedis): JsonResponse
    {
        try {
            // Decode noRkmMedis untuk menangani encoding dari frontend
            $decodedNoRkmMedis = urldecode($noRkmMedis);
            
            // Ambil parameter pagination dari request
            $limit = request()->get('limit', 5); // Default 5 untuk loading awal
            $offset = request()->get('offset', 0);
            
            // Pertama, ambil semua no_rawat berdasarkan no_rkm_medis dari reg_periksa
            $noRawatArray = DB::table('reg_periksa')
                ->where('no_rkm_medis', $decodedNoRkmMedis)
                ->pluck('no_rawat')
                ->toArray();
            
            // Jika tidak ada no_rawat ditemukan, return empty
            if (empty($noRawatArray)) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'total' => 0,
                    'has_more' => false,
                    'no_rawat_list' => []
                ]);
            }
            
            // Hitung total resep untuk pagination
            $totalResep = ResepObat::whereIn('no_rawat', $noRawatArray)->count();
            
            // Ambil resep berdasarkan array no_rawat dengan pagination
            $resepList = ResepObat::with(['resepDokter.databarang', 'dokter'])
                ->whereIn('no_rawat', $noRawatArray)
                ->orderBy('tgl_peresepan', 'desc')
                ->orderBy('jam_peresepan', 'desc')
                ->skip($offset)
                ->take($limit)
                ->get()
                ->map(function($resep) {
                    return [
                        'no_resep' => $resep->no_resep,
                        'tgl_peresepan' => $resep->tgl_peresepan,
                        'jam_peresepan' => $resep->jam_peresepan,
                        'no_rawat' => $resep->no_rawat,
                        'kd_dokter' => $resep->kd_dokter,
                        'nama_dokter' => $resep->dokter->nm_dokter ?? 'Dokter tidak ditemukan',
                        'status' => $resep->status,
                        'tgl_perawatan' => $resep->tgl_perawatan,
                        'jam' => $resep->jam,
                        'tgl_penyerahan' => $resep->tgl_penyerahan,
                        'jam_penyerahan' => $resep->jam_penyerahan,
                        'detail_obat' => $resep->resepDokter->map(function($detail) {
                            return [
                                'kode_brng' => $detail->kode_brng,
                                'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                                'jml' => $detail->jml,
                                'aturan_pakai' => $detail->aturan_pakai,
                                'satuan' => $detail->databarang->kode_satbesar ?? '',
                                'harga' => $detail->databarang->h_beli ?? 0
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $resepList,
                'total' => $totalResep,
                'current_count' => $resepList->count(),
                'has_more' => ($offset + $limit) < $totalResep,
                'next_offset' => ($offset + $limit) < $totalResep ? $offset + $limit : null,
                'no_rawat_list' => $noRawatArray
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mengambil data resep berdasarkan no_resep
     */
    public function getResep($noResep): JsonResponse
    {
        try {
            $resepObat = ResepObat::with(['resepDokter.databarang', 'dokter'])
                ->where('no_resep', $noResep)
                ->first();

            if (!$resepObat) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            // Tentukan informasi depo (bangsal) berdasarkan jenis perawatan
            $depo = [
                'kd_bangsal' => '',
                'nm_bangsal' => ''
            ];

            try {
                if ($resepObat->status === 'ralan') {
                    // Ambil kd_poli dari reg_periksa untuk no_rawat ini
                    $kdPoli = DB::table('reg_periksa')
                        ->where('no_rawat', $resepObat->no_rawat)
                        ->value('kd_poli');

                    if ($kdPoli) {
                        $kdBangsal = \App\Models\SetDepoRalan::getFirstBangsalByPoli($kdPoli);
                        if ($kdBangsal) {
                            $nmBangsal = \App\Models\Bangsal::where('kd_bangsal', $kdBangsal)->value('nm_bangsal');
                            $depo = [
                                'kd_bangsal' => $kdBangsal,
                                'nm_bangsal' => $nmBangsal ?? ''
                            ];
                        }
                    }
                } else {
                    // ranap: cari bangsal dari kamar perawatan aktif
                    $kdBangsal = DB::table('ranap_gabung')
                        ->join('kamar_inap', 'ranap_gabung.no_rawat', '=', 'kamar_inap.no_rawat')
                        ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                        ->where('ranap_gabung.no_rawat2', $resepObat->no_rawat)
                        ->where('kamar_inap.stts_pulang', '-')
                        ->value('kamar.kd_bangsal');

                    if (!$kdBangsal) {
                        $kdBangsal = \App\Models\SetLokasi::getFirstBangsal();
                    }

                    if ($kdBangsal) {
                        $nmBangsal = \App\Models\Bangsal::where('kd_bangsal', $kdBangsal)->value('nm_bangsal');
                        $depo = [
                            'kd_bangsal' => $kdBangsal,
                            'nm_bangsal' => $nmBangsal ?? ''
                        ];
                    }
                }
            } catch (\Throwable $th) {
                // Abaikan error depo agar endpoint tetap memberikan data dasar resep
            }

            // PPN default 11% mengikuti ketentuan umum
            $ppnRate = 0.11;

            // Default Embalase/Tuslah per item jika ada setting
            $embalasePerObat = 0.0;
            $tuslahPerObat = 0.0;
            try {
                $embalasePerObat = (float) (DB::table('set_embalase')->value('embalase_per_obat') ?? 0);
                $tuslahPerObat = (float) (DB::table('set_embalase')->value('tuslah_per_obat') ?? 0);
            } catch (\Throwable $th) {
                // abaikan jika tabel tidak tersedia
            }

            // Non-racikan items
            $detailItems = $resepObat->resepDokter->map(function($detail) use ($embalasePerObat, $tuslahPerObat) {
                $tarif = (float)($detail->databarang->ralan ?? 0);
                $jumlah = (float)($detail->jml ?? 0);
                $subtotal = round($tarif * $jumlah, 2);
                return [
                    'kode_brng' => $detail->kode_brng,
                    'nama_brng' => $detail->databarang->nama_brng ?? 'Obat tidak ditemukan',
                    'jml' => $jumlah,
                    'aturan_pakai' => $detail->aturan_pakai,
                    'satuan' => $detail->databarang->kode_satbesar ?? '',
                    'harga' => (float)($detail->databarang->h_beli ?? 0),
                    'tarif' => $tarif,
                    'subtotal' => $subtotal,
                    'embalase' => $embalasePerObat,
                    'tuslah' => $tuslahPerObat
                ];
            });

            // Racikan: grup dan detail
            $racikanGroups = [];
            try {
                $groups = DB::table('resep_dokter_racikan')
                    ->join('metode_racik', 'resep_dokter_racikan.kd_racik', '=', 'metode_racik.kd_racik')
                    ->where('resep_dokter_racikan.no_resep', $resepObat->no_resep)
                    ->select(
                        'resep_dokter_racikan.no_racik',
                        'resep_dokter_racikan.nama_racik',
                        'resep_dokter_racikan.kd_racik',
                        'metode_racik.nm_racik as metode',
                        'resep_dokter_racikan.jml_dr',
                        'resep_dokter_racikan.aturan_pakai',
                        'resep_dokter_racikan.keterangan'
                    )
                    ->get();

                foreach ($groups as $grp) {
                    $details = DB::table('resep_dokter_racikan_detail')
                        ->join('databarang', 'resep_dokter_racikan_detail.kode_brng', '=', 'databarang.kode_brng')
                        ->join('jenis', 'databarang.kdjns', '=', 'jenis.kdjns')
                        ->join('kategori_barang', 'databarang.kode_kategori', '=', 'kategori_barang.kode')
                        ->where('resep_dokter_racikan_detail.no_resep', $resepObat->no_resep)
                        ->where('resep_dokter_racikan_detail.no_racik', $grp->no_racik)
                        ->select(
                            'resep_dokter_racikan_detail.kode_brng',
                            'databarang.nama_brng',
                            'resep_dokter_racikan_detail.jml',
                            'resep_dokter_racikan_detail.kandungan',
                            'databarang.kode_satbesar as satuan',
                            'databarang.ralan as tarif',
                            'databarang.h_beli as harga',
                            'databarang.kapasitas'
                        )
                        ->get()
                        ->map(function($d) use ($embalasePerObat, $tuslahPerObat) {
                            $jumlah = (float)($d->jml ?? 0);
                            $tarif = (float)($d->tarif ?? 0);
                            return [
                                'kode_brng' => $d->kode_brng,
                                'nama_brng' => $d->nama_brng ?? 'Obat tidak ditemukan',
                                'jml' => $jumlah,
                                'kandungan' => $d->kandungan,
                                'satuan' => $d->satuan ?? '',
                                'harga' => (float)($d->harga ?? 0),
                                'tarif' => $tarif,
                                'subtotal' => round($tarif * $jumlah, 2),
                                'embalase' => $embalasePerObat,
                                'tuslah' => $tuslahPerObat
                            ];
                        });

                    $racikanGroups[] = [
                        'no_racik' => $grp->no_racik,
                        'nama_racik' => $grp->nama_racik,
                        'kd_racik' => $grp->kd_racik,
                        'metode' => $grp->metode,
                        'jml_dr' => $grp->jml_dr,
                        'aturan_pakai' => $grp->aturan_pakai,
                        'keterangan' => $grp->keterangan,
                        'details' => $details
                    ];
                }
            } catch (\Throwable $th) {
                // abaikan jika tabel racikan tidak tersedia
            }

            // Hitung total keseluruhan
            $subtotalNonRacikan = (float) $detailItems->sum('subtotal');
            $tambahanNonRacikan = (float) $detailItems->sum(function($i) { return ($i['embalase'] ?? 0) + ($i['tuslah'] ?? 0); });
            $subtotalRacikan = 0.0;
            $tambahanRacikan = 0.0;
            foreach ($racikanGroups as $g) {
                $subtotalRacikan += (float) collect($g['details'])->sum('subtotal');
                $tambahanRacikan += (float) collect($g['details'])->sum(function($i) { return ($i['embalase'] ?? 0) + ($i['tuslah'] ?? 0); });
            }

            $subtotal = round($subtotalNonRacikan + $subtotalRacikan, 2);
            $tambahanTotal = round($tambahanNonRacikan + $tambahanRacikan, 2);
            $ppn = round($subtotal * $ppnRate, 2); // PPN hanya atas nilai obat
            $grandTotal = round($subtotal + $tambahanTotal + $ppn, 2);

            return response()->json([
                'success' => true,
                'data' => [
                    'no_resep' => $resepObat->no_resep,
                    'tgl_peresepan' => $resepObat->tgl_peresepan,
                    'jam_peresepan' => $resepObat->jam_peresepan,
                    'no_rawat' => $resepObat->no_rawat,
                    'kd_dokter' => $resepObat->kd_dokter,
                    'nama_dokter' => $resepObat->dokter->nm_dokter ?? 'Dokter tidak ditemukan',
                    'status' => $resepObat->status,
                    'tgl_perawatan' => $resepObat->tgl_perawatan,
                    'jam' => $resepObat->jam,
                    'tgl_penyerahan' => $resepObat->tgl_penyerahan,
                    'jam_penyerahan' => $resepObat->jam_penyerahan,
                    'depo' => $depo,
                    'ppn_rate' => $ppnRate,
                    'embalase_per_obat' => $embalasePerObat,
                    'tuslah_per_obat' => $tuslahPerObat,
                    'subtotal' => $subtotal,
                    'tambahan_total' => $tambahanTotal,
                    'ppn' => $ppn,
                    'total_plus_ppn' => $grandTotal,
                    'detail_obat' => $detailItems,
                    'racikan' => $racikanGroups,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Daftar global resep dengan filter rentang tanggal, status/jenis, dokter, poli, dan pencarian bebas
     * Mengacu pada DlgDaftarPermintaanResep.tampil() (Java) untuk konsistensi kolom.
     *
     * Query params:
     * - start_date (YYYY-MM-DD) required
     * - end_date (YYYY-MM-DD) required
     * - jenis: ralan|ranap (default: ralan)
     * - dokter: string (nm_dokter like)
     * - poli: string (nm_poli like)
     * - q: string (search bebas across no_resep, no_rawat, no_rkm_medis, nm_pasien, nm_dokter, png_jawab)
     * - kd_bangsal: string (opsional; jika disediakan maka join set_depo_ralan dan filter kd_bangsal)
     * - limit: integer (default 20)
     * - page: integer (default 1)
     */
    public function list(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'jenis' => 'nullable|in:ralan,ranap',
                'limit' => 'nullable|integer|min:1|max:100',
                'page' => 'nullable|integer|min:1',
                // Terima variasi label dari UI: "Belum Terlayani", "Sudah Terlayani", dan "Semua"
                'status_perawatan' => 'nullable|in:Belum,Sudah,Belum Terlayani,Sudah Terlayani,Semua',
            ]);

            $jenis = $request->get('jenis', 'ralan');
            $startDate = $request->get('start_date');
            $endDate = $request->get('end_date');
            $limit = (int)($request->get('limit', 20));
            $page = (int)($request->get('page', 1));
            $offset = ($page - 1) * $limit;
            $dokterName = trim((string)$request->get('dokter', ''));
            $poliOrBangsalName = trim((string)$request->get('poli', ''));
            $bangsalName = trim((string)$request->get('bangsal', ''));
            $q = trim((string)$request->get('q', ''));
            $kdBangsal = trim((string)$request->get('kd_bangsal', ''));
            $kdDepo = trim((string)$request->get('kd_depo', ''));
            $statusPerawatanFilter = $request->get('status_perawatan'); // Belum / Sudah / (variasi label)
            if ($statusPerawatanFilter === 'Belum Terlayani') {
                $statusPerawatanFilter = 'Belum';
            } elseif ($statusPerawatanFilter === 'Sudah Terlayani') {
                $statusPerawatanFilter = 'Sudah';
            } elseif ($statusPerawatanFilter === 'Semua') {
                $statusPerawatanFilter = null; // tidak ada filter status
            }

            // Base query
            $query = DB::table('resep_obat')
                ->join('reg_periksa', 'resep_obat.no_rawat', '=', 'reg_periksa.no_rawat')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('dokter', 'resep_obat.kd_dokter', '=', 'dokter.kd_dokter')
                ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                ->where('resep_obat.tgl_peresepan', '<>', '0000-00-00')
                ->where('resep_obat.status', $jenis)
                ->whereBetween('resep_obat.tgl_peresepan', [$startDate, $endDate]);

            if ($jenis === 'ralan') {
                $query->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli');
                if (!empty($kdBangsal)) {
                    // Filter depo aktif untuk ralan
                    $query->join('set_depo_ralan', 'set_depo_ralan.kd_poli', '=', 'reg_periksa.kd_poli')
                          ->where('set_depo_ralan.kd_bangsal', $kdBangsal);
                }
                if ($dokterName !== '') {
                    $query->where('dokter.nm_dokter', 'like', "%$dokterName%");
                }
                $poliFilter = $bangsalName !== '' ? $bangsalName : $poliOrBangsalName; // fallback jika client kirim "poli"
                if ($poliFilter !== '') {
                    $query->where('poliklinik.nm_poli', 'like', "%$poliFilter%");
                }
            } else { // ranap
                // Mengacu pada DlgDaftarPermintaanResep.tampil() untuk ranap
                $query->join('ranap_gabung', 'ranap_gabung.no_rawat2', '=', 'resep_obat.no_rawat')
                      ->join('kamar_inap', 'ranap_gabung.no_rawat', '=', 'kamar_inap.no_rawat')
                      ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                      ->join('bangsal', 'kamar.kd_bangsal', '=', 'bangsal.kd_bangsal')
                      ->where('kamar_inap.stts_pulang', '-');
                if (!empty($kdDepo)) {
                    // Filter DEPOAKTIFOBAT melalui set_depo_ranap
                    $query->join('set_depo_ranap', 'set_depo_ranap.kd_bangsal', '=', 'bangsal.kd_bangsal')
                          ->where('set_depo_ranap.kd_depo', $kdDepo);
                }
                if ($dokterName !== '') {
                    $query->where('dokter.nm_dokter', 'like', "%$dokterName%");
                }
                $bangsalFilter = $bangsalName !== '' ? $bangsalName : $poliOrBangsalName; // dukung param "poli" sebagai bangsal
                if ($bangsalFilter !== '') {
                    $query->where('bangsal.nm_bangsal', 'like', "%$bangsalFilter%");
                }
            }

            // Free text search across multiple columns
            if ($q !== '') {
                $query->where(function($w) use ($q) {
                    $w->where('resep_obat.no_resep', 'like', "%$q%")
                      ->orWhere('resep_obat.no_rawat', 'like', "%$q%")
                      ->orWhere('pasien.no_rkm_medis', 'like', "%$q%")
                      ->orWhere('pasien.nm_pasien', 'like', "%$q%")
                      ->orWhere('dokter.nm_dokter', 'like', "%$q%")
                      ->orWhere('penjab.png_jawab', 'like', "%$q%");
                });
            }

            // Filter status perawatan (Belum/Sudah)
            if ($statusPerawatanFilter === 'Belum') {
                $query->where('resep_obat.tgl_perawatan', '0000-00-00');
            } elseif ($statusPerawatanFilter === 'Sudah') {
                $query->where('resep_obat.tgl_perawatan', '<>', '0000-00-00');
            }

            // Hitung total (distinct no_resep untuk menghindari duplikasi ketika join)
            $total = (clone $query)->distinct()->count('resep_obat.no_resep');

            // Ambil data dengan sorting, group by no_resep
            // Catatan: Kolom nm_poli (ralan) dan nm_bangsal/kd_bangsal (ranap) dipilih secara kondisional
            $selects = [
                'resep_obat.no_resep',
                'resep_obat.tgl_peresepan',
                'resep_obat.jam_peresepan',
                'resep_obat.no_rawat',
                'pasien.no_rkm_medis',
                'pasien.nm_pasien',
                'resep_obat.kd_dokter',
                'dokter.nm_dokter',
                DB::raw("IF(resep_obat.tgl_perawatan='0000-00-00','Belum Terlayani','Sudah Terlayani') as status_perawatan"),
                'penjab.png_jawab',
                DB::raw("IF(resep_obat.tgl_perawatan='0000-00-00','',resep_obat.tgl_perawatan) as tgl_perawatan"),
                DB::raw("IF(resep_obat.jam='00:00:00','',resep_obat.jam) as jam"),
                DB::raw("IF(resep_obat.tgl_penyerahan='0000-00-00','',resep_obat.tgl_penyerahan) as tgl_penyerahan"),
                DB::raw("IF(resep_obat.jam_penyerahan='00:00:00','',resep_obat.jam_penyerahan) as jam_penyerahan"),
            ];

            if ($jenis === 'ralan') {
                // Tambahkan kolom khusus ralan dan placeholder untuk ranap
                $selects[] = DB::raw("IFNULL(poliklinik.nm_poli, '') as nm_poli");
                $selects[] = 'reg_periksa.kd_poli';
                $selects[] = DB::raw("'' as nm_bangsal");
                $selects[] = DB::raw("'' as kd_bangsal");
            } else {
                // Tambahkan placeholder untuk ralan dan kolom khusus ranap
                $selects[] = DB::raw("'' as nm_poli");
                $selects[] = DB::raw("'' as kd_poli");
                $selects[] = DB::raw("IFNULL(bangsal.nm_bangsal, '') as nm_bangsal");
                $selects[] = DB::raw("IFNULL(kamar.kd_bangsal, '') as kd_bangsal");
            }

            $rows = $query
                ->orderBy('resep_obat.tgl_peresepan', 'desc')
                ->orderBy('resep_obat.jam_peresepan', 'desc')
                ->groupBy('resep_obat.no_resep')
                ->skip($offset)
                ->take($limit)
                ->select($selects)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $rows,
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'has_more' => ($offset + $limit) < $total,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update stok obat setelah resep dibuat dengan metode FIFO
     */
    private function updateStokObat($kodeBrng, $jumlah, $kdPoli = null)
    {
        // Dapatkan bangsal yang terkait dengan poli jika ada
        $bangsalList = null;
        if ($kdPoli) {
            $bangsalList = SetDepoRalan::getBangsalByPoli($kdPoli);
        }
        
        // Ambil stok dari gudang dengan urutan FIFO (First In, First Out)
        // Urutkan berdasarkan tanggal expire dan no_batch
        $gudangQuery = Gudangbarang::where('kode_brng', $kodeBrng)
            ->where('stok', '>', 0);
            
        // Filter berdasarkan bangsal jika ada
        if ($bangsalList && !empty($bangsalList)) {
            $gudangQuery->whereIn('kd_bangsal', $bangsalList);
        }
        
        $gudangList = $gudangQuery->orderBy('no_batch')
            ->orderBy('no_faktur')
            ->get();

        if ($gudangList->isEmpty()) {
            throw new \Exception("Tidak ada stok tersedia untuk obat {$kodeBrng}");
        }

        $sisaJumlah = $jumlah;
        $updatedBatches = [];

        foreach ($gudangList as $gudang) {
            if ($sisaJumlah <= 0) break;

            $stokSebelum = $gudang->stok;
            
            if ($gudang->stok >= $sisaJumlah) {
                // Stok di gudang ini cukup
                $gudang->stok -= $sisaJumlah;
                $gudang->save();
                
                $updatedBatches[] = [
                    'kd_bangsal' => $gudang->kd_bangsal,
                    'no_batch' => $gudang->no_batch,
                    'no_faktur' => $gudang->no_faktur,
                    'stok_sebelum' => $stokSebelum,
                    'stok_diambil' => $sisaJumlah,
                    'stok_sesudah' => $gudang->stok
                ];
                
                $sisaJumlah = 0;
            } else {
                // Stok di gudang ini tidak cukup, ambil semua
                $stokDiambil = $gudang->stok;
                $sisaJumlah -= $gudang->stok;
                $gudang->stok = 0;
                $gudang->save();
                
                $updatedBatches[] = [
                    'kd_bangsal' => $gudang->kd_bangsal,
                    'no_batch' => $gudang->no_batch,
                    'no_faktur' => $gudang->no_faktur,
                    'stok_sebelum' => $stokSebelum,
                    'stok_diambil' => $stokDiambil,
                    'stok_sesudah' => 0
                ];
            }
        }

        if ($sisaJumlah > 0) {
            // Dapatkan nama obat untuk error message yang lebih informatif
            $databarang = Databarang::where('kode_brng', $kodeBrng)->first();
            $namaObat = $databarang ? $databarang->nama_brng : $kodeBrng;
            throw new \Exception("Stok obat {$namaObat} tidak mencukupi. Kekurangan: {$sisaJumlah}");
        }

        // Log perubahan stok untuk audit trail
         Log::info('Stok obat diupdate', [
             'kode_brng' => $kodeBrng,
             'jumlah_diminta' => $jumlah,
             'batches_updated' => $updatedBatches
         ]);

        return $updatedBatches;
    }

    /**
     * Mendapatkan informasi stok obat untuk validasi berdasarkan poli
     */
    public function getStokInfo(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'kode_brng' => 'required|string',
                'kd_poli' => 'nullable|string'
            ]);

            $databarang = Databarang::where('kode_brng', $request->kode_brng)->first();
            
            if (!$databarang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Obat tidak ditemukan'
                ], 404);
            }

            // Jika ada kd_poli, hitung stok berdasarkan bangsal yang terkait
            if ($request->kd_poli) {
                $bangsalList = SetDepoRalan::getBangsalByPoli($request->kd_poli);
                
                $totalStok = 0;
                $stokPerBangsal = [];
                
                foreach ($bangsalList as $kdBangsal) {
                    $stokBangsal = Gudangbarang::getTotalStokByBarangBangsal($request->kode_brng, $kdBangsal);
                    $totalStok += $stokBangsal;
                    $stokPerBangsal[$kdBangsal] = $stokBangsal;
                }
                
                // Dapatkan detail batch untuk bangsal yang terkait
                $batchDetail = Gudangbarang::where('kode_brng', $request->kode_brng)
                    ->whereIn('kd_bangsal', $bangsalList)
                    ->where('stok', '>', 0)
                    ->select('kd_bangsal', 'stok', 'no_batch', 'no_faktur')
                    ->orderBy('no_batch')
                    ->get();
            } else {
                // Jika tidak ada kd_poli, gunakan semua bangsal
                $totalStok = $databarang->getTotalStok();
                $stokPerBangsal = $databarang->getStokDetailPerBangsal();
                
                $batchDetail = Gudangbarang::where('kode_brng', $request->kode_brng)
                    ->where('stok', '>', 0)
                    ->select('kd_bangsal', 'stok', 'no_batch', 'no_faktur')
                    ->orderBy('no_batch')
                    ->get();
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'kode_brng' => $databarang->kode_brng,
                    'nama_brng' => $databarang->nama_brng,
                    'total_stok' => $totalStok,
                    'stok_per_bangsal' => $stokPerBangsal,
                    'batch_detail' => $batchDetail,
                    'harga_ralan' => $databarang->ralan,
                    'satuan' => $databarang->kode_satbesar,
                    'status' => $databarang->status
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Menghapus resep berdasarkan nomor resep
     */
    public function destroy($noResep): JsonResponse
    {
        try {
            DB::beginTransaction();

            // Cari resep yang akan dihapus
            $resep = ResepObat::where('no_resep', $noResep)->first();

            if (!$resep) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resep tidak ditemukan'
                ], 404);
            }

            // Hapus detail resep terlebih dahulu
            ResepDokter::where('no_resep', $noResep)->delete();

            // Hapus resep utama
            $resep->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Resep berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting resep: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menghapus resep: ' . $e->getMessage()
            ], 500);
        }
    }
}
