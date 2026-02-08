<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class PatientService
{
    use SatuSehatTraits;
    
    /**
     * Cari atau buat Patient di SATU SEHAT
     * 
     * @param string $nikPasien NIK pasien (16 digit)
     * @return array|null Patient resource atau null jika gagal
     */
    public function findOrCreatePatient($nikPasien)
    {
        if (!$nikPasien || strlen($nikPasien) !== 16) {
            throw new \Exception("NIK pasien harus 16 digit");
        }
        
        // 1. Cek cache lokal
        $cached = $this->getCachedPatient($nikPasien);
        if ($cached) {
            return $cached;
        }
        
        //2. Search di SATU SEHAT
        $searchResult = $this->searchPatientByNIK($nikPasien);
        
        if ($searchResult['ok'] && !empty($searchResult['json']['entry'])) {
            $patient = $searchResult['json']['entry'][0]['resource'];
            $this->cachePatient($nikPasien, $patient['id']);
            return $patient;
        }
        
        // 3. Tidak ketemu, create new
        $localPatient = DB::table('pasien')
            ->where('no_ktp', $nikPasien)
            ->first();
            
        if (!$localPatient) {
            throw new \Exception("Pasien dengan NIK {$nikPasien} tidak ditemukan di database lokal");
        }
        
        $fhirPatient = $this->buildPatientResource($localPatient);
        $response = $this->satusehatRequest('POST', 'Patient', $fhirPatient);
        
        if (!$response['ok']) {
            throw new \Exception("Gagal create Patient: " . ($response['error'] ?? 'Unknown error'));
        }
        
        $createdPatient = $response['json'];
        $this->cachePatient($nikPasien, $createdPatient['id']);
        
        return $createdPatient;
    }
    
    /**
     * Build FHIR Patient resource dari data lokal
     */
    private function buildPatientResource($pasien)
    {
        $resource = [
            'resourceType' => 'Patient',
            'identifier' => [
                [
                    'use' => 'official',
                    'system' => 'https://fhir.kemkes.go.id/id/nik',
                    'value' => $pasien->no_ktp
                ]
            ],
            'active' => true,
            'name' => [
                [
                    'use' => 'official',
                    'text' => $pasien->nm_pasien
                ]
            ],
            'gender' => $pasien->jk === 'L' ? 'male' : 'female',
            'birthDate' => $pasien->tgl_lahir,
        ];
        
        // Tambahkan No RM jika ada
        if (!empty($pasien->no_rkm_medis)) {
            $resource['identifier'][] = [
                'use' => 'official',
                'system' => 'https://fhir.kemkes.go.id/id/norm',
                'value' => $pasien->no_rkm_medis
            ];
        }
        
        // Tambahkan alamat jika ada
        if (!empty($pasien->alamat)) {
            $resource['address'] = [
                [
                    'use' => 'home',
                    'line' => [$pasien->alamat],
                    'country' => 'ID'
                ]
            ];
            
            if (!empty($pasien->nm_kab)) {
                $resource['address'][0]['city'] = $pasien->nm_kab;
            }
            
            if (!empty($pasien->nm_prop)) {
                $resource['address'][0]['state'] = $pasien->nm_prop;
            }
            
            if (!empty($pasien->kd_pos)) {
                $resource['address'][0]['postalCode'] = $pasien->kd_pos;
            }
        }
        
        // Tambahkan telepon jika ada
        if (!empty($pasien->no_tlp)) {
            $resource['telecom'] = [
                [
                    'system' => 'phone',
                    'value' => $pasien->no_tlp,
                    'use' => 'mobile'
                ]
            ];
        }
        
        return $resource;
    }
    
    /**
     * Search Patient by NIK
     */
    private function searchPatientByNIK($nik)
    {
        return $this->satusehatRequest('GET', 'Patient', null, [
            'query' => [
                'identifier' => "https://fhir.kemkes.go.id/id/nik|{$nik}"
            ]
        ]);
    }
    
    /**
     * Get cached patient dari database lokal
     */
    private function getCachedPatient($nik)
    {
        // Cek dari cache Laravel dulu
        $cacheKey = "satusehat:patient:nik:{$nik}";
        $cached = Cache::get($cacheKey);
        
        if ($cached) {
            return $cached;
        }
        
        // Cek dari database mapping
        $mapping = DB::table('satusehat_patient_mapping')
            ->where('nik', $nik)
            ->first();
            
        if ($mapping && !empty($mapping->satusehat_id)) {
            // Get patient data from SATU SEHAT untuk validasi
            $response = $this->satusehatRequest('GET', "Patient/{$mapping->satusehat_id}");
            
            if ($response['ok']) {
                $patient = $response['json'];
                Cache::put($cacheKey, $patient, now()->addHours(24));
                return $patient;
            }
        }
        
        return null;
    }
    
    /**
     * Cache patient mapping
     */
    private function cachePatient($nik, $satusehatId)
    {
        // Cari no_rkm_medis dari table pasien
        $pasien = DB::table('pasien')->where('no_ktp', $nik)->first(['no_rkm_medis']);
        $noRkmMedis = $pasien ? $pasien->no_rkm_medis : null;

        // Simpan ke cache
        $cacheKey = "satusehat:patient:nik:{$nik}";
        Cache::put($cacheKey, ['id' => $satusehatId], now()->addHours(24));
        
        // Simpan ke database untuk persistent
        DB::table('satusehat_patient_mapping')->updateOrInsert(
            ['nik' => $nik],
            [
                'satusehat_id' => $satusehatId,
                'no_rkm_medis' => $noRkmMedis,
                'updated_at' => now()
            ]
        );
    }
}
