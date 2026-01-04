<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Schema;
use Barryvdh\DomPDF\Facade\Pdf;

class FrekuensiPenyakitRalanController extends Controller
{
    public function index()
    {
        $listPoli = DB::table('poliklinik')->select('kd_poli', 'nm_poli')->where('status', '1')->orderBy('nm_poli')->get();
        $listDokter = DB::table('dokter')->select('kd_dokter', 'nm_dokter')->where('status', '1')->orderBy('nm_dokter')->get();
        $listPenjab = DB::table('penjab')->select('kd_pj', 'png_jawab')->where('status', '1')->orderBy('png_jawab')->get();
        $listStatus = ['Belum', 'Sudah', 'Batal', 'Berkas Diterima', 'Dirujuk', 'Meninggal', 'Dirawat', 'Pulang Paksa'];

        return Inertia::render('Laporan/Ralan/FrekuensiPenyakit', [
            'listPoli' => $listPoli,
            'listDokter' => $listDokter,
            'listPenjab' => $listPenjab,
            'listStatus' => $listStatus,
        ]);
    }

    public function data(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $poli = trim($request->input('poli', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $status = trim($request->input('status', ''));

        try {
            $query = DB::table('penyakit')
                ->join('diagnosa_pasien', 'penyakit.kd_penyakit', '=', 'diagnosa_pasien.kd_penyakit')
                ->join('reg_periksa', 'reg_periksa.no_rawat', '=', 'diagnosa_pasien.no_rawat')
                ->where('reg_periksa.status_lanjut', 'Ralan')
                ->where('diagnosa_pasien.status', 'Ralan')
                ->where('diagnosa_pasien.prioritas', '1')
                ->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate]);

            if ($poli !== '') {
                $query->where('reg_periksa.kd_poli', $poli);
            }
            if ($dokter !== '') {
                $query->where('reg_periksa.kd_dokter', $dokter);
            }
            if ($penjab !== '') {
                $query->where('reg_periksa.kd_pj', $penjab);
            }
            if ($status !== '') {
                $query->where('reg_periksa.stts', $status);
            }

            $query->select(
                    'penyakit.kd_penyakit',
                    DB::raw('SUBSTRING(penyakit.nm_penyakit, 1, 80) as penyakit'),
                    DB::raw('COUNT(diagnosa_pasien.kd_penyakit) as jumlah')
                )
                ->groupBy('penyakit.kd_penyakit', 'penyakit.nm_penyakit')
                ->orderBy('jumlah', 'desc')
                ->orderBy('penyakit.kd_penyakit', 'asc');

            $data = $query->get();

            $total = $data->sum('jumlah');

            $results = $data->map(function ($item) use ($total) {
                return [
                    'kd_penyakit' => $item->kd_penyakit,
                    'penyakit' => $item->penyakit,
                    'jumlah' => $item->jumlah,
                    'persentase' => $total > 0 ? round(($item->jumlah / $total) * 100, 2) : 0
                ];
            });

            return response()->json([
                'data' => $results,
                'total' => $total
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function print(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $poli = trim($request->input('poli', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $status = trim($request->input('status', ''));

        try {
            $query = DB::table('penyakit')
                ->join('diagnosa_pasien', 'penyakit.kd_penyakit', '=', 'diagnosa_pasien.kd_penyakit')
                ->join('reg_periksa', 'reg_periksa.no_rawat', '=', 'diagnosa_pasien.no_rawat')
                ->where('reg_periksa.status_lanjut', 'Ralan')
                ->where('diagnosa_pasien.status', 'Ralan')
                ->where('diagnosa_pasien.prioritas', '1')
                ->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate]);

            if ($poli !== '') {
                $query->where('reg_periksa.kd_poli', $poli);
            }
            if ($dokter !== '') {
                $query->where('reg_periksa.kd_dokter', $dokter);
            }
            if ($penjab !== '') {
                $query->where('reg_periksa.kd_pj', $penjab);
            }
            if ($status !== '') {
                $query->where('reg_periksa.stts', $status);
            }

            $query->select(
                    'penyakit.kd_penyakit',
                    DB::raw('SUBSTRING(penyakit.nm_penyakit, 1, 80) as penyakit'),
                    DB::raw('COUNT(diagnosa_pasien.kd_penyakit) as jumlah')
                )
                ->groupBy('penyakit.kd_penyakit', 'penyakit.nm_penyakit')
                ->orderBy('jumlah', 'desc')
                ->orderBy('penyakit.kd_penyakit', 'asc');

            $data = $query->get();

            $total = $data->sum('jumlah');

            $results = $data->map(function ($item) use ($total) {
                return [
                    'kd_penyakit' => $item->kd_penyakit,
                    'penyakit' => $item->penyakit,
                    'jumlah' => $item->jumlah,
                    'persentase' => $total > 0 ? round(($item->jumlah / $total) * 100, 2) : 0
                ];
            });

            // Setting RS
            $setting = null;
            if (Schema::hasTable('setting')) {
                $row = DB::table('setting')->first();
                if ($row) {
                    $setting = [
                        'nama_instansi' => $row->nama_instansi,
                        'alamat_instansi' => $row->alamat_instansi,
                        'kabupaten' => $row->kabupaten,
                        'propinsi' => $row->propinsi,
                        'kontak' => $row->kontak,
                        'email' => $row->email,
                    ];
                }
            }

            $periodeStr = date('d-m-Y', strtotime($startDate)) . ' s.d. ' . date('d-m-Y', strtotime($endDate));

            // Get Filter Details
            $filterDetails = [];
            if ($poli !== '') {
                $poliName = DB::table('poliklinik')->where('kd_poli', $poli)->value('nm_poli');
                if ($poliName) $filterDetails['Poliklinik'] = $poliName;
            }
            if ($dokter !== '') {
                $dokterName = DB::table('dokter')->where('kd_dokter', $dokter)->value('nm_dokter');
                if ($dokterName) $filterDetails['Dokter'] = $dokterName;
            }
            if ($penjab !== '') {
                $penjabName = DB::table('penjab')->where('kd_pj', $penjab)->value('png_jawab');
                if ($penjabName) $filterDetails['Cara Bayar'] = $penjabName;
            }
            if ($status !== '') {
                $filterDetails['Status'] = $status;
            }

            $pdf = Pdf::loadView('reports.frekuensi_penyakit_ralan', [
                'setting' => $setting,
                'periode' => $periodeStr,
                'rows' => $results,
                'total' => $total,
                'filters' => $filterDetails
            ])->setPaper('a4', 'portrait');

            return $pdf->stream('Laporan_Frekuensi_Penyakit_Ralan.pdf');

        } catch (\Exception $e) {
            return response('Error: ' . $e->getMessage(), 500);
        }
    }
}
