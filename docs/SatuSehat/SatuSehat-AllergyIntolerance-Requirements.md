# Summary: AllergyIntolerance Implementation Requirements

**Date**: 2026-02-08  
**Status**: ✅ DOCUMENTED - Ready for Implementation  
**Reference**: `docs/SatuSehat-AllergyIntolerance.md`

## 📋 Syarat Pengambilan Data Alergi Intolerance

### 1. **Prerequisites (WAJIB)**

#### A. Patient IHS ID
- **Source**: Tabel `satusehat_patient_mapping`
- **Query**: 
  ```sql
  SELECT satusehat_id 
  FROM satusehat_patient_mapping 
  WHERE nik = ?
  ```
- **Action if not found**: Call `PatientService->findOrCreatePatient()` terlebih dahulu

#### B. Practitioner IHS ID (Recorder)
- **Source**: Tabel `satusehat_practitioner_mapping` (jika ada) atau search via API
- **Requirement**: NIK dokter/petugas yang mencatat alergi
- **Endpoint**: `GET /Practitioner?identifier={nik}`

#### C. Data Lokal Alergi
- **Tabel utama**: `alergi_pasien`
- **Fields minimal**:
  ```sql
  SELECT 
    ap.no_rkm_medis,
    ap.alergi_kode,
    ap.tgl_input,
    ap.keterangan,
    ap.tingkat_keparahan,  -- ringan/sedang/berat/fatal
    ap.status,              -- aktif/tidak_aktif/resolved
    ap.reaction_manifestation,
    da.nama_alergi,
    da.kategori             -- obat/makanan/lingkungan
  FROM alergi_pasien ap
  JOIN data_alergi da ON ap.alergi_kode = da.id
  WHERE ap.no_rkm_medis = ? AND ap.alergi_kode = ?
  ```

### 2. **Data Optional (Recommended)**

#### A. Encounter Reference
- Jika alergi dicatat saat encounter tertentu
- Ambil dari `satusehat_encounter.satusehat_id`
- **Manfaat**: Konteks kapan alergi ditemukan

#### B. KFA Code (Khusus Alergi Obat)
- **System**: `http://sys-ids.kemkes.go.id/kfa`
- **Source**: Tabel `databarang` atau `obat` (jika ada mapping)
- **Benefit**: Standardisasi kode obat nasional

#### C. SNOMED CT Code (Manifestasi Reaksi)
- **System**: `http://snomed.info/sct`
- **Example**: 
  - `247472004` = Wheal (bentol)
  - `418363000` = Pruritus (gatal)
  - `4386001` = Bronchospasm (sesak)
- **Benefit**: Terminologi internasional

### 3. **Validasi Data**

#### Must-Have Fields (FHIR)
```json
{
  "clinicalStatus": "required",      // active/inactive/resolved
  "verificationStatus": "required",  // confirmed/unconfirmed
  "category": "required (array)",    // [medication/food/environment]
  "code": {
    "text": "required"               // Nama substansi (minimal free text)
  },
  "patient": {
    "reference": "required"          // Patient/{ihs_id}
  },
  "recordedDate": "required"         // Tanggal dicatat
}
```

#### Nice-to-Have Fields
```json
{
  "encounter": "optional",           // Encounter/{ihs_id}
  "recorder": "recommended",         // Practitioner/{ihs_id}
  "criticality": "recommended",      // low/high
  "reaction": {
    "manifestation": "recommended",  // Gejala yang muncul
    "severity": "recommended"        // mild/moderate/severe
  }
}
```

## 🔄 Workflow Implementasi

### Step 1: Persiapan Database
```bash
php artisan make:migration create_satu_sehat_allergy_intolerance_table

# Buat tabel tracking untuk menyimpan ID SATU SEHAT
```

### Step 2: Create Service
```bash
# File: app/Services/SatuSehat/AllergyIntoleranceService.php
# Methods:
# - createAllergyIntolerance($noRkm, $alergiKode)
# - updateAllergyIntolerance($satusehatId, $data)
# - buildAllergyResource($data, $patientId)
```

### Step 3: Create Job (Async Processing)
```bash
# File: app/Jobs/SatuSehat/ProcessAllergyIntoleranceJob.php
# Dispatch: ->afterResponse() untuk non-blocking
```

### Step 4: Controller Integration
```php
// Di controller yang handle input alergi:
DB::commit(); // Simpan lokal dulu

// Kirim ke SATU SEHAT secara async
ProcessAllergyIntoleranceJob::dispatch($noRkm, $alergiKode)
    ->afterResponse();
```

## ⚠️ Important Notes

1. **Tidak Boleh Delete**: AllergyIntolerance sekali dibuat tidak boleh dihapus dari SATU SEHAT
   - Jika salah/tidak berlaku lagi, update `clinicalStatus` ke `resolved` atau `verificationStatus` ke `refuted`

2. **Category Bisa Multiple**: 
   ```json
   "category": ["medication", "food"]  // ✅ OK
   ```

3. **Criticality vs Severity**:
   - **Criticality** (resource level): Potensi risiko secara umum (high/low)
   - **Severity** (reaction level): Keparahan reaksi aktual yang pernah terjadi (mild/moderate/severe)

4. **Free Text Allowed**:
   - Jika tidak punya KFA/SNOMED code, minimal isi `code.text` dengan nama substansi
   - Contoh: `"code": { "text": "Udang" }`

## 📊 Mapping Reference

### Clinical Status
| Local DB Value | FHIR Code | Display |
|----------------|-----------|---------|
| aktif | active | Active |
| tidak_aktif | inactive | Inactive |
| resolved | resolved | Resolved |

### Verification Status
| Scenario | FHIR Code | Keterangan |
|----------|-----------|------------|
| Pasien yakin pernah alergi | confirmed | Sudah terkonfirmasi |
| Dicurigai tapi belum pasti | unconfirmed | Belum terkonfirmasi |
| Ternyata bukan alergi | refuted | Ditolak/dibantah |
| Salah input | entered-in-error | Kesalahan entry |

### Category
| Jenis Lokal | FHIR Code |
|-------------|-----------|
| obat | medication |
| makanan | food |
| lingkungan | environment |
| biologis/vaksin | biologic |

### Criticality (dari tingkat_keparahan)
| Local Value | FHIR Criticality |
|-------------|------------------|
| ringan | low |
| sedang | low |
| berat | high |
| fatal | high |

### Reaction Severity
| Local Value | FHIR Severity |
|-------------|---------------|
| ringan | mild |
| sedang | moderate |
| berat | severe |
| fatal | severe |

## ✅ Checklist Before Implementation

- [ ] Tabel `alergi_pasien` sudah ada dan terisi
- [ ] Tabel `data_alergi` (master alergi) sudah ada
- [ ] PatientService sudah implement dan jalan
- [ ] Practitioner mapping atau search method sudah ada
- [ ] Migration untuk tracking table sudah dibuat
- [ ] Service class AllergyIntoleranceService sudah dibuat
- [ ] Job class ProcessAllergyIntoleranceJob sudah dibuat
- [ ] Controller yang handle input alergi sudah diidentifikasi
- [ ] Testing dengan data sample (min 3 tipe: obat, makanan, lingkungan)
- [ ] Queue worker sudah jalan (jika pakai redis/database queue)

## 📚 Resources

- **Full Documentation**: `/docs/SatuSehat-AllergyIntolerance.md`
- **FHIR Spec**: http://hl7.org/fhir/R4/allergyintolerance.html
- **SATU SEHAT API**: https://satusehat.kemkes.go.id/platform/docs/id/api-catalogue/integrations/apis/allergy-intolerance/
- **KFA Browser**: http://sys-ids.kemkes.go.id/kfa (untuk kode obat)
- **SNOMED CT Browser**: https://browser.ihtsdotools.org/ (untuk kode manifestasi)

---

**Status Implementasi**: 🔲 NOT STARTED  
**Priority**: MEDIUM (setelah Observation untuk vital signs)  
**Estimated Time**: 4-6 hours (Service + Job + Testing)
