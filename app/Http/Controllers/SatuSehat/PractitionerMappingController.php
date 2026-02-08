<?php

namespace App\Http\Controllers\SatuSehat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Traits\SatuSehatTraits;

class PractitionerMappingController extends Controller
{
    use SatuSehatTraits;

    /**
     * Get all practitioner mappings (with pagination)
     */
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $perPage = $request->query('per_page', 20);

        $query = DB::table('satusehat_mapping_practitioner')
            ->select('id', 'nama', 'nik', 'satusehat_id', 'created_at', 'updated_at');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        $data = $query->orderBy('nama')->paginate($perPage);

        return response()->json($data);
    }

    /**
     * Get single mapping by ID
     */
    public function show($id)
    {
        $mapping = DB::table('satusehat_mapping_practitioner')
            ->where('id', $id)
            ->first();

        if (!$mapping) {
            return response()->json(['message' => 'Mapping tidak ditemukan'], 404);
        }

        return response()->json(['data' => $mapping]);
    }

    /**
     * Search only (GET) for Practitioner.jsx component usage
     */
    public function searchOnly(Request $request)
    {
        $nik = $request->query('nik');
        if (!$nik) {
            return response()->json(['ok' => false, 'message' => 'NIK required'], 400);
        }

        try {
            $response = $this->satusehatRequest('GET', 'Practitioner', null, [
                'query' => ['identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nik]
            ]);

            if (!$response['ok']) {
                return response()->json([
                    'ok' => false, 
                    'message' => 'Gagal mencari Practitioner di SATU SEHAT',
                    'error' => $response['error'] ?? 'Unknown error'
                ], 500);
            }

            $entries = $response['json']['entry'] ?? [];
            if (empty($entries)) {
                return response()->json(['ok' => true, 'list' => []]);
            }

            // Return standardized format for frontend
            $list = [];
            foreach ($entries as $entry) {
                $resource = $entry['resource'];
                $list[] = [
                    'id' => $resource['id'],
                    'identifier' => $resource['identifier'] ?? [],
                    'name' => $this->formatName($resource['name'] ?? []),
                    'gender' => $resource['gender'] ?? '-',
                    'birthDate' => $resource['birthDate'] ?? '-',
                    'telecom' => $resource['telecom'] ?? [],
                    'address' => $resource['address'] ?? [],
                    'json' => $resource
                ];
            }

            return response()->json(['ok' => true, 'list' => $list]);

        } catch (\Throwable $e) {
            Log::error('[PRACTITIONER SEARCH] Error', [
                'nik' => $nik, 
                'error' => $e->getMessage()
            ]);
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Helper to format name
     */
    private function formatName($nameArray)
    {
        if (empty($nameArray)) return '-';
        if (isset($nameArray[0]['text'])) return $nameArray[0]['text'];
        
        $given = implode(' ', $nameArray[0]['given'] ?? []);
        $family = $nameArray[0]['family'] ?? '';
        return trim("$given $family");
    }

    /**
     * Search and create mapping from SATU SEHAT by NIK
     * This will search the practitioner from SATU SEHAT API and create mapping
     */
    public function searchAndCreate(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|max:20',
        ]);

        $nik = $validated['nik'];

        // Check if already exists
        $existing = DB::table('satusehat_mapping_practitioner')
            ->where('nik', $nik)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Mapping sudah ada',
                'data' => $existing
            ], 200);
        }

        // Search from SATU SEHAT
        try {
            $response = $this->satusehatRequest('GET', 'Practitioner', null, [
                'query' => ['identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nik]
            ]);

            if (!$response['ok']) {
                return response()->json([
                    'message' => 'Gagal mencari Practitioner di SATU SEHAT',
                    'error' => $response['error'] ?? 'Unknown error'
                ], 500);
            }

            // Get first entry
            $entries = $response['json']['entry'] ?? [];
            if (empty($entries)) {
                return response()->json([
                    'message' => 'Practitioner dengan NIK tersebut tidak ditemukan di SATU SEHAT'
                ], 404);
            }

            $practitioner = $entries[0]['resource'] ?? null;
            if (!$practitioner) {
                return response()->json([
                    'message' => 'Format response tidak sesuai'
                ], 500);
            }

            // Extract data
            $ihsId = $practitioner['id'];
            $nameArray = $practitioner['name'] ?? [];
            $nameText = '';
            
            if (!empty($nameArray) && is_array($nameArray[0])) {
                $nameText = $nameArray[0]['text'] ?? '';
                if (!$nameText && isset($nameArray[0]['given']) && is_array($nameArray[0]['given'])) {
                    $nameText = implode(' ', $nameArray[0]['given']);
                    if (isset($nameArray[0]['family'])) {
                        $nameText .= ' ' . $nameArray[0]['family'];
                    }
                }
            }

            if (!$nameText) {
                $nameText = 'Practitioner ' . $nik;
            }

            // Save mapping
            $id = DB::table('satusehat_mapping_practitioner')->insertGetId([
                'nama' => $nameText,
                'nik' => $nik,
                'satusehat_id' => $ihsId,
                'fhir_json' => json_encode($practitioner),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $newMapping = DB::table('satusehat_mapping_practitioner')->where('id', $id)->first();

            Log::info('[PRACTITIONER MAPPING] Created new mapping', [
                'nik' => $nik,
                'ihs_id' => $ihsId,
                'nama' => $nameText
            ]);

            return response()->json([
                'message' => 'Mapping berhasil dibuat',
                'data' => $newMapping
            ], 201);

        } catch (\Throwable $e) {
            Log::error('[PRACTITIONER MAPPING] Error search and create', [
                'nik' => $nik,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan saat mencari Practitioner',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update mapping
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'nik' => 'required|string|max:20',
            'satusehat_id' => 'required|string|max:100',
        ]);

        $existing = DB::table('satusehat_mapping_practitioner')->where('id', $id)->first();
        
        if (!$existing) {
            return response()->json(['message' => 'Mapping tidak ditemukan'], 404);
        }

        // Check if NIK already used by other record
        if ($validated['nik'] !== $existing->nik) {
            $nikExists = DB::table('satusehat_mapping_practitioner')
                ->where('nik', $validated['nik'])
                ->where('id', '!=', $id)
                ->exists();

            if ($nikExists) {
                return response()->json(['message' => 'NIK sudah digunakan oleh mapping lain'], 422);
            }
        }

        DB::table('satusehat_mapping_practitioner')
            ->where('id', $id)
            ->update([
                'nama' => $validated['nama'],
                'nik' => $validated['nik'],
                'satusehat_id' => $validated['satusehat_id'],
                'updated_at' => now()
            ]);

        $updated = DB::table('satusehat_mapping_practitioner')->where('id', $id)->first();

        return response()->json([
            'message' => 'Mapping berhasil diupdate',
            'data' => $updated
        ]);
    }

    /**
     * Delete mapping
     */
    public function destroy($id)
    {
        $deleted = DB::table('satusehat_mapping_practitioner')
            ->where('id', $id)
            ->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Mapping tidak ditemukan'], 404);
        }

        return response()->json(['message' => 'Mapping berhasil dihapus']);
    }

    /**
     * Get pegawai list (for selection)
     */
    public function getPegawaiList(Request $request)
    {
        $search = $request->query('search', '');
        
        $query = DB::table('pegawai')
            ->select('nik', 'nama', 'no_ktp')
            ->orderBy('nama');

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%")
                  ->orWhere('no_ktp', 'like', "%{$search}%");
            });
        }

        $data = $query->limit(50)->get();

        return response()->json(['data' => $data]);
    }
}
