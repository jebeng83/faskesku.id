# Catatan Pengembangan Lanjutan — Integrasi SATUSEHAT (Production)

> **Catatan:** Dokumen ini adalah catatan pengembangan. Untuk panduan lengkap integrasi SATUSEHAT, lihat [SATUSEHAT_INTEGRATION_GUIDE.md](./SATUSEHAT_INTEGRATION_GUIDE.md)

Dokumen ini merangkum implementasi integrasi SATUSEHAT yang telah berjalan, pedoman sesuai Playbook terbaru, serta rencana pengembangan lanjutan di aplikasi Faskesku.id.

## Ringkasan Status Saat Ini

- Lingkungan: Production
  - Auth: `https://api-satusehat.kemkes.go.id/oauth2/v1`
  - FHIR: `https://api-satusehat.kemkes.go.id/fhir-r4/v1`
- Kredensial: aktif dan tervalidasi (di portal SSP) — digunakan dengan sukses untuk memperoleh access token.
- Implementasi token telah disesuaikan dengan Playbook:
  - `grant_type=client_credentials` dikirim sebagai query parameter.
  - `client_id` dan `client_secret` dikirim di body `application/x-www-form-urlencoded`.
- Endpoints aplikasi:
  - `GET /api/satusehat/token` — mengambil token (untuk verifikasi cepat).
  - `GET /api/satusehat/token-debug?use=accesstoken` — debug token (menunjukkan status, headers, dan body aman).
  - `GET /api/satusehat/metadata` — CapabilityStatement (dapat berupa OperationOutcome info karena kebijakan privasi).
  - `GET /api/satusehat/Organization/{id}` — relay ke FHIR sesuai `SATUSEHAT_ORG_ID` (opsional, tergantung kebutuhan).

## Konfigurasi .env yang Digunakan

Pastikan variabel berikut terisi untuk lingkungan Production:

```
SATUSEHAT_ENV=PROD
SATUSEHAT_AUTH=https://api-satusehat.kemkes.go.id/oauth2/v1
SATUSEHAT_FHIR=https://api-satusehat.kemkes.go.id/fhir-r4/v1
SATUSEHAT_ORG_ID=<organization-ihs-number>
SATUSEHAT_CLIENT_ID=<client-id>
SATUSEHAT_CLIENT_SECRET=<client-secret>
```

Setelah mengubah `.env`, jalankan:

```
php artisan config:clear
php artisan cache:clear
```

## Pola Request Token (sesuai Playbook)

- Endpoint: `POST https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials`
- Header:
  - `Content-Type: application/x-www-form-urlencoded`
  - `Accept: application/json`
- Body (form-encoded):
  - `client_id=<client-id>`
  - `client_secret=<client-secret>`

Contoh curl (Production):

```
curl -i -X POST \
  'https://api-satusehat.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json' \
  --data-urlencode 'client_id=<client-id>' \
  --data-urlencode 'client_secret=<client-secret>'
```

Respon sukses (contoh struktur):

```
{
  "token_type": "BearerToken",
  "access_token": "<access-token>",
  "expires_in": "14399",
  "api_product_list": "[api-satusehat-prod]",
  "organization_name": "ihs-prod-1",
  "status": "approved"
}
```

Gunakan `Authorization: Bearer <access_token>` di setiap request FHIR berikutnya.

## Implementasi di Kode (Laravel)

- `app/Traits/SatuSehatTraits.php`
  - `satusehatToken()`:
    - Mengirim `grant_type` sebagai query.
    - Mengirim `client_id/client_secret` di body form-encoded.
    - Menyimpan token di cache dengan TTL `expires_in - 60 detik` (buffer aman).
  - `satusehatRequest(method, path, body, options)`:
    - Menyisipkan header standar FHIR (Accept/Content-Type) dan `Authorization` Bearer otomatis.
    - Logging warning untuk kasus gagal.

- `app/Http/Controllers/SatuSehat/SatuSehatController.php`
  - `token()` — mengembalikan token (ok:true) untuk verifikasi cepat.
  - `tokenDebug(Request)` — memanggil token endpoint menggunakan format Playbook; menyertakan `x-request-id` pada output untuk keperluan troubleshooting; mendukung override `client_id`/`client_secret` via query saat dibutuhkan.
  - `metadata()` — relay GET ke `FHIR/metadata`.
  - `organization()` — pencarian Organization berbasis identifier token (default mencoba beberapa kandidat termasuk `http://sys-ids.kemkes.go.id/organization|{IHS}`), fallback read `Organization/{SATUSEHAT_ORG_ID}`.
  - `organizationSubunits()` — ringkas daftar sub-organisasi di bawah induk (id, code=identifier.value, name, partOf). Mendukung `?map=1` untuk menampilkan peta kode→nama dan `?limit=10` untuk membatasi hasil.

## Troubleshooting & Dukungan

- 401 Unauthorized — “client_id or client_secret unacceptable”:
  - Pastikan format request sesuai (grant_type di query, credential di body form-encoded).
  - Pastikan kredensial Production aktif dan aplikasi telah disubscribe ke produk API yang relevan.
  - Periksa sinkronisasi environment di portal (Production vs Sandbox).
- Gunakan `X-Request-Id` dari respons untuk eskalasi ke tim DTO (memudahkan penelusuran di sisi server).
- “resource cannot be accessed due to business rule” — terjadi bila kode akses digunakan lintas Organization ID.

## Rencana Pengembangan Lanjutan (Backlog)

1) Downstream FHIR (Production)
   - Organization: validasi akses dan mapping identifier (format `http://sys-ids.kemkes.go.id/organization/{organization-ihs-number}`).
   - Encounter: implementasi create/update sesuai profil FHIR Indonesia.
   - Observation: pengiriman hasil pemeriksaan (laboratorium/penunjang) dengan terminologi yang ditetapkan.
   - Patient: validasi update/lookup jika diperlukan oleh use case.

2) Hardening & Observability
   - Logging terstruktur untuk setiap request (method, path, status, `x-request-id`).
   - Circuit breaker sederhana dan retry backoff untuk kasus koneksi.
   - Rotasi `client_secret` terjadwal; amankan nilai `.env` (hindari commit ke repo publik).

3) API & UI Internal
   - Proteksi endpoint debug di production (role admin/teknis saja).
   - Tambahkan halaman admin kecil untuk melihat health integrasi (status token, sisa TTL, FHIR ping).

4) Integrasi PCare (Aktif di aplikasi ini)
   - Perbaikan flow UI “Kirim Kunjungan + Rujuk”: normalisasi `kdTacc` agar `-1` dipertahankan (Subspesialis), validasi wajib hanya untuk NonSpesialis.
   - Backend: sebelum POST `kunjungan/v1`, paksa `kdTacc = -1` dan `alasanTacc = null` jika ada rujuk sub-spesialis atau `kdStatusPulang = '4'` (Rujuk Vertikal).
   - E2E test: kirim Kunjungan (HTTP 201), verifikasi `pcare_kunjungan_umum` (status=Terkirim, `noKunjungan` tidak null) dan semua kolom non-null terisi.

## Uji Cepat (Checklist)

- [x] Token Production: 200 OK, `access_token` didapat.
- [x] FHIR metadata: 200 OK (OperationOutcome informasi dapat muncul).
- [x] Endpoint `GET /api/satusehat/token`: ok:true mengembalikan token.
- [x] Uji Organization (induk & subunit):
  - `GET /api/satusehat/Organization/100006530` → mengembalikan Organization induk.
  - `GET /api/satusehat/organization?identifier=100006530` → Bundle berisi sub-organisasi (total ~28).
  - `GET /api/satusehat/organization/subunits?map=1&limit=10` → ringkasan subunit + peta kode→nama untuk keperluan UI.
- [ ] Uji Encounter/Observation (sesuai prioritas use case Anda).
- [ ] E2E alur PCare pasca patch `kdTacc`.

## Catatan Keamanan

- Jangan menyimpan `client_secret` di luar `.env`.
- Batasi akses ke endpoint debug dan log yang menampilkan respons token.
- Gunakan HTTPS end-to-end dan pastikan `verify=true` (default) untuk TLS.

## Referensi Resmi (Playbook)

- Autentikasi (OAuth2 client_credentials), lingkungan Sandbox/Production, ketentuan kredensial.
- Akses Token (format request/response) dan kewajiban `Authorization: Bearer` di FHIR.
- FHIR Resource (Organization, Encounter, Observation) sesuai profil Indonesia.

## Dokumentasi Terkait

- **[SATUSEHAT_INTEGRATION_GUIDE.md](./SATUSEHAT_INTEGRATION_GUIDE.md)**: Panduan lengkap integrasi SATUSEHAT dengan detail implementasi, contoh payload, error handling, dan best practices.
- **[UI_UX_IMPROVEMENTS_GUIDE.md](./UI_UX_IMPROVEMENTS_GUIDE.md)**: Panduan perbaikan UI/UX menggunakan React + Tailwind CSS + Framer Motion.

## Catatan Implementasi Terbaru

### Perbaikan Location API (2025-11-14)

1. **Decimal Type Handling**: Memastikan nilai `position.longitude`, `position.latitude`, dan `position.altitude` dikirim sebagai number, bukan string.
   - Menggunakan `(float)` cast sebelum menambahkan ke payload
   - Menggunakan `json_encode()` dengan flag `JSON_PRESERVE_ZERO_FRACTION`
   - Menggunakan `withBody()` untuk kontrol penuh atas JSON encoding

2. **Foreign Key Constraint**: Memastikan mapping departemen ada sebelum membuat mapping lokasi.
   - Auto-create mapping departemen jika belum ada
   - Validasi dan error handling yang lebih baik

3. **Error Handling**: Parsing OperationOutcome untuk memberikan pesan error yang lebih jelas.
   - Extract `diagnostics` dan `expression` dari OperationOutcome
   - Menampilkan error detail di frontend

### Endpoint yang Tersedia

**Prerequisites:**
- `GET /api/satusehat/organization/subunits` - List subunit Organization
- `POST /api/satusehat/mapping/departemen` - Buat mapping departemen
- `GET /api/satusehat/mapping/departemen` - List mapping departemen
- `DELETE /api/satusehat/mapping/departemen/{dep_id}` - Hapus mapping
- `GET /api/satusehat/location` - Search Location (dengan parameter: name, identifier, organization, lat, lon, radius)
- `POST /api/satusehat/mapping/lokasi` - Buat mapping lokasi
- `GET /api/satusehat/mapping/lokasi` - List mapping lokasi
- `PATCH /api/satusehat/location/{id}` - Update Location (partial, JSON Patch)

**Interoperabilitas:**
- `POST /api/satusehat/{resource}` - Create resource (Patient, Encounter, Observation, dll)
- `GET /api/satusehat/{resource}/{id}` - Get resource by ID

---
Jika Anda ingin saya memprioritaskan resource tertentu (mis. Encounter atau Observation), tulis daftar prioritas Anda. Saya akan menyiapkan payload FHIR, mapping data, dan skenario uji untuk Production.

## Contoh Payload FHIR (siap disesuaikan untuk Production)

### Encounter (Rawat Jalan, serviceProvider = sub-organisasi)

```
{
  "resourceType": "Encounter",
  "status": "in-progress",
  "class": {
    "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    "code": "AMB",
    "display": "ambulatory"
  },
  "subject": { "reference": "Patient/{patient-id}" },
  "serviceProvider": { "reference": "Organization/{subunit-uuid}" },
  "period": { "start": "2025-11-14T08:30:00+07:00" },
  "reasonCode": [
    { "coding": [ { "system": "http://hl7.org/fhir/sid/icd-10", "code": "J06.9", "display": "ISPA" } ] }
  ]
}
```

Catatan:
- Jika ingin mengaitkan ke induk, gunakan `serviceProvider.reference = "Organization/100006530"`.
- Beberapa profil mungkin memerlukan `location` (Location resource) dan `participant` (Practitioner). Tambahkan sesuai ketersediaan data.

### Observation (Vital Signs, performer = sub-organisasi)

```
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    { "coding": [ { "system": "http://terminology.hl7.org/CodeSystem/observation-category", "code": "vital-signs" } ] }
  ],
  "code": { "coding": [ { "system": "http://loinc.org", "code": "8867-4", "display": "Heart rate" } ] },
  "subject": { "reference": "Patient/{patient-id}" },
  "encounter": { "reference": "Encounter/{encounter-id}" },
  "performer": [ { "reference": "Organization/{subunit-uuid}" } ],
  "effectiveDateTime": "2025-11-14T08:45:00+07:00",
  "valueQuantity": {
    "value": 74,
    "unit": "beats/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}
```

### Observation (Laboratorium, performer = induk)

```
{
  "resourceType": "Observation",
  "status": "final",
  "category": [
    { "coding": [ { "system": "http://terminology.hl7.org/CodeSystem/observation-category", "code": "laboratory" } ] }
  ],
  "code": { "coding": [ { "system": "http://loinc.org", "code": "2345-7", "display": "Glucose [Mass/volume] in Serum or Plasma" } ] },
  "subject": { "reference": "Patient/{patient-id}" },
  "encounter": { "reference": "Encounter/{encounter-id}" },
  "performer": [ { "reference": "Organization/100006530" } ],
  "effectiveDateTime": "2025-11-14T09:00:00+07:00",
  "valueQuantity": {
    "value": 102,
    "unit": "mg/dL",
    "system": "http://unitsofmeasure.org",
    "code": "mg/dL"
  }
}
```

Gunakan endpoint `GET /api/satusehat/organization/subunits?map=1` untuk mendapatkan `subunit-uuid` dan `kode→nama` sebelum menyusun payload Encounter/Observation.