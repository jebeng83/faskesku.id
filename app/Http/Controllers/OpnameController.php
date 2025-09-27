<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Opname;
use App\Models\GudangBarang;
use App\Models\DataBarang;
use App\Models\Bangsal;
use App\Models\RiwayatTransaksiGudangBarang;
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
                'data' => $lokasi
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data lokasi: ' . $e->getMessage()
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
            
            if (!$kdBangsal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode bangsal harus diisi'
                ], 400);
            }

            // Query untuk mengambil data barang di lokasi tertentu
            $query = DB::connection('fufufafa')
                ->table('gudangbarang')
                ->join('databarang', 'gudangbarang.kode_brng', '=', 'databarang.kode_brng')
                ->join('jenis', 'databarang.kdjns', '=', 'jenis.kdjns')
                ->join('kategori_barang', 'databarang.kode_kategori', '=', 'kategori_barang.kode')
                ->join('golongan_barang', 'databarang.kode_golongan', '=', 'golongan_barang.kode')
                ->leftJoin('kodesatuan', 'databarang.kode_sat', '=', 'kodesatuan.kode_sat')
                ->select(
                    'gudangbarang.kode_brng',
                    'databarang.nama_brng',
                    'jenis.nama as jenis',
                    'kodesatuan.satuan',
                    'gudangbarang.stok',
                    'databarang.h_beli as harga',
                    'gudangbarang.no_batch',
                    'gudangbarang.no_faktur'
                )
                ->where('gudangbarang.kd_bangsal', $kdBangsal)
                ->where('gudangbarang.stok', '>', 0);

            // Tambahkan filter pencarian jika ada
            if ($search && strlen($search) >= 2) {
                $query->where(function($q) use ($search) {
                    $q->where('databarang.nama_brng', 'LIKE', '%' . $search . '%')
                      ->orWhere('gudangbarang.kode_brng', 'LIKE', '%' . $search . '%');
                });
            }

            $dataBarang = $query->orderBy('databarang.nama_brng')
                ->limit(50) // Batasi hasil untuk performa
                ->get();

            return response()->json([
                'success' => true,
                'data' => $dataBarang
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data barang: ' . $e->getMessage()
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
            Log::info('Request data: ' . json_encode($request->all()));
            
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
                'items.*.no_faktur' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::connection('fufufafa')->beginTransaction();

            foreach ($request->items as $item) {
                // Debug: Log each item data
                Log::info('Processing item: ' . json_encode($item));
                
                // Ambil stok sistem dari gudangbarang
                $gudangBarang = GudangBarang::where('kode_brng', $item['kode_brng'])
                    ->where('kd_bangsal', $request->kd_bangsal)
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
                    'no_batch' => $item['no_batch'] ?? '',
                    'no_faktur' => $item['no_faktur'] ?? ''
                ];
                
                // Debug: Log data before insert
                Log::info('Data to insert: ' . json_encode($opnameData));
                
                // Insert or update data opname
                Opname::updateOrCreate(
                    [
                        'kode_brng' => $item['kode_brng'],
                        'tanggal' => $request->tanggal,
                        'kd_bangsal' => $request->kd_bangsal,
                        'no_batch' => $item['no_batch'] ?? '',
                        'no_faktur' => $item['no_faktur'] ?? ''
                    ],
                    [
                        'h_beli' => $item['h_beli'],
                        'stok' => $stokSistem,
                        'real' => $real,
                        'selisih' => $selisih,
                        'lebih' => $lebih,
                        'nomihilang' => $nominalHilang,
                        'nomilebih' => $nominalLebih,
                        'keterangan' => $request->keterangan
                    ]
                );

                // Update atau insert stok di gudangbarang sesuai hasil opname
                $gudangBarangUpdated = GudangBarang::updateOrCreate(
                    [
                        'kode_brng' => $item['kode_brng'],
                        'kd_bangsal' => $request->kd_bangsal,
                        'no_batch' => $item['no_batch'] ?? '',
                        'no_faktur' => $item['no_faktur'] ?? ''
                    ],
                    [
                        'stok' => $real
                    ]
                );
                
                // Catat audit trail
                if ($gudangBarang && $gudangBarang->exists) {
                    // Update existing record
                    RiwayatTransaksiGudangBarang::catatUpdate(
                        $item['kode_brng'],
                        $request->kd_bangsal,
                        $item['no_batch'] ?? '',
                        $item['no_faktur'] ?? '',
                        $stokSistem,
                        $real,
                        'opname',
                        'Stok opname: ' . ($request->keterangan ?? 'Opname tanggal ' . $request->tanggal),
                        $gudangBarang->toArray(),
                        $gudangBarangUpdated->toArray()
                    );
                } else {
                    // Insert new record
                    RiwayatTransaksiGudangBarang::catatInsert(
                        $item['kode_brng'],
                        $request->kd_bangsal,
                        $item['no_batch'] ?? '',
                        $item['no_faktur'] ?? '',
                        $real,
                        'opname',
                        'Stok opname: ' . ($request->keterangan ?? 'Opname tanggal ' . $request->tanggal),
                        $gudangBarangUpdated->toArray()
                    );
                }
                
                Log::info('Updated gudangbarang stok for: ' . $item['kode_brng'] . ' to: ' . $real);
                Log::info('Audit trail recorded for: ' . $item['kode_brng']);
            }

            DB::connection('fufufafa')->commit();

            return response()->json([
                'success' => true,
                'message' => 'Data stok opname berhasil disimpan'
            ]);
        } catch (\Exception $e) {
            DB::connection('fufufafa')->rollback();
            Log::error('Error saving opname: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan data stok opname: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get data opname dengan query yang diberikan
     */
    public function getOpnameData(Request $request)
    {
        try {
            $query = DB::connection('fufufafa')
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
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data opname: ' . $e->getMessage()
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
            
            if (!$kdBangsal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kode bangsal harus diisi'
                ], 400);
            }

            $query = DB::connection('fufufafa')
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
                    'bangsal.nm_bangsal',
                    'opname.no_batch',
                    'opname.no_faktur'
                )
                ->where('opname.kd_bangsal', $kdBangsal);

            // Tambahkan filter pencarian jika ada
            if ($search && strlen($search) >= 2) {
                $query->where(function($q) use ($search) {
                    $q->where('databarang.nama_brng', 'LIKE', '%' . $search . '%')
                      ->orWhere('opname.kode_brng', 'LIKE', '%' . $search . '%');
                });
            }

            $data = $query->orderBy('opname.tanggal', 'desc')
                ->orderBy('databarang.nama_brng')
                ->limit(50)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mencari data opname: ' . $e->getMessage()
            ], 500);
        }
    }
}