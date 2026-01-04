<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Schema;

class FrekuensiPenyakitRanapController extends Controller
{
    public function index()
    {
        return Inertia::render('Laporan/Ranap/FrekuensiPenyakitRanap', [
            'listBangsal' => DB::table('bangsal')->select('kd_bangsal', 'nm_bangsal')->where('status', '1')->orderBy('nm_bangsal')->get(),
            'listDokter' => DB::table('dokter')->select('kd_dokter', 'nm_dokter')->where('status', '1')->orderBy('nm_dokter')->get(),
            'listPenjab' => DB::table('penjab')->select('kd_pj', 'png_jawab')->where('status', '1')->orderBy('png_jawab')->get(),
        ]);
    }

    public function data(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $dateType = $request->input('date_type', 'masuk'); // masuk | keluar
        $bangsal = trim($request->input('bangsal', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $kabupaten = trim($request->input('kabupaten', ''));
        $kecamatan = trim($request->input('kecamatan', ''));
        $kelurahan = trim($request->input('kelurahan', ''));

        try {
            $query = DB::table('penyakit')
                ->join('diagnosa_pasien', 'penyakit.kd_penyakit', '=', 'diagnosa_pasien.kd_penyakit')
                ->join('reg_periksa', 'reg_periksa.no_rawat', '=', 'diagnosa_pasien.no_rawat')
                ->join('kamar_inap', 'reg_periksa.no_rawat', '=', 'kamar_inap.no_rawat')
                ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                ->join('bangsal', 'kamar.kd_bangsal', '=', 'bangsal.kd_bangsal')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                ->leftJoin('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
                ->leftJoin('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
                ->leftJoin('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel');

            $query->where('reg_periksa.status_lanjut', 'Ranap')
                  ->where('diagnosa_pasien.status', 'Ranap')
                  ->where('diagnosa_pasien.prioritas', '1');

            if ($dateType === 'masuk') {
                $query->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate]);
            } else {
                $query->whereBetween('kamar_inap.tgl_keluar', [$startDate, $endDate])
                      ->where('kamar_inap.stts_pulang', '<>', 'Pindah Kamar');
            }

            if ($bangsal !== '') {
                $query->where('bangsal.kd_bangsal', $bangsal);
            }
            if ($dokter !== '') {
                $query->where('reg_periksa.kd_dokter', $dokter);
            }
            if ($penjab !== '') {
                $query->where('reg_periksa.kd_pj', $penjab);
            }
            if ($kabupaten !== '') {
                $query->where('kabupaten.nm_kab', 'like', "%{$kabupaten}%");
            }
            if ($kecamatan !== '') {
                $query->where('kecamatan.nm_kec', 'like', "%{$kecamatan}%");
            }
            if ($kelurahan !== '') {
                $query->where('kelurahan.nm_kel', 'like', "%{$kelurahan}%");
            }

            $query->select(
                'penyakit.kd_penyakit',
                DB::raw('SUBSTRING(penyakit.nm_penyakit, 1, 80) as penyakit'),
                DB::raw('COUNT(DISTINCT diagnosa_pasien.no_rawat) as jumlah')
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
        $dateType = $request->input('date_type', 'masuk');
        $bangsal = trim($request->input('bangsal', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $kabupaten = trim($request->input('kabupaten', ''));
        $kecamatan = trim($request->input('kecamatan', ''));
        $kelurahan = trim($request->input('kelurahan', ''));

        try {
            $query = DB::table('penyakit')
                ->join('diagnosa_pasien', 'penyakit.kd_penyakit', '=', 'diagnosa_pasien.kd_penyakit')
                ->join('reg_periksa', 'reg_periksa.no_rawat', '=', 'diagnosa_pasien.no_rawat')
                ->join('kamar_inap', 'reg_periksa.no_rawat', '=', 'kamar_inap.no_rawat')
                ->join('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                ->join('bangsal', 'kamar.kd_bangsal', '=', 'bangsal.kd_bangsal')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                ->leftJoin('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
                ->leftJoin('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
                ->leftJoin('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel');

            $query->where('reg_periksa.status_lanjut', 'Ranap')
                  ->where('diagnosa_pasien.status', 'Ranap')
                  ->where('diagnosa_pasien.prioritas', '1');

            if ($dateType === 'masuk') {
                $query->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate]);
            } else {
                $query->whereBetween('kamar_inap.tgl_keluar', [$startDate, $endDate])
                      ->where('kamar_inap.stts_pulang', '<>', 'Pindah Kamar');
            }

            if ($bangsal !== '') {
                $query->where('bangsal.kd_bangsal', $bangsal);
            }
            if ($dokter !== '') {
                $query->where('reg_periksa.kd_dokter', $dokter);
            }
            if ($penjab !== '') {
                $query->where('reg_periksa.kd_pj', $penjab);
            }
            if ($kabupaten !== '') {
                $query->where('kabupaten.nm_kab', 'like', "%{$kabupaten}%");
            }
            if ($kecamatan !== '') {
                $query->where('kecamatan.nm_kec', 'like', "%{$kecamatan}%");
            }
            if ($kelurahan !== '') {
                $query->where('kelurahan.nm_kel', 'like', "%{$kelurahan}%");
            }

            $query->select(
                'penyakit.kd_penyakit',
                DB::raw('SUBSTRING(penyakit.nm_penyakit, 1, 80) as penyakit'),
                DB::raw('COUNT(DISTINCT diagnosa_pasien.no_rawat) as jumlah')
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
            $typeStr = $dateType === 'masuk' ? 'Berdasar Tanggal Masuk' : 'Berdasar Tanggal Keluar';

            // Filter Details
            $filterDetails = [];
            $filterDetails['Jenis Data'] = $typeStr;
            
            if ($bangsal !== '') {
                $bangsalName = DB::table('bangsal')->where('kd_bangsal', $bangsal)->value('nm_bangsal');
                if ($bangsalName) $filterDetails['Bangsal'] = $bangsalName;
            }
            if ($dokter !== '') {
                $dokterName = DB::table('dokter')->where('kd_dokter', $dokter)->value('nm_dokter');
                if ($dokterName) $filterDetails['Dokter'] = $dokterName;
            }
            if ($penjab !== '') {
                $penjabName = DB::table('penjab')->where('kd_pj', $penjab)->value('png_jawab');
                if ($penjabName) $filterDetails['Cara Bayar'] = $penjabName;
            }
            if ($kabupaten !== '') $filterDetails['Kabupaten'] = $kabupaten;
            if ($kecamatan !== '') $filterDetails['Kecamatan'] = $kecamatan;
            if ($kelurahan !== '') $filterDetails['Kelurahan'] = $kelurahan;

            $pdf = Pdf::loadView('reports.frekuensi_penyakit_ranap', [
                'setting' => $setting,
                'periode' => $periodeStr,
                'rows' => $results,
                'total' => $total,
                'filters' => $filterDetails
            ])->setPaper('a4', 'portrait');

            return $pdf->stream('Laporan_Frekuensi_Penyakit_Ranap.pdf');

        } catch (\Exception $e) {
            return response('Error: ' . $e->getMessage(), 500);
        }
    }
}
