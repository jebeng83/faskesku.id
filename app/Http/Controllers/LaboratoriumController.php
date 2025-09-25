<?php

namespace App\Http\Controllers;

use App\Models\PeriksaLab;
use App\Models\DetailPeriksaLab;
use App\Models\JnsPerawatanLab;
use App\Models\TemplateLaboratorium;
use App\Models\RiwayatLab;
use App\Models\RegPeriksa;
use App\Models\Patient;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;

class LaboratoriumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PeriksaLab::with(['regPeriksa.patient', 'jenisPerawatan', 'petugas'])
            ->orderBy('tgl_periksa', 'desc');

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->byStatus($request->status);
        }

        // Filter berdasarkan tanggal
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->byDateRange($request->start_date, $request->end_date);
        }

        // Pencarian
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        $periksaLab = $query->paginate(15)->withQueryString();

        $statusOptions = [
            'Menunggu' => 'Menunggu',
            'Proses' => 'Proses',
            'Selesai' => 'Selesai'
        ];

        return Inertia::render('Laboratorium/Index', [
            'periksaLab' => $periksaLab,
            'statusOptions' => $statusOptions,
            'filters' => $request->only(['status', 'start_date', 'end_date', 'search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $regPeriksa = null;
        if ($request->filled('no_rawat')) {
            $regPeriksa = RegPeriksa::with('patient')->find($request->no_rawat);
        }

        $jenisPerawatan = JnsPerawatanLab::aktif()->get();
        $petugas = Employee::whereHas('user')->get();

        return Inertia::render('Laboratorium/Create', [
            'regPeriksa' => $regPeriksa,
            'jenisPerawatan' => $jenisPerawatan,
            'petugas' => $petugas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'no_rawat' => 'required|exists:reg_periksa,no_rawat',
            'nip' => 'required|exists:pegawai,nik',
            'kd_jenis_prw' => 'required|exists:jns_perawatan_lab,kd_jenis_prw',
            'tgl_periksa' => 'required|date',
            'jam' => 'required',
            'dokter_perujuk' => 'nullable|string|max:255',
            'bagian_perujuk' => 'nullable|string|max:255',
            'kategori' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            $periksaLab = PeriksaLab::create($request->all());

            // Buat detail pemeriksaan berdasarkan template
            $templates = TemplateLaboratorium::byJenisPemeriksaan($request->kd_jenis_prw)
                ->aktif()
                ->ordered()
                ->get();

            foreach ($templates as $template) {
                DetailPeriksaLab::create([
                    'no_rawat' => $request->no_rawat,
                    'kd_jenis_prw' => $request->kd_jenis_prw,
                    'item_pemeriksaan' => $template->item_pemeriksaan,
                    'nilai_rujukan' => $template->getNilaiRujukan(),
                    'satuan' => $template->satuan
                ]);
            }

            DB::commit();

            return redirect()->route('laboratorium.show', $periksaLab->no_rawat)
                ->with('success', 'Pemeriksaan laboratorium berhasil dibuat.');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Gagal membuat pemeriksaan laboratorium: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($noRawat)
    {
        $periksaLab = PeriksaLab::with([
            'regPeriksa.patient',
            'jenisPerawatan',
            'petugas',
            'detailPemeriksaan'
        ])->findOrFail($noRawat);

        $riwayatLab = RiwayatLab::byPasien($periksaLab->regPeriksa->no_rkm_medis)
            ->with('jenisPerawatan')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Laboratorium/Show', [
            'periksaLab' => $periksaLab,
            'riwayatLab' => $riwayatLab
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($noRawat)
    {
        $periksaLab = PeriksaLab::with([
            'regPeriksa.patient',
            'jenisPerawatan',
            'detailPemeriksaan'
        ])->findOrFail($noRawat);

        $jenisPerawatan = JnsPerawatanLab::aktif()->get();
        $petugas = Employee::whereHas('user')->get();

        return Inertia::render('Laboratorium/Edit', [
            'periksaLab' => $periksaLab,
            'jenisPerawatan' => $jenisPerawatan,
            'petugas' => $petugas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $noRawat)
    {
        $periksaLab = PeriksaLab::findOrFail($noRawat);

        $request->validate([
            'nip' => 'required|exists:pegawai,nik',
            'kd_jenis_prw' => 'required|exists:jns_perawatan_lab,kd_jenis_prw',
            'tgl_periksa' => 'required|date',
            'jam' => 'required',
            'dokter_perujuk' => 'nullable|string|max:255',
            'bagian_perujuk' => 'nullable|string|max:255',
            'kategori' => 'nullable|string|max:255',
            'status' => 'required|in:Menunggu,Proses,Selesai',
            'keterangan' => 'nullable|string'
        ]);

        try {
            $periksaLab->update($request->all());

            return redirect()->route('laboratorium.show', $noRawat)
                ->with('success', 'Pemeriksaan laboratorium berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal memperbarui pemeriksaan laboratorium: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($noRawat)
    {
        try {
            $periksaLab = PeriksaLab::findOrFail($noRawat);
            $periksaLab->delete();

            return redirect()->route('laboratorium.index')
                ->with('success', 'Pemeriksaan laboratorium berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus pemeriksaan laboratorium: ' . $e->getMessage()]);
        }
    }

    /**
     * Update hasil pemeriksaan
     */
    public function updateHasil(Request $request, $noRawat)
    {
        $request->validate([
            'detail_pemeriksaan' => 'required|array',
            'detail_pemeriksaan.*.id' => 'required|exists:detail_periksa_lab,id',
            'detail_pemeriksaan.*.nilai' => 'nullable|string',
            'detail_pemeriksaan.*.keterangan' => 'nullable|in:Normal,Tinggi,Rendah,Abnormal'
        ]);

        try {
            DB::beginTransaction();

            foreach ($request->detail_pemeriksaan as $detail) {
                DetailPeriksaLab::where('id', $detail['id'])
                    ->update([
                        'nilai' => $detail['nilai'],
                        'keterangan' => $detail['keterangan']
                    ]);
            }

            // Update status pemeriksaan
            $periksaLab = PeriksaLab::findOrFail($noRawat);
            $totalDetail = $periksaLab->detailPemeriksaan()->count();
            $detailTerisi = $periksaLab->detailPemeriksaan()->whereNotNull('nilai')->count();

            if ($totalDetail === $detailTerisi) {
                $periksaLab->update(['status' => 'Selesai']);
                $this->simpanRiwayat($periksaLab);
            } else {
                $periksaLab->update(['status' => 'Proses']);
            }

            DB::commit();

            return back()->with('success', 'Hasil pemeriksaan berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Gagal menyimpan hasil pemeriksaan: ' . $e->getMessage()]);
        }
    }

    /**
     * Simpan riwayat pemeriksaan
     */
    private function simpanRiwayat(PeriksaLab $periksaLab)
    {
        $hasilPemeriksaan = $periksaLab->detailPemeriksaan->map(function ($detail) {
            return [
                'item' => $detail->item_pemeriksaan,
                'nilai' => $detail->nilai,
                'satuan' => $detail->satuan,
                'rujukan' => $detail->nilai_rujukan,
                'keterangan' => $detail->keterangan
            ];
        })->toArray();

        RiwayatLab::create([
            'no_rawat' => $periksaLab->no_rawat,
            'no_rkm_medis' => $periksaLab->regPeriksa->no_rkm_medis,
            'kd_jenis_prw' => $periksaLab->kd_jenis_prw,
            'tgl_periksa' => $periksaLab->tgl_periksa,
            'hasil_pemeriksaan' => json_encode($hasilPemeriksaan),
            'dokter_pj' => $periksaLab->dokter_perujuk,
            'petugas_lab' => $periksaLab->petugas->nama ?? null
        ]);
    }

    /**
     * Dashboard laboratorium
     */
    public function dashboard()
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        $stats = [
            'total_hari_ini' => PeriksaLab::whereDate('tgl_periksa', $today)->count(),
            'menunggu' => PeriksaLab::byStatus('Menunggu')->count(),
            'proses' => PeriksaLab::byStatus('Proses')->count(),
            'selesai_hari_ini' => PeriksaLab::byStatus('Selesai')->whereDate('tgl_periksa', $today)->count(),
            'total_bulan_ini' => PeriksaLab::where('tgl_periksa', '>=', $thisMonth)->count()
        ];

        $recentExams = PeriksaLab::with(['regPeriksa.patient', 'jenisPerawatan'])
            ->orderBy('tgl_periksa', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Laboratorium/Dashboard', [
            'stats' => $stats,
            'recentExams' => $recentExams
        ]);
    }
}