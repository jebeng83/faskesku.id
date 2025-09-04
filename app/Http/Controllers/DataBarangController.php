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
        $query = DataBarang::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Pagination
        $dataBarang = $query->orderBy('kode_brng', 'desc')
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

        DataBarang::create($data);

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

        $dataBarang->update($data);

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
