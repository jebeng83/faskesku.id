<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompositionService
{
    use SatuSehatTraits;

    public function sendRajalCompositionAutoFromNoRawat(string $noRawat, string $patientId, string $encounterId, string $practitionerId = '', string $localDateTime = ''): array
    {
        $pem = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->first([
                'tgl_perawatan',
                'jam_rawat',
                'keluhan',
                'pemeriksaan',
                'nadi',
                'tinggi',
                'berat',
                'kesadaran',
                'penilaian',
                'instruksi',
            ]);

        $dx1 = DB::table('diagnosa_pasien')->where('no_rawat', $noRawat)->where('prioritas', 1)->orderBy('prioritas', 'asc')->first(['kd_penyakit']);
        $dx2 = DB::table('diagnosa_pasien')->where('no_rawat', $noRawat)->where('prioritas', 2)->orderBy('prioritas', 'asc')->first(['kd_penyakit']);
        $dx1Text = $dx1 ? (string) ($dx1->kd_penyakit ?? '') : '';
        $dx2Text = $dx2 ? (string) ($dx2->kd_penyakit ?? '') : '';

        $subjectiveText = $pem ? trim((string) ($pem->keluhan ?? '')) : '';

        $objectiveTextParts = [];
        if ($pem) {
            $pemeriksaan = trim((string) ($pem->pemeriksaan ?? ''));
            if ($pemeriksaan !== '') {
                $objectiveTextParts[] = $pemeriksaan;
            }
            if (is_numeric($pem->nadi ?? null)) {
                $objectiveTextParts[] = 'Nadi: '.(string) $pem->nadi.' /min';
            }
            if (is_numeric($pem->tinggi ?? null)) {
                $objectiveTextParts[] = 'Tinggi: '.(string) $pem->tinggi.' cm';
            }
            if (is_numeric($pem->berat ?? null)) {
                $objectiveTextParts[] = 'Berat: '.(string) $pem->berat.' kg';
            }
            $kesadaran = trim((string) ($pem->kesadaran ?? ''));
            if ($kesadaran !== '') {
                $objectiveTextParts[] = 'Kesadaran: '.$kesadaran;
            }
        }
        $objectiveText = implode('; ', array_values(array_filter($objectiveTextParts, fn ($t) => trim((string) $t) !== '')));

        $assessmentTextParts = [];
        if ($dx1Text !== '') {
            $assessmentTextParts[] = 'Diagnosa Primer: '.$dx1Text;
        }
        if ($dx2Text !== '') {
            $assessmentTextParts[] = 'Diagnosa Sekunder: '.$dx2Text;
        }
        $assessmentText = implode('; ', $assessmentTextParts);

        $planTextParts = [];
        if ($pem) {
            $penilaian = trim((string) ($pem->penilaian ?? ''));
            if ($penilaian !== '') {
                $planTextParts[] = 'Rencana: '.$penilaian;
            }
            $instruksi = trim((string) ($pem->instruksi ?? ''));
            if ($instruksi !== '') {
                $planTextParts[] = 'Instruksi: '.$instruksi;
            }
        }
        $planText = implode('; ', $planTextParts);

        if ($localDateTime === '' && $pem && ! empty($pem->tgl_perawatan) && ! empty($pem->jam_rawat)) {
            $localDateTime = (string) $pem->tgl_perawatan.'T'.(string) $pem->jam_rawat.'+07:00';
        }

        $additionalRefs = $this->additionalRefsForNoRawat($noRawat);

        return $this->sendRajalCompositionFromSoap(
            $noRawat,
            $patientId,
            $encounterId,
            $practitionerId,
            $localDateTime,
            [
                'subjective' => $subjectiveText,
                'objective' => $objectiveText,
                'assessment' => $assessmentText,
                'plan' => $planText,
            ],
            [
                'subjective' => [],
                'objective' => $additionalRefs['objective'] ?? [],
                'assessment' => [],
                'plan' => $additionalRefs['plan'] ?? [],
            ]
        );
    }

    public function sendRajalCompositionFromSoap(
        string $noRawat,
        string $patientId,
        string $encounterId,
        string $practitionerId,
        string $localDateTime,
        array $soapTexts,
        array $soapRefs
    ): array {
        $orgIhs = $this->satusehatOrganizationId();
        if ($orgIhs === '') {
            return [
                'ok' => false,
                'code' => 'ORG_REQUIRED',
                'message' => 'SATUSEHAT_ORG_ID belum diisi',
            ];
        }

        $identifierValue = $this->normalizeIdentifierValue('RJ-'.$noRawat);
        $already = DB::table('satusehat_resources')
            ->where('resource_type', 'Composition')
            ->where('local_id', $identifierValue)
            ->where('status', 'sent')
            ->orderByDesc('id')
            ->first(['satusehat_id']);
        $existingId = ($already && ! empty($already->satusehat_id)) ? (string) $already->satusehat_id : '';

        $utcDateTime = $this->toUtcPlus00($localDateTime);
        if ($utcDateTime === '') {
            $utcDateTime = Carbon::now('UTC')->format('Y-m-d\\TH:i:sP');
        }

        $sections = [];

        $subjectiveText = trim((string) ($soapTexts['subjective'] ?? ''));
        $objectiveText = trim((string) ($soapTexts['objective'] ?? ''));
        $assessmentText = trim((string) ($soapTexts['assessment'] ?? ''));
        $planText = trim((string) ($soapTexts['plan'] ?? ''));

        $subjectiveRefs = is_array($soapRefs['subjective'] ?? null) ? $soapRefs['subjective'] : [];
        $objectiveRefs = is_array($soapRefs['objective'] ?? null) ? $soapRefs['objective'] : [];
        $assessmentRefs = is_array($soapRefs['assessment'] ?? null) ? $soapRefs['assessment'] : [];
        $planRefs = is_array($soapRefs['plan'] ?? null) ? $soapRefs['plan'] : [];

        if ($subjectiveText !== '' || ! empty($subjectiveRefs)) {
            $sec = ['title' => 'Subjective'];
            if ($subjectiveText !== '') {
                $sec['text'] = ['status' => 'generated', 'div' => $this->narrativeDiv($subjectiveText)];
            }
            if (! empty($subjectiveRefs)) {
                $sec['entry'] = array_map(fn ($r) => ['reference' => $r], $subjectiveRefs);
            }
            $sections[] = $sec;
        }
        if ($objectiveText !== '' || ! empty($objectiveRefs)) {
            $sec = ['title' => 'Objective'];
            if ($objectiveText !== '') {
                $sec['text'] = ['status' => 'generated', 'div' => $this->narrativeDiv($objectiveText)];
            }
            if (! empty($objectiveRefs)) {
                $sec['entry'] = array_map(fn ($r) => ['reference' => $r], $objectiveRefs);
            }
            $sections[] = $sec;
        }
        if ($assessmentText !== '' || ! empty($assessmentRefs)) {
            $sec = ['title' => 'Assessment'];
            if ($assessmentText !== '') {
                $sec['text'] = ['status' => 'generated', 'div' => $this->narrativeDiv($assessmentText)];
            }
            if (! empty($assessmentRefs)) {
                $sec['entry'] = array_map(fn ($r) => ['reference' => $r], $assessmentRefs);
            }
            $sections[] = $sec;
        }
        if ($planText !== '' || ! empty($planRefs)) {
            $sec = ['title' => 'Plan'];
            if ($planText !== '') {
                $sec['text'] = ['status' => 'generated', 'div' => $this->narrativeDiv($planText)];
            }
            if (! empty($planRefs)) {
                $sec['entry'] = array_map(fn ($r) => ['reference' => $r], $planRefs);
            }
            $sections[] = $sec;
        }

        $body = [
            'resourceType' => 'Composition',
            'identifier' => [[
                'system' => 'http://sys-ids.kemkes.go.id/composition/'.$orgIhs,
                'use' => 'official',
                'value' => $identifierValue,
            ]],
            'status' => 'final',
            'type' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '37145-9',
                    'display' => 'Outpatient Note',
                ]],
            ],
            'title' => 'RME Rawat Jalan',
            'date' => $utcDateTime,
            'subject' => ['reference' => 'Patient/'.$patientId],
            'encounter' => ['reference' => 'Encounter/'.$encounterId],
            'section' => $sections,
        ];
        $authorRef = $practitionerId !== '' ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;
        $body['author'] = [[
            'reference' => $authorRef,
        ]];

        $method = 'POST';
        $path = 'Composition';
        $action = 'created';
        if ($existingId !== '') {
            $body['id'] = $existingId;
            $method = 'PUT';
            $path = 'Composition/'.$existingId;
            $action = 'updated';
        }

        $res = $this->satusehatRequest($method, $path, $body, [
            'prefer_representation' => true,
            'local_id' => $identifierValue,
        ]);
        if (! $res['ok']) {
            Log::warning('[SATUSEHAT][Composition] failed', [
                'no_rawat' => $noRawat,
                'status' => $res['status'] ?? null,
                'error' => $res['error'] ?? null,
            ]);

            return [
                'ok' => false,
                'code' => 'FHIR_ERROR',
                'message' => (string) ($res['error'] ?? 'Gagal kirim Composition'),
                'status' => $res['status'] ?? null,
                'body' => $res['body'] ?? null,
            ];
        }

        $compositionId = is_array($res['json'] ?? null) ? trim((string) ($res['json']['id'] ?? '')) : '';

        return [
            'ok' => true,
            'action' => $action,
            'composition_id' => $compositionId,
            'identifier_value' => $identifierValue,
            'resource' => $res['json'] ?? null,
        ];
    }

    private function additionalRefsForNoRawat(string $noRawat): array
    {
        $noRawat = trim($noRawat);
        if ($noRawat === '') {
            return ['objective' => [], 'plan' => []];
        }

        $objectiveRefs = [];
        $planRefs = [];

        $procedureIds = DB::table('satu_sehat_procedure')
            ->where('no_rawat', $noRawat)
            ->whereNotNull('id_procedure')
            ->pluck('id_procedure')
            ->all();
        foreach ($procedureIds as $id) {
            $id = trim((string) $id);
            if ($id !== '') {
                $planRefs[] = 'Procedure/'.$id;
            }
        }

        $noReseps = DB::table('resep_obat')
            ->where('no_rawat', $noRawat)
            ->pluck('no_resep')
            ->all();
        if (! empty($noReseps)) {
            $mrIds = DB::table('satu_sehat_medicationrequest')
                ->whereIn('no_resep', $noReseps)
                ->whereNotNull('id_medicationrequest')
                ->pluck('id_medicationrequest')
                ->all();
            foreach ($mrIds as $id) {
                $id = trim((string) $id);
                if ($id !== '') {
                    $planRefs[] = 'MedicationRequest/'.$id;
                }
            }

            $mrrIds = DB::table('satu_sehat_medicationrequest_racikan')
                ->whereIn('no_resep', $noReseps)
                ->whereNotNull('id_medicationrequest')
                ->pluck('id_medicationrequest')
                ->all();
            foreach ($mrrIds as $id) {
                $id = trim((string) $id);
                if ($id !== '') {
                    $planRefs[] = 'MedicationRequest/'.$id;
                }
            }
        }

        $dispenseIds = DB::table('satu_sehat_medicationdispense')
            ->where('no_rawat', $noRawat)
            ->whereNotNull('id_medicationdispanse')
            ->pluck('id_medicationdispanse')
            ->all();
        foreach ($dispenseIds as $id) {
            $id = trim((string) $id);
            if ($id !== '') {
                $planRefs[] = 'MedicationDispense/'.$id;
            }
        }

        $noRkmMedis = (string) (DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('no_rkm_medis') ?? '');
        $noRkmMedis = trim($noRkmMedis);
        $allergyQuery = DB::table('satusehat_resources')
            ->where('resource_type', 'AllergyIntolerance')
            ->where('status', 'sent');
        if ($noRkmMedis !== '') {
            $allergyQuery->where(function ($q) use ($noRawat, $noRkmMedis) {
                $q->where('local_id', $noRawat)->orWhere('local_id', 'like', $noRkmMedis.'-%');
            });
        } else {
            $allergyQuery->where('local_id', $noRawat);
        }
        $allergyIds = $allergyQuery->pluck('satusehat_id')->all();
        foreach ($allergyIds as $id) {
            $id = trim((string) $id);
            if ($id !== '') {
                $objectiveRefs[] = 'AllergyIntolerance/'.$id;
            }
        }

        $objectiveRefs = array_values(array_unique(array_filter($objectiveRefs, fn ($r) => trim((string) $r) !== '')));
        $planRefs = array_values(array_unique(array_filter($planRefs, fn ($r) => trim((string) $r) !== '')));

        return [
            'objective' => $objectiveRefs,
            'plan' => $planRefs,
        ];
    }

    private function normalizeIdentifierValue(string $value): string
    {
        $v = trim($value);
        if ($v === '') {
            return 'UNKNOWN';
        }

        $v = preg_replace('/[^A-Za-z0-9._-]+/', '-', $v) ?? $v;
        $v = trim($v, '-');
        if ($v === '') {
            return 'UNKNOWN';
        }

        return substr($v, 0, 100);
    }

    private function toUtcPlus00(string $dateTime): string
    {
        $dateTime = trim($dateTime);
        if ($dateTime === '') {
            return '';
        }

        try {
            return Carbon::parse($dateTime)->setTimezone('UTC')->format('Y-m-d\\TH:i:sP');
        } catch (\Throwable) {
            return '';
        }
    }

    private function narrativeDiv(string $text): string
    {
        $escaped = htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $escaped = nl2br($escaped, false);

        return '<div xmlns="http://www.w3.org/1999/xhtml">'.$escaped.'</div>';
    }
}
