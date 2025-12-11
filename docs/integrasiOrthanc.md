# Integrasi Orthanc dengan SATUSEHAT (DICOM & FHIR)

Dokumen ini menjelaskan langkah-langkah terperinci untuk:
- Instalasi Orthanc (DICOM server)
- Menghubungkan alat/Modality ke komputer yang terpasang Orthanc
- Integrasi dengan SATUSEHAT melalui DICOM Router, termasuk alur FHIR ServiceRequest dan ImagingStudy

Dokumen merujuk ke sumber resmi Orthanc dan SATUSEHAT yang tercantum pada bagian Referensi.

---

## Ringkasan Arsitektur

Orthanc berperan sebagai server DICOM lokal (PACS ringan). SATUSEHAT menyediakan DICOM Router yang menerima C-STORE dari Modality/PACS, mengunggah file DICOM ke National Imaging Data Repository (NIDR), lalu membuat resource FHIR ImagingStudy yang mereferensikan ServiceRequest yang sebelumnya dibuat oleh SIMRS. Ada dua skenario umum:

1) MWL di dalam DICOM Router
- SIMRS membuat order dan ServiceRequest (berisi Accession Number)
- Modality membaca MWL dari DICOM Router
- Modality mengirim DICOM ke DICOM Router
- Router upload ke NIDR dan POST ImagingStudy ke SATUSEHAT

2) MWL di luar DICOM Router (mis. MWL mandiri atau SIMRS)
- SIMRS membuat order dan ServiceRequest serta menulis ke MWL eksternal
- Modality membaca MWL dari MWL server
- Modality kirim DICOM ke DICOM Router
- Router upload ke NIDR dan POST ImagingStudy ke SATUSEHAT

Rujukan alur dan resource terkait tersedia pada dokumentasi resmi SATUSEHAT DICOM System, DICOM Router, dan ImagingStudy.

---

## Prasyarat Teknis

- Komputer server (Windows/Linux) dengan akses jaringan stabil dan IP statis (disarankan)
- Port jaringan dibuka sesuai kebutuhan:
  - Orthanc HTTP UI/API: default 8042 (dapat diubah)
  - Orthanc DICOM (C-STORE/C-ECHO): default 4242 (dapat diubah)
  - SATUSEHAT DICOM Router (Installer): 8080 (HTTP) dan 11112 (DICOM) tidak boleh dipakai oleh layanan lain [SATUSEHAT]
- Firewall/NAT disesuaikan agar Modality dan Router dapat mengakses server
- SIMRS terintegrasi dengan SATUSEHAT (memiliki kredensial dan dapat membuat ServiceRequest)
- Menentukan AE Title untuk Orthanc dan Modality (harus konsisten antar perangkat)

---

## Bagian A — Instalasi Orthanc

Anda bisa menggunakan Linux, Windows, atau Docker. Referensi lengkap: Orthanc Book dan situs resmi Orthanc.

### A1. Instalasi di Linux (Ubuntu/Debian)

1. Update sistem:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. Install Orthanc (dari repository resmi atau paket distro):
   - Opsi paket distro:
     ```bash
     sudo apt install orthanc -y
     ```
   - Opsi repository resmi Orthanc (cek panduan di Orthanc Book untuk distribusi lainnya)
3. Setelah terpasang, layanan biasanya berjalan otomatis. Cek status:
   ```bash
   systemctl status orthanc
   ```
4. Lokasi berkas konfigurasi umumnya di: `/etc/orthanc/orthanc.json` (atau `/etc/orthanc/`), bergantung paket.

### A2. Instalasi di Windows

1. Unduh installer/binary Orthanc dari halaman resmi Orthanc
2. Jalankan installer, ikuti petunjuk. Pastikan Anda memiliki hak admin untuk membuka port.
3. Setelah install, Orthanc UI dapat diakses di `http://localhost:8042/` (default), konfigurasi melalui `orthanc.json` di folder instalasi.

### A3. Instalasi menggunakan Docker

1. Pastikan Docker terpasang.
2. Jalankan container Orthanc (contoh sederhana):
   ```bash
   docker run -d \
     --name orthanc \
     -p 8042:8042 \
     -p 4242:4242 \
     -v /path/ke/data-orthanc:/var/lib/orthanc/db \
     -v /path/ke/orthanc.json:/etc/orthanc/orthanc.json \
     osimis/orthanc
   ```
3. Sesuaikan volume dan konfigurasi sesuai kebutuhan (lihat Orthanc Book untuk opsi lanjutan, plugins, dll).

### A4. Konfigurasi dasar Orthanc

Contoh `orthanc.json` minimal (sesuaikan path dan kebijakan keamanan):
```json
{
  "Name": "ORTHANC",
  "HttpPort": 8042,
  "HttpServerEnabled": true,
  "SslEnabled": false,

  "DicomAet": "ORTHANC",
  "DicomPort": 4242,
  "DicomServerEnabled": true,

  "AuthenticationEnabled": true,
  "RegisteredUsers": {
    "admin": "ganti_password_kuat"
  },

  "StorageDirectory": "/var/lib/orthanc/db",

  "DicomModalities": {
    "DICOM_ROUTER": ["DICOM_ROUTER_AE", "192.168.10.50", 11112]
  },

  "DefaultEncoding": "ISO_IR 192"
}
```
Penjelasan:
- Name/DicomAet: AE Title Orthanc (gunakan huruf besar tanpa spasi)
- HttpPort/HttpServerEnabled: mengaktifkan UI/API Orthanc
- DicomPort/DicomServerEnabled: mengaktifkan listener DICOM untuk C-STORE/C-ECHO
- AuthenticationEnabled/RegisteredUsers: sangat disarankan diaktifkan untuk keamanan
- DicomModalities: entri target untuk mengirim DICOM ke DICOM Router (opsional, jika Anda memilih arsitektur Orthanc→Router)
- DefaultEncoding: set karakter encoding default

Catatan keamanan: jangan pakai kredensial default di produksi; aktifkan firewall, batasi akses UI/API.

### A5. Uji konektivitas DICOM dengan DCMTK (opsional tapi disarankan)

Instal DCMTK (Linux: `sudo apt install dcmtk`).
- Uji ping DICOM (C-ECHO):
  ```bash
  echoscu -aec ORTHANC 127.0.0.1 4242
  ```
- Kirim contoh berkas DICOM (C-STORE):
  ```bash
  storescu -aec ORTHANC 127.0.0.1 4242 /path/ke/contoh.dcm
  ```
Jika sukses, studi akan muncul di Orthanc Explorer UI (`http://<ip-server>:8042`).

---

## Bagian B — Koneksi Modality ke Komputer Orthanc

Langkah-langkah umum untuk setiap Modality (CT/MRI/USG/DR, dsb.). Konsultasikan manual pabrikan.

1. Tentukan parameter di Modality:
   - AE Title Orthanc: contoh `ORTHANC`
   - IP Orthanc: contoh `192.168.10.10`
   - Port DICOM Orthanc: default `4242`
2. Di Modality, daftarkan Orthanc sebagai tujuan (Destination) untuk C-STORE.
3. Lakukan tes koneksi C-ECHO dari Modality ke Orthanc (biasanya ada menu Test/Verify di Modality).
4. Kirim studi uji dari Modality; verifikasi di Orthanc UI bahwa studi diterima.
5. Opsi MWL (Modality Worklist):
   - Jika Anda memakai DICOM Router sebagai MWL, set Modality ke MWL server Router (IP `192.168.10.50`, AE `DICOM_ROUTER_AE`, port `11112`).
   - Jika MWL berada di luar Router (SIMRS/MWL server lain), set Modality ke MWL server tersebut sesuai konfigurasi masing-masing.

---

## Bagian C — Instalasi & Konfigurasi SATUSEHAT DICOM Router

SATUSEHAT menyediakan DICOM Router untuk menerima file DICOM (C-STORE), memproses Accession Number, mengunggah ke NIDR, dan membuat resource FHIR ImagingStudy ke SATUSEHAT.

### C1. Opsi Instalasi

- Docker (disarankan): ikuti panduan resmi SATUSEHAT untuk image dan konfigurasi environment. Kelebihan: mudah dikelola dan diisolasi [SATUSEHAT Install].
- Installer (Binary Install): ringan, namun tidak dapat custom port. Wajib pastikan port 8080 (HTTP) dan 11112 (DICOM) kosong [SATUSEHAT Install].

### C2. Port dan Jaringan

- Pastikan 8080 (HTTP) dan 11112 (DICOM) bebas konflik (khusus Installer)
- Atur firewall agar Modality/Orthanc dapat C-STORE ke Router (11112) dan SIMRS/DICOM Router dapat akses SATUSEHAT API

### C3. Integrasi dengan SIMRS dan SATUSEHAT

Sebelum DICOM dikirim, SIMRS harus membuat ServiceRequest ke SATUSEHAT menggunakan Accession Number sebagai identifier. DICOM Router akan memverifikasi kecocokan Accession Number terhadap ServiceRequest tersebut.

- SIMRS melakukan POST ServiceRequest ke SATUSEHAT
- SATUSEHAT mengembalikan ServiceRequest ID
- DICOM Router memproses file DICOM, mengecek Accession Number terhadap ServiceRequest
- Jika cocok, DICOM Router mengunggah file ke NIDR (mendapat WADO URL), lalu POST ImagingStudy ke SATUSEHAT berdasarkan ServiceRequest

Detail alur tersedia di dokumentasi SATUSEHAT DICOM Router dan Arsitektur.

### C4. Mode MWL

Ada dua mode alur kerja yang didukung SATUSEHAT:
- MWL di dalam DICOM Router: Router bertindak sebagai sumber Worklist untuk Modality (alur langkah 1–20 dijelaskan dalam dokumen resmi) [SATUSEHAT DICOM Router].
- MWL di luar DICOM Router: MWL disediakan oleh sistem lain; Router hanya menerima DICOM dan melanjutkan proses ke NIDR dan SATUSEHAT (alur 1–20 juga tersedia) [SATUSEHAT DICOM Router].

### C5. Konfigurasi Orthanc ↔ DICOM Router

Anda dapat memilih arsitektur berikut:
1) Modality → DICOM Router → SATUSEHAT (tanpa Orthanc)
   - Modality mengirim langsung ke Router (AE/Host/Port Router)
   - Orthanc dapat tetap digunakan sebagai PACS lokal terpisah jika diperlukan

2) Modality → Orthanc → DICOM Router → SATUSEHAT
   - Modality mengirim ke Orthanc
   - Orthanc meneruskan ke Router (gunakan DicomModalities dan fitur Store-SCU/Forward dalam UI/API Orthanc)
   - Router melanjutkan proses ke NIDR dan FHIR

Dalam skenario ke-2, tambahkan entri target Router di `DicomModalities` Orthanc dan gunakan perintah forward dari UI/API Orthanc untuk mengirim studi ke Router.

---

## Bagian D — Alur Data SATUSEHAT (Detail Operasional)

Ringkasan dari dokumentasi SATUSEHAT:

1. SIMRS/SIMPUS melakukan order; Accession Number dihasilkan
2. SIMRS POST ServiceRequest ke SATUSEHAT (identifier = Accession Number)
3. SATUSEHAT mengembalikan ServiceRequest ID
4. Modality memperoleh order (dari MWL Router atau MWL eksternal)
5. Setelah akuisisi gambar, Modality C-STORE ke DICOM Router
6. DICOM Router mengekstrak Accession Number dari DICOM dan memeriksa ServiceRequest
7. DICOM Router mengunggah DICOM ke NIDR (mendapat WADO URL)
8. DICOM Router POST ImagingStudy ke SATUSEHAT, basedOn ServiceRequest
9. SATUSEHAT mengembalikan ImagingStudy ID
10. SIMRS mengirim Observation dan DiagnosticReport, basedOn ServiceRequest (opsional sesuai use-case)

Catatan penting:
- Tanggal/waktu wajib dikirim dalam UTC+00 (misal WIB dikurangi 7 jam) [SATUSEHAT ImagingStudy]
- Standar waktu tidak boleh kurang dari 2014-06-03 [SATUSEHAT ImagingStudy]

### D1. Contoh ImagingStudy (FHIR) — ringkas

Nilai wajib sesuai pedoman SATUSEHAT (per 15 Des 2024):
```json
{
  "resourceType": "ImagingStudy",
  "identifier": [
    {
      "system": "http://sys-ids.kemkes.go.id/acsn/10000004",
      "use": "usual",
      "value": "210610114146"
    }
  ],
  "status": "available",
  "modality": [
    {
      "system": "http://dicom.nema.org/resources/ontology/DCM",
      "code": "CT",
      "display": "Computed Tomography"
    }
  ],
  "subject": {
    "reference": "Patient/100000030009",
    "display": "Nama Pasien"
  },
  "encounter": {
    "reference": "Encounter/0a26ca28-0ea3-486d-8fa9-6f9edd37e567"
  },
  "started": "2021-06-10T04:41:46+00:00",
  "basedOn": [
    {
      "reference": "ServiceRequest/{ID-ServiceRequest}"
    }
  ]
}
```
Penjelasan singkat:
- identifier.system: gunakan namespace sys-ids Accession Number sesuai organisasi
- modality: gunakan kode DICOM sesuai perangkat (CT/MR/US/DR/CR, dll.)
- subject: referensi Patient di indeks SATUSEHAT
- encounter: jika tersedia, referensi Encounter
- started: waktu UTC+00
- basedOn: referensi ServiceRequest yang dibuat SIMRS

Catatan: Contoh di atas ringkas; gunakan pedoman lengkap SATUSEHAT untuk elemen lainnya dan mapping terminologi.

---

## Bagian E — Langkah Implementasi Terperinci (Checklist)

1) Siapkan server Orthanc
- Install Orthanc (Linux/Windows/Docker)
- Konfigurasi `orthanc.json` (AE Title, port, auth, storage)
- Uji C-ECHO dan C-STORE dengan DCMTK

2) Siapkan koneksi Modality
- Set Destination ke Orthanc (AE/IP/Port)
- Uji kirim studi uji
- Jika pakai MWL Router: set MWL target ke DICOM Router

3) Siapkan DICOM Router SATUSEHAT
- Pilih mode instalasi: Docker atau Installer
- Pastikan port 8080 & 11112 tidak konflik (Installer)
- Konfigurasi kredensial/endpoint SATUSEHAT sesuai panduan resmi

4) Tentukan arsitektur integrasi
- Langsung Modality→Router (disederhanakan)
- Atau Modality→Orthanc→Router (Orthanc sebagai PACS lokal & forwarding)

5) Integrasi SIMRS ↔ SATUSEHAT
- Implementasi pembuatan ServiceRequest (identifier=Accession Number)
- Simpan ServiceRequest ID dan Accession Number di SIMRS

6) Validasi alur end-to-end
- Buat order di SIMRS (ServiceRequest)
- Akuisisi gambar di Modality
- Pastikan DICOM terkirim ke Router (lihat log Router)
- Router upload ke NIDR dan membuat ImagingStudy
- Verifikasi ImagingStudy ID di SATUSEHAT; WADO URL tersedia untuk viewing
- Kirim Observation/DiagnosticReport (jika use-case mewajibkan)

7) Keamanan dan kepatuhan
- Aktifkan autentikasi di Orthanc; batasi akses UI/API
- Lindungi kredensial SATUSEHAT; gunakan jaringan aman
- Sinkronisasi waktu server ke UTC (NTP) agar timestamp konsisten

8) Operasional & monitoring
- Pantau log Orthanc dan DICOM Router untuk error (AE mismatch, timeout, dll.)
- Siapkan prosedur fallback jika koneksi SATUSEHAT down (antrian retry di Router)

---

## Bagian F — Troubleshooting Umum

- AE Title tidak cocok: pastikan AE Title yang diset di Modality, Orthanc, dan Router konsisten
- Port tertutup/konflik: cek firewall, pastikan 4242 (Orthanc), 11112 & 8080 (Router) tersedia
- ServiceRequest tidak ditemukan: pastikan SIMRS sudah POST ServiceRequest dan Accession Number di DICOM sesuai
- Waktu salah: SATUSEHAT mensyaratkan UTC+00; gunakan NTP dan konversi timezone benar
- Gagal upload ke NIDR: periksa kredensial Router & koneksi ke SATUSEHAT API Gateway

---

## Referensi

- Orthanc — Dokumentasi & Buku Orthanc:
  - Orthanc Official Site: https://www.orthanc-server.com/ [Orthanc]
  - Documentation hub: https://www.orthanc-server.com/static.php?page=documentation [Orthanc Docs]
  - Orthanc Book: https://orthanc.uclouvain.be/book/ [Orthanc Book]
  - Plugins & resources: https://www.orthanc-server.com/static.php?page=resources [Orthanc Resources]

- SATUSEHAT — DICOM & FHIR:
  - DICOM System (umum): https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/ [SATUSEHAT DICOM]
  - Arsitektur: https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/architecture/ [SATUSEHAT Architecture]
  - DICOM Router (alur & MWL): https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/dicom-router/ [SATUSEHAT DICOM Router]
  - Instalasi DICOM Router: https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/install-dicom/ [SATUSEHAT Install]
  - ImagingStudy (FHIR): https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/imaging-study/ [SATUSEHAT ImagingStudy]

Catatan: Ikuti selalu dokumen resmi terbaru; detail implementasi (image Docker, env variables, endpoint API Gateway, token/credential) dapat berubah mengikuti update SATUSEHAT.

---

## Lampiran (Opsional)

### Contoh menambahkan target Router di Orthanc (REST API)

Orthanc menyediakan API untuk mengirim studi ke remote AE yang sudah didefinisikan di `DicomModalities`.
- Endpoint contoh (lihat Orthanc REST API docs):
  - `POST /modalities/{name}/store` dengan payload berisi list SOP Instance untuk dikirim
- Gunakan autentikasi Basic sesuai `RegisteredUsers`.

### Daftar kode modality umum (DCM)
- CR: Computed Radiography
- CT: Computed Tomography
- MR: Magnetic Resonance
- US: Ultrasound
- DX: Digital Radiography
- MG: Mammography

Rujuk terminologi resmi DICOM/NEMA untuk daftar lengkap.

