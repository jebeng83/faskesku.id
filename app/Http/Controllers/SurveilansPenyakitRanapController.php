<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SurveilansPenyakitRanapController extends Controller
{
    public function index()
    {
        return Inertia::render('Laporan/Ranap/SurveilansPenyakitRanap', [
            'minDate' => date('Y-m-d'),
            'maxDate' => date('Y-m-d'),
        ]);
    }

    public function data(Request $request)
    {
        $startDate = $request->query('start_date', date('Y-m-d'));
        $endDate = $request->query('end_date', date('Y-m-d'));

        // 1. Get all relevant visits for the period
        $visits = DB::table('diagnosa_pasien')
            ->join('penyakit', 'diagnosa_pasien.kd_penyakit', '=', 'penyakit.kd_penyakit')
            ->join('reg_periksa', 'reg_periksa.no_rawat', '=', 'diagnosa_pasien.no_rawat')
            ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
            ->where('diagnosa_pasien.status', 'Ranap')
            ->where('diagnosa_pasien.prioritas', '1')
            ->where('diagnosa_pasien.kd_penyakit', '<>', '-')
            ->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate])
            ->select(
                'diagnosa_pasien.kd_penyakit',
                'penyakit.nm_penyakit',
                'reg_periksa.no_rawat',
                'reg_periksa.no_rkm_medis',
                'reg_periksa.umurdaftar',
                'reg_periksa.sttsumur',
                'pasien.jk'
            )
            ->get();

        // 2. Group by Disease
        $groupedByDisease = $visits->groupBy('kd_penyakit');

        $result = [];

        foreach ($groupedByDisease as $kdPenyakit => $diseaseVisits) {
            $nmPenyakit = $diseaseVisits->first()->nm_penyakit;
            
            // Total Kunjungan (all visits for this disease in period)
            $ttlKunjungan = $diseaseVisits->count();

            // Prepare counters
            $hr0s7 = 0; $hr8s28 = 0; $kr1th = 0; $th1s4 = 0; $th5s9 = 0;
            $th10s14 = 0; $th15s19 = 0; $th20s44 = 0; $th45s54 = 0;
            $th55s59 = 0; $th60s69 = 0; $th70plus = 0;
            $laki = 0; $per = 0;

            // Group by Patient to check "count == 1" rule
            $visitsByPatient = $diseaseVisits->groupBy('no_rkm_medis');

            foreach ($diseaseVisits as $visit) {
                // Java logic: 
                // Iterate rs2 (visits). 
                // For each visit, check count of visits for this patient-disease-period.
                // If count == 1, then count it.
                
                // Since we have all visits in $diseaseVisits, we can check the count from $visitsByPatient
                $patientVisitCount = $visitsByPatient->get($visit->no_rkm_medis)->count();

                if ($patientVisitCount === 1) {
                    // Count Gender
                    if ($visit->jk === 'L') $laki++;
                    elseif ($visit->jk === 'P') $per++;

                    // Count Age
                    $umur = $visit->umurdaftar;
                    $stts = $visit->sttsumur;

                    if (str_contains($stts, 'Hr')) {
                        if ($umur <= 7) $hr0s7++;
                        elseif ($umur <= 28) $hr8s28++;
                    } elseif (str_contains($stts, 'Bl')) {
                        $kr1th++;
                    } elseif (str_contains($stts, 'Th')) {
                        if ($umur <= 4) $th1s4++;
                        elseif ($umur <= 9) $th5s9++;
                        elseif ($umur <= 14) $th10s14++;
                        elseif ($umur <= 19) $th15s19++;
                        elseif ($umur <= 44) $th20s44++;
                        elseif ($umur <= 54) $th45s54++;
                        elseif ($umur <= 59) $th55s59++;
                        elseif ($umur <= 69) $th60s69++;
                        elseif ($umur >= 70) $th70plus++;
                    }
                }
            }

            $jumlah = $laki + $per;

            $result[] = [
                'kd_penyakit' => $kdPenyakit,
                'nm_penyakit' => substr($nmPenyakit, 0, 80),
                'hr0s7' => $hr0s7,
                'hr8s28' => $hr8s28,
                'kr1th' => $kr1th,
                'th1s4' => $th1s4,
                'th5s9' => $th5s9,
                'th10s14' => $th10s14,
                'th15s19' => $th15s19,
                'th20s44' => $th20s44,
                'th45s54' => $th45s54,
                'th55s59' => $th55s59,
                'th60s69' => $th60s69,
                'th70plus' => $th70plus,
                'laki' => $laki,
                'per' => $per,
                'jumlah' => $jumlah,
                'ttl_kunjungan' => $ttlKunjungan,
            ];
        }

        return response()->json([
            'data' => $result
        ]);
    }
}
