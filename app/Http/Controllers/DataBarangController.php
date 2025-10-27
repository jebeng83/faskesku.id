<?php

namespace App\Http\Controllers;

use App\Models\DataBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class DataBarangController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DataBarang::query()
            ->leftJoin('detailbeli as db', function($join) {
                $join->on('databarang.kode_brng', '=', 'db.kode_brng')
                     ->whereRaw('db.created_at = (SELECT MAX(created_at) FROM detailbeli WHERE detailbeli.kode_brng = databarang.kode_brng)');
            })
            ->select('databarang.*', 'db.created_at');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Pagination
        $dataBarang = $query->orderBy('databarang.kode_brng', 'desc')
                           ->paginate(10)
                           ->withQueryString();

        return Inertia::render('farmasi/dataobat', [
            'dataBarang' => $dataBarang,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_brng' => 'required|string|max:15|unique:databarang,kode_brng',
            'nama_brng' => 'required|string|max:80',
            'kode_sat' => 'required|string|max:4',
            'kode_satbesar' => 'nullable|string|max:4',
            'letak_barang' => 'nullable|string|max:50',
            'dasar' => 'nullable|string|max:100',
            'h_beli' => 'nullable|numeric|min:0',
            'ralan' => 'nullable|numeric|min:0',
            'kelas1' => 'nullable|numeric|min:0',
            'kelas2' => 'nullable|numeric|min:0',
            'kelas3' => 'nullable|numeric|min:0',
            'utama' => 'nullable|numeric|min:0',
            'vip' => 'nullable|numeric|min:0',
            'vvip' => 'nullable|numeric|min:0',
            'beliluar' => 'nullable|numeric|min:0',
            'jualbebas' => 'nullable|numeric|min:0',
            'karyawan' => 'nullable|numeric|min:0',
            'stokminimal' => 'nullable|integer|min:0',
            'kdjns' => 'nullable|string|max:4',
            'kapasitas' => 'nullable|integer|min:0',
            'expire' => 'nullable|date',
            'status' => 'nullable|string|max:1',
            'kode_industri' => 'nullable|string|max:5',
            'kode_kategori' => 'nullable|string|max:4',
            'kode_golongan' => 'nullable|string|max:4',
            'isi' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // Set default values
        $data['status'] = $data['status'] ?? '1';
        $data['stokminimal'] = $data['stokminimal'] ?? 0;
        $data['kapasitas'] = $data['kapasitas'] ?? 0;

        // Gunakan DB::table untuk menghindari masalah timestamps
        DB::table('databarang')->insert($data);

        return response()->json([
            'success' => true,
            'message' => 'Data obat berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($kode_brng)
    {
        $dataBarang = DataBarang::findOrFail($kode_brng);
        
        return response()->json([
            'success' => true,
            'data' => $dataBarang
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $kode_brng)
    {
        $dataBarang = DataBarang::findOrFail($kode_brng);

        $validator = Validator::make($request->all(), [
            'nama_brng' => 'required|string|max:80',
            'kode_sat' => 'required|string|max:4',
            'kode_satbesar' => 'nullable|string|max:4',
            'letak_barang' => 'nullable|string|max:50',
            'dasar' => 'nullable|string|max:100',
            'h_beli' => 'nullable|numeric|min:0',
            'ralan' => 'nullable|numeric|min:0',
            'kelas1' => 'nullable|numeric|min:0',
            'kelas2' => 'nullable|numeric|min:0',
            'kelas3' => 'nullable|numeric|min:0',
            'utama' => 'nullable|numeric|min:0',
            'vip' => 'nullable|numeric|min:0',
            'vvip' => 'nullable|numeric|min:0',
            'beliluar' => 'nullable|numeric|min:0',
            'jualbebas' => 'nullable|numeric|min:0',
            'karyawan' => 'nullable|numeric|min:0',
            'stokminimal' => 'nullable|integer|min:0',
            'kdjns' => 'nullable|string|max:4',
            'kapasitas' => 'nullable|integer|min:0',
            'expire' => 'nullable|date',
            'status' => 'nullable|string|max:1',
            'kode_industri' => 'nullable|string|max:5',
            'kode_kategori' => 'nullable|string|max:4',
            'kode_golongan' => 'nullable|string|max:4',
            'isi' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // Set default values
        $data['status'] = $data['status'] ?? '1';
        $data['stokminimal'] = $data['stokminimal'] ?? 0;
        $data['kapasitas'] = $data['kapasitas'] ?? 0;

        // Gunakan DB::table untuk menghindari masalah timestamps
        DB::table('databarang')->where('kode_brng', $kode_brng)->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Data obat berhasil diperbarui'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($kode_brng)
    {
        $dataBarang = DataBarang::findOrFail($kode_brng);
        $dataBarang->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data obat berhasil dihapus'
        ]);
    }
    
    /**
     * Get dropdown data for form selects
     */
    public function getDropdownData()
    {
        try {
            // Ambil data kodesatuan dari database
            $kodesatuan = DB::connection('fufufafa')
                ->table('kodesatuan')
                ->select('kode_sat', 'satuan')
                ->get()
                ->toArray();
            
            // Ambil data jenis langsung dari database tanpa join
            $jenis = DB::connection('fufufafa')
                ->table('jenis')
                ->select('jenis.kdjns', 'jenis.nama')
                ->distinct()
                ->get()
                ->toArray();
            
            // Ambil data industrifarmasi dari database
            $industrifarmasi = DB::connection('fufufafa')
                ->table('industrifarmasi')
                ->select('kode_industri', 'nama_industri')
                ->get()
                ->toArray();
            
            // Ambil data kategori_barang dari database
            $kategori_barang = DB::connection('fufufafa')
                ->table('kategori_barang')
                ->select('kode', 'nama')
                ->get()
                ->toArray();
            
            // Ambil data golongan_barang dari database
            $golongan_barang = DB::connection('fufufafa')
                ->table('golongan_barang')
                ->select('kode', 'nama')
                ->get()
                ->toArray();
            
            return response()->json([
                'kodesatuan' => $kodesatuan,
                'jenis' => $jenis,
                'industrifarmasi' => $industrifarmasi,
                'kategori_barang' => $kategori_barang,
                'golongan_barang' => $golongan_barang
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update harga databarang dari pembelian
     * Update harga dasar dan harga beli terbaru
     */
    public function updateHarga(Request $request, $kode_brng)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'kode_brng' => 'required|string',
                'dasar' => 'required|numeric|min:0',
                'h_beli' => 'required|numeric|min:0'
            ]);

            // Cek apakah data barang ada
            $dataBarang = DB::connection('fufufafa')
                ->table('databarang')
                ->where('kode_brng', $kode_brng)
                ->first();

            if (!$dataBarang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data barang tidak ditemukan'
                ], 404);
            }

            // Update databarang
            DB::connection('fufufafa')
                ->table('databarang')
                ->where('kode_brng', $kode_brng)
                ->update([
                    'dasar' => $validated['dasar'],
                    'h_beli' => $validated['h_beli']
                ]);

            // Update created_at di detailbeli untuk tracking perubahan h_beli terbaru
            DB::connection('fufufafa')
                ->table('detailbeli')
                ->where('kode_brng', $kode_brng)
                ->where('h_beli', $validated['h_beli'])
                ->update([
                    'created_at' => now()
                ]);

            return response()->json([
                'success' => true,
                'message' => 'Harga databarang berhasil diupdate',
                'data' => [
                    'kode_brng' => $kode_brng,
                    'dasar' => $validated['dasar'],
                    'h_beli' => $validated['h_beli']
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate harga: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateHargaJual(Request $request, $kode_brng)
    {
        try {
            // Cek apakah frontend mengirim harga jual lengkap (mode lama) atau hanya base harga (mode baru)
            $sendManualPrices = $request->has(['ralan','kelas1','kelas2','kelas3','utama','vip','vvip','beliluar','jualbebas','karyawan']);

            // Ambil data barang terlebih dahulu (untuk kdjns dan fallback dasar/h_beli)
            $dataBarang = DB::connection('fufufafa')
                ->table('databarang')
                ->where('kode_brng', $kode_brng)
                ->first();

            if (!$dataBarang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data barang tidak ditemukan'
                ], 404);
            }

            if ($sendManualPrices) {
                // Mode lama: validasi angka harga jual yang sudah dihitung oleh frontend
                $validated = $request->validate([
                    'kode_brng' => 'required|string',
                    'h_beli' => 'required|numeric|min:0',
                    'ralan' => 'required|numeric|min:0',
                    'kelas1' => 'required|numeric|min:0',
                    'kelas2' => 'required|numeric|min:0',
                    'kelas3' => 'required|numeric|min:0',
                    'utama' => 'required|numeric|min:0',
                    'vip' => 'required|numeric|min:0',
                    'vvip' => 'required|numeric|min:0',
                    'beliluar' => 'required|numeric|min:0',
                    'jualbebas' => 'required|numeric|min:0',
                    'karyawan' => 'required|numeric|min:0'
                ]);

                DB::connection('fufufafa')
                    ->table('databarang')
                    ->where('kode_brng', $kode_brng)
                    ->update([
                        'h_beli' => $validated['h_beli'],
                        'ralan' => $validated['ralan'],
                        'kelas1' => $validated['kelas1'],
                        'kelas2' => $validated['kelas2'],
                        'kelas3' => $validated['kelas3'],
                        'utama' => $validated['utama'],
                        'vip' => $validated['vip'],
                        'vvip' => $validated['vvip'],
                        'beliluar' => $validated['beliluar'],
                        'jualbebas' => $validated['jualbebas'],
                        'karyawan' => $validated['karyawan']
                    ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Harga jual berhasil diupdate (manual) berdasarkan harga beli terbaru',
                    'data' => [
                        'kode_brng' => $kode_brng,
                        'h_beli' => $validated['h_beli'],
                        'harga_jual' => [
                            'ralan' => $validated['ralan'],
                            'kelas1' => $validated['kelas1'],
                            'kelas2' => $validated['kelas2'],
                            'kelas3' => $validated['kelas3'],
                            'utama' => $validated['utama'],
                            'vip' => $validated['vip'],
                            'vvip' => $validated['vvip'],
                            'beliluar' => $validated['beliluar'],
                            'jualbebas' => $validated['jualbebas'],
                            'karyawan' => $validated['karyawan']
                        ]
                    ]
                ]);
            }

            // Mode baru: frontend hanya mengirim base harga jual. Backend akan menghitung harga jual berdasarkan konfigurasi set_harga_obat.
            $validated = $request->validate([
                'kode_brng' => 'required|string',
                'h_beli' => 'required|numeric|min:0',
                // base harga dapat dikirim dengan beberapa nama field; semuanya opsional
                'baseHargaJual' => 'nullable|numeric|min:0',
                'base_harga_jual' => 'nullable|numeric|min:0',
                'harga_dasar' => 'nullable|numeric|min:0',
            ]);

            // Ambil konfigurasi set_harga_obat
            $cfg = DB::connection('fufufafa')
                ->table('set_harga_obat')
                ->select('setharga', 'hargadasar', 'ppn')
                ->first();

            $setharga = $cfg->setharga ?? 'Umum';
            $hargadasarCfg = $cfg->hargadasar ?? 'Harga Beli';
            $ppn = $cfg->ppn ?? 'Yes';

            // Tentukan base harga: prioritas ke baseHargaJual (dasar hasil harga beli – diskon) yang dikirim dari frontend
            $baseFromRequest = $validated['baseHargaJual'] ?? $validated['base_harga_jual'] ?? $validated['harga_dasar'] ?? null;
            if ($baseFromRequest !== null) {
                $base = (float) $baseFromRequest;
            } else {
                // Fallback ke konfigurasi hargadasar
                if ($hargadasarCfg === 'Harga Beli') {
                    $base = (float)($validated['h_beli'] ?? $dataBarang->h_beli ?? $dataBarang->dasar ?? 0);
                } else {
                    // Harga Diskon: gunakan kolom dasar sebagai representasi harga setelah diskon
                    $base = (float)($dataBarang->dasar ?? $validated['h_beli'] ?? 0);
                }
            }

            // Ambil persentase sesuai mode
            $persen = null;
            if ($setharga === 'Umum') {
                $persen = DB::connection('fufufafa')
                    ->table('setpenjualanumum')
                    ->select('ralan','kelas1','kelas2','kelas3','utama','vip','vvip','beliluar','jualbebas','karyawan')
                    ->first();
            } elseif ($setharga === 'Per Jenis') {
                if (!empty($dataBarang->kdjns)) {
                    $persen = DB::connection('fufufafa')
                        ->table('setpenjualan')
                        ->select('ralan','kelas1','kelas2','kelas3','utama','vip','vvip','beliluar','jualbebas','karyawan')
                        ->where('kdjns', $dataBarang->kdjns)
                        ->first();
                }
            } elseif ($setharga === 'Per Barang') {
                $persen = DB::connection('fufufafa')
                    ->table('setpenjualanperbarang')
                    ->select('ralan','kelas1','kelas2','kelas3','utama','vip','vvip','beliluar','jualbebas','karyawan')
                    ->where('kode_brng', $kode_brng)
                    ->first();
            }

            // Normalisasi persentase (fallback 0 jika tidak tersedia)
            $ps = [
                'ralan' => (float)($persen->ralan ?? 0),
                'kelas1' => (float)($persen->kelas1 ?? 0),
                'kelas2' => (float)($persen->kelas2 ?? 0),
                'kelas3' => (float)($persen->kelas3 ?? 0),
                'utama' => (float)($persen->utama ?? 0),
                'vip' => (float)($persen->vip ?? 0),
                'vvip' => (float)($persen->vvip ?? 0),
                'beliluar' => (float)($persen->beliluar ?? 0),
                'jualbebas' => (float)($persen->jualbebas ?? 0),
                'karyawan' => (float)($persen->karyawan ?? 0),
            ];

            // Fungsi hitung harga jual dari base dan persen + PPN jika diaktifkan
            $apply = function (float $b, float $percent) use ($ppn): float {
                $harga = $b * (1.0 + ($percent / 100.0));
                if ($ppn === 'Yes') { $harga *= 1.11; }
                return round($harga, 2);
            };

            $updates = [
                'h_beli' => $validated['h_beli'],
                'ralan' => $apply($base, $ps['ralan']),
                'kelas1' => $apply($base, $ps['kelas1']),
                'kelas2' => $apply($base, $ps['kelas2']),
                'kelas3' => $apply($base, $ps['kelas3']),
                'utama' => $apply($base, $ps['utama']),
                'vip' => $apply($base, $ps['vip']),
                'vvip' => $apply($base, $ps['vvip']),
                'beliluar' => $apply($base, $ps['beliluar']),
                'jualbebas' => $apply($base, $ps['jualbebas']),
                'karyawan' => $apply($base, $ps['karyawan']),
            ];

            DB::connection('fufufafa')
                ->table('databarang')
                ->where('kode_brng', $kode_brng)
                ->update($updates);

            return response()->json([
                'success' => true,
                'message' => 'Harga jual berhasil dihitung dari baseHargaJual dan diperbarui sesuai konfigurasi',
                'data' => [
                    'kode_brng' => $kode_brng,
                    'base' => $base,
                    'config' => [ 'setharga' => $setharga, 'hargadasar' => $hargadasarCfg, 'ppn' => $ppn ],
                    'harga_jual' => [
                        'ralan' => $updates['ralan'],
                        'kelas1' => $updates['kelas1'],
                        'kelas2' => $updates['kelas2'],
                        'kelas3' => $updates['kelas3'],
                        'utama' => $updates['utama'],
                        'vip' => $updates['vip'],
                        'vvip' => $updates['vvip'],
                        'beliluar' => $updates['beliluar'],
                        'jualbebas' => $updates['jualbebas'],
                        'karyawan' => $updates['karyawan']
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate harga jual: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get the last item code and generate a new one
     * Mengambil kode barang terakhir dari tabel databarang dan menambahkan 1
     * Format kode: BXXXXXXXX (8 digit angka)
     */
    public function getLastItemCode()
    {
        try {
            // Mengambil semua kode barang yang dimulai dengan 'B' dan diikuti angka
            $items = DataBarang::where('kode_brng', 'LIKE', 'B%')
                ->where('kode_brng', 'REGEXP', '^B[0-9]+$')
                ->get();
            
            $maxNumber = 0;
            
            // Cari nomor terbesar dari semua kode yang ada
            foreach ($items as $item) {
                if (preg_match('/^B(\d+)$/', $item->kode_brng, $matches)) {
                    $number = (int)$matches[1];
                    if ($number > $maxNumber) {
                        $maxNumber = $number;
                    }
                }
            }
            
            // Generate kode baru dengan increment
            $newNumber = $maxNumber + 1;
            $newCode = 'B' . str_pad($newNumber, 8, '0', STR_PAD_LEFT);
            
            // Pastikan kode baru belum ada di database
            while (DataBarang::where('kode_brng', $newCode)->exists()) {
                $newNumber++;
                $newCode = 'B' . str_pad($newNumber, 8, '0', STR_PAD_LEFT);
            }
            
            return response()->json([
                'success' => true,
                'last_code' => $maxNumber > 0 ? 'B' . str_pad($maxNumber, 8, '0', STR_PAD_LEFT) : null,
                'new_code' => $newCode
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
