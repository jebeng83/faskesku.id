<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ProcedureService
{
    use SatuSehatTraits;

    public function sendProceduresForEncounter(string $noRawat, string $statusRawat = 'Ralan'): array
    {
        $encounterId = $this->getEncounterIhsIdFromNoRawat($noRawat);
        if (! $encounterId) {
            return [
                'ok' => false,
                'code' => 'ENCOUNTER_REQUIRED',
                'message' => 'Encounter SATUSEHAT belum terbentuk/dikirim',
                'no_rawat' => $noRawat,
            ];
        }

        $patientId = $this->getPatientIhsIdFromNoRawat($noRawat);
        if (! $patientId) {
            return [
                'ok' => false,
                'code' => 'PATIENT_REQUIRED',
                'message' => 'Patient ID SATUSEHAT belum ada',
                'no_rawat' => $noRawat,
            ];
        }

        $performedDateTime = $this->getPerformedDateTimeFromNoRawat($noRawat);
        $practitionerId = $this->getPractitionerIhsIdFromNoRawat($noRawat);

        $procedures = collect();
        if (Schema::hasTable('prosedur_pasien')) {
            $q = DB::table('prosedur_pasien')->where('no_rawat', $noRawat);
            if (Schema::hasColumn('prosedur_pasien', 'status')) {
                $q->where('status', $statusRawat);
            }
            if (Schema::hasColumn('prosedur_pasien', 'prioritas')) {
                $q->orderBy('prioritas', 'asc');
            }

            $cols = ['kode'];
            if (Schema::hasColumn('prosedur_pasien', 'prioritas')) {
                $cols[] = 'prioritas';
            }

            try {
                $procedures = $q->get($cols);
            } catch (\Throwable $e) {
                $procedures = collect();
                Log::channel('daily')->warning('[SATUSEHAT][Procedure] gagal ambil prosedur_pasien, fallback default', [
                    'no_rawat' => $noRawat,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $items = [];
        if ($procedures->isEmpty()) {
            $items[] = [
                'kode' => '89.06',
                'display' => 'Limited Consultation',
                'status' => $statusRawat,
            ];
        } else {
            foreach ($procedures as $p) {
                $items[] = [
                    'kode' => trim((string) ($p->kode ?? '')),
                    'display' => null,
                    'status' => $statusRawat,
                ];
            }
        }

        $results = [];
        foreach ($items as $it) {
            $kode = trim((string) ($it['kode'] ?? ''));
            if ($kode === '') {
                $kode = '89.06';
            }

            $display = $it['display'] ?? null;
            if (! $display) {
                $icd9 = DB::table('icd9')->where('kode', $kode)->first(['deskripsi_panjang', 'deskripsi_pendek']);
                $display = trim((string) (($icd9->deskripsi_panjang ?? '') ?: ($icd9->deskripsi_pendek ?? '')));
            }
            if (! $display) {
                $display = $kode === '89.06' ? 'Limited Consultation' : $kode;
            }

            $existing = DB::table('satu_sehat_procedure')
                ->where('no_rawat', $noRawat)
                ->where('kode', $kode)
                ->where('status', $statusRawat)
                ->first(['id_procedure']);

            $existingId = $existing ? trim((string) ($existing->id_procedure ?? '')) : '';
            if ($existingId !== '') {
                $results[] = [
                    'kode' => $kode,
                    'display' => $display,
                    'id' => $existingId,
                    'action' => 'skipped',
                ];
                continue;
            }

            $resource = [
                'resourceType' => 'Procedure',
                'status' => 'completed',
                'code' => [
                    'coding' => [[
                        'system' => 'http://hl7.org/fhir/sid/icd-9-cm',
                        'code' => $kode,
                        'display' => $display,
                    ]],
                    'text' => $display,
                ],
                'subject' => [
                    'reference' => 'Patient/'.$patientId,
                ],
                'encounter' => [
                    'reference' => 'Encounter/'.$encounterId,
                ],
            ];

            if ($performedDateTime !== '') {
                $resource['performedDateTime'] = $performedDateTime;
            }

            $performerRef = $practitionerId ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;
            $resource['performer'] = [[
                'actor' => [
                    'reference' => $performerRef,
                ],
            ]];

            $res = $this->satusehatRequest('POST', 'Procedure', $resource, [
                'prefer_representation' => true,
                'local_id' => $noRawat,
            ]);

            if (! $res['ok']) {
                Log::warning('[SATUSEHAT][Procedure] failed', [
                    'no_rawat' => $noRawat,
                    'kode' => $kode,
                    'status' => $res['status'] ?? null,
                    'error' => $res['error'] ?? null,
                ]);

                $results[] = [
                    'kode' => $kode,
                    'display' => $display,
                    'action' => 'failed',
                    'status' => $res['status'] ?? null,
                    'error' => $res['error'] ?? 'Unknown error',
                ];
                continue;
            }

            $procedureId = is_array($res['json'] ?? null) ? trim((string) ($res['json']['id'] ?? '')) : '';
            if ($procedureId !== '') {
                DB::table('satu_sehat_procedure')->updateOrInsert(
                    [
                        'no_rawat' => $noRawat,
                        'kode' => $kode,
                        'status' => $statusRawat,
                    ],
                    [
                        'id_procedure' => $procedureId,
                    ]
                );
            }

            $results[] = [
                'kode' => $kode,
                'display' => $display,
                'id' => $procedureId,
                'action' => 'created',
            ];
        }

        return [
            'ok' => true,
            'no_rawat' => $noRawat,
            'encounter_id' => $encounterId,
            'patient_id' => $patientId,
            'results' => $results,
        ];
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

    private function getPerformedDateTimeFromNoRawat(string $noRawat, string $tz = '+07:00'): string
    {
        $pem = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->first(['tgl_perawatan', 'jam_rawat']);

        if ($pem && ! empty($pem->tgl_perawatan) && ! empty($pem->jam_rawat)) {
            return (string) $pem->tgl_perawatan.'T'.(string) $pem->jam_rawat.$tz;
        }

        $reg = DB::table('reg_periksa')->where('no_rawat', $noRawat)->first(['tgl_registrasi', 'jam_reg']);
        if ($reg && ! empty($reg->tgl_registrasi) && ! empty($reg->jam_reg)) {
            return (string) $reg->tgl_registrasi.'T'.(string) $reg->jam_reg.$tz;
        }

        return '';
    }

    private function getPractitionerIhsIdFromNoRawat(string $noRawat): ?string
    {
        $pem = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->orderByDesc('tgl_perawatan')
            ->orderByDesc('jam_rawat')
            ->first(['nip']);

        $nip = $pem ? trim((string) ($pem->nip ?? '')) : '';

        $kdDokter = '';
        if ($nip === '') {
            $kdDokter = (string) (DB::table('reg_periksa')->where('no_rawat', $noRawat)->value('kd_dokter') ?? '');
            $kdDokter = trim($kdDokter);
        }

        $pegawaiKey = $nip !== '' ? $nip : $kdDokter;
        if ($pegawaiKey === '') {
            return null;
        }

        $pegawai = DB::table('pegawai')->where('nik', $pegawaiKey)->first(['no_ktp', 'nama']);
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
            if (($response['ok'] ?? false) && ! empty($response['json']['entry'])) {
                $practitioner = $response['json']['entry'][0]['resource'] ?? null;
                $id = is_array($practitioner) ? (string) ($practitioner['id'] ?? '') : '';
                if ($id !== '') {
                    DB::table('satusehat_mapping_practitioner')->updateOrInsert(
                        ['nik' => $nik],
                        [
                            'satusehat_id' => $id,
                            'nama' => $pegawai ? (string) ($pegawai->nama ?? $pegawaiKey) : $pegawaiKey,
                            'fhir_json' => json_encode($practitioner),
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
