# Implementasi Resource Composition (Resume Medis)

## 1. Pendahuluan
Resource **Composition** digunakan untuk membuat dokumen klinik yang terstruktur, seperti resume medis (discharge summary). Resource ini mengelompokkan berbagai resource lain (Encounter, Condition, Observation, Procedure, Medication, dll) menjadi satu kesatuan dokumen yang koheren.

## 2. Struktur Data FHIR Composition

Resource Composition memiliki struktur utama sebagai berikut:

- **status**: Status dokumen (final, preliminary, amended).
- **type**: Jenis dokumen (LOINC 18842-5: Discharge Summary).
- **subject**: Pasien subjek dokumen.
- **encounter**: Encounter terkait.
- **date**: Tanggal pembuatan dokumen.
- **author**: Penulis dokumen (Practitioner).
- **title**: Judul dokumen (e.g., "Resume Medis Rawat Jalan").
- **section**: Bagian-bagian dokumen (Diagnosis, Tindakan, Resep, dll).

### Contoh JSON Payload:

```json
{
  "resourceType": "Composition",
  "status": "final",
  "type": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "18842-5",
        "display": "Discharge Summary"
      }
    ]
  },
  "subject": {
    "reference": "Patient/100000030009"
  },
  "encounter": {
    "reference": "Encounter/266d5598-653e-4d43-9828-56ce9952924a"
  },
  "date": "2022-12-30T10:30:00+07:00",
  "author": [
    {
      "reference": "Practitioner/N10000001"
    }
  ],
  "title": "Resume Medis Rawat Jalan",
  "section": [
    {
      "title": "Diagnosis Utama",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "29548-5",
            "display": "Diagnosis.discharge"
          }
        ]
      },
      "entry": [
        {
          "reference": "Condition/3fc59d28-0951-4091-aca7-8720e5251767"
        }
      ]
    },
    {
      "title": "Tindakan",
      "code": {
        "coding": [
            {
                "system": "http://loinc.org",
                "code": "47519-4",
                "display": "History of Procedures Document"
            }
        ]
      },
       "entry": [
        {
          "reference": "Procedure/e5c20c02-e25f-4131-ab8a-7756f1f41539"
        }
      ]
    },
      {
      "title": "Alergi",
      "code": {
        "coding": [
            {
                "system": "http://loinc.org",
                "code": "48765-2",
                "display": "Allergies and adverse reactions Document"
            }
        ]
      },
       "entry": [
        {
            "reference": "AllergyIntolerance/9d6349c2-55f4-419b-8961-d7790e29b111"
        }
      ]
    }
  ]
}
```

## 3. Strategi Implementasi di Aplikasi

Kita akan membuat `CompositionService` yang bertugas untuk mengumpulkan semua resource yang telah dikirim ke SATU SEHAT untuk sebuah Encounter tertentu, dan menyatukannya dalam satu Composition.

### Langkah-langkah:

1.  **Identifikasi ID Resource**: Dapatkan UUID SATU SEHAT untuk Encounter, Patient, dan Practitioner terkait.
2.  **Kumpulkan Resource Terkait**: Cari di tabel tracking lokal (`satusehat_resources`) semua resource (Condition, Observation, Procedure, MedicationRequest) yang terkait dengan `no_rawat` tersebut dan sudah terkirim (memiliki UUID SATU SEHAT).
3.  **Build Section**: Buat array `section` berdasarkan jenis resource yang ditemukan.
    - **Diagnosis**: Ambil dari resource `Condition` tipe `diagnosis`.
    - **Tindakan**: Ambil dari resource `Procedure`.
    - **Tanda Vital**: Ambil dari resource `Observation` kategori `vital-signs`.
    - **Resep**: Ambil dari resource `MedicationRequest`.
4.  **Create Composition**: Kirim payload Composition ke endpoint `/Composition`.

### Rencana Kode (`app/Services/SatuSehat/CompositionService.php`)

```php
<?php

namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CompositionService
{
    use SatuSehatTraits;

    public function createComposition($noRawat)
    {
        // 1. Get Encounter Info dari tracking
        $encounterTracking = DB::table('satusehat_encounter')->where('no_rawat', $noRawat)->first();
        if (!$encounterTracking || !$encounterTracking->satusehat_id) {
            throw new \Exception("Encounter belum dikirim ke SATU SEHAT");
        }
        $encounterId = $encounterTracking->satusehat_id;

        // 2. Get Data Registrasi untuk Subject & Author
        $regPeriksa = DB::table('reg_periksa')
            ->join('pasien', 'reg_periksa.no_rkm_medis', '=', 'pasien.no_rkm_medis')
            ->join('dokter', 'reg_periksa.kd_dokter', '=', 'dokter.kd_dokter')
            ->where('reg_periksa.no_rawat', $noRawat)
            ->first();

        // Asumsi mapping pasien dan practitioner sudah ada/di-cache
        $patientId = $this->getPatientId($regPeriksa->nik_pasien); // Implement logic
        $practitionerId = $this->getPractitionerId($regPeriksa->nik_dokter); // Implement logic

        // 3. Kumpulkan Resource dari tabel tracking log
        // Kita perlu query tabel satusehat_resources atau tracking spesifik per tipe
        
        $sections = [];

        // Section: Diagnosis (Condition)
        $conditions = DB::table('satusehat_condition') // Asumsi tabel ini ada
            ->where('no_rawat', $noRawat)
            ->whereNotNull('satusehat_id')
            ->get();
        
        if ($conditions->isNotEmpty()) {
            $entry = [];
            foreach ($conditions as $cond) {
                $entry[] = ['reference' => "Condition/{$cond->satusehat_id}"];
            }
            $sections[] = [
                'title' => 'Diagnosis Utama',
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '29548-5',
                        'display' => 'Diagnosis.discharge'
                    ]]
                ],
                'entry' => $entry
            ];
        }

        // Section: Tanda Vital (Observation)
        $observations = DB::table('satusehat_observation') // Asumsi tabel ini ada
            ->where('no_rawat', $noRawat)
            ->whereNotNull('satusehat_id')
            ->get();
        if ($observations->isNotEmpty()) {
            $entry = [];
            foreach ($observations as $obs) {
                $entry[] = ['reference' => "Observation/{$obs->satusehat_id}"];
            }
            $sections[] = [
                'title' => 'Tanda Vital',
                'code' => [
                    'coding' => [[
                        'system' => 'http://loinc.org',
                        'code' => '8716-3',
                        'display' => 'Vital signs'
                    ]]
                ],
                'entry' => $entry
            ];
        }

        // Section: Tindakan (Procedure)
        // ... Load procedures ...

        // 4. Build Resource
        $resource = [
            'resourceType' => 'Composition',
            'status' => 'final',
            'type' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '18842-5',
                    'display' => 'Discharge Summary'
                ]]
            ],
            'subject' => ['reference' => "Patient/{$patientId}"],
            'encounter' => ['reference' => "Encounter/{$encounterId}"],
            'date' => Carbon::now()->toIso8601String(),
            'author' => [['reference' => "Practitioner/{$practitionerId}"]],
            'title' => "Resume Medis - {$regPeriksa->no_rawat}",
            'section' => $sections
        ];

        // 5. Send Request
        return $this->satusehatRequest('POST', 'Composition', $resource);
    }
}
```

## 4. Tabel Pendukun (Tracking Table)

Agar Composition dapat dibuat secara otomatis, kita perlu memastikan setiap resource yang dikirim (Observation, Condition, dll) dicatat ID-nya.

Saran struktur tabel tracking gabungan atau per-resource:

**Opsi A: Tabel Gabungan (`satusehat_resources`)**
```sql
CREATE TABLE satusehat_resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    no_rawat VARCHAR(20),
    resource_type VARCHAR(50), -- 'Observation', 'Condition', 'Procedure'
    satusehat_id VARCHAR(100), -- UUID dari response SS
    local_id VARCHAR(100), -- ID dari tabel lokal (jika ada, e.g., id_tindakan)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (no_rawat),
    INDEX (resource_type)
);
```
Ini sudah diimplementasikan di `database/migrations/2026_02_08_100634_create_satusehat_tracking_tables.php`. Kita tinggal memanfaatkannya di query `CompositionService`.

## 5. Next Steps

1.  Buat file `app/Services/SatuSehat/CompositionService.php`.
2.  Pastikan setiap pengiriman `Observation` dan `Condition` mencatat sukses ID ke tabel `satusehat_resources` dengan kolom `no_rawat` terisi.
3.  Buat endpoint atau Job yang memanggil `createComposition($noRawat)` setelah Encounter berstatus `finished`.
