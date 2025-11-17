<?php

namespace App\Http\Controllers\SatuSehat\PelayananRawatJalan;

use App\Http\Controllers\Controller;
use App\Traits\SatuSehatTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB as FacadesDB;

class SatuSehatRajalController extends Controller
{
    use SatuSehatTraits;

    protected function orgRef(): ?string
    {
        return $this->satusehatOrganizationReference();
    }

    public function createEncounter(Request $request)
    {
        $patientId = trim((string) $request->input('patient_id', ''));
        $practitionerId = trim((string) $request->input('practitioner_id', ''));
        $locationId = trim((string) $request->input('location_id', ''));
        $organizationId = trim((string) $request->input('organization_id', ''));
        $status = trim((string) $request->input('status', 'in-progress'));
        $classCode = trim((string) $request->input('class_code', 'AMB'));
        $start = trim((string) $request->input('start', ''));
        $end = trim((string) $request->input('end', ''));
        $resource = $request->input('resource');
        $noRawatInput = trim((string) $request->input('no_rawat', ''));

        if (is_array($resource)) {
            $body = $resource;
        } else {
            if ($patientId === '' || $practitionerId === '' || $locationId === '') {
                return response()->json([
                    'ok' => false,
                    'message' => 'patient_id, practitioner_id, dan location_id wajib diisi',
                ], 422);
            }
            $body = [
                'resourceType' => 'Encounter',
                'status' => $status ?: 'in-progress',
                'class' => [
                    'system' => 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                    'code' => $classCode ?: 'AMB',
                ],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'participant' => [
                    ['individual' => ['reference' => 'Practitioner/' . $practitionerId]],
                ],
                'location' => [
                    ['location' => ['reference' => 'Location/' . $locationId]],
                ],
            ];
            $orgRefRoot = $this->orgRef();
            if ($orgRefRoot) {
                $body['serviceProvider'] = ['reference' => $orgRefRoot];
            } else {
                if ($organizationId !== '') {
                    $body['serviceProvider'] = ['reference' => 'Organization/' . $organizationId];
                } else {
                    return response()->json([
                        'ok' => false,
                        'message' => 'organization_id wajib diisi atau konfigurasi Organization tidak tersedia',
                    ], 422);
                }
            }
            if ($start !== '' || $end !== '') {
                $period = [];
                if ($start !== '') { $period['start'] = $start; }
                if ($end !== '') { $period['end'] = $end; }
                $body['period'] = $period;
            }

            $orgIhs = $this->satusehatOrganizationId();
            if ($orgIhs === '') {
                return response()->json([
                    'ok' => false,
                    'message' => 'SATUSEHAT_ORG_ID belum diisi untuk identifier.system Encounter',
                ], 422);
            }
            $idSystem = 'http://sys-ids.kemkes.go.id/encounter/' . $orgIhs;
            if ($noRawatInput !== '') {
                $body['identifier'] = [[
                    'system' => $idSystem,
                    'use' => 'official',
                    'value' => $noRawatInput,
                ]];
            } else {
                $body['identifier'] = [[
                    'system' => $idSystem,
                    'use' => 'official',
                    'value' => $patientId . '-' . ($start ?: date('Y-m-d\TH:i:s+07:00')),
                ]];
            }
            if ($start !== '') {
                $body['statusHistory'] = [
                    [
                        'status' => 'arrived',
                        'period' => [ 'start' => $start ],
                    ],
                    [
                        'status' => 'in-progress',
                        'period' => [ 'start' => $start ],
                    ],
                ];
            }
        }

        $res = $this->satusehatRequest('POST', 'Encounter', $body, [
            'prefer_representation' => true,
        ]);
        if (! $res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }
        try {
            $noRawat = $noRawatInput;
            $id = is_array($res['json'] ?? null) ? (string) ($res['json']['id'] ?? '') : '';
            if ($noRawat !== '' && $id !== '') {
                DB::table('satu_sehat_encounter')->updateOrInsert(
                    ['no_rawat' => $noRawat],
                    ['id_encounter' => $id]
                );
                Log::channel('daily')->info('[SATUSEHAT][Encounter POST] stored', [
                    'no_rawat' => $noRawat,
                    'encounter_id' => $id,
                    'status' => $res['status'],
                ]);
            }
        } catch (\Throwable $e) {
            Log::channel('daily')->error('[SATUSEHAT][Encounter POST] store failed', [
                'error' => $e->getMessage(),
            ]);
        }
        return response()->json([
            'ok' => true,
            'status' => $res['status'],
            'resource' => $res['json'] ?? null,
        ]);
    }

    public function createCondition(Request $request)
    {
        $patientId = trim((string) $request->input('patient_id', ''));
        $encounterId = trim((string) $request->input('encounter_id', ''));
        $practitionerId = trim((string) $request->input('practitioner_id', ''));
        $icd10 = trim((string) $request->input('icd10', ''));
        $display = trim((string) $request->input('display', ''));
        $clinicalStatus = trim((string) $request->input('clinical_status', 'active'));
        $recordedDate = trim((string) $request->input('recorded_date', ''));
        $onsetDateTime = trim((string) $request->input('onset_date_time', ''));
        $resource = $request->input('resource');

        if (is_array($resource)) {
            $body = $resource;
        } else {
            if ($patientId === '' || $encounterId === '' || $icd10 === '') {
                return response()->json([
                    'ok' => false,
                    'message' => 'patient_id, encounter_id, dan icd10 wajib diisi',
                ], 422);
            }
            $body = [
                'resourceType' => 'Condition',
                'clinicalStatus' => [
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                        'code' => $clinicalStatus ?: 'active',
                    ]],
                ],
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/condition-category',
                        'code' => 'encounter-diagnosis',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://hl7.org/fhir/sid/icd-10',
                        'code' => $icd10,
                        'display' => $display ?: $icd10,
                    ]],
                    'text' => $display ?: $icd10,
                ],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
            ];
            if ($practitionerId !== '') {
                $body['asserter'] = ['reference' => 'Practitioner/' . $practitionerId];
            }
            if ($recordedDate !== '') {
                $body['recordedDate'] = $recordedDate;
            }
            if ($onsetDateTime !== '') {
                $body['onsetDateTime'] = $onsetDateTime;
            }
        }

        $res = $this->satusehatRequest('POST', 'Condition', $body, [
            'prefer_representation' => true,
        ]);
        if (! $res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }
        return response()->json([
            'ok' => true,
            'status' => $res['status'],
            'resource' => $res['json'] ?? null,
        ]);
    }

    public function createObservation(Request $request)
    {
        $type = trim((string) $request->input('type', ''));
        $patientId = trim((string) $request->input('patient_id', ''));
        $encounterId = trim((string) $request->input('encounter_id', ''));
        $effectiveDateTime = trim((string) $request->input('effectiveDateTime', ''));
        $status = trim((string) $request->input('status', 'final'));
        $resource = $request->input('resource');

        if (is_array($resource)) {
            $body = $resource;
        } else {
            if ($patientId === '' || $encounterId === '' || $type === '') {
                return response()->json([
                    'ok' => false,
                    'message' => 'type, patient_id, dan encounter_id wajib diisi',
                ], 422);
            }

            $code = null;
            $valueQuantity = null;
            $components = null;
            if ($type === 'temperature') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '8310-5', 'display' => 'Body temperature']]];
                $valueQuantity = [
                    'value' => (float) $request->input('value'),
                    'unit' => 'Cel',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => 'Cel',
                ];
            } elseif ($type === 'heart_rate') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '8867-4', 'display' => 'Heart rate']]];
                $valueQuantity = [
                    'value' => (float) $request->input('value'),
                    'unit' => '/min',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '/min',
                ];
            } elseif ($type === 'respiratory_rate') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '9279-1', 'display' => 'Respiratory rate']]];
                $valueQuantity = [
                    'value' => (float) $request->input('value'),
                    'unit' => '/min',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '/min',
                ];
            } elseif ($type === 'spo2') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '59408-5', 'display' => 'Oxygen saturation in Arterial blood by Pulse oximetry']]];
                $valueQuantity = [
                    'value' => (float) $request->input('value'),
                    'unit' => '%',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '%',
                ];
            } elseif ($type === 'height') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '8302-2', 'display' => 'Body height']]];
                $valueQuantity = [
                    'value' => (float) $request->input('value'),
                    'unit' => 'cm',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => 'cm',
                ];
            } elseif ($type === 'weight') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '29463-7', 'display' => 'Body weight']]];
                $valueQuantity = [
                    'value' => (float) $request->input('value'),
                    'unit' => 'kg',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => 'kg',
                ];
            } elseif ($type === 'blood_pressure') {
                $code = ['coding' => [['system' => 'http://loinc.org', 'code' => '85354-9', 'display' => 'Blood pressure panel with two readings']]];
                $components = [
                    [
                        'code' => ['coding' => [['system' => 'http://loinc.org', 'code' => '8480-6', 'display' => 'Systolic blood pressure']]],
                        'valueQuantity' => [
                            'value' => (float) $request->input('systolic_value'),
                            'unit' => 'mmHg',
                            'system' => 'http://unitsofmeasure.org',
                            'code' => 'mm[Hg]',
                        ],
                    ],
                    [
                        'code' => ['coding' => [['system' => 'http://loinc.org', 'code' => '8462-4', 'display' => 'Diastolic blood pressure']]],
                        'valueQuantity' => [
                            'value' => (float) $request->input('diastolic_value'),
                            'unit' => 'mmHg',
                            'system' => 'http://unitsofmeasure.org',
                            'code' => 'mm[Hg]',
                        ],
                    ],
                ];
            } else {
                return response()->json([
                    'ok' => false,
                    'message' => 'type tidak didukung',
                ], 422);
            }

            $body = [
                'resourceType' => 'Observation',
                'status' => $status ?: 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => $code,
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
            ];
            if ($effectiveDateTime !== '') { $body['effectiveDateTime'] = $effectiveDateTime; }
            if ($components) { $body['component'] = $components; }
            if ($valueQuantity) { $body['valueQuantity'] = $valueQuantity; }
        }

        $res = $this->satusehatRequest('POST', 'Observation', $body, [
            'prefer_representation' => true,
        ]);
        if (! $res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }
        return response()->json([
            'ok' => true,
            'status' => $res['status'],
            'resource' => $res['json'] ?? null,
        ]);
    }

    public function createProcedure(Request $request)
    {
        $patientId = trim((string) $request->input('patient_id', ''));
        $encounterId = trim((string) $request->input('encounter_id', ''));
        $practitionerId = trim((string) $request->input('practitioner_id', ''));
        $codeSystem = trim((string) $request->input('code_system', ''));
        $code = trim((string) $request->input('code', ''));
        $display = trim((string) $request->input('display', ''));
        $status = trim((string) $request->input('status', 'completed'));
        $performedDateTime = trim((string) $request->input('performedDateTime', ''));
        $resource = $request->input('resource');

        if (is_array($resource)) {
            $body = $resource;
        } else {
            if ($patientId === '' || $encounterId === '' || $codeSystem === '' || $code === '') {
                return response()->json([
                    'ok' => false,
                    'message' => 'patient_id, encounter_id, code_system, dan code wajib diisi',
                ], 422);
            }
            $body = [
                'resourceType' => 'Procedure',
                'status' => $status ?: 'completed',
                'code' => [
                    'coding' => [[
                        'system' => $codeSystem,
                        'code' => $code,
                        'display' => $display ?: $code,
                    ]],
                    'text' => $display ?: $code,
                ],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
            ];
            if ($practitionerId !== '') {
                $body['performer'] = [[
                    'actor' => ['reference' => 'Practitioner/' . $practitionerId],
                ]];
            }
            if ($performedDateTime !== '') {
                $body['performedDateTime'] = $performedDateTime;
            }
        }

        $res = $this->satusehatRequest('POST', 'Procedure', $body, [
            'prefer_representation' => true,
        ]);
        if (! $res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }
        return response()->json([
            'ok' => true,
            'status' => $res['status'],
            'resource' => $res['json'] ?? null,
        ]);
    }

    public function createComposition(Request $request)
    {
        $patientId = trim((string) $request->input('patient_id', ''));
        $encounterId = trim((string) $request->input('encounter_id', ''));
        $practitionerId = trim((string) $request->input('practitioner_id', ''));
        $title = trim((string) $request->input('title', 'RME Rawat Jalan'));
        $date = trim((string) $request->input('date', ''));
        $resource = $request->input('resource');

        if (is_array($resource)) {
            $body = $resource;
        } else {
            if ($patientId === '' || $encounterId === '' || $practitionerId === '') {
                return response()->json([
                    'ok' => false,
                    'message' => 'patient_id, encounter_id, dan practitioner_id wajib diisi',
                ], 422);
            }
            $sections = [];
            $subjectiveText = trim((string) $request->input('subjective_text', ''));
            $objectiveText = trim((string) $request->input('objective_text', ''));
            $assessmentText = trim((string) $request->input('assessment_text', ''));
            $planText = trim((string) $request->input('plan_text', ''));
            $subjectiveRefs = $request->input('subjective_refs', []);
            $objectiveRefs = $request->input('objective_refs', []);
            $assessmentRefs = $request->input('assessment_refs', []);
            $planRefs = $request->input('plan_refs', []);

            if ($subjectiveText !== '' || !empty($subjectiveRefs)) {
                $sec = ['title' => 'Subjective'];
                if ($subjectiveText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $subjectiveText]; }
                if (is_array($subjectiveRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $subjectiveRefs); }
                $sections[] = $sec;
            }
            if ($objectiveText !== '' || !empty($objectiveRefs)) {
                $sec = ['title' => 'Objective'];
                if ($objectiveText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $objectiveText]; }
                if (is_array($objectiveRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $objectiveRefs); }
                $sections[] = $sec;
            }
            if ($assessmentText !== '' || !empty($assessmentRefs)) {
                $sec = ['title' => 'Assessment'];
                if ($assessmentText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $assessmentText]; }
                if (is_array($assessmentRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $assessmentRefs); }
                $sections[] = $sec;
            }
            if ($planText !== '' || !empty($planRefs)) {
                $sec = ['title' => 'Plan'];
                if ($planText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $planText]; }
                if (is_array($planRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $planRefs); }
                $sections[] = $sec;
            }

            $body = [
                'resourceType' => 'Composition',
                'status' => 'final',
                'type' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '37145-9',
                        'display' => 'Outpatient Note',
                    ]],
                ],
                'title' => $title,
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
                'author' => [['reference' => 'Practitioner/' . $practitionerId]],
                'section' => $sections,
            ];
            if ($date !== '') { $body['date'] = $date; }
        }

        $res = $this->satusehatRequest('POST', 'Composition', $body, [
            'prefer_representation' => true,
        ]);
        if (! $res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }
        return response()->json([
            'ok' => true,
            'status' => $res['status'],
            'resource' => $res['json'] ?? null,
        ]);
    }

    public function createBundle(Request $request)
    {
        $entries = $request->input('entries');
        $type = trim((string) $request->input('type', 'transaction'));
        if (! is_array($entries) || empty($entries)) {
            return response()->json([
                'ok' => false,
                'message' => 'entries wajib diisi sebagai array',
            ], 422);
        }
        $body = [
            'resourceType' => 'Bundle',
            'type' => $type ?: 'transaction',
            'entry' => $entries,
        ];

        $res = $this->satusehatRequest('POST', 'Bundle', $body, [
            'prefer_representation' => true,
        ]);
        if (! $res['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $res['status'],
                'error' => $res['error'],
                'body' => $res['body'] ?? null,
            ], $res['status'] ?: 400);
        }
        return response()->json([
            'ok' => true,
            'status' => $res['status'],
            'bundle' => $res['json'] ?? null,
        ]);
    }

    public function updateEncounterByRawat(Request $request, string $no_rawat)
    {
        $encounterId = trim((string) $request->input('encounter_id', ''));
        $status = trim((string) $request->input('status', 'finished'));
        $tz = trim((string) $request->input('tz_offset', '+07:00'));
        $endOverride = trim((string) $request->input('end', ''));

        if ($encounterId === '') {
            return response()->json([
                'ok' => false,
                'message' => 'encounter_id wajib diisi',
            ], 422);
        }

        $row = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $no_rawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->first(['tgl_perawatan', 'jam_rawat']);

        if (!$row && $endOverride === '') {
            return response()->json([
                'ok' => false,
                'message' => 'Data pemeriksaan_ralan tidak ditemukan untuk no_rawat ini',
            ], 404);
        }

        $end = $endOverride !== ''
            ? $endOverride
            : ((string) ($row->tgl_perawatan ?? '') . 'T' . (string) ($row->jam_rawat ?? '') . $tz);

        // Derive start from Encounter payload or from reg_periksa
        $reg = FacadesDB::table('reg_periksa')->where('no_rawat', $no_rawat)->first(['tgl_registrasi', 'jam_reg']);

        $read = $this->satusehatRequest('GET', 'Encounter/' . $encounterId);
        if (! $read['ok'] || ! is_array($read['json'] ?? null)) {
            return response()->json([
                'ok' => false,
                'status' => $read['status'],
                'error' => $read['error'],
                'body' => $read['body'] ?? null,
            ], $read['status'] ?: 400);
        }

        $payload = $read['json'];
        $payload['resourceType'] = 'Encounter';
        $payload['id'] = $encounterId;
        $payload['status'] = $status ?: 'finished';
        $period = is_array($payload['period'] ?? null) ? $payload['period'] : [];
        $period['end'] = $end;
        if (empty($period['start'])) {
            $period['start'] = ($reg && !empty($reg->tgl_registrasi) && !empty($reg->jam_reg))
                ? ((string) $reg->tgl_registrasi . 'T' . (string) $reg->jam_reg . $tz)
                : $end;
        }
        $payload['period'] = $period;

        $startVal = (string) ($period['start'] ?? '');
        $sh = is_array($payload['statusHistory'] ?? null) ? $payload['statusHistory'] : [];
        // Ensure every statusHistory has both period.start and period.end
        $newSh = [];
        $newSh[] = ['status' => 'arrived', 'period' => ['start' => $startVal ?: $end, 'end' => $startVal ?: $end]];
        $newSh[] = ['status' => 'in-progress', 'period' => ['start' => $startVal ?: $end, 'end' => $end]];
        $newSh[] = ['status' => 'finished', 'period' => ['start' => $end, 'end' => $end]];
        $payload['statusHistory'] = $newSh;

        // Ensure Encounter.diagnosis exists by creating Condition from local diagnosa_pasien if missing
        $hasDiagnosis = is_array($payload['diagnosis'] ?? null) && count($payload['diagnosis']) > 0;
        if (! $hasDiagnosis) {
            $patientRef = (string) ($payload['subject']['reference'] ?? '');
            $patientId = '';
            if (strpos($patientRef, 'Patient/') === 0) { $patientId = substr($patientRef, strlen('Patient/')); }
            $pracRef = '';
            if (is_array($payload['participant'] ?? null) && isset($payload['participant'][0]['individual']['reference'])) {
                $pracRef = (string) $payload['participant'][0]['individual']['reference'];
            }
            $pracId = '';
            if (strpos($pracRef, 'Practitioner/') === 0) { $pracId = substr($pracRef, strlen('Practitioner/')); }
            $dxList = FacadesDB::table('diagnosa_pasien')
                ->where('no_rawat', $no_rawat)
                ->orderBy('prioritas', 'asc')
                ->limit(3)
                ->get(['kd_penyakit']);
            $diagEntries = [];
            foreach ($dxList as $i => $dx) {
                $icd10 = trim((string) ($dx->kd_penyakit ?? ''));
                if ($icd10 === '' || $patientId === '') { continue; }
                $condBody = [
                    'resourceType' => 'Condition',
                    'clinicalStatus' => [ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical', 'code' => 'active' ]] ],
                    'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/condition-category', 'code' => 'encounter-diagnosis' ]] ]],
                    'code' => [ 'coding' => [[ 'system' => 'http://hl7.org/fhir/sid/icd-10', 'code' => $icd10, 'display' => $icd10 ]], 'text' => $icd10 ],
                    'subject' => [ 'reference' => 'Patient/' . $patientId ],
                    'encounter' => [ 'reference' => 'Encounter/' . $encounterId ],
                ];
                if ($pracId !== '') { $condBody['asserter'] = [ 'reference' => 'Practitioner/' . $pracId ]; }
                $cRes = $this->satusehatRequest('POST', 'Condition', $condBody, [ 'prefer_representation' => true ]);
                if ($cRes['ok'] && is_array($cRes['json'] ?? null)) {
                    $cid = (string) ($cRes['json']['id'] ?? '');
                    if ($cid !== '') {
                        $diagEntries[] = [ 'condition' => [ 'reference' => 'Condition/' . $cid ], 'rank' => $i + 1 ];
                    }
                }
            }
            if (! empty($diagEntries)) {
                $payload['diagnosis'] = $diagEntries;
            }
        }

        $update = $this->satusehatRequest('PUT', 'Encounter/' . $encounterId, $payload, [
            'prefer_representation' => true,
        ]);
            if (! $update['ok']) {
                return response()->json([
                    'ok' => false,
                    'status' => $update['status'],
                    'error' => $update['error'],
                    'body' => $update['body'] ?? null,
                ], $update['status'] ?: 400);
            }

            try {
                $savedId = is_array($update['json'] ?? null) ? (string) ($update['json']['id'] ?? '') : $encounterId;
                DB::table('satu_sehat_encounter')->updateOrInsert(
                    ['no_rawat' => $no_rawat],
                    ['id_encounter_2' => $savedId]
                );
                Log::channel('daily')->info('[SATUSEHAT][Encounter PUT] stored', [
                    'no_rawat' => $no_rawat,
                    'encounter_id' => $savedId,
                    'status' => $update['status'],
                ]);
            } catch (\Throwable $e) {
                Log::channel('daily')->error('[SATUSEHAT][Encounter PUT] store failed', [
                    'error' => $e->getMessage(),
                ]);
            }

        return response()->json([
            'ok' => true,
            'status' => $update['status'],
            'resource' => $update['json'] ?? null,
        ]);
    }

    /**
     * Mendapatkan Encounter ID dari SATUSEHAT menggunakan identifier no_rawat.
     * Fallback: baca dari tabel lokal satu_sehat_encounter jika tidak ditemukan di SATUSEHAT.
     */
    public function encounterIdByRawat(string $no_rawat)
    {
        $orgIhs = $this->satusehatOrganizationId();
        if ($orgIhs === '') {
            return response()->json([
                'ok' => false,
                'message' => 'SATUSEHAT_ORG_ID belum diisi',
            ], 422);
        }
        $system = 'http://sys-ids.kemkes.go.id/encounter/' . $orgIhs;
        $identifierToken = $system . '|' . $no_rawat;
        $res = $this->satusehatRequest('GET', 'Encounter', null, [ 'query' => [ 'identifier' => $identifierToken ] ]);
        if ($res['ok'] && isset(($res['json']['entry'] ?? [])[0]['resource']['id'])) {
            return response()->json([
                'ok' => true,
                'encounter_id' => (string) $res['json']['entry'][0]['resource']['id'],
            ]);
        }

        $local = FacadesDB::table('satu_sehat_encounter')->where('no_rawat', $no_rawat)->first(['id_encounter']);
        if ($local && !empty($local->id_encounter)) {
            return response()->json([
                'ok' => true,
                'encounter_id' => (string) $local->id_encounter,
                'source' => 'local',
            ]);
        }

        return response()->json([
            'ok' => false,
            'message' => 'Encounter ID tidak ditemukan',
        ], 404);
    }

    public function encounterTableDescribe()
    {
        $cols = FacadesDB::select('SHOW COLUMNS FROM `satu_sehat_encounter`');
        $count = FacadesDB::table('satu_sehat_encounter')->count();
        return response()->json([
            'ok' => true,
            'columns' => $cols,
            'count' => $count,
        ]);
    }

    public function diagnosaPasienDescribe()
    {
        $cols = FacadesDB::select('SHOW COLUMNS FROM `diagnosa_pasien`');
        $count = FacadesDB::table('diagnosa_pasien')->count();
        return response()->json([
            'ok' => true,
            'columns' => $cols,
            'count' => $count,
        ]);
    }

    public function pipelineByRawat(Request $request, string $no_rawat)
    {
        $tz = trim((string) $request->input('tz_offset', '+07:00'));

        $encounterId = '';
        $local = FacadesDB::table('satu_sehat_encounter')->where('no_rawat', $no_rawat)->first(['id_encounter_2', 'id_encounter']);
        if ($local) {
            $encounterId = (string) ($local->id_encounter_2 ?: $local->id_encounter ?: '');
        }
        if ($encounterId === '') {
            $orgIhs = $this->satusehatOrganizationId();
            if ($orgIhs !== '') {
                $system = 'http://sys-ids.kemkes.go.id/encounter/' . $orgIhs;
                $identifierToken = $system . '|' . $no_rawat;
                $look = $this->satusehatRequest('GET', 'Encounter', null, [ 'query' => [ 'identifier' => $identifierToken ] ]);
                if ($look['ok'] && isset(($look['json']['entry'] ?? [])[0]['resource']['id'])) {
                    $encounterId = (string) $look['json']['entry'][0]['resource']['id'];
                }
            }
        }
        if ($encounterId === '') {
            return response()->json([
                'ok' => false,
                'message' => 'Encounter ID tidak ditemukan untuk no_rawat ini',
            ], 404);
        }

        $encRead = $this->satusehatRequest('GET', 'Encounter/' . $encounterId);
        if (! $encRead['ok'] || ! is_array($encRead['json'] ?? null)) {
            return response()->json([
                'ok' => false,
                'status' => $encRead['status'],
                'error' => $encRead['error'],
                'body' => $encRead['body'] ?? null,
            ], $encRead['status'] ?: 400);
        }
        $encPayload = $encRead['json'];
        $patientRef = (string) ($encPayload['subject']['reference'] ?? '');
        $patientId = '';
        if (strpos($patientRef, 'Patient/') === 0) { $patientId = substr($patientRef, strlen('Patient/')); }
        $pracRef = '';
        if (is_array($encPayload['participant'] ?? null) && isset($encPayload['participant'][0]['individual']['reference'])) {
            $pracRef = (string) $encPayload['participant'][0]['individual']['reference'];
        }
        $practitionerId = '';
        if (strpos($pracRef, 'Practitioner/') === 0) { $practitionerId = substr($pracRef, strlen('Practitioner/')); }
        $orgRefRoot = $this->orgRef();
        if ($patientId === '') {
            return response()->json([
                'ok' => false,
                'message' => 'Patient ID tidak ditemukan dari Encounter',
            ], 422);
        }

        $pem = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $no_rawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->first(['tgl_perawatan','jam_rawat','keluhan','pemeriksaan','nadi','tinggi','berat','kesadaran','penilaian','instruksi','alergi']);

        $eff = '';
        if ($pem && !empty($pem->tgl_perawatan) && !empty($pem->jam_rawat)) {
            $eff = ((string) $pem->tgl_perawatan . 'T' . (string) $pem->jam_rawat . $tz);
        } else {
            $reg = FacadesDB::table('reg_periksa')->where('no_rawat', $no_rawat)->first(['tgl_registrasi','jam_reg']);
            if ($reg && !empty($reg->tgl_registrasi) && !empty($reg->jam_reg)) {
                $eff = ((string) $reg->tgl_registrasi . 'T' . (string) $reg->jam_reg . $tz);
            }
        }

        $practitionerIdLocal = '';
        $petugas = FacadesDB::table('pemeriksaan_ralan')
            ->join('pegawai', 'pemeriksaan_ralan.nip', '=', 'pegawai.nik')
            ->where('pemeriksaan_ralan.no_rawat', $no_rawat)
            ->orderByDesc('pemeriksaan_ralan.tgl_perawatan')
            ->orderByDesc('pemeriksaan_ralan.jam_rawat')
            ->first(['pegawai.no_ktp', 'pemeriksaan_ralan.nip']);
        $nikRaw = '';
        if ($petugas && !empty($petugas->no_ktp)) { $nikRaw = (string) $petugas->no_ktp; }
        $nik = preg_replace('/\D/', '', $nikRaw);
        $detail = '';
        if (! $petugas) {
            $detail = 'Petugas pemeriksaan tidak ditemukan untuk no_rawat ini';
        } elseif ($nikRaw === '' || $nik === '') {
            $detail = 'NIK petugas kosong';
        } elseif (strlen($nik) !== 16) {
            $detail = 'NIK petugas tidak 16 digit';
        } else {
            $lookPr = $this->satusehatRequest('GET', 'Practitioner', null, [ 'query' => [ 'identifier' => 'https://fhir.kemkes.go.id/id/nik|' . $nik ] ]);
            if ($lookPr['ok'] && isset(($lookPr['json']['entry'] ?? [])[0]['resource']['id'])) {
                $practitionerIdLocal = (string) $lookPr['json']['entry'][0]['resource']['id'];
            } else {
                $detail = 'Practitioner tidak ditemukan di SATUSEHAT untuk NIK ' . $nik;
            }
        }
        if ($practitionerIdLocal === '') {
            return response()->json([
                'ok' => false,
                'code' => 'PRACTITIONER_REQUIRED',
                'message' => 'Performer wajib Practitioner dari petugas pemeriksaan',
                'detail' => $detail,
                'no_rawat' => $no_rawat,
                'nip' => $petugas->nip ?? null,
                'nik' => $nik ?: null,
            ], 422);
        }
        $practitionerId = $practitionerIdLocal;

        $createdObs = [];
        if ($pem && is_numeric($pem->nadi) && (float) $pem->nadi > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/observation-category', 'code' => 'vital-signs' ]] ]],
                'code' => ['coding' => [[ 'system' => 'http://loinc.org', 'code' => '8867-4', 'display' => 'Heart rate' ]]],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
                'valueQuantity' => [ 'value' => (float) $pem->nadi, 'unit' => '/min', 'system' => 'http://unitsofmeasure.org', 'code' => '/min' ],
                'performer' => [[ 'reference' => 'Practitioner/' . $practitionerId ]],
            ];
            if ($eff !== '') { $body['effectiveDateTime'] = $eff; }
            $res = $this->satusehatRequest('POST', 'Observation', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $createdObs[] = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Observation] heart_rate', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }
        if ($pem && is_numeric($pem->tinggi) && (float) $pem->tinggi > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/observation-category', 'code' => 'vital-signs' ]] ]],
                'code' => ['coding' => [[ 'system' => 'http://loinc.org', 'code' => '8302-2', 'display' => 'Body height' ]]],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
                'valueQuantity' => [ 'value' => (float) $pem->tinggi, 'unit' => 'cm', 'system' => 'http://unitsofmeasure.org', 'code' => 'cm' ],
                'performer' => [[ 'reference' => 'Practitioner/' . $practitionerId ]],
            ];
            if ($eff !== '') { $body['effectiveDateTime'] = $eff; }
            $res = $this->satusehatRequest('POST', 'Observation', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $createdObs[] = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Observation] height', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }
        if ($pem && is_numeric($pem->berat) && (float) $pem->berat > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/observation-category', 'code' => 'vital-signs' ]] ]],
                'code' => ['coding' => [[ 'system' => 'http://loinc.org', 'code' => '29463-7', 'display' => 'Body weight' ]]],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
                'valueQuantity' => [ 'value' => (float) $pem->berat, 'unit' => 'kg', 'system' => 'http://unitsofmeasure.org', 'code' => 'kg' ],
                'performer' => [[ 'reference' => 'Practitioner/' . $practitionerId ]],
            ];
            if ($eff !== '') { $body['effectiveDateTime'] = $eff; }
            $res = $this->satusehatRequest('POST', 'Observation', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $createdObs[] = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Observation] weight', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }
        if ($pem && !empty($pem->kesadaran)) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/observation-category', 'code' => 'vital-signs' ]] ]],
                'code' => ['coding' => [[ 'system' => 'http://snomed.info/sct', 'code' => '110444000', 'display' => 'Level of consciousness' ]], 'text' => 'Consciousness'],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
                'valueString' => trim((string) $pem->kesadaran),
                'performer' => [[ 'reference' => 'Practitioner/' . $practitionerId ]],
            ];
            if ($eff !== '') { $body['effectiveDateTime'] = $eff; }
            $res = $this->satusehatRequest('POST', 'Observation', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $createdObs[] = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Observation] consciousness', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }

        $createdCond = [];
        if ($pem && !empty($pem->keluhan)) {
            $body = [
                'resourceType' => 'Condition',
                'clinicalStatus' => [ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical', 'code' => 'active' ]] ],
                'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/condition-category', 'code' => 'encounter-diagnosis' ]] ]],
                'code' => [ 'coding' => [[ 'system' => 'http://snomed.info/sct', 'code' => '404684003', 'display' => 'Clinical finding' ]], 'text' => trim((string) $pem->keluhan) ],
                'subject' => [ 'reference' => 'Patient/' . $patientId ],
                'encounter' => [ 'reference' => 'Encounter/' . $encounterId ],
            ];
            if ($practitionerId !== '') { $body['asserter'] = [ 'reference' => 'Practitioner/' . $practitionerId ]; }
            $res = $this->satusehatRequest('POST', 'Condition', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $createdCond[] = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Condition] keluhan', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }
        if ($pem && !empty($pem->pemeriksaan)) {
            $body = [
                'resourceType' => 'Condition',
                'clinicalStatus' => [ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical', 'code' => 'active' ]] ],
                'category' => [[ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/condition-category', 'code' => 'encounter-diagnosis' ]] ]],
                'code' => [ 'coding' => [[ 'system' => 'http://snomed.info/sct', 'code' => '404684003', 'display' => 'Clinical finding' ]], 'text' => trim((string) $pem->pemeriksaan) ],
                'subject' => [ 'reference' => 'Patient/' . $patientId ],
                'encounter' => [ 'reference' => 'Encounter/' . $encounterId ],
            ];
            if ($practitionerId !== '') { $body['asserter'] = [ 'reference' => 'Practitioner/' . $practitionerId ]; }
            $res = $this->satusehatRequest('POST', 'Condition', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $createdCond[] = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Condition] pemeriksaan', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }

        $allergyId = '';
        if ($pem && !empty($pem->alergi)) {
            $body = [
                'resourceType' => 'AllergyIntolerance',
                'clinicalStatus' => [ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical', 'code' => 'active' ]] ],
                'verificationStatus' => [ 'coding' => [[ 'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification', 'code' => 'confirmed' ]] ],
                'type' => 'allergy',
                'category' => ['medication'],
                'code' => [ 'coding' => [[ 'system' => 'http://snomed.info/sct', 'code' => '416098002', 'display' => 'Drug allergy' ]], 'text' => trim((string) $pem->alergi) ],
                'patient' => [ 'reference' => 'Patient/' . $patientId ],
                'encounter' => [ 'reference' => 'Encounter/' . $encounterId ],
                'recorder' => $practitionerId !== '' ? [ 'reference' => 'Practitioner/' . $practitionerId ] : [ 'reference' => 'Patient/' . $patientId ],
            ];
            if ($eff !== '') { $body['recordedDate'] = $eff; }
            $res = $this->satusehatRequest('POST', 'AllergyIntolerance', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $allergyId = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][AllergyIntolerance] created', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }

        $procId = '';
        $rujuk = FacadesDB::table('pcare_rujuk_subspesialis')->where('no_rawat', $no_rawat)->orderByDesc('tglDaftar')->first(['noKunjungan']);
        if ($rujuk && !empty($rujuk->noKunjungan)) {
            $body = [
                'resourceType' => 'Procedure',
                'status' => 'completed',
                'code' => [ 'text' => 'Rujukan Subspesialis' ],
                'subject' => ['reference' => 'Patient/' . $patientId],
                'encounter' => ['reference' => 'Encounter/' . $encounterId],
                'identifier' => [[ 'system' => 'http://pcare.bpjs.go.id/rujukan/noKunjungan', 'value' => (string) $rujuk->noKunjungan ]],
            ];
            if ($practitionerId !== '') { $body['performer'] = [[ 'actor' => ['reference' => 'Practitioner/' . $practitionerId] ]]; }
            if ($eff !== '') { $body['performedDateTime'] = $eff; }
            $res = $this->satusehatRequest('POST', 'Procedure', $body, [ 'prefer_representation' => true ]);
            if ($res['ok'] && is_array($res['json'] ?? null)) { $procId = (string) ($res['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Procedure] rujukan', ['no_rawat' => $no_rawat, 'id' => $res['json']['id'] ?? null]); }
        }

        $dx1 = FacadesDB::table('diagnosa_pasien')->where('no_rawat', $no_rawat)->where('prioritas', 1)->orderBy('prioritas', 'asc')->first(['kd_penyakit']);
        $dx2 = FacadesDB::table('diagnosa_pasien')->where('no_rawat', $no_rawat)->where('prioritas', 2)->orderBy('prioritas', 'asc')->first(['kd_penyakit']);
        $dx1Text = $dx1 ? (string) ($dx1->kd_penyakit ?? '') : '';
        $dx2Text = $dx2 ? (string) ($dx2->kd_penyakit ?? '') : '';

        $subjectiveText = $pem ? trim((string) $pem->keluhan) : '';
        $objectiveTextParts = [];
        if ($pem && is_numeric($pem->nadi)) { $objectiveTextParts[] = 'Nadi: ' . (string) $pem->nadi . ' /min'; }
        if ($pem && is_numeric($pem->tinggi)) { $objectiveTextParts[] = 'Tinggi: ' . (string) $pem->tinggi . ' cm'; }
        if ($pem && is_numeric($pem->berat)) { $objectiveTextParts[] = 'Berat: ' . (string) $pem->berat . ' kg'; }
        if ($pem && !empty($pem->kesadaran)) { $objectiveTextParts[] = 'Kesadaran: ' . trim((string) $pem->kesadaran); }
        $objectiveText = implode('; ', $objectiveTextParts);
        $assessmentTextParts = [];
        if ($dx1Text !== '') { $assessmentTextParts[] = 'Diagnosa Primer: ' . $dx1Text; }
        if ($dx2Text !== '') { $assessmentTextParts[] = 'Diagnosa Sekunder: ' . $dx2Text; }
        $assessmentText = implode('; ', $assessmentTextParts);
        $planTextParts = [];
        if ($pem && !empty($pem->penilaian)) { $planTextParts[] = 'Rencana: ' . trim((string) $pem->penilaian); }
        if ($pem && !empty($pem->instruksi)) { $planTextParts[] = 'Instruksi: ' . trim((string) $pem->instruksi); }
        $planText = implode('; ', $planTextParts);

        $subjectiveRefs = [];
        $objectiveRefs = [];
        $assessmentRefs = [];
        $planRefs = [];
        foreach ($createdObs as $oid) { if ($oid !== '') { $objectiveRefs[] = 'Observation/' . $oid; } }
        foreach ($createdCond as $cid) { if ($cid !== '') { $assessmentRefs[] = 'Condition/' . $cid; } }
        if ($procId !== '') { $planRefs[] = 'Procedure/' . $procId; }
        if ($allergyId !== '') { $objectiveRefs[] = 'AllergyIntolerance/' . $allergyId; }

        $compBody = [
            'resourceType' => 'Composition',
            'status' => 'final',
            'type' => [ 'coding' => [[ 'system' => 'http://loinc.org', 'code' => '11506-3', 'display' => 'Progress note' ]] ],
            'title' => 'RME Rawat Jalan',
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'author' => $practitionerId !== '' ? [[ 'reference' => 'Practitioner/' . $practitionerId ]] : [],
            'section' => [],
        ];
        if ($eff !== '') { $compBody['date'] = $eff; }
        if ($subjectiveText !== '' || !empty($subjectiveRefs)) { $sec = ['title' => 'Subjective']; if ($subjectiveText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $subjectiveText]; } if (!empty($subjectiveRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $subjectiveRefs); } $compBody['section'][] = $sec; }
        if ($objectiveText !== '' || !empty($objectiveRefs)) { $sec = ['title' => 'Objective']; if ($objectiveText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $objectiveText]; } if (!empty($objectiveRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $objectiveRefs); } $compBody['section'][] = $sec; }
        if ($assessmentText !== '' || !empty($assessmentRefs)) { $sec = ['title' => 'Assessment']; if ($assessmentText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $assessmentText]; } if (!empty($assessmentRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $assessmentRefs); } $compBody['section'][] = $sec; }
        if ($planText !== '' || !empty($planRefs)) { $sec = ['title' => 'Plan']; if ($planText !== '') { $sec['text'] = ['status' => 'generated', 'div' => $planText]; } if (!empty($planRefs)) { $sec['entry'] = array_map(fn($r) => ['reference' => $r], $planRefs); } $compBody['section'][] = $sec; }

        $compRes = $this->satusehatRequest('POST', 'Composition', $compBody, [ 'prefer_representation' => true ]);
        if (! $compRes['ok']) {
            return response()->json([
                'ok' => false,
                'status' => $compRes['status'],
                'error' => $compRes['error'],
                'body' => $compRes['body'] ?? null,
            ], $compRes['status'] ?: 400);
        }
        $compId = is_array($compRes['json'] ?? null) ? (string) ($compRes['json']['id'] ?? '') : '';
        if ($compId !== '') { Log::channel('daily')->info('[SATUSEHAT][Composition] created', ['no_rawat' => $no_rawat, 'id' => $compId]); }

        $entries = [];
        $compRead = $this->satusehatRequest('GET', 'Composition/' . $compId);
        if ($compRead['ok'] && is_array($compRead['json'] ?? null)) {
            $entries[] = [ 'fullUrl' => 'Composition/' . $compId, 'resource' => $compRead['json'] ];
        }
        foreach ($createdObs as $oid) {
            if ($oid === '') { continue; }
            $r = $this->satusehatRequest('GET', 'Observation/' . $oid);
            if ($r['ok'] && is_array($r['json'] ?? null)) { $entries[] = [ 'fullUrl' => 'Observation/' . $oid, 'resource' => $r['json'] ]; }
        }
        foreach ($createdCond as $cid) {
            if ($cid === '') { continue; }
            $r = $this->satusehatRequest('GET', 'Condition/' . $cid);
            if ($r['ok'] && is_array($r['json'] ?? null)) { $entries[] = [ 'fullUrl' => 'Condition/' . $cid, 'resource' => $r['json'] ]; }
        }
        if ($procId !== '') {
            $r = $this->satusehatRequest('GET', 'Procedure/' . $procId);
            if ($r['ok'] && is_array($r['json'] ?? null)) { $entries[] = [ 'fullUrl' => 'Procedure/' . $procId, 'resource' => $r['json'] ]; }
        }
        if ($allergyId !== '') {
            $r = $this->satusehatRequest('GET', 'AllergyIntolerance/' . $allergyId);
            if ($r['ok'] && is_array($r['json'] ?? null)) { $entries[] = [ 'fullUrl' => 'AllergyIntolerance/' . $allergyId, 'resource' => $r['json'] ]; }
        }

        $bundleId = '';
        if (!empty($entries)) {
            $bundleBody = [ 'resourceType' => 'Bundle', 'type' => 'document', 'entry' => $entries ];
            $bRes = $this->satusehatRequest('POST', 'Bundle', $bundleBody, [ 'prefer_representation' => true ]);
            if ($bRes['ok'] && is_array($bRes['json'] ?? null)) { $bundleId = (string) ($bRes['json']['id'] ?? ''); Log::channel('daily')->info('[SATUSEHAT][Bundle] document created', ['no_rawat' => $no_rawat, 'id' => $bundleId]); }
        }

        return response()->json([
            'ok' => true,
            'encounter_id' => $encounterId,
            'patient_id' => $patientId,
            'practitioner_id' => $practitionerId,
            'observations' => $createdObs,
            'conditions' => $createdCond,
            'procedure_id' => $procId,
            'allergy_intolerance_id' => $allergyId,
            'composition_id' => $compId,
            'bundle_id' => $bundleId,
        ]);
    }
}