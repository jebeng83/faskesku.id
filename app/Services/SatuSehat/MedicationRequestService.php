<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MedicationRequestService
{
    use SatuSehatTraits;

    public function sendMedicationRequestsForResep(string $noResep): array
    {
        $resep = DB::table('resep_obat')
            ->where('no_resep', $noResep)
            ->first(['no_resep', 'no_rawat', 'kd_dokter', 'tgl_peresepan', 'jam_peresepan', 'status']);

        if (! $resep) {
            return [
                'ok' => false,
                'code' => 'RESEP_NOT_FOUND',
                'message' => 'Resep tidak ditemukan',
                'no_resep' => $noResep,
            ];
        }

        $noRawat = trim((string) ($resep->no_rawat ?? ''));
        if ($noRawat === '') {
            return [
                'ok' => false,
                'code' => 'NO_RAWAT_REQUIRED',
                'message' => 'no_rawat kosong pada resep',
                'no_resep' => $noResep,
            ];
        }

        $encounterId = $this->getEncounterIhsIdFromNoRawat($noRawat);
        if (! $encounterId) {
            return [
                'ok' => false,
                'code' => 'ENCOUNTER_REQUIRED',
                'message' => 'Encounter SATUSEHAT belum terbentuk/dikirim',
                'no_resep' => $noResep,
                'no_rawat' => $noRawat,
            ];
        }

        $patientId = $this->getPatientIhsIdFromNoRawat($noRawat);
        if (! $patientId) {
            return [
                'ok' => false,
                'code' => 'PATIENT_REQUIRED',
                'message' => 'Patient ID SATUSEHAT belum ada',
                'no_resep' => $noResep,
                'no_rawat' => $noRawat,
            ];
        }

        $practitionerId = $this->getPractitionerIhsIdFromKdDokter((string) ($resep->kd_dokter ?? ''));

        $authoredOn = $this->formatAuthoredOn((string) ($resep->tgl_peresepan ?? ''), (string) ($resep->jam_peresepan ?? ''));
        $status = $this->mapMedicationRequestStatus((string) ($resep->status ?? ''));

        $nonRacikan = DB::table('resep_dokter')
            ->where('no_resep', $noResep)
            ->orderBy('kode_brng', 'asc')
            ->get(['kode_brng', 'jml', 'aturan_pakai']);

        $racikanHeader = DB::table('resep_dokter_racikan')
            ->where('no_resep', $noResep)
            ->get(['no_racik', 'aturan_pakai', 'nama_racik'])
            ->keyBy('no_racik');

        $racikanDetail = DB::table('resep_dokter_racikan_detail')
            ->where('no_resep', $noResep)
            ->orderBy('no_racik', 'asc')
            ->orderBy('kode_brng', 'asc')
            ->get(['no_racik', 'kode_brng', 'jml']);

        $results = [];

        foreach ($nonRacikan as $d) {
            $kodeBrng = trim((string) ($d->kode_brng ?? ''));
            if ($kodeBrng === '') {
                continue;
            }

            $aturanPakai = trim((string) ($d->aturan_pakai ?? ''));
            $results[] = $this->sendOneMedicationRequest(
                $noResep,
                $kodeBrng,
                null,
                $aturanPakai,
                $status,
                $authoredOn,
                $patientId,
                $encounterId,
                $practitionerId
            );
        }

        foreach ($racikanDetail as $d) {
            $kodeBrng = trim((string) ($d->kode_brng ?? ''));
            $noRacik = trim((string) ($d->no_racik ?? ''));
            if ($kodeBrng === '' || $noRacik === '') {
                continue;
            }

            $hdr = $racikanHeader->get($noRacik);
            $aturanPakai = $hdr ? trim((string) ($hdr->aturan_pakai ?? '')) : '';

            $results[] = $this->sendOneMedicationRequest(
                $noResep,
                $kodeBrng,
                $noRacik,
                $aturanPakai,
                $status,
                $authoredOn,
                $patientId,
                $encounterId,
                $practitionerId
            );
        }

        return [
            'ok' => true,
            'no_resep' => $noResep,
            'no_rawat' => $noRawat,
            'encounter_id' => $encounterId,
            'patient_id' => $patientId,
            'results' => $results,
        ];
    }

    private function sendOneMedicationRequest(
        string $noResep,
        string $kodeBrng,
        ?string $noRacik,
        string $aturanPakai,
        string $status,
        ?string $authoredOn,
        string $patientId,
        string $encounterId,
        ?string $practitionerId
    ): array {
        $kodeBrng = trim($kodeBrng);
        $noRacik = $noRacik !== null ? trim($noRacik) : null;

        if ($noRacik) {
            $existing = DB::table('satu_sehat_medicationrequest_racikan')
                ->where('no_resep', $noResep)
                ->where('kode_brng', $kodeBrng)
                ->where('no_racik', $noRacik)
                ->first(['id_medicationrequest']);
        } else {
            $existing = DB::table('satu_sehat_medicationrequest')
                ->where('no_resep', $noResep)
                ->where('kode_brng', $kodeBrng)
                ->first(['id_medicationrequest']);
        }

        $existingId = $existing ? trim((string) ($existing->id_medicationrequest ?? '')) : '';
        if ($existingId !== '') {
            return [
                'no_resep' => $noResep,
                'kode_brng' => $kodeBrng,
                'no_racik' => $noRacik,
                'id' => $existingId,
                'action' => 'skipped',
            ];
        }

        $medicationId = $this->ensureMedicationIhsIdFromKodeBrng($kodeBrng);
        if (! $medicationId) {
            return [
                'no_resep' => $noResep,
                'kode_brng' => $kodeBrng,
                'no_racik' => $noRacik,
                'action' => 'failed',
                'code' => 'MEDICATION_REQUIRED',
                'error' => 'Mapping obat SATUSEHAT belum ada',
            ];
        }

        $orgId = $this->satusehatOrganizationId();
        $identifierValue = $noRacik ? ($noResep.':'.$noRacik.':'.$kodeBrng) : ($noResep.':'.$kodeBrng);

        $resource = [
            'resourceType' => 'MedicationRequest',
            'identifier' => [[
                'system' => 'http://sys-ids.kemkes.go.id/prescription/'.$orgId,
                'use' => 'official',
                'value' => $identifierValue,
            ]],
            'status' => $status,
            'intent' => 'order',
            'subject' => [
                'reference' => 'Patient/'.$patientId,
            ],
            'encounter' => [
                'reference' => 'Encounter/'.$encounterId,
            ],
            'medicationReference' => [
                'reference' => 'Medication/'.$medicationId,
            ],
        ];

        if ($authoredOn) {
            $resource['authoredOn'] = $authoredOn;
        }

        if ($practitionerId) {
            $resource['requester'] = [
                'reference' => 'Practitioner/'.$practitionerId,
            ];
        }

        $aturanPakai = trim($aturanPakai);
        if ($aturanPakai !== '') {
            $resource['dosageInstruction'] = [[
                'sequence' => 1,
                'text' => $aturanPakai,
            ]];
        }

        $res = $this->satusehatRequest('POST', 'MedicationRequest', $resource, [
            'prefer_representation' => true,
            'local_id' => $identifierValue,
        ]);

        if (! $res['ok']) {
            Log::warning('[SATUSEHAT][MedicationRequest] failed', [
                'no_resep' => $noResep,
                'kode_brng' => $kodeBrng,
                'no_racik' => $noRacik,
                'status' => $res['status'] ?? null,
                'error' => $res['error'] ?? null,
            ]);

            return [
                'no_resep' => $noResep,
                'kode_brng' => $kodeBrng,
                'no_racik' => $noRacik,
                'action' => 'failed',
                'status' => $res['status'] ?? null,
                'error' => $res['error'] ?? 'Unknown error',
            ];
        }

        $medicationRequestId = is_array($res['json'] ?? null) ? trim((string) ($res['json']['id'] ?? '')) : '';
        if ($medicationRequestId !== '') {
            if ($noRacik) {
                DB::table('satu_sehat_medicationrequest_racikan')->updateOrInsert(
                    [
                        'no_resep' => $noResep,
                        'kode_brng' => $kodeBrng,
                        'no_racik' => $noRacik,
                    ],
                    [
                        'id_medicationrequest' => $medicationRequestId,
                    ]
                );
            } else {
                DB::table('satu_sehat_medicationrequest')->updateOrInsert(
                    [
                        'no_resep' => $noResep,
                        'kode_brng' => $kodeBrng,
                    ],
                    [
                        'id_medicationrequest' => $medicationRequestId,
                    ]
                );
            }
        }

        return [
            'no_resep' => $noResep,
            'kode_brng' => $kodeBrng,
            'no_racik' => $noRacik,
            'id' => $medicationRequestId,
            'action' => 'created',
        ];
    }

    private function mapMedicationRequestStatus(string $resepStatus): string
    {
        $s = strtolower(trim($resepStatus));
        if ($s === '') {
            return 'active';
        }

        if (in_array($s, ['ranap', 'ralan', 'igd', 'rajal'], true)) {
            return 'active';
        }

        return 'active';
    }

    private function formatAuthoredOn(string $tgl, string $jam): ?string
    {
        $tgl = trim($tgl);
        $jam = trim($jam);
        if ($tgl === '' || $tgl === '0000-00-00') {
            return null;
        }

        try {
            $dt = Carbon::parse($tgl.' '.($jam !== '' ? $jam : '00:00:00'), 'Asia/Jakarta');
            return $dt->toIso8601String();
        } catch (\Throwable) {
            return null;
        }
    }

    private function getMedicationIhsIdFromKodeBrng(string $kodeBrng): ?string
    {
        $m = DB::table('satu_sehat_mapping_obat')
            ->where('kode_brng', $kodeBrng)
            ->first(['satusehat_id']);

        $id = $m ? trim((string) ($m->satusehat_id ?? '')) : '';
        return $id !== '' ? $id : null;
    }

    private function ensureMedicationIhsIdFromKodeBrng(string $kodeBrng): ?string
    {
        $kodeBrng = trim($kodeBrng);
        if ($kodeBrng === '') {
            return null;
        }

        $m = DB::table('satu_sehat_mapping_obat')
            ->where('kode_brng', $kodeBrng)
            ->first([
                'kode_brng',
                'satusehat_id',
                'obat_code',
                'obat_system',
                'obat_display',
                'form_code',
                'form_system',
                'form_display',
                'numerator_code',
                'numerator_system',
                'denominator_code',
                'denominator_system',
                'route_code',
                'route_system',
                'route_display',
            ]);

        if (! $m) {
            return null;
        }

        $existingId = trim((string) ($m->satusehat_id ?? ''));
        if ($existingId !== '') {
            return $existingId;
        }

        $orgId = $this->satusehatOrganizationId();
        if ($orgId === '') {
            return null;
        }

        $identifierSystem = "http://sys-ids.kemkes.go.id/medication/{$orgId}";

        try {
            $lookup = $this->satusehatRequest('GET', 'Medication', null, [
                'query' => [
                    'identifier' => $identifierSystem.'|'.$kodeBrng,
                ],
            ]);
            if (($lookup['ok'] ?? false) && ! empty($lookup['json']['entry'][0]['resource']['id'])) {
                $foundId = trim((string) ($lookup['json']['entry'][0]['resource']['id'] ?? ''));
                if ($foundId !== '') {
                    DB::table('satu_sehat_mapping_obat')
                        ->where('kode_brng', $kodeBrng)
                        ->update(['satusehat_id' => $foundId]);
                    return $foundId;
                }
            }
        } catch (\Throwable $e) {
            Log::channel('daily')->warning('[SATUSEHAT][Medication] lookup gagal', [
                'kode_brng' => $kodeBrng,
                'error' => $e->getMessage(),
            ]);
        }

        $obatCode = trim((string) ($m->obat_code ?? ''));
        $obatDisplay = trim((string) ($m->obat_display ?? ''));
        if ($obatCode === '' || $obatDisplay === '') {
            Log::channel('daily')->warning('[SATUSEHAT][Medication] mapping obat belum lengkap', [
                'kode_brng' => $kodeBrng,
                'obat_code' => $obatCode,
                'obat_display' => $obatDisplay,
            ]);
            return null;
        }

        $obatSystem = trim((string) ($m->obat_system ?? ''));
        if ($obatSystem === '') {
            $obatSystem = 'http://sys-ids.kemkes.go.id/kfa';
        }

        $payload = [
            'resourceType' => 'Medication',
            'meta' => [
                'profile' => ['https://fhir.kemkes.go.id/r4/StructureDefinition/Medication'],
            ],
            'identifier' => [[
                'system' => $identifierSystem,
                'value' => $kodeBrng,
            ]],
            'code' => [
                'coding' => [[
                    'system' => $obatSystem,
                    'code' => $obatCode,
                    'display' => $obatDisplay,
                ]],
            ],
            'extension' => [[
                'url' => 'https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType',
                'valueCodeableConcept' => [
                    'coding' => [[
                        'system' => 'http://terminology.kemkes.go.id/CodeSystem/medication-type',
                        'code' => 'NC',
                        'display' => 'Non-compound',
                    ]],
                ],
            ]],
        ];

        $formCode = trim((string) ($m->form_code ?? ''));
        if ($formCode !== '') {
            $formSystem = trim((string) ($m->form_system ?? ''));
            if ($formSystem === '' || str_contains($formSystem, 'terminology.hl7.org')) {
                $formSystem = 'http://terminology.kemkes.go.id/CodeSystem/medication-form';
            }
            $coding = [
                'system' => $formSystem,
                'code' => $formCode,
            ];
            $formDisplay = trim((string) ($m->form_display ?? ''));
            if ($formDisplay !== '') {
                $coding['display'] = $formDisplay;
            }
            $payload['form'] = [
                'coding' => [$coding],
            ];
        }

        $hasStrength = trim((string) ($m->numerator_code ?? '')) !== '' || trim((string) ($m->denominator_code ?? '')) !== '';
        if ($hasStrength) {
            $payload['ingredient'] = [[
                'itemCodeableConcept' => $payload['code'],
                'strength' => [
                    'numerator' => [
                        'value' => (float) ((string) ($m->numerator_code ?? 1)),
                        'system' => trim((string) ($m->numerator_system ?? '')) ?: 'http://unitsofmeasure.org',
                    ],
                    'denominator' => [
                        'value' => (float) ((string) ($m->denominator_code ?? 1)),
                        'system' => trim((string) ($m->denominator_system ?? '')) ?: 'http://unitsofmeasure.org',
                    ],
                ],
            ]];
        }

        try {
            $res = $this->satusehatRequest('POST', 'Medication', $payload, [
                'prefer_representation' => true,
                'local_id' => $kodeBrng,
            ]);

            if (($res['ok'] ?? false) && is_array($res['json'] ?? null)) {
                $newId = trim((string) ($res['json']['id'] ?? ''));
                if ($newId !== '') {
                    DB::table('satu_sehat_mapping_obat')
                        ->where('kode_brng', $kodeBrng)
                        ->update(['satusehat_id' => $newId]);
                    return $newId;
                }
            }
        } catch (\Throwable $e) {
            Log::channel('daily')->warning('[SATUSEHAT][Medication] create gagal', [
                'kode_brng' => $kodeBrng,
                'error' => $e->getMessage(),
            ]);
        }

        return null;
    }

    private function getEncounterIhsIdFromNoRawat(string $noRawat): ?string
    {
        $encounterTracking = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first(['satusehat_id']);
        $encounterId = $encounterTracking ? (string) ($encounterTracking->satusehat_id ?? '') : '';
        if ($encounterId !== '') {
            return $encounterId;
        }

        $legacyEncounter = DB::table('satu_sehat_encounter')->where('no_rawat', $noRawat)->first(['id_encounter_2', 'id_encounter']);
        if ($legacyEncounter) {
            $id = (string) (($legacyEncounter->id_encounter_2 ?? '') ?: ($legacyEncounter->id_encounter ?? ''));
            return $id !== '' ? $id : null;
        }

        return null;
    }

    private function getPatientIhsIdFromNoRawat(string $noRawat): ?string
    {
        $reg = DB::table('reg_periksa')
            ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
            ->where('reg_periksa.no_rawat', $noRawat)
            ->first(['pasien.no_ktp']);

        if (! $reg || empty($reg->no_ktp)) {
            return null;
        }

        $mapping = DB::table('satusehat_patient_mapping')->where('nik', $reg->no_ktp)->first(['satusehat_id']);
        if (! $mapping || empty($mapping->satusehat_id)) {
            return null;
        }

        return (string) $mapping->satusehat_id;
    }

    private function getPractitionerIhsIdFromKdDokter(string $kdDokter): ?string
    {
        $kdDokter = trim($kdDokter);
        if ($kdDokter === '') {
            return null;
        }

        $pegawai = DB::table('pegawai')->where('nik', $kdDokter)->first(['no_ktp']);
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
                'query' => ['identifier' => 'https://fhir.kemkes.go.id/id/nik|'.$nik],
            ]);
            if ($response['ok'] && ! empty($response['json']['entry'])) {
                $practitioner = $response['json']['entry'][0]['resource'] ?? null;
                $id = is_array($practitioner) ? (string) ($practitioner['id'] ?? '') : '';
                if ($id !== '') {
                    DB::table('satusehat_mapping_practitioner')->updateOrInsert(
                        ['nik' => $nik],
                        [
                            'satusehat_id' => $id,
                            'nama' => $kdDokter,
                            'updated_at' => now(),
                            'created_at' => now(),
                        ]
                    );

                    return $id;
                }
            }
        } catch (\Throwable) {
        }

        return null;
    }
}
