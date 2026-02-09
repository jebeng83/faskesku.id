# SATU SEHAT - Panduan Implementasi Detail

**Referensi:** [SatuSehat.md](./SatuSehat.md)  
**Tanggal:** 8 Februari 2026

---

## 📚 DAFTAR ISI

1. [Mapping Database Lokal ke FHIR](#mapping-database)
2. [Implementasi Step-by-Step per Resource](#implementasi-resources)
3. [Contoh Kode Lengkap](#contoh-kode)
4. [Testing & Debugging](#testing)
5. [Troubleshooting Common Issues](#troubleshooting)

---

## 🗄️ MAPPING DATABASE LOKAL KE FHIR {#mapping-database}

### Tabel Utama Aplikasi

#### 1. reg_periksa → Encounter

| Kolom Lokal | FHIR Path | Type | Keterangan |
|-------------|-----------|------|------------|
| no_rawat | identifier[0].value | string | ID unik kunjungan |
| no_rkm_medis | subject.identifier | string | Link ke Patient |
| tgl_registrasi | period.start | dateTime | Waktu mulai kunjungan |
| jam_reg | period.start (time) | time | Gabung dengan tgl_registrasi |
| kd_dokter | participant[0].individual | reference | Link ke Practitioner |
| kd_poli | location[0].location | reference | Link ke Location (via `satu_sehat_mapping_lokasi_ralan`) |
| status_lanjut | class | Coding | AMB=rawat jalan, IMP=rawat inap |
| stts | status | code | Belum=planned, Sudah=arrived, Selesai=finished |

**Struktur Tabel Mapping Lokasi (`satu_sehat_mapping_lokasi_ralan`):**
- `kd_poli` (PK, char 5)
- `id_organisasi_satusehat` (FK, varchar 40) -> Link ke `satu_sehat_mapping_departemen`
- `id_lokasi_satusehat` (varchar 40) -> ID Location di SATU SEHAT
- `longitude`, `latitude`, `altittude`

**Konsep Hierarki Mapping:**
1. **Poli/Unit** (di `poliklinik`) harus dipetakan ke **Department** (di `satu_sehat_mapping_departemen`).
2. **Department** memiliki `id_organisasi_satusehat` (Sub-organization di Satu Sehat).
3. **Location** (Ruangan fisik) baru bisa dibuat/dipetakan di bawah Department tersebut.

---

### FASE 1 Sprint 1.2: Complete Encounter Workflow

**Controller:** `app/Http/Controllers/SatuSehat/RawatJalan/EncounterController.php`
*(Kode controller tetap sama)*

**Service:** `app/Services/SatuSehat/EncounterService.php`

```php
<?php

namespace App\Services\SatuSehat;

// ... imports ...

class EncounterService
{
    // ... traits & constructor ...

    // ... createEncounter method ...
    
    // ...

    private function buildEncounterResource($regPeriksa, $patientId)
    {
        $periodStart = Carbon::parse($regPeriksa->tgl_registrasi . ' ' . $regPeriksa->jam_reg)
            ->setTimezone('Asia/Jakarta')
            ->toIso8601String();
            
        $status = $this->mapStatus($regPeriksa->stts);
        
        $resource = [
            'resourceType' => 'Encounter',
            'identifier' => [[
                'system' => 'http://sys-ids.kemkes.go.id/encounter/' . $this->satusehatOrganizationId(),
                'value' => $regPeriksa->no_rawat
            ]],
            'status' => $status,
            'class' => [
                'system' => 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                'code' => ($regPeriksa->status_lanjut === 'Ralan' || $regPeriksa->status_lanjut === 'Rawat Jalan') ? 'AMB' : 'IMP',
                'display' => ($regPeriksa->status_lanjut === 'Ralan' || $regPeriksa->status_lanjut === 'Rawat Jalan') ? 'ambulatory' : 'inpatient encounter'
            ],
            'subject' => [
                'reference' => "Patient/{$patientId}",
                'display' => $regPeriksa->nm_pasien
            ],
            'participant' => [[
                'type' => [[
                    'coding' => [[
                        'system' => 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                        'code' => 'ATND',
                        'display' => 'attender'
                    ]]
                ]],
                'individual' => [
                    'reference' => "Practitioner/{$this->getPractitionerId($regPeriksa->nik_dokter)}",
                    'display' => $regPeriksa->nm_dokter
                ]
            ]],
            'period' => [
                'start' => $periodStart
            ],
            'location' => [[
                'location' => [
                    'reference' => "Location/{$this->getLocationId($regPeriksa->kd_poli)}",
                    'display' => $regPeriksa->nm_poli
                ]
            ]],
            'serviceProvider' => [
                'reference' => "Organization/{$this->satusehatOrganizationId()}"
            ]
        ];

        // WAJIB: Tambahkan statusHistory jika status bukan 'arrived'/'planned' awal
        // Atau selalu sertakan untuk kelengkapan data
        $resource['statusHistory'] = [
            [
                'status' => 'arrived',
                'period' => [
                    'start' => $periodStart
                ]
            ]
        ];

        return $resource;
    }
    
    // ... mapStatus method ...
    
    private function getLocationId($kdPoli)
    {
        // Menggunakan tabel mapping yang benar (legacy table)
        $mapping = DB::table('satu_sehat_mapping_lokasi_ralan')
            ->where('kd_poli', $kdPoli)
            ->first();

        if (!$mapping || empty($mapping->id_lokasi_satusehat)) {
            // Optional: Log error atau skip
            return 'Location-UUID-Required'; 
        }

        return $mapping->id_lokasi_satusehat;
    }

    // ... saveEncounterTracking method ...
}
```

---

## 🧪 TESTING & DEBUGGING {#testing}

### Unit Test Example

```php
<?php

namespace Tests\Feature\SatuSehat;

use Tests\TestCase;
use App\Services\SatuSehat\PatientService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PatientServiceTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_can_create_patient_in_satusehat()
    {
        $patientService = app(PatientService::class);
        
        // Assume patient exists in local DB
        $nik = '3201234567890123';
        
        $patient = $patientService->findOrCreatePatient($nik);
        
        $this->assertNotNull($patient);
        $this->assertArrayHasKey('id', $patient);
    }
}
```

### Postman Collection Structure

**Folder: Prerequisites**
- GET Token
- GET Organization
- GET Location by Organization
- Search Practitioner by NIK
- Search Patient by NIK

**Folder: Encounter**
- POST Create Encounter
- GET Encounter by ID
- PUT Update Encounter
- PUT Finish Encounter

**Folder: Observation**
- POST TTV (Blood Pressure, Heart Rate, etc)
- POST Antropometri
- GET Observation by Encounter

---

## 🔧 TROUBLESHOOTING {#troubleshooting}

### Error: "Patient dengan NIK xxx not found"

**Penyebab:**
- Patient belum terdaftar di SATU SEHAT
- NIK tidak valid atau tidak sesuai Dukcapil

**Solusi:**
``` php
// Pastikan NIK valid (16 digit)
// Pastikan NIK sesuai dengan data Dukcapil
// Untuk testing, gunakan NIK dummy dari Postman SATU SEHAT
```

### Error: "Invalid reference to Practitioner"

**Penyebab:**
- Practitioner belum pernah dicari/cache di system
- NIK dokter tidak ada di SATU SEHAT

**Solusi:**
```php
// 1. Cari dulu Practitioner by NIK sebelum create Encounter
// 2. Simpan IHS number Practitioner ke database lokal
// 3. Gunakan IHS number untuk reference
```

### Error: "Observation must reference an Encounter"

**Penyebab:**
- Encounter belum ada
- Encounter ID salah

**Solusi:**
```php
// Pastikan Encouter dibuat dulu
// Simpan Encounter ID di tracking table
// Gunakan Encounter ID yang valid untuk Observation
```

---

**Catatan:** Dokumentasi ini akan terus diupdate seiring perkembangan implementasi.
