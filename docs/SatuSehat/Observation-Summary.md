# Summary: Observation - Vital Signs & Physical Examination

**Date**: 2026-02-08  
**Status**: ✅ DOCUMENTED - Ready for Implementation  
**Priority**: ⭐⭐⭐ HIGH  
**Reference**: `docs/SatuSehat/Observation-Implementation.md`

## 📋 Quick Summary

**Observation** adalah resource FHIR untuk mencatat semua pengukuran dan pengamatan klinis. Untuk aplikasi ini,fokus prioritas utama adalah **Vital Signs** (tanda vital).

## 🎯 Scope Implementasi

### Phase 1: Vital Signs (WAJIB)
- ✅ Tekanan Darah (Systolic/Diastolic)
- ✅ Nadi/Heart Rate
- ✅ Suhu Tubuh
- ✅ Pernapasan/Respiratory Rate
- ✅ Saturasi Oksigen (SpO2)

### Phase 2: Antropometri (Optional)
- Tinggi Badan
- Berat Badan  
- BMI (calculated)
- Lingkar Perut

## 📊 Data Requirements

### Tabel Database Lokal

**`pemeriksaan_ralan`** (Rawat Jalan):
```sql
- no_rawat VARCHAR(17)      -- PK
- tgl_perawatan DATE
- jam_rawat TIME
- suhu_tubuh DOUBLE         -- Celsius
- tensi VARCHAR(7)          -- "120/80"
- nadi SMALLINT            -- beats/min
- respirasi SMALLINT       -- breaths/min  
- spo2 DECIMAL(3,0)        -- percentage
- tinggi SMALLINT          -- cm
- berat DECIMAL(5,2)       -- kg
- nip VARCHAR(20)          -- Dokter/Perawat
```

### Prerequisites

1. **Patient IHS ID** (dari `satusehat_patient_mapping`)
2. **Encounter IHS ID** (dari `satusehat_encounter`)
3. **Practitioner IHS ID** (NIP dokter/perawat)
4. **Data Vital Signs** minimal 1 parameter terisi

## 🔧 LOINC Codes Mapping

| Vital Sign | LOINC Code | Local Field | Notes |
|------------|------------|-------------|-------|
| **Blood Pressure** | `85354-9` | `tensi` | Parse "120/80" |
| ├─ Systolic | `8480-6` | - | Angka pertama |
| └─ Diastolic | `8462-4` | - | Angka kedua |
| **Heart Rate** | `8867-4` | `nadi` | /min |
| **Respiratory Rate** | `9279-1` | `respirasi` | /min |
| **Body Temperature** | `8310-5` | `suhu_tubuh` | Celsius |
| **O2 Saturation** | `59408-5` | `spo2` | % |

## 📝 FHIR Structure (Simplified)

### Single Value Observation (Nadi, Suhu, Respirasi, SpO2)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [{"coding": [{"code": "vital-signs"}]}],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "8867-4",
      "display": "Heart rate"
    }]
  },
  "subject": {"reference": "Patient/{ihs_id}"},
  "encounter": {"reference": "Encounter/{ihs_id}"},
  "effectiveDateTime": "2026-02-08T10:30:00+07:00",
  "valueQuantity": {
    "value": 80,
    "unit": "beats/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}
```

### Multi-Component Observation (Tekanan Darah)

```json
{
  "resourceType": "Observation",
  "status": "final",
  "category": [{"coding": [{"code": "vital-signs"}]}],
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "85354-9",
      "display": "Blood pressure panel"
    }]
  },
  "subject": {"reference": "Patient/{ihs_id}"},
  "encounter": {"reference": "Encounter/{ihs_id}"},
  "effectiveDateTime": "2026-02-08T10:30:00+07:00",
  "component": [
    {
      "code": {"coding": [{"code": "8480-6", "display": "Systolic BP"}]},
      "valueQuantity": {"value": 120, "unit": "mmHg", "code": "mm[Hg]"}
    },
    {
      "code": {"coding": [{"code": "8462-4", "display": "Diastolic BP"}]},
      "valueQuantity": {"value": 80, "unit": "mmHg", "code": "mm[Hg]"}
    }
  ]
}
```

## 🚀 Implementation Steps

### 1. Migration
```bash
php artisan make:migration create_satu_sehat_observation_table
```

```php
Schema::create('satu_sehat_observation', function (Blueprint $table) {
    $table->id();
    $table->string('no_rawat', 17);
    $table->string('observation_type', 50);  // vital-signs, body-measurement
    $table->string('loinc_code', 20);
    $table->string('satusehat_id', 100)->nullable();
    $table->text('fhir_json')->nullable();
    $table->string('status', 20)->default('sent');
    $table->timestamp('sent_at')->nullable();
    $table->timestamps();
    
    $table->unique(['no_rawat', 'loinc_code']);
    $table->index('satusehat_id');
});
```

### 2. Service Class
```php
// app/Services/SatuSehat/ObservationService.php
public function sendVitalSigns($noRawat)
{
    $data = DB::table('pemeriksaan_ralan')
        ->where('no_rawat', $noRawat)
        ->first();
    
    // Build & send observations untuk setiap vital sign yang ada
    // - Blood Pressure (if tensi)
    // - Heart Rate (if nadi)
    // - Respiratory Rate (if respirasi)
    // - Temperature (if suhu_tubuh)
    // - SpO2 (if spo2)
}
```

### 3. Job Class
```php
// app/Jobs/SatuSehat/ProcessVitalSignsJob.php
class ProcessVitalSignsJob implements ShouldQueue
{
    public function handle(ObservationService $service)
    {
        $service->sendVitalSigns($this->noRawat);
    }
}
```

### 4. Controller Integration
```php
// Di controller setelah insert pemeriksaan_ralan
DB::commit();

ProcessVitalSignsJob::dispatch($noRawat)->afterResponse();
```

## ⚠️ Important Rules

### 1. Units of Measure (UCUM)
**System**: `http://unitsofmeasure.org`

| Measurement | UCUM Code | Display |
|-------------|-----------|---------|
| Blood Pressure | `mm[Hg]` | mmHg |
| Heart/Respiratory Rate | `/min` | per minute |
| Temperature | `Cel` | degree Celsius |
| Oxygen Saturation | `%` | percent |
| Height | `cm` | centimeter |
| Weight | `kg` | kilogram |

### 2. Status Values
- `final` - Hasil final (paling sering digunakan)
- `preliminary` - Hasil sementara
- `amended` - Sudah dikoreksi
- `cancelled` - Dibatalkan

### 3. Category (WAJIB untuk Vital Signs)
```json
{
  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
  "code": "vital-signs"
}
```

### 4. effectiveDateTime
Format: ISO 8601 dengan timezone
```
2026-02-08T10:30:00+07:00
```

Dari: `{tgl_perawatan}T{jam_rawat}+07:00`

## 🔍 Data Validation

### Before Sending:
```php
// Tekanan Darah
$bp = explode('/', $tensi);
if (count($bp) == 2) {
    $systolic = (int) trim($bp[0]);
    $diastolic = (int) trim($bp[1]);
    
    // Valid jika > 0
    if ($systolic > 0 && $diastolic > 0) {
        // Send
    }
}

// Nadi
if ($nadi && $nadi > 0 && $nadi < 300) {
    // Send
}

// Suhu
if ($suhu_tubuh && $suhu_tubuh > 30 && $suhu_tubuh < 45) {
    // Send (range normal manusia)
}

// Respirasi
if ($respirasi && $respirasi > 0 && $respirasi < 100) {
    // Send
}

// SpO2
if ($spo2 && $spo2 >= 0 && $spo2 <= 100) {
    // Send
}
```

## 📊 Use Cases

### Use Case 1: Simpan Vital Signs di Rawat Jalan
**Flow**:
1. Petugas input vital signs di form pemeriksaan
2. Save ke `pemeriksaan_ralan`
3. Dispatch `ProcessVitalSignsJob`
4. Job kirim 5 Observation resources ke SATU SEHAT (sesuai data yang terisi)
5. Save tracking ke `satu_sehat_observation`

### Use Case 2: Retrieve Vital Signs dari SATU SEHAT
**Query**:
```php
GET /Observation?patient=Patient/{ihs_id}&encounter=Encounter/{ihs_id}&category=vital-signs
```

## ✅ Testing Checklist

**Data Validation**:
- [ ] Tensi valid (120/80) → Send 1 BP Observation
- [ ] Tensi invalid (abc/def) → Skip
- [ ] Tensi kosong → Skip
- [ ] Nadi normal (60-100) → Send
- [ ] Nadi abnormal (200) → Send (tetap kirim, biar dokter analisis)
- [ ] Suhu normal (36-37) → Send
- [ ] SpO2 normal (95-100) → Send

**FHIR Structure**:
- [ ] LOINC code benar
- [ ] UCUM units benar
- [ ] Category = vital-signs
- [ ] Status = final
- [ ] Patient/Encounter reference valid

**Integration**:
- [ ] Job dispatch sukses
- [ ] API response 201 Created
- [ ] Tracking table terisi
- [ ] Data muncul di SATU SEHAT portal

## 📚 Quick Reference

**Systems**:
- LOINC: `http://loinc.org`
- UCUM: `http://unitsofmeasure.org`
- Category: `http://terminology.hl7.org/CodeSystem/observation-category`

**Tools**:
- LOINC Search: https://loinc.org/
- UCUM Validator: https://ucum.nlm.nih.gov/ucum-lhc/demo.html
- FHIR Validator: https://fhir.org/validator/

---

**Next Steps**:
1. ✅ Dokumentasi lengkap tersedia
2. 🔲 Create migration
3. 🔲 Implement ObservationService
4. 🔲 Create ProcessVitalSignsJob
5. 🔲 Integrate dengan controller pemeriksaan
6. 🔲 Testing dengan data real
7. 🔲 Monitoring & validation

**Estimated Time**: 6-8 hours  
**Dependencies**: Patient, Encounter, Practitioner sudah ada
