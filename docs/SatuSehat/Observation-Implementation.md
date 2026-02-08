# Observation Implementation - SATU SEHAT

**Tanggal**: 2026-02-08  
**Sprint**: 1.3 - Clinical Documentation  
**Priority**: HIGH (Tanda Vital & Pemeriksaan Fisik)

## 📋 Overview

Resource **Observation** adalah salah satu resource paling sering digunakan dalam FHIR untuk mencatat semua jenis pengukuran dan pengamatan klinis, termasuk:
- **Tanda Vital** (Vital Signs): Tekanan darah, nadi, suhu, pernapasan, saturasi oksigen
- **Pemeriksaan Fisik**: Temuan fisik head-to-toe examination
- **Antropometri**: Tinggi, berat, lingkar kepala, BMI
- **Hasil Lab**: Nilai laboratorium (integration dengan Lab system)
- **Hasil Radiologi**: Imaging findings

## 🎯 Scope untuk Aplikasi Ini

### Priority 1 (HIGH) - Vital Signs
✅ **Wajib untuk semua kunjungan**
- Tekanan Darah (Systolic/Diastolic)
- Nadi/Heart Rate
- Suhu Tubuh
- Pernapasan/Respiratory Rate
- Saturasi Oksigen

### Priority 2 (MEDIUM) - Antropometri
- Tinggi Badan
- Berat Badan
- BMI (Auto-calculated)
- Lingkar Kepala (untuk anak)

### Priority 3 (LOW) - Pemeriksaan Fisik
- Kepala & Leher
- Mata, Telinga, Hidung, Tenggorokan
- Jantung & Paru
- Abdomen
- Ekstremitas
- Neurologi

## 📊 Mapping Data Lokal

### Tabel Database - Tanda Vital

#### 1. **`pemeriksaan_ralan`** (Rawat Jalan)
```sql
CREATE TABLE pemeriksaan_ralan (
    no_rawat VARCHAR(17) PRIMARY KEY,
    tgl_perawatan DATE,
    jam_rawat TIME,
    suhu_tubuh DOUBLE,          -- Suhu dalam Celsius
    tensi VARCHAR(7),            -- Format: "120/80"
    nadi SMALLINT,               -- Beats per minute
    respirasi SMALLINT,          -- Breaths per minute
    tinggi SMALLINT,             -- cm
    berat DECIMAL(5,2),          -- kg
    spo2 DECIMAL(3,0),           -- Saturasi O2 (%)
    gcs VARCHAR(10),             -- Glasgow Coma Scale
    kesadaran ENUM('Compos Mentis', 'Somnolence', 'Sopor', 'Coma'),
    keluhan TEXT,
    pemeriksaan TEXT,
    alergi VARCHAR(50),
    lingkar_perut SMALLINT,
    rtl TEXT,                    -- Rencana tindak lanjut
    penilaian TEXT,
    instruksi TEXT,
    evaluasi TEXT,
    nip VARCHAR(20)              -- Dokter/perawat
);
```

#### 2. **`pemeriksaan_ranap`** (Rawat Inap)
```sql
-- Similar structure to pemeriksaan_ralan
```

### Tabel Tracking SATU SEHAT

#### **`satu_sehat_observation`**
```sql
CREATE TABLE satu_sehat_observation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    no_rawat VARCHAR(17),
    observation_type VARCHAR(50),    -- vital-signs, body-measurement, physical-exam
    loinc_code VARCHAR(20),           -- LOINC code untuk observation
    satusehat_id VARCHAR(100),        -- UUID dari SATU SEHAT
    fhir_json TEXT,
    status VARCHAR(20) DEFAULT 'sent',
    sent_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE KEY (no_rawat, observation_type, loinc_code),
    INDEX (satusehat_id),
    INDEX (observation_type)
);
```

## 🔧 FHIR Structure - Vital Signs

### Tekanan Darah (Blood Pressure)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85354-9",
        "display": "Blood pressure panel with all children optional"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_ihs_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_ihs_id}}"
  },
  "effectiveDateTime": "{{tgl_perawatan}}T{{jam_rawat}}+07:00",
  "issued": "{{timestamp}}",
  "performer": [
    {
      "reference": "Practitioner/{{practitioner_ihs_id}}"
    }
  ],
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8480-6",
            "display": "Systolic blood pressure"
          }
        ]
      },
      "valueQuantity": {
        "value": 120,
        "unit": "mmHg",
        "system": "http://unitsofmeasure.org",
        "code": "mm[Hg]"
      }
    },
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8462-4",
            "display": "Diastolic blood pressure"
          }
        ]
      },
      "valueQuantity": {
        "value": 80,
        "unit": "mmHg",
        "system": "http://unitsofmeasure.org",
        "code": "mm[Hg]"
      }
    }
  ]
}
```

### Heart Rate (Nadi)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "8867-4",
        "display": "Heart rate"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_ihs_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_ihs_id}}"
  },
  "effectiveDateTime": "{{timestamp}}",
  "performer": [
    {
      "reference": "Practitioner/{{practitioner_ihs_id}}"
    }
  ],
  "valueQuantity": {
    "value": 80,
    "unit": "beats/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}
```

### Respiratory Rate (Respirasi)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "9279-1",
        "display": "Respiratory rate"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_ihs_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_ihs_id}}"
  },
  "effectiveDateTime": "{{timestamp}}",
  "valueQuantity": {
    "value": 20,
    "unit": "breaths/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}
```

### Body Temperature (Suhu)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "8310-5",
        "display": "Body temperature"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_ihs_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_ihs_id}}"
  },
  "effectiveDateTime": "{{timestamp}}",
  "valueQuantity": {
    "value": 36.5,
    "unit": "degree Celsius",
    "system": "http://unitsofmeasure.org",
    "code": "Cel"
  }
}
```

### Oxygen Saturation (SpO2)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "59408-5",
        "display": "Oxygen saturation in Arterial blood by Pulse oximetry"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_ihs_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_ihs_id}}"
  },
  "effectiveDateTime": "{{timestamp}}",
  "valueQuantity": {
    "value": 98,
    "unit": "%",
    "system": "http://unitsofmeasure.org",
    "code": "%"
  }
}
```

## 📝 LOINC Codes Reference

### Vital Signs (Priority 1)

| Measurement | LOINC Code | Display | Unit | Field Lokal |
|-------------|------------|---------|------|-------------|
| **Blood Pressure Panel** | `85354-9` | Blood pressure panel | - | `tensi` |
| └─ Systolic BP | `8480-6` | Systolic blood pressure | mmHg | parse dari `tensi` |
| └─ Diastolic BP | `8462-4` | Diastolic blood pressure | mmHg | parse dari `tensi` |
| **Heart Rate** | `8867-4` | Heart rate | /min | `nadi` |
| **Respiratory Rate** | `9279-1` | Respiratory rate | /min | `respirasi` |
| **Body Temperature** | `8310-5` | Body temperature | Cel | `suhu_tubuh` |
| **Oxygen Saturation** | `59408-5` | O2 saturation by Pulse oximetry | % | `spo2` |

### Body Measurements (Priority 2)

| Measurement | LOINC Code | Display | Unit | Field Lokal |
|-------------|------------|---------|------|-------------|
| **Body Height** | `8302-2` | Body height | cm | `tinggi` |
| **Body Weight** | `29463-7` | Body weight | kg | `berat` |
| **BMI** | `39156-5` | Body mass index | kg/m2 | calculated |
| **Head Circumference** | `8287-5` | Head Occipital-frontal circumference | cm | - |
| **Abdominal Circumference** | `8280-0` | Waist circumference | cm | `lingkar_perut` |

## 🔄 Implementation Strategy

### Step 1: Create Migration

```bash
php artisan make:migration create_satu_sehat_observation_table
```

### Step 2: Create ObservationService

**File**: `app/Services/SatuSehat/ObservationService.php`

```php
namespace App\Services\SatuSehat;

use App\Traits\SatuSehatTraits;
use Illuminate\Support\Facades\DB;

class ObservationService
{
    use SatuSehatTraits;
    
    /**
     * Kirim bundle vital signs untuk satu kunjungan
     */
    public function sendVitalSigns($noRawat)
    {
        // Ambil data pemeriksaan
        $pemeriksaan = DB::table('pemeriksaan_ralan')
            ->where('no_rawat', $noRawat)
            ->first();
            
        if (!$pemeriksaan) return null;
        
        // Get required IDs
        $patientId = $this->getPatientIhsId($noRawat);
        $encounterId = $this->getEncounterIhsId($noRawat);
        $practitionerId = $this->getPractitionerIhsId($pemeriksaan->nip);
        
        if (!$patientId || !$encounterId) return null;
        
        $observations = [];
        
        // 1. Blood Pressure (jika ada)
        if ($pemeriksaan->tensi) {
            $observations[] = $this->buildBloodPressure($pemeriksaan, $patientId, $encounterId, $practitionerId);
        }
        
        // 2. Heart Rate (jika ada)
        if ($pemeriksaan->nadi) {
            $observations[] = $this->buildHeartRate($pemeriksaan, $patientId, $encounterId, $practitionerId);
        }
        
        // 3. Respiratory Rate
        if ($pemeriksaan->respirasi) {
            $observations[] = $this->buildRespiratoryRate($pemeriksaan, $patientId, $encounterId, $practitionerId);
        }
        
        // 4. Temperature
        if ($pemeriksaan->suhu_tubuh) {
            $observations[] = $this->buildTemperature($pemeriksaan, $patientId, $encounterId, $practitionerId);
        }
        
        // 5. SpO2
        if ($pemeriksaan->spo2) {
            $observations[] = $this->buildSpO2($pemeriksaan, $patientId, $encounterId, $practitionerId);
        }
        
        // Send each observation
        $results = [];
        foreach ($observations as $obs) {
            if ($obs) {
                $response = $this->satusehatRequest('POST', 'Observation', $obs);
                if ($response['ok']) {
                    $this->saveObservationTracking($noRawat, $response['json']);
                    $results[] = $response['json'];
                }
            }
        }
        
        return $results;
    }
    
    private function buildBloodPressure($data, $patientId, $encounterId, $practitionerId)
    {
        // Parse "120/80" format
        $bp = explode('/', $data->tensi);
        if (count($bp) != 2) return null;
        
        $systolic = (int) trim($bp[0]);
        $diastolic = (int) trim($bp[1]);
        
        if ($systolic <= 0 || $diastolic <= 0) return null;
        
        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';
        
        return [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '85354-9',
                    'display' => 'Blood pressure panel'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'issued' => now()->toIso8601String(),
            'performer' => [['reference' => 'Practitioner/' . $practitionerId]],
            'component' => [
                [
                    'code' => [
                        'coding' => [[
                            'system' => 'http://loinc.org',
                            'code' => '8480-6',
                            'display' => 'Systolic blood pressure'
                        ]]
                    ],
                    'valueQuantity' => [
                        'value' => $systolic,
                        'unit' => 'mmHg',
                        'system' => 'http://unitsofmeasure.org',
                        'code' => 'mm[Hg]'
                    ]
                ],
                [
                    'code' => [
                        'coding' => [[
                            'system' => 'http://loinc.org',
                            'code' => '8462-4',
                            'display' => 'Diastolic blood pressure'
                        ]]
                    ],
                    'valueQuantity' => [
                        'value' => $diastolic,
                        'unit' => 'mmHg',
                        'system' => 'http://unitsofmeasure.org',
                        'code' => 'mm[Hg]'
                    ]
                ]
            ]
        ];
    }
    
    private function buildHeartRate($data, $patientId, $encounterId, $practitionerId)
    {
        if (!$data->nadi || $data->nadi <= 0) return null;
        
        $datetime = $data->tgl_perawatan . 'T' . $data->jam_rawat . '+07:00';
        
        return [
            'resourceType' => 'Observation',
            'status' => 'final',
            'category' => [[
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/observation-category',
                    'code' => 'vital-signs',
                    'display' => 'Vital Signs'
                ]]
            ]],
            'code' => [
                'coding' => [[
                    'system' => 'http://loinc.org',
                    'code' => '8867-4',
                    'display' => 'Heart rate'
                ]]
            ],
            'subject' => ['reference' => 'Patient/' . $patientId],
            'encounter' => ['reference' => 'Encounter/' . $encounterId],
            'effectiveDateTime' => $datetime,
            'performer' => [['reference' => 'Practitioner/' . $practitionerId]],
            'valueQuantity' => [
                'value' => (int) $data->nadi,
                'unit' => 'beats/minute',
                'system' => 'http://unitsofmeasure.org',
                'code' => '/min'
            ]
        ];
    }
    
    // Similar methods for buildRespiratoryRate, buildTemperature, buildSpO2...
    
    private function saveObservationTracking($noRawat, $observationResource)
    {
        $loincCode = $observationResource['code']['coding'][0]['code'] ?? null;
        
        DB::table('satu_sehat_observation')->updateOrInsert(
            [
                'no_rawat' => $noRawat,
                'loinc_code' => $loincCode
            ],
            [
                'observation_type' => 'vital-signs',
                'satusehat_id' => $observationResource['id'],
                'fhir_json' => json_encode($observationResource),
                'status' => 'sent',
                'sent_at' => now(),
                'updated_at' => now()
            ]
        );
    }
}
```

### Step 3: Create Job

```php
namespace App\Jobs\SatuSehat;

class ProcessVitalSignsJob implements ShouldQueue
{
    protected $noRawat;
    
    public function __construct($noRawat)
    {
        $this->noRawat = $noRawat;
    }
    
    public function handle(ObservationService $service): void
    {
        $service->sendVitalSigns($this->noRawat);
    }
}
```

### Step 4: Controller Integration

Di controller yang handle simpan tanda vital (setelah insert `pemeriksaan_ralan`):

```php
// Setelah insert pemeriksaan berhasil
DB::commit();

// Dispatch job untuk kirim vital signs
\App\Jobs\SatuSehat\ProcessVitalSignsJob::dispatch($noRawat)
    ->afterResponse();
```

## ⚠️ Important Notes

1. **Status** wajib diisi:
   - `final`: Hasil akhir (biasanya)
   - `preliminary`: Hasil sementara
   - `amended`: Hasil yang sudah dikoreksi
   - `cancelled`: Dibatalkan

2. **Category** wajib untuk Vital Signs:
   - System: `http://terminology.hl7.org/CodeSystem/observation-category`
   - Code: `vital-signs`

3. **Units of Measure** menggunakan **UCUM** (Unified Code for Units of Measure):
   - System: `http://unitsofmeasure.org`
   - Examples: `mm[Hg]`, `/min`, `Cel`, `%`, `cm`, `kg`

4. **effectiveDateTime** vs **issued**:
   - `effectiveDateTime`: Kapan observasi dilakukan
   - `issued`: Kapan hasil dikeluarkan/dicatat

5. **Component** vs **value**:
   - Single value observation (nadi, suhu): gunakan `valueQuantity`
   - Multi-component observation (tensi): gunakan `component[]`

## 📊 Testing Checklist

- [ ] Test dengan data tensi normal (120/80)
- [ ] Test dengan data tensi kosong
- [ ] Test dengan data tensi tidak valid ("abc/def")
- [ ] Test dengan nadi, respirasi, suhu normal
- [ ] Test dengan salah satu vital sign kosong
- [ ] Test dengan semua vital signs terisi
- [ ] Verify LOINC codes benar
- [ ] Verify units benar (UCUM format)
- [ ] Check tracking table terisi
- [ ] Check data muncul di SATU SEHAT portal

## 📚 References

- [FHIR Observation](http://hl7.org/fhir/R4/observation.html)
- [FHIR Vital Signs](http://hl7.org/fhir/R4/observation-vitalsigns.html)
- [LOINC Browser](https://loinc.org/)
- [UCUM Units](https://ucum.org/ucum)
- [SATU SEHAT API Catalog](https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/observation/)

---

**Implementation Time Estimate**: 6-8 hours  
**Priority**: ⭐⭐⭐ HIGH (Critical untuk clinical documentation)
