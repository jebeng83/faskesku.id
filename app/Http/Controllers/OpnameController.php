<?php

namespace App\Http\Controllers;

use App\Models\Bangsal;
use App\Models\DataBarang;
use App\Models\Opname;
use App\Models\RawatJalan\Gudangbarang as GudangBarang;
use App\Models\RiwayatTransaksiGudangBarang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class OpnameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('farmasi.stok-opname');
    }

    /**
     * Get data lokasi/bangsal untuk dropdown
     */
    public function getLokasi()
    {
        try {
            $lokasi = Bangsal::select('kd_bangsal', 'nm_bangsal')
                ->where('status', '1')
                ->orderBy('nm_bangsal')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $lokasi,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data lokasi: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get data barang berdasarkan lokasi untuk opname
     */
    public function getDataBarang(Request $request)
    {
        try {
            $kdBangsal = $request->input('kd_bangsal');
            $search = $request->input('search');
            $aggregate = filter_var($request->input('aggregate', false), FILTER_VALIDATE_BOOLEAN);

            if (! $kdBangsal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode bangsal harus diisi',
                ], 400);
            }

            $query = DB::connection(config('database.default'))
                ->table('gudangbarang')
                ->join('databarang', 'gudangbarang.kode_brng', '=', 'databarang.kode_brng')
                ->join('jenis', 'databarang.kdjns', '=', 'jenis.kdjns')
                ->join('kategori_barang', 'databarang.kode_kategori', '=', 'kategori_barang.kode')
                ->join('golongan_barang', 'databarang.kode_golongan', '=', 'golongan_barang.kode')
                ->leftJoin('kodesatuan', 'databarang.kode_sat', '=', 'kodesatuan.kode_sat')
                ->where('gudangbarang.kd_bangsal', $kdBangsal)
                ->where('gudangbarang.stok', '>', 0);

            if ($aggregate) {
                $query->select(
                    'gudangbarang.kode_brng',
                    'databarang.nama_brng',
                    'jenis.nama as jenis',
                    'kodesatuan.satuan',
                    DB::raw('SUM(gudangbarang.stok) as stok'),
                    'databarang.h_beli as harga'
                )->groupBy('gudangbarang.kode_brng', 'databarang.nama_brng', 'jenis.nama', 'kodesatuan.satuan', 'databarang.h_beli');
            } else {
                $query->select(
                    'gudangbarang.kode_brng',
                    'databarang.nama_brng',
                    'jenis.nama as jenis',
                    'kodesatuan.satuan',
                    'gudangbarang.stok',
                    'databarang.h_beli as harga',
                    'gudangbarang.no_batch',
                    'gudangbarang.no_faktur'
                );
            }

            // Tambahkan filter pencarian jika ada
            if ($search && strlen($search) >= 2) {
                $query->where(function ($q) use ($search) {
                    $q->where('databarang.nama_brng', 'LIKE', '%'.$search.'%')
                        ->orWhere('gudangbarang.kode_brng', 'LIKE', '%'.$search.'%');
                });
            }

            $dataBarang = $query->orderBy('databarang.nama_brng')
                ->limit(50) // Batasi hasil untuk performa
                ->get();

            return response()->json([
                'success' => true,
                'data' => $dataBarang,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data barang: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Log request data untuk debugging
            Log::info('Opname store method called');
            Log::info('Request data: '.json_encode($request->all()));

            // Validasi input
            $validator = Validator::make($request->all(), [
                'tanggal' => 'required|date',
                'kd_bangsal' => 'required|string',
                'keterangan' => 'nullable|string',
                'items' => 'required|array|min:1',
                'items.*.kode_brng' => 'required|string',
                'items.*.real' => 'required|numeric|min:0',
                'items.*.h_beli' => 'required|numeric|min:0',
                'items.*.no_batch' => 'nullable|string',
                'items.*.no_faktur' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $conn = DB::connection(config('database.default'));
            $conn->beginTransaction();

            foreach ($request->items as $item) {
                // Debug: Log each item data
                Log::info('Processing item: '.json_encode($item));

                // Normalisasi batch/faktur ke string kosong untuk kolom NOT NULL
                $noBatch = isset($item['no_batch']) && $item['no_batch'] !== null ? (string) $item['no_batch'] : '';
                $noFaktur = isset($item['no_faktur']) && $item['no_faktur'] !== null ? (string) $item['no_faktur'] : '';

                // Ambil stok sistem dari gudangbarang dengan memperhatikan batch/faktur (null vs '')
                $gudangBarang = GudangBarang::where('kode_brng', $item['kode_brng'])
                    ->where('kd_bangsal', $request->kd_bangsal)
                    ->where(function ($q) use ($noBatch) {
                        if ($noBatch === '') {
                            $q->whereNull('no_batch')->orWhere('no_batch', '');
                        } else {
                            $q->where('no_batch', $noBatch);
                        }
                    })
                    ->where(function ($q) use ($noFaktur) {
                        if ($noFaktur === '') {
                            $q->whereNull('no_faktur')->orWhere('no_faktur', '');
                        } else {
                            $q->where('no_faktur', $noFaktur);
                        }
                    })
                    ->first();

                $stokSistem = $gudangBarang ? $gudangBarang->stok : 0;
                $real = $item['real'];
                $selisih = $real - $stokSistem;
                $lebih = $selisih > 0 ? $selisih : 0;
                $hilang = $selisih < 0 ? abs($selisih) : 0;
                $nominalHilang = $hilang * $item['h_beli'];
                $nominalLebih = $lebih * $item['h_beli'];

                // Prepare data for insert
                $opnameData = [
                    'kode_brng' => $item['kode_brng'],
                    'h_beli' => $item['h_beli'],
                    'tanggal' => $request->tanggal,
                    'stok' => $stokSistem,
                    'real' => $real,
                    'selisih' => $selisih,
                    'lebih' => $lebih,
                    'nomihilang' => $nominalHilang,
                    'nomilebih' => $nominalLebih,
                    'keterangan' => $request->keterangan,
                    'kd_bangsal' => $request->kd_bangsal,
                    'no_batch' => $noBatch,
                    'no_faktur' => $noFaktur,
                ];

                // Debug: Log data before insert
                Log::info('Data to insert: '.json_encode($opnameData));

                // Insert or update data opname
                Opname::updateOrCreate(
                    [
                        'kode_brng' => $item['kode_brng'],
                        'tanggal' => $request->tanggal,
                        'kd_bangsal' => $request->kd_bangsal,
                        'no_batch' => $noBatch,
                        'no_faktur' => $noFaktur,
                    ],
                    [
                        'h_beli' => $item['h_beli'],
                        'stok' => $stokSistem,
                        'real' => $real,
                        'selisih' => $selisih,
                        'lebih' => $lebih,
                        'nomihilang' => $nominalHilang,
                        'nomilebih' => $nominalLebih,
                        'keterangan' => $request->keterangan,
                    ]
                );

                // Update atau insert stok di gudangbarang sesuai hasil opname
                $gudangBarangUpdated = GudangBarang::updateOrCreate(
                    [
                        'kode_brng' => $item['kode_brng'],
                        'kd_bangsal' => $request->kd_bangsal,
                        'no_batch' => $noBatch,
                        'no_faktur' => $noFaktur,
                    ],
                    [
                        'stok' => $real,
                    ]
                );

                // Catat audit trail
                if ($gudangBarang && $gudangBarang->exists) {
                    // Update existing record
                    RiwayatTransaksiGudangBarang::catatUpdate(
                        $item['kode_brng'],
                        $request->kd_bangsal,
                        $noBatch ?? '',
                        $noFaktur ?? '',
                        $stokSistem,
                        $real,
                        'opname',
                        'Stok opname: '.($request->keterangan ?? 'Opname tanggal '.$request->tanggal),
                        $gudangBarang->toArray(),
                        $gudangBarangUpdated->toArray()
                    );
                } else {
                    // Insert new record
                    RiwayatTransaksiGudangBarang::catatInsert(
                        $item['kode_brng'],
                        $request->kd_bangsal,
                        $noBatch ?? '',
                        $noFaktur ?? '',
                        $real,
                        'opname',
                        'Stok opname: '.($request->keterangan ?? 'Opname tanggal '.$request->tanggal),
                        $gudangBarangUpdated->toArray()
                    );
                }

                Log::info('Updated gudangbarang stok for: '.$item['kode_brng'].' to: '.$real);
                Log::info('Audit trail recorded for: '.$item['kode_brng']);

                try {
                    $inserted = $conn->table('riwayat_barang_medis')->insert([
                        'kode_brng' => $item['kode_brng'],
                        'stok_awal' => (double) $stokSistem,
                        'masuk' => (double) $real,
                        'keluar' => 0,
                        'stok_akhir' => (double) $real,
                        'posisi' => 'Opname',
                        'tanggal' => $request->tanggal,
                        'jam' => now()->format('H:i:s'),
                        'petugas' => $request->user()?->name ?? '',
                        'kd_bangsal' => $request->kd_bangsal,
                        'status' => 'Simpan',
                        'no_batch' => $noBatch,
                        'no_faktur' => $noFaktur,
                        'keterangan' => $request->keterangan ?? '',
                    ]);
                    if ($inserted) {
                        Log::info('Riwayat opname inserted for '.$item['kode_brng'].' on '.$request->tanggal.' kd_bangsal '.$request->kd_bangsal);
                    } else {
                        Log::warning('Riwayat opname insert returned false for '.$item['kode_brng'].' on '.$request->tanggal);
                    }
                } catch (\Throwable $t) {
                    Log::error('Failed inserting riwayat opname: '.$t->getMessage());
                    throw $t;
                }
            }

            $conn->commit();

            return response()->json([
                'success' => true,
                'message' => 'Data stok opname berhasil disimpan',
            ]);
        } catch (\Exception $e) {
            DB::connection(config('database.default'))->rollback();
            Log::error('Error saving opname: '.$e->getMessage());
            Log::error('Stack trace: '.$e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data stok opname: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get data opname dengan query yang diberikan
     */
    public function getOpnameData(Request $request)
    {
        try {
            $query = DB::connection(config('database.default'))
                ->table('opname')
                ->join('databarang', 'opname.kode_brng', '=', 'databarang.kode_brng')
                ->join('bangsal', 'opname.kd_bangsal', '=', 'bangsal.kd_bangsal')
                ->join('jenis', 'databarang.kdjns', '=', 'jenis.kdjns')
                ->join('kategori_barang', 'databarang.kode_kategori', '=', 'kategori_barang.kode')
                ->join('golongan_barang', 'databarang.kode_golongan', '=', 'golongan_barang.kode')
                ->select(
                    'opname.kode_brng',
                    'databarang.nama_brng',
                    'opname.h_beli',
                    'databarang.kode_sat',
                    'opname.tanggal',
                    'opname.stok',
                    'opname.real',
                    'opname.selisih',
                    'opname.lebih',
                    DB::raw('(opname.real * opname.h_beli) as totalreal'),
                    'opname.nomihilang',
                    'opname.nomilebih',
                    'opname.keterangan',
                    'bangsal.kd_bangsal',
                    'bangsal.nm_bangsal',
                    'opname.no_batch',
                    'opname.no_faktur'
                );

            // Filter berdasarkan parameter
            if ($request->has('tanggal_dari') && $request->has('tanggal_sampai')) {
                $query->whereBetween('opname.tanggal', [$request->tanggal_dari, $request->tanggal_sampai]);
            }

            if ($request->has('kd_bangsal') && $request->kd_bangsal != '') {
                $query->where('opname.kd_bangsal', $request->kd_bangsal);
            }

            $data = $query->orderBy('opname.tanggal', 'desc')
                ->orderBy('databarang.nama_brng')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data opname: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Search data opname berdasarkan join opname.kode_brng dengan databarang.kode_brng
     * Menampilkan nama_brng berdasarkan kd_bangsal
     */
    public function searchOpnameData(Request $request)
    {
        try {
            $kdBangsal = $request->input('kd_bangsal');
            $search = $request->input('search');

            if (! $kdBangsal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode bangsal harus diisi',
                ], 400);
            }

            $query = DB::connection(config('database.default'))
                ->table('opname')
                ->join('databarang', 'opname.kode_brng', '=', 'databarang.kode_brng')
                ->join('bangsal', 'opname.kd_bangsal', '=', 'bangsal.kd_bangsal')
                ->leftJoin('jenis', 'databarang.kdjns', '=', 'jenis.kdjns')
                ->leftJoin('kodesatuan', 'databarang.kode_sat', '=', 'kodesatuan.kode_sat')
                ->select(
                    'opname.kode_brng',
                    'databarang.nama_brng',
                    'jenis.nama as jenis',
                    'kodesatuan.satuan',
                    'opname.h_beli as harga',
                    'opname.tanggal',
                    'opname.stok',
                    'opname.real',
                    'opname.selisih',
                    'opname.lebih',
                    'opname.nomihilang',
                    'opname.nomilebih',
                    'opname.keterangan',
                    'opname.kd_bangsal',
                    'bangsal.nm_bangsal',
                    'opname.no_batch',
                    'opname.no_faktur'
                )
                ->where('opname.kd_bangsal', $kdBangsal);

            // Tambahkan filter pencarian jika ada
            if ($search && strlen($search) >= 2) {
                $query->where(function ($q) use ($search) {
                    $q->where('databarang.nama_brng', 'LIKE', '%'.$search.'%')
                        ->orWhere('opname.kode_brng', 'LIKE', '%'.$search.'%');
                });
            }

            $data = $query->orderBy('opname.tanggal', 'desc')
                ->orderBy('databarang.nama_brng')
                ->limit(50)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mencari data opname: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Batch delete data opname berdasarkan kombinasi kunci
     * Required fields per item: kd_bangsal, tanggal, no_batch, no_faktur, kode_brng
     */
    public function destroy(Request $request)
    {
        try {
            $items = $request->input('items');
            if (! is_array($items) || count($items) === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Daftar item yang akan dihapus kosong',
                ], 422);
            }

            // Validasi setiap item
            foreach ($items as $i => $item) {
                if (! isset($item['kd_bangsal'], $item['tanggal'], $item['kode_brng'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Item ke-'.($i + 1).' tidak valid: kd_bangsal, tanggal, dan kode_brng wajib diisi',
                    ], 422);
                }
            }

            DB::connection(config('database.default'))->beginTransaction();

            $deleted = 0;
            foreach ($items as $item) {
                $kdBangsal = $item['kd_bangsal'];
                $tanggal = $item['tanggal'];
                $kodeBrng = $item['kode_brng'];
                $noBatch = $item['no_batch'] ?? '';
                $noFaktur = $item['no_faktur'] ?? '';

                $query = DB::connection(config('database.default'))
                    ->table('opname')
                    ->where('kd_bangsal', $kdBangsal)
                    ->whereDate('tanggal', $tanggal)
                    ->where('kode_brng', $kodeBrng);

                // Match no_batch (handle '', null)
                $query->where(function ($q) use ($noBatch) {
                    if ($noBatch === '' || $noBatch === null) {
                        $q->whereNull('no_batch')->orWhere('no_batch', '');
                    } else {
                        $q->where('no_batch', $noBatch);
                    }
                });

                // Match no_faktur (handle '', null)
                $query->where(function ($q) use ($noFaktur) {
                    if ($noFaktur === '' || $noFaktur === null) {
                        $q->whereNull('no_faktur')->orWhere('no_faktur', '');
                    } else {
                        $q->where('no_faktur', $noFaktur);
                    }
                });

                $count = $query->delete();

                $deleted += $count;
            }

            DB::connection(config('database.default'))->commit();

            return response()->json([
                'success' => true,
                'message' => 'Berhasil menghapus data opname',
                'deleted_count' => $deleted,
            ]);
        } catch (\Exception $e) {
            DB::connection(config('database.default'))->rollback();

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data opname: '.$e->getMessage(),
            ], 500);
        }
    }
}
