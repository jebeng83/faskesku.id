<?php

namespace App\Services\SatuSehat;

use App\Jobs\SatuSehat\ProcessCompositionJob;
use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RajalPipelineService
{
    use SatuSehatTraits;

    private function normalizeSatusehatDateTime(string $value): string
    {
        $value = trim($value);
        if ($value === '') {
            return '';
        }

        $value = preg_replace('/(T\d{2}:\d{2}:\d{2}):\d{2}([+-]\d{2}:\d{2})$/', '$1$2', $value) ?? $value;

        try {
            $dt = \Carbon\Carbon::parse($value, 'Asia/Jakarta');
        } catch (\Throwable) {
            return '';
        }

        $min = \Carbon\Carbon::parse('2014-06-03 00:00:00', 'UTC');
        $dtUtc = $dt->copy()->setTimezone('UTC');
        if ($dtUtc->lt($min)) {
            $dtUtc = $min;
        }

        $nowUtc = \Carbon\Carbon::now('UTC');
        if ($dtUtc->gt($nowUtc)) {
            $dtUtc = $nowUtc;
        }

        return $dtUtc->toIso8601String();
    }

    public function updateEncounterByRawat(string $noRawat, string $encounterId, string $status = 'finished', string $tzOffset = '+07:00', string $endOverride = '', bool $dispatchCompositionJob = true): array
    {
        $status = strtolower(trim((string) $status)) ?: 'finished';
        $tzOffset = trim((string) $tzOffset) ?: '+07:00';

        if ($encounterId === '') {
            return [
                'ok' => false,
                'status' => 422,
                'message' => 'encounter_id wajib diisi',
            ];
        }

        $pem = DB::table('pemeriksaan_ralan')->where('no_rawat', $noRawat)->orderByDesc('tgl_perawatan')->orderByDesc('jam_rawat')->first();
        if (! $pem && trim((string) $endOverride) === '') {
            return [
                'ok' => false,
                'status' => 404,
                'message' => 'Data pemeriksaan_ralan tidak ditemukan untuk no_rawat',
            ];
        }

        $periodEndCandidate = trim((string) $endOverride);
        if ($periodEndCandidate === '' && $pem) {
            $periodEndCandidate = trim((string) ($pem->tgl_perawatan ?? '')).' '.trim((string) ($pem->jam_rawat ?? ''));
        }
        $periodEndLocal = $this->normalizeSatusehatDateTime($periodEndCandidate);
        if ($periodEndLocal === '') {
            return [
                'ok' => false,
                'status' => 422,
                'message' => 'Nilai period.end tidak valid untuk SATUSEHAT',
                'end' => $periodEndCandidate,
            ];
        }

        $encRead = $this->satusehatRequest('GET', 'Encounter/'.$encounterId);
        if (! $encRead['ok']) {
            return [
                'ok' => false,
                'status' => $encRead['status'] ?: 400,
                'error' => $encRead['error'],
                'body' => $encRead['body'] ?? null,
            ];
        }

        if (! is_array($encRead['json'] ?? null)) {
            return [
                'ok' => false,
                'status' => 500,
                'message' => 'Response Encounter tidak valid',
            ];
        }

        $payload = $encRead['json'];
        $payload['resourceType'] = 'Encounter';
        $payload['id'] = $encounterId;
        $payload['status'] = $status;

        $period = is_array($payload['period'] ?? null) ? $payload['period'] : [];
        $existingStart = trim((string) ($period['start'] ?? ''));

        $startCandidate = '';
        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first(['tgl_registrasi', 'jam_reg']);
        if ($reg && ! empty($reg->tgl_registrasi) && ! empty($reg->jam_reg)) {
            $startCandidate = trim((string) $reg->tgl_registrasi).' '.trim((string) $reg->jam_reg);
        }

        $periodStartLocal = $this->normalizeSatusehatDateTime($existingStart !== '' ? $existingStart : ($startCandidate !== '' ? $startCandidate : $periodEndLocal));
        if ($periodStartLocal === '') {
            $periodStartLocal = $periodEndLocal;
        }

        $payload['period'] = [
            'start' => $periodStartLocal,
            'end' => $periodEndLocal,
        ];

        if ($status === 'finished') {
            $payload['statusHistory'] = [
                [
                    'status' => 'arrived',
                    'period' => ['start' => $periodStartLocal, 'end' => $periodStartLocal],
                ],
                [
                    'status' => 'in-progress',
                    'period' => ['start' => $periodStartLocal, 'end' => $periodEndLocal],
                ],
                [
                    'status' => 'finished',
                    'period' => ['start' => $periodEndLocal, 'end' => $periodEndLocal],
                ],
            ];

            $diagnosis = $this->buildEncounterDiagnosis($noRawat);
            if (! empty($diagnosis)) {
                $payload['diagnosis'] = $diagnosis;
            }
        }

        $updateMethod = 'PUT';
        $update = $this->satusehatRequest('PUT', 'Encounter/'.$encounterId, $payload, [
            'prefer_representation' => true,
            'compat' => [
                'encounter_status_history' => 'on',
                'encounter_diagnosis' => 'on',
            ],
        ]);

        if (! $update['ok']) {
            $rawBody = (string) ($update['body'] ?? '');
            $json = is_array($update['json'] ?? null) ? $update['json'] : null;

            $needRetry = false;
            $retryPayload = $payload;

            if ($this->satusehatOperationOutcomeIndicatesStatusHistoryNotFound($json, $rawBody)) {
                if (isset($retryPayload['statusHistory'])) {
                    unset($retryPayload['statusHistory']);
                }
                $needRetry = true;
            }

            if ($this->satusehatOperationOutcomeIndicatesDiagnosisNotFound($json, $rawBody)) {
                if (isset($retryPayload['diagnosis'])) {
                    unset($retryPayload['diagnosis']);
                }
                $needRetry = true;
            }

            if ($needRetry) {
                $update = $this->satusehatRequest('PUT', 'Encounter/'.$encounterId, $retryPayload, [
                    'prefer_representation' => true,
                    'compat' => [
                        'encounter_status_history' => 'off',
                        'encounter_diagnosis' => 'off',
                    ],
                ]);
            }
        }

        if (! $update['ok']) {
            $rawBody = (string) ($update['body'] ?? '');
            $json = is_array($update['json'] ?? null) ? $update['json'] : null;

            $needPatchFallback = $this->satusehatOperationOutcomeIndicatesStatusHistoryNotFound($json, $rawBody)
                || $this->satusehatOperationOutcomeIndicatesDiagnosisNotFound($json, $rawBody);

            if ($needPatchFallback) {
                $orgIhs = $this->satusehatOrganizationId();
                $patch = [
                    ['op' => 'replace', 'path' => '/status', 'value' => $status],
                ];

                $patch[] = ['op' => 'add', 'path' => '/period', 'value' => ['start' => $periodStartLocal, 'end' => $periodEndLocal]];

                $spRef = trim((string) ($payload['serviceProvider']['reference'] ?? ''));
                if ($spRef === '' && $orgIhs !== '') {
                    if (isset($payload['serviceProvider']) && is_array($payload['serviceProvider'])) {
                        $patch[] = [
                            'op' => array_key_exists('reference', $payload['serviceProvider']) ? 'replace' : 'add',
                            'path' => '/serviceProvider/reference',
                            'value' => 'Organization/'.$orgIhs,
                        ];
                    } else {
                        $patch[] = [
                            'op' => 'add',
                            'path' => '/serviceProvider',
                            'value' => ['reference' => 'Organization/'.$orgIhs],
                        ];
                    }
                }

                $patchRes = $this->satusehatRequest('PATCH', 'Encounter/'.$encounterId, $patch, [
                    'prefer_representation' => true,
                ]);

                if (! $patchRes['ok']) {
                    return [
                        'ok' => false,
                        'status' => $patchRes['status'] ?: $update['status'] ?: 400,
                        'error' => $patchRes['error'] ?: $update['error'],
                        'put_body' => $update['body'] ?? null,
                        'patch_body' => $patchRes['body'] ?? null,
                    ];
                }

                $updateMethod = 'PATCH';
                $update = $patchRes;
            } else {
                return [
                    'ok' => false,
                    'status' => $update['status'] ?: 400,
                    'error' => $update['error'],
                    'body' => $update['body'] ?? null,
                ];
            }
        }

        if (! $update['ok']) {
            return [
                'ok' => false,
                'status' => $update['status'] ?: 400,
                'error' => $update['error'],
                'body' => $update['body'] ?? null,
            ];
        }

        try {
            $savedId = is_array($update['json'] ?? null) ? (string) ($update['json']['id'] ?? '') : $encounterId;
            DB::table('satu_sehat_encounter')->updateOrInsert(
                ['no_rawat' => $noRawat],
                ['id_encounter_2' => $savedId]
            );

            if ($dispatchCompositionJob && $status === 'finished') {
                $patientRef = (string) ($payload['subject']['reference'] ?? '');
                $patientId = str_starts_with($patientRef, 'Patient/') ? substr($patientRef, strlen('Patient/')) : '';

                $pracRef = '';
                if (is_array($payload['participant'] ?? null) && isset($payload['participant'][0]['individual']['reference'])) {
                    $pracRef = (string) $payload['participant'][0]['individual']['reference'];
                }
                $practitionerId = str_starts_with($pracRef, 'Practitioner/') ? substr($pracRef, strlen('Practitioner/')) : '';

                if ($patientId !== '') {
                    ProcessCompositionJob::dispatch($noRawat, $savedId, $patientId, $practitionerId, (string) ($period['end'] ?? ''));
                }
            }
        } catch (\Throwable $e) {
            Log::channel('daily')->error('[SATUSEHAT][Encounter '.$updateMethod.'] store failed', [
                'no_rawat' => $noRawat,
                'error' => $e->getMessage(),
            ]);
        }

        return [
            'ok' => true,
            'status' => $update['status'] ?? 200,
            'resource' => $update['json'] ?? null,
        ];
    }

    private function buildEncounterDiagnosis(string $noRawat): array
    {
        $dxList = DB::table('diagnosa_pasien')
            ->where('no_rawat', $noRawat)
            ->orderBy('prioritas', 'asc')
            ->limit(3)
            ->get(['kd_penyakit', 'prioritas']);

        if ($dxList->isEmpty()) {
            return [];
        }

        $kodeList = $dxList->pluck('kd_penyakit')->filter()->map(fn ($v) => (string) $v)->all();
        $existing = [];
        if (! empty($kodeList)) {
            $rows = DB::table('satu_sehat_condition')
                ->where('no_rawat', $noRawat)
                ->whereIn('kd_penyakit', $kodeList)
                ->get(['kd_penyakit', 'id_condition']);
            foreach ($rows as $r) {
                $k = trim((string) ($r->kd_penyakit ?? ''));
                $id = trim((string) ($r->id_condition ?? ''));
                if ($k !== '' && $id !== '') {
                    $existing[$k] = $id;
                }
            }
        }

        $conditionService = app(\App\Services\SatuSehat\ConditionService::class);

        $diagnosis = [];
        foreach ($dxList as $dx) {
            $kode = trim((string) ($dx->kd_penyakit ?? ''));
            if ($kode === '') {
                continue;
            }

            $condId = $existing[$kode] ?? '';
            if ($condId === '') {
                $created = $conditionService->createCondition($noRawat, $kode, 'Ralan');
                if (is_array($created)) {
                    $condId = trim((string) ($created['id'] ?? ''));
                }
            }

            if ($condId === '') {
                continue;
            }

            $rank = (int) ($dx->prioritas ?? 0);
            if ($rank <= 0) {
                $rank = count($diagnosis) + 1;
            }

            $diagnosis[] = [
                'condition' => [
                    'reference' => 'Condition/'.$condId,
                ],
                'use' => [
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
                        'code' => 'AD',
                        'display' => 'Admission diagnosis',
                    ]],
                ],
                'rank' => $rank,
            ];
        }

        return $diagnosis;
    }

    public function pipelineByRawat(string $noRawat, string $tzOffset = '+07:00'): array
    {
        $tzOffset = trim((string) $tzOffset) ?: '+07:00';
        $pem = DB::table('pemeriksaan_ralan')->where('no_rawat', $noRawat)->orderByDesc('tgl_perawatan')->orderByDesc('jam_rawat')->first();
        if (! $pem) {
            return [
                'ok' => false,
                'status' => 404,
                'message' => 'Data pemeriksaan_ralan tidak ditemukan untuk no_rawat',
            ];
        }

        $enc = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first(['satusehat_id', 'patient_id', 'practitioner_id']);
        $encounterId = $enc ? trim((string) ($enc->satusehat_id ?? '')) : '';
        $patientId = $enc ? trim((string) ($enc->patient_id ?? '')) : '';
        $practitionerId = $enc ? trim((string) ($enc->practitioner_id ?? '')) : '';

        if ($encounterId === '') {
            $local = DB::table('satu_sehat_encounter')->where('no_rawat', $noRawat)->first(['id_encounter_2', 'id_encounter', 'id_pasien_satusehat', 'id_dokter_satusehat']);
            if ($local) {
                $encounterId = trim((string) ($local->id_encounter_2 ?? '')) ?: trim((string) ($local->id_encounter ?? ''));
                $patientId = trim((string) ($local->id_pasien_satusehat ?? '')) ?: $patientId;
                $practitionerId = trim((string) ($local->id_dokter_satusehat ?? '')) ?: $practitionerId;
            }
        }

        if ($encounterId === '') {
            return [
                'ok' => false,
                'status' => 404,
                'message' => 'Encounter ID belum tersedia. Buat Encounter terlebih dahulu.',
            ];
        }
        if ($patientId === '') {
            return [
                'ok' => false,
                'status' => 422,
                'message' => 'Patient IHS ID belum tersedia untuk no_rawat ini.',
            ];
        }

        $eff = trim((string) ($pem->tgl_perawatan ?? '')).'T'.trim((string) ($pem->jam_rawat ?? '')).':00'.$tzOffset;

        $createdObs = [];
        $performerRef = $practitionerId !== '' ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;

        if (is_numeric($pem->suhu_tubuh) && (float) $pem->suhu_tubuh > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '8310-5',
                        'display' => 'Body temperature',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (float) $pem->suhu_tubuh,
                    'unit' => 'Cel',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => 'Cel',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] temperature', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        $bpSystolic = is_numeric($pem->tensi) ? (float) $pem->tensi : null;
        $bpDiastolic = is_numeric($pem->tensi2) ? (float) $pem->tensi2 : null;
        if ($bpSystolic && $bpSystolic > 0 && $bpDiastolic && $bpDiastolic > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '85354-9',
                        'display' => 'Blood pressure panel with all children optional',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'component' => [
                    [
                        'code' => [
                            'coding' => [[
                                'system' => 'http://loinc.org',
                                'code' => '8480-6',
                                'display' => 'Systolic blood pressure',
                            ]],
                        ],
                        'valueQuantity' => [
                            'value' => $bpSystolic,
                            'unit' => 'mmHg',
                            'system' => 'http://unitsofmeasure.org',
                            'code' => 'mm[Hg]',
                        ],
                    ],
                    [
                        'code' => [
                            'coding' => [[
                                'system' => 'http://loinc.org',
                                'code' => '8462-4',
                                'display' => 'Diastolic blood pressure',
                            ]],
                        ],
                        'valueQuantity' => [
                            'value' => $bpDiastolic,
                            'unit' => 'mmHg',
                            'system' => 'http://unitsofmeasure.org',
                            'code' => 'mm[Hg]',
                        ],
                    ],
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] blood pressure', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (is_numeric($pem->nadi) && (int) $pem->nadi > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '8867-4',
                        'display' => 'Heart rate',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (int) $pem->nadi,
                    'unit' => '/min',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '/min',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] heart rate', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (is_numeric($pem->tinggi) && (float) $pem->tinggi > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '8302-2',
                        'display' => 'Body height',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (float) $pem->tinggi,
                    'unit' => 'cm',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => 'cm',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] height', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (is_numeric($pem->berat) && (float) $pem->berat > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '29463-7',
                        'display' => 'Body Weight',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (float) $pem->berat,
                    'unit' => 'kg',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => 'kg',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] weight', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (is_numeric($pem->respirasi) && (int) $pem->respirasi > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '9279-1',
                        'display' => 'Respiratory rate',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (int) $pem->respirasi,
                    'unit' => '/min',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '/min',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] respiratory rate', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (is_numeric($pem->spo2) && (float) $pem->spo2 > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'vital-signs',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '59408-5',
                        'display' => 'Oxygen saturation in Arterial blood by Pulse oximetry',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (float) $pem->spo2,
                    'unit' => '%',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '%',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] SpO2', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (is_numeric($pem->gcs) && (int) $pem->gcs > 0) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'survey',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '9269-2',
                        'display' => 'Glasgow coma score total',
                    ]],
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueQuantity' => [
                    'value' => (int) $pem->gcs,
                    'unit' => '{score}',
                    'system' => 'http://unitsofmeasure.org',
                    'code' => '{score}',
                ],
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] GCS', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (! empty($pem->kesadaran)) {
            $body = [
                'resourceType' => 'Observation',
                'status' => 'final',
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                        'code' => 'survey',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '9088-4',
                        'display' => 'Consciousness level',
                    ]],
                    'text' => trim((string) $pem->kesadaran),
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'valueString' => trim((string) $pem->kesadaran),
                'performer' => [['reference' => $performerRef]],
            ];
            if ($eff !== '') {
                $body['effectiveDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Observation', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdObs[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Observation] consciousness', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        $createdCond = [];
        if (! empty($pem->keluhan)) {
            $body = [
                'resourceType' => 'Condition',
                'clinicalStatus' => ['coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    'code' => 'active',
                ]]],
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/condition-category',
                        'code' => 'problem-list-item',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://snomed.info/sct',
                        'code' => '404684003',
                        'display' => 'Clinical finding',
                    ]],
                    'text' => trim((string) $pem->keluhan),
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
            ];
            $recorderRef = $practitionerId !== '' ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;
            $body['asserter'] = ['reference' => $recorderRef];
            $body['recorder'] = ['reference' => $recorderRef];
            $res = $this->satusehatRequest('POST', 'Condition', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdCond[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Condition] keluhan', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        if (! empty($pem->pemeriksaan)) {
            $body = [
                'resourceType' => 'Condition',
                'clinicalStatus' => ['coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    'code' => 'active',
                ]]],
                'category' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/condition-category',
                        'code' => 'encounter-diagnosis',
                    ]],
                ]],
                'code' => [
                    'coding' => [[
                        'system' => 'http://snomed.info/sct',
                        'code' => '404684003',
                        'display' => 'Clinical finding',
                    ]],
                    'text' => trim((string) $pem->pemeriksaan),
                ],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
            ];
            $recorderRef = $practitionerId !== '' ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;
            $body['asserter'] = ['reference' => $recorderRef];
            $body['recorder'] = ['reference' => $recorderRef];
            $res = $this->satusehatRequest('POST', 'Condition', $body, ['prefer_representation' => true]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $createdCond[] = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Condition] pemeriksaan', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        $allergyId = '';
        if (! empty($pem->alergi)) {
            $body = [
                'resourceType' => 'AllergyIntolerance',
                'clinicalStatus' => ['coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
                    'code' => 'active',
                ]]],
                'verificationStatus' => ['coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
                    'code' => 'confirmed',
                ]]],
                'type' => 'allergy',
                'category' => ['medication'],
                'code' => [
                    'coding' => [[
                        'system' => 'http://snomed.info/sct',
                        'code' => '416098002',
                        'display' => 'Drug allergy',
                    ]],
                    'text' => trim((string) $pem->alergi),
                ],
                'patient' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'recorder' => $practitionerId !== '' ? ['reference' => 'Practitioner/'.$practitionerId] : ['reference' => 'Patient/'.$patientId],
            ];
            if ($eff !== '') {
                $body['recordedDate'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'AllergyIntolerance', $body, ['prefer_representation' => true, 'local_id' => $noRawat]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $allergyId = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][AllergyIntolerance] created', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        $procId = '';
        $rujuk = DB::table('pcare_rujuk_subspesialis')->where('no_rawat', $noRawat)->orderByDesc('tglDaftar')->first(['noKunjungan']);
        if ($rujuk && ! empty($rujuk->noKunjungan)) {
            $body = [
                'resourceType' => 'Procedure',
                'status' => 'completed',
                'code' => ['text' => 'Rujukan Subspesialis'],
                'subject' => ['reference' => 'Patient/'.$patientId],
                'encounter' => ['reference' => 'Encounter/'.$encounterId],
                'identifier' => [[
                    'system' => 'http://pcare.bpjs.go.id/rujukan/noKunjungan',
                    'value' => (string) $rujuk->noKunjungan,
                ]],
            ];
            $performerProc = $practitionerId !== '' ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;
            $body['performer'] = [[
                'actor' => ['reference' => $performerProc],
            ]];
            if ($eff !== '') {
                $body['performedDateTime'] = $eff;
            }
            $res = $this->satusehatRequest('POST', 'Procedure', $body, ['prefer_representation' => true, 'local_id' => $noRawat]);
            if ($res['ok'] && is_array($res['json'] ?? null)) {
                $procId = (string) ($res['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Procedure] rujukan', ['no_rawat' => $noRawat, 'id' => $res['json']['id'] ?? null]);
            }
        }

        $dx1 = DB::table('diagnosa_pasien')->where('no_rawat', $noRawat)->where('prioritas', 1)->orderBy('prioritas', 'asc')->first(['kd_penyakit']);
        $dx2 = DB::table('diagnosa_pasien')->where('no_rawat', $noRawat)->where('prioritas', 2)->orderBy('prioritas', 'asc')->first(['kd_penyakit']);
        $dx1Text = $dx1 ? (string) ($dx1->kd_penyakit ?? '') : '';
        $dx2Text = $dx2 ? (string) ($dx2->kd_penyakit ?? '') : '';

        $subjectiveText = trim((string) ($pem->keluhan ?? ''));
        $objectiveTextParts = [];
        if (is_numeric($pem->nadi)) {
            $objectiveTextParts[] = 'Nadi: '.(string) $pem->nadi.' /min';
        }
        if (is_numeric($pem->tinggi)) {
            $objectiveTextParts[] = 'Tinggi: '.(string) $pem->tinggi.' cm';
        }
        if (is_numeric($pem->berat)) {
            $objectiveTextParts[] = 'Berat: '.(string) $pem->berat.' kg';
        }
        if (! empty($pem->kesadaran)) {
            $objectiveTextParts[] = 'Kesadaran: '.trim((string) $pem->kesadaran);
        }
        $objectiveText = implode('; ', $objectiveTextParts);

        $assessmentTextParts = [];
        if ($dx1Text !== '') {
            $assessmentTextParts[] = 'Diagnosa Primer: '.$dx1Text;
        }
        if ($dx2Text !== '') {
            $assessmentTextParts[] = 'Diagnosa Sekunder: '.$dx2Text;
        }
        $assessmentText = implode('; ', $assessmentTextParts);

        $planTextParts = [];
        if (! empty($pem->penilaian)) {
            $planTextParts[] = 'Rencana: '.trim((string) $pem->penilaian);
        }
        if (! empty($pem->instruksi)) {
            $planTextParts[] = 'Instruksi: '.trim((string) $pem->instruksi);
        }
        $planText = implode('; ', $planTextParts);

        $subjectiveRefs = [];
        $objectiveRefs = [];
        $assessmentRefs = [];
        $planRefs = [];

        foreach ($createdObs as $oid) {
            if ($oid !== '') {
                $objectiveRefs[] = 'Observation/'.$oid;
            }
        }
        foreach ($createdCond as $cid) {
            if ($cid !== '') {
                $assessmentRefs[] = 'Condition/'.$cid;
            }
        }
        if ($procId !== '') {
            $planRefs[] = 'Procedure/'.$procId;
        }
        if ($allergyId !== '') {
            $objectiveRefs[] = 'AllergyIntolerance/'.$allergyId;
        }

        $compositionService = app(CompositionService::class);
        $compSend = $compositionService->sendRajalCompositionFromSoap(
            $noRawat,
            $patientId,
            $encounterId,
            $practitionerId,
            $eff,
            [
                'subjective' => $subjectiveText,
                'objective' => $objectiveText,
                'assessment' => $assessmentText,
                'plan' => $planText,
            ],
            [
                'subjective' => $subjectiveRefs,
                'objective' => $objectiveRefs,
                'assessment' => $assessmentRefs,
                'plan' => $planRefs,
            ]
        );

        if (! ($compSend['ok'] ?? false)) {
            return [
                'ok' => false,
                'status' => (int) ($compSend['status'] ?? 400),
                'message' => $compSend['message'] ?? 'Gagal kirim Composition',
                'body' => $compSend['body'] ?? null,
            ];
        }

        $compId = (string) ($compSend['composition_id'] ?? '');
        if ($compId !== '') {
            Log::channel('daily')->info('[SATUSEHAT][Composition] '.$compSend['action'], ['no_rawat' => $noRawat, 'id' => $compId]);
        }

        $entries = [];
        $compRead = $this->satusehatRequest('GET', 'Composition/'.$compId);
        if ($compRead['ok'] && is_array($compRead['json'] ?? null)) {
            $entries[] = ['fullUrl' => 'Composition/'.$compId, 'resource' => $compRead['json']];
        }

        foreach ($createdObs as $oid) {
            if ($oid === '') {
                continue;
            }
            $r = $this->satusehatRequest('GET', 'Observation/'.$oid);
            if ($r['ok'] && is_array($r['json'] ?? null)) {
                $entries[] = ['fullUrl' => 'Observation/'.$oid, 'resource' => $r['json']];
            }
        }
        foreach ($createdCond as $cid) {
            if ($cid === '') {
                continue;
            }
            $r = $this->satusehatRequest('GET', 'Condition/'.$cid);
            if ($r['ok'] && is_array($r['json'] ?? null)) {
                $entries[] = ['fullUrl' => 'Condition/'.$cid, 'resource' => $r['json']];
            }
        }
        if ($procId !== '') {
            $r = $this->satusehatRequest('GET', 'Procedure/'.$procId);
            if ($r['ok'] && is_array($r['json'] ?? null)) {
                $entries[] = ['fullUrl' => 'Procedure/'.$procId, 'resource' => $r['json']];
            }
        }
        if ($allergyId !== '') {
            $r = $this->satusehatRequest('GET', 'AllergyIntolerance/'.$allergyId);
            if ($r['ok'] && is_array($r['json'] ?? null)) {
                $entries[] = ['fullUrl' => 'AllergyIntolerance/'.$allergyId, 'resource' => $r['json']];
            }
        }

        $bundleId = '';
        if (! empty($entries)) {
            $bundleBody = [
                'resourceType' => 'Bundle',
                'type' => 'document',
                'entry' => $entries,
            ];
            $bRes = $this->satusehatRequest('POST', 'Bundle', $bundleBody, ['prefer_representation' => true]);
            if ($bRes['ok'] && is_array($bRes['json'] ?? null)) {
                $bundleId = (string) ($bRes['json']['id'] ?? '');
                Log::channel('daily')->info('[SATUSEHAT][Bundle] document created', ['no_rawat' => $noRawat, 'id' => $bundleId]);
            }
        }

        return [
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
        ];
    }
}
