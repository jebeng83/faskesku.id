# Catatan Lanjutan Integrasi SATUSEHAT (Interoperabilitas)

> Dokumen ini melengkapi `SATUSEHAT_INTEGRATION_GUIDE.md` dan fokus ke **interoperabilitas**: bagaimana data dari RME Faskesku.id dipetakan ke resource FHIR SATUSEHAT, bagaimana alurnya di kode (service Laravel), dan bagaimana merencanakan integrasi lanjutan.

## 1. Tujuan Dokumen

- Menjadi referensi harian untuk developer saat:
  - Menambah resource baru ke SATUSEHAT.
  - Memperbaiki mapping data dari tabel RME lokal ke FHIR.
  - Menganalisa masalah integrasi (kenapa suatu data belum terkirim / invalid).
- Menghubungkan:
  - **Katalog ReST API** SATUSEHAT (Autentikasi, Prerequisites, Interoperabilitas).
  - **Panduan Interoperabilitas** (modul pelayananan & use‑case).
  - **Implementasi di aplikasi** (service di `app/Services/SatuSehat`, trait di `app/Traits/SatuSehatTraits.php`, queue/job, dsb).

---

## 2. Layer Integrasi di Aplikasi Ini

### 2.1. Lapisan utama

- **Traits**
  - `App\Traits\SatuSehatTraits`
    - Mengurus:
      - OAuth2 token (`satusehatToken()`)
      - HTTP client ke endpoint SATUSEHAT (`satusehatRequest()`)
      - Konfigurasi base URL (`satusehatAuthBase()`, `satusehatFhirBase()`)
      - Organization ID default (`satusehatOrganizationId()`)

- **Services**
  - `App\Services\SatuSehat\PatientService`
  - `App\Services\SatuSehat\EncounterService`
  - `App\Services\SatuSehat\ConditionService`
  - `App\Services\SatuSehat\ObservationService`
  - `App\Services\SatuSehat\AllergyIntoleranceService`
  - `App\Services\SatuSehat\AllergyMappingService`

  Masing‑masing service bertanggung jawab:
  - Mengambil data dari tabel RME (mis. `reg_periksa`, `pasien`, `dokter`, TTV, dsb).
  - Build resource FHIR (array asosiatif) via helper di trait atau method internal.
  - Mengirim ke SATUSEHAT via `satusehatRequest()`.
  - Menyimpan tracking (ID resource, status, payload, response) ke tabel audit/tracking.

- **Jobs / Queue**
  - Lihat `App\Jobs\SatuSehat\*` (jika ada) untuk proses asinkron.

### 2.2. Alur umum per resource

1. **Trigger di RME** (mis. pendaftaran, input diagnosis, input TTV, resume, resep).
2. Panggil **Service SATUSEHAT** yang relevan:
   - Contoh Encounter:
     - `EncounterService::createEncounter($noRawat, $sendToSatuSehat = true)`
3. Service:
   - Query data dari DB lokal.
   - Melakukan mapping nilai → code FHIR/terminologi.
   - Build payload FHIR.
   - `satusehatRequest('POST', '{Resource}', $payload)`.
   - Simpan hasil (ID, status) ke tracking table.

---

## 3. Prerequisites – Mapping Data dari RME

### 3.1. Organization

**Tujuan**  
Mewakili fasilitas (RS/Klinik/Puskesmas) di SATUSEHAT. ID ini direferensikan oleh Encounter, Patient, Location, dll.

**Sumber data di RME**  
Tabel tipikal (disesuaikan dengan schema lokal, contoh):

- `setting_rs` / `identitas_rumah_sakit`:
  - `nama_rumah_sakit` → `Organization.name`
  - `kode_rumah_sakit` (IHS / kode Kemenkes) → `Organization.identifier`
  - `alamat`, `kota`, `provinsi`, `kode_pos` → `Organization.address`
  - `telepon`, `email` → `Organization.telecom`

**Implementasi di aplikasi**

- Biasanya dimasukkan via:
  - `.env` → `SATUSEHAT_ORG_ID`
  - Helper: `satusehatOrganizationId()` di `SatuSehatTraits`.

**Catatan teknis**

- Hanya 1 Organization yang dipakai sebagai **serviceProvider** default.
- Jika multi‑fasyankes dalam 1 instance aplikasi, perlu mekanisme `org_id` per tenant.

---

### 3.2. Location

**Tujuan**  
Mewakili ruang/poli/bangsal. Encounter akan menunjuk Location tempat pelayanan terjadi.

**Sumber data di RME**

- `poliklinik`:
  - `kd_poli` → `Location.identifier` (kode lokal)
  - `nm_poli` → `Location.name`
  - Jenis poli (IGD/Rawat Jalan/Rawat Inap) → `Location.type` / `Location.description`

- `bangsal` / `kamar` (untuk rawat inap):
  - `kd_bangsal`, `nm_bangsal`, `lantai` → `Location.identifier`, `Location.name`, `Location.description`

**Implementasi di aplikasi**

- Ada helper di traits/service:
  - `getLocationId($kdPoli)` di `EncounterService`:
    - Mapping `kd_poli` lokal → `Location.id` SATUSEHAT (disimpan di tabel mapping internal, mis. `satusehat_location_mapping`).

**Poin penting**

- Pastikan semua `kd_poli` yang dipakai di RME sudah punya mapping ke Location SATUSEHAT sebelum mengirim Encounter.

---

### 3.3. Practitioner

**Tujuan**  
Representasi tenaga kesehatan (dokter/perawat/bidan).

**Sumber data di RME**

- `dokter`, `pegawai`:
  - `kd_dokter`, `nm_dokter` → nama lokal (untuk log dan fallback).
  - `no_ktp` / `nik` → **kunci utama** identifikasi ke SATUSEHAT.
  - Spesialis: bisa dari `spesialis.dokter`.

**Contoh di EncounterService**

```php
// app/Services/SatuSehat/EncounterService.php
// ...
$regPeriksa = DB::table('reg_periksa as rp')
    ->join('pasien as p', 'rp.no_rkm_medis', '=', 'p.no_rkm_medis')
    ->join('dokter as d', 'rp.kd_dokter', '=', 'd.kd_dokter')
    ->join('poliklinik as pl', 'rp.kd_poli', '=', 'pl.kd_poli')
    ->leftJoin('pegawai as pg', 'd.kd_dokter', '=', 'pg.nik')
    // ...

// Get Practitioner ID
if ($regPeriksa->nik_dokter && strlen($regPeriksa->nik_dokter) === 16) {
    $practitioner = $this->getPractitionerByNik($regPeriksa->nik_dokter);
    $practitionerId = $practitioner['id'] ?? null;
}
```

**Catatan teknis**

- `getPractitionerByNik()` biasanya:
  - Panggil FHIR `Practitioner?identifier={nik}`.
  - Jika tidak ada → tergantung kebijakan: create atau laporkan error.
- Simpan mapping `nik` → `Practitioner.id` di tabel lokal untuk mempercepat.

---

### 3.4. Patient

**Tujuan**  
Sinkronisasi pasien lokal (RM) dengan SATUSEHAT.

**Sumber data di RME**

- `pasien`:
  - `no_rkm_medis` → identifier lokal.
  - `no_ktp` → NIK (utama).
  - `nm_pasien`, `tgl_lahir`, `jk` → `Patient.name`, `birthDate`, `gender`.
  - `alamat`, `kecamatan`, `kabupaten`, `provinsi` → `Patient.address`.
  - `no_tlp` → `telecom`.

**Implementasi (contoh pola)**

- `PatientService::findOrCreatePatient($nik)`:
  - Cek apakah sudah ada mapping lokal `nik → patient_id`.
  - Jika belum:
    - Cek ke SATUSEHAT `Patient?identifier={nik}`.
    - Jika tidak ada atau perlu create → build resource dari `pasien` dan POST.
  - Return `{ id, resource }`.

**Poin penting**

- Jaga konsistensi antara:
  - NIK di `pasien`.
  - Data yang dikirim ke SATUSEHAT.
- Hindari buat patient baru jika sudah ada (duplikasi di MPI).

---

## 4. Resource Interoperabilitas – Per Resource (Mapping dari Faskesku.id)

Bagian ini fokus ke resource utama dan bagaimana mereka mengambil data dari RME aplikasi ini.

### 4.1. Encounter

**Peran**  
Kunjungan/episode pelayanan (Ralan, Ranap, IGD).

**Service utama**

- `App\Services\SatuSehat\EncounterService::createEncounter($noRawat, $sendToSatuSehat = true)`

**Referensi resmi**

- https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/encounter/

**Catatan mandatory (katalog SATUSEHAT)**

- `Encounter.identifier[i].system` mengikuti format: `http://sys-ids.kemkes.go.id/encounter/{organization-ihs-number}`.
- Untuk histori status, terdapat 3 status yang wajib dikirimkan: `arrived`, `in-progress`, `finished` dan masing-masing item wajib memiliki `statusHistory.period.start` dan `statusHistory.period.end`.
- Format waktu yang digunakan oleh SATUSEHAT adalah UTC `+00` (contoh WIB perlu dikonversi menjadi UTC dengan mengurangi 7 jam).

**Catatan implementasi di aplikasi ini**

- `EncounterService::buildEncounterResource()` sudah mengisi `identifier.system` dan `identifier.value` (`no_rawat`), namun belum mengisi `identifier.use` (`official`).
- Payload Encounter awal saat `POST` masih minimal: `statusHistory` baru berisi `arrived` dan `period.start`, serta belum mengirim `period.end` dan 3 status wajib pada `statusHistory`.
- Proses “closing” Encounter dilakukan melalui endpoint `PUT /api/satusehat/rajal/encounter/by-rawat/{no_rawat}` (`updateEncounterByRawat`) yang akan menyetel `status=finished`, mengisi `period.end`, dan membentuk baseline `statusHistory` 3 status.
- Implementasi waktu saat ini mengirim offset timezone (contoh `+07:00`) mengikuti nilai yang dibangun oleh aplikasi; bila terjadi penolakan validasi waktu dari SATUSEHAT, sesuaikan pengiriman timestamp ke UTC `+00`.

**Data yang diambil dari RME**

- Tabel utama: `reg_periksa` (alias `rp`)
  - `no_rawat` → `Encounter.identifier`
  - `no_rkm_medis` → link ke `pasien`.
  - `kd_poli` → mapping ke Location.
  - `kd_dokter` → join ke `dokter`/`pegawai` untuk NIK dokter.
  - Tanggal masuk/keluar (jam registrasi, jam pulang) → `period.start`, `period.end`.
  - Jenis pembayaran, jenis kunjungan (baru/lama), cara masuk (rujukan/dateng sendiri) → category / extension (disesuaikan dengan panduan).

- Join:
  - `pasien as p` → `p.no_ktp` (`nik_pasien`).
  - `dokter as d` + `pegawai as pg` → `nik_dokter`.
  - `poliklinik as pl` → `nm_poli`.

**Alur build resource (ringkas)**

1. Tarik data `reg_periksa` + join terkait.
2. Panggil `PatientService::findOrCreatePatient(nik_pasien)` → `patientId`.
3. Panggil `getPractitionerByNik(nik_dokter)` → `practitionerId`.
4. Panggil `getLocationId(kd_poli)` → `locationId`.
5. Isi:
   - `Encounter.subject` → `Patient/{patientId}`
   - `Encounter.participant.individual` → `Practitioner/{practitionerId}`
   - `Encounter.location.location` → `Location/{locationId}`
   - `Encounter.serviceProvider` → `Organization/{orgId}`
6. Kirim `POST Encounter` dan simpan hasil ke tracking table.

---

### 4.2. Condition (Diagnosa)

**Peran**  
Diagnosis utama, komorbid, komplikasi, dsb.

**Service (kemungkinan)**

- `App\Services\SatuSehat\ConditionService`

**Data yang diambil dari RME**

- Tabel diagnosis, misalnya `diagnosa_pasien`:
  - `no_rawat` → link ke Encounter.
  - `kd_penyakit` (ICD‑10) → `Condition.code.coding`.
  - `prioritas` (utama/sekunder) → `category`.
  - Tanggal diagnosis → `onsetDateTime` / `recordedDate`.
  - Dokter → join ke `dokter`/`pegawai` untuk `asserter`.

**Alur umum**

1. Untuk setiap row di `diagnosa_pasien` dengan `no_rawat` tertentu:
   - Ambil `Encounter` terkait (dari tracking atau local mapping).
   - Build `Condition`:
     - `subject` → Patient.
     - `encounter` → Encounter.
     - `code` → ICD‑10.
     - `category` (utama/sekunder).
2. Kirim ke SATUSEHAT.

---

### 4.3. Observation (TTV & pemeriksaan fisik)

**Peran**  
Tanda vital (TTV), antropometri, skor klinis, hasil pemeriksaan sederhana.

**Service**

- `App\Services\SatuSehat\ObservationService`

**Data dari RME**

- Tabel TTV / asesmen, misalnya `pemeriksaan_ralan`, `pemeriksaan_ranap`:
  - `no_rawat` → link Encounter.
  - `Tensi`, `Nadi`, `RR`, `Suhu`, `SpO2` → masing‑masing Observation terpisah, atau satu Observation dengan beberapa component (sesuai implementasi).
  - `TB`, `BB` → Observation antropometri.
  - Waktu catat → `effectiveDateTime`.
  - Petugas → join ke `petugas` / `pegawai`.

**Alur umum**

1. Tarik semua TTV untuk `no_rawat` tertentu.
2. Mapping:
   - Setiap jenis TTV → `Observation.code` LOINC/kode SATUSEHAT.
   - Nilai → `valueQuantity` (+unit).
3. `subject` → Patient, `encounter` → Encounter.

**Catatan implementasi (dari `CpptSoap.jsx` → `ObservationService::sendVitalSigns`)**

- Frontend: `resources/js/Pages/RawatJalan/components/CpptSoap.jsx`
  - Saat submit pemeriksaan (`handleSubmit`), form mengirim **11 field utama** terkait TTV & assesmen:
    - Vital numerik: `suhu_tubuh`, `tensi`, `nadi`, `respirasi`, `spo2`, `tinggi`, `berat`, `lingkar_perut`, `gcs`.
    - Teks assesmen: `keluhan`, `pemeriksaan`, `penilaian`, `rtl`, `instruksi`, `evaluasi`.
  - Sebelum dikirim, kode sekarang melakukan normalisasi:
    - Untuk `vitalKeys = ['suhu_tubuh','tensi','nadi','respirasi','spo2','tinggi','berat','gcs','lingkar_perut']`  
      nilai kosong diisi string `"N/A"`.
    - Untuk `textAreaKeys = ['keluhan','pemeriksaan','penilaian','rtl','instruksi','evaluasi']`  
      nilai kosong diisi `"-"`.
  - Payload dikirim ke route:
    - `POST rawat-jalan.pemeriksaan-ralan.store` (create)
    - `PUT rawat-jalan.pemeriksaan-ralan.update` (update)

- Backend: `App\Services\SatuSehat\ObservationService::sendVitalSigns($noRawat, $tglPerawatan, $jamRawat)`
  - Mengambil data dari `pemeriksaan_ralan` untuk kombinasi (`no_rawat`,`tgl_perawatan`,`jam_rawat`).
  - Mengirim beberapa Observation terpisah:
    - Tekanan darah (`tensi` → `sendBloodPressure`) – format `"120/80"`.
    - Nadi (`nadi` → `sendHeartRate`).
    - Respirasi (`respirasi` → `sendRespiratoryRate`).
    - Suhu tubuh (`suhu_tubuh` → `sendBodyTemperature`).
    - SpO2 (`spo2` → `sendOxygenSaturation`).
    - Tinggi badan (`tinggi` → `sendHeight`).
    - Berat badan (`berat` → `sendWeight`).
    - Lingkar perut (`lingkar_perut` → `sendAbdominalCircumference`).
    - GCS (`gcs` → `sendGCS`).
    - Keluhan utama (`keluhan` → `sendChiefComplaint` – Observation berbasis teks).
  - Setiap fungsi `sendX` mengharapkan:
    - Field numerik berisi **angka valid** (bukan string bebas).
    - Jika nilai tidak valid (`<= 0` atau parsing gagal), fungsi akan mengembalikan error dan **tidak** membuat Observation.

**Analisa masalah: kenapa baru tensi yang terkirim**

- Dari sisi UI `CpptSoap.jsx`:
  - Field vital yang kosong di‑isi `"N/A"` sebelum disimpan.
  - Nilai `"N/A"` ini kemudian tersimpan di kolom numerik tabel `pemeriksaan_ralan`.
- Dari sisi `ObservationService`:
  - `sendVitalSigns` hanya memeriksa `if ($pemeriksaan->nadi)` dst., lalu mem‑cast ke `float`/`int` dan cek `> 0`.
  - Untuk teks `"N/A"`:
    - `if ($pemeriksaan->nadi)` bernilai **true** (string non‑kosong).
    - Saat dikonversi ke angka, hasilnya tidak valid (umumnya jadi `0`), sehingga cek `> 0` gagal → Observation **tidak dikirim**.
  - Untuk tensi:
    - Format `"120/80"` bisa di‑`explode('/')` dan dimapping ke sistolik/diastolik, sehingga masih lolos validasi.
- Akibatnya di SATUSEHAT:
  - **Hanya tekanan darah** yang benar‑benar terkirim.
  - TTV lain (nadi, RR, suhu, SpO2, tinggi, berat, lingkar perut, GCS) **tidak pernah menghasilkan Observation valid** bila diisi `"N/A"` di DB.

**Rekomendasi perbaikan (supaya 11 parameter terkirim otomatis)**

1. **Perbaiki normalisasi di frontend (`CpptSoap.jsx`)**
   - Jangan simpan `"N/A"` ke kolom yang akan dipakai untuk Observations numerik.
   - Opsi yang lebih aman:
     - Untuk `vitalKeys`:
       - Biarkan kosong (`''`/`null`) jika user tidak mengisi.
       - Jika butuh tampilan `"N/A"` di UI, render di level komponen saja, **jangan** disimpan ke DB.
     - Untuk textarea (keluhan, pemeriksaan, penilaian, rtl, instruksi, evaluasi):
       - Tetap boleh pakai `"-"` karena ini murni teks & tidak dikonversi ke angka.

2. **Tambahkan sanitasi di backend (controller penyimpan `pemeriksaan_ralan`)**
   - Saat menerima payload dari `CpptSoap`, sebelum insert/update ke `pemeriksaan_ralan`:
     - Jika nilai vital = `"N/A"` atau string non‑numerik lainnya:
       - Konversi ke `null` / kosong.
   - Dengan demikian:
     - `sendVitalSigns` hanya dipanggil untuk field yang benar‑benar diisi angka.
     - Observations yang dikirim ke SATUSEHAT akan valid.

3. **Opsional: perketat log dan monitoring**
   - Tambahkan log detail di `ObservationService` untuk setiap field yang gagal dikirim (mis. `"nilai tidak valid: {raw}"`).
   - Buat endpoint / halaman debug di aplikasi untuk melihat:
     - Hasil `sendVitalSigns` per `no_rawat` (`success`/`failed` per parameter).

Dengan perubahan di atas, alurnya menjadi:

- User isi TTV di `CpptSoap` → nilai numerik disimpan apa adanya (tanpa `"N/A"`).
- Setelah pemeriksaan tersimpan, backend memanggil `sendVitalSigns(no_rawat, tgl_perawatan, jam_rawat)`:
  - Untuk setiap field vital yang terisi angka:
    - Dibangun Observation sesuai LOINC (height, weight, spo2, dsb).
    - Dikirim otomatis ke SATUSEHAT.
- Hasil akhirnya: **semua TTV yang diisi di CPPT (hingga 10+ parameter) bisa terkirim sebagai Observations**, bukan hanya tekanan darah.

---

### 4.4. AllergyIntolerance

**Peran**  
Mencatat alergi pasien.

**Service**

- `App\Services\SatuSehat\AllergyIntoleranceService`
- `App\Services\SatuSehat\AllergyMappingService` (mapping terminologi lokal ↔ SATUSEHAT).

**Data dari RME**

- Tabel alergi, misalnya `master_alergi_pasien`:
  - `no_rkm_medis` / `no_rawat` → link ke pasien/Encounter.
  - Jenis alergi (obat, makanan, lainnya) → `category`, `code`.
  - Nama item (mis. “Amoksisilin”) → di‑mapping ke terminologi standar.
  - Reaksi & tingkat keparahan → `reaction.manifestation`, `criticality`.

**Implementasi lanjutan**

- Gunakan `AllergyMappingService` untuk:
  - Menyimpan mapping antara nama lokal ↔ kode SATUSEHAT (SNOMED, dsb).
  - Menambah UI untuk admin mapping alergi jika belum dikenali.

---

### 4.5. Procedure (Tindakan)

**Peran**  
Mencatat tindakan/prosedur klinis yang dilakukan pada pasien, dan mengaitkannya ke `Encounter` (kunjungan) serta `Patient`.

**Endpoint yang tersedia (FHIR R4 – SATUSEHAT)**

1) **Pencarian Procedure**
- `GET {FHIR_BASE}/Procedure?subject={patientId}`
- `GET {FHIR_BASE}/Procedure?encounter={encounterId}`
- `GET {FHIR_BASE}/Procedure?subject={patientId}&encounter={encounterId}`

Header wajib:
- `Authorization: Bearer <access_token>`

Response sukses: `Bundle` (`type: searchset`) berisi `entry[].resource`.

2) **Detail Procedure**
- `GET {FHIR_BASE}/Procedure/{id}`

Header wajib:
- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

Response sukses: resource `Procedure`.

3) **Tambah Procedure**
- `POST {FHIR_BASE}/Procedure`

Header wajib:
- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

Body: payload resource `Procedure` sesuai standar FHIR (mengacu Panduan Interoperabilitas per modul/use-case).
Response sukses: mengembalikan resource `Procedure` termasuk `id` (UUID). Nilai `id` ini perlu disimpan untuk operasi lanjutan.

4) **Update penuh Procedure**
- `PUT {FHIR_BASE}/Procedure/{id}`

Header wajib:
- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

5) **Update sebagian (patch) Procedure**
- `PATCH {FHIR_BASE}/Procedure/{id}`

Header wajib:
- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

Body: JSON Patch dengan operasi yang didukung `replace`.
Contoh format:

```json
[
  { "op": "replace", "path": "/language", "value": "id" }
]
```

**Kebutuhan data minimal untuk implementasi di aplikasi**

- `Procedure.subject` → `Patient/{patientId}`
- `Procedure.encounter` → `Encounter/{encounterId}`
- `Procedure.status` → status prosedur (mengacu panduan; umumnya `completed` ketika tindakan sudah dilakukan)
- `Procedure.code` → kode tindakan (mengacu terminologi yang diwajibkan pada Panduan Interoperabilitas)
- Waktu tindakan → biasanya di `performedDateTime` / `performedPeriod`
- Pelaksana tindakan → `performer.actor` (Practitioner/PractitionerRole) bila tersedia

**Tabel sumber & tabel mapping (dipakai di aplikasi ini)**

1) **`prosedur_pasien` (sumber tindakan/prosedur pasien)**
- Tujuan: daftar prosedur yang dilakukan pada kunjungan.
- Kolom:
  - `no_rawat` (varchar(17))
  - `kode` (varchar(8))
  - `status` (enum: `Ralan`|`Ranap`)
  - `prioritas` (tinyint)
- Primary key: (`no_rawat`, `kode`, `status`)
- Foreign key:
  - `no_rawat` → `reg_periksa.no_rawat` (cascade)
  - `kode` → `icd9.kode` (cascade)

2) **`satu_sehat_procedure` (mapping lokal ↔ SATUSEHAT Procedure)**
- Tujuan: menyimpan `id_procedure` (UUID SATUSEHAT) untuk tiap baris prosedur lokal.
- Kolom:
  - `no_rawat` (varchar(17))
  - `kode` (varchar(10))
  - `status` (enum: `Ralan`|`Ranap`)
  - `id_procedure` (varchar(40), nullable)
- Primary key: (`no_rawat`, `kode`, `status`)
- Foreign key:
  - `no_rawat` → `reg_periksa.no_rawat` (cascade)
  - `kode` → `icd9.kode` (restrict)

Catatan: secara skema, `prosedur_pasien.kode` mengacu ke tabel `icd9`. Namun pada implementasi klinik/puskesmas yang tidak menggunakan ICD9, tetapkan default/fallback kode **`89.06` (Limited Consultation)** untuk:
- Nilai `prosedur_pasien.kode` saat tidak ada kode prosedur yang valid dari sumber.
- `Procedure.code` di payload SATUSEHAT saat tidak ada mapping kode lokal.

**Strategi implementasi (agar idempotent dan bisa diaudit)**

1) **Tambahkan service baru**
- `App\Services\SatuSehat\ProcedureService`
  - `sendProceduresForEncounter($noRawat)`
  - `createProcedure(array $payload, array $options = [])`
  - `searchProcedure(array $query)` (untuk troubleshooting dan rekonsiliasi)

2) **Idempotensi (hindari duplikasi Procedure di SATUSEHAT)**
- Saat mengirim dari `prosedur_pasien`, lakukan lookup ke `satu_sehat_procedure` berdasarkan:
  - (`no_rawat`, `kode`, `status`)
  - Jika `id_procedure` sudah terisi → jangan POST lagi.
- Jika `id_procedure` kosong/belum ada baris mapping:
  - lakukan POST `Procedure`
  - simpan `id` response ke `satu_sehat_procedure.id_procedure` (updateOrInsert).

Catatan: SATUSEHAT menyediakan pencarian berbasis `subject`/`encounter`, namun itu tidak cukup untuk memastikan satu baris tindakan lokal = satu resource Procedure (karena bisa banyak tindakan dalam satu Encounter). Karena itu, mapping lokal tetap diperlukan.

3) **Pencatatan (audit trail)**
- Aplikasi ini sudah memiliki auto-log resource POST/PUT/PATCH ke tabel `satusehat_resources` melalui `SatuSehatTraits::satusehatRequest()`.
- Untuk Procedure, pastikan payload memiliki `identifier.value` yang stabil (mis. gabungan `no_rawat` + `kode` + `status`) atau kirim `local_id` via opsi request, agar kolom `local_id` di log mudah ditelusuri.

4) **Kapan dikirim**
- Rekomendasi baseline untuk RAJAL:
  - Kirim Procedure setelah Encounter berhasil dibuat dan ID Encounter tersimpan.
  - Trigger yang paling aman: saat tindakan tersimpan (insert/update) atau saat pipeline “Resume Medis Rawat Jalan” dijalankan.

5) **Rekonsiliasi & debugging**
- Untuk investigasi cepat (tanpa perubahan data), gunakan:
  - `GET Procedure?encounter={encounterId}` untuk melihat semua Procedure yang sudah ada pada kunjungan.
  - `GET Procedure/{id}` untuk memeriksa payload resource yang tersimpan.

---

### 4.6. MedicationRequest (Resep Obat)

**Peran**  
Mencatat peresepan obat pada suatu `Encounter` (kunjungan) untuk seorang `Patient`. Pada implementasi yang umum di RME, **setiap item obat** (baris di detail resep) dikirim sebagai **1 resource MedicationRequest**.

**Referensi resmi**

- https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication-request/

**Endpoint yang tersedia (FHIR R4 – SATUSEHAT)**

1) **Pencarian MedicationRequest**
- `GET {FHIR_BASE}/MedicationRequest?subject=Patient/{patientId}`
- `GET {FHIR_BASE}/MedicationRequest?encounter=Encounter/{encounterId}`

2) **Detail MedicationRequest**
- `GET {FHIR_BASE}/MedicationRequest/{id}`

3) **Tambah MedicationRequest**
- `POST {FHIR_BASE}/MedicationRequest`

4) **Update penuh MedicationRequest**
- `PUT {FHIR_BASE}/MedicationRequest/{id}`

5) **Update sebagian (patch) MedicationRequest**
- `PATCH {FHIR_BASE}/MedicationRequest/{id}`

Header wajib:
- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

**Kebutuhan data minimal untuk implementasi di aplikasi**

- `MedicationRequest.status` → mis. `active` (resep masih berlaku) / `completed` (jika sudah ditutup sesuai use-case)
- `MedicationRequest.intent` → umumnya `order`
- `MedicationRequest.subject` → `Patient/{patientId}`
- `MedicationRequest.encounter` → `Encounter/{encounterId}`
- `MedicationRequest.authoredOn` → gabungan `tgl_peresepan` + `jam_peresepan`
- `MedicationRequest.requester` → `Practitioner/{practitionerId}` (dari `resep_obat.kd_dokter` → NIK dokter)
- `MedicationRequest.medicationReference` → `Medication/{medicationId}` (hasil mapping obat lokal → SATUSEHAT)
- `MedicationRequest.dosageInstruction[]` → aturan pakai dari RME

**Catatan penting: dosageInstruction (aturan pakai)**

Sesuai dokumentasi SATUSEHAT, `MedicationRequest.dosageInstruction[]` menggunakan tipe data `Dosage` dan mendukung komponen-komponen berikut (ringkasan yang sering dipakai):

- `dosageInstruction[i].sequence` (integer) → urutan paket aturan pakai
- `dosageInstruction[i].text` (string) → aturan pakai naratif (contoh: “3 x sehari 1 tablet sesudah makan”)
- `dosageInstruction[i].patientInstruction` (string) → instruksi berorientasi pasien
- `dosageInstruction[i].additionalInstruction[]` (CodeableConcept) → instruksi tambahan (SNOMED CT)
- `dosageInstruction[i].timing.event` (dateTime) → waktu spesifik kejadian
- `dosageInstruction[i].timing.repeat` → pola pengulangan, mis.:
  - `frequency` (positiveInt), `period` (decimal), `periodUnit` (code UCUM, contoh `d`)
  - `dayOfWeek` (DaysOfWeek), `timeOfDay` (time), `when` (event timing), `offset` (unsignedInt)
- `dosageInstruction[i].timing.code.coding[]` → aturan timing terkode (GTSAbbreviation)
- `dosageInstruction[i].route` (CodeableConcept) → rute pemberian (terminologi sesuai panduan)
- `dosageInstruction[i].method` (CodeableConcept) → teknik pemberian (SNOMED CT)
- `dosageInstruction[i].doseAndRate[].doseQuantity` (SimpleQuantity) → jumlah per dosis (unit dapat mengacu UCUM / OrderableDrugForm / SNOMED CT)

Jika RME belum punya data terstruktur (frekuensi, route, dose unit), baseline yang aman:

- Isi `dosageInstruction[0].sequence = 1`
- Isi `dosageInstruction[0].text = resep_dokter.aturan_pakai` (apa adanya)

**Data dari RME (tabel sumber)**

1) **`resep_obat` (header resep)**
- Tujuan: metadata resep per kunjungan.
- Kolom utama yang dipakai di aplikasi:
  - `no_resep` (PK logis, string)
  - `no_rawat` (varchar(17))
  - `kd_dokter` (kode dokter)
  - `tgl_peresepan`, `jam_peresepan`
  - `status` (mis. `ralan`/`ranap`)
  - `tgl_penyerahan`, `jam_penyerahan` (bila ada)

2) **`resep_dokter` (detail item obat per resep)**
- Tujuan: daftar item obat yang diresepkan.
- Kolom utama yang dipakai di aplikasi:
  - `no_resep` (FK logis ke `resep_obat.no_resep`)
  - `kode_brng` (FK logis ke `databarang.kode_brng`)
  - `jml` (jumlah)
  - `aturan_pakai` (string)

Strategi mapping ke resource:

- 1 baris `resep_dokter` → 1 `MedicationRequest`
- `identifier.value` direkomendasikan stabil per item, contoh: `{no_resep}:{kode_brng}`

**Penyimpanan response SATUSEHAT (idempotensi)**

Aplikasi menyimpan hasil `id` dari response SATUSEHAT ke tabel mapping berikut agar tidak mengirim duplikat:

1) **`satu_sehat_medicationrequest` (mapping lokal ↔ SATUSEHAT MedicationRequest)**
- Kolom:
  - `no_resep` (varchar(14))
  - `kode_brng` (varchar(15))
  - `id_medicationrequest` (varchar(40), nullable)
- Primary key: (`no_resep`, `kode_brng`)
- Foreign key:
  - `no_resep` → `resep_obat.no_resep` (cascade)
  - `kode_brng` → `databarang.kode_brng` (restrict)

Aturan simpan:

- Setelah `POST MedicationRequest` sukses dan response mengandung `id`, simpan ke `satu_sehat_medicationrequest.id_medicationrequest`.
- Saat akan mengirim ulang, lakukan lookup PK (`no_resep`, `kode_brng`):
  - Jika `id_medicationrequest` sudah ada → jangan `POST` lagi.
  - Jika belum ada → `POST` dan update mapping.

---

### 4.7. MedicationDispense (Penyerahan/Dispensing Obat)

**Peran**  
Mencatat kejadian **obat diserahkan/di-dispense** pada seorang pasien. Secara praktik RME, `MedicationRequest` mewakili *permintaan/resep*, sedangkan `MedicationDispense` mewakili *eksekusi penyerahan* (seringnya oleh unit farmasi/depo).

**Referensi resmi**

- https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/medication-dispense/

**Kapan dikirim di aplikasi ini**

- Trigger paling aman: saat event **penyerahan obat** berhasil (stok sudah dipotong dan detail penyerahan tersimpan).
- Di codebase saat ini, kandidat sumber data utama adalah insert ke `detail_pemberian_obat` pada flow penyerahan.

**Relasi dengan MedicationRequest (penting)**

- Idealnya `MedicationDispense.authorizingPrescription[]` mengacu ke `MedicationRequest/{id}` (hasil mapping dari `satu_sehat_medicationrequest`).
- Dampak arsitektural:
  - Pipeline “resep → kirim MedicationRequest” sebaiknya jalan terlebih dahulu.
  - “penyerahan → kirim MedicationDispense” melakukan lookup `id_medicationrequest` agar linkage lengkap.
  - Jika `id_medicationrequest` belum ada, pilihan aman:
    - tetap kirim `MedicationDispense` tanpa `authorizingPrescription` (baseline), atau
    - tunda pengiriman sampai mapping `MedicationRequest` tersedia.

**Catatan penting: dosageInstruction**

Sesuai panduan SATUSEHAT, `MedicationDispense.dosageInstruction[i].sequence` bertipe integer:

- Jika aturan pakai konsisten dari awal sampai akhir → cukup 1 paket, `sequence = 1`.
- Jika ada perubahan aturan pakai (contoh tapering-down) → tulis lebih dari 1 paket (`sequence = 1`, lalu `sequence = 2`, dst.).

Baseline yang aman jika RME hanya menyimpan narasi:

- `dosageInstruction[0].sequence = 1`
- `dosageInstruction[0].text = aturan_pakai`

Komponen lain yang didukung dan bisa diadopsi bertahap bila data RME sudah terstruktur:

- `additionalInstruction[]` (CodeableConcept; coding mengacu SNOMED CT)
- `patientInstruction` (string)
- `timing` (Timing; termasuk `timing.event` atau `timing.repeat`)
- `route` (CodeableConcept; sesuai terminologi yang disyaratkan SATUSEHAT)
- `method` (CodeableConcept; coding mengacu SNOMED CT)
- `doseAndRate[].doseQuantity` (SimpleQuantity; unit dapat mengacu UCUM / OrderableDrugForm)

**Data dari RME (tabel sumber yang direkomendasikan)**

1) **`detail_pemberian_obat` (hasil penyerahan)**
- Kandidat field yang biasanya bisa dipakai:
  - `no_rawat` → untuk cari `Encounter` dan `Patient`
  - `tgl_perawatan` + `jam` → `whenHandedOver` (dateTime)
  - `kode_brng` → mapping ke `Medication/{id}` (via `satu_sehat_mapping_obat.satusehat_id`)
  - `jml` → `quantity.value`
  - `status` (Ralan/Ranap) → konteks pemakaian (bukan status FHIR)
  - `kd_bangsal`, `no_batch`, `no_faktur` → kandidat traceability (lot/batch) jika kelak di-map

2) **`resep_obat` + `resep_dokter`**
- Dipakai bila ingin mengisi `dosageInstruction.text` dari `aturan_pakai` atau menghubungkan ke `MedicationRequest`.

**Penyimpanan response SATUSEHAT (idempotensi) – rancangan untuk pengembangan lanjutan**

Untuk menghindari pengiriman duplikat, perlu tabel mapping mirip `satu_sehat_medicationrequest`.

- Rekomendasi identifier stabil per event penyerahan (salah satu opsi):
  - `{no_rawat}:{tgl_perawatan}T{jam}:{kode_brng}`
  - Jika butuh granular per batch: `{no_rawat}:{tgl_perawatan}T{jam}:{kode_brng}:{no_batch}`

Skema tabel yang direkomendasikan (belum diimplementasikan):

- `satu_sehat_medicationdispense`
  - `no_rawat`
  - `kode_brng`
  - `tgl_perawatan`
  - `jam`
  - `no_batch` (nullable)
  - `id_medicationdispense` (nullable)
  - PK komposit menyesuaikan kebutuhan idempotensi (mis. termasuk `no_batch` bila dipakai).

**Saran implementasi di codebase (pola mengikuti service lain)**

- Tambah:
  - `App\Services\SatuSehat\MedicationDispenseService`
  - `App\Jobs\SatuSehat\ProcessMedicationDispenseJob`
- Trigger:
  - Dispatch job setelah `penyerahan()` sukses.
- Flow service:
  - Resolve `Encounter` + `Patient` dari `no_rawat`.
  - Resolve `Medication` dari `kode_brng` (mapping obat).
  - (Opsional) Resolve `MedicationRequest` via `satu_sehat_medicationrequest` untuk `authorizingPrescription`.
  - Build payload `MedicationDispense` minimal + `dosageInstruction` baseline.
  - `POST MedicationDispense`, lalu simpan `id` ke mapping table.

---

### 4.8. Composition (Resume Medis / Outpatient Note)

**Peran**  
Dokumen klinis yang merangkum hasil pelayanan dalam satu kunjungan. Di aplikasi ini, Composition dipakai sebagai “resume kunjungan” (SOAP ringkas) untuk Rawat Jalan.

**Referensi resmi**

- https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/composition/

**Catatan mandatory (katalog SATUSEHAT)**

- `Composition.identifier.system` mengikuti format: `http://sys-ids.kemkes.go.id/composition/{organization-ihs-number}`.
- Field yang ditandai wajib pada katalog SATUSEHAT (umum) mencakup: `Composition.status`, `Composition.type` (LOINC), `Composition.subject`, `Composition.date`, dan `Composition.title`.
- Format waktu yang digunakan oleh SATUSEHAT adalah UTC `+00` (contoh WIB perlu dikonversi menjadi UTC dengan mengurangi 7 jam).
- `Composition.section.text.div` adalah Narrative XHTML (umumnya berbentuk `<div xmlns="http://www.w3.org/1999/xhtml">...</div>`).

**Implementasi di aplikasi ini (endpoint & payload)**

- Endpoint backend: `POST /api/satusehat/rajal/composition` (controller `SatuSehatRajalController::createComposition`).
- Mode input:
  - `resource` dikirim full sebagai array → backend meneruskan apa adanya (advanced mode).
  - Atau kirim field minimal: `patient_id`, `encounter_id`, `practitioner_id`, `title`, `date` + konten per bagian (`subjective_text`, `objective_text`, `assessment_text`, `plan_text`) dan referensi resource (`*_refs`).
- Default yang dibangun backend bila tidak mengirim `resource`:
  - `status = final`
  - `type` menggunakan LOINC `37145-9` (Outpatient Note)
  - `subject = Patient/{patient_id}`
  - `encounter = Encounter/{encounter_id}`
  - `author = Practitioner/{practitioner_id}`
  - `title` dari request
  - `date` hanya dikirim jika request mengisi `date` (karena itu caller sebaiknya selalu mengirim `date` agar sesuai field wajib di katalog SATUSEHAT)
  - `section[]` dibentuk dari Subjective/Objective/Assessment/Plan, masing-masing dapat berisi `text` dan/atau `entry[]`.

## 5. Integrasi Lanjutan per Modul Pelayanan

Bagian ini menghubungkan resource di atas ke **Panduan Interoperabilitas** (modul pelayanan).

### 5.1. Resume Medis Rawat Jalan

**Resource minimal**

- `Encounter` (kunjungan poli).
- `Condition` (diagnosa akhir).
- `Observation` (TTV utama).
- `MedicationRequest` (resep pulang).
- `Procedure` (tindakan yang dilakukan).
- `Composition` (resume kunjungan).

**Data dari RME**

- Pendaftaran: `reg_periksa`.
- CPPT/SOAP: tabel SOAP/CPPT (anamnesis, pemeriksaan fisik, assesmen, plan).
- Diagnosa: `diagnosa_pasien`.
- Tindakan/Procedure: `prosedur_pasien`.
- Resep: tabel `resep_obat` + `resep_dokter`.

**Saran implementasi**

- Buat satu service/fasade tingkat tinggi, mis. `SatuSehatRalanBundleService`:
  - Input: `no_rawat`.
  - Di dalamnya:
    - Panggil `EncounterService`, `ConditionService`, `ObservationService`, `ProcedureService`, `MedicationRequestService`, `CompositionService`.
  - Menyimpan ID semua resource ke tabel `satusehat_bundles` untuk tracking.

---

### 5.2. IGD & Rawat Inap

**Perbedaan utama dengan Ralan**

- IGD:
  - Tambahan data triase, kondisi kegawatan, rujukan masuk/keluar.
  - Sering memiliki lebih banyak TTV awal & ulang.
- Rawat Inap:
  - Banyak Encounter (pindah ruangan).
  - EpisodeOfCare (satu episode perawatan).
  - Lebih banyak Composition (resume harian, resume pulang).

**Langkah lanjutan**

- Tambahkan:
  - `EpisodeOfCareService`.
  - `CompositionService` spesifik untuk resume ranap.
  - Mapping bangsal/kamar → Location.

---

### 5.3. Integrasi dengan Modul Akutansi/Billing (Rawat Jalan)

**Tujuan**  
Menyelaraskan **siklus klinis** (Encounter, Composition, dst.) dengan **siklus keuangan** (Billing). Saat billing Ralan diposting & lunas, Encounter di SATUSEHAT otomatis di‑finish dan pipeline RAJAL dijalankan untuk menyiapkan Composition.

**Implementasi di frontend (`resources/js/Pages/Akutansi/Billing.jsx`)**

- Fungsi utama: `handleSnapshot({ ... })`
  - Flow:
    1. Snapshot item billing ke tabel `nota_jalan`.
    2. Stage jurnal → `POST /api/akutansi/jurnal/stage-from-billing`.
    3. Posting jurnal → `POST /api/akutansi/jurnal/post-staging`.
    4. Jika posting jurnal berhasil:
       - Update `reg_periksa.status_bayar = "Sudah Bayar"`:
         - `PUT /api/reg-periksa/{no_rawat}/status-bayar`.
       - **Baru kemudian** trigger integrasi SATUSEHAT:
         1. Ambil Encounter ID dari SATUSEHAT:
            - `GET /api/satusehat/rajal/encounter/id-by-rawat/{no_rawat}`
            - Respon mengandung `encounter_id` (ambil dari SATUSEHAT atau tabel lokal `satu_sehat_encounter`).
         2. Finish Encounter:
            - `PUT /api/satusehat/rajal/encounter/by-rawat/{no_rawat}` dengan body:
              - `encounter_id`: ID hasil langkah (1).
              - `status`: `"finished"`.
              - `tz_offset`: `"+07:00"`.
              - `end` (opsional): override `period.end` (format dateTime ISO-8601 beserta timezone).
            - Backend (`updateEncounterByRawat`) akan:
              - Menyetel `Encounter.status = finished`.
              - Mengisi `period.end` dari pemeriksaan terakhir (`pemeriksaan_ralan.tgl_perawatan + pemeriksaan_ralan.jam_rawat + tz_offset`) atau dari field `end` bila dikirim.
              - Menjaga `period.start` bila sudah ada; jika kosong akan diisi dari `reg_periksa.tgl_registrasi + reg_periksa.jam_reg + tz_offset` (fallback ke `period.end`).
              - Mengganti `statusHistory` menjadi baseline 3 status: `arrived`, `in-progress`, `finished`.
              - Bila Encounter belum punya `diagnosis`, akan membuat hingga 3 `Condition` dari `diagnosa_pasien.kd_penyakit` (ICD-10) lalu mengisi `Encounter.diagnosis` (rank 1..n).
              - Menyimpan `encounter_id` hasil update ke tabel lokal `satu_sehat_encounter.id_encounter_2`.
         3. Jalankan pipeline RAJAL by‑rawat:
            - `POST /api/satusehat/rajal/pipeline/by-rawat/{no_rawat}` dengan body:
              - `tz_offset`: `"+07:00"`.
            - `pipelineByRawat` akan mengeksekusi rangkaian integrasi (Condition/Observation/Procedure/Composition, dst.) untuk kunjungan tsb.
  - **Error handling**:
    - Jika langkah SATUSEHAT gagal (Encounter finish/pipeline error), Billing **tetap dianggap sukses**:
      - Error dicatat lewat `console.warn` dan **tidak** melempar exception, supaya tidak menggagalkan posting jurnal.

**Konsekuensi desain**

- Billing Ralan menjadi **titik “closing”** untuk:
  - Menandai Encounter Ralan di SATUSEHAT sebagai **finished**.
  - Memicu pipeline Interoperabilitas (termasuk pembuatan Composition Resume).
- Kunjungan yang **belum diposting billing‑nya**:
  - Encounter tetap berada pada status `in-progress` di SATUSEHAT (selama belum ada pemanggilan `updateEncounterByRawat`).
- Jika di masa depan dibutuhkan:
  - Bisa ditambahkan opsi di Billing UI untuk **mematikan** trigger SATUSEHAT (mis. untuk kunjungan tertentu) dengan flag khusus (mis. `skip_satusehat=true`).

---

## 6. Best Practices Implementasi di Aplikasi Ini

1. **Selalu pakai Service SATUSEHAT per resource**
   - Jangan panggil `satusehatRequest()` langsung dari controller; selalu lewat service spesifik (EncounterService, dst).

2. **Gunakan queue untuk proses berat**
   - Pengiriman bundle (Encounter + Condition + Observation + dst.) sebaiknya dikirim via Job queue, bukan synchronous request di UI.

3. **Simpan tracking lengkap**
   - Simpan:
     - Payload request.
     - Response JSON.
     - HTTP status.
     - Timestamp & actor.
   - Ini penting untuk debugging jika ada perbedaan data antara RME & SATUSEHAT.

4. **Mapping terminologi jangan hardcode**
   - ICD‑10, LOINC, KFA, SNOMED, dsb sebaiknya disimpan di tabel mapping + seeding.

5. **Validasi lokal sebelum kirim**
   - Contoh:
     - Pastikan NIK 16 digit.
     - Pastikan `kd_poli` punya mapping Location.
     - Pastikan Organization/Location/Practitioner/Patient sudah exist di SATUSEHAT.

---

## 7. Langkah Pengembangan Selanjutnya

1. **Tambahkan service untuk resource yang belum ada**
   - `CompositionService` (resume).
   - `ProcedureService`.
   - `MedicationRequestService`, `MedicationDispenseService`.
   - `EpisodeOfCareService`.

2. **Buat bundling per use case**
   - Mis. `SatuSehatRalanBundleService`, `SatuSehatIgdBundleService`, `SatuSehatRanapBundleService`.

3. **Dashboard Monitoring**
   - Buat halaman di Faskesku.id untuk:
     - Lihat status kiriman SATUSEHAT per pasien/per no_rawat.
     - Retry kirim jika gagal.

4. **Selaraskan dengan update versi dokumentasi (v7.x)**
   - Setiap ada update di portal SATUSEHAT, revisi:
     - Mapping terminologi.
     - Resource & field wajib.
     - Validasi lokal sebelum kirim.
