# AllergyIntolerance Implementation Guide - SATU SEHAT

Tanggal: 2026-02-08  
Sprint: 1.3 - Clinical Documentation (Anamnesis)

## 📋 Overview

Resource **AllergyIntolerance** digunakan untuk mencatat riwayat alergi dan intoleransi pasien terhadap suatu substansi (obat, makanan, lingkungan). Data ini critical untuk patient safety dan clinical decision support.

## 🎯 Tujuan Implementasi

1. **Patient Safety**: Mencegah pemberian obat/makanan yang dapat menyebabkan reaksi alergi
2. **Clinical Support**: Mendukung keputusan klinis dalam prescribing medication
3. **Interoperability**: Memastikan data alergi dapat diakses di seluruh ekosistem SATU SEHAT
4. **Compliance**: Memenuhi standar FHIR R4 dan regulasi SATU SEHAT

## 📊 Mapping Data Lokal

### Tabel Database yang Terlibat

#### 1. **`data_alergi`** (Master Data Alergi)
```sql
CREATE TABLE data_alergi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    jenis_alergi_kode VARCHAR(10),  -- FK ke jenis_alergi
    nama_alergi VARCHAR(100),
    kategori ENUM('obat', 'makanan', 'lingkungan', 'lainnya'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### 2. **`jenis_alergi`** (Klasifikasi Alergi)
```sql
CREATE TABLE jenis_alergi (
    kode VARCHAR(10) PRIMARY KEY,
    nama VARCHAR(50),
    -- Contoh: 'OBAT', 'MAKANAN', 'LINGKUNGAN'
);
```

#### 3. **`alergi_pasien`** (Riwayat Alergi Per Pasien)
```sql
CREATE TABLE alergi_pasien (
    no_rkm_medis VARCHAR(15),
    alergi_kode VARCHAR(10),  -- FK ke data_alergi
    tgl_input DATE,
    keterangan TEXT,
    tingkat_keparahan ENUM('ringan', 'sedang', 'berat', 'fatal'),
    status ENUM('aktif', 'tidak_aktif', 'resolved'),
    reaction_manifestation TEXT,  -- Gejala yang muncul
    PRIMARY KEY (no_rkm_medis, alergi_kode, tgl_input)
);
```

#### 4. **`satu_sehat_allergy_intolerance`** (Tracking SATU SEHAT)
```sql
CREATE TABLE satu_sehat_allergy_intolerance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    no_rkm_medis VARCHAR(15),
    alergi_kode VARCHAR(10),
    satusehat_id VARCHAR(100),  -- UUID dari SATU SEHAT
    fhir_json TEXT,
    status VARCHAR(20) DEFAULT 'sent',
    sent_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE KEY (no_rkm_medis, alergi_kode)
);
```

## 🔧 FHIR Resource Structure

### Elemen FHIR AllergyIntolerance (Minimal Required)

```json
{
  "resourceType": "AllergyIntolerance",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/allergy/<org_id>",
      "value": "{{local_allergy_id}}"
    }
  ],
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
        "code": "active",
        "display": "Active"
      }
    ]
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ]
  },
  "category": ["medication"],
  "criticality": "high",
  "code": {
    "coding": [
      {
        "system": "http://sys-ids.kemkes.go.id/kfa",
        "code": "{{kfa_code}}",
        "display": "{{substance_name}}"
      }
    ],
    "text": "{{substance_name}}"
  },
  "patient": {
    "reference": "Patient/{{patient_ihs_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_ihs_id}}"
  },
  "recordedDate": "{{recorded_date}}",
  "recorder": {
    "reference": "Practitioner/{{practitioner_ihs_id}}"
  },
  "reaction": [
    {
      "manifestation": [
        {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "{{snomed_code}}",
              "display": "{{reaction_display}}"
            }
          ],
          "text": "{{reaction_text}}"
        }
      ],
      "severity": "moderate"
    }
  ]
}
```

### Mapping Field Lokal → FHIR

| Field Lokal | FHIR Path | Notes |
|-------------|-----------|-------|
| `no_rkm_medis` + `alergi_kode` | `identifier[0].value` | ID lokal |
| `status` | `clinicalStatus.coding[0].code` | active/inactive/resolved |
| - | `verificationStatus` | Hardcode: "confirmed" |
| `jenis_alergi.nama` | `category` | medication/food/environment/biologic |
| `tingkat_keparahan` | `criticality` | low/high/unable-to-assess |
| `nama_alergi` | `code.text` | Nama substansi |
| `data_alergi.kfa_code` | `code.coding[0].code` | Kode KFA (jika obat) |
| `no_rkm_medis` | `patient.reference` | Lookup Patient IHS ID |
| `no_rawat` | `encounter.reference` | Lookup Encounter IHS ID |
| `tgl_input` | `recordedDate` | Tanggal dicatat |
| `kd_dokter` | `recorder.reference` | Lookup Practitioner IHS ID |
| `reaction_manifestation` | `reaction[0].manifestation[0].text` | Gejala yang muncul |
| `tingkat_keparahan` | `reaction[0].severity` | mild/moderate/severe |

## 📝 Syarat Pengambilan Data

### Prerequisites

1. **Patient IHS ID** harus sudah ada
   - Cek tabel `satusehat_patient_mapping`
   - Jika belum ada, create/search Patient dulu

2. **Practitioner IHS ID** (Recorder) harus sudah ada
   - Dokter yang mencatat alergi

3. **Encounter IHS ID** (optional tapi recommended)
   - Jika alergi dicatat saat encounter tertentu
   - Jika tidak ada, bisa kosongkan field `encounter`

### Data Validation Rules

1. **clinicalStatus** wajib diisi:
   - `active`: Alergi masih aktif
   - `inactive`: Alergi sudah tidak aktif tapi pernah ada
   - `resolved`: Alergi sudah hilang/sembuh

2. **verificationStatus** wajib diisi:
   - `unconfirmed`: Dicurigai tapi belum dikonfirmasi
   - `confirmed`: Sudah dikonfirmasi
   - `refuted`: Ternyata bukan alergi
   - `entered-in-error`: Salah input

3. **category** (array) bisa multiple:
   - `medication`: Obat-obatan
   - `food`: Makanan
   - `environment`: Lingkungan (debu, serbuk sari)
   - `biologic`: Biologis (vaksin, serum)

4. **criticality**:
   - `low`: Risiko rendah
   - `high`: Risiko tinggi (bisa fatal)
   - `unable-to-assess`: Tidak dapat dinilai

5. **code** (substansi):
   - Gunakan **KFA** (Kode Farmasi dan Alat Kesehatan) untuk obat
   - Gunakan **SNOMED CT** untuk makanan/lingkungan jika tersedia
   - Minimal wajib ada `code.text` (free text)

6. **reaction.severity**:
   - `mild`: Ringan
   - `moderate`: Sedang
   - `severe`: Berat

## 🚀 Implementation Steps

### Step 1: Create Migration untuk Tracking Table

```bash
php artisan make:migration create_satu_sehat_allergy_intolerance_table
```

```php
Schema::create('satu_sehat_allergy_intolerance', function (Blueprint $table) {
    $table->id();
    $table->string('no_rkm_medis', 15);
    $table->string('alergi_kode', 10);
    $table->string('satusehat_id', 100)->nullable();
    $table->text('fhir_json')->nullable();
    $table->string('status', 20)->default('pending');
    $table->text('error_message')->nullable();
    $table->timestamp('sent_at')->nullable();
    $table->timestamps();
    
    $table->unique(['no_rkm_medis', 'alergi_kode']);
    $table->index('satusehat_id');
});
```

### Step 2: Create Service `AllergyIntoleranceService.php`

```php
namespace App\Services\SatuSehat;

class AllergyIntoleranceService
{
    use SatuSehatTraits;
    
    public function createAllergyIntolerance($noRkm, $alergiKode)
    {
        // 1. Ambil data alergi lokal
        $data = DB::table('alergi_pasien as ap')
            ->join('data_alergi as da', 'ap.alergi_kode', '=', 'da.id')
            ->join('pasien as p', 'ap.no_rkm_medis', '=', 'p.no_rkm_medis')
            ->leftJoin('jenis_alergi as ja', 'da.jenis_alergi_kode', '=', 'ja.kode')
            ->where('ap.no_rkm_medis', $noRkm)
            ->where('ap.alergi_kode', $alergiKode)
            ->select(
                'ap.*',
                'da.nama_alergi',
                'da.kategori',
                'ja.nama as jenis_nama',
                'p.no_ktp as nik'
            )
            ->first();
            
        if (!$data) return null;
        
        // 2. Get Patient IHS ID
        $patientId = $this->getPatientIhsId($data->nik);
        if (!$patientId) return null;
        
        // 3. Check existing
        $existing = DB::table('satu_sehat_allergy_intolerance')
            ->where('no_rkm_medis', $noRkm)
            ->where('alergi_kode', $alergiKode)
            ->first();
            
        // 4. Build FHIR Resource
        $resource = $this->buildAllergyResource($data, $patientId, $existing?->satusehat_id);
        
        // 5. POST or PUT
        if ($existing?->satusehat_id) {
            $response = $this->satusehatRequest('PUT', "AllergyIntolerance/{$existing->satusehat_id}", $resource);
        } else {
            $response = $this->satusehatRequest('POST', 'AllergyIntolerance', $resource);
        }
        
        // 6. Save tracking
        if ($response['ok']) {
            $allergyId = $response['json']['id'];
            DB::table('satu_sehat_allergy_intolerance')->updateOrInsert(
                ['no_rkm_medis' => $noRkm, 'alergi_kode' => $alergiKode],
                [
                    'satusehat_id' => $allergyId,
                    'fhir_json' => json_encode($response['json']),
                    'status' => 'sent',
                    'sent_at' => now(),
                    'updated_at' => now()
                ]
            );
            return $response['json'];
        }
        
        return null;
    }
    
    private function buildAllergyResource($data, $patientId, $existingId = null)
    {
        // Map category
        $categoryMap = [
            'obat' => 'medication',
            'makanan' => 'food',
            'lingkungan' => 'environment'
        ];
        $category = $categoryMap[$data->kategori] ?? 'medication';
        
        // Map severity
        $severityMap = [
            'ringan' => 'mild',
            'sedang' => 'moderate',
            'berat' => 'severe',
            'fatal' => 'severe'
        ];
        $severity = $severityMap[$data->tingkat_keparahan] ?? 'moderate';
        
        // Map clinical status
        $statusMap = [
            'aktif' => 'active',
            'tidak_aktif' => 'inactive',
            'resolved' => 'resolved'
        ];
        $clinicalStatus = $statusMap[$data->status] ?? 'active';
        
        $resource = [
            'resourceType' => 'AllergyIntolerance',
            'identifier' => [[
                'system' => 'http://sys-ids.kemkes.go.id/allergy/' . $this->satusehatOrganizationId(),
                'value' => $data->no_rkm_medis . '-' . $data->alergi_kode
            ]],
            'clinicalStatus' => [
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
                    'code' => $clinicalStatus,
                    'display' => ucfirst($clinicalStatus)
                ]]
            ],
            'verificationStatus' => [
                'coding' => [[
                    'system' => 'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
                    'code' => 'confirmed',
                    'display' => 'Confirmed'
                ]]
            ],
            'category' => [$category],
            'criticality' => ($data->tingkat_keparahan === 'berat' || $data->tingkat_keparahan === 'fatal') ? 'high' : 'low',
            'code' => [
                'text' => $data->nama_alergi
            ],
            'patient' => [
                'reference' => 'Patient/' . $patientId
            ],
            'recordedDate' => $data->tgl_input
        ];
        
        // Add reaction if available
        if ($data->reaction_manifestation) {
            $resource['reaction'] = [[
                'manifestation' => [[
                    'text' => $data->reaction_manifestation
                ]],
                'severity' => $severity
            ]];
        }
        
        if ($existingId) {
            $resource['id'] = $existingId;
        }
        
        return $resource;
    }
}
```

### Step 3: Create Job `ProcessAllergyIntoleranceJob.php`

```php
namespace App\Jobs\SatuSehat;

class ProcessAllergyIntoleranceJob implements ShouldQueue
{
    protected $noRkm;
    protected $alergiKode;
    
    public function __construct($noRkm, $alergiKode)
    {
        $this->noRkm = $noRkm;
        $this->alergiKode = $alergiKode;
    }
    
    public function handle(AllergyIntoleranceService $service): void
    {
        $service->createAllergyIntolerance($this->noRkm, $this->alergiKode);
    }
}
```

### Step 4: Update Controller (Tempat Input Alergi)

Di controller yang handle input alergi pasien:

```php
// Setelah insert ke alergi_pasien berhasil
DB::commit();

// Dispatch job
\App\Jobs\SatuSehat\ProcessAllergyIntoleranceJob::dispatch(
    $noRkm,
    $alergiKode
)->afterResponse();
```

## 📊 Use Cases

### Use Case 1: Input Alergi Baru di Pendaftaran

**Scenario**: Petugas registrasi menanyakan riwayat alergi pasien  
**Flow**:
1. User input alergi di form pendaftaran
2. Save ke `alergi_pasien` (lokal)
3. Dispatch `ProcessAllergyIntoleranceJob`
4. Job kirim ke SATU SEHAT
5. Save response ID ke `satu_sehat_allergy_intolerance`

### Use Case 2: Update Alergi yang Sudah Resolved

**Scenario**: Dokter menandai alergi sudah sembuh  
**Flow**:
1. Update `alergi_pasien.status = 'resolved'`
2. Dispatch job dengan data updated
3. Job kirim PUT request ke SATU SEHAT (update `clinicalStatus`)

### Use Case 3: Retrieve Alergi dari SATU SEHAT

**Scenario**: Pasien pindah RS, perlu ambil data alergi dari SATU SEHAT  
**Flow**:
```php
// GET AllergyIntolerance?patient=Patient/{ihs_id}
$response = $service->satusehatRequest('GET', 'AllergyIntolerance', null, [
    'query' => ['patient' => 'Patient/' . $patientId]
]);

// Parse dan save ke lokal
```

## 🔍 Terminologi dan Kode

### KFA (Kode Farmasi Alat Kesehatan)
- **System**: `http://sys-ids.kemkes.go.id/kfa`
- Digunakan untuk obat-obatan
- Contoh: KFA untuk "Amoxicillin 500mg"

### SNOMED CT
- **System**: `http://snomed.info/sct`
- Digunakan untuk manifestasi reaksi
- Contoh: `247472004` = "Wheal" (bentol)

### Clinical Status Codes
- **System**: `http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical`
- Values: `active`, `inactive`, `resolved`

### Verification Status Codes
- **System**: `http://terminology.hl7.org/CodeSystem/allergyintolerance-verification`
- Values: `unconfirmed`, `confirmed`, `refuted`, `entered-in-error`

## ⚠️ Important Notes

1. **Tidak Boleh Delete**: AllergyIntolerance tidak boleh dihapus, hanya bisa di-update statusnya jadi `resolved` atau `refuted`

2. **Criticality vs Severity**:
   - **Criticality**: Potensi risiko (high/low) - level resource
   - **Severity**: Tingkat keparahan reaksi aktual (mild/moderate/severe) - level reaction

3. **Category bisa Multiple**: Satu alergi bisa punya multiple category, misal obat yang juga makanan

4. **Encounter Optional**: Jika alergi dicatat di luar konteks encounter (misal saat pendaftaran), field `encounter` bisa dikosongkan

5. **Recorder vs Asserter**:
   - **Recorder**: Yang mencatat/input data
   - **Asserter**: Yang menyatakan/confirm (biasanya pasien/keluarga)

## 📚 References

- [FHIR AllergyIntolerance Specification](http://hl7.org/fhir/R4/allergyintolerance.html)
- [SATU SEHAT API Catalog](https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/allergy-intolerance/)
- [KFA Terminology](http://sys-ids.kemkes.go.id/kfa)
- [SNOMED CT Browser](https://browser.ihtsdotools.org/)

## 🎯 Next Steps

1. ✅ Pelajari struktur FHIR AllergyIntolerance
2. 🔲 Create migration untuk tracking table
3. 🔲 Implement `AllergyIntoleranceService`
4. 🔲 Create Job untuk async processing
5. 🔲 Update UI form input alergi
6. 🔲 Testing dengan data real
7. 🔲 Create command untuk retry failed submissions
8. 🔲 Monitoring & logging
