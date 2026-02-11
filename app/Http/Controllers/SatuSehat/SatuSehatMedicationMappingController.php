<?php

namespace App\Http\Controllers\SatuSehat;

use App\Http\Controllers\Controller;
use App\Models\DataBarang;
use App\Models\SatuSehat\SatuSehatMappingObat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Traits\SatuSehatTraits;

class SatuSehatMedicationMappingController extends Controller
{
    use SatuSehatTraits;

    private function allowUnauthTest(Request $request)
    {
        if (app()->environment(['local', 'development', 'testing'])) {
            return null;
        }

        return response()->json([
            'ok' => false,
            'message' => 'Endpoint ini hanya untuk environment local/development/testing',
        ], 403);
    }

    public function index()
    {
        return Inertia::render('SatuSehat/Interoperabilitas/MappingMedication');
    }

    public function getMappings(Request $request)
    {
        $query = SatuSehatMappingObat::with('barang');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('kode_brng', 'like', "%{$search}%")
                  ->orWhere('obat_display', 'like', "%{$search}%")
                  ->orWhereHas('barang', function($qb) use ($search) {
                      $qb->where('nama_brng', 'like', "%{$search}%");
                  });
            });
        }

        $mappings = $query->paginate($request->get('per_page', 20));
        return response()->json($mappings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_brng' => 'required|string|exists:databarang,kode_brng',
            'obat_code' => 'required|string',
            'obat_system' => 'required|string',
            'obat_display' => 'required|string',
            'form_code' => 'nullable|string',
            'form_system' => 'nullable|string',
            'form_display' => 'nullable|string',
            'numerator_code' => 'nullable|string',
            'numerator_system' => 'nullable|string',
            'denominator_code' => 'nullable|string',
            'denominator_system' => 'nullable|string',
            'route_code' => 'nullable|string',
            'route_system' => 'nullable|string',
            'route_display' => 'nullable|string',
        ]);

        $mapping = SatuSehatMappingObat::updateOrCreate(
            ['kode_brng' => $validated['kode_brng']],
            $validated
        );

        $syncRes = null;
        if ($request->boolean('sync')) {
            $syncRes = $this->syncToSatuSehat($mapping);
        }

        return response()->json([
            'success' => true,
            'message' => 'Mapping obat berhasil disimpan',
            'data' => $mapping,
            'sync' => $syncRes
        ]);
    }

    public function storeTest(Request $request)
    {
        $deny = $this->allowUnauthTest($request);
        if ($deny) {
            return $deny;
        }

        return $this->store($request);
    }

    public function syncToSatuSehat(SatuSehatMappingObat $mapping)
    {
        $orgId = $this->satusehatOrganizationId();

        $isValidCodingSystem = function (?string $system): bool {
            $s = trim((string) $system);
            if ($s === '') {
                return false;
            }
            if (str_contains($s, 'terminology.hl7.org')) {
                return false;
            }
            return true;
        };

        $medicationTypeCoding = [
            'system' => 'http://terminology.kemkes.go.id/CodeSystem/medication-type',
            'code' => 'NC',
            'display' => 'Non-compound',
        ];
        
        $payload = [
            'resourceType' => 'Medication',
            'meta' => [
                'profile' => ['https://fhir.kemkes.go.id/r4/StructureDefinition/Medication']
            ],
            'identifier' => [
                [
                    'system' => "http://sys-ids.kemkes.go.id/medication/{$orgId}",
                    'value' => $mapping->kode_brng
                ]
            ],
            'code' => [
                'coding' => [
                    [
                        'system' => $mapping->obat_system ?: 'http://sys-ids.kemkes.go.id/kfa',
                        'code' => $mapping->obat_code,
                        'display' => $mapping->obat_display
                    ]
                ]
            ],
            'extension' => [
                [
                    'url' => 'https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType',
                    'valueCodeableConcept' => [
                        'coding' => [
                            [
                                ...$medicationTypeCoding,
                            ]
                        ]
                    ]
                ]
            ]
        ];

        if ($mapping->form_code) {
            $coding = [
                'code' => $mapping->form_code,
            ];
            $coding['system'] = $isValidCodingSystem($mapping->form_system)
                ? $mapping->form_system
                : 'http://terminology.kemkes.go.id/CodeSystem/medication-form';
            if (! empty($mapping->form_display)) {
                $coding['display'] = $mapping->form_display;
            }
            $payload['form'] = [
                'coding' => [
                    [
                        ...$coding,
                    ]
                ]
            ];
        }

        // Add ingredients if numerator/denominator are present
        if ($mapping->numerator_code || $mapping->denominator_code) {
            $payload['ingredient'] = [
                [
                    'itemCodeableConcept' => $payload['code'],
                    'strength' => [
                        'numerator' => [
                            'value' => (float)($mapping->numerator_code ?? 1),
                            'system' => $mapping->numerator_system ?: 'http://unitsofmeasure.org'
                        ],
                        'denominator' => [
                            'value' => (float)($mapping->denominator_code ?? 1),
                            'system' => $mapping->denominator_system ?: 'http://unitsofmeasure.org'
                        ]
                    ]
                ]
            ];
        }

        // Medication Type extension (standar SATUSEHAT)
        // Sudah ada di payload awal, tapi kita sesuaikan jika ada route
        if ($mapping->route_code) {
             // Route biasanya di MedicationRequest/Administration, tapi bisa juga di ekstensi Medication tertentu jika didukung
        }

        $res = $this->satusehatRequest('POST', 'Medication', $payload, [
            'prefer_representation' => true,
            'local_id' => $mapping->kode_brng
        ]);

        if ($res['ok'] && isset($res['json']['id'])) {
            $mapping->update(['satusehat_id' => $res['json']['id']]);
        }

        return $res;
    }

    public function testRelay(Request $request)
    {
        $deny = $this->allowUnauthTest($request);
        if ($deny) {
            return $deny;
        }

        // Simple relay for manual terminal testing with raw body
        $payload = $request->all();
        $res = $this->satusehatRequest('POST', 'Medication', $payload, ['prefer_representation' => true]);
        return response()->json($res);
    }

    public function lookup(Request $request)
    {
        $kode_brng = $request->query('kode_brng');
        $mapping = SatuSehatMappingObat::where('kode_brng', $kode_brng)->first();
        if (!$mapping) return response()->json(['ok' => false, 'message' => 'Mapping not found locally'], 404);

        $orgId = $this->satusehatOrganizationId();
        // Search by identifier
        $res = $this->satusehatRequest('GET', 'Medication', null, [
            'query' => [
                'identifier' => "http://sys-ids.kemkes.go.id/medication/{$orgId}|{$mapping->kode_brng}"
            ]
        ]);

        return response()->json($res);
    }

    public function destroy($kode_brng)
    {
        $mapping = SatuSehatMappingObat::findOrFail($kode_brng);
        $mapping->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mapping obat berhasil dihapus'
        ]);
    }

    public function searchBarang(Request $request)
    {
        $search = $request->query('q');
        if (!$search) return response()->json([]);

        $items = DataBarang::where('nama_brng', 'like', "%{$search}%")
            ->orWhere('kode_brng', 'like', "{$search}%")
            ->limit(20)
            ->get();

        return response()->json($items);
    }
}
