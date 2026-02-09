<?php

namespace App\Http\Controllers\SatuSehat;

use App\Http\Controllers\Controller;
use App\Models\Alergi\DataAlergi;
use App\Models\SatuSehat\SatuSehatMappingAlergi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SatuSehatAllergyMappingController extends Controller
{
    public function index()
    {
        return Inertia::render('SatuSehat/Prerequisites/MappingAlergiPasien', [
            'initialMappings' => SatuSehatMappingAlergi::all(),
            'itemAlergi' => DataAlergi::all()
        ]);
    }

    public function getMappings()
    {
        $mappings = SatuSehatMappingAlergi::all();
        return response()->json($mappings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'alergi_kode' => 'required|string',
            'nama_alergi' => 'required|string',
            'kfa_code' => 'nullable|string',
            'kfa_display' => 'nullable|string',
            'snomed_code' => 'nullable|string',
            'snomed_display' => 'nullable|string',
            'manifestation_code' => 'nullable|string',
            'manifestation_display' => 'nullable|string',
            'category' => 'required|string|in:medication,food,environment,biologic',
            'criticality' => 'required|string|in:low,high,unable-to-assess',
        ]);

        $mapping = SatuSehatMappingAlergi::updateOrCreate(
            ['alergi_kode' => $validated['alergi_kode']],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Mapping berhasil disimpan',
            'data' => $mapping
        ]);
    }

    public function destroy($id)
    {
        $mapping = SatuSehatMappingAlergi::findOrFail($id);
        $mapping->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mapping berhasil dihapus'
        ]);
    }

    /**
     * Cari kode KFA atau SNOMED berdasarkan nama alergi (Logic otomatis)
     */
    public function lookup(Request $request)
    {
        $query = $request->query('q');
        if (!$query) return response()->json([]);

        $lower = strtolower($query);
        $results = [
            'kfa' => null,
            'snomed' => null,
            'manifestation' => null,
            'category' => 'environment',
            'criticality' => 'unable-to-assess'
        ];

        // 1. Cari di ref substance (untuk SNOMED)
        $refSubstance = DB::table('satu_sehat_ref_allergy')
            ->where('display', 'like', "%{$query}%")
            ->first();
        
        if ($refSubstance) {
            $results['snomed'] = [
                'code' => $refSubstance->kode,
                'display' => $refSubstance->display
            ];
        }

        // 2. Cari di ref reaction (untuk Manifestation)
        // Kita coba cari yang mirip dengan query, atau mungkin pencarian terpisah?
        // Untuk auto-lookup saat pilih alergi, kita coba cari manifestation yang relevan.
        // Tapi biasanya manifestation dicari terpisah.
        // Sementara kita biarkan null atau cari tebakan.

        // Logika Tebakan Kategori
        if (str_contains($lower, 'amox') || str_contains($lower, 'obat') || str_contains($lower, 'cefa')) {
            $results['category'] = 'medication';
            $results['criticality'] = 'high';
        } elseif (str_contains($lower, 'udang') || str_contains($lower, 'makan') || str_contains($lower, 'telur')) {
            $results['category'] = 'food';
        }

        return response()->json($results);
    }
    public function searchSubstance(Request $request)
    {
        $query = $request->query('q');
        if (!$query) return response()->json([]);

        $results = DB::table('satu_sehat_ref_allergy')
            ->where('display', 'like', "%{$query}%")
            ->orWhere('kode', 'like', "{$query}%")
            ->limit(20)
            ->get();

        return response()->json($results);
    }

    public function searchManifestation(Request $request)
    {
        $query = $request->query('q');
        if (!$query) return response()->json([]);

        $results = DB::table('satu_sehat_ref_allergy_reaction')
            ->where('display', 'like', "%{$query}%")
            ->orWhere('kode', 'like', "{$query}%")
            ->limit(20)
            ->get();

        return response()->json($results);
    }
}

