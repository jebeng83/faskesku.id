<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;
use Barryvdh\DomPDF\Facade\Pdf;

class KunjunganController extends Controller
{
    private function getTrendData($type)
    {
        $year = 2025; // Hardcoded as per user request
        
        try {
            if ($type === 'ralan') {
                if (!Schema::hasTable('reg_periksa') || !Schema::hasTable('penjab')) return null;
                
                $rows = DB::table('reg_periksa')
                    ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                    ->whereBetween('tgl_registrasi', [$year.'-01-01', $year.'-12-31'])
                    ->where('status_lanjut', 'Ralan')
                    ->select('tgl_registrasi', DB::raw('penjab.png_jawab as cara_bayar'))
                    ->get();

            } else { // ranap
                if (!Schema::hasTable('kamar_inap') || !Schema::hasTable('reg_periksa') || !Schema::hasTable('penjab')) return null;

                $rows = DB::table('kamar_inap')
                    ->join('reg_periksa', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                    ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                    ->whereBetween('kamar_inap.tgl_keluar', [$year.'-01-01', $year.'-12-31'])
                    ->where('reg_periksa.status_lanjut', 'Ranap')
                    ->whereNotNull('kamar_inap.tgl_keluar')
                    ->select('kamar_inap.tgl_keluar', 'kamar_inap.no_rawat', DB::raw('penjab.png_jawab as cara_bayar'))
                    ->get();
            }

            // Transform data for chart
            $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            $seriesMap = [];
            $maxVal = 0;

            if ($type === 'ralan') {
                foreach ($rows as $row) {
                    $caraBayar = $row->cara_bayar;
                    $monthIdx = (int) substr($row->tgl_registrasi, 5, 2) - 1;
                    if (!isset($seriesMap[$caraBayar])) {
                        $seriesMap[$caraBayar] = array_fill(0, 12, 0);
                    }
                    $seriesMap[$caraBayar][$monthIdx] += 1;
                }
            } else {
                $seen = [];
                foreach ($rows as $row) {
                    $caraBayar = $row->cara_bayar;
                    $monthIdx = (int) substr($row->tgl_keluar, 5, 2) - 1;
                    $key = $row->no_rawat;
                    if (!isset($seen[$caraBayar])) $seen[$caraBayar] = [];
                    if (!isset($seen[$caraBayar][$monthIdx])) $seen[$caraBayar][$monthIdx] = [];
                    $seen[$caraBayar][$monthIdx][$key] = true;
                }
                foreach ($seen as $name => $monthsSeen) {
                    $seriesMap[$name] = array_fill(0, 12, 0);
                    foreach ($monthsSeen as $m => $set) {
                        $seriesMap[$name][$m] = count($set);
                    }
                }
            }

            $series = [];
            foreach ($seriesMap as $name => $values) {
                // Calculate local max for scaling
                $localMax = max($values);
                if ($localMax > $maxVal) $maxVal = $localMax;

                $series[] = [
                    'nm_poli' => $name, // Reusing nm_poli key for compatibility with ChartPoliMonthly
                    'kd_poli' => md5($name), // Dummy key
                    'data' => $values
                ];
            }
            
            // Filter months to only include up to current month or all if hardcoded year
            // For now, let's keep all 12 months structure or trim empty trailing months?
            // The chart component expects matching length.
            
            return [
                'months' => $months,
                'series' => $series,
                'max' => $maxVal > 0 ? $maxVal : 10
            ];

        } catch (Throwable $e) {
            return null;
        }
    }

    public function index()
    {
        $today = now()->toDateString();
        $yesterday = now()->subDay()->toDateString();
        $updatedAt = now()->format('H:i');

        $deltaPct = function ($current, $previous) {
            $c = (float) ($current ?? 0);
            $p = (float) ($previous ?? 0);
            if ($p <= 0) {
                return $c > 0 ? 100.0 : 0.0;
            }
            return round((($c - $p) / $p) * 100, 1);
        };

        $rawatJalan = [
            'baru' => 0,
            'lama' => 0,
            'total' => 0,
            'avg_daily' => 0.0,
            'delta_pct' => 0.0,
        ];

        $rawatInap = [
            'masuk' => 0,
            'keluar' => 0,
            'total' => 0,
            'bed_total' => 0,
            'okupansi_pct' => 0.0,
            'avg_los_days' => 0.0,
            'delta_pct' => 0.0,
        ];

        $igd = [
            'total' => 0,
            'lanjut_ranap' => 0,
            'pulang' => 0,
            'avg_daily' => 0.0,
            'delta_pct' => 0.0,
        ];

        try {
            if (Schema::hasTable('reg_periksa')) {
                $qRalanToday = DB::table('reg_periksa')->whereDate('tgl_registrasi', $today)->where('status_lanjut', 'Ralan');
                $qRalanYesterday = DB::table('reg_periksa')->whereDate('tgl_registrasi', $yesterday)->where('status_lanjut', 'Ralan');

                if (Schema::hasColumn('reg_periksa', 'kd_poli')) {
                    $qRalanToday->where('kd_poli', '!=', 'IGDK');
                    $qRalanYesterday->where('kd_poli', '!=', 'IGDK');
                }

                $rawatJalan['total'] = (int) (clone $qRalanToday)->count();
                $rawatJalanYesterdayTotal = (int) (clone $qRalanYesterday)->count();
                $rawatJalan['delta_pct'] = (float) $deltaPct($rawatJalan['total'], $rawatJalanYesterdayTotal);

                if (Schema::hasColumn('reg_periksa', 'stts_daftar')) {
                    $rawatJalan['baru'] = (int) (clone $qRalanToday)->where('stts_daftar', 'Baru')->count();
                    $rawatJalan['lama'] = (int) (clone $qRalanToday)->where('stts_daftar', 'Lama')->count();
                } elseif (Schema::hasColumn('reg_periksa', 'status_poli')) {
                    $rawatJalan['baru'] = (int) (clone $qRalanToday)->where('status_poli', 'Baru')->count();
                    $rawatJalan['lama'] = (int) (clone $qRalanToday)->where('status_poli', 'Lama')->count();
                }

                // Calculate Avg Daily (Last 30 Days)
                $since30 = now()->subDays(30)->toDateString();
                $qRalan30 = DB::table('reg_periksa')
                    ->whereBetween('tgl_registrasi', [$since30, $yesterday])
                    ->where('status_lanjut', 'Ralan');
                
                if (Schema::hasColumn('reg_periksa', 'kd_poli')) {
                    $qRalan30->where('kd_poli', '!=', 'IGDK');
                }
                $rawatJalan['avg_daily'] = round($qRalan30->count() / 30, 1);

                if (Schema::hasColumn('reg_periksa', 'kd_poli')) {
                    $qIgdToday = DB::table('reg_periksa')->whereDate('tgl_registrasi', $today)->where('kd_poli', 'IGDK');
                    $qIgdYesterday = DB::table('reg_periksa')->whereDate('tgl_registrasi', $yesterday)->where('kd_poli', 'IGDK');

                    $igd['total'] = (int) (clone $qIgdToday)->count();
                    $igdYesterdayTotal = (int) (clone $qIgdYesterday)->count();
                    $igd['delta_pct'] = (float) $deltaPct($igd['total'], $igdYesterdayTotal);

                    if (Schema::hasColumn('reg_periksa', 'status_lanjut')) {
                        $igd['lanjut_ranap'] = (int) (clone $qIgdToday)->where('status_lanjut', 'Ranap')->count();
                        $igd['pulang'] = (int) (clone $qIgdToday)->where('status_lanjut', 'Ralan')->count();
                    }

                    // Calculate Avg Daily IGD (Last 30 Days)
                    $qIgd30 = DB::table('reg_periksa')
                        ->whereBetween('tgl_registrasi', [$since30, $yesterday])
                        ->where('kd_poli', 'IGDK');
                    $igd['avg_daily'] = round($qIgd30->count() / 30, 1);
                }
            }

            if (Schema::hasTable('kamar_inap')) {
                $hasTglMasuk = Schema::hasColumn('kamar_inap', 'tgl_masuk');
                $hasTglKeluar = Schema::hasColumn('kamar_inap', 'tgl_keluar');
                $hasSttsPulang = Schema::hasColumn('kamar_inap', 'stts_pulang');

                if ($hasTglMasuk) {
                    $rawatInap['masuk'] = (int) DB::table('kamar_inap')->whereDate('tgl_masuk', $today)->count();
                }

                if ($hasTglKeluar) {
                    $rawatInap['keluar'] = (int) DB::table('kamar_inap')
                        ->whereNotNull('tgl_keluar')
                        ->whereDate('tgl_keluar', $today)
                        ->count();
                }

                if ($hasSttsPulang) {
                    $rawatInap['total'] = (int) DB::table('kamar_inap')->where('stts_pulang', '-')->count();
                } elseif ($hasTglKeluar) {
                    $rawatInap['total'] = (int) DB::table('kamar_inap')->whereNull('tgl_keluar')->count();
                } else {
                    $rawatInap['total'] = (int) DB::table('kamar_inap')->count();
                }

                if (Schema::hasTable('kamar')) {
                    if (Schema::hasColumn('kamar', 'statusdata')) {
                        $rawatInap['bed_total'] = (int) DB::table('kamar')->where('statusdata', '1')->count();
                    } else {
                        $rawatInap['bed_total'] = (int) DB::table('kamar')->count();
                    }
                }

                if ($rawatInap['bed_total'] > 0) {
                    $rawatInap['okupansi_pct'] = (float) round(((float) $rawatInap['total'] / (float) $rawatInap['bed_total']) * 100, 1);
                }

                if ($hasTglMasuk) {
                    $since = now()->subDays(30)->toDateString();
                    if ($hasTglKeluar) {
                        $avg = DB::table('kamar_inap')
                            ->whereDate('tgl_masuk', '>=', $since)
                            ->selectRaw(
                                'AVG(CASE WHEN tgl_keluar IS NOT NULL THEN DATEDIFF(tgl_keluar, tgl_masuk) ELSE DATEDIFF(?, tgl_masuk) END) as avg_los',
                                [$today]
                            )
                            ->value('avg_los');
                    } else {
                        $avg = DB::table('kamar_inap')
                            ->whereDate('tgl_masuk', '>=', $since)
                            ->selectRaw('AVG(DATEDIFF(?, tgl_masuk)) as avg_los', [$today])
                            ->value('avg_los');
                    }
                    $rawatInap['avg_los_days'] = (float) round((float) ($avg ?? 0), 1);
                }

                $occupiedYesterday = 0;
                if ($hasSttsPulang && $hasTglMasuk) {
                    $occupiedYesterday = (int) DB::table('kamar_inap')
                        ->where('stts_pulang', '-')
                        ->whereDate('tgl_masuk', '<=', $yesterday)
                        ->count();
                } elseif ($hasTglMasuk && $hasTglKeluar) {
                    $occupiedYesterday = (int) DB::table('kamar_inap')
                        ->whereDate('tgl_masuk', '<=', $yesterday)
                        ->where(function ($q) use ($yesterday) {
                            $q->whereNull('tgl_keluar')->orWhereDate('tgl_keluar', '>', $yesterday);
                        })
                        ->count();
                }

                $rawatInap['delta_pct'] = (float) $deltaPct($rawatInap['total'], $occupiedYesterday);
            }
        } catch (Throwable $e) {
        }

        return Inertia::render('Laporan/Home', [
            'summary' => [
                'date' => $today,
                'updated_at' => $updatedAt,
                'rawat_jalan' => $rawatJalan,
                'rawat_inap' => $rawatInap,
                'igd' => $igd,
                'tren_ralan' => $this->getTrendData('ralan'),
                'tren_ranap' => $this->getTrendData('ranap'),
            ],
        ]);
    }

    public function getStats(\Illuminate\Http\Request $request)
    {
        $type = $request->input('type'); // ralan, ranap, igd
        $period = $request->input('period', 'today'); // today, week, month, year

        $now = now();
        $start = $now->copy()->startOfDay();
        $end = $now->copy()->endOfDay();
        $prevStart = $now->copy()->subDay()->startOfDay();
        $prevEnd = $now->copy()->subDay()->endOfDay();

        switch ($period) {
            case 'week':
                $start = $now->copy()->startOfWeek();
                $end = $now->copy()->endOfWeek();
                $prevStart = $start->copy()->subWeek();
                $prevEnd = $end->copy()->subWeek();
                break;
            case 'month':
                $start = $now->copy()->startOfMonth();
                $end = $now->copy()->endOfMonth();
                $prevStart = $start->copy()->subMonth();
                $prevEnd = $end->copy()->subMonth();
                break;
            case 'year':
                $start = $now->copy()->startOfYear();
                $end = $now->copy()->endOfYear();
                $prevStart = $start->copy()->subYear();
                $prevEnd = $end->copy()->subYear();
                break;
        }

        $deltaPct = function ($current, $previous) {
            $c = (float) ($current ?? 0);
            $p = (float) ($previous ?? 0);
            if ($p <= 0) return $c > 0 ? 100.0 : 0.0;
            return round((($c - $p) / $p) * 100, 1);
        };

        $data = [];

        try {
            if ($type === 'ralan') {
                if (Schema::hasTable('reg_periksa')) {
                    $qCurrent = DB::table('reg_periksa')
                        ->whereBetween('tgl_registrasi', [$start->toDateString(), $end->toDateString()])
                        ->where('status_lanjut', 'Ralan');
                    $qPrev = DB::table('reg_periksa')
                        ->whereBetween('tgl_registrasi', [$prevStart->toDateString(), $prevEnd->toDateString()])
                        ->where('status_lanjut', 'Ralan');

                    if (Schema::hasColumn('reg_periksa', 'kd_poli')) {
                        $qCurrent->where('kd_poli', '!=', 'IGDK');
                        $qPrev->where('kd_poli', '!=', 'IGDK');
                    }

                    $data['total'] = (int) (clone $qCurrent)->count();
                    $prevTotal = (int) (clone $qPrev)->count();
                    $data['delta_pct'] = (float) $deltaPct($data['total'], $prevTotal);

                    if (Schema::hasColumn('reg_periksa', 'stts_daftar')) {
                        $data['baru'] = (int) (clone $qCurrent)->where('stts_daftar', 'Baru')->count();
                        $data['lama'] = (int) (clone $qCurrent)->where('stts_daftar', 'Lama')->count();
                    } elseif (Schema::hasColumn('reg_periksa', 'status_poli')) {
                        $data['baru'] = (int) (clone $qCurrent)->where('status_poli', 'Baru')->count();
                        $data['lama'] = (int) (clone $qCurrent)->where('status_poli', 'Lama')->count();
                    } else {
                         $data['baru'] = 0;
                         $data['lama'] = 0;
                    }

                    // Avg Daily
                    if ($period === 'today') {
                        $since30 = now()->subDays(30)->toDateString();
                        $qRalan30 = DB::table('reg_periksa')
                             ->whereBetween('tgl_registrasi', [$since30, $now->subDay()->toDateString()])
                             ->where('status_lanjut', 'Ralan');
                        if (Schema::hasColumn('reg_periksa', 'kd_poli')) {
                            $qRalan30->where('kd_poli', '!=', 'IGDK');
                        }
                        $data['avg_daily'] = round($qRalan30->count() / 30, 1);
                    } else {
                        $days = max(1, $start->diffInDays(min($now, $end)) + 1);
                        $data['avg_daily'] = round($data['total'] / $days, 1);
                    }
                }
            } elseif ($type === 'igd') {
                 if (Schema::hasTable('reg_periksa') && Schema::hasColumn('reg_periksa', 'kd_poli')) {
                    $qCurrent = DB::table('reg_periksa')
                        ->whereBetween('tgl_registrasi', [$start->toDateString(), $end->toDateString()])
                        ->where('kd_poli', 'IGDK');
                    $qPrev = DB::table('reg_periksa')
                        ->whereBetween('tgl_registrasi', [$prevStart->toDateString(), $prevEnd->toDateString()])
                        ->where('kd_poli', 'IGDK');

                    $data['total'] = (int) (clone $qCurrent)->count();
                    $prevTotal = (int) (clone $qPrev)->count();
                    $data['delta_pct'] = (float) $deltaPct($data['total'], $prevTotal);

                    if (Schema::hasColumn('reg_periksa', 'status_lanjut')) {
                        $data['lanjut_ranap'] = (int) (clone $qCurrent)->where('status_lanjut', 'Ranap')->count();
                        $data['pulang'] = (int) (clone $qCurrent)->where('status_lanjut', 'Ralan')->count();
                    } else {
                        $data['lanjut_ranap'] = 0;
                        $data['pulang'] = 0;
                    }

                    // Avg Daily
                    if ($period === 'today') {
                        $since30 = now()->subDays(30)->toDateString();
                        $qIgd30 = DB::table('reg_periksa')
                             ->whereBetween('tgl_registrasi', [$since30, $now->subDay()->toDateString()])
                             ->where('kd_poli', 'IGDK');
                        $data['avg_daily'] = round($qIgd30->count() / 30, 1);
                    } else {
                        $days = max(1, $start->diffInDays(min($now, $end)) + 1);
                        $data['avg_daily'] = round($data['total'] / $days, 1);
                    }
                 }
            } elseif ($type === 'ranap') {
                 if (Schema::hasTable('kamar_inap')) {
                    $hasTglMasuk = Schema::hasColumn('kamar_inap', 'tgl_masuk');
                    $hasTglKeluar = Schema::hasColumn('kamar_inap', 'tgl_keluar');
                    
                    if ($hasTglMasuk) {
                        $data['masuk'] = (int) DB::table('kamar_inap')
                            ->whereBetween('tgl_masuk', [$start->toDateString(), $end->toDateString()])
                            ->count();
                    } else { $data['masuk'] = 0; }

                    if ($hasTglKeluar) {
                        $data['keluar'] = (int) DB::table('kamar_inap')
                            ->whereNotNull('tgl_keluar')
                            ->whereBetween('tgl_keluar', [$start->toDateString(), $end->toDateString()])
                            ->count();
                    } else { $data['keluar'] = 0; }

                    $hasSttsPulang = Schema::hasColumn('kamar_inap', 'stts_pulang');
                    if ($hasSttsPulang) {
                        $data['total'] = (int) DB::table('kamar_inap')->where('stts_pulang', '-')->count();
                    } elseif ($hasTglKeluar) {
                        $data['total'] = (int) DB::table('kamar_inap')->whereNull('tgl_keluar')->count();
                    } else {
                        $data['total'] = (int) DB::table('kamar_inap')->count();
                    }

                    if (Schema::hasTable('kamar')) {
                         $data['bed_total'] = (int) (Schema::hasColumn('kamar', 'statusdata') 
                             ? DB::table('kamar')->where('statusdata', '1')->count()
                             : DB::table('kamar')->count());
                    } else { $data['bed_total'] = 0; }
                    
                    if ($data['bed_total'] > 0) {
                        $data['okupansi_pct'] = round(($data['total'] / $data['bed_total']) * 100, 1);
                    } else { $data['okupansi_pct'] = 0; }

                    if ($hasTglMasuk) {
                         if ($period === 'today') {
                             $since = now()->subDays(30)->toDateString();
                             $avg = DB::table('kamar_inap')
                                ->whereDate('tgl_masuk', '>=', $since)
                                ->selectRaw('AVG(DATEDIFF(COALESCE(tgl_keluar, ?), tgl_masuk)) as avg_los', [$now->toDateString()])
                                ->value('avg_los');
                         } else {
                             if ($hasTglKeluar) {
                                 $avg = DB::table('kamar_inap')
                                    ->whereNotNull('tgl_keluar')
                                    ->whereBetween('tgl_keluar', [$start->toDateString(), $end->toDateString()])
                                    ->selectRaw('AVG(DATEDIFF(tgl_keluar, tgl_masuk)) as avg_los')
                                    ->value('avg_los');
                             } else { $avg = 0; }
                         }
                         $data['avg_los_days'] = round((float) ($avg ?? 0), 1);
                    }

                    if ($period === 'today') {
                         $occupiedYesterday = 0;
                         $yesterdayDate = $now->copy()->subDay()->toDateString();
                         if ($hasSttsPulang && $hasTglMasuk) {
                            $occupiedYesterday = (int) DB::table('kamar_inap')->where('stts_pulang', '-')->whereDate('tgl_masuk', '<=', $yesterdayDate)->count();
                         }
                         $data['delta_pct'] = (float) $deltaPct($data['total'], $occupiedYesterday);
                    } else {
                         $prevMasuk = 0;
                         if ($hasTglMasuk) {
                             $prevMasuk = (int) DB::table('kamar_inap')
                                ->whereBetween('tgl_masuk', [$prevStart->toDateString(), $prevEnd->toDateString()])
                                ->count();
                         }
                         $data['delta_pct'] = (float) $deltaPct($data['masuk'], $prevMasuk);
                    }
                 }
            }
        } catch (Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json($data);
    }
    
    public function kunjunganRalanPage()
    {
        $listPoli = DB::table('poliklinik')->select('kd_poli', 'nm_poli')->where('status', '1')->orderBy('nm_poli')->get();
        $listDokter = DB::table('dokter')->select('kd_dokter', 'nm_dokter')->where('status', '1')->orderBy('nm_dokter')->get();
        $listPenjab = DB::table('penjab')->select('kd_pj', 'png_jawab')->where('status', '1')->orderBy('png_jawab')->get();

        return Inertia::render('Laporan/Ralan/Kunjungan', [
            'listPoli' => $listPoli,
            'listDokter' => $listDokter,
            'listPenjab' => $listPenjab,
        ]);
    }
    
    public function kunjunganRalanData(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $poli = trim($request->input('poli', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $status = trim($request->input('status', '')); // Baru/Lama/'' (semua)
        $excludeBatal = filter_var($request->input('exclude_batal', 'false'), FILTER_VALIDATE_BOOLEAN);
        $keyword = trim($request->input('q', ''));
        $nmKab = trim($request->input('kabupaten', ''));
        $nmKec = trim($request->input('kecamatan', ''));
        $nmKel = trim($request->input('kelurahan', ''));
        $sortBy = trim($request->input('sort_by', ''));
        $sortDir = strtolower(trim($request->input('sort_dir', 'asc')));
        
        try {
            $hasReg = Schema::hasTable('reg_periksa');
            $hasDokter = Schema::hasTable('dokter');
            $hasPasien = Schema::hasTable('pasien');
            $hasPoli = Schema::hasTable('poliklinik');
            $hasPenjab = Schema::hasTable('penjab');
            $hasStts = Schema::hasColumn('reg_periksa', 'stts');
            if (!$hasReg || !$hasDokter || !$hasPasien || !$hasPoli || !$hasPenjab) {
                return response()->json(['data' => []]);
            }
            
            $query = DB::table('reg_periksa')
                ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
                ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                ->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate])
                ->where('reg_periksa.status_lanjut', 'Ralan');
            
            if ($status !== '') {
                if (Schema::hasColumn('reg_periksa', 'stts_daftar')) {
                    $query->where('reg_periksa.stts_daftar', 'like', "%{$status}%");
                }
            }
            if ($excludeBatal && $hasStts) {
                $query->where('reg_periksa.stts', '<>', 'Batal');
            }
            
            $hasKab = Schema::hasTable('kabupaten');
            $hasKec = Schema::hasTable('kecamatan');
            $hasKel = Schema::hasTable('kelurahan');
            if ($hasKab && $hasKec && $hasKel) {
                $query
                    ->leftJoin('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
                    ->leftJoin('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
                    ->leftJoin('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel')
                    ->select(
                        'reg_periksa.no_rawat',
                        'reg_periksa.tgl_registrasi',
                        'reg_periksa.stts_daftar',
                        'dokter.nm_dokter',
                        'reg_periksa.no_rkm_medis',
                        'pasien.nm_pasien',
                        'poliklinik.nm_poli',
                        DB::raw('penjab.png_jawab as penjab'),
                        DB::raw('concat(pasien.alamat, ", ", kelurahan.nm_kel, ", ", kecamatan.nm_kec, ", ", kabupaten.nm_kab) as alamat'),
                        'pasien.jk',
                        DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                    );
                
                if ($nmKab !== '') $query->where('kabupaten.nm_kab', 'like', "%{$nmKab}%");
                if ($nmKec !== '') $query->where('kecamatan.nm_kec', 'like', "%{$nmKec}%");
                if ($nmKel !== '') $query->where('kelurahan.nm_kel', 'like', "%{$nmKel}%");
            } else {
                $query->select(
                    'reg_periksa.no_rawat',
                    'reg_periksa.tgl_registrasi',
                    'reg_periksa.stts_daftar',
                    'dokter.nm_dokter',
                    'reg_periksa.no_rkm_medis',
                    'pasien.nm_pasien',
                    'poliklinik.nm_poli',
                    DB::raw('penjab.png_jawab as penjab'),
                    DB::raw('pasien.alamat as alamat'),
                    'pasien.jk',
                    DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                );
            }
            
            if ($poli !== '') {
                $query->where('reg_periksa.kd_poli', $poli);
            }
            if ($dokter !== '') {
                $query->where('reg_periksa.kd_dokter', $dokter);
            }
            if ($penjab !== '') {
                $query->where('reg_periksa.kd_pj', $penjab);
            }
            
            if ($keyword !== '') {
                $query->where(function ($q) use ($keyword) {
                    $q->where('poliklinik.nm_poli', 'like', "%{$keyword}%")
                      ->orWhere('dokter.nm_dokter', 'like', "%{$keyword}%")
                      ->orWhere('reg_periksa.no_rkm_medis', 'like', "%{$keyword}%")
                      ->orWhere('pasien.nm_pasien', 'like', "%{$keyword}%")
                      ->orWhere('pasien.alamat', 'like', "%{$keyword}%");
                });
            }
            
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit') && Schema::hasColumn('diagnosa_pasien', 'prioritas')) {
                $dpmin = DB::raw("
                    (
                        SELECT dp.no_rawat, dp.kd_penyakit
                        FROM diagnosa_pasien dp
                        JOIN (
                            SELECT no_rawat, MIN(prioritas) AS minp
                            FROM diagnosa_pasien
                            GROUP BY no_rawat
                        ) x ON x.no_rawat = dp.no_rawat AND dp.prioritas = x.minp
                    ) AS dpmin
                ");
                $query->leftJoin($dpmin, 'dpmin.no_rawat', '=', 'reg_periksa.no_rawat')
                      ->leftJoin('penyakit', 'dpmin.kd_penyakit', '=', 'penyakit.kd_penyakit')
                      ->addSelect(
                          DB::raw('dpmin.kd_penyakit as kd_penyakit'),
                          DB::raw('penyakit.nm_penyakit as nm_penyakit')
                      );
            } else {
                $query->addSelect(DB::raw('NULL as kd_penyakit'), DB::raw('NULL as nm_penyakit'));
            }
            
            $allowedSorts = [
                'tgl_registrasi' => 'reg_periksa.tgl_registrasi',
                'no_rawat' => 'reg_periksa.no_rawat',
                'nm_pasien' => 'pasien.nm_pasien',
                'no_rkm_medis' => 'reg_periksa.no_rkm_medis',
                'jk' => 'pasien.jk',
                'umur' => 'reg_periksa.umurdaftar',
                'nm_dokter' => 'dokter.nm_dokter',
                'nm_poli' => 'poliklinik.nm_poli',
                'penjab' => 'penjab.png_jawab',
                'alamat' => 'pasien.alamat',
                'stts_daftar' => 'reg_periksa.stts_daftar',
            ];
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit')) {
                $allowedSorts['kd_penyakit'] = 'dpmin.kd_penyakit';
                $allowedSorts['nm_penyakit'] = 'penyakit.nm_penyakit';
            }
            if (!in_array($sortDir, ['asc', 'desc'])) {
                $sortDir = 'asc';
            }
            
            $perPage = $request->input('per_page', 50);
            if (array_key_exists($sortBy, $allowedSorts)) {
                $col = $allowedSorts[$sortBy];
                if ($col === 'reg_periksa.tgl_registrasi') {
                    $query->orderBy($col, $sortDir)->orderBy('reg_periksa.jam_reg', $sortDir);
                } else {
                    $query->orderBy($col, $sortDir);
                }
            } else {
                $query->orderBy('reg_periksa.tgl_registrasi', 'desc')->orderBy('reg_periksa.jam_reg', 'desc');
            }
            $rows = $query->paginate($perPage);
            return response()->json($rows);
        } catch (Throwable $e) {
            return response()->json(['data' => []]);
        }
    }

    public function kunjunganRalanPrint(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $poli = trim($request->input('poli', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $status = trim($request->input('status', ''));
        $excludeBatal = filter_var($request->input('exclude_batal', 'false'), FILTER_VALIDATE_BOOLEAN);
        $keyword = trim($request->input('q', ''));
        $nmKab = trim($request->input('kabupaten', ''));
        $nmKec = trim($request->input('kecamatan', ''));
        $nmKel = trim($request->input('kelurahan', ''));
        $sortBy = trim($request->input('sort_by', ''));
        $sortDir = strtolower(trim($request->input('sort_dir', 'asc')));

        try {
            $hasReg = Schema::hasTable('reg_periksa');
            $hasDokter = Schema::hasTable('dokter');
            $hasPasien = Schema::hasTable('pasien');
            $hasPoli = Schema::hasTable('poliklinik');
            $hasPenjab = Schema::hasTable('penjab');
            $hasStts = Schema::hasColumn('reg_periksa', 'stts');
            if (! $hasReg || ! $hasDokter || ! $hasPasien || ! $hasPoli || ! $hasPenjab) {
                return response('Tidak dapat mencetak: tabel referensi tidak lengkap', 500);
            }

            $query = DB::table('reg_periksa')
                ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->join('poliklinik', 'reg_periksa.kd_poli', '=', 'poliklinik.kd_poli')
                ->join('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj')
                ->whereBetween('reg_periksa.tgl_registrasi', [$startDate, $endDate])
                ->where('reg_periksa.status_lanjut', 'Ralan');

            if ($status !== '') {
                if (Schema::hasColumn('reg_periksa', 'stts_daftar')) {
                    $query->where('reg_periksa.stts_daftar', 'like', "%{$status}%");
                }
            }
            if ($excludeBatal && $hasStts) {
                $query->where('reg_periksa.stts', '<>', 'Batal');
            }

            $hasKab = Schema::hasTable('kabupaten');
            $hasKec = Schema::hasTable('kecamatan');
            $hasKel = Schema::hasTable('kelurahan');
            if ($hasKab && $hasKec && $hasKel) {
                $query
                    ->leftJoin('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
                    ->leftJoin('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
                    ->leftJoin('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel')
                    ->select(
                        'reg_periksa.no_rawat',
                        'reg_periksa.tgl_registrasi',
                        'reg_periksa.stts_daftar',
                        'dokter.nm_dokter',
                        'reg_periksa.no_rkm_medis',
                        'pasien.nm_pasien',
                        'poliklinik.nm_poli',
                        DB::raw('penjab.png_jawab as penjab'),
                        DB::raw('concat(pasien.alamat, ", ", kelurahan.nm_kel, ", ", kecamatan.nm_kec, ", ", kabupaten.nm_kab) as alamat'),
                        'pasien.jk',
                        DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur'
                        )
                    );
                if ($nmKab !== '') $query->where('kabupaten.nm_kab', 'like', "%{$nmKab}%");
                if ($nmKec !== '') $query->where('kecamatan.nm_kec', 'like', "%{$nmKec}%");
                if ($nmKel !== '') $query->where('kelurahan.nm_kel', 'like', "%{$nmKel}%");
            } else {
                $query->select(
                    'reg_periksa.no_rawat',
                    'reg_periksa.tgl_registrasi',
                    'reg_periksa.stts_daftar',
                    'dokter.nm_dokter',
                    'reg_periksa.no_rkm_medis',
                    'pasien.nm_pasien',
                    'poliklinik.nm_poli',
                    DB::raw('penjab.png_jawab as penjab'),
                    DB::raw('pasien.alamat as alamat'),
                    'pasien.jk',
                    DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                );
            }

            if ($poli !== '') $query->where('reg_periksa.kd_poli', $poli);
            if ($dokter !== '') $query->where('reg_periksa.kd_dokter', $dokter);
            if ($penjab !== '') $query->where('reg_periksa.kd_pj', $penjab);

            if ($keyword !== '') {
                $query->where(function ($q) use ($keyword) {
                    $q->where('poliklinik.nm_poli', 'like', "%{$keyword}%")
                        ->orWhere('dokter.nm_dokter', 'like', "%{$keyword}%")
                        ->orWhere('reg_periksa.no_rkm_medis', 'like', "%{$keyword}%")
                        ->orWhere('pasien.nm_pasien', 'like', "%{$keyword}%")
                        ->orWhere('pasien.alamat', 'like', "%{$keyword}%");
                });
            }

            // Diagnosa utama jika tersedia
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit') && Schema::hasColumn('diagnosa_pasien', 'prioritas')) {
                $dpmin = DB::raw("
                    (
                        SELECT dp.no_rawat, dp.kd_penyakit
                        FROM diagnosa_pasien dp
                        JOIN (
                            SELECT no_rawat, MIN(prioritas) AS minp
                            FROM diagnosa_pasien
                            GROUP BY no_rawat
                        ) x ON x.no_rawat = dp.no_rawat AND dp.prioritas = x.minp
                    ) AS dpmin
                ");
                $query->leftJoin($dpmin, 'dpmin.no_rawat', '=', 'reg_periksa.no_rawat')
                    ->leftJoin('penyakit', 'dpmin.kd_penyakit', '=', 'penyakit.kd_penyakit')
                    ->addSelect(
                        DB::raw('dpmin.kd_penyakit as kd_penyakit'),
                        DB::raw('penyakit.nm_penyakit as nm_penyakit')
                    );
            } else {
                $query->addSelect(DB::raw('NULL as kd_penyakit'), DB::raw('NULL as nm_penyakit'));
            }

            // Sorting
            $allowedSorts = [
                'tgl_registrasi' => 'reg_periksa.tgl_registrasi',
                'no_rawat' => 'reg_periksa.no_rawat',
                'nm_pasien' => 'pasien.nm_pasien',
                'no_rkm_medis' => 'reg_periksa.no_rkm_medis',
                'jk' => 'pasien.jk',
                'umur' => 'reg_periksa.umurdaftar',
                'nm_dokter' => 'dokter.nm_dokter',
                'nm_poli' => 'poliklinik.nm_poli',
                'penjab' => 'penjab.png_jawab',
                'alamat' => 'pasien.alamat',
                'stts_daftar' => 'reg_periksa.stts_daftar',
            ];
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit')) {
                $allowedSorts['kd_penyakit'] = 'dpmin.kd_penyakit';
                $allowedSorts['nm_penyakit'] = 'penyakit.nm_penyakit';
            }
            if (! in_array($sortDir, ['asc', 'desc'])) $sortDir = 'asc';
            if (array_key_exists($sortBy, $allowedSorts)) {
                $col = $allowedSorts[$sortBy];
                if ($col === 'reg_periksa.tgl_registrasi') {
                    $query->orderBy($col, $sortDir)->orderBy('reg_periksa.jam_reg', $sortDir);
                } else {
                    $query->orderBy($col, $sortDir);
                }
            } else {
                $query->orderBy('reg_periksa.tgl_registrasi', 'desc')->orderBy('reg_periksa.jam_reg', 'desc');
            }

            $rows = $query->get();

            // Ringkasan
            $total = count($rows);
            $baru = collect($rows)->where('stts_daftar', 'Baru')->count();
            $lama = collect($rows)->where('stts_daftar', 'Lama')->count();
            $laki = collect($rows)->where('jk', 'L')->count();
            $perempuan = collect($rows)->where('jk', 'P')->count();

            // Setting RS
            $setting = null;
            if (Schema::hasTable('setting')) {
                $fields = [];
                foreach (['logo', 'nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email'] as $col) {
                    if (Schema::hasColumn('setting', $col)) $fields[] = $col;
                }
                if (! empty($fields)) {
                    $row = DB::table('setting')->select($fields)->orderBy('nama_instansi')->first();
                    if ($row) {
                        $setting = [];
                        foreach ($fields as $f) {
                            $setting[$f] = $row->{$f} ?? null;
                        }
                    }
                }
            }

            $periodeStr = date('d-m-Y', strtotime($startDate)).' s.d. '.date('d-m-Y', strtotime($endDate));

            $pdf = Pdf::loadView('reports.kunjungan_ralan', [
                'setting' => $setting,
                'periode' => $periodeStr,
                'summary' => [
                    'total' => $total,
                    'baru' => $baru,
                    'lama' => $lama,
                    'laki' => $laki,
                    'perempuan' => $perempuan,
                ],
                'rows' => $rows,
            ])->setPaper('a4', 'landscape');

            return $pdf->stream('KunjunganRalan.pdf');
        } catch (Throwable $e) {
            return response('Terjadi kesalahan saat mencetak: '.$e->getMessage(), 500);
        }
    }

    public function kunjunganRanapPage()
    {
        $listBangsal = DB::table('bangsal')->select('kd_bangsal', 'nm_bangsal')->where('status', '1')->orderBy('nm_bangsal')->get();
        $listDokter = DB::table('dokter')->select('kd_dokter', 'nm_dokter')->where('status', '1')->orderBy('nm_dokter')->get();
        $listPenjab = DB::table('penjab')->select('kd_pj', 'png_jawab')->where('status', '1')->orderBy('png_jawab')->get();

        return Inertia::render('Laporan/Ranap/Kunjungan', [
            'listBangsal' => $listBangsal,
            'listDokter' => $listDokter,
            'listPenjab' => $listPenjab,
        ]);
    }

    public function kunjunganRanapData(Request $request)
    {
        // Default tarik data 6 bulan ke belakang untuk RANAP karena durasi rawat bisa lama
        $startDate = $request->input('start_date', now()->subMonths(6)->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $bangsal = trim($request->input('bangsal', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $status = trim($request->input('status', '')); // Status Pulang
        $keyword = trim($request->input('q', ''));
        $sortBy = trim($request->input('sort_by', ''));
        $sortDir = strtolower(trim($request->input('sort_dir', 'asc')));
        $filterBy = $request->input('filter_by', 'masuk'); // masuk | keluar

        try {
            $hasInap = Schema::hasTable('kamar_inap');
            $hasReg = Schema::hasTable('reg_periksa');
            $hasDokter = Schema::hasTable('dokter');
            $hasPasien = Schema::hasTable('pasien');
            $hasKamar = Schema::hasTable('kamar');
            $hasBangsal = Schema::hasTable('bangsal');
            $hasPenjab = Schema::hasTable('penjab');

            if (!$hasInap || !$hasReg || !$hasDokter || !$hasPasien || !$hasKamar || !$hasBangsal || !$hasPenjab) {
                return response()->json(['data' => []]);
            }

            $query = DB::table('kamar_inap')
                ->join('reg_periksa', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                ->leftJoin('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->leftJoin('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->leftJoin('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                ->leftJoin('bangsal', 'kamar.kd_bangsal', '=', 'bangsal.kd_bangsal')
                ->leftJoin('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj');

            if ($filterBy === 'keluar') {
                $query->whereBetween('kamar_inap.tgl_keluar', [$startDate, $endDate]);
            } else {
                $query->whereBetween('kamar_inap.tgl_masuk', [$startDate, $endDate]);
            }

            if ($status !== '') {
                if ($status === '-') {
                    $query->where('kamar_inap.stts_pulang', '-');
                } else {
                    $query->where('kamar_inap.stts_pulang', $status);
                }
            }

            $hasKab = Schema::hasTable('kabupaten');
            $hasKec = Schema::hasTable('kecamatan');
            $hasKel = Schema::hasTable('kelurahan');
            if ($hasKab && $hasKec && $hasKel) {
                $query
                    ->leftJoin('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
                    ->leftJoin('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
                    ->leftJoin('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel')
                    ->select(
                        'kamar_inap.no_rawat',
                        'kamar_inap.tgl_masuk',
                        'kamar_inap.tgl_keluar',
                        'kamar_inap.stts_pulang',
                        'dokter.nm_dokter',
                        'reg_periksa.no_rkm_medis',
                        'pasien.nm_pasien',
                        'bangsal.nm_bangsal',
                        DB::raw('penjab.png_jawab as penjab'),
                        DB::raw('concat(pasien.alamat, ", ", kelurahan.nm_kel, ", ", kecamatan.nm_kec, ", ", kabupaten.nm_kab) as alamat'),
                        'pasien.jk',
                        DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                    );
            } else {
                $query->select(
                    'kamar_inap.no_rawat',
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.stts_pulang',
                    'dokter.nm_dokter',
                    'reg_periksa.no_rkm_medis',
                    'pasien.nm_pasien',
                    'bangsal.nm_bangsal',
                    DB::raw('penjab.png_jawab as penjab'),
                    DB::raw('pasien.alamat as alamat'),
                    'pasien.jk',
                    DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                );
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

            if ($keyword !== '') {
                $query->where(function ($q) use ($keyword) {
                    $q->where('bangsal.nm_bangsal', 'like', "%{$keyword}%")
                      ->orWhere('dokter.nm_dokter', 'like', "%{$keyword}%")
                      ->orWhere('reg_periksa.no_rkm_medis', 'like', "%{$keyword}%")
                      ->orWhere('pasien.nm_pasien', 'like', "%{$keyword}%")
                      ->orWhere('pasien.alamat', 'like', "%{$keyword}%");
                });
            }

            // Diagnosa utama
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit') && Schema::hasColumn('diagnosa_pasien', 'prioritas')) {
                $dpmin = DB::raw("
                    (
                        SELECT dp.no_rawat, dp.kd_penyakit
                        FROM diagnosa_pasien dp
                        JOIN (
                            SELECT no_rawat, MIN(prioritas) AS minp
                            FROM diagnosa_pasien
                            GROUP BY no_rawat
                        ) x ON x.no_rawat = dp.no_rawat AND dp.prioritas = x.minp
                    ) AS dpmin
                ");
                $query->leftJoin($dpmin, 'dpmin.no_rawat', '=', 'kamar_inap.no_rawat')
                      ->leftJoin('penyakit', 'dpmin.kd_penyakit', '=', 'penyakit.kd_penyakit')
                      ->addSelect(
                          DB::raw('dpmin.kd_penyakit as kd_penyakit'),
                          DB::raw('penyakit.nm_penyakit as nm_penyakit')
                      );
            } else {
                $query->addSelect(DB::raw('NULL as kd_penyakit'), DB::raw('NULL as nm_penyakit'));
            }

            $allowedSorts = [
                'tgl_masuk' => 'kamar_inap.tgl_masuk',
                'no_rawat' => 'kamar_inap.no_rawat',
                'nm_pasien' => 'pasien.nm_pasien',
                'no_rkm_medis' => 'reg_periksa.no_rkm_medis',
                'jk' => 'pasien.jk',
                'umur' => 'reg_periksa.umurdaftar',
                'nm_dokter' => 'dokter.nm_dokter',
                'nm_bangsal' => 'bangsal.nm_bangsal',
                'penjab' => 'penjab.png_jawab',
                'alamat' => 'pasien.alamat',
                'stts_pulang' => 'kamar_inap.stts_pulang',
            ];
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit')) {
                $allowedSorts['kd_penyakit'] = 'dpmin.kd_penyakit';
                $allowedSorts['nm_penyakit'] = 'penyakit.nm_penyakit';
            }
            if (!in_array($sortDir, ['asc', 'desc'])) {
                $sortDir = 'asc';
            }

            $perPage = $request->input('per_page', 50);
            if (array_key_exists($sortBy, $allowedSorts)) {
                $col = $allowedSorts[$sortBy];
                $query->orderBy($col, $sortDir);
            } else {
                $query->orderBy('kamar_inap.tgl_masuk', 'desc');
            }
            $rows = $query->paginate($perPage);
            return response()->json($rows);
        } catch (Throwable $e) {
            return response()->json(['data' => []]);
        }
    }

    public function kunjunganRanapPrint(Request $request)
    {
        // Default tarik data 1 tahun ke belakang untuk RANAP
        $startDate = $request->input('start_date', now()->subMonths(12)->toDateString());
        $endDate = $request->input('end_date', now()->toDateString());
        $bangsal = trim($request->input('bangsal', ''));
        $dokter = trim($request->input('dokter', ''));
        $penjab = trim($request->input('penjab', ''));
        $status = trim($request->input('status', ''));
        $keyword = trim($request->input('q', ''));
        $sortBy = trim($request->input('sort_by', ''));
        $sortDir = strtolower(trim($request->input('sort_dir', 'asc')));
        $filterBy = $request->input('filter_by', 'masuk');

        try {
            $hasInap = Schema::hasTable('kamar_inap');
            $hasReg = Schema::hasTable('reg_periksa');
            $hasDokter = Schema::hasTable('dokter');
            $hasPasien = Schema::hasTable('pasien');
            $hasKamar = Schema::hasTable('kamar');
            $hasBangsal = Schema::hasTable('bangsal');
            $hasPenjab = Schema::hasTable('penjab');

            if (!$hasInap || !$hasReg || !$hasDokter || !$hasPasien || !$hasKamar || !$hasBangsal || !$hasPenjab) {
                return response('Tidak dapat mencetak: tabel referensi tidak lengkap', 500);
            }

            $query = DB::table('kamar_inap')
                ->join('reg_periksa', 'kamar_inap.no_rawat', '=', 'reg_periksa.no_rawat')
                ->leftJoin('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
                ->leftJoin('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
                ->leftJoin('kamar', 'kamar_inap.kd_kamar', '=', 'kamar.kd_kamar')
                ->leftJoin('bangsal', 'kamar.kd_bangsal', '=', 'bangsal.kd_bangsal')
                ->leftJoin('penjab', 'reg_periksa.kd_pj', '=', 'penjab.kd_pj');

            if ($filterBy === 'keluar') {
                $query->whereBetween('kamar_inap.tgl_keluar', [$startDate, $endDate]);
            } else {
                $query->whereBetween('kamar_inap.tgl_masuk', [$startDate, $endDate]);
            }

            if ($status !== '') {
                if ($status === '-') {
                    $query->where('kamar_inap.stts_pulang', '-');
                } else {
                    $query->where('kamar_inap.stts_pulang', $status);
                }
            }

            $hasKab = Schema::hasTable('kabupaten');
            $hasKec = Schema::hasTable('kecamatan');
            $hasKel = Schema::hasTable('kelurahan');
            if ($hasKab && $hasKec && $hasKel) {
                $query
                    ->leftJoin('kabupaten', 'pasien.kd_kab', '=', 'kabupaten.kd_kab')
                    ->leftJoin('kecamatan', 'pasien.kd_kec', '=', 'kecamatan.kd_kec')
                    ->leftJoin('kelurahan', 'pasien.kd_kel', '=', 'kelurahan.kd_kel')
                    ->select(
                        'kamar_inap.no_rawat',
                        'kamar_inap.tgl_masuk',
                        'kamar_inap.tgl_keluar',
                        'kamar_inap.stts_pulang',
                        'dokter.nm_dokter',
                        'reg_periksa.no_rkm_medis',
                        'pasien.nm_pasien',
                        'bangsal.nm_bangsal',
                        DB::raw('penjab.png_jawab as penjab'),
                        DB::raw('concat(pasien.alamat, ", ", kelurahan.nm_kel, ", ", kecamatan.nm_kec, ", ", kabupaten.nm_kab) as alamat'),
                        'pasien.jk',
                        DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                    );
            } else {
                $query->select(
                    'kamar_inap.no_rawat',
                    'kamar_inap.tgl_masuk',
                    'kamar_inap.tgl_keluar',
                    'kamar_inap.stts_pulang',
                    'dokter.nm_dokter',
                    'reg_periksa.no_rkm_medis',
                    'pasien.nm_pasien',
                    'bangsal.nm_bangsal',
                    DB::raw('penjab.png_jawab as penjab'),
                    DB::raw('pasien.alamat as alamat'),
                    'pasien.jk',
                    DB::raw('concat(reg_periksa.umurdaftar, " ", reg_periksa.sttsumur) as umur')
                );
            }

            if ($bangsal !== '') $query->where('bangsal.kd_bangsal', $bangsal);
            if ($dokter !== '') $query->where('reg_periksa.kd_dokter', $dokter);
            if ($penjab !== '') $query->where('reg_periksa.kd_pj', $penjab);

            if ($keyword !== '') {
                $query->where(function ($q) use ($keyword) {
                    $q->where('bangsal.nm_bangsal', 'like', "%{$keyword}%")
                      ->orWhere('dokter.nm_dokter', 'like', "%{$keyword}%")
                      ->orWhere('reg_periksa.no_rkm_medis', 'like', "%{$keyword}%")
                      ->orWhere('pasien.nm_pasien', 'like', "%{$keyword}%")
                      ->orWhere('pasien.alamat', 'like', "%{$keyword}%");
                });
            }

            // Diagnosa utama
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit') && Schema::hasColumn('diagnosa_pasien', 'prioritas')) {
                $dpmin = DB::raw("
                    (
                        SELECT dp.no_rawat, dp.kd_penyakit
                        FROM diagnosa_pasien dp
                        JOIN (
                            SELECT no_rawat, MIN(prioritas) AS minp
                            FROM diagnosa_pasien
                            GROUP BY no_rawat
                        ) x ON x.no_rawat = dp.no_rawat AND dp.prioritas = x.minp
                    ) AS dpmin
                ");
                $query->leftJoin($dpmin, 'dpmin.no_rawat', '=', 'kamar_inap.no_rawat')
                      ->leftJoin('penyakit', 'dpmin.kd_penyakit', '=', 'penyakit.kd_penyakit')
                      ->addSelect(
                          DB::raw('dpmin.kd_penyakit as kd_penyakit'),
                          DB::raw('penyakit.nm_penyakit as nm_penyakit')
                      );
            } else {
                $query->addSelect(DB::raw('NULL as kd_penyakit'), DB::raw('NULL as nm_penyakit'));
            }

            $allowedSorts = [
                'tgl_masuk' => 'kamar_inap.tgl_masuk',
                'no_rawat' => 'kamar_inap.no_rawat',
                'nm_pasien' => 'pasien.nm_pasien',
                'no_rkm_medis' => 'reg_periksa.no_rkm_medis',
                'jk' => 'pasien.jk',
                'umur' => 'reg_periksa.umurdaftar',
                'nm_dokter' => 'dokter.nm_dokter',
                'nm_bangsal' => 'bangsal.nm_bangsal',
                'penjab' => 'penjab.png_jawab',
                'alamat' => 'pasien.alamat',
                'stts_pulang' => 'kamar_inap.stts_pulang',
            ];
            if (Schema::hasTable('diagnosa_pasien') && Schema::hasTable('penyakit')) {
                $allowedSorts['kd_penyakit'] = 'dpmin.kd_penyakit';
                $allowedSorts['nm_penyakit'] = 'penyakit.nm_penyakit';
            }
            if (!in_array($sortDir, ['asc', 'desc'])) $sortDir = 'asc';
            if (array_key_exists($sortBy, $allowedSorts)) {
                $col = $allowedSorts[$sortBy];
                $query->orderBy($col, $sortDir);
            } else {
                if ($filterBy === 'keluar') {
                    $query->orderBy('kamar_inap.tgl_keluar', 'desc');
                } else {
                    $query->orderBy('kamar_inap.tgl_masuk', 'desc');
                }
            }

            $rows = $query->get();

            // Ringkasan
            $total = count($rows);
            $laki = collect($rows)->where('jk', 'L')->count();
            $perempuan = collect($rows)->where('jk', 'P')->count();
            $baru = 0; // Default if not calculated
            $lama = 0; // Default

            // Setting RS
            $setting = null;
            if (Schema::hasTable('setting')) {
                $fields = [];
                foreach (['logo', 'nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi', 'kontak', 'email'] as $col) {
                    if (Schema::hasColumn('setting', $col)) $fields[] = $col;
                }
                if (! empty($fields)) {
                    $row = DB::table('setting')->select($fields)->orderBy('nama_instansi')->first();
                    if ($row) {
                        $setting = [];
                        foreach ($fields as $f) {
                            $setting[$f] = $row->{$f} ?? null;
                        }
                    }
                }
            }
            
            $periodeStr = date('d-m-Y', strtotime($startDate)).' s.d. '.date('d-m-Y', strtotime($endDate));

            $pdf = Pdf::loadView('reports.kunjungan_ranap', [
                'setting' => $setting,
                'periode' => $periodeStr,
                'summary' => [
                    'total' => $total,
                    'baru' => $baru,
                    'lama' => $lama,
                    'laki' => $laki,
                    'perempuan' => $perempuan,
                ],
                'rows' => $rows,
            ])->setPaper('a4', 'landscape');
            return $pdf->stream('KunjunganRanap.pdf');
        } catch (Throwable $e) {
            return response('Terjadi kesalahan saat mencetak: '.$e->getMessage(), 500);
        }
    }
}
