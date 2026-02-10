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
- Tindakan: tabel tindakan poli.
- Resep: tabel `resep_obat` + `detail_resep_obat`.

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
            - Backend (`updateEncounterByRawat`) akan:
              - Menyetel `Encounter.status = finished`.
              - Mengisi `period.end` dari pemeriksaan terakhir (`pemeriksaan_ralan`) atau `endOverride`.
              - Membentuk `statusHistory` lengkap (arrived, in-progress, finished).
              - Bila Encounter belum punya `diagnosis`, otomatis membuat `Condition` dari `diagnosa_pasien` lokal dan mengisi `Encounter.diagnosis`.
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

