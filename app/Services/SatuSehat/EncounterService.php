<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class EncounterService
{
    use SatuSehatTraits;
    
    protected $patientService;
    
    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }
    
    /**
     * Create Encounter baru di SATU SEHAT
     * 
     * @param string $noRawat No rawat dari reg_periksa
     * @param boolsendToSatuSehat Kirim ke SATU SEHAT atau hanya build resource
     * @return array Encounter resource atau data yang di-build
     */
    public function createEncounter($noRawat, $sendToSatuSehat = true)
    {
        // Get data from local DB
        $regPeriksa = DB::table('reg_periksa as rp')
            ->join('pasien as p', 'rp.no_rkm_medis', '=', 'p.no_rkm_medis')
            ->join('dokter as d', 'rp.kd_dokter', '=', 'd.kd_dokter')
            ->join('poliklinik as pl', 'rp.kd_poli', '=', 'pl.kd_poli')
            ->leftJoin('pegawai as pg', 'd.kd_dokter', '=', 'pg.nik')
            ->where('rp.no_rawat', $noRawat)
            ->select(
                'rp.*',
                'p.no_ktp as nik_pasien',
                'p.nm_pasien',
                'pg.no_ktp as nik_dokter',
                'd.nm_dokter',
                'pl.nm_poli',
                'pg.departemen'
            )
            ->first();
            
        if (!$regPeriksa) {
            throw new \Exception("Data registrasi tidak ditemukan untuk no_rawat: {$noRawat}");
        }
        
        // Ensure Patient exists in SATU SEHAT (try get, don't auto-create for now)
        $patientId = null;
        $practitionerId = null;
        
        try {
            if ($regPeriksa->nik_pasien && strlen($regPeriksa->nik_pasien) === 16) {
                $patient = $this->patientService->findOrCreatePatient($regPeriksa->nik_pasien);
                $patientId = $patient['id'] ?? null;
            }
        } catch (\Exception $e) {
            Log::warning("Gagal get/create Patient untuk Encounter", [
                'no_rawat' => $noRawat,
                'nik' => $regPeriksa->nik_pasien,
                'error' => $e->getMessage()
            ]);
        }
        
        // Get Practitioner ID
        try {
            if ($regPeriksa->nik_dokter && strlen($regPeriksa->nik_dokter) === 16) {
                $practitioner = $this->getPractitionerByNik($regPeriksa->nik_dokter);
                $practitionerId = $practitioner['id'] ?? null;
            }
        } catch (\Exception $e) {
            Log::warning("Gagal get Practitioner untuk Encounter", [
                'no_rawat' => $noRawat,
                'nik' => $regPeriksa->nik_dokter,
                'error' => $e->getMessage()
            ]);
        }
        
        // Get Location ID dari mapping
        $locationId = $this->getLocationId($regPeriksa->kd_poli);
        
        // Get Organization ID (optional)
        $organizationId = $this->satusehatOrganizationId();
        
        // Build Encounter resource
        $encounter = $this->buildEncounterResource(
            $regPeriksa,
            $patientId,
            $practitionerId,
            $locationId,
            $organizationId
        );
        
        // Send to SATU SEHAT jika diminta
        if ($sendToSatuSehat && $patientId && $practitionerId && $locationId) {
            $response = $this->satusehatRequest('POST', 'Encounter', $encounter);
            
            if (!$response['ok']) {
                Log::error("Gagal kirim Encounter ke SATU SEHAT", [
                    'no_rawat' => $noRawat,
                    'error' => $response['error'] ?? 'Unknown',
                    'status' => $response['status'] ?? null
                ]);
                
                throw new \Exception("Gagal kirim Encounter: " . ($response['error'] ?? 'Unknown'));
            }
            
            $encounterResource = $response['json'];
            
            // Save to tracking table
            $this->saveEncounterTracking($noRawat, $encounterResource);
            
            return $encounterResource;
        }
        
        return [
            'encounter' => $encounter,
            'patient_id' => $patientId,
            'practitioner_id' => $practitionerId,
            'location_id' => $locationId,
            'sent' => false,
            'reason' => 'Missing required references'
        ];
    }
    
    /**
     * Build FHIR Encounter resource
     */
    private function buildEncounterResource($regPeriksa, $patientId, $practitionerId, $locationId, $organizationId)
    {
        $periodStart = Carbon::parse($regPeriksa->tgl_registrasi . ' ' . $regPeriksa->jam_reg)
            ->setTimezone('Asia/Jakarta')
            ->toIso8601String();
        
        $resource = [
            'resourceType' => 'Encounter',
            'identifier' => [[
                'system' => 'http://sys-ids.kemkes.go.id/encounter/' . $organizationId,
                'value' => $regPeriksa->no_rawat
            ]],
            'status' => $this->mapStatus($regPeriksa->stts),
            'statusHistory' => [
                [
                    'status' => 'arrived',
                    'period' => [
                        'start' => $periodStart
                    ]
                ]
            ],
            'class' => [
                'system' => 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                'code' => ($regPeriksa->status_lanjut === 'Ralan' || $regPeriksa->status_lanjut === 'Rawat Jalan') ? 'AMB' : 'IMP',
                'display' => ($regPeriksa->status_lanjut === 'Ralan' || $regPeriksa->status_lanjut === 'Rawat Jalan') ? 'ambulatory' : 'inpatient encounter'
            ],
            'period' => [
                'start' => $periodStart
            ]
        ];
        
        // Add subject (Patient)
        if ($patientId) {
            $resource['subject'] = [
                'reference' => "Patient/{$patientId}",
                'display' => $regPeriksa->nm_pasien
            ];
        }
        
        // Add participant (Practitioner)
        if ($practitionerId) {
            $resource['participant'] = [[
                'type' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                        'code' => 'ATND',
                        'display' => 'attender'
                    ]]
                ]],
                'individual' => [
                    'reference' => "Practitioner/{$practitionerId}",
                    'display' => $regPeriksa->nm_dokter
                ]
            ]];
        }
        
        // Add location
        if ($locationId) {
            $resource['location'] = [[
                'location' => [
                    'reference' => "Location/{$locationId}",
                    'display' => $regPeriksa->nm_poli
                ]
            ]];
        }
        
        // Add serviceProvider (Organization)
        if ($organizationId) {
            $resource['serviceProvider'] = [
                'reference' => "Organization/{$organizationId}"
            ];
        }
        
        return $resource;
    }
    
    /**
     * Map status lokal ke FHIR status
     */
    private function mapStatus($stts)
    {
        $statusMap = [
            'Belum' => 'planned',
            'Sudah' => 'arrived',
            'Berkas Diterima' => 'in-progress',
            'Selesai' => 'finished',
            'Batal' => 'cancelled',
            'Dirujuk' => 'finished'
        ];
        
        return $statusMap[$stts] ?? 'in-progress';
    }
    
    /**
     * Get Practitioner by NIK
     */
    private function getPractitionerByNik($nik)
    {
        $response = $this->satusehatRequest('GET', 'Practitioner', null, [
            'query' => [
                'identifier' => "https://fhir.kemkes.go.id/id/nik|{$nik}"
            ]
        ]);
        
        if ($response['ok'] && !empty($response['json']['entry'])) {
            return $response['json']['entry'][0]['resource'];
        }
        
        return null;
    }
    
    /**
     * Get Location ID dari mapping lokal
     */
    private function getLocationId($kdPoli)
    {
        $mapping = DB::table('satu_sehat_mapping_lokasi_ralan')
            ->where('kd_poli', $kdPoli)
            ->first();
            
        return $mapping->id_lokasi_satusehat ?? null;
    }
    
    /**
     * Save encounter tracking to database
     */
    private function saveEncounterTracking($noRawat, $encounterResource)
    {
        DB::table('satusehat_encounter')->updateOrInsert(
            ['no_rawat' => $noRawat],
            [
                'satusehat_id' => $encounterResource['id'],
                'fhir_json' => json_encode($encounterResource),
                'status' => 'sent',
                'sent_at' => now(),
                'updated_at' => now()
            ]
        );
        
        // Juga simpan ke tabel legacy satu_sehat_encounter untuk kompatibilitas
        try {
            DB::table('satu_sehat_encounter')->updateOrInsert(
                ['no_rawat' => $noRawat],
                ['id_encounter' => $encounterResource['id']]
            );
        } catch (\Throwable $e) {
            // Abaikan error legacy table jika tidak ada
        }
    }
    
    /**
     * Finish Encounter (update status ke finished)
     * 
     * @param string $noRawat
     * @param array|null $reasonCodes Array of coding for reasonCode
     * @param string|null $dischargeDispositionCode Code for discharge disposition (e.g. 'home', 'exp')
     */
    public function finishEncounter($noRawat, $reasonCodes = null, $dischargeDispositionCode = null)
    {
        $tracking = DB::table('satusehat_encounter')
            ->where('no_rawat', $noRawat)
            ->first();
            
        if (!$tracking) {
            throw new \Exception("Encounter belum pernah dikirim ke SATU SEHAT");
        }

        // Get RegPeriksa for status mapping if needed
        $regPeriksa = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first();
        
        // Get current resource from SATU SEHAT
        $response = $this->satusehatRequest('GET', "Encounter/{$tracking->satusehat_id}");
        
        if (!$response['ok']) {
            throw new \Exception("Gagal get Encounter dari SATU SEHAT");
        }
        
        $encounter = $response['json'];
        $encounter['status'] = 'finished';
        
        // Add end time jika belum ada
        if (empty($encounter['period']['end'])) {
            $encounter['period']['end'] = Carbon::now()->setTimezone('Asia/Jakarta')->toIso8601String();
        }

        // Handle Discharge Disposition
        // If not provided, try to map from reg_periksa status
        if (!$dischargeDispositionCode && $regPeriksa) {
            $map = [
                'Sudah' => 'home',
                'Dirujuk' => 'other-hcf',
                'Meninggal' => 'exp',
                'Pulang Paksa' => 'aadvice',
                'Batal' => 'aadvice', // Or cancel?
            ];
            $dischargeDispositionCode = $map[$regPeriksa->stts] ?? 'home'; // Default to home
        }

        if ($dischargeDispositionCode) {
            $displayMap = [
                'home' => 'Home',
                'alt-home' => 'Alternative home',
                'other-hcf' => 'Other healthcare facility',
                'hosp' => 'Hospice',
                'long' => 'Long-term care',
                'aadvice' => 'Left against advice',
                'exp' => 'Expired',
                'psy' => 'Psychiatric hospital',
                'rehab' => 'Rehabilitation',
                'snf' => 'Skilled nursing facility',
                'oth' => 'Other',
            ];

            $encounter['hospitalization'] = [
                'dischargeDisposition' => [
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/discharge-disposition',
                        'code' => $dischargeDispositionCode,
                        'display' => $displayMap[$dischargeDispositionCode] ?? $dischargeDispositionCode
                    ]]
                ]
            ];
        }

        // Handle ReasonCode
        if (!empty($reasonCodes)) {
            $encounter['reasonCode'] = $reasonCodes;
        }

        
        // Update via PUT
        $updateResponse = $this->satusehatRequest('PUT', "Encounter/{$tracking->satusehat_id}", $encounter);
        
        if (!$updateResponse['ok']) {
            throw new \Exception("Gagal update Encounter: " . ($updateResponse['error'] ?? 'Unknown'));
        }
        
        // Update tracking
        DB::table('satusehat_encounter')
            ->where('no_rawat', $noRawat)
            ->update([
                'status' => 'finished',
                'updated_at' => now()
            ]);
        
        return $updateResponse['json'];
    }
    
    /**
     * Update Encounter (add diagnosis, procedure references, etc)
     */
    public function updateEncounter($noRawat, array $updates)
    {
        $tracking = DB::table('satusehat_encounter')
            ->where('no_rawat', $noRawat)
            ->first();
            
        if (!$tracking) {
            throw new \Exception("Encounter belum pernah dikirim ke SATU SEHAT");
        }
        
        // Get current resource
        $response = $this->satusehatRequest('GET', "Encounter/{$tracking->satusehat_id}");
        
        if (!$response['ok']) {
            throw new \Exception("Gagal get Encounter dari SATU SEHAT");
        }
        
        $encounter = $response['json'];
        
        // Update fields
        if (isset($updates['status'])) {
            $encounter['status'] = $updates['status'];
        }
        
        if (isset($updates['diagnosis_ids']) && is_array($updates['diagnosis_ids'])) {
            $encounter['diagnosis'] = [];
            foreach ($updates['diagnosis_ids'] as $idx => $conditionId) {
                $encounter['diagnosis'][] = [
                    'condition' => [
                        'reference' => "Condition/{$conditionId}"
                    ],
                    'use' => [
                        'coding' => [[
                            'system' => 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
                            'code' => $idx === 0 ? 'AD' : 'DD',
                            'display' => $idx === 0 ? 'Admission diagnosis' : 'Discharge diagnosis'
                        ]]
                    ],
                    'rank' => $idx + 1
                ];
            }
        }
        
        // Update via PUT
        $updateResponse = $this->satusehatRequest('PUT', "Encounter/{$tracking->satusehat_id}", $encounter);
        
        if (!$updateResponse['ok']) {
            throw new \Exception("Gagal update Encounter: " . ($updateResponse['error'] ?? 'Unknown'));
        }
        
        // Update tracking
        DB::table('satusehat_encounter')
            ->where('no_rawat', $noRawat)
            ->update([
                'fhir_json' => json_encode($updateResponse['json']),
                'updated_at' => now()
            ]);
        
        return $updateResponse['json'];
    }
    
    /**
     * Get Encounter status dari tracking
     */
    public function getEncounterStatus($noRawat)
    {
        $tracking = DB::table('satusehat_encounter')
            ->where('no_rawat', $noRawat)
            ->first();
            
        if (!$tracking) {
            return [
                'sent' => false,
                'status' => null,
                'satusehat_id' => null
            ];
        }
        
        return [
            'sent' => true,
            'status' => $tracking->status,
            'satusehat_id' => $tracking->satusehat_id,
            'sent_at' => $tracking->sent_at
        ];
    }
}
