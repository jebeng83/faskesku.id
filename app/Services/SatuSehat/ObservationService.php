<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ObservationService
{
    use SatuSehatTraits;

    /**
     * Kirim semua vital signs untuk satu pemeriksaan ke SATU SEHAT
     * 
     * @param string $noRawat
     * @param string $tglPerawatan
     * @param string $jamRawat
     * @return array
     */
    public function sendVitalSigns($noRawat, $tglPerawatan, $jamRawat)
    {
        // Ambil data pemeriksaan
        $pemeriksaan = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->where('tgl_perawatan', $tglPerawatan)
            ->where('jam_rawat', $jamRawat)
            ->first();

        if (!$pemeriksaan) {
            Log::warning('[OBSERVATION] Pemeriksaan tidak ditemukan', [
                'no_rawat' => $noRawat,
                'tgl_perawatan' => $tglPerawatan,
                'jam_rawat' => $jamRawat
            ]);
            return ['success' => false, 'message' => 'Pemeriksaan tidak ditemukan'];
        }

        // Get required IDs
        $patientId = $this->getPatientIhsIdFromNoRawat($noRawat);
        $encounterId = $this->getEncounterIhsIdFromNoRawat($noRawat);
        $practitionerId = $this->getPractitionerIhsIdFromNip($pemeriksaan->nip);
        if (! $practitionerId) {
            $practitionerId = $this->getPractitionerIhsIdFromNoRawat($noRawat);
        }

        if (!$patientId) {
            Log::warning('[OBSERVATION] Patient IHS ID tidak ditemukan', ['no_rawat' => $noRawat]);
            return ['success' => false, 'message' => 'Patient IHS ID tidak ditemukan'];
        }

        if (!$encounterId) {
            Log::warning('[OBSERVATION] Encounter IHS ID tidak ditemukan', ['no_rawat' => $noRawat]);
            return ['success' => false, 'message' => 'Encounter IHS ID tidak ditemukan'];
        }

        $results = [];

        // 1. Tekanan Darah
        if ($pemeriksaan->tensi) {
            $result = $this->sendBloodPressure($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['tensi'] = $result;
        }

        // 2. Nadi
        if ($pemeriksaan->nadi) {
            $result = $this->sendHeartRate($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['nadi'] = $result;
        }

        // 3. Respirasi
        if ($pemeriksaan->respirasi) {
            $result = $this->sendRespiratoryRate($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['respirasi'] = $result;
        }

        // 4. Suhu
        if ($pemeriksaan->suhu_tubuh) {
            $result = $this->sendBodyTemperature($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['suhu'] = $result;
        }

        // 5. SpO2
        if ($pemeriksaan->spo2) {
            $result = $this->sendOxygenSaturation($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['spo2'] = $result;
        }

        // 6. Tinggi Badan
        if ($pemeriksaan->tinggi) {
            $result = $this->sendHeight($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['tinggi'] = $result;
        }

        // 7. Berat Badan
        if ($pemeriksaan->berat) {
            $result = $this->sendWeight($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['berat'] = $result;
        }

        // 8. Lingkar Perut
        if ($pemeriksaan->lingkar_perut) {
            $result = $this->sendAbdominalCircumference($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['lingkar_perut'] = $result;
        }

        // 9. GCS
        if ($pemeriksaan->gcs) {
            $result = $this->sendGCS($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['gcs'] = $result;
        }

        // 10. Keluhan Utama
        if ($pemeriksaan->keluhan) {
            $result = $this->sendChiefComplaint($pemeriksaan, $patientId, $encounterId, $practitionerId);
            $results['keluhan'] = $result;
        }

        return [
            'success' => true,
            'results' => $results
        ];
    }

    private function buildPerformer(string $patientId, ?string $practitionerId = null): array
    {
        $practitionerId = $practitionerId ? trim((string) $practitionerId) : '';
        if ($practitionerId !== '') {
            return [['reference' => 'Practitioner/' . $practitionerId]];
        }

        return [['reference' => 'Patient/' . $patientId]];
    }

    private function getPractitionerIhsIdFromNoRawat(string $noRawat): ?string
    {
        $kdDokter = (string) (DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('kd_dokter') ?? '');
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
            Log::warning('[OBSERVATION] Gagal search Practitioner by no_rawat', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
        }

        return null;
    }

    /**
     * Send Height Observation
     */
    private function sendHeight($data, $patientId, $encounterId, $practitionerId)
    {
        $tinggi = (float) trim($data->tinggi);
        if ($tinggi <= 0) {
            return ['success' => false, 'message' => 'Nilai tinggi tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '8302-2',
                    'display' => 'Body height'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $tinggi,
                'unit' => 'cm',
                'system' => 'http://unitsofmeasure.org',
                'code' => 'cm'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('tinggi', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('tinggi', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Weight Observation
     */
    private function sendWeight($data, $patientId, $encounterId, $practitionerId)
    {
        $berat = (float) trim($data->berat);
        if ($berat <= 0) {
            return ['success' => false, 'message' => 'Nilai berat tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '29463-7',
                    'display' => 'Body weight'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $berat,
                'unit' => 'kg',
                'system' => 'http://unitsofmeasure.org',
                'code' => 'kg'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('berat', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('berat', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Abdominal Circumference Observation
     */
    private function sendAbdominalCircumference($data, $patientId, $encounterId, $practitionerId)
    {
        $lingkar = (float) trim($data->lingkar_perut);
        if ($lingkar <= 0) {
            return ['success' => false, 'message' => 'Nilai lingkar perut tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '8280-0',
                    'display' => 'Waist Circumference at Umbilicus by Tape measure'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $lingkar,
                'unit' => 'cm',
                'system' => 'http://unitsofmeasure.org',
                'code' => 'cm'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('lingkar_perut', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('lingkar_perut', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send GCS Observation
     * Note: GCS in SatuSehat might require components (E, V, M) or Total score.
     * Often sent as "Total Score" (LOINC 9269-2) if only total number is available.
     * The database field 'gcs' might be a string (e.g., "E4V5M6") or total number ("15").
     * We will try to parse.
     */
    private function sendGCS($data, $patientId, $encounterId, $practitionerId)
    {
        $gcsVal = trim($data->gcs);
        // If format is like "15" or "13"
        if (is_numeric($gcsVal)) {
            $score = (int) $gcsVal;
        } else {
            // If format like E4V5M6, we will not parse component for now, just fallback or skip.
            // Or maybe total it.
            // Simple approach: skip if not numeric for now, or just send strings as logic.
            // SatuSehat requires Quantity for Score.
            // Let's assume numeric for typical "Score" usage or try to extract.
            if (preg_match('/(\d+)/', $gcsVal, $matches)) {
                $score = (int) $matches[1];
            } else {
                return ['success' => false, 'message' => 'Format GCS tidak valid'];
            }
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'exam',
                    'display' => 'Exam'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '9269-2',
                    'display' => 'Glasgow coma score total'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $score,
                'unit' => '{score}',
                'system' => 'http://unitsofmeasure.org',
                'code' => '{score}'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('gcs', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('gcs', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Chief Complaint Observation
     */
    private function sendChiefComplaint($data, $patientId, $encounterId, $practitionerId)
    {
        $keluhan = trim($data->keluhan);
        if (empty($keluhan) || $keluhan === '-' || $keluhan === 'N/A') {
            return ['success' => false, 'message' => 'Keluhan kosong'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'exam',
                    'display' => 'Exam'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '10154-3',
                    'display' => 'Chief complaint Narrative - Reported'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueString' => $keluhan
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('keluhan', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('keluhan', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Blood Pressure Observation
     */
    private function sendBloodPressure($data, $patientId, $encounterId, $practitionerId)
    {
        // Parse "120/80" format
        $bp = explode('/', trim($data->tensi));
        if (count($bp) != 2) {
            Log::warning('[OBSERVATION] Format tensi invalid', ['tensi' => $data->tensi]);
            return ['success' => false, 'message' => 'Format tensi invalid'];
        }

        $systolic = (int) trim($bp[0]);
        $diastolic = (int) trim($bp[1]);

        if ($systolic <= 0 || $diastolic <= 0) {
            return ['success' => false, 'message' => 'Nilai tensi tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '85354-9',
                    'display' => 'Blood pressure panel with all children optional'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'component' => [
                [
                    'code' => [
                        'coding' => [[
                            'system' => 'http://loinc.org',
                            'code' => '8480-6',
                            'display' => 'Systolic blood pressure'
                        ]]
                    ],
                    'valueQuantity' => [
                        'value' => $systolic,
                        'unit' => 'mmHg',
                        'system' => 'http://unitsofmeasure.org',
                        'code' => 'mm[Hg]'
                    ]
                ],
                [
                    'code' => [
                        'coding' => [[
                            'system' => 'http://loinc.org',
                            'code' => '8462-4',
                            'display' => 'Diastolic blood pressure'
                        ]]
                    ],
                    'valueQuantity' => [
                        'value' => $diastolic,
                        'unit' => 'mmHg',
                        'system' => 'http://unitsofmeasure.org',
                        'code' => 'mm[Hg]'
                    ]
                ]
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('tensi', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('tensi', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Heart Rate Observation
     */
    private function sendHeartRate($data, $patientId, $encounterId, $practitionerId)
    {
        $nadi = (int) trim($data->nadi);
        if ($nadi <= 0) {
            return ['success' => false, 'message' => 'Nilai nadi tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '8867-4',
                    'display' => 'Heart rate'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $nadi,
                'unit' => 'beats/minute',
                'system' => 'http://unitsofmeasure.org',
                'code' => '/min'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('nadi', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('nadi', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Respiratory Rate Observation
     */
    private function sendRespiratoryRate($data, $patientId, $encounterId, $practitionerId)
    {
        $respirasi = (int) trim($data->respirasi);
        if ($respirasi <= 0) {
            return ['success' => false, 'message' => 'Nilai respirasi tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '9279-1',
                    'display' => 'Respiratory rate'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $respirasi,
                'unit' => 'breaths/minute',
                'system' => 'http://unitsofmeasure.org',
                'code' => '/min'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('respirasi', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('respirasi', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Body Temperature Observation
     */
    private function sendBodyTemperature($data, $patientId, $encounterId, $practitionerId)
    {
        $suhu = (float) trim($data->suhu_tubuh);
        if ($suhu <= 0 || $suhu > 50) {
            return ['success' => false, 'message' => 'Nilai suhu tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '8310-5',
                    'display' => 'Body temperature'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $suhu,
                'unit' => 'degree Celsius',
                'system' => 'http://unitsofmeasure.org',
                'code' => 'Cel'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('suhu', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('suhu', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Send Oxygen Saturation Observation
     */
    private function sendOxygenSaturation($data, $patientId, $encounterId, $practitionerId)
    {
        $spo2 = (int) trim($data->spo2);
        if ($spo2 < 0 || $spo2 > 100) {
            return ['success' => false, 'message' => 'Nilai SpO2 tidak valid'];
        }

        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';

        $resource = [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '59408-5',
                    'display' => 'Oxygen saturation in Arterial blood by Pulse oximetry'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'valueQuantity' => [
                'value' => $spo2,
                'unit' => '%',
                'system' => 'http://unitsofmeasure.org',
                'code' => '%'
            ]
        ];

        $resource['performer'] = $this->buildPerformer($patientId, $practitionerId);

        $response = $this->satusehatRequest('POST', 'Observation', $resource, ['local_id' => $data->no_rawat]);

        if ($response['ok']) {
            $this->saveObservationTracking('spo2', $data, $response['json']);
            return ['success' => true, 'id' => $response['json']['id']];
        } else {
            $this->saveObservationTracking('spo2', $data, null, 'failed', $response['error'] ?? 'Unknown error');
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error'];
        }
    }

    /**
     * Save observation tracking to respective table
     */
    private function saveObservationTracking($type, $data, $observationResource = null, $status = 'sent', $errorMessage = null)
    {
        $tableName = 'satu_sehat_observationttv' . $type;

        $trackingData = [
            'no_rawat' => $data->no_rawat,
            'tgl_perawatan' => $data->tgl_perawatan,
            'jam_rawat' => $data->jam_rawat,
            'status' => $status,
            'error_message' => $errorMessage,
            'updated_at' => now()
        ];

        if ($observationResource) {
            $trackingData['satusehat_id'] = $observationResource['id'];
            $trackingData['fhir_json'] = json_encode($observationResource);
            $trackingData['sent_at'] = now();
        }

        DB::table($tableName)->updateOrInsert(
            [
                'no_rawat' => $data->no_rawat,
                'tgl_perawatan' => $data->tgl_perawatan,
                'jam_rawat' => $data->jam_rawat
            ],
            $trackingData
        );
    }

    /**
     * Helper: Get Patient IHS ID from no_rawat
     */
    private function getPatientIhsIdFromNoRawat($noRawat)
    {
        $regPeriksa = DB::table('reg_periksa')
            ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
            ->where('reg_periksa.no_rawat', $noRawat)
            ->first(['pasien.no_ktp']);

        if (!$regPeriksa || !$regPeriksa->no_ktp) {
            return null;
        }

        $mapping = DB::table('satusehat_patient_mapping')
            ->where('nik', $regPeriksa->no_ktp)
            ->first();

        return $mapping->satusehat_id ?? null;
    }

    /**
     * Helper: Get Encounter IHS ID from no_rawat
     */
    private function getEncounterIhsIdFromNoRawat($noRawat)
    {
        $encounter = DB::table('satusehat_encounter')
            ->where('no_rawat', $noRawat)
            ->first();

        return $encounter->satusehat_id ?? null;
    }

    /**
     * Helper: Get Practitioner IHS ID from NIP (Employee ID)
     * Note: "NIP" here refers to the internal employee ID which maps to a record in `pegawai` table.
     * The `pegawai` table contains `no_ktp` which is the actual NIK used for SATU SEHAT.
     */
    private function getPractitionerIhsIdFromNip($nip)
    {
        if (!$nip) return null;

        // 1. Get NIK (KTP) from pegawai table using NIP (Employee ID)
        $pegawai = DB::table('pegawai')->where('nik', $nip)->first();
        if (!$pegawai || empty($pegawai->no_ktp)) {
            Log::warning('[OBSERVATION] Pegawai with NIP ' . $nip . ' not found or has no KTP');
            return null;
        }

        $nikKtp = $pegawai->no_ktp;

        // 2. Check in satusehat_mapping_practitioner using NIK (KTP)
        $mapping = DB::table('satusehat_mapping_practitioner')
            ->where('nik', $nikKtp)
            ->first();

        if ($mapping) {
            return $mapping->satusehat_id;
        }

        // 3. Fallback: search via API using NIK (KTP)
        try {
            $response = $this->satusehatRequest('GET', 'Practitioner', null, [
                'query' => ['identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nikKtp]
            ]);

            if ($response['ok'] && !empty($response['json']['entry'])) {
                $practitioner = $response['json']['entry'][0]['resource'];
                $practitionerId = $practitioner['id'];

                // Save to mapping table
                // Note: We duplicate the logic from PractitionerMappingController::searchAndCreate simplified here
                $nameText = $this->extractName($practitioner['name'] ?? []) ?? $pegawai->nama;

                DB::table('satusehat_mapping_practitioner')->insert([
                    'nama' => $nameText,
                    'nik' => $nikKtp,
                    'satusehat_id' => $practitionerId,
                    'fhir_json' => json_encode($practitioner),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                return $practitionerId;
            }
        } catch (\Throwable $e) {
            Log::warning('[OBSERVATION] Gagal search Practitioner', ['nik' => $nikKtp, 'error' => $e->getMessage()]);
        }

        return null;
    }

    private function extractName($nameArray) {
        if (empty($nameArray)) return null;
        if (isset($nameArray[0]['text'])) return $nameArray[0]['text'];
        
        $given = implode(' ', $nameArray[0]['given'] ?? []);
        $family = $nameArray[0]['family'] ?? '';
        return trim("$given $family");
    }
}
