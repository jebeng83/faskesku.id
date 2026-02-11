<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ConditionService
{
    use SatuSehatTraits;

    /**
     * Create or Update Condition di SATU SEHAT
     */
    public function createCondition($noRawat, $kdPenyakit, $statusRawat = 'Ralan')
    {
        // 1. Get Data Pasien & Encounter & Diagnosa
        $data = DB::table('reg_periksa as rp')
            ->join('pasien as p', 'rp.no_rkm_medis', '=', 'p.no_rkm_medis')
            ->crossJoin('penyakit as diag') // Cross join because we want specific disease regardless of relation
            ->where('rp.no_rawat', $noRawat)
            ->where('diag.kd_penyakit', $kdPenyakit)
            ->select(
                'rp.no_rawat',
                'rp.tgl_registrasi',
                'p.no_ktp as nik_pasien',
                'p.nm_pasien',
                'diag.kd_penyakit',
                'diag.nm_penyakit'
            )
            ->first();

        if (!$data) {
            Log::warning("Data diagnosa tidak ditemukan untuk sync Satu Sehat", ['no_rawat' => $noRawat, 'kd_penyakit' => $kdPenyakit]);
            return null;
        }

        // 2. Get Encounter ID & Patient ID (from tracking tables)
        $encounterTracking = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first();
        if (!$encounterTracking || empty($encounterTracking->satusehat_id)) {
            // Coba cek tabel legacy
            $legacyEncounter = DB::table('satu_sehat_encounter')->where('no_rawat', $noRawat)->first();
            if ($legacyEncounter && !empty($legacyEncounter->id_encounter)) {
                $encounterId = $legacyEncounter->id_encounter;
            } else {
                Log::warning("Encounter SATU SEHAT belum terbentuk/dikirim", ['no_rawat' => $noRawat]);
                return null;
            }
        } else {
            $encounterId = $encounterTracking->satusehat_id;
        }

        // Get Patient ID
        $patientId = null;
        $patientMapping = DB::table('satusehat_patient_mapping')->where('nik', $data->nik_pasien)->first();
        if ($patientMapping) {
            $patientId = $patientMapping->satusehat_id;
        } else {
            // Jika belum ada mapping, coba cari via NIK (atau panggil PatientService)
            // Untuk saat ini, asumsikan sudah ada dari proses registrasi
            Log::warning("Patient ID SATU SEHAT belum ada", ['nik' => $data->nik_pasien]);
            return null;
        }

        $practitionerId = $this->getPractitionerIhsIdFromNoRawat((string) $noRawat);

        // 3. Cek apakah Condition sudah pernah dikirim (untuk Update vs Create)
        $conditionTracking = DB::table('satu_sehat_condition')
            ->where('no_rawat', $noRawat)
            ->where('kd_penyakit', $kdPenyakit)
            ->where('status', $statusRawat)
            ->first();

        $existingId = $conditionTracking->id_condition ?? null;

        // 4. Build Resource
        $resource = $this->buildConditionResource($data, $patientId, $encounterId, $practitionerId, $existingId);

        // 5. Send Request
        if ($existingId) {
            // Update (PUT)
             $response = $this->satusehatRequest('PUT', "Condition/{$existingId}", $resource);
        } else {
            // Create (POST)
            $response = $this->satusehatRequest('POST', 'Condition', $resource);
        }

        // 6. Save Tracking
        if ($response['ok']) {
            $conditionId = $response['json']['id'];
            
            // Simpan ke tabel legacy satu_sehat_condition
            // Note: Tabel ini punya composite PK (no_rawat, kd_penyakit, status)
            DB::table('satu_sehat_condition')->updateOrInsert(
                [
                    'no_rawat' => $noRawat,
                    'kd_penyakit' => $kdPenyakit,
                    'status' => $statusRawat
                ],
                [
                    'id_condition' => $conditionId
                ]
            );

            // Kita tidak simpan ke satusehat_resources manual karena sudah ada auto-logger di Trait
            return $response['json'];
        } else {
            Log::error("Gagal kirim Condition ke Satu Sehat", [
                'error' => $response['error'],
                'no_rawat' => $noRawat
            ]);
            return null;
        }
    }

    private function buildConditionResource($data, $patientId, $encounterId, $practitionerId = null, $existingId = null)
    {
        $patientId = trim((string) $patientId);
        $encounterId = trim((string) $encounterId);
        $practitionerId = $practitionerId ? trim((string) $practitionerId) : '';

        $recorderRef = $practitionerId !== '' ? 'Practitioner/'.$practitionerId : 'Patient/'.$patientId;

        $resource = [
            'resourceType' => 'Condition',
            'clinicalStatus' => [
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    'code' => 'active',
                    'display' => 'Active'
                ]]
            ],
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/condition-category',
                    'code' => 'encounter-diagnosis',
                    'display' => 'Encounter Diagnosis'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://hl7.org/fhir/sid/icd-10',
                    'code' => $data->kd_penyakit, // Pastikan kode ICD 10 valid (tanpa titik atau dengan titik tergantung standarnnya, ICD-10 FHIR biasanya pakai titik misal K29.7)
                    'display' => $data->nm_penyakit
                ]]
            ],
            'subject' => [
                'reference' => "Patient/{$patientId}",
                'display' => $data->nm_pasien
            ],
            'encounter' => [
                'reference' => "Encounter/{$encounterId}"
            ],
            'asserter' => [
                'reference' => $recorderRef,
            ],
            'recorder' => [
                'reference' => $recorderRef,
            ],
        ];

        $recordedDate = trim((string) ($data->tgl_registrasi ?? ''));
        if ($recordedDate !== '') {
            $normalized = $this->normalizeDateTimeForSatusehat($recordedDate);
            if ($normalized) {
                $resource['recordedDate'] = $normalized;
            }
        }
        
        if ($existingId) {
            $resource['id'] = $existingId;
        }

        return $resource;
    }

    private function normalizeDateTimeForSatusehat(string $value): ?string
    {
        $value = trim($value);
        if ($value === '') {
            return null;
        }

        try {
            $dt = Carbon::parse($value, 'Asia/Jakarta');
        } catch (\Throwable) {
            return null;
        }

        $min = Carbon::parse('2014-06-03 00:00:00', 'Asia/Jakarta');
        if ($dt->lt($min)) {
            $dt = $min;
        }

        $now = Carbon::now('Asia/Jakarta');
        if ($dt->gt($now)) {
            $dt = $now;
        }

        return $dt->toIso8601String();
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
            Log::warning('[SATUSEHAT][Condition] Gagal search Practitioner', ['no_rawat' => $noRawat, 'error' => $e->getMessage()]);
        }

        return null;
    }
}
