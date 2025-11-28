<?php

namespace App\Http\Controllers\Akutansi;

use App\Http\Controllers\Controller;
use App\Models\Akutansi\Billing;
use App\Models\Akutansi\NotaJalan;
use App\Models\Akutansi\TagihanSadewa;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagihanSadewaController extends Controller
{
    /**
     * List tagihan dengan filter opsional
     */
    public function index(Request $request)
    {
        $request->validate([
            'no_nota' => ['nullable', 'string'],
            'no_rkm_medis' => ['nullable', 'string'],
            'status' => ['nullable', 'in:Sudah,Belum'],
            'jenis_bayar' => ['nullable', 'in:Pelunasan,Deposit,Cicilan,Uang Muka'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        $query = TagihanSadewa::with(['patient', 'notaJalan']);

        if ($request->filled('no_nota')) {
            $query->where('no_nota', $request->no_nota);
        }

        if ($request->filled('no_rkm_medis')) {
            $query->where('no_rkm_medis', $request->no_rkm_medis);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('jenis_bayar')) {
            $query->where('jenis_bayar', $request->jenis_bayar);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('tgl_bayar', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('tgl_bayar', '<=', $request->end_date);
        }

        $tagihan = $query->orderBy('tgl_bayar', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $tagihan,
        ]);
    }

    /**
     * Show detail tagihan
     */
    public function show(string $noNota)
    {
        $tagihan = TagihanSadewa::with(['patient', 'notaJalan.regPeriksa'])
            ->findOrFail($noNota);

        return response()->json([
            'success' => true,
            'data' => $tagihan,
        ]);
    }

    /**
     * Buat tagihan baru dari nota_jalan
     * Otomatis dijalankan setelah snapshot billing dan pembuatan nota_jalan
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_nota' => ['required', 'string', 'exists:nota_jalan,no_nota'],
            'no_rkm_medis' => ['nullable', 'string', 'exists:pasien,no_rkm_medis'],
            'jenis_bayar' => ['nullable', 'in:Pelunasan,Deposit,Cicilan,Uang Muka'],
            'jumlah_bayar' => ['nullable', 'numeric', 'min:0'],
            'petugas' => ['nullable', 'string', 'max:20'],
        ]);

        return DB::transaction(function () use ($validated) {
            // Ambil nota_jalan untuk mendapatkan no_rawat
            $notaJalan = NotaJalan::findOrFail($validated['no_nota']);
            $noRawat = $notaJalan->no_rawat;

            // Ambil data pasien dari reg_periksa jika no_rkm_medis tidak dikirim
            if (! isset($validated['no_rkm_medis'])) {
                $regPeriksa = DB::table('reg_periksa')
                    ->where('no_rawat', $noRawat)
                    ->first();
                if ($regPeriksa) {
                    $validated['no_rkm_medis'] = $regPeriksa->no_rkm_medis;
                }
            }

            // Ambil data pasien
            $patient = Patient::findOrFail($validated['no_rkm_medis']);

            // Hitung jumlah tagihan dari billing
            $jumlahTagihan = (float) DB::table('billing')
                ->where('no_rawat', $noRawat)
                ->sum('totalbiaya');

            if ($jumlahTagihan <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada tagihan untuk nota ini. Pastikan billing sudah di-snapshot.',
                ], 422);
            }

            // Cek apakah tagihan sudah ada
            $existing = TagihanSadewa::find($validated['no_nota']);
            if ($existing) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tagihan untuk nota ini sudah ada.',
                    'data' => $existing,
                ], 409);
            }

            // Buat tagihan
            $tagihan = TagihanSadewa::create([
                'no_nota' => $validated['no_nota'],
                'no_rkm_medis' => $validated['no_rkm_medis'],
                'nama_pasien' => $patient->nm_pasien,
                'alamat' => $patient->alamat,
                'tgl_bayar' => Carbon::now(),
                'jenis_bayar' => $validated['jenis_bayar'] ?? 'Pelunasan',
                'jumlah_tagihan' => $jumlahTagihan,
                'jumlah_bayar' => $validated['jumlah_bayar'] ?? 0,
                'status' => ($validated['jumlah_bayar'] ?? 0) >= $jumlahTagihan ? 'Sudah' : 'Belum',
                'petugas' => $validated['petugas'] ?? auth()->user()?->name ?? 'System',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Tagihan berhasil dibuat',
                'data' => $tagihan->load(['patient', 'notaJalan']),
            ], 201);
        });
    }

    /**
     * Update pembayaran tagihan
     */
    public function update(Request $request, string $noNota)
    {
        $validated = $request->validate([
            'jumlah_bayar' => ['required', 'numeric', 'min:0'],
            'jenis_bayar' => ['nullable', 'in:Pelunasan,Deposit,Cicilan,Uang Muka'],
            'petugas' => ['nullable', 'string', 'max:20'],
        ]);

        $tagihan = TagihanSadewa::findOrFail($noNota);

        return DB::transaction(function () use ($tagihan, $validated) {
            $jumlahBayar = (float) $validated['jumlah_bayar'];
            $jumlahTagihan = (float) $tagihan->jumlah_tagihan;

            // Update pembayaran
            $tagihan->update([
                'jumlah_bayar' => $jumlahBayar,
                'jenis_bayar' => $validated['jenis_bayar'] ?? $tagihan->jenis_bayar,
                'status' => $jumlahBayar >= $jumlahTagihan ? 'Sudah' : 'Belum',
                'tgl_bayar' => Carbon::now(),
                'petugas' => $validated['petugas'] ?? auth()->user()?->name ?? $tagihan->petugas,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil diperbarui',
                'data' => $tagihan->load(['patient', 'notaJalan']),
            ]);
        });
    }

    /**
     * Tambah pembayaran (untuk cicilan)
     */
    public function addPayment(Request $request, string $noNota)
    {
        $validated = $request->validate([
            'tambahan_bayar' => ['required', 'numeric', 'min:0'],
            'petugas' => ['nullable', 'string', 'max:20'],
        ]);

        $tagihan = TagihanSadewa::findOrFail($noNota);

        return DB::transaction(function () use ($tagihan, $validated) {
            $tambahanBayar = (float) $validated['tambahan_bayar'];
            $jumlahBayarBaru = $tagihan->jumlah_bayar + $tambahanBayar;
            $jumlahTagihan = (float) $tagihan->jumlah_tagihan;

            // Update pembayaran
            $tagihan->update([
                'jumlah_bayar' => $jumlahBayarBaru,
                'status' => $jumlahBayarBaru >= $jumlahTagihan ? 'Sudah' : 'Belum',
                'tgl_bayar' => Carbon::now(),
                'petugas' => $validated['petugas'] ?? auth()->user()?->name ?? $tagihan->petugas,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil ditambahkan',
                'data' => $tagihan->load(['patient', 'notaJalan']),
                'sisa_tagihan' => max(0, $jumlahTagihan - $jumlahBayarBaru),
            ]);
        });
    }

    /**
     * Hapus tagihan (hanya jika belum ada pembayaran)
     */
    public function destroy(string $noNota)
    {
        $tagihan = TagihanSadewa::findOrFail($noNota);

        if ($tagihan->jumlah_bayar > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Tagihan tidak dapat dihapus karena sudah ada pembayaran.',
            ], 422);
        }

        $tagihan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tagihan berhasil dihapus',
        ]);
    }

    /**
     * Buat tagihan otomatis dari nota_jalan (helper untuk integrasi)
     */
    public static function createFromNota(string $noNota, ?string $petugas = null): TagihanSadewa
    {
        $notaJalan = NotaJalan::findOrFail($noNota);
        $noRawat = $notaJalan->no_rawat;

        $regPeriksa = DB::table('reg_periksa')
            ->where('no_rawat', $noRawat)
            ->first();

        if (! $regPeriksa) {
            throw new \Exception("RegPeriksa tidak ditemukan untuk no_rawat: {$noRawat}");
        }

        $patient = Patient::findOrFail($regPeriksa->no_rkm_medis);

        $jumlahTagihan = (float) DB::table('billing')
            ->where('no_rawat', $noRawat)
            ->sum('totalbiaya');

        if ($jumlahTagihan <= 0) {
            throw new \Exception("Tidak ada tagihan untuk nota: {$noNota}");
        }

        // Cek apakah sudah ada
        $existing = TagihanSadewa::find($noNota);
        if ($existing) {
            return $existing;
        }

        return TagihanSadewa::create([
            'no_nota' => $noNota,
            'no_rkm_medis' => $regPeriksa->no_rkm_medis,
            'nama_pasien' => $patient->nm_pasien,
            'alamat' => $patient->alamat,
            'tgl_bayar' => Carbon::now(),
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => $jumlahTagihan,
            'jumlah_bayar' => 0,
            'status' => 'Belum',
            'petugas' => $petugas ?? auth()->user()?->name ?? 'System',
        ]);
    }
}
