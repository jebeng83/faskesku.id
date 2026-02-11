<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class AllergyIntoleranceService
{
    use SatuSehatTraits;

    protected $mappingService;

    public function __construct(AllergyMappingService $mappingService)
    {
        $this->mappingService = $mappingService;
    }

    /**
     * Kirim data alergi pasien ke SATU SEHAT
     * 
     * @param string $noRawat Nomor Rawat
     * @param string|null $tglPerawatan Fallback tanggal jika dibutuhkan
     * @param string|null $jamRawat Fallback jam jika dibutuhkan
     * @return array
     */
    public function sendAllergyIntolerance($noRawat, $tglPerawatan = null, $jamRawat = null)
    {
        // 1. Get rawat jalan data to find patient
        $rawat = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
        if (!$rawat) {
            return ['success' => false, 'message' => 'Data rawat tidak ditemukan'];
        }

        $noRM = $rawat->no_rkm_medis;
        $practitionerId = $this->getPractitionerIhsIdFromKdDokter((string) ($rawat->kd_dokter ?? ''));

        // 2. Get patient allergies from alergi_pasien
        // Kita ambil semua riwayat alergi yang tercatat untuk pasien ini
        $pasienAlergi = DB::table('alergi_pasien')
            ->join('data_alergi', 'alergi_pasien.kd_alergi', '=', 'data_alergi.kd_alergi')
            ->where('alergi_pasien.no_rkm_medis', $noRM)
            ->get();

        if ($pasienAlergi->isEmpty()) {
            Log::info('[SATU SEHAT][Allergy] Pasien tidak memiliki data riwayat alergi.', ['no_rkm_medis' => $noRM]);
            return ['success' => true, 'message' => 'Tidak ada data alergi untuk dikirim'];
        }

        // 3. Get IHS IDs
        $patientId = $this->getPatientIhsIdFromNoRM($noRM);
        $encounterId = $this->getEncounterIhsIdFromNoRawat($noRawat);

        if (!$patientId) {
            return ['success' => false, 'message' => 'IHS ID Patient tidak ditemukan'];
        }

        // Encounter ID opsional untuk AllergyIntolerance (bisa tanpa encounter), 
        // tapi sangat disarankan jika ada kaitannya dengan pemeriksaan ini.
        if (!$encounterId) {
            Log::warning('[SATU SEHAT][Allergy] Encounter IHS ID tidak ditemukan, mengirim tanpa referensi encounter.', ['no_rawat' => $noRawat]);
        }

        $results = [];

        foreach ($pasienAlergi as $alergi) {
            // Get Mapping (KFA/SNOMED)
            $mapping = $this->mappingService->getMapping($alergi->kd_alergi, $alergi->nm_alergi);
            
            // Build FHIR Payload
            $payload = $this->buildPayload($alergi, $mapping, $patientId, $encounterId, $practitionerId);
            
            // Send to Satu Sehat API
            $response = $this->satusehatRequest('POST', 'AllergyIntolerance', $payload, [
                'local_id' => $noRM . '-' . $alergi->kd_alergi
            ]);

            if ($response['ok']) {
                $results[] = [
                    'kd_alergi' => $alergi->kd_alergi,
                    'nm_alergi' => $alergi->nm_alergi,
                    'satusehat_id' => $response['json']['id'] ?? null,
                    'success' => true
                ];
            } else {
                $results[] = [
                    'kd_alergi' => $alergi->kd_alergi,
                    'nm_alergi' => $alergi->nm_alergi,
                    'success' => false,
                    'error' => $response['error']
                ];
            }
        }

        return [
            'success' => true,
            'results' => $results
        ];
    }

    /**
     * Build FHIR AllergyIntolerance Resource
     */
    private function buildPayload($alergi, $mapping, $patientId, $encounterId, $practitionerId = null)
    {
        $practitionerId = $practitionerId ? trim((string) $practitionerId) : '';
        $payload = [
            'resourceType' => 'AllergyIntolerance',
            'clinicalStatus' => [
                'coding' => [
                    [
                        'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
                        'code' => 'active',
                        'display' => 'Active'
                    ]
                ]
            ],
            'verificationStatus' => [
                'coding' => [
                    [
                        'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
                        'code' => 'confirmed',
                        'display' => 'Confirmed'
                    ]
                ]
            ],
            'type' => 'allergy',
            'patient' => [
                'reference' => 'Patient/' . $patientId
            ],
            'recorder' => $practitionerId !== ''
                ? ['reference' => 'Practitioner/' . $practitionerId]
                : ['reference' => 'Patient/' . $patientId],
            'recordedDate' => now()->toIso8601String(),
        ];

        // Encounter reference
        if ($encounterId) {
            $payload['encounter'] = [
                'reference' => 'Encounter/' . $encounterId
            ];
        }

        // Code (Substance/Agent)
        $codeCoding = [];
        if ($mapping && $mapping['code']) {
            $codeCoding[] = [
                'system' => $mapping['system'],
                'code' => $mapping['code'],
                'display' => $mapping['display']
            ];
        } else {
            // Default SNOMED for "Allergy to [X]" (free text fallback as display)
            $codeCoding[] = [
                'system' => 'http://snomed.info/sct',
                'code' => '609328004', // Allergen (substance) 
                'display' => $alergi->nm_alergi
            ];
        }
        $payload['code'] = [
            'coding' => $codeCoding,
            'text' => $alergi->nm_alergi
        ];

        // Category
        if ($mapping && isset($mapping['category'])) {
            $payload['category'] = [$mapping['category']];
        } else {
            $payload['category'] = [$this->mappingService->guessCategory($alergi->nm_alergi)];
        }

        // Criticality
        if ($mapping && !empty($mapping['criticality'])) {
            $payload['criticality'] = $mapping['criticality'];
        }

        // Reaction / Manifestation
        if ($mapping && !empty($mapping['manifestation'])) {
            $payload['reaction'] = [
                [
                    'manifestation' => [
                        [
                            'coding' => [
                                [
                                    'system' => 'http://snomed.info/sct',
                                    'code' => $mapping['manifestation']['code'],
                                    'display' => $mapping['manifestation']['display']
                                ]
                            ]
                        ]
                    ]
                ]
            ];
        }
        
        return $payload;
    }

    private function getPractitionerIhsIdFromKdDokter(string $kdDokter): ?string
    {
        $kdDokter = trim($kdDokter);
        if ($kdDokter === '') {
            return null;
        }

        $pegawai = DB::table('pegawai')->where('nik', $kdDokter)->first(['no_ktp', 'nama']);
        $nikRaw = $pegawai ? (string) ($pegawai->no_ktp ?? '') : '';
        $nik = preg_replace('/\D/', '', $nikRaw);
        if ($nik === '' || strlen($nik) !== 16) {
            return null;
        }

        $mapping = DB::table('satusehat_mapping_practitioner')->where('nik', $nik)->first(['satusehat_id']);
        if ($mapping && ! empty($mapping->satusehat_id)) {
            return (string) $mapping->satusehat_id;
        }

        try {
            $response = $this->satusehatRequest('GET', 'Practitioner', null, [
                'query' => ['identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nik]
            ]);

            if (($response['ok'] ?? false) && ! empty($response['json']['entry'])) {
                $practitioner = $response['json']['entry'][0]['resource'] ?? null;
                $id = is_array($practitioner) ? (string) ($practitioner['id'] ?? '') : '';
                if ($id !== '') {
                    DB::table('satusehat_mapping_practitioner')->updateOrInsert(
                        ['nik' => $nik],
                        [
                            'satusehat_id' => $id,
                            'nama' => $pegawai ? (string) ($pegawai->nama ?? $kdDokter) : $kdDokter,
                            'fhir_json' => json_encode($practitioner),
                            'updated_at' => now(),
                            'created_at' => now(),
                        ]
                    );

                    return $id;
                }
            }
        } catch (\Throwable $e) {
            Log::warning('[SATU SEHAT][Allergy] Gagal search Practitioner', ['kd_dokter' => $kdDokter, 'error' => $e->getMessage()]);
        }

        return null;
    }

    // Helper methods for IHS IDs
    private function getPatientIhsIdFromNoRM($noRM)
    {
        $pasien = DB::table('pasien')->where('no_rkm_medis', $noRM)->first(['no_ktp']);
        if (!$pasien || !$pasien->no_ktp) return null;

        $mapping = DB::table('satusehat_patient_mapping')->where('nik', $pasien->no_ktp)->first();
        return $mapping->satusehat_id ?? null;
    }

    private function getEncounterIhsIdFromNoRawat($noRawat)
    {
        $encounter = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first();
        if ($encounter) return $encounter->satusehat_id;

        // Try legacy table
        if (Schema::hasTable('satu_sehat_encounter')) {
            $legacy = DB::table('satu_sehat_encounter')->where('no_rawat', $noRawat)->first();
            return $legacy->id_encounter ?? $legacy->id_encounter_2 ?? null;
        }

        return null;
    }
}
