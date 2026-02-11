<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MedicationDispenseService
{
    use SatuSehatTraits;

    public function sendMedicationDispensesForPenyerahan(string $noResep, string $noRawat, string $tglPerawatan, string $jam): array
    {
        $noResep = trim($noResep);
        $noRawat = trim($noRawat);
        $tglPerawatan = trim($tglPerawatan);
        $jam = trim($jam);

        if ($noResep === '' || $noRawat === '' || $tglPerawatan === '' || $jam === '') {
            return [
                'ok' => false,
                'code' => 'PARAM_REQUIRED',
                'message' => 'Parameter tidak lengkap untuk pengiriman MedicationDispense',
                'no_resep' => $noResep,
                'no_rawat' => $noRawat,
                'tgl_perawatan' => $tglPerawatan,
                'jam' => $jam,
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

        $rows = DB::table('detail_pemberian_obat')
            ->where('no_rawat', $noRawat)
            ->where('tgl_perawatan', $tglPerawatan)
            ->where('jam', $jam)
            ->orderBy('kode_brng', 'asc')
            ->get([
                'tgl_perawatan',
                'jam',
                'no_rawat',
                'kode_brng',
                'jml',
                'kd_bangsal',
                'no_batch',
                'no_faktur',
            ]);

        if ($rows->isEmpty()) {
            return [
                'ok' => false,
                'code' => 'DETAIL_NOT_FOUND',
                'message' => 'Data detail_pemberian_obat tidak ditemukan untuk timestamp penyerahan ini',
                'no_resep' => $noResep,
                'no_rawat' => $noRawat,
                'tgl_perawatan' => $tglPerawatan,
                'jam' => $jam,
            ];
        }

        $aturanMap = DB::table('aturan_pakai')
            ->where('no_rawat', $noRawat)
            ->where('tgl_perawatan', $tglPerawatan)
            ->where('jam', $jam)
            ->pluck('aturan', 'kode_brng');

        $whenHandedOver = $this->formatDateTime($tglPerawatan, $jam);

        $orgId = $this->satusehatOrganizationId();
        $orgId = preg_replace('~^Organization/~', '', trim($orgId));
        $results = [];

        foreach ($rows as $r) {
            $kodeBrng = trim((string) ($r->kode_brng ?? ''));
            if ($kodeBrng === '') {
                continue;
            }

            $noBatch = trim((string) ($r->no_batch ?? ''));
            $noFaktur = trim((string) ($r->no_faktur ?? ''));
            $kdBangsal = trim((string) ($r->kd_bangsal ?? ''));

            $existing = DB::table('satu_sehat_medicationdispense')
                ->where('no_rawat', $noRawat)
                ->where('tgl_perawatan', $tglPerawatan)
                ->where('jam', $jam)
                ->where('kode_brng', $kodeBrng)
                ->where('no_batch', $noBatch)
                ->where('no_faktur', $noFaktur)
                ->first(['id_medicationdispanse']);

            $existingId = $existing ? trim((string) ($existing->id_medicationdispanse ?? '')) : '';
            if ($existingId !== '') {
                $results[] = [
                    'no_rawat' => $noRawat,
                    'kode_brng' => $kodeBrng,
                    'no_batch' => $noBatch,
                    'no_faktur' => $noFaktur,
                    'id' => $existingId,
                    'action' => 'skipped',
                ];
                continue;
            }

            $medicationId = $this->getMedicationIhsIdFromKodeBrng($kodeBrng);
            if (! $medicationId) {
                $results[] = [
                    'no_rawat' => $noRawat,
                    'kode_brng' => $kodeBrng,
                    'no_batch' => $noBatch,
                    'no_faktur' => $noFaktur,
                    'action' => 'failed',
                    'code' => 'MEDICATION_REQUIRED',
                    'error' => 'Mapping obat SATUSEHAT belum ada',
                ];
                continue;
            }

            $identifierValue = $noRawat.':'.$tglPerawatan.'T'.$jam.':'.$kodeBrng.':'.$noBatch.':'.$noFaktur;

            $resource = [
                'resourceType' => 'MedicationDispense',
                'identifier' => [[
                    'system' => 'http://sys-ids.kemkes.go.id/prescription/'.$orgId,
                    'use' => 'official',
                    'value' => $identifierValue,
                ]],
                'status' => 'completed',
                'subject' => [
                    'reference' => 'Patient/'.$patientId,
                ],
                'context' => [
                    'reference' => 'Encounter/'.$encounterId,
                ],
                'medicationReference' => [
                    'reference' => 'Medication/'.$medicationId,
                ],
            ];

            if ($whenHandedOver) {
                $resource['whenHandedOver'] = $whenHandedOver;
            }

            $jml = (float) ($r->jml ?? 0);
            if ($jml > 0) {
                $qty = [
                    'value' => $jml,
                ];

                $unitCode = $this->getUnitCodeFromKodeBrng($kodeBrng);
                if ($unitCode) {
                    $qty['unit'] = $unitCode;
                    $qty['system'] = 'http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm';
                    $qty['code'] = $unitCode;
                }

                $resource['quantity'] = $qty;
            }

            $aturan = $aturanMap[$kodeBrng] ?? null;
            $aturan = is_string($aturan) ? trim($aturan) : '';
            if ($aturan !== '') {
                $resource['dosageInstruction'] = [[
                    'sequence' => 1,
                    'text' => $aturan,
                ]];
            }

            $medicationRequestId = $this->getMedicationRequestIdFromNoResepKodeBrng($noResep, $kodeBrng);
            if ($medicationRequestId) {
                $resource['authorizingPrescription'] = [[
                    'reference' => 'MedicationRequest/'.$medicationRequestId,
                ]];
            }

            $locationId = $this->getDepoLocationIdFromKdBangsal($kdBangsal);
            if ($locationId) {
                $resource['location'] = [
                    'reference' => 'Location/'.$locationId,
                ];
            }

            $res = $this->satusehatRequest('POST', 'MedicationDispense', $resource, [
                'prefer_representation' => true,
                'local_id' => $identifierValue,
            ]);

            if (! $res['ok']) {
                Log::warning('[SATUSEHAT][MedicationDispense] failed', [
                    'no_resep' => $noResep,
                    'no_rawat' => $noRawat,
                    'kode_brng' => $kodeBrng,
                    'no_batch' => $noBatch,
                    'no_faktur' => $noFaktur,
                    'status' => $res['status'] ?? null,
                    'error' => $res['error'] ?? null,
                ]);

                $results[] = [
                    'no_rawat' => $noRawat,
                    'kode_brng' => $kodeBrng,
                    'no_batch' => $noBatch,
                    'no_faktur' => $noFaktur,
                    'action' => 'failed',
                    'status' => $res['status'] ?? null,
                    'error' => $res['error'] ?? 'Unknown error',
                ];
                continue;
            }

            $id = is_array($res['json'] ?? null) ? trim((string) ($res['json']['id'] ?? '')) : '';
            if ($id !== '') {
                DB::table('satu_sehat_medicationdispense')->updateOrInsert(
                    [
                        'no_rawat' => $noRawat,
                        'tgl_perawatan' => $tglPerawatan,
                        'jam' => $jam,
                        'kode_brng' => $kodeBrng,
                        'no_batch' => $noBatch,
                        'no_faktur' => $noFaktur,
                    ],
                    [
                        'id_medicationdispanse' => $id,
                    ]
                );
            }

            $results[] = [
                'no_rawat' => $noRawat,
                'kode_brng' => $kodeBrng,
                'no_batch' => $noBatch,
                'no_faktur' => $noFaktur,
                'id' => $id,
                'action' => 'created',
            ];
        }

        return [
            'ok' => true,
            'no_resep' => $noResep,
            'no_rawat' => $noRawat,
            'tgl_perawatan' => $tglPerawatan,
            'jam' => $jam,
            'encounter_id' => $encounterId,
            'patient_id' => $patientId,
            'results' => $results,
        ];
    }

    private function formatDateTime(string $tgl, string $jam): ?string
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

    private function getUnitCodeFromKodeBrng(string $kodeBrng): ?string
    {
        $b = DB::table('databarang')->where('kode_brng', $kodeBrng)->first(['kode_sat']);
        $kodeSat = $b ? trim((string) ($b->kode_sat ?? '')) : '';
        return $kodeSat !== '' ? $kodeSat : null;
    }

    private function getMedicationRequestIdFromNoResepKodeBrng(string $noResep, string $kodeBrng): ?string
    {
        $m = DB::table('satu_sehat_medicationrequest')
            ->where('no_resep', $noResep)
            ->where('kode_brng', $kodeBrng)
            ->first(['id_medicationrequest']);

        $id = $m ? trim((string) ($m->id_medicationrequest ?? '')) : '';
        if ($id !== '') {
            return $id;
        }

        $mr = DB::table('satu_sehat_medicationrequest_racikan')
            ->where('no_resep', $noResep)
            ->where('kode_brng', $kodeBrng)
            ->whereNotNull('id_medicationrequest')
            ->orderBy('no_racik', 'asc')
            ->first(['id_medicationrequest']);

        $rid = $mr ? trim((string) ($mr->id_medicationrequest ?? '')) : '';
        return $rid !== '' ? $rid : null;
    }

    private function getDepoLocationIdFromKdBangsal(string $kdBangsal): ?string
    {
        $kdBangsal = trim($kdBangsal);
        if ($kdBangsal === '') {
            return null;
        }

        $m = DB::table('satu_sehat_mapping_lokasi_depo_farmasi')
            ->where('kd_bangsal', $kdBangsal)
            ->first(['id_lokasi_satusehat']);

        $id = $m ? trim((string) ($m->id_lokasi_satusehat ?? '')) : '';
        return $id !== '' ? $id : null;
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
}
