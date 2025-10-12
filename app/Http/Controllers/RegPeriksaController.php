<?php

namespace App\Http\Controllers;

use App\Models\RegPeriksa;
use App\Models\Patient;
use App\Models\Dokter;
use App\Models\Poliklinik;
use App\Models\Penjab;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class RegPeriksaController extends Controller
{
    public function index()
    {
        $regPeriksa = RegPeriksa::with(['pasien', 'dokter', 'poliklinik', 'penjab'])
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('jam_reg', 'desc')
            ->paginate(10);

        return Inertia::render('RegPeriksa/Index', [
            'regPeriksa' => $regPeriksa
        ]);
    }

    public function create()
    {
        $patients = Patient::select('no_rkm_medis', 'nm_pasien', 'tgl_lahir', 'jk')->get();
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();

        return Inertia::render('RegPeriksa/Create', [
            'patients' => $patients,
            'dokters' => $dokters,
            'polikliniks' => $polikliniks,
            'penjabs' => $penjabs
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_rkm_medis' => 'required|exists:patients,no_rkm_medis',
            'kd_dokter' => 'required|exists:dokter,kd_dokter',
            'kd_poli' => 'required|exists:poliklinik,kd_poli',
            'kd_pj' => 'required|exists:penjab,kd_pj',
            'p_jawab' => 'required|string|max:100',
            'almt_pj' => 'required|string|max:200',
            'hubunganpj' => 'required|string|max:20',
            'biaya_reg' => 'required|numeric|min:0',
            'status_lanjut' => 'required|in:Ralan,Ranap',
            'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
            'status_poli' => 'required|in:Lama,Baru'
        ]);

        // Generate nomor registrasi dan rawat
        $noReg = RegPeriksa::generateNoReg($request->kd_dokter, $request->kd_poli);
        $noRawat = RegPeriksa::generateNoRawat();

        // Hitung umur pasien
        $patient = Patient::find($request->no_rkm_medis);
        $tglLahir = Carbon::parse($patient->tgl_lahir);
        $umur = $tglLahir->diffInYears(Carbon::now());
        $sttsUmur = 'Th';

        RegPeriksa::create([
            'no_reg' => $noReg,
            'no_rawat' => $noRawat,
            'tgl_registrasi' => now()->toDateString(),
            'jam_reg' => now()->toTimeString(),
            'kd_dokter' => $request->kd_dokter,
            'no_rkm_medis' => $request->no_rkm_medis,
            'kd_poli' => $request->kd_poli,
            'p_jawab' => $request->p_jawab,
            'almt_pj' => $request->almt_pj,
            'hubunganpj' => $request->hubunganpj,
            'biaya_reg' => $request->biaya_reg,
            'stts' => 'Belum',
            'stts_daftar' => 'Baru',
            'status_lanjut' => $request->status_lanjut,
            'kd_pj' => $request->kd_pj,
            'umurdaftar' => $umur,
            'sttsumur' => $sttsUmur,
            'status_bayar' => $request->status_bayar,
            'status_poli' => $request->status_poli,
        ]);

        return redirect()->route('reg-periksa.index')
            ->with('success', 'Registrasi periksa berhasil ditambahkan.');
    }

    public function show(RegPeriksa $regPeriksa)
    {
        $regPeriksa->load(['pasien', 'dokter', 'poliklinik', 'penjab']);

        return Inertia::render('RegPeriksa/Show', [
            'regPeriksa' => $regPeriksa
        ]);
    }

    public function edit(RegPeriksa $regPeriksa)
    {
        $patients = Patient::select('no_rkm_medis', 'nm_pasien', 'tgl_lahir', 'jk')->get();
        $dokters = Dokter::select('kd_dokter', 'nm_dokter')->get();
        $polikliniks = Poliklinik::select('kd_poli', 'nm_poli')->get();
        $penjabs = Penjab::select('kd_pj', 'png_jawab')->get();

        return Inertia::render('RegPeriksa/Edit', [
            'regPeriksa' => $regPeriksa,
            'patients' => $patients,
            'dokters' => $dokters,
            'polikliniks' => $polikliniks,
            'penjabs' => $penjabs
        ]);
    }

    public function update(Request $request, RegPeriksa $regPeriksa)
    {
        $request->validate([
            'no_rkm_medis' => 'required|exists:patients,no_rkm_medis',
            'kd_dokter' => 'required|exists:dokter,kd_dokter',
            'kd_poli' => 'required|exists:poliklinik,kd_poli',
            'kd_pj' => 'required|exists:penjab,kd_pj',
            'p_jawab' => 'required|string|max:100',
            'almt_pj' => 'required|string|max:200',
            'hubunganpj' => 'required|string|max:20',
            'biaya_reg' => 'required|numeric|min:0',
            'status_lanjut' => 'required|in:Ralan,Ranap',
            'status_bayar' => 'required|in:Sudah Bayar,Belum Bayar',
            'status_poli' => 'required|in:Lama,Baru',
            'stts' => 'required|in:Belum,Sudah,Batal,Berkas Diterima,Dirujuk,Meninggal,Dirawat,Pulang Paksa'
        ]);

        $regPeriksa->update($request->all());

        return redirect()->route('reg-periksa.index')
            ->with('success', 'Registrasi periksa berhasil diperbarui.');
    }

    public function destroy(RegPeriksa $regPeriksa)
    {
        $regPeriksa->delete();

        return redirect()->route('reg-periksa.index')
            ->with('success', 'Registrasi periksa berhasil dihapus.');
    }

    public function hitungUmur(Request $request)
    {
        $patient = Patient::find($request->no_rkm_medis);
        if (!$patient) {
            return response()->json(['error' => 'Pasien tidak ditemukan'], 404);
        }

        $tglLahir = Carbon::parse($patient->tgl_lahir);
        $umur = $tglLahir->diffInYears(Carbon::now());

        return response()->json(['umur' => $umur]);
    }

    public function getStatistik()
    {
        $total = RegPeriksa::count();
        $ralan = RegPeriksa::where('status_lanjut', 'Ralan')->count();
        $ranap = RegPeriksa::where('status_lanjut', 'Ranap')->count();
        $sudahBayar = RegPeriksa::where('status_bayar', 'Sudah Bayar')->count();
        $belumBayar = RegPeriksa::where('status_bayar', 'Belum Bayar')->count();

        return response()->json([
            'total' => $total,
            'ralan' => $ralan,
            'ranap' => $ranap,
            'sudah_bayar' => $sudahBayar,
            'belum_bayar' => $belumBayar
        ]);
    }
}