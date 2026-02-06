<?php

namespace App\Http\Controllers\Farmasi;

use App\Http\Controllers\Controller;
use App\Models\Farmasi\TemplatePemeriksaanDokter;
use App\Models\Farmasi\TemplateRacikan;
use App\Models\Farmasi\TemplateRacikanDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TemplateRacikanController extends Controller
{
    /**
     * Get list of templates for a doctor
     */
    public function index(Request $request)
    {
        $kd_dokter = $request->input('kd_dokter');
        
        $templates = TemplateRacikan::query()
            ->join('template_pemeriksaan_dokter', 'template_pemeriksaan_dokter.no_template', '=', 'template_pemeriksaan_dokter_resep_racikan.no_template')
            ->when($kd_dokter, function($q) use ($kd_dokter) {
                return $q->where('template_pemeriksaan_dokter.kd_dokter', $kd_dokter);
            })
            ->select('template_pemeriksaan_dokter_resep_racikan.*')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $templates
        ]);
    }

    /**
     * Store a new template from the current prescription form
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_racik' => 'required|string|max:100',
            'kd_racik' => 'required|exists:metode_racik,kd_racik',
            'kd_dokter' => 'required',
            'items' => 'required|array|min:1',
            'items.*.kode_brng' => 'required|exists:databarang,kode_brng',
            'jml_dr' => 'required|numeric',
        ]);

        try {
            DB::beginTransaction();

            // Generate no_template (Simple unique ID based on timestamp and random)
            $no_template = 'T' . date('YmdHis') . rand(10,99);

            // 1. Create Master Header
            TemplatePemeriksaanDokter::create([
                'no_template' => $no_template,
                'kd_dokter' => $request->kd_dokter,
                'rencana' => $request->nama_racik, // Using 'rencana' as placeholder for template name group
                'instruksi' => '',
            ]);

            // 2. Create Racikan Header
            TemplateRacikan::create([
                'no_template' => $no_template,
                'no_racik' => '1',
                'nama_racik' => $request->nama_racik,
                'kd_racik' => $request->kd_racik,
                'jml_dr' => $request->jml_dr,
                'aturan_pakai' => $request->aturan_pakai ?? '',
                'keterangan' => $request->keterangan ?? '',
            ]);

            // 3. Create Details
            foreach ($request->items as $item) {
                TemplateRacikanDetail::create([
                    'no_template' => $no_template,
                    'no_racik' => '1',
                    'kode_brng' => $item['kode_brng'],
                    'p1' => $item['p1'] ?? 1,
                    'p2' => $item['p2'] ?? 1,
                    'kandungan' => $item['kandungan'] ?? 0,
                    'jml' => $item['jml'] ?? 0,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Template berhasil disimpan',
                'data' => [
                    'no_template' => $no_template
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Store Template Racikan Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan template: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show template details with latest stock
     */
    public function show($no_template, Request $request)
    {
        $kd_poli = $request->input('kd_poli');
        $no_racik = $request->input('no_racik', '1');

        $header = TemplateRacikan::where('no_template', $no_template)
            ->where('no_racik', $no_racik)
            ->firstOrFail();

        // 1. Tentukan kd_bangsal yang digunakan untuk cek stok
        $targetBangsal = [];
        if ($kd_poli) {
            $targetBangsal = DB::table('set_depo_ralan')
                ->where('kd_poli', $kd_poli)
                ->pluck('kd_bangsal')
                ->toArray();
        }

        // 2. Fallback ke pengaturan umum jika mapping ralan tidak ditemukan
        if (empty($targetBangsal)) {
            $setLokasi = \App\Models\Farmasi\SetLokasi::first();
            if ($setLokasi) {
                $targetBangsal = [$setLokasi->kd_bangsal];
            }
        }

        // Get details with stock join
        $details = DB::table('template_pemeriksaan_dokter_resep_racikan_detail as td')
            ->join('databarang as b', 'b.kode_brng', '=', 'td.kode_brng')
            ->leftJoin('gudangbarang as g', function($join) use ($targetBangsal) {
                $join->on('g.kode_brng', '=', 'td.kode_brng');
                if (!empty($targetBangsal)) {
                    $join->whereIn('g.kd_bangsal', $targetBangsal);
                }
            })
            ->where('td.no_template', $no_template)
            ->where('td.no_racik', $no_racik)
            ->select(
                'td.*',
                'b.nama_brng',
                'b.kode_satbesar as satuan',
                'b.kapasitas',
                DB::raw('COALESCE(SUM(g.stok), 0) as stok_tersedia')
            )
            ->groupBy('td.kode_brng', 'td.no_template', 'td.no_racik', 'td.p1', 'td.p2', 'td.kandungan', 'td.jml')
            ->get();

        // Check if any item is out of stock
        $outOfStock = $details->filter(function($it) {
            return $it->stok_tersedia <= 0;
        });

        return response()->json([
            'success' => true,
            'data' => [
                'header' => $header,
                'items' => $details,
                'stock_alert' => $outOfStock->count() > 0,
                'out_of_stock_items' => $outOfStock->values()
            ]
        ]);
    }

    /**
     * Delete a template
     */
    public function destroy($no_template)
    {
        try {
            DB::beginTransaction();
            TemplateRacikanDetail::where('no_template', $no_template)->delete();
            TemplateRacikan::where('no_template', $no_template)->delete();
            TemplatePemeriksaanDokter::where('no_template', $no_template)->delete();
            DB::commit();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
